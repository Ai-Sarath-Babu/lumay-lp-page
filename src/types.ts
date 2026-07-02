export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
}

export interface Industry {
  id: string;
  name: string;
  icon: string;
  description: string;
  tagline: string;
  sampleScript: string;
  conversionImprovement: string;
  leadIncrease: string;
  useCaseScenario: string;
  sampleAudioTranscript: string[];
}

export interface UseCase {
  id: string;
  title: string;
  category: "inbound" | "outbound";
  description: string;
  highlights: string[];
}

export interface PricingPlan {
  name: string;
  price: string;
  minRate: string;
  billing: string;
  description: string;
  features: string[];
  recommended: boolean;
  ctaText: string;
}

export interface Integration {
  name: string;
  category: "crm" | "comm" | "auto" | "prod" | "db";
  description: string;
  logo: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SecurityCertification {
  name: string;
  status: string;
  description: string;
}
