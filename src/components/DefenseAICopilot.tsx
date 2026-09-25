import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  ShieldAlert, 
  AlertTriangle, 
  PhoneCall, 
  CheckCircle2, 
  Compass, 
  Volume2, 
  RefreshCw, 
  HelpCircle, 
  Zap, 
  Languages, 
  Terminal
} from 'lucide-react';
import { HELP_SCENARIOS } from '../data/mockData';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  verifiedBadges?: string[];
  immediateSteps?: string[];
  helpline?: { label: string; number: string };
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    sender: 'assistant',
    text: 'TRAVELENS AI DEFENSE COPILOT INITIALIZED. I am your real-time risk intelligence assistant for India. I can verify suspicious transit claims, calculate legal taxi rates, decode Hindi bus/train notices, and initiate emergency protocols. What situation are you encountering?',
    timestamp: 'JUST NOW',
    verifiedBadges: ['Zero-Trust Filter', 'Ministry of Tourism Grounded', 'IRCTC Linked'],
  },
];

const PRESET_QUERIES = [
  {
    label: 'Verify New Delhi Station Touts',
    query: 'A person in uniform outside New Delhi station said my train was canceled and I must book an alternate cab. Is this true?',
    category: 'Scam Detection',
  },
  {
    label: 'Airport Taxi Fare Dispute',
    query: 'Prepaid taxi driver at Delhi Airport T3 is demanding ₹1,500 extra for "night curfew tax". What are my legal rights?',
    category: 'Price Anomaly',
  },
  {
    label: 'Lost Luggage on Train',
    query: 'I left my backpack with passport and electronics on train coach B3. How do I initiate RPF Operation Amanat immediately?',
    category: 'Emergency Asset',
  },
  {
    label: 'Foreigner UPI Payment Setup',
    query: 'How do international tourists use PhonePe or Google Pay QR codes without an Indian bank account?',
    category: 'Financial Help',
  },
];

export const DefenseAICopilot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // AI Response generation (Simulated edge defense intelligence with authentic Indian travel regulations)
    setTimeout(() => {
      let responseText = '';
      let immediateSteps: string[] = [];
      let helpline: { label: string; number: string } | undefined = undefined;

      const lower = query.toLowerCase();

      if (lower.includes('canceled') || lower.includes('cancelled') || lower.includes('tout') || lower.includes('new delhi station')) {
        responseText = 'CRITICAL ADVISORY: THIS IS THE CLASSIC "PAHARGANJ FAKE BOOKING OFFICE SCAM". Indian Railways NEVER cancels trains without an official SMS to your booking mobile and live update on the IRCTC app / NTES portal. Do NOT follow anyone to a private travel agency outside the station.';
        immediateSteps = [
          'Ignore the person completely, regardless of ID badge or uniform.',
          'Walk straight to Platform 1 First Floor (Paharganj side) to the official "International Tourist Bureau".',
          'Check your train live running status on official app (Where is My Train / NTES) or dial Railway Helpline 139.',
          'Station gates are NEVER closed to confirmed ticket holders.',
        ];
        helpline = { label: 'Railway Security & Fraud Desk', number: '139' };
      } else if (lower.includes('taxi') || lower.includes('fare') || lower.includes('curfew') || lower.includes('airport')) {
        responseText = 'ILLEGAL SURCHARGE DETECTED: There is NO such thing as a "night curfew tax" or "hotel entry surcharge" in Delhi NCR. If you paid at the official Delhi Police Pre-Paid Booth inside the airport arrival terminal, that receipt covers the full trip.';
        immediateSteps = [
          'Show the official counter receipt. Do not pay any extra cash to the driver.',
          'If the driver refuses to drive, approach the nearest Delhi Traffic Police booth outside the terminal.',
          'Take a clear photograph of the yellow vehicle license plate.',
          'Alternatively, cancel and book via Uber or Ola pickup zones on Level 2 (Multi-Level Car Parking).',
        ];
        helpline = { label: 'Delhi Traffic Police Helpline', number: '1095' };
      } else if (lower.includes('passport') || lower.includes('bag') || lower.includes('lost') || lower.includes('train')) {
        responseText = 'EMERGENCY PROTOCOL ACTIVATED: Under Indian Railways "Operation Amanat", the Railway Protection Force (RPF) secures unattended luggage with high recovery efficiency.';
        immediateSteps = [
          'Locate the RPF post on Platform 1 or call Railway Security on 139.',
          'Provide your PNR Number, Coach Number (e.g. B3), Berth Number, and description of the bag.',
          'The station master will radio the running Train Ticket Examiner (TTE) to lock your compartment.',
          'Your belongings will be safeguarded and handed over at the next junction under signed inventory.',
        ];
        helpline = { label: 'RPF Emergency Security', number: '139' };
      } else if (lower.includes('upi') || lower.includes('pay') || lower.includes('foreign')) {
        responseText = 'FOREIGN TOURIST DIGITAL PAYMENT: Reserve Bank of India (RBI) permits international passport holders to use "UPI One World" wallets at international airports (Delhi, Bengaluru, Mumbai).';
        immediateSteps = [
          'Download authorized tourist UPI apps such as "Cheq UPI" or visit the Forex desk at IGI Airport.',
          'Complete quick passport verification and top up with foreign credit/debit cards.',
          'Scan any Indian QR code (merchant PhonePe, Paytm, BharatPe) with 0% cash friction.',
          'Keep ₹500–₹1,000 cash in ₹50/₹100 bills as rural fallback.',
        ];
        helpline = { label: 'Tourist Multilingual Desk', number: '1363' };
      } else {
        responseText = `ASSESSMENT COMPLETE: Your query has been parsed against the Indian Tourist Safety Code. Stay vigilant with unsolicited guides, always negotiate auto-rickshaw fares or insist on meter, and use official tourist desks (1363) whenever in doubt.`;
        immediateSteps = [
          'Verify official state tourism approval badges (UP Tourism / RTDC / Delhi Tourism).',
          'Use official prepaid counters at railway stations and bus hubs.',
          'Keep emergency contact and GPS location sharing enabled on your device.',
        ];
        helpline = { label: 'National Emergency Unified Number', number: '112' };
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verifiedBadges: ['Verified AI Rule', 'Real-time Legal Shield'],
        immediateSteps,
        helpline,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-cyan-500/20">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
          <Bot className="w-4 h-4 text-cyan-400" />
          <span>LAYER 03 COGNITIVE // REAL-TIME TOURISM CRISIS RESOLUTION</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-mono uppercase tracking-tight">
          TRAVELENS DEFENSE AI COPILOT
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Ask any question regarding travel scams, transit disputes, train disruptions, or safety protocols in India.
        </p>
      </div>

      {/* Preset Crisis Prompts Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {PRESET_QUERIES.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(preset.query)}
            className="p-3 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-cyan-500/20 hover:border-cyan-400 text-left transition group shadow-md"
          >
            <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400 mb-1">
              <span>{preset.category}</span>
              <Zap className="w-3 h-3 text-amber-400 group-hover:scale-110 transition" />
            </div>
            <div className="text-xs font-mono font-semibold text-slate-200 group-hover:text-white line-clamp-2">
              {preset.label}
            </div>
          </button>
        ))}
      </div>

      {/* Chat Terminal Box */}
      <div className="rounded-xl bg-slate-950/90 border border-cyan-500/30 overflow-hidden shadow-2xl shadow-black flex flex-col h-[520px]">
        
        {/* Terminal Header */}
        <div className="px-4 py-3 bg-[#030712] border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-300 font-bold tracking-wider uppercase">
              DEFENSE_COPILOT_SESSION // SECURE ENCRYPTED CHANNEL
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
            <span>MODEL: GEMINI-3.8-DEFENSE</span>
            <span className="hidden sm:inline text-emerald-400 font-semibold">100% OFFLINE CACHED</span>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 text-[9px] text-slate-500">
                <span>{msg.sender === 'user' ? 'TRAVELER' : 'TRAVELENS AI DEFENSE'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-xl p-3.5 space-y-2.5 ${
                  msg.sender === 'user'
                    ? 'bg-cyan-600/20 border border-cyan-500/40 text-cyan-100 rounded-tr-none'
                    : 'bg-slate-900/90 border border-cyan-500/25 text-slate-200 rounded-tl-none shadow-lg'
                }`}
              >
                <div className="leading-relaxed font-sans sm:font-mono text-xs sm:text-xs">
                  {msg.text}
                </div>

                {/* Immediate Step-by-Step Action List */}
                {msg.immediateSteps && msg.immediateSteps.length > 0 && (
                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    <span className="text-[10px] text-cyan-300 font-bold uppercase block">
                      IMMEDIATE ACTION PROTOCOL:
                    </span>
                    {msg.immediateSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Direct Emergency Hotline Dial Card */}
                {msg.helpline && (
                  <div className="mt-2 pt-2 border-t border-rose-500/30 flex items-center justify-between p-2 rounded bg-rose-950/40 border border-rose-500/30">
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                      <span className="text-[10px] text-rose-200 font-bold">{msg.helpline.label}</span>
                    </div>
                    <a 
                      href={`tel:${msg.helpline.number}`}
                      className="px-2 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition"
                    >
                      DIAL {msg.helpline.number}
                    </a>
                  </div>
                )}

                {/* Verified Rule Badges */}
                {msg.verifiedBadges && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.verifiedBadges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-950 border border-cyan-500/30 text-cyan-300"
                      >
                        ✓ {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>TRAVELENS AI ANALYZING THREAT SIGNATURES...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Form Bar */}
        <div className="p-3 bg-[#030712] border-t border-cyan-500/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe situation (e.g. taxi refusing meter at airport, person claiming train is cancelled)..."
              className="flex-1 px-4 py-2.5 rounded-lg bg-slate-900 border border-cyan-500/30 text-white font-mono text-xs focus:border-cyan-400 outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-mono text-xs font-bold tracking-wider uppercase transition flex items-center gap-1.5"
            >
              <span>SEND</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
