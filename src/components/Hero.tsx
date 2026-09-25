import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ArrowRight, 
  Radio, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  PhoneCall, 
  Cpu, 
  Layers, 
  Zap, 
  ChevronRight
} from 'lucide-react';
import { India3DGlobe, ThreatCityPin, INDIAN_THREAT_CITIES } from './ThreeCanvas/India3DGlobe';
import { TabType } from '../types';

interface HeroProps {
  onNavigateTab: (tab: TabType) => void;
  onLaunchScan?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateTab, onLaunchScan }) => {
  const [selectedCity, setSelectedCity] = useState<ThreatCityPin>(INDIAN_THREAT_CITIES[0]);

  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 border-b border-cyan-500/15">
      {/* Background Cybernetic Grids & Deep Ambient Glows */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[650px] h-[500px] bg-cyan-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[550px] h-[450px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-slate-950/0 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Technical Status, Headline, Mission & Stats */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* 1. Technical Status Chip / Eyebrow with Pulsing Live Dot */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-950/90 border border-cyan-500/40 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="tracking-widest uppercase font-semibold">ACTIVE THREAT MONITORING // V3.8-DEFENSE</span>
            </div>

            {/* 2. Main Title / Headline with Futuristic Typography & Cyan Accent Highlights */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white uppercase font-display leading-[1.08]">
                <span>AI TOURISM RISK </span>
                <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                  INTELLIGENCE
                </span>
                <br />
                <span className="text-slate-200 text-2xl sm:text-4xl lg:text-4xl font-extrabold tracking-normal text-slate-300 font-sans">
                  &amp; SAFE DISPATCH
                </span>
              </h1>
            </div>

            {/* 3. Subtitle / Mission Statement */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed font-sans">
              Real-time threat detection, AI-guided safe routing, scam prevention, crowd density analysis, and rapid emergency dispatch for travelers exploring India.
            </p>

            {/* 4. Primary Action Controls */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              {/* Primary Launch Radar CTA */}
              <button
                onClick={() => onNavigateTab('map')}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-mono font-bold tracking-wider uppercase rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-400/50 active:scale-[0.98] transition-all"
              >
                <Radio className="w-4 h-4 text-slate-950 animate-pulse" />
                <span>LAUNCH RISK RADAR</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Plan Safe Route CTA */}
              <button
                onClick={() => onNavigateTab('route')}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase rounded-lg bg-slate-950/80 hover:bg-slate-900 text-slate-200 border border-cyan-500/30 hover:border-cyan-400/60 shadow-lg active:scale-[0.98] transition-all"
              >
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>PLAN SAFE ROUTE</span>
              </button>

              {/* AI Assistant Quick Trigger */}
              <button
                onClick={() => onNavigateTab('ai')}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-xs sm:text-sm font-mono text-slate-400 hover:text-cyan-300 hover:bg-slate-900/50 rounded-lg transition"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>MEET AI COPILOT</span>
              </button>
            </div>

            {/* 5. Live Telemetry / Mini Stat Counters */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-cyan-500/20">
              <div className="p-3 rounded-lg bg-slate-950/70 border border-cyan-500/20">
                <div className="font-mono text-xl sm:text-2xl font-black text-cyan-400">48+</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                  Active Zones Monitored
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-cyan-500/20">
                <div className="font-mono text-xl sm:text-2xl font-black text-emerald-400">99.4%</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                  Threat Interception
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-cyan-500/20">
                <div className="font-mono text-xl sm:text-2xl font-black text-sky-400">&lt;3.2s</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                  SOS Dispatch Delay
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/70 border border-cyan-500/20">
                <div className="font-mono text-xl sm:text-2xl font-black text-amber-400">28</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-0.5">
                  States &amp; UTs Covered
                </div>
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: 3D Cyber Risk Sphere + Floating HUD Cards */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 relative">
            
            {/* Outer Cybernetic Container */}
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-cyan-500/30 via-slate-800/20 to-cyan-900/20 border border-cyan-500/30 backdrop-blur-xl shadow-2xl shadow-black">
              
              {/* Corner Tech Brackets */}
              <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

              <div className="relative rounded-xl bg-slate-950/80 overflow-hidden min-h-[460px] lg:min-h-[520px]">
                
                {/* 3D WebGL India Cyber Telemetry Sphere */}
                <India3DGlobe 
                  onSelectCity={(city) => setSelectedCity(city)} 
                />

                {/* Floating HUD Card 1: Live Risk Alert (Top Left) */}
                <div className="absolute top-12 left-3 sm:left-4 max-w-[240px] sm:max-w-[270px] p-2.5 rounded-lg bg-slate-950/90 border border-rose-500/40 shadow-xl shadow-rose-950/40 backdrop-blur-md z-20 pointer-events-none transform hover:scale-105 transition">
                  <div className="flex items-center justify-between text-[10px] font-mono text-rose-400 font-semibold mb-1">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3 h-3 text-rose-500 animate-pulse" />
                      LIVE RISK ALERT
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-bold">
                      {selectedCity.anomalyScore}%
                    </span>
                  </div>
                  <div className="text-xs font-mono font-bold text-white leading-tight">
                    {selectedCity.name.toUpperCase()}
                  </div>
                  <div className="text-[10px] text-slate-300 mt-1 line-clamp-2">
                    {selectedCity.primaryThreat}
                  </div>
                  <div className="mt-1.5 pt-1 border-t border-rose-500/20 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>Incidents: {selectedCity.activeIncidents}</span>
                    <span className="text-cyan-400">Rerouting Active</span>
                  </div>
                </div>

                {/* Floating HUD Card 2: AI Dispatch Readiness (Middle Right) */}
                <div className="absolute top-36 sm:top-40 right-3 sm:right-4 max-w-[210px] sm:max-w-[240px] p-2.5 rounded-lg bg-slate-950/90 border border-cyan-500/40 shadow-xl shadow-cyan-950/40 backdrop-blur-md z-20 pointer-events-none">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 font-semibold mb-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>DISPATCH READINESS</span>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-slate-200">
                    TOURISM POLICE: <span className="text-emerald-400">1363 READY</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    Safe Haven: {selectedCity.safeHavenDist}
                  </div>
                  <div className="mt-1 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>PSTN / WebRTC Linked</span>
                  </div>
                </div>

                {/* Floating HUD Card 3: Defense Telemetry (Bottom Right) */}
                <div className="hidden sm:block absolute bottom-14 right-4 p-2 rounded-lg bg-slate-950/85 border border-white/10 text-[9px] font-mono text-slate-400 backdrop-blur-md z-20 pointer-events-none space-y-0.5">
                  <div className="text-cyan-400 font-semibold">DEFENSE TELEMETRY</div>
                  <div>GPS PRECISION: ±2.4M</div>
                  <div>CIPHER: AES-256-GCM</div>
                  <div>MESH STATUS: SYNCED</div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
