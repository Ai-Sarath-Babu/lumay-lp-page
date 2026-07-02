import React, { useState } from "react";
import { FAQS, SECURITY_CERTIFICATIONS } from "../data";
import { Lock, HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Activity, Key, Server } from "lucide-react";

export default function FaqSecurity() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section className="py-16 bg-white border-b border-gray-100" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* PART 1: SECURITY & COMPLIANCE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Certifications cards list */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>Enterprise Grade Security</span>
            </div>
            <h2 className="font-display font-bold text-3xl text-gray-900 tracking-tight leading-tight">
              HIPAA Compliant & SOC 2 Type II Certified
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We understand that clinical dental patient files, home buyer finances, and enterprise customer data are highly sensitive. LuMay implements rigorous protocols to protect privacy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {SECURITY_CERTIFICATIONS.map((cert) => (
                <div key={cert.name} className="bg-slate-50 border border-gray-100 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="font-display font-bold text-sm text-gray-900">{cert.name}</h4>
                    <span className="text-[9px] bg-emerald-50 border border-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-extrabold uppercase font-mono">{cert.status}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Encrypt specs details */}
          <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent opacity-65 pointer-events-none" />
            
            <h3 className="font-display font-semibold text-lg border-b border-white/10 pb-3 flex items-center gap-2 relative z-10 text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Infrastructure Encryption Protocol
            </h3>

            <div className="space-y-4 relative z-10 text-xs sm:text-sm">
              <div className="flex gap-3">
                <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl h-10 w-10 flex items-center justify-center text-emerald-400">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-100">AES-256 & TLS 1.3 Encryption</h4>
                  <p className="text-gray-400 text-xs mt-0.5">All voice streams, transcript logs, and API requests are protected under TLS 1.3 transit tunnels and AES-256 storage standard keys.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl h-10 w-10 flex items-center justify-center text-emerald-400">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-100">Role-Based Access Control (RBAC) & SSO</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Protect team databases with Okta or Azure AD Single-Sign-On integrations and strict permission roles (Admin, Agent, Billing).</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="p-2.5 bg-white/5 border border-white/10 rounded-xl h-10 w-10 flex items-center justify-center text-emerald-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-100">Real-time Call Auditing Logs</h4>
                  <p className="text-gray-400 text-xs mt-0.5">Every call processes a full chronological action trail in your enterprise tenant dashboard, fully exportable to external SIEM tools.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* PART 2: AEO-OPTIMIZED FAQ SECTION */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>AEO Optimization Core Answers</span>
            </div>
            <h3 className="font-display font-bold text-3xl text-gray-900 tracking-tight">
              Frequently Asked Questions (FAQ)
            </h3>
            <p className="text-gray-600">
              Clear, definitive structural answers optimized for conversational AI engines (Perplexity, ChatGPT Search, Gemini Overview).
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-slate-100/50 border border-gray-100 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left flex justify-between items-center font-display font-semibold text-xs sm:text-sm text-gray-900 focus:outline-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
