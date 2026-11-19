from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.database.connection import get_db
from app.models import User, Scheme, SavedScheme, Lesson, LessonProgress, Post, Comment
from app.schemas import *
from app.core.security import hash_password, verify_password, create_access_token, get_current_user, require_admin

router = APIRouter(prefix="/api")

@router.post("/auth/register")
def register(data: RegisterIn, db: Session = Depends(get_db)):
    email = data.email.lower()
    if db.scalar(select(User).where(User.email == email)):
        raise HTTPException(409, "An account with this email already exists")
    user = User(name=data.name.strip(), email=email, password_hash=hash_password(data.password))
    db.add(user); db.commit(); db.refresh(user)
    return {"access_token": create_access_token(user.id), "token_type": "bearer", "user": UserOut.model_validate(user)}

@router.post("/auth/login")
def login(data: LoginIn, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.email == data.email.lower()))
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(401, "Incorrect email or password")
    return {"access_token": create_access_token(user.id), "token_type": "bearer", "user": UserOut.model_validate(user)}

@router.get("/auth/me", response_model=UserOut)
def me(user: User = Depends(get_current_user)):
    return user

@router.get("/users/me", response_model=UserOut)
def get_profile(user: User = Depends(get_current_user)):
    return user

@router.patch("/users/me", response_model=UserOut)
def update_profile(data: ProfileUpdate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(user, key, value)
    db.commit(); db.refresh(user)
    return user

@router.get("/schemes", response_model=list[SchemeOut])
def list_schemes(search: str = "", category: str = "", db: Session = Depends(get_db)):
    stmt = select(Scheme)
    if search:
        stmt = stmt.where(Scheme.name.ilike(f"%{search}%") | Scheme.summary.ilike(f"%{search}%"))
    if category:
        stmt = stmt.where(Scheme.category == category)
    return list(db.scalars(stmt.order_by(Scheme.name).limit(100)))

@router.get("/schemes/{scheme_id}", response_model=SchemeOut)
def scheme_detail(scheme_id: int, db: Session = Depends(get_db)):
    item = db.get(Scheme, scheme_id)
    if not item: raise HTTPException(404, "Scheme not found")
    return item

@router.get("/schemes/saved", response_model=list[SchemeOut])
def saved_schemes(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return list(db.scalars(select(Scheme).join(SavedScheme).where(SavedScheme.user_id == user.id)))

@router.post("/schemes/{scheme_id}/save")
def save_scheme(scheme_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if not db.get(Scheme, scheme_id): raise HTTPException(404, "Scheme not found")
    exists = db.scalar(select(SavedScheme).where(SavedScheme.user_id == user.id, SavedScheme.scheme_id == scheme_id))
    if not exists:
        db.add(SavedScheme(user_id=user.id, scheme_id=scheme_id)); db.commit()
    return {"saved": True}

@router.delete("/schemes/{scheme_id}/save")
def unsave_scheme(scheme_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    item = db.scalar(select(SavedScheme).where(SavedScheme.user_id == user.id, SavedScheme.scheme_id == scheme_id))
    if item: db.delete(item); db.commit()
    return {"saved": False}

@router.post("/eligibility/check")
def eligibility(data: EligibilityIn, db: Session = Depends(get_db)):
    matches = list(db.scalars(select(Scheme).where(Scheme.state.in_([data.state, "India"]))))
    return {"disclaimer": "Indicative matching only. The relevant authority makes the final eligibility decision.", "matches": [{"id": s.id, "name": s.name, "reason": "Location is compatible; review the published eligibility criteria manually.", "verification_status": s.verification_status} for s in matches]}

@router.get("/lessons", response_model=list[LessonOut])
def lessons(db: Session = Depends(get_db)):
    return list(db.scalars(select(Lesson).where(Lesson.published == True).order_by(Lesson.id)))

@router.get("/lessons/{lesson_id}", response_model=LessonOut)
def lesson_detail(lesson_id: int, db: Session = Depends(get_db)):
    item = db.get(Lesson, lesson_id)
    if not item or not item.published: raise HTTPException(404, "Lesson not found")
    return item

@router.post("/lessons/{lesson_id}/complete")
def complete_lesson(lesson_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if not db.get(Lesson, lesson_id): raise HTTPException(404, "Lesson not found")
    item = db.scalar(select(LessonProgress).where(LessonProgress.user_id == user.id, LessonProgress.lesson_id == lesson_id))
    if not item:
        db.add(LessonProgress(user_id=user.id, lesson_id=lesson_id)); db.commit()
    return {"completed": True}

@router.get("/lessons/progress")
def lesson_progress(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    ids = list(db.scalars(select(LessonProgress.lesson_id).where(LessonProgress.user_id == user.id)))
    total = db.scalar(select(Lesson.id).where(Lesson.published == True).limit(1))
    return {"completed_lesson_ids": ids, "completed_count": len(ids)}

@router.get("/community/posts")
def list_posts(db: Session = Depends(get_db), limit: int = Query(default=50, le=100)):
    rows = db.scalars(select(Post).order_by(Post.created_at.desc()).limit(limit))
    return [{"id": p.id, "title": p.title, "body": p.body, "category": p.category, "author": db.get(User, p.user_id).name, "created_at": p.created_at} for p in rows]

@router.post("/community/posts")
def create_post(data: PostCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    item = Post(user_id=user.id, title=data.title, body=data.body, category=data.category)
    db.add(item); db.commit(); db.refresh(item)
    return {"id": item.id, "title": item.title, "body": item.body, "category": item.category}

@router.delete("/community/posts/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    item = db.get(Post, post_id)
    if not item: raise HTTPException(404, "Post not found")
    if item.user_id != user.id and user.role != "admin": raise HTTPException(403, "You can only delete your own posts")
    db.delete(item); db.commit()
    return {"deleted": True}

@router.post("/community/posts/{post_id}/comments")
def add_comment(post_id: int, data: CommentCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if not db.get(Post, post_id): raise HTTPException(404, "Post not found")
    comment = Comment(post_id=post_id, user_id=user.id, body=data.body)
    db.add(comment); db.commit(); db.refresh(comment)
    return {"id": comment.id, "body": comment.body}

@router.post("/assistant/chat")
def assistant(data: ChatIn):
    message = data.message.lower()
    if any(term in message for term in ["upi", "payment", "fraud", "scam"]):
        answer = "Use only your bank's official UPI app, verify the recipient before paying, never share your UPI PIN or OTP, and remember that receiving money does not require entering your UPI PIN."
    elif any(term in message for term in ["scheme", "government", "eligib"]):
        answer = "Start by reviewing the scheme's official eligibility criteria, required documents and application portal. SCHEMETA's scheme records may be demonstration data; confirm details with the official government source."
    else:
        answer = "I can help with government-scheme discovery, digital payments, online marketing and digital safety. Ask a focused question. This is the local fallback assistant; no external AI provider is configured."
    return {"answer": answer, "mode": "rule_based_fallback", "language": data.language}

@router.get("/admin/dashboard")
def admin_dashboard(db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    return {"users": db.query(User).count(), "schemes": db.query(Scheme).count(), "lessons": db.query(Lesson).count(), "posts": db.query(Post).count()}

@router.post("/admin/schemes", response_model=SchemeOut)
def create_scheme(data: SchemeCreate, db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    item = Scheme(**data.model_dump())
    db.add(item); db.commit(); db.refresh(item)
    return item
