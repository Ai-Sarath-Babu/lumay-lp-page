import React, { useState } from "react";
import { USE_CASES, FEATURES, INTEGRATIONS } from "../data";
import { Sparkles, MessageSquare, Zap, Activity, HelpCircle, Check, ArrowRight, Share2, Plus, Trash2, UploadCloud, Database, Lock, CheckCircle2, CloudLightning } from "lucide-react";

interface FeaturesUseCasesProps {
  onStartSignup: () => void;
}

export default function FeaturesUseCases({ onStartSignup }: FeaturesUseCasesProps) {
  const [activeCategory, setActiveCategory] = useState<"inbound" | "outbound">("inbound");

  // Workflow builder states
  const [nodes, setNodes] = useState([
    { id: "1", title: "Inbound Call Connected", desc: "User triggers line call", type: "trigger" },
    { id: "2", title: "Speak Greeting Script", desc: "Speak prebuilt dental receptionist script", type: "action" },
    { id: "3", title: "Intelligent Calendar Check", desc: "Verify slots on Google Calendar", type: "condition" },
    { id: "4", title: "SMS Confirmation Sent", desc: "Trigger automated SMS via Twilio", type: "action" }
  ]);

  // Knowledge base states
  const [files, setFiles] = useState<{ name: string; size: string; status: string; qaCount: number }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // CRM integration states
  const [connectedApps, setConnectedApps] = useState<string[]>(["Google Workspace", "Zapier"]);
  const [connectingApp, setConnectingApp] = useState<string | null>(null);

  // Add customized workflow action node
  const handleAddNode = () => {
    const actions = [
      { title: "Hot Rep Transfer", desc: "Instantly transfer to live closer agent", type: "action" },
      { title: "Record Lead Sentiment", desc: "Analyze vocal tone and log deal stage", type: "condition" },
      { title: "Post-Call Webhook Alert", desc: "Send call transcription data directly to Make.com", type: "action" },
      { title: "Voicemail Detect", desc: "Hang up and schedule outbound follow-up retry", type: "condition" }
    ];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    const newNode = {
      id: String(nodes.length + 1),
      ...randomAction
    };
    setNodes([...nodes, newNode]);
  };

  const handleRemoveNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  // Mock upload document to knowledge base
  const handleMockUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFiles((existing) => [
            ...existing,
            {
              name: file.name,
              size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
              status: "Indexed & Active",
              qaCount: Math.floor(Math.random() * 40) + 20
            }
          ]);
          setIsUploading(false);
          return 0;
        }
        return prev + 15;
      });
    }, 200);
  };

  // Mock CRM connection flow
  const handleToggleConnect = (appName: string) => {
    if (connectedApps.includes(appName)) {
      setConnectedApps(connectedApps.filter(app => app !== appName));
    } else {
      setConnectingApp(appName);
      setTimeout(() => {
        setConnectedApps([...connectedApps, appName]);
        setConnectingApp(null);
      }, 1500);
    }
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-gray-100" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION 1: INBOUND VS OUTBOUND USE CASES */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto mb-6 space-y-4">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 tracking-tight">
              Inbound Support & Outbound Sales Engines
            </h2>
            <p className="text-gray-600">
              Whether answering incoming front-desk customer support lines or qualifying massive cold-lead calling spreadsheets, LuMay does it automatically.
            </p>

            {/* Toggle button category */}
            <div className="inline-flex p-1 bg-gray-200/60 rounded-xl">
              <button
                onClick={() => setActiveCategory("inbound")}
                className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === "inbound" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Inbound Receptionist
              </button>
              <button
                onClick={() => setActiveCategory("outbound")}
                className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeCategory === "outbound" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Outbound Sales Outreach
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {USE_CASES.filter((u) => u.category === activeCategory).map((uc) => (
              <div key={uc.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:border-emerald-200 transition-all hover:shadow-md">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${uc.category === "inbound" ? "bg-emerald-500" : "bg-teal-500"}`} />
                    <h3 className="font-display font-bold text-lg text-gray-900">{uc.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{uc.description}</p>
                  
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-gray-400">Included capabilities</span>
                    <div className="space-y-1.5">
                      {uc.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={onStartSignup}
                  className="w-full mt-6 py-2.5 bg-slate-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200 hover:text-emerald-700 rounded-xl text-xs font-semibold text-gray-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Configure Workflow <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: THE DYNAMIC PLAYGROUND LABS (WORKFLOW & UPLOADER) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          
          {/* Visual Workflow Builder Tool */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl min-h-[480px]">
            <div className="space-y-4 w-full">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <CloudLightning className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-display font-semibold text-base">Drag & Drop Workflow Blueprint</h4>
                </div>
                <button
                  onClick={handleAddNode}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Plus className="w-3 h-3 stroke-[3]" /> Add Node
                </button>
              </div>

              {/* Node Diagrams stream */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {nodes.map((node, i) => (
                  <div key={node.id} className="relative">
                    {/* Visual linking arrows */}
                    {i > 0 && (
                      <div className="w-px h-4 bg-emerald-500/30 mx-auto -my-1" />
                    )}
                    <div className="bg-white/5 border border-white/10 hover:border-emerald-500/30 rounded-xl p-3.5 flex justify-between items-center transition-all group">
                      <div className="flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mt-0.5 ${
                          node.type === "trigger" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" :
                          node.type === "condition" ? "bg-teal-500/20 text-teal-300 border border-teal-500/30" :
                          "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}>
                          {i + 1}
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-gray-100">{node.title}</h5>
                          <p className="text-[10px] text-gray-400 mt-0.5">{node.desc}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveNode(node.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 bg-white/10 hover:bg-red-500/20 hover:text-red-400 text-gray-400 rounded-lg transition-all cursor-pointer"
                        title="Remove Node"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[10px] text-gray-400 italic text-center pt-4 border-t border-white/5 mt-4">
              Visual workflow nodes trigger in real-time as your telephone conversation flows.
            </p>
          </div>

          {/* Interactive Knowledge Base Uploader */}
          <div className="lg:col-span-6 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm min-h-[480px]">
            <div className="space-y-6 w-full">
              <div className="flex items-center gap-2.5 pb-4 border-b border-gray-100">
                <Database className="w-5 h-5 text-emerald-600" />
                <h4 className="font-display font-semibold text-base text-gray-900">Custom Knowledge Base Upload</h4>
              </div>

              {/* Upload Drag Box */}
              <div className="border-2 border-dashed border-gray-200 hover:border-emerald-400 rounded-2xl p-6 text-center space-y-3 bg-slate-50/50 transition-all relative">
                <input
                  type="file"
                  id="kb-file-upload"
                  accept=".pdf,.docx,.txt"
                  onChange={handleMockUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  disabled={isUploading}
                />
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-600 underline cursor-pointer block">Click to upload corporate document</span>
                  <p className="text-[10px] text-gray-500 mt-1">Accepts PDF, DOCX, or TXT (Max 15MB)</p>
                </div>
              </div>

              {/* Upload loading indicator */}
              {isUploading && (
                <div className="space-y-2 bg-emerald-50/55 border border-emerald-100 p-3 rounded-xl">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-emerald-900">Analyzing document semantic index...</span>
                    <span className="font-mono text-emerald-600 font-bold">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-600 transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              {/* Uploaded Documents List */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Indexed Training Files ({files.length + 1})</span>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {/* Preloaded default */}
                  <div className="bg-slate-50 border border-gray-100 rounded-xl p-3 flex justify-between items-center text-xs">
                    <div>
                      <h5 className="font-bold text-gray-800">standard_reception_procedures.pdf</h5>
                      <span className="text-[10px] text-gray-500 mt-1 block">450 KB • Indexed 64 Q&As</span>
                    </div>
                    <div className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-bold uppercase border border-emerald-100">Indexed & Active</div>
                  </div>

                  {files.map((f, i) => (
                    <div key={i} className="bg-slate-50 border border-gray-100 rounded-xl p-3 flex justify-between items-center text-xs animate-pulse">
                      <div>
                        <h5 className="font-bold text-gray-800">{f.name}</h5>
                        <span className="text-[10px] text-gray-500 mt-1 block">{f.size} • Indexed {f.qaCount} Q&As</span>
                      </div>
                      <div className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-bold uppercase border border-emerald-100">{f.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 italic text-center pt-4 border-t border-gray-100 mt-4">
              LuMay analyzes uploaded documents using vector embeddings to answer customer FAQs instantly.
            </p>
          </div>

        </div>

        {/* SECTION 3: CRM INTEGRATIONS HUB */}
        <div className="space-y-8 pt-4">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h3 className="font-display font-bold text-2xl text-gray-900">Over 100+ CRM & Telephony Integrations</h3>
            <p className="text-gray-600">Connect your existing sales software, customer databases, calendar platforms, and communication VoIP tools in a single click.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {INTEGRATIONS.map((app) => (
              <div key={app.name} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between items-center text-center space-y-3 hover:border-emerald-200 transition-all">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl shadow-sm border border-gray-100">
                  {app.logo}
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900">{app.name}</h4>
                  <p className="text-[9px] text-gray-400 uppercase font-semibold mt-0.5">{app.category}</p>
                </div>

                {connectingApp === app.name ? (
                  <div className="w-full py-1.5 bg-slate-50 border border-gray-200 text-gray-500 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1">
                    <Activity className="w-3 h-3 animate-spin" /> Authorization...
                  </div>
                ) : connectedApps.includes(app.name) ? (
                  <button
                    onClick={() => handleToggleConnect(app.name)}
                    className="w-full py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-[10px] font-extrabold uppercase tracking-wide cursor-pointer"
                  >
                    Active Connection
                  </button>
                ) : (
                  <button
                    onClick={() => handleToggleConnect(app.name)}
                    className="w-full py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 hover:bg-emerald-100 rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                  >
                    Authorize Integration
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
