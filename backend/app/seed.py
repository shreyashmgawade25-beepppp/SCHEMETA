from sqlalchemy import select
from app.database.connection import SessionLocal
from app.models import Scheme, Lesson

def seed():
    db = SessionLocal()
    try:
        if not db.scalar(select(Scheme.id).limit(1)):
            db.add(Scheme(
                name="Demonstration MSME Support Record",
                summary="Sample record used to demonstrate the scheme explorer. Replace with verified official information before public use.",
                category="MSME", state="India",
                eligibility="DEMO ONLY: eligibility criteria have not been verified.",
                benefits="DEMO ONLY: benefits have not been verified.",
                documents="Identity proof; business details (demonstration list only).",
                application_steps="1. Verify the official scheme. 2. Review eligibility. 3. Apply through the official portal.",
                official_url=None, source_name="Not yet verified", verification_status="demo"
            ))
        lessons = [
            ("UPI payment safety", "Digital Payments", "Use a trusted bank or payment app. Check the recipient name and amount before approving a payment. Never share your UPI PIN or OTP. You do not need to enter a UPI PIN to receive money. If you suspect fraud, contact your bank immediately through its official channel."),
            ("WhatsApp Business basics", "Digital Marketing", "Create a business profile with accurate hours, address and contact details. Use a product catalogue, quick replies and labels to organize customer conversations. Ask permission before sending promotional messages and avoid misleading claims."),
            ("Protecting your online accounts", "Cybersecurity", "Use unique passwords and multi-factor authentication where available. Do not open unexpected links or share OTPs. Keep your phone and apps updated. Contact service providers using official websites or numbers.")
        ]
        if not db.scalar(select(Lesson.id).limit(1)):
            for title, category, content in lessons:
                db.add(Lesson(title=title, category=category, content=content, language="en", level="beginner"))
        db.commit()
    finally:
        db.close()

if __name__ == "__main__":
    seed()
