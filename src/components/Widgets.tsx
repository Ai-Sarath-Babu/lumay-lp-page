import React, { useState, useEffect } from "react";
import { MessageSquare, X, Send, PhoneCall, Gift, Check, ArrowRight, ShieldAlert } from "lucide-react";

interface WidgetsProps {
  onStartSignup: () => void;
}

export default function Widgets({ onStartSignup }: WidgetsProps) {
  // Exit Intent state
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [exitIntentTriggered, setExitIntentTriggered] = useState(false);

  // Bottom Sticky CTA banner state
  const [showStickyBanner, setShowStickyBanner] = useState(false);

  // Floating Chat states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([
    { sender: "bot", text: "Hi! I'm LuMay's on-site specialist. Ask me anything about voice platform pricing, integrations, or HIPAA compliance!" }
  ]);
  const [chatInput, setChatInput] = useState("");

  // Detect scroll for sticky bottom banner
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBanner(true);
      } else {
        setShowStickyBanner(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect mouse leaving window top (Exit Intent)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20 && !exitIntentTriggered) {
        setShowExitIntent(true);
        setExitIntentTriggered(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [exitIntentTriggered]);

  // Handle support bot message reply simulation
  const handleSendBotMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    setTimeout(() => {
      let botResponse = "That's a great question! LuMay provides human-like AI voice receptionist calling starting at just $0.05 per active minute, pay-as-you-go. You can test it out with 5 free minutes instantly by registering an account.";
      
      const textLower = userText.toLowerCase();
      if (textLower.includes("price") || textLower.includes("cost") || textLower.includes("rate")) {
        botResponse = "LuMay pricing is extremely transparent: $0.05/min on Pay-as-you-go, $0.12/min on the Growth tier, and negotiable bulk rates for large enterprise call centers. No setup fee.";
      } else if (textLower.includes("hipaa") || textLower.includes("security") || textLower.includes("soc2") || textLower.includes("compliant")) {
        botResponse = "Yes! LuMay is fully HIPAA-compliant (we sign BAAs) and SOC 2 Type II certified. All customer voice streams and transcript files are fully encrypted under AES-256.";
      } else if (textLower.includes("integrate") || textLower.includes("hubspot") || textLower.includes("salesforce") || textLower.includes("crm")) {
        botResponse = "We integrate directly with Salesforce, HubSpot, Zoho, Zapier, Make, and Twilio! You can trigger automated CRM actions instantly as the voice call proceeds.";
      } else if (textLower.includes("languages") || textLower.includes("accent")) {
        botResponse = "We support over 100+ languages and localized accents (English, Spanish, French, German, Hindi, Tamil, Japanese, Korean, etc.) so your agent sounds completely natural.";
      }

      setChatMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 1000);
  };

  return (
    <>
      {/* 1. BOTTOM STICKY CTA BANNER */}
      {showStickyBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-2xl py-3 px-4 sm:px-6 transition-all duration-300 transform translate-y-0 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              ⚡
            </div>
            <div>
              <span className="font-display font-bold text-xs sm:text-sm text-gray-900 block sm:inline">LuMay AI Voice Agent Platform</span>
              <span className="text-[10px] sm:text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold ml-2">5 Free Minutes Included</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <a
              href="#booking"
              className="px-4 py-2 text-xs font-semibold text-gray-700 hover:text-emerald-600 border border-gray-200 rounded-lg transition-colors cursor-pointer bg-white"
            >
              Book Live Demo
            </a>
            <button
              onClick={onStartSignup}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Create Free Agent</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 2. EXIT INTENT POPUP MODAL */}
      {showExitIntent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-2xl relative text-center space-y-6">
            <button
              onClick={() => setShowExitIntent(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Gift className="w-8 h-8 animate-bounce text-emerald-600" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-600 font-bold block">Don't Leave Empty Handed!</span>
              <h3 className="font-display font-bold text-2xl text-gray-900">Get 20 Free Calling Minutes</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">Lock down an extra twenty calling minutes for your business to explore custom voice configurations. Mapped instantly to your signup email.</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowExitIntent(false);
                  onStartSignup();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Claim My 20 Free Minutes
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowExitIntent(false)}
                className="text-xs text-gray-400 hover:text-gray-600 underline font-medium"
              >
                No thanks, I'll stick to 5 minutes
              </button>
            </div>

            <div className="flex justify-center items-center gap-1.5 text-[10px] text-gray-400">
              <ShieldAlert className="w-3.5 h-3.5 text-gray-300" />
              <span>Offer expires in 24 hours • No credit card required</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. FLOATING WIDGETS (WHATSAPP & LIVE CHAT CHOTBOT) */}
      <div className="fixed bottom-18 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-3">
        
        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/14155550199?text=Hi!%20I'm%20interested%20in%20LuMay%20AI%20Voice%20Agent"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer border border-[#20ba59]"
          title="WhatsApp Sales Chat"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 1.976 14.116.953 11.5.953c-5.44 0-9.866 4.372-9.87 9.802 0 1.83.512 3.61 1.482 5.156l-.998 3.645 3.733-.972zm11.238-6.143c-.3-.15-1.772-.875-2.046-.975-.276-.1-.477-.15-.677.15-.2.3-.777.975-.951 1.174-.176.2-.351.224-.652.074-.3-.15-1.265-.467-2.41-1.485-.89-.794-1.49-1.775-1.665-2.075-.175-.3-.019-.461.13-.611.136-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.677-1.625-.926-2.225-.244-.582-.49-.5-.677-.512-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8.375-.276.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.11 3.225 5.11 4.525.714.31 1.27.495 1.705.633.715.227 1.365.195 1.88.118.574-.087 1.772-.725 2.02-.1425.25-.7 2.02-1.625 2.02-1.625z"/>
          </svg>
        </a>

        {/* Live Support Chat widget */}
        <div className="relative">
          {isChatOpen ? (
            <div className="w-80 sm:w-96 bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between absolute bottom-14 right-0 z-50">
              
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping" />
                  <div>
                    <h4 className="font-display font-bold text-xs sm:text-sm">LuMay Platform Bot</h4>
                    <span className="text-[10px] text-emerald-100">Usually replies instantly</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 hover:bg-white/10 rounded-lg text-emerald-200 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Stream Area */}
              <div className="p-4 space-y-3 h-64 overflow-y-auto bg-slate-50 flex flex-col pr-1 scrollbar-thin scrollbar-thumb-gray-200">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-emerald-600 text-white ml-auto rounded-tr-none"
                        : "bg-white border border-gray-100 text-gray-700 mr-auto rounded-tl-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendBotMessage} className="p-3 border-t border-gray-100 flex gap-2 bg-white">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask a question about pricing, HIPAA..."
                  className="flex-grow bg-slate-50 border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl px-3 py-2 text-xs text-gray-800"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

            </div>
          ) : (
            <button
              onClick={() => setIsChatOpen(true)}
              className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer border border-emerald-500 relative"
              title="Live Chat Support"
            >
              <MessageSquare className="w-6 h-6 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border border-white flex items-center justify-center text-[8px] font-extrabold text-white">1</span>
            </button>
          )}
        </div>

      </div>
    </>
  );
}
