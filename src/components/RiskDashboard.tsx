import React from 'react';
import { 
  Activity, 
  ShieldAlert, 
  Radio, 
  PhoneCall, 
  Flame, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Lock, 
  Server, 
  TrendingUp, 
  Users
} from 'lucide-react';
import { THREAT_ITEMS, RISK_ZONES, NEARBY_EMERGENCY_SERVICES } from '../data/mockData';

interface RiskDashboardProps {
  onOpenSOS: () => void;
}

export const RiskDashboard: React.FC<RiskDashboardProps> = ({ onOpenSOS }) => {
  const emergencyHelplines = [
    { label: 'National Unified Emergency Dispatch', number: '112', type: 'Police • Fire • Medical', icon: Flame, color: 'text-rose-400 border-rose-500/40 bg-rose-950/30' },
    { label: 'Tourist Multilingual Support (12 Langs)', number: '1363', type: 'Ministry of Tourism', icon: PhoneCall, color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/30' },
    { label: 'Railway Security & RPF Assistance', number: '139', type: 'Train / Station Security', icon: Radio, color: 'text-sky-400 border-sky-500/40 bg-sky-950/30' },
    { label: 'Women in Distress Emergency Line', number: '1091', type: 'National Commission for Women', icon: ShieldAlert, color: 'text-purple-400 border-purple-500/40 bg-purple-950/30' },
    { label: 'Emergency Medical Ambulance', number: '108', type: 'Free Emergency Paramedics', icon: Activity, color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-cyan-500/20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>LAYER 04 TELEMETRY // REAL-TIME RISK METRICS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono uppercase tracking-tight">
            TOURISM RISK DASHBOARD &amp; TELEMETRY
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Nationwide operational readiness, monitored high-density transit corridors, and rapid emergency dispatch telemetry.
          </p>
        </div>

        <button
          onClick={onOpenSOS}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-wider uppercase transition shadow-lg shadow-rose-950"
        >
          <Flame className="w-4 h-4 text-rose-200" />
          <span>TRIGGER TEST SOS (112)</span>
        </button>
      </div>

      {/* Top 4 Real-time Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 shadow-lg shadow-black">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
            <span>SCAMS INTERCEPTED (30D)</span>
            <span className="text-emerald-400">+14% THIS WEEK</span>
          </div>
          <div className="text-3xl font-mono font-black text-cyan-400">1,248</div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            Paharganj &amp; Agra top the avoidance list
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 shadow-lg shadow-black">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
            <span>ACTIVE CRITICAL HOTSPOTS</span>
            <span className="text-rose-400 animate-pulse">LIVE SURVEILLANCE</span>
          </div>
          <div className="text-3xl font-mono font-black text-rose-400">7 ZONES</div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            Police safe corridors deployed
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 shadow-lg shadow-black">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
            <span>DISPATCH NETWORK UPTIME</span>
            <span className="text-emerald-400 font-bold">99.98%</span>
          </div>
          <div className="text-3xl font-mono font-black text-emerald-400">&lt; 3.2s</div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            Average WebRTC-to-PSTN handshake
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 shadow-lg shadow-black">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
            <span>OFFLINE EDGE VAULT</span>
            <span className="text-amber-400 font-bold">READY</span>
          </div>
          <div className="text-3xl font-mono font-black text-amber-400">3 PACKS</div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            Delhi NCR, Agra &amp; Phrasebook cached
          </div>
        </div>

      </div>

      {/* Main Grid: Live Threat Stream (Left) + Emergency Helpline Directory (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Live Incident Feed (7 Cols) */}
        <div className="lg:col-span-7 rounded-xl bg-slate-950/90 border border-cyan-500/30 p-5 shadow-xl shadow-black space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/15 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <h3 className="font-mono text-sm font-bold text-white uppercase">
                REAL-TIME THREAT LOG STREAM (INDIA TRANSIT)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">
              UPDATED SECONDS AGO
            </span>
          </div>

          <div className="space-y-3">
            {THREAT_ITEMS.map((item) => (
              <div 
                key={item.id}
                className="p-3.5 rounded-lg bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 transition text-left space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      item.severity === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      item.severity === 'high' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                      'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {item.severity}
                    </span>
                    <span className="text-xs font-mono font-bold text-white">{item.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-rose-400 font-bold shrink-0">
                    {item.anomalyScore}% Risk
                  </span>
                </div>

                <div className="text-xs text-slate-300 font-sans">
                  {item.description}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    {item.location}
                  </span>
                  <span>{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Emergency Helpline Directory (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          <div className="rounded-xl bg-slate-950/90 border border-cyan-500/30 p-5 shadow-xl shadow-black space-y-3">
            <div className="flex items-center gap-2 border-b border-cyan-500/15 pb-3">
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase">
                OFFICIAL INDIA EMERGENCY HOTLINES
              </h3>
            </div>

            <div className="space-y-2.5">
              {emergencyHelplines.map((helpline, idx) => {
                const Icon = helpline.icon;
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border flex items-center justify-between transition ${helpline.color}`}
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-white">{helpline.label}</div>
                      <div className="text-[10px] font-mono opacity-80">{helpline.type}</div>
                    </div>
                    <a
                      href={`tel:${helpline.number}`}
                      className="px-3 py-1.5 rounded bg-slate-900/90 hover:bg-white hover:text-slate-950 text-white font-mono text-xs font-black transition border border-white/20 shadow-md"
                    >
                      CALL {helpline.number}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verified Safe Havens in Vicinity */}
          <div className="rounded-xl bg-slate-950/80 border border-cyan-500/20 p-4 space-y-2 text-left">
            <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
              NEAREST VERIFIED SAFE HAVENS (CENTRAL DELHI):
            </span>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="p-2 rounded bg-slate-900/50 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Connaught Place Police Station</div>
                  <div className="text-[10px] text-slate-400">Shivaji Stadium Rd • Open 24/7</div>
                </div>
                <span className="text-emerald-400 font-bold">450m</span>
              </div>
              <div className="p-2 rounded bg-slate-900/50 border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Dr. RML Central Hospital ER</div>
                  <div className="text-[10px] text-slate-400">Baba Kharak Singh Marg • Trauma 24/7</div>
                </div>
                <span className="text-emerald-400 font-bold">1.2 km</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
