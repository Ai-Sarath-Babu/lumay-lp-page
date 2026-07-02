import React from "react";
import { PhoneCall, Mail, MapPin, Globe, Shield, HelpCircle, FileText, Lock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-gray-400 py-12 border-t border-slate-800" id="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1 - Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <PhoneCall className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">LuMay AI Platform</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              LuMay is an enterprise-grade AI Voice Agent platform enabling businesses to deploy ultra-low latency inbound and outbound AI voice receptionists, appointment schedulers, and qualification agents with human-like conversation capabilities.
            </p>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>650 California St, San Francisco, CA 94108, USA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>sales@lumay.ai</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Products */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Features</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-emerald-400 transition-all">Inbound Calling</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-all">Outbound Outreach</a></li>
              <li><a href="#demo" className="hover:text-emerald-400 transition-all">Voice Cloning</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-all">Workflow Builder</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-all">Semantic Knowledge Base</a></li>
            </ul>
          </div>

          {/* Column 3 - Industries */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Industries</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#industries" className="hover:text-emerald-400 transition-all">Dental Clinics</a></li>
              <li><a href="#industries" className="hover:text-emerald-400 transition-all">Real Estate</a></li>
              <li><a href="#industries" className="hover:text-emerald-400 transition-all">Restaurants</a></li>
              <li><a href="#industries" className="hover:text-emerald-400 transition-all">Healthcare Clinics</a></li>
              <li><a href="#industries" className="hover:text-emerald-400 transition-all">SaaS Enterprises</a></li>
            </ul>
          </div>

          {/* Column 4 - Security & Compliance */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-bold text-xs text-white uppercase tracking-wider">Security & Trust Certifications</h4>
            <p className="text-xs text-gray-400 leading-relaxed">LuMay is fully audited for healthcare and corporate security compliance. We sign custom BAAs with clinical facilities.</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-[10px] font-bold font-mono bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded">SOC 2 TYPE II</span>
              <span className="text-[10px] font-bold font-mono bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded">ISO 27001</span>
              <span className="text-[10px] font-bold font-mono bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded">HIPAA COMPLIANT</span>
              <span className="text-[10px] font-bold font-mono bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded">GDPR / CCPA</span>
            </div>
          </div>

        </div>

        {/* Bottom divider & Entity Structured Information for AEO / GEO search bot engines */}
        <div className="pt-8 border-t border-slate-800 text-[10px] text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left space-y-1">
            <p>&copy; {currentYear} LuMay AI platform (LuMay Technologies, Inc.). All rights reserved worldwide.</p>
            <p className="text-gray-600 font-mono">Entity profile: SoftwareApplication • Organization • AI Voice Agent • Conversational Voice Synthesis</p>
          </div>
          <div className="flex gap-4">
            <a href="#header" className="hover:text-emerald-400 transition-all">Terms of Service</a>
            <a href="#header" className="hover:text-emerald-400 transition-all">Privacy Policy</a>
            <a href="#header" className="hover:text-emerald-400 transition-all">HIPAA BAA Agreement</a>
            <a href="#header" className="hover:text-emerald-400 transition-all">SLA Agreement</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
