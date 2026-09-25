import React from 'react';
import { 
  Radio, 
  ShieldCheck, 
  Lock, 
  Terminal, 
  Compass, 
  Flame, 
  ArrowUpRight, 
  ExternalLink 
} from 'lucide-react';
import { TabType } from '../types';

interface FooterProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenSOS: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenSOS }) => {
  return (
    <footer className="relative border-t border-cyan-500/20 bg-[#020611] text-slate-400 font-mono text-xs overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-cyan-900/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 space-y-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Mission Statement (5 Cols) */}
          <div className="md:col-span-5 space-y-3 text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-950 border border-cyan-500/40 flex items-center justify-center">
                <Radio className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-lg font-black text-white tracking-wider">
                TRAVE<span className="text-cyan-400">LENS</span>
              </span>
            </div>

            <div className="text-cyan-300 font-bold text-xs uppercase tracking-wider">
              Travel India. Explore Freely. Travel Safely.
            </div>

            <p className="text-slate-400 text-xs font-sans leading-relaxed max-w-sm">
              An AI-powered defense and risk intelligence network designed specifically for travelers in India. Integrating real-time scam interception, safe divergent routing, and automated crisis dispatch.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[10px] text-slate-500">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>ENCRYPTED PROTOCOL • ZERO TELEMETRY TRACKING</span>
            </div>
          </div>

          {/* Quick Navigation Links (3 Cols) */}
          <div className="md:col-span-3 space-y-2 text-left">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              DEFENSE MODULES
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('map')} className="hover:text-cyan-300 transition">
                  • Live Threat &amp; Risk Radar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('route')} className="hover:text-cyan-300 transition">
                  • Safe Route &amp; Scam Rerouter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('ai')} className="hover:text-cyan-300 transition">
                  • Defense AI Copilot (Gemini)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('dashboard')} className="hover:text-cyan-300 transition">
                  • Risk Dashboard &amp; Telemetry
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('architecture')} className="hover:text-cyan-300 transition">
                  • 5-Layer Defense Blueprint
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('threats')} className="hover:text-cyan-300 transition">
                  • Indian Scam Directory
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Escalation Links (4 Cols) */}
          <div className="md:col-span-4 space-y-2 text-left">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
              INDIAN EMERGENCY NETWORK
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/80 border border-white/5">
                <span>National Emergency Hotline</span>
                <a href="tel:112" className="text-rose-400 font-bold hover:underline">112</a>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/80 border border-white/5">
                <span>Tourist Police Multi-lingual</span>
                <a href="tel:1363" className="text-cyan-300 font-bold hover:underline">1363</a>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950/80 border border-white/5">
                <span>Railway Security &amp; Fraud (RPF)</span>
                <a href="tel:139" className="text-sky-300 font-bold hover:underline">139</a>
              </div>
            </div>

            <button
              onClick={onOpenSOS}
              className="w-full mt-2 py-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>TEST DISTRESS SOS BEACON</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Standards */}
        <div className="pt-6 border-t border-cyan-500/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500">
          <div>
            © 2026 TRAVELENS AI INTELLIGENCE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>OFFLINE-FIRST ARCHITECTURE</span>
            <span>•</span>
            <span>OPERATING ACROSS 28 INDIAN STATES &amp; 8 UTS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
