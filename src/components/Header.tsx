import React from "react";
import { PhoneCall, Calendar, ArrowRight, Menu, X, Star } from "lucide-react";

interface HeaderProps {
  onStartSignup: () => void;
  onBookDemo: () => void;
  scrollToSection: (id: string) => void;
}

export default function Header({ onStartSignup, onBookDemo, scrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: "Interactive Demo", id: "demo" },
    { label: "Industries", id: "industries" },
    { label: "Features", id: "features" },
    { label: "Integrations", id: "integrations" },
    { label: "Pricing", id: "pricing" },
    { label: "ROI Calculator", id: "roi" },
    { label: "FAQ", id: "faq" }
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm" id="header">
      {/* Promo Ticker Bar */}
      <div className="w-full bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 text-white text-xs font-medium py-2 px-4 text-center flex items-center justify-center gap-2 relative">
        <span>🔥 <strong>500 Free Minutes Available</strong> This Month — No Credit Card Required</span>
        <button 
          onClick={onStartSignup}
          className="underline hover:text-emerald-100 flex items-center gap-0.5 ml-2 transition-all cursor-pointer"
        >
          Claim Now <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-200">
              <PhoneCall className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-gray-900">LuMay</span>
              <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full ml-1.5">Voice AI</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onBookDemo}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 border border-gray-200 hover:border-emerald-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer bg-white"
            >
              <Calendar className="w-4 h-4 text-emerald-600" />
              Book Live Demo
            </button>
            <button
              onClick={onStartSignup}
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 rounded-xl shadow-md shadow-emerald-100 hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Create Free Agent
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-emerald-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-emerald-600 transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <button
              onClick={() => {
                onBookDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-xl transition-all flex items-center justify-center gap-1.5 bg-white"
            >
              <Calendar className="w-4 h-4 text-emerald-600" />
              Book Live Demo
            </button>
            <button
              onClick={() => {
                onStartSignup();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 text-center text-sm font-medium text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 rounded-xl shadow-md shadow-emerald-100 hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              Create Free Agent
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
