import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InteractiveDemo from "./components/InteractiveDemo";
import IndustrySolutions from "./components/IndustrySolutions";
import FeaturesUseCases from "./components/FeaturesUseCases";
import PricingRoi from "./components/PricingRoi";
import BookingSystem from "./components/BookingSystem";
import FaqSecurity from "./components/FaqSecurity";
import Footer from "./components/Footer";
import WelcomeFlow from "./components/WelcomeFlow";
import Widgets from "./components/Widgets";
import { Sparkles, ArrowRight, ShieldCheck, Star } from "lucide-react";

export default function App() {
  const [showWelcomeWizard, setShowWelcomeWizard] = useState(false);

  // Smooth scroll to sections
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-white">
      {/* Dynamic Header */}
      <Header
        onStartSignup={() => setShowWelcomeWizard(true)}
        onBookDemo={() => scrollToSection("booking")}
        scrollToSection={scrollToSection}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Banner Section */}
        <Hero
          onStartSignup={() => setShowWelcomeWizard(true)}
          onScrollToDemo={() => scrollToSection("demo")}
        />

        {/* Dynamic Interactive Call Playground */}
        <InteractiveDemo />

        {/* Industry SEO Pages / Tabs */}
        <IndustrySolutions
          onDeployIndustry={(industryId) => {
            setShowWelcomeWizard(true);
          }}
        />

        {/* Features, Workflow builder & Document indexer */}
        <FeaturesUseCases
          onStartSignup={() => setShowWelcomeWizard(true)}
        />

        {/* Pricing Cards & ROI calculator */}
        <PricingRoi
          onSelectPlan={(planName) => {
            if (planName === "Contact Sales") {
              scrollToSection("booking");
            } else {
              setShowWelcomeWizard(true);
            }
          }}
        />

        {/* Inline Appointment Booking system */}
        <BookingSystem />

        {/* Compliance security & FAQ */}
        <FaqSecurity />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent floating conversion widgets & Exit Intent popups */}
      <Widgets onStartSignup={() => setShowWelcomeWizard(true)} />

      {/* Full Account Creation Onboarding Wizard popup */}
      {showWelcomeWizard && (
        <WelcomeFlow onClose={() => setShowWelcomeWizard(false)} />
      )}
    </div>
  );
}
