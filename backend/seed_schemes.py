
from sqlalchemy.orm import sessionmaker

from app.database.connection import engine
from app.models import Scheme

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

SCHEMES = [
    {
        "name": "Pradhan Mantri MUDRA Yojana",
        "summary": "A government initiative supporting eligible micro and small businesses through institutional loans.",
        "category": "Business Finance",
        "state": "India",
        "eligibility": "Eligible non-corporate, non-farm micro and small business activities. Actual eligibility depends on lender and applicable scheme rules.",
        "benefits": "Access to institutional business credit under applicable MUDRA loan categories.",
        "documents": "Identity proof, address proof, business details and documents requested by the lending institution.",
        "application_steps": "Contact a participating bank or lending institution. Check current eligibility and loan terms before applying.",
        "official_url": "https://www.mudra.org.in/",
        "source_name": "MUDRA official website",
        "verification_status": "demo",
    },
    {
        "name": "PM Employment Generation Programme",
        "summary": "A credit-linked subsidy programme intended to support eligible entrepreneurs establishing new micro-enterprises.",
        "category": "Entrepreneurship",
        "state": "India",
        "eligibility": "Eligibility depends on applicant category, project type, project cost and current programme guidelines.",
        "benefits": "Margin-money subsidy subject to applicable rules and approval.",
        "documents": "Identity proof, project report, category documents where applicable and other documents requested by the implementing agency.",
        "application_steps": "Review the latest guidelines and apply through the official KVIC PMEGP portal.",
        "official_url": "https://www.kviconline.gov.in/pmegpeportal/",
        "source_name": "KVIC PMEGP portal",
        "verification_status": "demo",
    },
    {
        "name": "PM Vishwakarma",
        "summary": "A central government scheme supporting eligible traditional artisans and craftspeople.",
        "category": "Skill Development",
        "state": "India",
        "eligibility": "Eligibility is restricted to notified traditional trades and applicants meeting the current scheme conditions.",
        "benefits": "May include skill training, toolkit support, credit support and other benefits under scheme rules.",
        "documents": "Aadhaar and other identity, occupation and registration information required by the scheme.",
        "application_steps": "Check the official portal for eligible trades, registration requirements and current application instructions.",
        "official_url": "https://pmvishwakarma.gov.in/",
        "source_name": "PM Vishwakarma official portal",
        "verification_status": "demo",
    },
    {
        "name": "Stand-Up India",
        "summary": "A lending initiative designed to support eligible SC/ST and women entrepreneurs establishing greenfield enterprises.",
        "category": "Business Finance",
        "state": "India",
        "eligibility": "Subject to the current scheme's applicant, ownership, enterprise and lending conditions.",
        "benefits": "Bank loans for eligible greenfield enterprises under applicable lending rules.",
        "documents": "Identity proof, business plan, ownership details and bank-required financial documents.",
        "application_steps": "Review current scheme availability and eligibility through the official government portal or participating bank.",
        "official_url": "https://www.standupmitra.in/",
        "source_name": "Stand-Up India portal",
        "verification_status": "demo",
    },
    {
        "name": "Maharashtra Chief Minister Employment Generation Programme",
        "summary": "A Maharashtra initiative intended to encourage eligible micro-enterprise creation and employment generation.",
        "category": "Entrepreneurship",
        "state": "Maharashtra",
        "eligibility": "Subject to current Maharashtra programme guidelines, applicant conditions and project requirements.",
        "benefits": "Support may be available as per current programme rules and approval.",
        "documents": "Identity proof, residence proof, project report and applicable category or business documents.",
        "application_steps": "Check current programme availability and application instructions with the Maharashtra implementing agency.",
        "official_url": "https://maha-cmegp.gov.in/",
        "source_name": "Maharashtra CMEGP portal",
        "verification_status": "demo",
    },
    {
        "name": "PM Formalisation of Micro Food Processing Enterprises",
        "summary": "A programme supporting eligible micro food-processing enterprises through formalisation and related assistance.",
        "category": "Food Processing",
        "state": "India",
        "eligibility": "Subject to current programme rules, enterprise conditions and applicable application windows.",
        "benefits": "Support may include credit-linked subsidy and capacity-building assistance under programme guidelines.",
        "documents": "Identity proof, enterprise details, project report and documents required by the implementing agency.",
        "application_steps": "Consult the official PMFME portal and relevant state nodal agency for current application instructions.",
        "official_url": "https://pmfme.mofpi.gov.in/",
        "source_name": "Ministry of Food Processing Industries",
        "verification_status": "demo",
    },
]


def seed_schemes():
    db = SessionLocal()
    inserted = 0

    try:
        for scheme_data in SCHEMES:
            existing = db.query(Scheme).filter(
                Scheme.name == scheme_data["name"]
            ).first()

            if existing:
                print(f"Already exists: {scheme_data['name']}")
                continue

            db.add(Scheme(**scheme_data))
            inserted += 1

        db.commit()
        print(f"\nSuccessfully inserted {inserted} scheme records.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_schemes()
