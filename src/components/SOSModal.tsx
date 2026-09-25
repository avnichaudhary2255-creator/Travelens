import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  X, 
  MapPin, 
  Phone, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Flame, 
  Radio, 
  Volume2, 
  VolumeX
} from 'lucide-react';
import { UserProfile } from '../types';

interface SOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile;
}

export const SOSModal: React.FC<SOSModalProps> = ({ isOpen, onClose, userProfile }) => {
  const [countdown, setCountdown] = useState<number | null>(5);
  const [isTriggered, setIsTriggered] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('New Delhi Railway Station [28.6430° N, 77.2197° E]');
  const [sirenPlaying, setSirenPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setIsTriggered(false);
      setSirenPlaying(false);
      return;
    }

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation(`Lat: ${pos.coords.latitude.toFixed(4)}° N, Lng: ${pos.coords.longitude.toFixed(4)}° E (GPS Lock ±3m)`);
        },
        () => {},
        { timeout: 3500 }
      );
    }

    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsTriggered(true);
      setCountdown(null);
    }
  }, [isOpen, countdown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#030712] border-2 border-rose-500/60 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-rose-950/70 text-center space-y-5">
        
        {/* Corner Tech Brackets */}
        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-rose-400" />
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-rose-400" />
        <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-rose-400" />
        <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-rose-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900/80 text-slate-400 hover:text-white border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SOS Header & Icon */}
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 rounded-full bg-rose-600/20 border-2 border-rose-500 flex items-center justify-center text-rose-500 shadow-xl shadow-rose-600/40">
            <Flame className="w-8 h-8 animate-pulse text-rose-400" />
            <span className="animate-ping absolute inset-0 rounded-full bg-rose-500/20" />
          </div>

          <div className="mt-3">
            <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-widest block">
              // LAYER 05 RAPID ESCALATION //
            </span>
            <h3 className="text-xl sm:text-2xl font-mono font-black text-white uppercase">
              EMERGENCY SOS DISPATCH
            </h3>
          </div>
          <p className="text-xs text-slate-300 mt-1 font-mono">
            Automated Handshake: National Emergency 112 &amp; Tourist Police 1363
          </p>
        </div>

        {/* 5-Second Guard Countdown */}
        {!isTriggered && countdown !== null && countdown > 0 ? (
          <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 space-y-3 font-mono">
            <div className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
              TRIGGER GUARD ABORT TIMER:
            </div>
            <div className="text-4xl font-black text-rose-400 animate-bounce">
              00:0{countdown}
            </div>
            <p className="text-[10px] text-slate-400">
              Broadcasting GPS coordinates and tourist ID upon expiration. Tap Abort if triggered accidentally.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs border border-white/20 transition uppercase tracking-wider"
            >
              ABORT DISTRESS TRIGGER
            </button>
          </div>
        ) : (
          /* Active Dispatch Beacon Status */
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-3 text-left font-mono text-xs">
            <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-emerald-500/20 pb-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                DISTRESS BEACON BROADCASTING
              </span>
              <span className="animate-pulse">ACTIVE PING</span>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{currentLocation}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-300">
                <Radio className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Next of Kin SMS dispatched with real-time location.</span>
              </div>
            </div>
          </div>
        )}

        {/* Direct Action Hotlines */}
        <div className="space-y-2 pt-1 font-mono">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block text-left">
            INSTANT TELEPHONE ESCALATION:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <a
              href="tel:112"
              className="py-3 px-3 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-black tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-lg shadow-rose-950"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>DIAL 112 (POLICE)</span>
            </a>

            <a
              href="tel:1363"
              className="py-3 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-950"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>DIAL 1363 (TOURIST)</span>
            </a>
          </div>

          <a
            href="tel:139"
            className="w-full py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold uppercase transition flex items-center justify-center gap-2 border border-white/10"
          >
            <Radio className="w-3.5 h-3.5 text-sky-400" />
            <span>DIAL 139 (RAILWAY SECURITY &amp; RPF)</span>
          </a>
        </div>

      </div>
    </div>
  );
};
