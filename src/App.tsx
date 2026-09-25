/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThreatRadarMap } from './components/ThreatRadarMap';
import { SafeRouteEngine } from './components/SafeRouteEngine';
import { DefenseAICopilot } from './components/DefenseAICopilot';
import { RiskDashboard } from './components/RiskDashboard';
import { ArchitectureMatrix } from './components/ArchitectureMatrix';
import { ThreatDirectory } from './components/ThreatDirectory';
import { EmergencyCenter } from './components/EmergencyCenter';
import { Footer } from './components/Footer';
import { SOSModal } from './components/SOSModal';
import { TabType } from './types';
import { USER_PROFILE, THREAT_ITEMS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#020817] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Fixed / Sticky Navigation Bar */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          // If jumping to another tab, smooth scroll to content
          if (tab !== 'map') {
            const el = document.getElementById('main-content-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenSOS={() => setIsSOSOpen(true)}
        activeThreatCount={THREAT_ITEMS.length}
      />

      {/* Hero Section (Always visible as the crown of Travelens with 3D Cyber Risk Sphere) */}
      <Hero
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          const el = document.getElementById('main-content-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onLaunchScan={() => {
          setActiveTab('map');
          const el = document.getElementById('main-content-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Section Switcher */}
      <main id="main-content-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Navigation Indicator / Breadcrumb */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-cyan-500/15">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-500">TRAVELENS //</span>
            <span className="text-cyan-400 font-bold uppercase tracking-wider">
              {activeTab === 'map' && 'MODULE: LIVE THREAT & RISK RADAR'}
              {activeTab === 'route' && 'MODULE: AI SAFE ROUTE & SCAM REROUTING'}
              {activeTab === 'ai' && 'MODULE: DEFENSE AI COPILOT (GEMINI)'}
              {activeTab === 'dashboard' && 'MODULE: RISK TELEMETRY DASHBOARD'}
              {activeTab === 'architecture' && 'MODULE: 5-LAYER DEFENSE MATRIX'}
              {activeTab === 'threats' && 'MODULE: TOURIST SCAM DIRECTORY'}
              {activeTab === 'help' && 'MODULE: EMERGENCY DISPATCH & OFFLINE VAULT'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span>GRID: 28.6139° N, 77.2090° E</span>
            <span>•</span>
            <span className="text-emerald-400">GPS ACCURATE (±2.4M)</span>
          </div>
        </div>

        {/* Tab Module Views */}
        {activeTab === 'map' && (
          <ThreatRadarMap 
            onOpenSOS={() => setIsSOSOpen(true)}
            onSelectRoute={(origin, dest) => {
              setActiveTab('route');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'route' && (
          <SafeRouteEngine />
        )}

        {activeTab === 'ai' && (
          <DefenseAICopilot />
        )}

        {activeTab === 'dashboard' && (
          <RiskDashboard onOpenSOS={() => setIsSOSOpen(true)} />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureMatrix />
        )}

        {activeTab === 'threats' && (
          <ThreatDirectory />
        )}

        {activeTab === 'help' && (
          <EmergencyCenter onOpenSOS={() => setIsSOSOpen(true)} />
        )}

      </main>

      {/* Global Futuristic HUD Footer */}
      <Footer 
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSOS={() => setIsSOSOpen(true)}
      />

      {/* Emergency SOS Modal with 5-Second Guard & Live Dispatch Broadcast */}
      <SOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        userProfile={USER_PROFILE}
      />

    </div>
  );
}
