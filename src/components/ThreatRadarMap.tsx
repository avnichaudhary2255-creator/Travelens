import React, { useState } from 'react';
import { 
  Radar, 
  AlertTriangle, 
  ShieldCheck, 
  MapPin, 
  Filter, 
  Search, 
  Layers, 
  ArrowRight, 
  Crosshair, 
  CheckCircle, 
  PhoneCall, 
  Eye, 
  Radio
} from 'lucide-react';
import { THREAT_ITEMS, RISK_ZONES } from '../data/mockData';
import { ThreatItem, RiskZone } from '../types';

interface ThreatRadarMapProps {
  onOpenSOS?: () => void;
  onSelectRoute?: (origin: string, dest: string) => void;
}

export const ThreatRadarMap: React.FC<ThreatRadarMapProps> = ({ onOpenSOS, onSelectRoute }) => {
  const [selectedThreat, setSelectedThreat] = useState<ThreatItem>(THREAT_ITEMS[0]);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Filtered threats
  const filteredThreats = THREAT_ITEMS.filter((t) => {
    const matchesSeverity = selectedSeverity === 'all' || t.severity === selectedSeverity;
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesCategory && matchesSearch;
  });

  const handleSimulateRadarScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult('PERIMETER SECURE: 2 Active Touts identified within 500m radius. Safe Corridor routed.');
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
            <Radar className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>LAYER 01 TELEMETRY // REAL-TIME GEOSPATIAL INTELLIGENCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono uppercase tracking-tight">
            LIVE THREAT &amp; RISK RADAR
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Active surveillance of verified tourist scams, taxi fare anomalies, and crowd congestion zones across India.
          </p>
        </div>

        {/* Scan GPS Location Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateRadarScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold tracking-wider uppercase transition shadow-md shadow-cyan-950/40"
          >
            <Crosshair className={`w-4 h-4 text-cyan-400 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'SCANNING RADIUS (±1.5KM)...' : 'SCAN CURRENT RADIUS'}</span>
          </button>
        </div>
      </div>

      {/* Live Scan Notification if triggered */}
      {scanResult && (
        <div className="p-3 rounded-lg bg-cyan-950/60 border border-cyan-400/50 flex items-center justify-between text-xs font-mono text-cyan-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{scanResult}</span>
          </div>
          <button 
            onClick={() => setScanResult(null)}
            className="text-[10px] text-cyan-400 underline hover:text-white"
          >
            DISMISS
          </button>
        </div>
      )}

      {/* Main Radar Grid: Map View (Left/Center) + Threat Feed / Intelligence Drawer (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Interactive India Tactical Map & Radar Pins (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          {/* Tactical Map Container */}
          <div className="relative rounded-xl bg-slate-950/90 border border-cyan-500/30 p-4 overflow-hidden min-h-[440px] shadow-2xl shadow-black flex flex-col">
            
            {/* Map Header Status & Coordinates */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-cyan-500/15 pb-2 mb-3">
              <span className="flex items-center gap-2 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                GEO-GRID: INDIA TACTICAL RADAR [20.5937° N, 78.9629° E]
              </span>
              <span className="text-slate-500 hidden sm:inline">PROJECTION: MERCATOR_WGS84</span>
            </div>

            {/* Tactical Interactive Map Canvas / SVG Representation */}
            <div className="relative flex-1 rounded-lg bg-[#040915] border border-cyan-500/15 overflow-hidden flex items-center justify-center p-4">
              
              {/* Radar Sweeper Line Animation */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.08)_0%,_transparent_70%)] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-cyan-500/15 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-cyan-500/10 pointer-events-none" />
              
              {/* Radar Coordinate Crosshairs */}
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-cyan-500/10 pointer-events-none" />
              <div className="absolute left-0 right-0 top-1/2 h-px bg-cyan-500/10 pointer-events-none" />

              {/* Schematic Map of India with Interactive Hotspots */}
              <svg className="w-full h-full max-h-[380px] text-cyan-900/40 select-none" viewBox="0 0 500 520" fill="none">
                {/* Simplified India Land Boundary Outline */}
                <path 
                  d="M170,40 L210,30 L250,50 L270,70 L300,75 L330,110 L380,120 L440,115 L460,140 L450,170 L410,180 L380,175 L360,200 L370,240 L340,260 L320,300 L280,360 L240,440 L230,480 L220,440 L180,370 L150,300 L130,260 L100,230 L110,180 L140,150 L140,90 Z" 
                  fill="rgba(6, 182, 212, 0.04)" 
                  stroke="rgba(6, 182, 212, 0.25)" 
                  strokeWidth="1.5" 
                  strokeDasharray="4 2"
                />

                {/* Major Safe Transit Corridors */}
                <path d="M220,130 L250,160 L280,210 L250,290 L230,420" stroke="rgba(34, 197, 94, 0.35)" strokeWidth="1" strokeDasharray="3 3" />
                <path d="M160,250 L250,290 L340,260" stroke="rgba(6, 182, 212, 0.25)" strokeWidth="1" strokeDasharray="2 2" />
              </svg>

              {/* Pin Hotspots on Map for Active Threats */}
              {filteredThreats.map((threat, idx) => {
                const isSelected = selectedThreat.id === threat.id;
                // Simplified coordinate mapping onto relative SVG bounds
                // India bounds ~ Lat 8 - 35, Lng 68 - 90
                const topPct = `${Math.max(10, Math.min(85, ((35 - threat.coordinates.lat) / 27) * 90))}%`;
                const leftPct = `${Math.max(15, Math.min(85, ((threat.coordinates.lng - 68) / 22) * 80))}%`;

                const pinColor = 
                  threat.severity === 'critical' ? 'bg-rose-500' :
                  threat.severity === 'high' ? 'bg-orange-500' :
                  threat.severity === 'moderate' ? 'bg-amber-400' : 'bg-cyan-400';

                return (
                  <button
                    key={threat.id}
                    onClick={() => setSelectedThreat(threat)}
                    style={{ top: topPct, left: leftPct }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 flex flex-col items-center transition-all ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                    }`}
                  >
                    {/* Ping Animation for High/Critical */}
                    {(threat.severity === 'critical' || threat.severity === 'high') && (
                      <span className={`animate-ping absolute inline-flex h-6 w-6 rounded-full opacity-75 ${pinColor}`} />
                    )}
                    
                    {/* Core Pin Dot */}
                    <div className={`relative flex items-center justify-center w-5 h-5 rounded-full border-2 ${
                      isSelected ? 'border-white ring-2 ring-cyan-400 shadow-lg shadow-cyan-400/50' : 'border-slate-950'
                    } ${pinColor}`}>
                      <AlertTriangle className="w-2.5 h-2.5 text-slate-950 font-bold" />
                    </div>

                    {/* Quick City Tag */}
                    <div className={`mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono whitespace-nowrap border shadow-md transition ${
                      isSelected 
                        ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 font-bold' 
                        : 'bg-slate-950/80 border-white/10 text-slate-300'
                    }`}>
                      {threat.location.split(',')[0]}
                    </div>
                  </button>
                );
              })}

              {/* Tactical Legend Overlay at Map Corner */}
              <div className="absolute bottom-2 left-2 p-2 rounded bg-slate-950/90 border border-white/10 text-[9px] font-mono text-slate-400 backdrop-blur-md space-y-1 z-10">
                <div className="text-cyan-400 font-semibold mb-1">RADAR THREAT TIERS</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> Critical Anomaly (90+)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500" /> High Risk (75-89)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Moderate (50-74)</div>
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400" /> Low / Advisory (&lt;50)</div>
              </div>
            </div>

            {/* Quick Filter Bar Below Map */}
            <div className="mt-3 pt-2 border-t border-cyan-500/15 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                <span>SEVERITY:</span>
                {['all', 'critical', 'high', 'moderate'].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSelectedSeverity(sev)}
                    className={`px-2 py-0.5 rounded uppercase text-[10px] ${
                      selectedSeverity === sev 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>

              <div className="text-[10px] font-mono text-slate-400">
                SHOWING: <span className="text-cyan-300 font-bold">{filteredThreats.length}</span> ACTIVE THREAT NODES
              </div>
            </div>

          </div>

          {/* Monitored Indian Risk Zones Mini Grid */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                MONITORED METROPOLITAN RISK ZONES
              </span>
              <span className="text-[10px] text-slate-400">SAFE CORRIDORS VERIFIED</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {RISK_ZONES.map((zone) => (
                <div 
                  key={zone.id}
                  className="p-2 rounded-lg bg-slate-900/60 border border-white/5 hover:border-cyan-500/30 transition text-left"
                >
                  <div className="text-[10px] font-mono font-bold text-white truncate">{zone.name}</div>
                  <div className="text-[9px] font-mono text-slate-400">{zone.city}</div>
                  <div className="mt-1 flex items-center justify-between text-[9px] font-mono">
                    <span className={`px-1 rounded ${
                      zone.riskLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' :
                      zone.riskLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-300' :
                      zone.riskLevel === 'MODERATE' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-cyan-500/20 text-cyan-300'
                    }`}>
                      {zone.riskLevel}
                    </span>
                    <span className="text-slate-400">{zone.riskScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Selected Threat Intelligence Drawer & Safety Brief (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Active Incident Detail Card */}
          <div className="rounded-xl bg-slate-950/90 border border-cyan-500/40 p-4 shadow-xl shadow-cyan-950/30 space-y-4">
            
            {/* Incident Badge & Score */}
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                  selectedThreat.severity === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                  selectedThreat.severity === 'high' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40' :
                  'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {selectedThreat.severity.toUpperCase()} THREAT
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {selectedThreat.categoryLabel}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400">ANOMALY SCORE</span>
                <div className="text-lg font-mono font-black text-rose-400">
                  {selectedThreat.anomalyScore}/100
                </div>
              </div>
            </div>

            {/* Title & Location */}
            <div>
              <h3 className="text-base font-mono font-bold text-white leading-snug">
                {selectedThreat.title}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 text-xs font-mono text-cyan-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{selectedThreat.location}</span>
              </div>
            </div>

            {/* Description */}
            <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
              <span className="font-mono text-cyan-400 font-semibold uppercase text-[10px] block mb-1">
                INCIDENT PROFILE:
              </span>
              {selectedThreat.description}
            </div>

            {/* AI Prevention & Defense Protocol */}
            <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-100 leading-relaxed font-sans">
              <div className="flex items-center gap-1.5 font-mono text-cyan-300 font-bold uppercase text-[10px] mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI DEFENSE PROTOCOL:</span>
              </div>
              {selectedThreat.preventiveAdvice}
            </div>

            {/* Telemetry Stats */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1">
              <div className="p-2 rounded bg-slate-900/60 border border-white/5">
                <span className="text-slate-400 block">REPORTED INSTANCES:</span>
                <span className="text-white font-bold text-xs">{selectedThreat.reportedCases} cases in 48h</span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-white/5">
                <span className="text-slate-400 block">STATUS:</span>
                <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {selectedThreat.status}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  if (onSelectRoute) {
                    onSelectRoute(selectedThreat.location.split(',')[0], 'Safe Police Corridor');
                  }
                }}
                className="flex-1 py-2.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold tracking-wider uppercase transition shadow-md shadow-cyan-950"
              >
                REROUTE AROUND THIS HAZARD
              </button>

              <button
                onClick={onOpenSOS}
                className="py-2.5 px-3 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-mono font-semibold transition"
              >
                REPORT INCIDENT
              </button>
            </div>

          </div>

          {/* Quick Threat Stream List */}
          <div className="rounded-xl bg-slate-950/70 border border-cyan-500/20 p-3.5 space-y-2">
            <div className="text-xs font-mono text-slate-300 font-bold uppercase flex items-center justify-between">
              <span>LIVE INCIDENT STREAM</span>
              <span className="text-[10px] text-cyan-400">AUTO-REFRESH: 15s</span>
            </div>

            <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1">
              {THREAT_ITEMS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedThreat(item)}
                  className={`p-2 rounded-lg cursor-pointer transition border text-left flex items-center justify-between gap-2 ${
                    selectedThreat.id === item.id 
                      ? 'bg-cyan-950/40 border-cyan-400 text-white' 
                      : 'bg-slate-900/40 border-white/5 hover:border-cyan-500/30 text-slate-300'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono font-bold truncate">{item.title}</div>
                    <div className="text-[9px] font-mono text-slate-400">{item.location} • {item.timestamp}</div>
                  </div>
                  <span className={`shrink-0 text-[10px] font-mono font-bold ${
                    item.severity === 'critical' ? 'text-rose-400' : 'text-amber-400'
                  }`}>
                    {item.anomalyScore}%
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
