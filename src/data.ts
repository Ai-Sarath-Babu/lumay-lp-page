import { Industry, UseCase, PricingPlan, Integration, FaqItem, SecurityCertification } from "./types";

export const INDUSTRIES: Industry[] = [
  {
    id: "dental",
    name: "Dental Clinics",
    icon: "Activity",
    description: "Automate appointment booking, follow-up recalls, and emergency emergency coverage instantly without overloading your front-desk staff.",
    tagline: "Reduce appointment no-shows by 85% and handle 100% of after-hours patient emergency calls.",
    useCaseScenario: "Inbound Booking & Patient Recalls",
    conversionImprovement: "+45% booking rate",
    leadIncrease: "3.2x response speed",
    sampleScript: "Hi! Thanks for calling Apex Dental. I can help you schedule your annual teeth cleaning, check-up, or answer any basic dental questions today. When are you free next week?",
    sampleAudioTranscript: [
      "AI: Hi! Thanks for calling Apex Dental. Let's schedule your dental cleaning today. Are you a new or returning patient?",
      "Customer: I'm a returning patient. I would like to book a slot for next Wednesday morning.",
      "AI: Welcome back! I see your last visit was in November. I have a 9:00 AM and a 10:30 AM open on Wednesday. Which works best?",
      "Customer: Let's do 10:30 AM please.",
      "AI: Perfect! Booked for Wednesday, July 8th at 10:30 AM with Dr. Mercer. I'm sending a text confirmation to your number now."
    ]
  },
  {
    id: "realestate",
    name: "Real Estate",
    icon: "Home",
    description: "Instantly respond to inbound property inquiries, qualify home buyers, and schedule property walkthroughs 24/7.",
    tagline: "Qualify home inquiries in under 15 seconds to secure hot buyer leads before competitors reply.",
    useCaseScenario: "Lead Qualification & Property Viewing Setup",
    conversionImprovement: "+60% tour bookings",
    leadIncrease: "4.8x lead response rate",
    sampleScript: "Hello! Thank you for inquiring about the property on 405 Oak Avenue. I can check viewing times, tell you about the school district, or book a walkthrough with our agent. Would you like to schedule a tour?",
    sampleAudioTranscript: [
      "AI: Hello! Inquiring about the townhouse on Oak Avenue? I'd love to help.",
      "Customer: Yes, is it still available? And what's the HOA fee?",
      "AI: Yes, it is active! The HOA fee is $280 monthly, covering pool access and gardening. We are scheduling private walkthroughs tomorrow. Would you like a slot?",
      "Customer: Yes, afternoon is better.",
      "AI: I can book you for 3:30 PM with our realtor Sarah. Does that work?",
      "Customer: That works great.",
      "AI: Awesome, confirmed! I'm texting you the address and confirmation details."
    ]
  },
  {
    id: "restaurant",
    name: "Restaurants",
    icon: "Utensils",
    description: "Take custom phone reservations, handle carry-out/delivery status, and answer menu and dietary FAQ without missing dinner service.",
    tagline: "Free your kitchen and hosting staff from ringing phones. Handle 100 simultaneous reservation calls.",
    useCaseScenario: "Reservation Booking & Carryout FAQ",
    conversionImprovement: "+35% dinner bookings",
    leadIncrease: "0 missed reservation calls",
    sampleScript: "Hi! Thanks for calling Gusto Trattoria. I can book tables, answer menu questions, or check your online order status. Would you like to reserve a table for tonight?",
    sampleAudioTranscript: [
      "AI: Thanks for calling Gusto Trattoria! How can I help you dine with us?",
      "Customer: Can I reserve a table for 4 people tonight around 7:30?",
      "AI: Tonight at 7:30 PM... yes, we have a lovely booth available in the main dining room! Can I get your name to lock that in?",
      "Customer: Sure, it's Mark Daniels.",
      "AI: Perfect Mark, you are booked for 4 people at 7:30 PM. We hold tables for 15 minutes. See you soon!"
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare Clinics",
    icon: "HeartPulse",
    description: "Provide safe, HIPAA-compliant patient pre-screening, appointment routing, and prescription refill request intake.",
    tagline: "HIPAA-compliant voice AI that streamlines clinic intake triage and reduces hold times to zero.",
    useCaseScenario: "Patient Pre-screening & Clinic Routing",
    conversionImprovement: "-50% nurse phone hours",
    leadIncrease: "100% HIPAA compliant triage",
    sampleScript: "Hello, you've reached Pinecrest Health Clinic. For emergencies please dial 911. If you want to reschedule an appointment, request a prescription refill, or speak to a nurse, let me know.",
    sampleAudioTranscript: [
      "AI: Hello, you've reached Pinecrest Clinic. Are you calling to book an appointment or check lab results?",
      "Customer: I need to schedule a follow-up with Dr. Collins next week.",
      "AI: I can help with that. Are you currently experiencing any fever or respiratory symptoms?",
      "Customer: No, just standard checkup.",
      "AI: Good to hear. Dr. Collins has an opening next Tuesday at 2:00 PM. Does that work?"
    ]
  },
  {
    id: "insurance",
    name: "Insurance Agencies",
    icon: "ShieldAlert",
    description: "Qualify insurance lead applications, intake initial claims data, and prompt renewal reminders seamlessly over the phone.",
    tagline: "Instantly quote prospects and qualify inbound policy requests without human intervention.",
    useCaseScenario: "Quote Qualification & Outbound Renewal Alerts",
    conversionImprovement: "5.4x speed-to-lead",
    leadIncrease: "+40% renewal rate",
    sampleScript: "Hi! I'm the AI Assistant from Shield Mutual. Let's get you a quick quote for your home or auto insurance today. First, could you tell me which state you reside in?",
    sampleAudioTranscript: [
      "AI: Hi! Shield Mutual here. I can help set up an auto quote. Do you currently have active coverage?",
      "Customer: Yes, with State Farm, but it's getting too expensive.",
      "AI: I hear you. Let's see if we can save you some money. How many vehicles do you need to insure?",
      "Customer: Just two cars. A Corolla and a RAV4.",
      "AI: Excellent. I am preparing a preliminary quote now. Let me connect you to our agent to finalize your discounts."
    ]
  },
  {
    id: "automotive",
    name: "Automotive Dealers",
    icon: "Car",
    description: "Book service shop appointments, follow up on car test drives, and quote wholesale inventory availability 24/7.",
    tagline: "Automate outbound follow-ups on vehicle inquiries and maintain full service center calendar occupancy.",
    useCaseScenario: "Service Center Scheduling & Vehicle Inquiry Follow-up",
    conversionImprovement: "+50% shop appointments",
    leadIncrease: "+28% sales test drives",
    sampleScript: "Hi! Thanks for calling Elite Motors Service. I can book your car maintenance, check recalls, or query our current pre-owned inventory. What can I do for you?",
    sampleAudioTranscript: [
      "AI: Thanks for calling Elite Motors. Need to schedule maintenance or looking at a vehicle?",
      "Customer: Yes, I need an oil change and tire rotation for my Civic.",
      "AI: I can set that up. We have openings tomorrow at 11:00 AM or 1:30 PM. Do either of those work?",
      "Customer: 1:30 PM works great.",
      "AI: Perfect, booked for 1:30 PM tomorrow. Please bring it to service bay 3. See you then!"
    ]
  },
  {
    id: "ecommerce",
    name: "Ecommerce Brands",
    icon: "ShoppingBag",
    description: "Support order tracking lookup, assist with returns/refund requests, and upsell premium customer baskets.",
    tagline: "Drastically cut support costs and handle tracking queries on holiday peaks with zero delay.",
    useCaseScenario: "Order Tracking & Return Inquiries",
    conversionImprovement: "-65% support tickets",
    leadIncrease: "+18% retention rate",
    sampleScript: "Hi there! Thanks for calling LuMay Apparel Support. If you are calling about an existing order, please tell me your order ID or email address.",
    sampleAudioTranscript: [
      "AI: Thanks for calling LuMay Apparel! Need help tracking an order?",
      "Customer: Yes, order #8045. It was supposed to arrive yesterday.",
      "AI: Let me check that. Ah, I see it's in transit with UPS, scheduled for delivery today by 5:00 PM. I am texting you the tracking link now."
    ]
  },
  {
    id: "logistics",
    name: "Logistics Companies",
    icon: "Truck",
    description: "Handle carrier check-ins, automate shipment tracking updates, and intake freight quote requests.",
    tagline: "Automate driver check-ins and delivery scheduling to eliminate yard congestion and manual logging.",
    useCaseScenario: "Carrier Check-in & Dispatch Updates",
    conversionImprovement: "-80% dispatch hold time",
    leadIncrease: "100% automated delivery check-ins",
    sampleScript: "Thanks for calling Swift logistics dispatch. Drivers, please state your container number and warehouse location to check-in or request route support.",
    sampleAudioTranscript: [
      "AI: Swift Logistics Dispatch. State your trailer number to check in.",
      "Customer: Trailer is 5044, arriving at Dock 4 in Dallas.",
      "AI: Got it. Trailer 5044 at Dallas Dock 4 is logged. You are cleared to unload. I have texted you the gate code."
    ]
  },
  {
    id: "spa",
    name: "Spas & Salons",
    icon: "Flower2",
    description: "Manage calendar bookings, handle cancellations, offer treatment upsells, and answer questions about treatment packages.",
    tagline: "Settle appointments on the spot while your therapists focus entirely on active clients.",
    useCaseScenario: "Treatment Booking & Spa Upsells",
    conversionImprovement: "+52% online bookings",
    leadIncrease: "24/7 calendar filling",
    sampleScript: "Hello! Welcome to Serene Wellness Spa. I can book your massage, skin care facial, or help with gift cards today. What treatment are you looking to enjoy?",
    sampleAudioTranscript: [
      "AI: Welcome to Serene Wellness Spa! Which massage treatment can I schedule for you?",
      "Customer: Do you have openings for a deep tissue massage this Friday?",
      "AI: Yes, Friday at 3:00 PM or 5:00 PM are open. Would you like to upgrade that to our hot stone treatment for just twenty dollars?",
      "Customer: Oh, hot stone sounds wonderful, let's do the 5:00 PM with the upgrade."
    ]
  },
  {
    id: "saas",
    name: "SaaS Enterprises",
    icon: "Cpu",
    description: "Automate high-volume sales lead pre-qualification, demo bookings, and answer product API questions.",
    tagline: "Qualify inbound signups on the phone within seconds and increase demo conversions by 55%.",
    useCaseScenario: "Enterprise Sales Qualification",
    conversionImprovement: "+55% qualified demos",
    leadIncrease: "-45% sales cycles",
    sampleScript: "Hi there! Thanks for inquiring about LuMay Platform. I can answer technical capability questions, quote developer pricing, or book a demo with our Solutions Engineers. What company are you with?",
    sampleAudioTranscript: [
      "AI: Thanks for inquiring! To book a custom demo, may I ask your average monthly calling volume?",
      "Customer: We process around 100,000 call minutes per month.",
      "AI: That qualifies for our custom high-volume pricing. Let's schedule a call with our Director of Enterprise Sales. How does tomorrow at 2 PM sound?"
    ]
  }
];

export const USE_CASES: UseCase[] = [
  {
    id: "inbound-booking",
    title: "Appointment Booking",
    category: "inbound",
    description: "A seamless, intelligent call reception assistant that plugs directly into Google Calendar, Outlook, or your custom CRM to check availability and book clients without human assistance.",
    highlights: ["Ultra-low latency (<500ms)", "Calm, conversational booking flow", "Automated SMS confirmation", "Real-time calendar collision prevention"]
  },
  {
    id: "inbound-support",
    title: "24/7 Customer Support",
    category: "inbound",
    description: "Instantly respond to frequently asked customer questions, check delivery or billing status, solve support complaints, and escalate complex issues only when necessary.",
    highlights: ["Custom corporate knowledge base", "Maintains context through interruptions", "Automatic transcription & sentiment analysis", "Smooth agent handoff with summaries"]
  },
  {
    id: "inbound-routing",
    title: "Receptionist & Call Routing",
    category: "inbound",
    description: "Say goodbye to annoying, complex press-button IVRs. Let customers state what they need in natural language, and route them instantly to the right person or department.",
    highlights: ["Multi-department hot transfer", "Natural language speech understanding", "Intelligent queue management", "No 'press 1 for sales' required"]
  },
  {
    id: "outbound-qualification",
    title: "Lead Qualification & Sales",
    category: "outbound",
    description: "Instantly ring internet leads within 15 seconds of filling out web forms. Qualify client budgets, interests, and timelines, then hot-transfer hot buyers directly to live closing reps.",
    highlights: ["Near-instant speed-to-lead Response", "Structured CRM lead scoring", "Natural human tone and voice clones", "High connection rates and low spam detection"]
  },
  {
    id: "outbound-followup",
    title: "Customer Follow-ups & Recalls",
    category: "outbound",
    description: "Automatically contact past clients for renewal alerts, check satisfaction ratings, invite feedback, and recover lost accounts with warm, respectful outreach conversations.",
    highlights: ["Perfect compliance with telecommunication guidelines", "Flexible scheduling algorithms", "Personalized customer context integration", "High free-to-paid upgrade conversion"]
  },
  {
    id: "outbound-campaigns",
    title: "Mass Outbound Campaigns",
    category: "outbound",
    description: "Scale your outbound notifications, logistics updates, event reminders, or surveys to thousands of simultaneous calls instantly. Fully customizable and highly economical.",
    highlights: ["Process 10,000+ simultaneous calls", "Highly affordable ($0.05/minute)", "Comprehensive compliance & consent logs", "Exportable structured audio transcript analytics"]
  }
];

export const FEATURES = [
  {
    title: "Human-like Speech Synthesis",
    description: "Conversations sound indistinguishable from humans with real breathing, dynamic intonations, and customizable speech speeds across 100+ languages.",
    icon: "Volume2"
  },
  {
    title: "Ultra-Low Latency (<500ms)",
    description: "Engineered with proprietary WebSockets and cached voice models to keep conversational response delays below 500ms — keeping chats natural.",
    icon: "Zap"
  },
  {
    title: "Interruption Handling",
    description: "Unlike rigid IVR bots, LuMay immediately stops talking and listens when a human customer interrupts mid-sentence, matching normal social cues.",
    icon: "MessageSquareDashed"
  },
  {
    title: "Intelligent Long-term Memory",
    description: "Remembers customer names, past booking histories, and key context during calls and across multiple separate calling sessions.",
    icon: "Database"
  },
  {
    title: "Workflow & CRM Automation",
    description: "Directly trigger Salesforce, HubSpot, Zapier, or custom webhooks right as the call proceeds — e.g. booking calendars, texting PDFs, updating deal stages.",
    icon: "Workflow"
  },
  {
    title: "Comprehensive Voice Cloning",
    description: "Clone your best sales rep or receptionist's voice with just a 3-minute clear audio sample to maintain absolute brand identity.",
    icon: "Copy"
  },
  {
    title: "Structured Sentiment & Analytics",
    description: "Automatically analyzes call transcripts to score client sentiment, tag buying signals, score leads, and output CRM-ready bullet summaries.",
    icon: "BarChart3"
  },
  {
    title: "Enterprise Grade Security",
    description: "Maintains full SOC2 Type II, ISO 27001, GDPR, and HIPAA compliance to protect sensitive clinical, dental, and financial communication logs.",
    icon: "Lock"
  }
];

export const INTEGRATIONS: Integration[] = [
  { name: "Salesforce", category: "crm", description: "Sync contacts, call summaries, and automatically advance lead deal stages.", logo: "☁️" },
  { name: "HubSpot", category: "crm", description: "Instantly create contact cards, record call audio, and log lead sentiment scores.", logo: "🧡" },
  { name: "Zoho CRM", category: "crm", description: "Trigger follow-up outbound calling workflows when prospective leads are created.", logo: "🟥" },
  { name: "Twilio", category: "comm", description: "Rent local or toll-free global phone numbers and route outbound VoIP campaigns.", logo: "🔴" },
  { name: "Telnyx", category: "comm", description: "Low-latency VoIP calling with high-quality global carrier routes.", logo: "🟢" },
  { name: "Zapier", category: "auto", description: "Connect to 5,000+ business applications to trigger automated spreadsheets or emails.", logo: "💥" },
  { name: "Make.com", category: "auto", description: "Design complex visual scenario automations based on real-time call triggers.", logo: "💜" },
  { name: "Google Workspace", category: "prod", description: "Sync booked appointments directly to Google Calendar and send Gmail confirmations.", logo: "📅" },
  { name: "Slack", category: "prod", description: "Get real-time workspace alerts when critical leads book demos or request support.", logo: "💬" },
  { name: "PostgreSQL", category: "db", description: "Stream clinical records and system-level structured logs securely.", logo: "🐘" }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    price: "$0.05",
    minRate: "/ min",
    billing: "Pay as you go",
    description: "Perfect for SMBs, local clinics, and startups looking to automate phone reception and booking.",
    features: [
      "Inbound calling receptionist",
      "Outbound calling lead qualification",
      "Google & Outlook Calendar sync",
      "Standard text-to-speech voices",
      "5 Free calling minutes (No Credit Card)",
      "Standard webhook integrations",
      "Basic transcription & analytics logs"
    ],
    recommended: false,
    ctaText: "Create Free Agent"
  },
  {
    name: "Growth",
    price: "$0.12",
    minRate: "/ min",
    billing: "Billed monthly",
    description: "For rapid scale agencies, growing SaaS models, and multi-location medical or real estate operations.",
    features: [
      "Everything in Starter included",
      "100+ Ultra-realistic premium voices",
      "Custom voice cloning (3-min sample)",
      "Interruptions & custom filler cues",
      "Direct HubSpot & Salesforce sync",
      "Custom business knowledge base upload",
      "Priority API access and higher rate limits",
      "Dedicated account onboarding support"
    ],
    recommended: true,
    ctaText: "Start Free Trial"
  },
  {
    name: "Enterprise",
    price: "Custom",
    minRate: " Pricing",
    billing: "Volume discounts available",
    description: "For large-scale call centers, hospitals, financial groups, and massive high-volume outbound campaigns.",
    features: [
      "Everything in Growth included",
      "Custom negotiated volume minute rates",
      "Full HIPAA, SOC2, and ISO compliance suite",
      "On-premise or private cloud VPC hosting",
      "Dedicated Solutions Engineer support",
      "Guaranteed 99.99% system SLA",
      "Custom telephony trunk integrations (SIP/BYOC)",
      "Custom deep learning voice styling"
    ],
    recommended: false,
    ctaText: "Contact Sales"
  }
];

export const FAQS: FaqItem[] = [
  {
    question: "What is an AI Voice Agent?",
    answer: "An AI Voice Agent is an advanced conversational system that uses artificial intelligence, speech-to-text, LLM brains, and speech synthesis to understand spoken language over standard telephone lines and respond instantly with human-like speech. Unlike old press-button phone bots, our AI can maintain continuous context, understand complex inquiries, carry out tasks like scheduling, and react dynamically when interrupted."
  },
  {
    question: "How does the LuMay AI Voice Agent work?",
    answer: "It operates in a super-fast, three-step loop: 1) High-speed Speech-to-Text (STT) converts the caller's speech into digital text. 2) Our low-latency LLM processes the message against your custom guidelines and knowledge base to generate the perfect response. 3) Human-like Text-to-Speech (TTS) synthesizes the text back into lifelike audio. We have optimized this entire loop to take less than 500ms, making calls feel completely natural and fluid."
  },
  {
    question: "What is the cost of using the LuMay AI Voice Agent platform?",
    answer: "LuMay starts at an extremely affordable $0.05 per active call minute for our Starter plan with full pay-as-you-go flexibility. There are no hidden setup fees, server maintenance charges, or monthly minimums for the Starter tier. Enterprise customers with millions of monthly minutes qualify for high-volume custom rates significantly below $0.05/min. We also give every new account 5 free minutes to test with zero credit card required."
  },
  {
    question: "Is LuMay compliant with security standards like HIPAA and SOC2?",
    answer: "Yes, security and customer privacy are our highest priorities. LuMay is built on enterprise-grade infrastructure that maintains full SOC 2 Type II certification, ISO 27001 compliance, GDPR adherence, and offers HIPAA Business Associate Agreements (BAAs) for healthcare and dental clinics. All transcripts, recordings, and patient data are fully encrypted both in transit (TLS 1.3) and at rest (AES-256)."
  },
  {
    question: "How long does it take to deploy a custom voice agent?",
    answer: "You can literally deploy your first fully functional AI voice agent in under 5 minutes! Simply select your industry, choose one of our 100+ pre-trained professional voices, paste or write your custom guidelines (or let our AI wizard draft them for you), sync your booking calendar, and route your phone line. Our onboarding wizard takes you step-by-step from zero to a live testing call in seconds."
  },
  {
    question: "Can the AI agent handle callers interrupting them mid-sentence?",
    answer: "Yes, this is one of our key competitive advantages! LuMay is engineered with advanced real-time interruption detection. The moment your customer starts speaking, our voice agent instantly pauses its audio output, shifts to active listening, processes the new input, and adjusts its response dynamically. This eliminates the awkward 'talking over each other' issue found in legacy systems."
  },
  {
    question: "What integrations do you support?",
    answer: "We support over 100+ direct integrations. This includes CRMs like Salesforce, HubSpot, and Zoho; calendar tools like Google Calendar and Outlook; automation engines like Zapier, Make.com, and n8n; and standard telephony carriers such as Twilio, Plivo, and Telnyx. You can also trigger custom external API calls or webhooks in real-time as the phone conversation proceeds."
  }
];

export const SECURITY_CERTIFICATIONS: SecurityCertification[] = [
  { name: "SOC 2 Type II Certified", status: "Active Compliance", description: "Independent audit verifying strict security, availability, and confidentiality protocols." },
  { name: "ISO/IEC 27001:2022", status: "Global Standard", description: "Certified information security management systems protecting sensitive enterprise directories." },
  { name: "HIPAA Compliant", status: "BAA Available", description: "Full physical, network, and process security measures meeting healthcare patient privacy laws." },
  { name: "GDPR & CCPA Compliant", status: "Data Sovereignty", description: "Respecting consumer privacy rights with comprehensive logs, data encryption, and instant deletion controls." }
];

export const TRUST_METRICS = [
  { value: "5,000+", label: "Trusted Businesses" },
  { value: "50M+", label: "Calls Processed" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "<500ms", label: "Speech Latency" }
];
