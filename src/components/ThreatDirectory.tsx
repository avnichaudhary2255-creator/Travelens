import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  ExternalLink, 
  PhoneCall, 
  X, 
  ShieldCheck, 
  Zap
} from 'lucide-react';

interface ScamEntry {
  id: string;
  title: string;
  category: 'transit' | 'monument' | 'retail' | 'spiritual';
  categoryLabel: string;
  location: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  pitch: string;
  reality: string;
  countermove: string;
  hotline: string;
}

const SCAM_DATABASE: ScamEntry[] = [
  {
    id: 'scam-1',
    title: 'The Paharganj "Train Canceled / Station Closed" Trap',
    category: 'transit',
    categoryLabel: 'Railway Transit Fraud',
    location: 'New Delhi Railway Station (Paharganj / Ajmeri Gate)',
    severity: 'CRITICAL',
    pitch: '"Sir, that train was canceled due to track repairs/fog! The entire station is sealed today. Let me take you to the official government travel agency on Connaught Place."',
    reality: 'The person is an unauthorized tout receiving hefty commissions. The station is never closed to ticket holders, and the train is running as scheduled.',
    countermove: 'Do not stop or reply. Walk directly past them to Platform 1 First Floor (International Tourist Bureau). Cross-check train status on NTES or dial 139.',
    hotline: '139 (Railway Security)',
  },
  {
    id: 'scam-2',
    title: 'Prepaid Airport Cab "Hotel Roadblock / Protest" Surcharge',
    category: 'transit',
    categoryLabel: 'Taxi & Cab Exploitation',
    location: 'Delhi Airport T3 / Mumbai Airport T2 Arrivals',
    severity: 'HIGH',
    pitch: '"Your hotel in Paharganj/Colaba is currently blocked by police barricades due to civil riots or VIP movement. I can take you to a verified luxury hotel in South Delhi instead."',
    reality: 'The driver diverts you to an accomplice hotel where you are charged 4x-5x room rates with kickbacks paid to the cab driver.',
    countermove: 'Insist firmly: "Take me to my booked hotel immediately or stop at the nearest police station." Call your hotel reception directly on speaker phone in front of the driver.',
    hotline: '1095 / 112',
  },
  {
    id: 'scam-3',
    title: 'The Jaipur "Gemstone Consignment / Tax Arbitrage" Scheme',
    category: 'retail',
    categoryLabel: 'Retail & Gemstone Scam',
    location: 'Jaipur (Johari Bazaar & Amer Fort Outskirts)',
    severity: 'CRITICAL',
    pitch: '"Help us export these precious star rubies/emeralds by carrying them through customs. You will be paid $10,000 upon delivery to our partner in the UK/USA."',
    reality: 'The stones are synthetic glass or low-grade quartz worth less than $20. You will be asked to leave a large credit card deposit which is never refunded.',
    countermove: 'Firmly decline any consignment offers. Never purchase gems without GIA or authorized Government Gem Testing Laboratory (GTL) certifications.',
    hotline: '1363 (Tourist Police)',
  },
  {
    id: 'scam-4',
    title: 'Varanasi Burning Ghat "Wood Donation & Photo Extortion"',
    category: 'spiritual',
    categoryLabel: 'Spiritual Extortion',
    location: 'Varanasi (Manikarnika & Harishchandra Ghats)',
    severity: 'HIGH',
    pitch: '"You must pay ₹5,000 for sandalwood logs to assist poor families with cremations. Also, taking photos here carries a ₹10,000 holy fine."',
    reality: 'A local extortion ring preys on foreigners visiting the ghats. No such official fee exists.',
    countermove: 'Do NOT take photos of funeral pyres out of respect. Politely ignore all unsolicited donations. State that you have already donated at the Kashi Vishwanath Trust desk.',
    hotline: '1363 / 112',
  },
  {
    id: 'scam-5',
    title: 'Unmetered Auto-Rickshaw "Broken Meter" Flat Fee Trap',
    category: 'transit',
    categoryLabel: 'Local Transit Dispute',
    location: 'Pan-India Metros (Delhi, Mumbai, Bengaluru, Agra)',
    severity: 'MODERATE',
    pitch: '"Meter is broken sir. ₹350 flat rate only." (For a 2 km journey worth ₹35)',
    reality: 'Drivers disable or hide meters to charge 8x-10x the regulated government fare.',
    countermove: 'State clearly: "Meter chalu kijiye ya traffic police bulao" (Turn on meter or I will summon traffic police). Open the Travelens Fare Calculator to show the official rate.',
    hotline: '1095',
  },
  {
    id: 'scam-6',
    title: 'Pushkar Sacred Thread / "Brahma Priest Blessing" Trap',
    category: 'spiritual',
    categoryLabel: 'Temple Donation Coercion',
    location: 'Pushkar Holy Lake (Ghats & Brahma Temple)',
    severity: 'HIGH',
    pitch: '"Hold these marigold flowers and repeat after me for your family blessing. Now you must donate ₹2,000 per family member for good karma."',
    reality: 'Aggressive fake priests (pandits) pressure tourists into handing over thousands of rupees.',
    countermove: 'Do not accept flowers, sacred threads, or prasad from strangers at the ghats. Say "No thank you" and keep walking.',
    hotline: '1363',
  },
];

export const ThreatDirectory: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeScam, setActiveScam] = useState<ScamEntry | null>(null);

  const filtered = SCAM_DATABASE.filter((s) => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch = 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.reality.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
          <ShieldAlert className="w-4 h-4 text-cyan-400" />
          <span>LAYER 03 REPOSITORY // VERIFIED THREAT &amp; SCAM INTELLIGENCE</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono uppercase tracking-tight">
          TOURIST SCAM &amp; FRAUD DIRECTORY
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Curated database of recurring scams in India, exact psychological bait, and verified AI countermeasures.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg shadow-black">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-cyan-400" />
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'ALL SCAMS' },
              { id: 'transit', label: 'TRANSIT & CABS' },
              { id: 'retail', label: 'RETAIL & GEMS' },
              { id: 'spiritual', label: 'TEMPLES & GHATS' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded text-xs font-mono transition border ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold'
                    : 'bg-slate-900/60 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search scam, city or keyword..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-white font-mono text-xs focus:border-cyan-400 outline-none"
          />
        </div>
      </div>

      {/* Scams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((scam) => (
          <div
            key={scam.id}
            onClick={() => setActiveScam(scam)}
            className="rounded-xl bg-slate-950/90 border border-cyan-500/30 p-5 shadow-xl shadow-black hover:border-cyan-400 transition cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                  scam.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                }`}>
                  {scam.severity}
                </span>
                <span className="text-[10px] font-mono text-cyan-400">{scam.categoryLabel}</span>
              </div>

              <div>
                <h3 className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition">
                  {scam.title}
                </h3>
                <div className="flex items-center gap-1 mt-1 text-[11px] font-mono text-slate-400">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{scam.location}</span>
                </div>
              </div>

              {/* The Bait */}
              <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5 text-xs text-rose-300 font-mono italic">
                {scam.pitch}
              </div>

              {/* The Reality */}
              <div className="text-xs text-slate-300 font-sans line-clamp-3">
                <strong className="text-cyan-300 font-mono text-[10px] block uppercase not-italic">REALITY:</strong>
                {scam.reality}
              </div>
            </div>

            <div className="pt-4 border-t border-cyan-500/15 flex items-center justify-between text-xs font-mono text-cyan-400 mt-4">
              <span>VIEW AI DEFENSE STEPS</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Intelligence Sheet for Active Selected Scam */}
      {activeScam && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-2xl bg-slate-950 border border-cyan-500/40 p-6 space-y-5 shadow-2xl shadow-cyan-950/50">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <span className="font-mono text-sm font-bold text-white uppercase">{activeScam.title}</span>
              </div>
              <button 
                onClick={() => setActiveScam(null)}
                className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-mono text-rose-400 font-bold uppercase block">THE FRAUDULENT PITCH (WHAT THEY SAY):</span>
                <p className="mt-1 p-3 rounded bg-rose-950/20 border border-rose-500/30 text-xs font-mono text-rose-200 italic">
                  {activeScam.pitch}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block">THE HIDDEN REALITY:</span>
                <p className="mt-1 text-xs text-slate-300 font-sans leading-relaxed">
                  {activeScam.reality}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 space-y-2">
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  TRAVELENS AI DEFENSE PROTOCOL (EXACT WORDS &amp; ACTIONS):
                </span>
                <p className="text-xs text-cyan-100 font-sans leading-relaxed">
                  {activeScam.countermove}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-cyan-500/20 text-xs font-mono">
                <span className="text-slate-400">EMERGENCY ESCALATION HOTLINE:</span>
                <span className="text-rose-400 font-bold">{activeScam.hotline}</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveScam(null)}
                className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold uppercase transition"
              >
                UNDERSTOOD
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
