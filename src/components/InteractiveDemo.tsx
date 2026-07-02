import React, { useState, useEffect, useRef } from "react";
import { INDUSTRIES, USE_CASES } from "../data";
import { Message } from "../types";
import { Phone, PhoneOff, Mic, MicOff, Volume2, Shield, Calendar, Send, Activity, Sparkles, Smile, CheckCircle, BarChart3, AlertCircle, RefreshCw } from "lucide-react";

export default function InteractiveDemo() {
  // Config States
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const [selectedVoice, setSelectedVoice] = useState("Sarah");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedUseCase, setSelectedUseCase] = useState(USE_CASES[0]);

  // Calling States
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Post-Call Analytics States
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  const VOICES = [
    { name: "Sarah", gender: "Female", description: "Warm & Friendly receptionist" },
    { name: "Sophia", gender: "Female", description: "Professional executive manager" },
    { name: "David", gender: "Male", description: "Confident & clear sales representative" },
    { name: "Ethan", gender: "Male", description: "Empathetic technical support specialist" },
    { name: "Priya", gender: "Female", description: "Polite customer support agent" }
  ];

  const LANGUAGES = ["English", "Spanish", "French", "German", "Hindi", "Japanese", "Italian"];

  // Scroll to bottom of transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  // Call duration timer
  useEffect(() => {
    if (isCalling) {
      callTimerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
      setCallDuration(0);
    }
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [isCalling]);

  // Format call duration MM:SS
  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  // Browser Text-To-Speech function
  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(text);

    // Set voice language
    if (selectedLanguage === "Spanish") utterance.lang = "es-ES";
    else if (selectedLanguage === "French") utterance.lang = "fr-FR";
    else if (selectedLanguage === "German") utterance.lang = "de-DE";
    else if (selectedLanguage === "Hindi") utterance.lang = "hi-IN";
    else if (selectedLanguage === "Japanese") utterance.lang = "ja-JP";
    else if (selectedLanguage === "Italian") utterance.lang = "it-IT";
    else utterance.lang = "en-US";

    // Try to match appropriate system voices (fallback defaults if not found)
    const voices = window.speechSynthesis.getVoices();
    const isFemale = ["Sarah", "Sophia", "Priya"].includes(selectedVoice);
    const systemVoice = voices.find((v) => {
      const nameLower = v.name.toLowerCase();
      const matchesLang = v.lang.startsWith(utterance.lang.substring(0, 2));
      if (!matchesLang) return false;
      if (isFemale) {
        return nameLower.includes("female") || nameLower.includes("zira") || nameLower.includes("samantha") || nameLower.includes("google") || nameLower.includes("microsoft") || nameLower.includes("natural");
      } else {
        return nameLower.includes("male") || nameLower.includes("david") || nameLower.includes("hazel") || nameLower.includes("mark");
      }
    });

    if (systemVoice) utterance.voice = systemVoice;
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  // Trigger call startup
  const startCall = () => {
    setShowAnalytics(false);
    setAnalyticsData(null);
    setIsCalling(true);
    setMessages([]);

    const greetingText = `Hi! Thanks for calling. This is ${selectedVoice} from the ${selectedIndustry.name} platform support, helping you with ${selectedUseCase.title}. How can I assist you today?`;

    // Add immediate greeting response
    const greetingMsg: Message = {
      role: "assistant",
      content: greetingText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setMessages([greetingMsg]);
    setTimeout(() => {
      speakText(greetingText);
    }, 400);
  };

  // Trigger call termination & compile analytics
  const endCall = async () => {
    setIsCalling(false);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    if (messages.length <= 1) {
      // Not enough interaction for deep analytics
      return;
    }

    setIsAnalyzing(true);
    setShowAnalytics(true);

    try {
      const response = await fetch("/api/agent/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages,
          industry: selectedIndustry.name,
          useCase: selectedUseCase.title
        })
      });

      const analytics = await response.json();
      setAnalyticsData(analytics);
    } catch (err) {
      console.error("Error analyzing call:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle user input submit during call
  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || userInput;
    if (!textToSend.trim() || isGenerating) return;

    const userMsg: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setUserInput("");
    setIsGenerating(true);

    try {
      const response = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          industry: selectedIndustry.name,
          useCase: selectedUseCase.title,
          voiceName: selectedVoice,
          language: selectedLanguage
        })
      });

      const data = await response.json();

      if (data.text) {
        const assistantMsg: Message = {
          role: "assistant",
          content: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        setMessages((prev) => [...prev, assistantMsg]);
        speakText(data.text);
      }
    } catch (err) {
      console.error("Error sending voice message:", err);
      // Fallback response
      const fallbackMsg: Message = {
        role: "assistant",
        content: "Got it. That sounds perfect. Could you confirm your contact phone or email so I can sync this immediately?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      speakText(fallbackMsg.content);
    } finally {
      setIsGenerating(false);
    }
  };

  // Preset quick reply tags to make testing rapid on click
  const PRESETS_FOR_INDUSTRY: Record<string, string[]> = {
    dental: ["I want to book an appointment next Wednesday morning", "What are your emergency dentist options?", "Can I reschedule my appointment?", "Just wanted to ask what services you offer"],
    realestate: ["Is the oak avenue home still active?", "I'd like to book a walkthrough tour this Friday", "Can you explain the HOA structure?", "Can I talk to Sarah, the listing agent?"],
    restaurant: ["Do you have table reservations for 4 tonight?", "I'm checking the status of my order", "Are there gluten-free dishes on your menu?", "Can you tell me your opening hours?"],
    healthcare: ["I need to schedule check-up with Dr. Collins", "Can I request a prescription refill?", "Just checking my lab results status", "Do you accept Blue Cross insurance?"],
    insurance: ["I need an auto insurance quote", "Can you walk me through the claims filing process?", "When is my policy renewal due?", "Are there home insurance discounts?"],
    automotive: ["I need to schedule an oil change maintenance", "Is the pre-owned civic still available?", "I want to arrange a test drive this Saturday", "Do you open on Sundays?"],
    ecommerce: ["Where is order #8045? It is late", "How can I request a refund?", "Can you change my shipping address?", "Do you support coupon codes?"],
    logistics: ["I am a driver checking in for dock 4", "Where is my shipment currently located?", "Can I get a freight rate quote?", "What is the gate code for Dallas?"],
    spa: ["I'd like to book a deep tissue massage for Friday", "Are there gift cards available for buying?", "Can I upgrade my treatment?", "What is your cancellation policy?"],
    saas: ["We process 100,000 minutes. Need pricing", "Can we arrange an enterprise tech demo?", "Does your API support webhooks?", "Do you have HIPAA certification?"]
  };

  const getPresets = () => {
    return PRESETS_FOR_INDUSTRY[selectedIndustry.id] || PRESETS_FOR_INDUSTRY["dental"];
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-gray-100" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Interactive Calling Lab</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Test Our Ultra-Low Latency AI Voice Agent
          </h2>
          <p className="text-gray-600">
            Configure your dream voice assistant below, then trigger a simulated phone call. Watch the transcript populate and review detailed post-call CRM analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT PANEL - Configuration Form */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
                <h3 className="font-display font-semibold text-lg text-gray-900">Configure Voice Agent</h3>
              </div>

              {/* 1. Industry Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">1. Select Target Industry</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {INDUSTRIES.map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => {
                        setSelectedIndustry(ind);
                        if (isCalling) endCall();
                      }}
                      className={`px-3 py-2 text-left rounded-xl text-xs font-medium border transition-all flex items-center justify-between cursor-pointer ${
                        selectedIndustry.id === ind.id
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm"
                          : "border-gray-100 hover:border-gray-200 text-gray-600"
                      }`}
                    >
                      <span className="truncate">{ind.name}</span>
                      {selectedIndustry.id === ind.id && <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Voice Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">2. Choose Agent Voice Persona</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {VOICES.map((vc) => (
                    <button
                      key={vc.name}
                      onClick={() => {
                        setSelectedVoice(vc.name);
                        if (isCalling) endCall();
                      }}
                      className={`p-2.5 text-left rounded-xl border transition-all cursor-pointer ${
                        selectedVoice === vc.name
                          ? "border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-sm"
                          : "border-gray-100 hover:border-gray-200 text-gray-600"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-gray-900">{vc.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-100">{vc.gender}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{vc.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Language & Use Case Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">3. Primary Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => {
                      setSelectedLanguage(e.target.value);
                      if (isCalling) endCall();
                    }}
                    className="w-full bg-white border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">4. Lead Use Case</label>
                  <select
                    value={selectedUseCase.id}
                    onChange={(e) => {
                      const uc = USE_CASES.find((u) => u.id === e.target.value);
                      if (uc) {
                        setSelectedUseCase(uc);
                        if (isCalling) endCall();
                      }
                    }}
                    className="w-full bg-white border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {USE_CASES.map((uc) => (
                      <option key={uc.id} value={uc.id}>{uc.title}</option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Launch Call Button */}
            <div className="pt-6 border-t border-gray-100 mt-6">
              {!isCalling ? (
                <button
                  onClick={startCall}
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-md shadow-emerald-100 hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer group animate-bounce"
                >
                  <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Call AI Voice Agent Now
                </button>
              ) : (
                <button
                  onClick={endCall}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md shadow-red-100 hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <PhoneOff className="w-5 h-5 animate-pulse" />
                  Hang Up & Generate CRM Logs
                </button>
              )}
              <div className="text-center mt-3 flex items-center justify-center gap-1.5 text-xs text-gray-500">
                <Shield className="w-3.5 h-3.5 text-gray-400" />
                <span>Simulated call environment — works inside browser</span>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL - Simulated Phone / Analytics Workspace */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden min-h-[500px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-950/30 via-transparent to-transparent opacity-65 pointer-events-none" />

            {/* IF CALLING - ACTIVE PHONE INTERFACE */}
            {isCalling && (
              <div className="h-full flex flex-col justify-between flex-grow">
                {/* Call Header */}
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-mono tracking-widest text-emerald-400 font-bold uppercase">Line Connected</span>
                  </div>
                  <span className="font-mono text-sm bg-white/5 border border-white/10 px-3 py-1 rounded-full text-emerald-300 font-bold">
                    {formatDuration(callDuration)}
                  </span>
                </div>

                {/* Live Transcript Stream */}
                <div className="flex-grow my-6 max-h-[250px] overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-white/10">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                    >
                      <span className="text-[9px] text-gray-400 mb-1 font-semibold">
                        {msg.role === "user" ? "You (Caller)" : `${selectedVoice} (${selectedIndustry.name} Agent)`} • {msg.timestamp}
                      </span>
                      <div
                        className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-emerald-600 text-white rounded-tr-none shadow-md shadow-emerald-900/30"
                            : "bg-white/10 border border-white/10 text-gray-100 rounded-tl-none"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {isGenerating && (
                    <div className="mr-auto max-w-[80%] flex flex-col items-start">
                      <span className="text-[9px] text-emerald-400 mb-1 font-semibold animate-pulse">LuMay Processing...</span>
                      <div className="bg-white/5 border border-white/10 text-gray-300 italic rounded-2xl rounded-tl-none px-4 py-2 text-xs flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                        <span>Generating natural voice response...</span>
                      </div>
                    </div>
                  )}
                  <div ref={transcriptEndRef} />
                </div>

                {/* Presets & Typing Input Bar */}
                <div className="space-y-4 border-t border-white/10 pt-4">
                  {/* Suggestion presets tags */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider flex items-center gap-1">
                      <Smile className="w-3.5 h-3.5 text-emerald-400" />
                      Quick Talk Presets (Click to speak)
                    </span>
                    <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto pr-1">
                      {getPresets().map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(preset)}
                          disabled={isGenerating}
                          className="px-2.5 py-1 bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/30 rounded-lg text-[10px] text-gray-300 hover:text-emerald-200 transition-all cursor-pointer font-medium disabled:opacity-50"
                        >
                          &ldquo;{preset}&rdquo;
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input Form */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
                      placeholder="Type your phone reply here..."
                      disabled={isGenerating}
                      className="flex-grow bg-white/5 border border-white/15 focus:border-emerald-500 hover:border-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 text-sm text-white disabled:opacity-50"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={isGenerating || !userInput.trim()}
                      className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-md shadow-emerald-900/40 hover:shadow-emerald-800 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Latency badge */}
                  <div className="flex justify-between items-center text-[10px] text-gray-400">
                    <span className="flex items-center gap-1"><Volume2 className="w-3 h-3 text-emerald-400" /> Simulated Audio Active</span>
                    <span className="font-mono text-emerald-400">Latency: 380ms</span>
                  </div>
                </div>
              </div>
            )}

            {/* IF NOT CALLING & SHOWING POST-CALL ANALYTICS */}
            {showAnalytics && (
              <div className="h-full flex flex-col justify-between flex-grow">
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm font-semibold tracking-wide">AI Call Diagnostics & CRM Summary</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded">REPORT ID: LU-DX-9810</span>
                </div>

                {isAnalyzing ? (
                  <div className="flex-grow flex flex-col items-center justify-center py-16 space-y-4">
                    <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin" />
                    <p className="text-sm text-gray-300 font-medium">Gemini AI synthesizing conversation transcript...</p>
                    <p className="text-xs text-gray-500 max-w-xs text-center">We analyze buyer sentiment, lead intent score, qualification status, and CRM action items.</p>
                  </div>
                ) : (
                  <div className="flex-grow my-6 overflow-y-auto space-y-6 max-h-[300px] pr-1">
                    
                    {/* Score Badges row */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-gray-400 block mb-1">CUSTOMER SENTIMENT</span>
                        <div className="inline-flex items-center gap-1 font-bold text-sm text-emerald-400">
                           <Smile className="w-4 h-4" />
                          {analyticsData?.sentiment || "Positive"}
                        </div>
                        <span className="block text-[10px] text-gray-500 mt-1">Score: {analyticsData?.sentimentScore || 85}%</span>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-gray-400 block mb-1">CRM LEAD SCORE</span>
                        <span className="block font-mono text-lg font-bold text-emerald-300">{analyticsData?.leadScore || 80}/100</span>
                        <span className="block text-[10px] text-gray-500 mt-1">High Intent</span>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                        <span className="text-[10px] text-gray-400 block mb-1">QUALIFICATION</span>
                        <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase mt-1 ${
                          analyticsData?.qualificationStatus === "Qualified" || analyticsData?.bookedAppointment
                            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                        }`}>
                          {analyticsData?.qualificationStatus || "Qualified"}
                        </span>
                        <span className="block text-[10px] text-gray-500 mt-1">Status Synced</span>
                      </div>
                    </div>

                    {/* AI Executive Summary */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                      <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold">AI Call Executive Summary</span>
                      <p className="text-xs text-gray-200 leading-relaxed italic">
                        &ldquo;{analyticsData?.summary || "The client interacted with the dental assistant. They successfully selected their desired Wednesday time slot and completed the automated clinic booking sequence."}&rdquo;
                      </p>
                    </div>

                    {/* Action Items List */}
                    <div className="space-y-2">
                      <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold block">Automated CRM Workflow Actions Triggered</span>
                      <div className="space-y-1.5">
                        {(analyticsData?.actionItems || [
                          "Sync booked appointment slot to Google Calendar",
                          "Send automatic SMS appointment reminder to customer",
                          "Pre-qualify lead status as HIGH INTENT inside HubSpot CRM"
                        ]).map((item: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-gray-300">
                            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Booked Badge Alert */}
                    {(analyticsData?.bookedAppointment || analyticsData?.qualificationStatus === "Qualified") && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                        <div>
                          <h4 className="text-emerald-300 text-xs font-bold uppercase">Automated Booking Confirmed!</h4>
                          <p className="text-[11px] text-gray-300">Google Calendar synced, reservation lock sent, deal stage advanced in Hubspot.</p>
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* Reset test */}
                <div className="border-t border-white/10 pt-4 flex gap-3">
                  <button
                    onClick={startCall}
                    className="flex-grow py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Place Another Test Call
                  </button>
                  <a
                    href="#booking"
                    className="px-5 py-3 border border-white/15 hover:border-emerald-500 rounded-xl text-xs font-semibold text-gray-300 hover:text-white transition-all text-center flex items-center justify-center"
                  >
                    Schedule Custom Demo
                  </a>
                </div>
              </div>
            )}

            {/* DEFAULT IDLE STATE */}
            {!isCalling && !showAnalytics && (
              <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
                  <Phone className="w-8 h-8 animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-lg">Lab Standby State</h3>
                  <p className="text-sm text-gray-400 max-w-sm mx-auto">
                    Configure your AI voice assistant preferences on the left side, then click the <strong>&ldquo;Call AI Voice Agent Now&rdquo;</strong> button to start a real voice simulation.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-w-sm w-full pt-4 border-t border-white/5">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="block text-xs text-emerald-300 font-bold">100+ Languages</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">Accents matched</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="block text-xs text-emerald-300 font-bold">HIPAA Secure</span>
                    <span className="text-[10px] text-gray-400 block mt-0.5">Clinical ready logs</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
