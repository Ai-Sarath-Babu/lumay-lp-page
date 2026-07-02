import React, { useState } from "react";
import { Calendar, Clock, Globe, Shield, ArrowRight, CheckCircle2, User, Mail, Building2, Phone } from "lucide-react";

export default function BookingSystem() {
  const [consultType, setConsultType] = useState("Book Demo");
  const [selectedDate, setSelectedDate] = useState("Wednesday, July 8");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Form states
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: ""
  });

  const consultTypes = [
    { label: "Book Demo", desc: "15-min general platform tour" },
    { label: "Sales Call", desc: "20-min contract volume consultation" },
    { label: "Technical Integration", desc: "30-min developer API briefing" },
    { label: "Enterprise Setup", desc: "45-min HIPAA & custom SLA talk" }
  ];

  const datesList = [
    "Wednesday, July 8",
    "Thursday, July 9",
    "Friday, July 10",
    "Monday, July 13",
    "Tuesday, July 14"
  ];

  const timeSlots = [
    "09:30 AM",
    "10:00 AM",
    "11:30 AM",
    "01:30 PM",
    "03:00 PM",
    "04:30 PM"
  ];

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-gray-100" id="booking">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 animate-bounce" />
            <span>Schedule Consult</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            Book A Live Technical Voice Consultation
          </h2>
          <p className="text-gray-600">
            Have custom requirements? Coordinate directly with our platform solutions engineers to explore trunk configurations, HIPAA Business Agreements, and bulk rates.
          </p>
        </div>

        {/* Outer container */}
        <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 items-stretch min-h-[500px]">
          
          {/* LEFT COLUMN - CONFIG INFO */}
          <div className="md:col-span-5 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-950/40 via-transparent to-transparent opacity-65 pointer-events-none" />

            {!bookingConfirmed ? (
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 font-bold block">PLATFORM ONBOARDING</span>
                  <h3 className="font-display font-bold text-xl text-gray-100">Coordinate Call</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">Select date, time slot, and consultation type to lock down a live screenshare appointment with our developer team.</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2.5 text-xs text-gray-300">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>Duration: <strong>20 - 45 Minutes</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-300">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>Timezone: <strong>US/Pacific (GMT-7)</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-gray-300">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Compliance: <strong>SOC2 / HIPAA Compliant</strong></span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 relative z-10 text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-lg text-emerald-300">Booking Confirmed!</h4>
                  <p className="text-xs text-gray-300">Calendar invite, secure video screenshare link, and briefing outline sent to: <strong>{bookingForm.email || "alex@company.com"}</strong></p>
                </div>
              </div>
            )}

            <p className="text-[9px] text-gray-400 italic pt-6 border-t border-white/10 mt-6 relative z-10">
              Meetings hosted securely via Google Meet or MS Teams.
            </p>
          </div>

          {/* RIGHT COLUMN - BOOKING SCHEDULER WIDGET */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
            
            {!bookingConfirmed ? (
              <form onSubmit={handleBookSubmit} className="space-y-5">
                
                {/* 1. Select Consult Type */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">1. Consultation Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {consultTypes.map((t) => (
                      <button
                        key={t.label}
                        type="button"
                        onClick={() => setConsultType(t.label)}
                        className={`p-2.5 text-left rounded-xl border transition-all cursor-pointer ${
                          consultType === t.label
                            ? "border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-sm"
                            : "border-gray-100 hover:border-gray-200 text-gray-600 bg-slate-50/50"
                        }`}
                      >
                        <span className="font-bold text-[10px] block text-gray-900">{t.label}</span>
                        <span className="text-[9px] text-gray-400 block line-clamp-1 mt-0.5">{t.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Select Date & Time slots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">2. Calendar Date</label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 hover:border-gray-300 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                    >
                      {datesList.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">3. Time Slot (PDT)</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 hover:border-gray-300 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                    >
                      {timeSlots.map((ts) => (
                        <option key={ts} value={ts}>{ts}</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* 3. Contact information */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">4. Contact Information</label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <input
                        type="text"
                        required
                        placeholder="Alex Mercer"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl px-3 py-2 text-xs text-gray-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                        className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl px-3 py-2 text-xs text-gray-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <input
                        type="text"
                        required
                        placeholder="Mercer Labs Inc"
                        value={bookingForm.company}
                        onChange={(e) => setBookingForm({ ...bookingForm, company: e.target.value })}
                        className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl px-3 py-2 text-xs text-gray-800"
                      />
                    </div>
                    <div className="space-y-1">
                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                        className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded-xl px-3 py-2 text-xs text-gray-800"
                      />
                    </div>
                  </div>

                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md shadow-emerald-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Schedule screenshare with Engineering
                  <ArrowRight className="w-4 h-4" />
                </button>

              </form>
            ) : (
              <div className="text-center py-10 space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto stroke-[2.5]" />
                <h4 className="font-display font-bold text-xl text-gray-900">Appointment Blocked!</h4>
                <div className="bg-slate-50 border border-gray-100 rounded-xl p-4 max-w-sm mx-auto text-left space-y-2">
                  <div className="text-xs text-gray-700">🗓️ <strong>Date:</strong> {selectedDate}</div>
                  <div className="text-xs text-gray-700">⏰ <strong>Time:</strong> {selectedTime} (PDT)</div>
                  <div className="text-xs text-gray-700">👤 <strong>Solutions Specialist:</strong> David Harris</div>
                  <div className="text-xs text-gray-700">🔗 <strong>Conference:</strong> Included Google Meet code</div>
                </div>
                <button
                  onClick={() => { setBookingConfirmed(false); setBookingForm({ name: "", email: "", company: "", phone: "" }); }}
                  className="px-5 py-2 border border-gray-200 hover:bg-slate-50 text-xs font-semibold text-gray-600 rounded-xl transition-all cursor-pointer"
                >
                  Schedule Another Appointment
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
