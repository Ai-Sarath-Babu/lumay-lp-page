import React, { useState } from "react";
import { INDUSTRIES } from "../data";
import { Sparkles, Play, Pause, ChevronRight, Activity, Smile, BarChart3, HelpCircle, Check, ArrowRight } from "lucide-react";

interface IndustrySolutionsProps {
  onDeployIndustry: (industryId: string) => void;
}

export default function IndustrySolutions({ onDeployIndustry }: IndustrySolutionsProps) {
  const [activeTab, setActiveTab] = useState(INDUSTRIES[0].id);
  const [playingTranscript, setPlayingTranscript] = useState<string | null>(null);
  const [activeAudioLine, setActiveAudioLine] = useState(0);

  const activeIndustry = INDUSTRIES.find((ind) => ind.id === activeTab) || INDUSTRIES[0];

  const toggleSimulatedAudio = (industryId: string) => {
    if (playingTranscript === industryId) {
      setPlayingTranscript(null);
      setActiveAudioLine(0);
    } else {
      setPlayingTranscript(industryId);
      setActiveAudioLine(0);
      // Simulate rolling through conversational transcript lines
      const interval = setInterval(() => {
        setActiveAudioLine((prev) => {
          if (prev >= activeIndustry.sampleAudioTranscript.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    }
  };

  return (
    <section className="py-16 bg-white border-b border-gray-100" id="industries">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5" />
            <span>Dedicated SEO Solutions</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Tailored Voice AI For Every Business Industry
          </h2>
          <p className="text-gray-600">
            LuMay voice agents are fully pre-trained on specialized industry terminology, customer intents, compliance guardrails, and CRM data structures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Industry Sidebar Navigation Tabs (SEO list) */}
          <div className="lg:col-span-4 bg-slate-50 border border-gray-100 rounded-3xl p-4 sm:p-6 space-y-1.5 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block px-3 mb-2">Select Industry Profile</span>
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                onClick={() => {
                  setActiveTab(ind.id);
                  setPlayingTranscript(null);
                  setActiveAudioLine(0);
                }}
                className={`w-full px-4 py-3 text-left rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === ind.id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-100"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{ind.name}</span>
                <ChevronRight className={`w-4 h-4 opacity-70 ${activeTab === ind.id ? "translate-x-0.5" : ""}`} />
              </button>
            ))}
          </div>

          {/* Detailed Content Workspace */}
          <div className="lg:col-span-8 bg-gradient-to-br from-slate-50 to-slate-100/50 border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative">
            <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold border border-emerald-100">
              <Check className="w-3.5 h-3.5" />
              <span>SEO Optimized Page Profile</span>
            </div>

            <div className="space-y-6">
              
              {/* Header */}
              <div className="space-y-2">
                <h3 className="font-display font-bold text-2xl text-gray-900">{activeIndustry.name} Voice Assistant</h3>
                <p className="text-sm font-medium text-emerald-600 italic font-display">{activeIndustry.tagline}</p>
                <p className="text-sm text-gray-600 leading-relaxed max-w-2xl pt-1">{activeIndustry.description}</p>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-4 max-w-md pt-2">
                <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">CONVERSION IMPROVEMENT</span>
                  <span className="block font-mono text-base font-bold text-emerald-600 mt-1">{activeIndustry.conversionImprovement}</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                  <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">RESPONSE SPEED</span>
                  <span className="block font-mono text-base font-bold text-emerald-600 mt-1">{activeIndustry.leadIncrease}</span>
                </div>
              </div>

              {/* Sample Script Prompt info */}
              <div className="bg-white rounded-xl p-4 border border-gray-100 space-y-1.5 shadow-sm">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Active Greeting Prompt Script
                </span>
                <p className="text-xs text-gray-700 italic font-medium leading-relaxed">
                  &ldquo;{activeIndustry.sampleScript}&rdquo;
                </p>
              </div>

              {/* Call Simulation Player */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-300 font-bold">Simulated Call Sample Playback</span>
                  <button
                    onClick={() => toggleSimulatedAudio(activeIndustry.id)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    {playingTranscript === activeIndustry.id ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>Stop Sample</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Play Sample Call</span>
                      </>
                    )}
                  </button>
                </div>

                {playingTranscript === activeIndustry.id ? (
                  <div className="space-y-3 max-h-[140px] overflow-y-auto pr-1">
                    {activeIndustry.sampleAudioTranscript.map((line, index) => (
                      <div
                        key={index}
                        className={`text-xs leading-relaxed transition-all p-2 rounded-lg ${
                          index === activeAudioLine
                            ? "bg-emerald-600/20 border border-emerald-500/20 text-white font-medium"
                            : "text-gray-400 opacity-60"
                        }`}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-1">
                    <p className="text-xs text-gray-300 font-medium">Click &ldquo;Play Sample Call&rdquo; above to audit a live conversation</p>
                    <p className="text-[10px] text-gray-500">Includes real-time speech cloning, interrupts, and calendar checks</p>
                  </div>
                )}
              </div>

            </div>

            {/* Launch CTA */}
            <div className="pt-6 border-t border-gray-200/60 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-gray-500 font-medium">
                No credit card required • Includes 5 free test minutes
              </div>
              <button
                onClick={() => onDeployIndustry(activeIndustry.id)}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-100 hover:shadow-lg transition-all cursor-pointer group"
              >
                Deploy {activeIndustry.name} Assistant Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
