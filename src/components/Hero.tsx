import React from "react";
import { Star, Shield, Zap, Flame, Sparkles, Check, ArrowRight, Play, HeartHandshake, PhoneCall } from "lucide-react";

interface HeroProps {
  onStartSignup: () => void;
  onScrollToDemo: () => void;
}

export default function Hero({ onStartSignup, onScrollToDemo }: HeroProps) {
  const trustBadges = [
    "Free 5 Minutes Included",
    "No Credit Card Required",
    "Setup Under 5 Minutes",
    "Inbound + Outbound Calling",
    "100+ Languages Supported",
    "SOC2 + HIPAA + GDPR Compliant"
  ];

  const brandLogos = [
    { name: "Apex Dental Group", icon: "🦷" },
    { name: "RE/MAX Premier", icon: "🏠" },
    { name: "Trattoria Group", icon: "🍕" },
    { name: "Swift Logistics", icon: "🚚" },
    { name: "Elite Motors", icon: "🚗" },
    { name: "MediClinic Inc", icon: "🏥" }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 lg:py-24 border-b border-gray-100">
      {/* Background blobs for organic feel */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-emerald-50/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-12">
          
          {/* Centered Content Column */}
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold tracking-wide shadow-sm mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Next-Gen Conversational Voice Engine v3.5</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-[1.1] max-w-3xl mx-auto">
              AI Voice Agent Platform For Businesses That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700">
                Answer, Qualify, Book & Sell
              </span>{" "}
              24/7
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Deploy human-like AI voice agents for inbound and outbound calls with ultra-low latency under 500ms, 100+ languages, enterprise security, and 100+ integrations. Set up in 5 minutes.
            </p>

            {/* Trust Badges Checklist */}
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto pt-2">
              {trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 bg-white border border-gray-100 px-3 py-1.5 rounded-xl shadow-xs">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="font-medium text-xs text-gray-800">{badge}</span>
                </div>
              ))}
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={onStartSignup}
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 rounded-xl shadow-lg shadow-emerald-200/50 hover:shadow-emerald-300/60 transition-all flex items-center justify-center gap-2 cursor-pointer group animate-pulse-ring"
              >
                Create Free AI Voice Agent
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onScrollToDemo}
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50 border border-gray-200 hover:border-emerald-200 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer bg-white"
              >
                <Play className="w-4.5 h-4.5 fill-current text-emerald-600 stroke-[3]" />
                Test Interactive Demo
              </button>
            </div>

            {/* Rating and Social Proof summary */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1.5 bg-yellow-50/70 border border-yellow-100 px-3 py-1 rounded-lg">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-gray-800 text-xs sm:text-sm">5.0 Google Reviews</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <div>
                  <span className="block font-bold text-gray-900 text-lg">5,000+</span>
                  <span className="text-xs">Active Businesses</span>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <span className="block font-bold text-gray-900 text-lg">50M+</span>
                  <span className="text-xs">Calls Processed</span>
                </div>
                <div className="w-px h-8 bg-gray-200" />
                <div>
                  <span className="block font-bold text-gray-900 text-lg">&lt;500ms</span>
                  <span className="text-xs">Uptime Latency</span>
                </div>
              </div>
            </div>

          </div>

          {/* Centered Visual Mockup */}
          <div className="w-full max-w-lg sm:max-w-xl relative">
            <div className="relative mx-auto bg-gradient-to-tr from-emerald-500 to-emerald-700 p-1 rounded-3xl shadow-2xl shadow-emerald-500/20">
              <div className="bg-slate-950 rounded-[22px] overflow-hidden p-6 sm:p-8 text-white relative">
                
                {/* Simulated Wave Grid Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Dashboard Header Mock */}
                <div className="flex justify-between items-center pb-6 border-b border-white/10 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                    <span className="text-xs font-mono text-gray-400">LU-AGENT-094</span>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">STATUS: DEPLOYED</span>
                </div>

                {/* Live Agent Interface */}
                <div className="py-8 text-center space-y-6 relative z-10">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-600/20 flex items-center justify-center border border-emerald-500/30 relative">
                      {/* Pulse concentric rings */}
                      <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-pulse-ring scale-110" />
                      <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-pulse-ring scale-125" />
                      
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
                        <PhoneCall className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-semibold text-lg">LuMay Voice Agent (Sarah)</h3>
                    <p className="text-xs text-emerald-300">Dental Practice Assistant • Fluent English</p>
                  </div>

                  {/* Sound Wave Animation Visualizer */}
                  <div className="flex items-center justify-center gap-1.5 h-12 pt-2">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1 bg-gradient-to-t from-emerald-400 to-emerald-300 rounded-full wave-bar"
                        style={{ 
                          height: `${Math.floor(Math.random() * 80) + 20}%`,
                          animationDuration: `${0.8 + (i * 0.15)}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Interactive mock text */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left max-w-xs mx-auto">
                    <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold mb-1">Live Response Transcript</p>
                    <p className="text-xs text-gray-200 font-sans italic leading-relaxed">
                      &ldquo;Sure Mark, I have booked your teeth cleaning session for next Tuesday at 2:30 PM with Dr. Mercer. Texting your confirmation now.&rdquo;
                    </p>
                  </div>
                </div>

                {/* Bottom specs */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10 text-center relative z-10">
                  <div>
                    <span className="block text-xl font-bold font-mono text-emerald-400">412ms</span>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Average Latency</span>
                  </div>
                  <div>
                    <span className="block text-xl font-bold font-mono text-emerald-400">98.5%</span>
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">CSAT Satisfaction</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Corporate Trust Logos */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Empowering 5,000+ Teams Worldwide Across Every Industry</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {brandLogos.map((brand, i) => (
              <div key={i} className="flex items-center gap-1.5 text-gray-600 grayscale hover:grayscale-0 hover:text-emerald-600 transition-all cursor-pointer">
                <span className="text-xl">{brand.icon}</span>
                <span className="font-display font-semibold text-sm tracking-tight">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
