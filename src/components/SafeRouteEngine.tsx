import React, { useState } from 'react';
import { 
  Route as RouteIcon, 
  ShieldCheck, 
  AlertTriangle, 
  MapPin, 
  ArrowRight, 
  Clock, 
  Navigation, 
  Video, 
  ShieldAlert, 
  Calculator, 
  CheckCircle2, 
  DollarSign
} from 'lucide-react';
import { SAFE_ROUTES } from '../data/mockData';
import { SafeRoutePlan } from '../types';

export const SafeRouteEngine: React.FC = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(SAFE_ROUTES[0].id);
  const [customOrigin, setCustomOrigin] = useState<string>('New Delhi Railway Station (Platform 1)');
  const [customDest, setCustomDest] = useState<string>('Paharganj Main Bazaar');
  
  // Fair rate calculator state
  const [distanceKm, setDistanceKm] = useState<number>(3.5);
  const [vehicleType, setVehicleType] = useState<'auto' | 'taxi' | 'metro'>('auto');
  const [isNightTime, setIsNightTime] = useState<boolean>(false);

  const activePlan = SAFE_ROUTES.find((r) => r.id === selectedRouteId) || SAFE_ROUTES[0];

  // Official Indian Metro Fare Calculation (e.g., Delhi Transport Authority regulated rate)
  // Base Auto: ₹30 first 1.5 km, ₹11/km after. +25% night fare (11pm - 5am)
  const calculateFairFare = () => {
    if (vehicleType === 'metro') {
      return distanceKm <= 5 ? 20 : distanceKm <= 12 ? 30 : distanceKm <= 21 ? 40 : 50;
    }
    if (vehicleType === 'auto') {
      const baseFare = 30; // first 1.5 km
      const extraKm = Math.max(0, distanceKm - 1.5);
      const total = baseFare + (extraKm * 11);
      return Math.round(isNightTime ? total * 1.25 : total);
    }
    // Taxi (Non-AC / AC)
    const baseFare = 50; // first 1 km
    const extraKm = Math.max(0, distanceKm - 1);
    const total = baseFare + (extraKm * 17);
    return Math.round(isNightTime ? total * 1.25 : total);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
          <RouteIcon className="w-4 h-4 text-cyan-400" />
          <span>LAYER 02 ENGINE // AI DIVERGENT SAFE PATHFINDER</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono uppercase tracking-tight">
          SAFE ROUTE &amp; SCAM REROUTING ENGINE
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Intelligently bypasses aggressive tout corridors, unlit alleys, and unauthorized cab diversion traps across major Indian transit hubs.
        </p>
      </div>

      {/* Route Selector Bar */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-black">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">PRELOADED RISK CORRIDORS:</span>
          <div className="flex flex-wrap gap-2">
            {SAFE_ROUTES.map((route) => (
              <button
                key={route.id}
                onClick={() => {
                  setSelectedRouteId(route.id);
                  setCustomOrigin(route.origin);
                  setCustomDest(route.destination);
                }}
                className={`px-3 py-1.5 rounded text-xs font-mono transition border ${
                  selectedRouteId === route.id
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-md'
                    : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white hover:border-cyan-500/40'
                }`}
              >
                {route.origin.split(' ')[0]} → {route.destination.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>ALGORITHM: A* WITH SAFETY-WEIGHTED HEURISTICS</span>
        </div>
      </div>

      {/* Two-Column Comparison: Standard Unsafe Route vs Travelens AI Safe Corridor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Standard Vulnerable Route (Red / Warning Accents) */}
        <div className="rounded-xl bg-slate-950/90 border border-rose-500/40 p-5 shadow-xl shadow-rose-950/30 space-y-4">
          <div className="flex items-center justify-between border-b border-rose-500/20 pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 animate-pulse" />
              <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-wider">
                STANDARD / DEFAULT ROUTE (HIGH VULNERABILITY)
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block">SAFETY SCORE</span>
              <span className="text-lg font-mono font-black text-rose-400">
                {activePlan.standardRoute.safetyScore}/100
              </span>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
            <div className="p-2.5 rounded bg-slate-900/70 border border-white/5">
              <span className="text-slate-400 block text-[9px]">DURATION</span>
              <span className="text-white font-bold">{activePlan.standardRoute.duration}</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900/70 border border-white/5">
              <span className="text-slate-400 block text-[9px]">DISTANCE</span>
              <span className="text-white font-bold">{activePlan.standardRoute.distance}</span>
            </div>
            <div className="p-2.5 rounded bg-rose-950/40 border border-rose-500/30">
              <span className="text-rose-300 block text-[9px]">RISK ZONES</span>
              <span className="text-rose-400 font-bold">{activePlan.standardRoute.riskZonesEncountered} Active Traps</span>
            </div>
          </div>

          {/* Active Hazards Detected */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-rose-300 font-semibold uppercase block">
              IDENTIFIED THREAT HAZARDS ON THIS PATH:
            </span>
            <div className="space-y-1.5">
              {activePlan.standardRoute.hazards.map((hazard, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200 font-mono flex items-start gap-2"
                >
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{hazard}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded bg-slate-900/60 border border-white/5 text-[11px] text-slate-400 font-mono">
            <span className="text-rose-400 font-bold">WARNING:</span> This path crosses unverified street agents known for diverting foreign visitors to sham travel desks claiming train cancelations.
          </div>
        </div>

        {/* Right: Travelens AI Safe Corridor (Cyan / Emerald Accents) */}
        <div className="rounded-xl bg-slate-950/90 border border-cyan-500/50 p-5 shadow-xl shadow-cyan-950/40 space-y-4 relative">
          
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                  TRAVELENS AI SHIELD CORRIDOR (OPTIMIZED)
                </span>
                <span className="text-[9px] font-mono text-emerald-400">SURVEILLANCE &amp; POLICE INTEGRATED</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-400 block">SAFETY SCORE</span>
              <span className="text-lg font-mono font-black text-emerald-400">
                {activePlan.safeRoute.safetyScore}/100
              </span>
            </div>
          </div>

          {/* Key Safe Metrics */}
          <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
            <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-500/30">
              <span className="text-cyan-300 block text-[9px]">DURATION</span>
              <span className="text-white font-bold">{activePlan.safeRoute.duration}</span>
            </div>
            <div className="p-2.5 rounded bg-cyan-950/40 border border-cyan-500/30">
              <span className="text-cyan-300 block text-[9px]">DISTANCE</span>
              <span className="text-white font-bold">{activePlan.safeRoute.distance}</span>
            </div>
            <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/30">
              <span className="text-emerald-300 block text-[9px]">POLICE POSTS</span>
              <span className="text-emerald-400 font-bold">{activePlan.safeRoute.policePostsCount} Manning Desks</span>
            </div>
          </div>

          {/* Telemetry Security Checklist */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
            <div className="p-2 rounded bg-slate-900/60 border border-white/5 flex items-center gap-2">
              <Video className="w-3.5 h-3.5 text-cyan-400" />
              <span>CCTV COVERAGE: <strong className="text-white">{activePlan.safeRoute.cctvCoverage}</strong></span>
            </div>
            <div className="p-2 rounded bg-slate-900/60 border border-white/5 flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-emerald-400" />
              <span>LIGHTING: <strong className="text-white">{activePlan.safeRoute.lightingQuality}</strong></span>
            </div>
          </div>

          {/* AI Recommended Transport */}
          <div className="p-3 rounded bg-cyan-950/50 border border-cyan-500/30 text-xs text-cyan-100 font-mono">
            <span className="text-cyan-400 font-bold block text-[10px] uppercase mb-1">
              RECOMMENDED TRANSIT MODE:
            </span>
            {activePlan.safeRoute.recommendedTransport}
          </div>

          {/* Safe Waypoints */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-slate-300 font-semibold uppercase block">
              SECURE CORRIDOR WAYPOINTS:
            </span>
            <div className="space-y-1">
              {activePlan.safeRoute.waypoints.map((wp, idx) => (
                <div 
                  key={idx}
                  className="p-2 rounded bg-slate-900/70 border border-white/5 text-[11px] font-mono text-slate-300 flex items-center gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center text-[9px] font-bold">
                    {idx + 1}
                  </span>
                  <span>{wp}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Fair Meter Rate Verification Module (Prevent 3x Overcharging) */}
      <div className="rounded-xl bg-slate-950/80 border border-cyan-500/30 p-5 shadow-lg shadow-black space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/15 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-mono text-sm font-bold text-white uppercase">
                GOVERNMENT REGULATED FARE CHECKER (INDIA TRANSIT)
              </h3>
              <p className="text-[11px] text-slate-400">
                Instant benchmark for Auto-Rickshaws and Taxis to counter exorbitant quotes.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 font-bold">
            METER TARIFF ACT ENFORCED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">TRAVEL DISTANCE (KM):</label>
            <input 
              type="number" 
              min="0.5" 
              max="150" 
              step="0.5"
              value={distanceKm}
              onChange={(e) => setDistanceKm(parseFloat(e.target.value) || 1)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-white font-mono text-xs focus:border-cyan-400 outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">TRANSIT VEHICLE:</label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-white font-mono text-xs focus:border-cyan-400 outline-none"
            >
              <option value="auto">Auto-Rickshaw (Tuk-Tuk)</option>
              <option value="taxi">Prepaid / Yellow Top Taxi</option>
              <option value="metro">Rapid Metro Rail</option>
            </select>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input 
              type="checkbox"
              id="nightCheck"
              checked={isNightTime}
              onChange={(e) => setIsNightTime(e.target.checked)}
              className="rounded bg-slate-900 border-cyan-500/30 text-cyan-500 focus:ring-0"
            />
            <label htmlFor="nightCheck" className="text-xs font-mono text-slate-300 cursor-pointer">
              Night Hours (11:00 PM – 5:00 AM, +25%)
            </label>
          </div>

          <div className="p-3 rounded-lg bg-cyan-950/70 border border-cyan-400/40 text-center">
            <span className="text-[9px] font-mono text-cyan-300 block uppercase">LEGAL MAXIMUM FARE</span>
            <span className="text-xl font-mono font-black text-white">
              ₹{calculateFairFare()} INR
            </span>
            <span className="text-[9px] text-slate-400 block mt-0.5">
              (Insist on meter before boarding)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
