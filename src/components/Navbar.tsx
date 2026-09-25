import React, { useState } from 'react';
import { 
  Radar, 
  Route as RouteIcon, 
  Bot, 
  Activity, 
  Layers, 
  ShieldAlert, 
  LifeBuoy, 
  Menu, 
  X, 
  Flame, 
  Lock, 
  Radio
} from 'lucide-react';
import { TabType } from '../types';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenSOS: () => void;
  activeThreatCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSOS,
  activeThreatCount = 6,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'map', label: 'Map', icon: Radar },
    { id: 'route', label: 'Route', icon: RouteIcon },
    { id: 'ai', label: 'AI', icon: Bot },
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'threats', label: 'Threats', icon: ShieldAlert },
    { id: 'help', label: 'Help', icon: LifeBuoy },
  ];

  const handleNavClick = (tab: TabType) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#030712]/90 border-b border-cyan-500/20 transition-all shadow-xl shadow-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Left: Product Name / Logo & Technical Badge */}
        <div 
          onClick={() => handleNavClick('map')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Futuristic Hexagonal/HUD Icon with glowing cyan dot */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-slate-950 border border-cyan-500/40 shadow-lg shadow-cyan-950/50 group-hover:border-cyan-400 group-hover:shadow-cyan-500/25 transition duration-200">
            <Radio className="w-5 h-5 text-cyan-400 animate-pulse" />
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <div className="absolute inset-0 rounded-lg bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-wider text-white font-mono flex items-center gap-1">
                <span>TRAVE</span>
                <span className="text-cyan-400">LENS</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 ml-0.5 animate-pulse" />
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[9px] uppercase font-mono font-bold tracking-widest rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                <Lock className="w-2.5 h-2.5 text-cyan-400" />
                <span>AI Tourism Risk Intelligence</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden md:block">
              DEFENSE MATRIX • ACTIVE INCIDENT MONITORING (INDIA)
            </p>
          </div>
        </div>

        {/* Center: Main Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-cyan-500/20 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded transition-all duration-150 ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.id === 'threats' && activeThreatCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono bg-rose-500/20 border border-rose-500/40 text-rose-300">
                    {activeThreatCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Status Badge & High-Contrast Emergency SOS Button */}
        <div className="flex items-center gap-3">
          {/* Live Status Badge */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded bg-slate-950/70 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wider uppercase font-semibold">LIVE MONITORING • ACTIVE</span>
          </div>

          {/* Prominent Emergency SOS button with crimson/magenta glow */}
          <button
            onClick={onOpenSOS}
            className="relative group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white font-mono text-xs font-bold tracking-wider uppercase border border-rose-400/50 shadow-lg shadow-rose-900/40 hover:shadow-rose-600/50 hover:brightness-110 active:scale-95 transition-all"
          >
            <Flame className="w-4 h-4 text-rose-200 animate-bounce" />
            <span className="font-extrabold tracking-widest">EMERGENCY SOS</span>
            <span className="hidden xl:inline text-[10px] px-1 py-0.2 rounded bg-black/40 text-rose-200 font-mono">
              112
            </span>
            <div className="absolute inset-0 rounded-lg border-2 border-rose-400/40 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all pointer-events-none" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-cyan-500/20 bg-[#030712]/95 backdrop-blur-2xl px-4 py-4 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider">
              AI RISK INTELLIGENCE RADAR
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ONLINE (INDIA)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-xs font-mono font-medium transition ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800 border border-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
