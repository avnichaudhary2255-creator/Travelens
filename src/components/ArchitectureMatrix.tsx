import React, { useState } from 'react';
import { 
  Layers, 
  Cpu, 
  Database, 
  ShieldCheck, 
  Radio, 
  Lock, 
  Zap, 
  CheckCircle2, 
  Terminal, 
  Network
} from 'lucide-react';
import { ARCHITECTURE_LAYERS } from '../data/mockData';

export const ArchitectureMatrix: React.FC = () => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);
  const activeLayer = ARCHITECTURE_LAYERS[selectedLayerIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>SYSTEM BLUEPRINT // 5-LAYER DEFENSE SPECIFICATION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono uppercase tracking-tight">
          TRAVELENS DEFENSE ARCHITECTURE
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Engineered as a mission-critical edge-first framework ensuring zero data loss, offline operation, and instantaneous tourist rescue.
        </p>
      </div>

      {/* Layer Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {ARCHITECTURE_LAYERS.map((layer, idx) => {
          const isSelected = selectedLayerIndex === idx;
          return (
            <button
              key={layer.code}
              onClick={() => setSelectedLayerIndex(idx)}
              className={`p-3 rounded-lg border text-left transition font-mono ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-950/50 scale-[1.02]'
                  : 'bg-slate-950/70 border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/30'
              }`}
            >
              <div className="text-[10px] text-cyan-400 font-bold mb-1">{layer.layer}</div>
              <div className="text-xs font-bold truncate">{layer.name.split(' ')[0]} {layer.name.split(' ')[1]}</div>
              <div className="mt-1 flex items-center justify-between text-[9px] opacity-75">
                <span>{layer.code}</span>
                <span className="text-emerald-400">{layer.badge}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Layer Deep Dive Card */}
      <div className="rounded-xl bg-slate-950/90 border border-cyan-500/40 p-6 shadow-2xl shadow-black space-y-6">
        
        {/* Layer Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-4">
          <div>
            <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-bold">
              {activeLayer.layer} • {activeLayer.code}
            </span>
            <h3 className="text-xl sm:text-2xl font-mono font-black text-white mt-2">
              {activeLayer.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              STATUS: {activeLayer.status}
            </span>
          </div>
        </div>

        {/* Description & Technical Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <div className="lg:col-span-8 space-y-4">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block mb-1">
                LAYER PURPOSE &amp; EXECUTION:
              </span>
              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                {activeLayer.description}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-900/80 border border-cyan-500/20 space-y-2">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">
                UNDERLYING TECHNOLOGY MATRIX:
              </span>
              <div className="text-xs font-mono text-slate-200">
                {activeLayer.tech}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-4 rounded-lg bg-cyan-950/30 border border-cyan-500/30 space-y-3 font-mono text-xs">
            <div className="text-cyan-300 font-bold uppercase text-[11px] border-b border-cyan-500/20 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              DEFENSE VERIFICATION
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">LATENCY SLA:</span>
                <span className="text-emerald-400 font-bold">{activeLayer.badge}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">DATA INTEGRITY:</span>
                <span className="text-white font-bold">SHA-256 Verified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ISOLATION MODE:</span>
                <span className="text-cyan-300 font-bold">Autonomous Edge Fallback</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">ACCIDENTAL PROOF:</span>
                <span className="text-white font-bold">5-Second Guard</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
