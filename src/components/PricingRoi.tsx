import React, { useState } from "react";
import { PRICING_PLANS } from "../data";
import { Check, ArrowRight, BarChart3, HelpCircle, Activity, Smile, Sparkles, AlertCircle } from "lucide-react";

interface PricingRoiProps {
  onSelectPlan: (planName: string) => void;
}

export default function PricingRoi({ onSelectPlan }: PricingRoiProps) {
  // ROI states
  const [callsPerDay, setCallsPerDay] = useState(50);
  const [callDuration, setCallDuration] = useState(4);
  const [humanRate, setHumanRate] = useState(25); // Operator hourly salary

  // Calculations
  const callsPerMonth = callsPerDay * 30;
  const totalMinutesPerMonth = callsPerMonth * callDuration;
  
  // Human cost: operator takes call. We assume they spend 1.5x the call length (adding documentation, typing, follow-ups)
  const totalHoursHumanPerMonth = (totalMinutesPerMonth * 1.5) / 60;
  const monthlyHumanCost = Math.round(totalHoursHumanPerMonth * humanRate);

  // LuMay cost: active minute rate is $0.05
  const monthlyLuMayCost = Math.round(totalMinutesPerMonth * 0.05);

  const monthlySavings = Math.max(0, monthlyHumanCost - monthlyLuMayCost);
  const roiPercentage = monthlyLuMayCost > 0 ? Math.round((monthlySavings / monthlyLuMayCost) * 100) : 0;

  return (
    <section className="py-16 bg-white border-b border-gray-100" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* PART 1: PRICING PLANS */}
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
              <span>Fair & Transparent Pricing</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight">
              Pay Only For Active Conversational Minutes
            </h2>
            <p className="text-gray-600">
              No setup fees, licensing rates, or monthly lock-ins. Get 5 free calling minutes to test, then upgrade to growth or contract high-volume corporate plans.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all ${
                  plan.recommended
                    ? "border-2 border-emerald-600 bg-emerald-50/20 shadow-xl shadow-emerald-100/50 scale-102"
                    : "border border-gray-100 bg-white shadow-sm hover:border-gray-200"
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-600 shadow">
                    Most Popular
                  </span>
                )}

                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <h3 className="font-display font-bold text-xl text-gray-900">{plan.name} Plan</h3>
                    <p className="text-xs text-gray-500 mt-1">{plan.description}</p>
                  </div>

                  {/* Pricing Tag */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-display font-extrabold text-gray-900">{plan.price}</span>
                    <span className="text-sm font-semibold text-gray-500">{plan.minRate}</span>
                    <span className="text-xs text-gray-400 ml-1">/ {plan.billing}</span>
                  </div>

                  {/* Features Checklist */}
                  <div className="space-y-3.5 pt-4 border-t border-gray-100">
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5 stroke-[3]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full mt-8 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    plan.recommended
                      ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-md shadow-emerald-100"
                      : "bg-slate-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 border border-gray-200 hover:border-emerald-200"
                  }`}
                >
                  {plan.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* PART 2: INTERACTIVE ROI CALCULATOR WIDGET */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden" id="roi">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left side: Inputs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold block">Business Savings Calculator</span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-gray-100 leading-tight">Compare Cost: Human vs LuMay AI Voice Agent</h3>
                <p className="text-xs text-gray-400">Drag the sliders below to calibrate your business call parameters and instantly verify monthly ROI estimates.</p>
              </div>

              <div className="space-y-5 pt-4">
                {/* 1. Daily Call Volume */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-300">Daily Incoming Calls</span>
                    <span className="text-emerald-400 font-mono font-bold">{callsPerDay} calls / day</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    step="5"
                    value={callsPerDay}
                    onChange={(e) => setCallsPerDay(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* 2. Call Duration */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-300">Average Duration Per Call</span>
                    <span className="text-emerald-400 font-mono font-bold">{callDuration} minutes</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={callDuration}
                    onChange={(e) => setCallDuration(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* 3. Hourly salary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-300">Human Operator Hourly Salary</span>
                    <span className="text-emerald-400 font-mono font-bold">${humanRate} / hr (fully loaded)</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    step="1"
                    value={humanRate}
                    onChange={(e) => setHumanRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Right side: Outputs / Comparison meters */}
            <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              
              {/* SAVINGS BADGE */}
              <div className="text-center bg-emerald-600/20 border border-emerald-500/20 rounded-xl p-5 relative overflow-hidden">
                <span className="text-[10px] text-emerald-300 uppercase font-bold block mb-1">Estimated Monthly Savings</span>
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-white font-mono block">
                  ${monthlySavings.toLocaleString()}
                </span>
                <span className="text-xs text-gray-300 mt-1 block">
                  ROI: <strong>{roiPercentage.toLocaleString()}% Savings</strong> over traditional operators!
                </span>
              </div>

              {/* Detail meters */}
              <div className="space-y-4 pt-2">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/5">
                  <span className="text-gray-400 font-medium">Monthly Active Minutes</span>
                  <span className="font-mono font-bold text-gray-200">{totalMinutesPerMonth.toLocaleString()} mins</span>
                </div>

                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/5">
                  <span className="text-gray-400 font-medium">Human Operator Monthly Cost</span>
                  <span className="font-mono font-bold text-red-400">${monthlyHumanCost.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-medium">LuMay Voice AI Platform Cost</span>
                  <span className="font-mono font-bold text-emerald-400">${monthlyLuMayCost.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-lg flex items-start gap-2 text-[10px] text-gray-400">
                <AlertCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Calculations assume human operators spend 1.5x of the phone length for logging CRM details. LuMay AI automates logs simultaneously, keeping cost to active call seconds only.</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
