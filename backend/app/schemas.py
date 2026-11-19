from pydantic import BaseModel, EmailStr, ConfigDict, Field
from typing import Optional

class RegisterIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)

class LoginIn(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    email: EmailStr
    role: str
    state: Optional[str] = None
    district: Optional[str] = None
    business_category: Optional[str] = None
    preferred_language: str

class ProfileUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=120)
    phone: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    taluka: Optional[str] = None
    village: Optional[str] = None
    business_category: Optional[str] = None
    preferred_language: Optional[str] = None

class SchemeOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    summary: str
    category: str
    state: str
    eligibility: str
    benefits: str
    documents: str
    application_steps: str
    official_url: Optional[str]
    source_name: Optional[str]
    verification_status: str

class SchemeCreate(BaseModel):
    name: str
    summary: str
    category: str
    state: str = "India"
    eligibility: str
    benefits: str
    documents: str
    application_steps: str
    official_url: Optional[str] = None
    source_name: Optional[str] = None
    verification_status: str = "pending"

class LessonOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    category: str
    language: str
    level: str
    content: str

class PostCreate(BaseModel):
    title: str = Field(min_length=3, max_length=200)
    body: str = Field(min_length=5, max_length=10000)
    category: str = "General"

class CommentCreate(BaseModel):
    body: str = Field(min_length=1, max_length=3000)

class EligibilityIn(BaseModel):
    state: str
    business_category: str
    entrepreneur_type: str = "individual"

class ChatIn(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    language: str = "en"
