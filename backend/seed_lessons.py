
from sqlalchemy.orm import sessionmaker

from app.database.connection import engine
from app.models import Lesson

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

LESSONS = [
    {
        "title": "Introduction to Digital Payments",
        "category": "Digital Payments",
        "language": "en",
        "level": "beginner",
        "content": """
LEARNING OBJECTIVE
Understand digital payments and how they help small businesses.

1. WHAT ARE DIGITAL PAYMENTS?
Digital payments allow money to be transferred electronically without using physical cash.

2. COMMON PAYMENT METHODS
- UPI
- Debit and credit cards
- Internet banking
- Mobile banking
- QR code payments

3. HOW UPI WORKS
UPI allows users to transfer money between bank accounts using supported payment applications.

4. BENEFITS FOR SMALL BUSINESSES
- Faster payments
- Reduced cash handling
- Easier transaction records
- Convenient customer experience

PRACTICAL ACTIVITY
Identify two digital payment methods commonly used by shops in your area.

IMPORTANT
Never share your UPI PIN or OTP with anyone.
"""
    },
    {
        "title": "UPI Safety and Fraud Prevention",
        "category": "Digital Safety",
        "language": "en",
        "level": "beginner",
        "content": """
LEARNING OBJECTIVE
Learn to identify common digital payment scams.

COMMON FRAUD METHODS
- Fake payment screenshots
- Fraudulent QR codes
- Fake customer-care numbers
- Phishing links
- Requests for OTPs and UPI PINs

SAFETY RULES
1. Never share your OTP or UPI PIN.
2. Verify payments in your own bank or payment app.
3. Do not trust screenshots as proof of payment.
4. Never enter your UPI PIN to receive money.
5. Contact your bank through its official channels.

IF YOU SUSPECT FRAUD
Contact your bank immediately and report cyber financial fraud through India's official cybercrime reporting channels.

PRACTICAL ACTIVITY
Make a checklist of five safety rules for your business.
"""
    },
    {
        "title": "Creating a Business Presence on WhatsApp",
        "category": "Digital Marketing",
        "language": "en",
        "level": "beginner",
        "content": """
LEARNING OBJECTIVE
Learn how WhatsApp Business can help a small business.

GETTING STARTED
1. Install WhatsApp Business.
2. Create your business profile.
3. Add your business name and category.
4. Add working hours and contact details.
5. Upload a clear business profile image.

USEFUL FEATURES
- Product catalogue
- Quick replies
- Greeting messages
- Labels for customer conversations
- Business profile

PRACTICAL ACTIVITY
Create a sample business profile and add three products to its catalogue.

TIP
Ask customers for permission before sending promotional messages.
"""
    },
    {
        "title": "Introduction to Social Media Marketing",
        "category": "Digital Marketing",
        "language": "en",
        "level": "beginner",
        "content": """
LEARNING OBJECTIVE
Understand how social media can help entrepreneurs reach customers.

POPULAR PLATFORMS
- Instagram
- Facebook
- YouTube
- WhatsApp

CONTENT IDEAS
- Product photographs
- Short demonstration videos
- Customer testimonials
- Offers and announcements
- Behind-the-scenes videos

BASIC MARKETING STRATEGY
1. Identify your target customers.
2. Select suitable platforms.
3. Publish useful and relevant content.
4. Respond to customer questions.
5. Review engagement and enquiries.

PRACTICAL ACTIVITY
Prepare three social media post ideas for your business.

TIP
Use genuine product images and accurate pricing.
"""
    },
    {
        "title": "Taking Better Product Photographs",
        "category": "Digital Marketing",
        "language": "en",
        "level": "beginner",
        "content": """
LEARNING OBJECTIVE
Learn to photograph products using a smartphone.

PHOTOGRAPHY BASICS
1. Clean your camera lens.
2. Use natural light when possible.
3. Choose a simple background.
4. Keep the product in focus.
5. Take photographs from multiple angles.

BEFORE PUBLISHING
- Check image clarity.
- Show the actual product.
- Avoid misleading editing.
- Include useful product information.

PRACTICAL ACTIVITY
Photograph one product from three different angles.

TIP
A clean and well-lit photograph can make a product easier for customers to understand.
"""
    },
    {
        "title": "Starting an Online Store",
        "category": "E-commerce",
        "language": "en",
        "level": "intermediate",
        "content": """
LEARNING OBJECTIVE
Understand the basic steps involved in selling products online.

STEP 1: SELECT PRODUCTS
Identify products that customers want to purchase.

STEP 2: PREPARE PRODUCT INFORMATION
Include:
- Product name
- Description
- Price
- Photographs
- Availability

STEP 3: SELECT A SALES CHANNEL
Options may include:
- Social media
- Business messaging applications
- E-commerce marketplaces
- Your own website

STEP 4: PLAN OPERATIONS
Decide how orders, payments, packaging, delivery and returns will be managed.

PRACTICAL ACTIVITY
Prepare a catalogue of five products with prices and descriptions.

IMPORTANT
Review platform fees, seller conditions and applicable legal requirements before starting.
"""
    },
    {
        "title": "Understanding Online Customer Service",
        "category": "E-commerce",
        "language": "en",
        "level": "beginner",
        "content": """
LEARNING OBJECTIVE
Learn how to communicate professionally with online customers.

GOOD CUSTOMER SERVICE
- Respond politely.
- Provide accurate product information.
- Explain delivery timelines.
- Communicate prices clearly.
- Handle complaints respectfully.

SAMPLE RESPONSE
Hello! Thank you for contacting our business. Please share the product you are interested in, and we will provide its price and availability.

PRACTICAL ACTIVITY
Write a polite response to a customer asking about product delivery.

TIP
Never promise a delivery date or product feature you cannot guarantee.
"""
    },
    {
        "title": "Using Spreadsheets for Business Records",
        "category": "Digital Fundamentals",
        "language": "en",
        "level": "beginner",
        "content": """
LEARNING OBJECTIVE
Understand how spreadsheets help small businesses maintain records.

IMPORTANT COLUMNS
- Date
- Product name
- Quantity sold
- Selling price
- Total amount
- Payment status

BASIC FORMULA
If quantity is in B2 and price is in C2:

=B2*C2

This calculates the total sales amount for that row.

WHY KEEP RECORDS?
- Monitor sales.
- Track expenses.
- Understand popular products.
- Maintain transaction history.

PRACTICAL ACTIVITY
Create a spreadsheet recording five sample sales transactions.

IMPORTANT
Protect customer information and maintain secure backups.
"""
    },
    {
        "title": "Recognising Online Scams and Phishing",
        "category": "Digital Safety",
        "language": "en",
        "level": "beginner",
        "content": """
LEARNING OBJECTIVE
Identify suspicious messages, links and online offers.

WARNING SIGNS
- Unexpected prize messages.
- Requests for passwords or OTPs.
- Urgent payment demands.
- Unknown links.
- Offers that sound too good to be true.

HOW TO STAY SAFE
1. Verify the sender.
2. Avoid opening suspicious links.
3. Use official websites and applications.
4. Never share passwords.
5. Report suspicious activity.

PRACTICAL ACTIVITY
Review a suspicious message and list three warning signs.

TIP
Do not rely on a message's logo or display name to establish authenticity.
"""
    },
    {
        "title": "डिजिटल पेमेंट की शुरुआत",
        "category": "Digital Payments",
        "language": "hi",
        "level": "beginner",
        "content": """
सीखने का उद्देश्य
डिजिटल पेमेंट और उसके उपयोग को समझना।

डिजिटल पेमेंट क्या है?
मोबाइल या इंटरनेट की सहायता से इलेक्ट्रॉनिक तरीके से पैसे भेजना या प्राप्त करना डिजिटल पेमेंट कहलाता है।

प्रमुख तरीके
- UPI
- डेबिट कार्ड
- क्रेडिट कार्ड
- इंटरनेट बैंकिंग
- मोबाइल बैंकिंग

UPI के फायदे
1. जल्दी भुगतान।
2. नकद रखने की आवश्यकता कम।
3. लेन-देन का रिकॉर्ड।
4. ग्राहकों के लिए आसान भुगतान।

सुरक्षा के नियम
- अपना UPI PIN किसी को न बताएं।
- OTP साझा न करें।
- पैसे प्राप्त करने के लिए UPI PIN डालने की जरूरत नहीं होती।

अभ्यास
अपने आसपास की दुकानों में इस्तेमाल होने वाले दो डिजिटल पेमेंट तरीकों के नाम लिखें।
"""
    },
    {
        "title": "डिजिटल सुरक्षा और ऑनलाइन धोखाधड़ी",
        "category": "Digital Safety",
        "language": "hi",
        "level": "beginner",
        "content": """
सीखने का उद्देश्य
ऑनलाइन धोखाधड़ी से बचने के तरीके समझना।

धोखाधड़ी के सामान्य तरीके
- नकली पेमेंट स्क्रीनशॉट।
- फर्जी QR कोड।
- नकली कस्टमर केयर नंबर।
- संदिग्ध लिंक।
- OTP या PIN मांगना।

सुरक्षा के तरीके
1. OTP और UPI PIN साझा न करें।
2. अपने बैंक ऐप में भुगतान की पुष्टि करें।
3. अनजान लिंक पर क्लिक न करें।
4. बैंक से केवल आधिकारिक माध्यम से संपर्क करें।

अभ्यास
अपने व्यवसाय के लिए पांच डिजिटल सुरक्षा नियम लिखें।
"""
    },
    {
        "title": "डिजिटल पेमेंटची ओळख",
        "category": "Digital Payments",
        "language": "mr",
        "level": "beginner",
        "content": """
शिकण्याचा उद्देश
डिजिटल पेमेंट म्हणजे काय आणि त्याचा व्यवसायात कसा उपयोग होतो हे समजून घेणे.

डिजिटल पेमेंट म्हणजे काय?
मोबाईल किंवा इंटरनेटच्या मदतीने इलेक्ट्रॉनिक पद्धतीने पैसे पाठवणे किंवा स्वीकारणे म्हणजे डिजिटल पेमेंट.

प्रमुख पद्धती
- UPI
- डेबिट कार्ड
- क्रेडिट कार्ड
- इंटरनेट बँकिंग
- मोबाईल बँकिंग

फायदे
1. जलद व्यवहार.
2. रोख रक्कम हाताळण्याची गरज कमी.
3. व्यवहारांची नोंद ठेवता येते.
4. ग्राहकांना सोयीस्कर पेमेंट करता येते.

सुरक्षिततेचे नियम
- तुमचा UPI PIN कोणालाही सांगू नका.
- OTP शेअर करू नका.
- पैसे मिळवण्यासाठी UPI PIN टाकण्याची आवश्यकता नसते.

सराव
तुमच्या परिसरातील दुकानांमध्ये वापरल्या जाणाऱ्या दोन डिजिटल पेमेंट पद्धती लिहा.
"""
    },
]


def seed_lessons():
    db = SessionLocal()
    inserted = 0

    try:
        for lesson_data in LESSONS:
            existing = db.query(Lesson).filter(
                Lesson.title == lesson_data["title"],
                Lesson.language == lesson_data["language"]
            ).first()

            if existing:
                print(f"Already exists: {lesson_data['title']}")
                continue

            db.add(Lesson(**lesson_data, published=True))
            inserted += 1

        db.commit()
        print(f"\nSuccessfully inserted {inserted} lessons.")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_lessons()
