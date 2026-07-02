import React, { useState } from "react";
import { INDUSTRIES, USE_CASES } from "../data";
import { Sparkles, Check, ArrowRight, ArrowLeft, Shield, CheckCircle2, Copy, Eye, Lock, Globe, Building2, User, Mail, Phone, ChevronRight } from "lucide-react";

interface WelcomeFlowProps {
  onClose: () => void;
}

export default function WelcomeFlow({ onClose }: WelcomeFlowProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0: signup, 1: industry, 2: usecase, 3: voice, 4: number, 5: launched

  // Signup form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    industry: "Dental",
    country: "United States"
  });

  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0].id);
  const [selectedUseCase, setSelectedUseCase] = useState(USE_CASES[0].id);
  const [selectedVoice, setSelectedVoice] = useState("Sarah");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [provisionedNumber, setProvisionedNumber] = useState("");
  const [isProvisioning, setIsProvisioning] = useState(false);

  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Quick provisioner simulation
  const handleProvisionNumber = () => {
    setIsProvisioning(true);
    setTimeout(() => {
      const areaCodes = ["415", "650", "212", "312", "206", "310"];
      const randArea = areaCodes[Math.floor(Math.random() * areaCodes.length)];
      const randMid = Math.floor(100 + Math.random() * 900);
      const randEnd = Math.floor(1000 + Math.random() * 9000);
      setProvisionedNumber(`+1 (${randArea}) ${randMid}-${randEnd}`);
      setIsProvisioning(false);
      setCurrentStep(5); // Show Launched state
    }, 1800);
  };

  const VOICES = [
    { name: "Sarah", gender: "Female", desc: "Warm reception & clinical dentist assistant" },
    { name: "Sophia", gender: "Female", desc: "SaaS & property viewing host" },
    { name: "David", gender: "Male", desc: "Logistics dispatch & auto service broker" },
    { name: "Ethan", gender: "Male", desc: "Insurance, customer support & refunds" }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden relative">
        
        {/* Top Progress bar */}
        {currentStep > 0 && currentStep < 5 && (
          <div className="w-full h-1.5 bg-gray-100 flex">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`h-full flex-grow transition-all duration-350 ${
                  i < currentStep ? "bg-emerald-600" : "bg-gray-100"
                }`}
              />
            ))}
          </div>
        )}

        {/* Step Indicator details */}
        {currentStep > 0 && currentStep < 5 && (
          <div className="px-6 py-3 border-b border-gray-100 flex justify-between items-center bg-slate-50">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Onboarding Wizard</span>
            <span className="text-xs font-bold text-emerald-600 font-mono">Step {currentStep} of 4</span>
          </div>
        )}

        <div className="p-6 sm:p-8">
          
          {/* STEP 0: CREATE ACCOUNT */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="font-display font-bold text-2xl text-gray-900">Create Your LuMay Platform Account</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">Get <strong>5 Free Calling Minutes</strong> instantly. No credit card, commitment, or technical setup required.</p>
              </div>

              {/* Continue with Google button */}
              <button
                onClick={() => {
                  setFormData({
                    name: "Alex Mercer",
                    email: "alex.mercer@company.com",
                    company: "Mercer Dental Labs",
                    phone: "+1 (415) 555-1200",
                    industry: "Healthcare",
                    country: "United States"
                  });
                  setCurrentStep(1);
                }}
                className="w-full py-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl text-sm font-semibold text-gray-700 transition-all flex items-center justify-center gap-2.5 cursor-pointer bg-white"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.281 1.094 15.477 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.839 11.57-11.79 0-.79-.086-1.393-.189-1.925H12.24z"/>
                </svg>
                Continue with Google
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-xs text-gray-400 font-bold uppercase tracking-wider font-mono">Or Register Manually</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* Manual Form fields */}
              <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(1); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-emerald-600" /> Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-gray-800"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-emerald-600" /> Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-emerald-600" /> Company Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Mercer Labs Inc"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-gray-800"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-600 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" /> Mobile Phone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (415) 555-0199"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-gray-800"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs text-gray-500">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="terms">I agree to LuMay's Terms of Service and HIPAA Privacy Policies</label>
                </div>

                <button
                  type="submit"
                  disabled={!agreedToTerms}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Create Free Account
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="text-center">
                <button onClick={onClose} className="text-xs font-medium text-gray-400 hover:text-gray-600 underline">Cancel & Back to Homepage</button>
              </div>
            </div>
          )}

          {/* STEP 1: CHOOSE INDUSTRY */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xl text-gray-900">Step 1: Choose Your Core Business Industry</h4>
                <p className="text-xs text-gray-500">This helps our AI system preset perfect conversational templates, guidelines, compliance guards, and terminology.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedIndustry(ind.id)}
                    className={`p-3 text-left rounded-xl border transition-all flex flex-col justify-between cursor-pointer ${
                      selectedIndustry === ind.id
                        ? "border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm"
                        : "border-gray-100 hover:border-gray-200 text-gray-600 bg-slate-50/50"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold text-xs sm:text-sm text-gray-900">{ind.name}</span>
                      {selectedIndustry === ind.id && <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2 line-clamp-2 leading-relaxed">{ind.description}</p>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => setCurrentStep(0)}
                  className="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-sm font-semibold text-gray-600 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Next: Select Scenario <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE USE CASE */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xl text-gray-900">Step 2: What is the Primary Agent Scenario?</h4>
                <p className="text-xs text-gray-500">Pick the main phone call workflow. We preset the database routing and action guidelines.</p>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {USE_CASES.map((uc) => (
                  <button
                    key={uc.id}
                    onClick={() => setSelectedUseCase(uc.id)}
                    className={`w-full p-4 text-left rounded-xl border transition-all flex items-start gap-3.5 cursor-pointer ${
                      selectedUseCase === uc.id
                        ? "border-emerald-600 bg-emerald-50/70 text-emerald-900 shadow-sm"
                        : "border-gray-100 hover:border-gray-200 text-gray-600 bg-slate-50/50"
                    }`}
                  >
                    <div className="mt-1">
                      <div className={`w-2.5 h-2.5 rounded-full ${uc.category === "inbound" ? "bg-emerald-500" : "bg-blue-500"}`} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">{uc.title}</span>
                        <span className={`text-[9px] font-extrabold uppercase px-1.5 rounded ${uc.category === "inbound" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}`}>
                          {uc.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">{uc.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-sm font-semibold text-gray-600 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Next: Voice Persona <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CHOOSE VOICE & LANGUAGE */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xl text-gray-900">Step 3: Select Voice Tone & Language</h4>
                <p className="text-xs text-gray-500">Pick a pre-trained human-like voice. We clone and configure the synthesis accent.</p>
              </div>

              <div className="space-y-4">
                {/* Voice grid */}
                <div className="grid grid-cols-2 gap-3">
                  {VOICES.map((vc) => (
                    <button
                      key={vc.name}
                      onClick={() => setSelectedVoice(vc.name)}
                      className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                        selectedVoice === vc.name
                          ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm"
                          : "border-gray-100 hover:border-gray-200 text-gray-600"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs text-gray-900">{vc.name}</span>
                        <span className={`text-[9px] px-1.5 rounded-full ${selectedVoice === vc.name ? "bg-emerald-200 text-emerald-800" : "bg-gray-100 text-gray-500"}`}>Active</span>
                      </div>
                      <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">{vc.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Language list */}
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Agent Conversation Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 hover:border-gray-300 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  >
                    {["English", "Spanish", "French", "German", "Hindi", "Japanese", "Italian"].map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-sm font-semibold text-gray-600 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Next: Connect Phone Line <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PROVISION PHONE NUMBER */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h4 className="font-display font-bold text-xl text-gray-900">Step 4: Provision Your AI Business Phone Line</h4>
                <p className="text-xs text-gray-500">We will instantly register a dedicated local carrier number mapped directly to your voice agent.</p>
              </div>

              <div className="bg-slate-50 border border-gray-100 rounded-2xl p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <Globe className="w-7 h-7" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-gray-900">Automated VoIP Registration</h5>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">Select area code. No setup fee, SIM cards, or configuration. Mapped immediately to LuMay routing rules.</p>
                </div>

                {!isProvisioning ? (
                  <button
                    onClick={handleProvisionNumber}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-md"
                  >
                    <span>Click to Provision Live Number</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex flex-col items-center gap-2 pt-2">
                    <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-semibold text-emerald-600">Registering SIP trunks & allocating VoIP number...</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-sm font-semibold text-gray-600 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div />
              </div>
            </div>
          )}

          {/* STEP 5: LAUNCHED STATE */}
          {currentStep === 5 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-2xl text-gray-900">Your AI Voice Agent is Live!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Congratulations Alex! Your customized voice receptionist has been fully provisioned and routed.
                </p>
              </div>

              {/* Mapped Number box */}
              <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-6 space-y-3 max-w-sm mx-auto relative">
                <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-400 font-bold block">Active Telephone Number</span>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl font-mono font-bold text-gray-100">{provisionedNumber}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(provisionedNumber)}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <div className="w-px h-6 bg-white/10 mx-auto" />
                <p className="text-xs text-gray-400">
                  Call this number from any mobile or landline to test your custom <strong>{INDUSTRIES.find((i) => i.id === selectedIndustry)?.name}</strong> assistant!
                </p>
              </div>

              {/* Onboarding specs summary */}
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto text-left pt-2">
                <div className="bg-slate-50 border border-gray-100 p-3 rounded-xl">
                  <span className="text-[10px] text-gray-400 block font-semibold">VOICE PERSONA</span>
                  <span className="text-xs font-bold text-gray-800 block mt-0.5">{selectedVoice} • {selectedLanguage}</span>
                </div>
                <div className="bg-slate-50 border border-gray-100 p-3 rounded-xl">
                  <span className="text-[10px] text-gray-400 block font-semibold">SCENARIO</span>
                  <span className="text-xs font-bold text-gray-800 block mt-0.5">{USE_CASES.find((u) => u.id === selectedUseCase)?.title}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-grow py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-lg shadow-emerald-100 transition-all cursor-pointer"
                >
                  Enter LuMay Dashboard
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
