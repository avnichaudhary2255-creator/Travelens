import React, { useState } from 'react';
import { 
  Flame, 
  PhoneCall, 
  ShieldAlert, 
  MapPin, 
  Download, 
  CheckCircle2, 
  WifiOff, 
  Radio, 
  Lock, 
  UserCheck, 
  Send, 
  AlertOctagon
} from 'lucide-react';
import { OFFLINE_PACKAGES_DATA, USER_PROFILE } from '../data/mockData';
import { OfflinePackage } from '../types';

interface EmergencyCenterProps {
  onOpenSOS: () => void;
}

export const EmergencyCenter: React.FC<EmergencyCenterProps> = ({ onOpenSOS }) => {
  const [offlinePacks, setOfflinePacks] = useState<OfflinePackage[]>(OFFLINE_PACKAGES_DATA);
  const [isBroadcasting, setIsBroadcasting] = useState<boolean>(false);
  const [broadcastSent, setBroadcastSent] = useState<boolean>(false);

  const toggleDownload = (id: string) => {
    setOfflinePacks((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isDownloaded: !p.isDownloaded } : p))
    );
  };

  const handleSimulateBroadcast = () => {
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastSent(true);
      setTimeout(() => setBroadcastSent(false), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
          <Flame className="w-4 h-4 text-rose-500 animate-bounce" />
          <span>LAYER 05 DISPATCH // RAPID EMERGENCY RESPONSE &amp; OFFLINE VAULT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono uppercase tracking-tight">
          EMERGENCY HELP &amp; CRISIS DISPATCH
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Guaranteed intervention within 3.2s via automated satellite/SMS relay, tourist police linkage, and zero-connectivity offline survival bundles.
        </p>
      </div>

      {/* Main Crisis Action Banner (SOS Trigger) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/70 via-slate-950 to-rose-950/40 border-2 border-rose-500/60 shadow-2xl shadow-rose-950/60 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-[10px] font-mono font-bold text-rose-300">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span>ACCIDENTAL TRIGGER GUARD ENABLED (5-SEC ABORT TIMEOUT)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-mono font-black text-white">
            HIGH-PRIORITY CRISIS DISPATCH BEACON
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Transmits high-precision GPS coordinates, user passport identifier, and medical contacts to Indian National Emergency (112) and Ministry of Tourism Police (1363).
          </p>
        </div>

        <button
          onClick={onOpenSOS}
          className="group relative px-6 sm:px-8 py-4 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white font-mono text-sm font-black tracking-widest uppercase border border-rose-400 shadow-2xl shadow-rose-600/50 hover:shadow-rose-500/70 hover:scale-105 active:scale-95 transition-all shrink-0"
        >
          <span className="relative z-10 flex items-center gap-2.5">
            <AlertOctagon className="w-5 h-5 text-rose-200 animate-spin" />
            <span>INITIATE EMERGENCY SOS</span>
          </span>
          <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Two Column Layout: Next of Kin Emergency Broadcast + Offline Survival Kits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Registered Next of Kin & Location Ping (6 Cols) */}
        <div className="lg:col-span-6 rounded-xl bg-slate-950/90 border border-cyan-500/30 p-5 shadow-xl shadow-black space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/15 pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-cyan-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase">
                EMERGENCY CONTACT &amp; BEACON LINK
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">
              AES-256 VAULT SYNCED
            </span>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/70 border border-white/5 space-y-2 text-xs font-mono">
            <div className="text-slate-400 text-[10px] uppercase">REGISTERED NEXT OF KIN:</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-bold">{USER_PROFILE.emergencyContact.name}</div>
                <div className="text-slate-400 text-[11px]">{USER_PROFILE.emergencyContact.relation}</div>
              </div>
              <div className="text-cyan-300 font-bold">{USER_PROFILE.emergencyContact.phone}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 space-y-2 font-mono">
            <div className="text-cyan-300 font-bold uppercase text-[10px]">
              SILENT BACKGROUND LOCATION SHARING:
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              Sends an encrypted SMS with live Google Maps coordinate pinpoint and emergency contact instructions without sounding an alarm.
            </p>

            <button
              onClick={handleSimulateBroadcast}
              disabled={isBroadcasting}
              className="w-full mt-2 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold tracking-wider uppercase transition flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isBroadcasting ? 'TRANSMITTING ENCRYPTED PING...' : 'DISPATCH SILENT GPS LOCATION PING'}</span>
            </button>

            {broadcastSent && (
              <div className="p-2 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono text-center">
                ✓ GPS Coordinates successfully relayed via cellular SMS gateway.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Zero-Connectivity Offline Survival Packs (6 Cols) */}
        <div className="lg:col-span-6 rounded-xl bg-slate-950/90 border border-cyan-500/30 p-5 shadow-xl shadow-black space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/15 pb-3">
            <div className="flex items-center gap-2">
              <WifiOff className="w-5 h-5 text-amber-400" />
              <h3 className="font-mono text-sm font-bold text-white uppercase">
                ZERO-CONNECTIVITY OFFLINE VAULT
              </h3>
            </div>
            <span className="text-[10px] font-mono text-amber-400 font-bold">
              NO INTERNET REQUIRED
            </span>
          </div>

          <div className="space-y-2.5">
            {offlinePacks.map((pack) => (
              <div
                key={pack.id}
                className="p-3 rounded-lg bg-slate-900/60 border border-white/5 flex items-center justify-between gap-3 text-xs font-mono"
              >
                <div>
                  <div className="text-white font-bold">{pack.region}</div>
                  <div className="text-[10px] text-slate-400">
                    {pack.size} • {pack.safeZonesIncluded} Safe Havens • {pack.emergencyContactsIncluded} Contacts
                  </div>
                </div>

                <button
                  onClick={() => toggleDownload(pack.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition ${
                    pack.isDownloaded
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40'
                  }`}
                >
                  {pack.isDownloaded ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>STORED</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>DOWNLOAD</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="text-[10px] font-mono text-slate-500 text-center pt-1">
            ENCRYPTED LOCAL STORAGE: INDEXEDDB • 100% PRESERVED IN AIRPLANE MODE
          </div>
        </div>

      </div>
    </div>
  );
};
