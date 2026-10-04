import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { quickActions, mockEvidenceSources } from '../data/mockData';
import { EvidenceCoverageBar } from '../components/EvidenceBadge';
import EvidenceDrawer from '../components/EvidenceDrawer';

const DEMO_STEPS = [
  { label: 'Understanding your product...', duration: 900 },
  { label: 'Searching relevant standards...', duration: 1000 },
  { label: 'Checking source evidence...', duration: 900 },
  { label: 'Preparing answer...', duration: 700 },
];

const colorMap: Record<string, string> = {
  blue: 'bg-blue-50 border-blue-200 text-blue-700',
  navy: 'bg-[#0D1B2A]/5 border-[#0D1B2A]/20 text-[#0D1B2A]',
  purple: 'bg-purple-50 border-purple-200 text-purple-700',
  green: 'bg-green-50 border-green-200 text-green-700',
  teal: 'bg-teal-50 border-teal-200 text-teal-700',
  saffron: 'bg-yellow-50 border-yellow-200 text-yellow-700',
};

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [demoState, setDemoState] = useState<'idle' | 'running' | 'done'>('idle');
  const [demoStep, setDemoStep] = useState(0);
  const [showDemoResult, setShowDemoResult] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const runDemo = () => {
    setDemoState('running');
    setDemoStep(0);
    setShowDemoResult(false);

    let step = 0;
    let totalDelay = 0;

    DEMO_STEPS.forEach((s, i) => {
      setTimeout(() => {
        setDemoStep(i);
      }, totalDelay);
      totalDelay += s.duration;
    });

    setTimeout(() => {
      setDemoState('done');
      setShowDemoResult(true);
    }, totalDelay + 300);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/ask?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative bg-[#0D1B2A] overflow-hidden">
        {/* Subtle geometric background */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-400 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-600 blur-3xl" />
        </div>

        {/* India accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F59E0B] via-white to-[#16A34A] opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-medium bg-white/10 text-blue-300 border border-white/20 px-4 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              Smart India Hackathon 2026 · Problem SIH26107
            </span>
          </div>

          {/* Headline */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Understand Indian Standards.
              <br />
              <span className="text-[#60A5FA]">Get Certified with Confidence.</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              An AI-powered, evidence-first assistant for Indian Standards, BIS certification,
              testing and compliance — for manufacturers, MSMEs, startups, and importers.
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-3xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                <div className="flex items-center gap-3 px-5 py-4">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-slate-400 shrink-0">
                    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Describe your product, upload a document, or ask a BIS question…"
                    className="flex-1 text-slate-800 placeholder-slate-400 outline-none text-base"
                  />
                  <div className="flex items-center gap-2 shrink-0">
                    <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors" title="Voice input">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="6.5" y="1" width="5" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M3 9C3 12.3 5.7 15 9 15s6-2.7 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M9 15v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <button type="button" className="p-2 text-slate-400 hover:text-slate-600 transition-colors" title="Upload document">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3 12v3h12v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M9 2v9M6 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#1A56DB] text-white rounded-xl text-sm font-semibold hover:bg-[#1440A0] transition-colors"
                    >
                      Ask AI
                    </button>
                  </div>
                </div>
                {/* Suggested questions */}
                <div className="border-t border-slate-100 px-5 py-3 flex flex-wrap gap-2">
                  {[
                    'What standard applies to my product?',
                    'Is BIS certification mandatory?',
                    'Which lab can test my product?',
                    'Analyze my tender specification',
                  ].map(q => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => navigate(`/ask?q=${encodeURIComponent(q)}`)}
                      className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Link
              to="/ask"
              className="px-8 py-3 bg-[#1A56DB] text-white rounded-xl font-semibold text-base hover:bg-[#1440A0] transition-all hover:shadow-lg hover:shadow-blue-900/30"
            >
              Ask BIS Mitra
            </Link>
            <Link
              to="/standards"
              className="px-8 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-semibold text-base hover:bg-white/15 transition-colors"
            >
              Find a Standard
            </Link>
          </div>

          {/* Trust stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { value: '22,000+', label: 'Indian Standards' },
              { value: 'Evidence', label: 'Backed Answers' },
              { value: 'Real-time', label: 'AI Analysis' },
              { value: 'MSME', label: 'First Platform' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-blue-600 tracking-widest uppercase">The Process</span>
            <h2 className="text-3xl font-extrabold text-[#0D1B2A] mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              How BIS Mitra Works
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              From a question to evidence-backed, actionable compliance intelligence in four steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'ASK',
                desc: 'Describe your product or upload a document. Ask in plain language.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="12" fill="#DBEAFE"/>
                    <path d="M10 14h8M14 10v8" stroke="#1A56DB" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                ),
                color: 'bg-blue-50 border-blue-100',
              },
              {
                step: '02',
                title: 'MATCH',
                desc: 'AI identifies potentially relevant standards, requirements and certification pathways.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="12" fill="#EDE9FE"/>
                    <circle cx="11" cy="13" r="4" stroke="#7C3AED" strokeWidth="1.8"/>
                    <path d="M17 13h4M19 11v4" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                ),
                color: 'bg-purple-50 border-purple-100',
              },
              {
                step: '03',
                title: 'VERIFY',
                desc: 'Every important answer is connected to authoritative source evidence.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="12" fill="#DCFCE7"/>
                    <path d="M10 14l3 3 5-5" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                color: 'bg-green-50 border-green-100',
              },
              {
                step: '04',
                title: 'ACT',
                desc: 'Move directly to certification steps, testing labs, and compliance checklists.',
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <circle cx="14" cy="14" r="12" fill="#FEF3C7"/>
                    <path d="M10 14h8M15 11l3 3-3 3" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                color: 'bg-yellow-50 border-yellow-100',
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className={`relative p-6 rounded-2xl border ${item.color} animate-fade-in-up`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  {item.icon}
                  <span className="text-4xl font-black text-slate-200" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                {i < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 text-xl">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INTERACTIVE AI DEMO ─── */}
      <section ref={demoRef} className="bg-slate-50 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-blue-600 tracking-widest uppercase">Live Demo</span>
            <h2 className="text-3xl font-extrabold text-[#0D1B2A] mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              See BIS Mitra in Action
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
              {/* Chat header */}
              <div className="bg-[#0D1B2A] px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1A56DB] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">BIS Mitra AI</div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-slate-400 text-xs">Evidence-backed responses</span>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-[#1A56DB] text-white text-sm rounded-2xl rounded-tr-sm px-5 py-3 max-w-md shadow-sm">
                    I manufacture stainless steel water bottles. Which BIS standard should I follow?
                  </div>
                </div>

                {/* Processing or result */}
                {demoState === 'idle' && (
                  <div className="flex justify-center">
                    <button
                      onClick={runDemo}
                      className="px-6 py-3 bg-[#0D1B2A] text-white rounded-xl font-semibold text-sm hover:bg-[#132338] transition-colors flex items-center gap-2"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <polygon points="4,2 14,8 4,14" fill="currentColor"/>
                      </svg>
                      Run Demo Analysis
                    </button>
                  </div>
                )}

                {demoState === 'running' && (
                  <div className="bg-slate-50 rounded-2xl rounded-tl-sm p-5 max-w-xl animate-fade-in border border-slate-200">
                    <div className="space-y-3">
                      {DEMO_STEPS.map((step, i) => (
                        <div key={i} className={`flex items-center gap-3 transition-all duration-300 ${i <= demoStep ? 'opacity-100' : 'opacity-30'}`}>
                          {i < demoStep ? (
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2.5 5L4 6.5 7.5 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          ) : i === demoStep ? (
                            <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin shrink-0" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                          )}
                          <span className={`text-sm ${i === demoStep ? 'text-blue-700 font-medium' : i < demoStep ? 'text-green-700' : 'text-slate-400'}`}>
                            {step.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {showDemoResult && (
                  <div className="bg-slate-50 rounded-2xl rounded-tl-sm max-w-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
                    {/* AI Answer */}
                    <div className="p-5 space-y-4">
                      {/* Product understanding */}
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Product Understanding</div>
                        <div className="flex items-center gap-3">
                          <div className="px-3 py-1.5 bg-[#0D1B2A] text-white text-sm rounded-lg font-medium">Stainless Steel Water Bottle</div>
                          <span className="text-xs text-slate-500">→ Household Utensils / Food Contact</span>
                        </div>
                      </div>

                      {/* Standards */}
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Potentially Relevant Standards</div>
                        <div className="space-y-2">
                          {[
                            { num: 'IS XXXXX', title: 'Stainless Steel Utensils and Cookware', relevance: 'High', note: 'Directly covers stainless steel vessels for food and beverage use' },
                            { num: 'IS YYYYY', title: 'Wrought Stainless Steels — Material Spec', relevance: 'Medium', note: 'Material grade requirements for stainless steel products' },
                          ].map(s => (
                            <div key={s.num} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-200">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-[#0D1B2A]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{s.num}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.relevance === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {s.relevance} Relevance
                                  </span>
                                </div>
                                <div className="text-xs text-slate-600 mt-0.5">{s.title}</div>
                                <div className="text-xs text-slate-500 mt-1 italic">{s.note}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Evidence coverage */}
                      <EvidenceCoverageBar percentage={88} verified={4} partial={1} insufficient={0} />

                      {/* View evidence + disclaimer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                            ✓ Evidence-backed response
                          </span>
                        </div>
                        <button
                          onClick={() => setEvidenceOpen(true)}
                          className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                        >
                          View Evidence →
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t border-slate-200 px-5 py-3 bg-white flex flex-wrap gap-2">
                      <Link to="/standards/std-1" className="text-xs px-3 py-1.5 bg-[#1A56DB] text-white rounded-lg font-medium hover:bg-[#1440A0] transition-colors">
                        View Standard Details
                      </Link>
                      <Link to="/certification" className="text-xs px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                        Certification Guide
                      </Link>
                      <Link to="/laboratories" className="text-xs px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg font-medium hover:bg-slate-50 transition-colors">
                        Find Testing Lab
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── QUICK ACTIONS ─── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-blue-600 tracking-widest uppercase">Get Started</span>
            <h2 className="text-3xl font-extrabold text-[#0D1B2A] mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              What would you like to do?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quickActions.map((action, i) => (
              <Link
                key={action.id}
                to={action.path}
                className={`group p-6 rounded-2xl border card-hover animate-fade-in-up ${colorMap[action.color]} relative overflow-hidden`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="text-3xl mb-4">{action.icon}</div>
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>{action.title}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{action.description}</p>
                <div className="mt-4 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY BIS MITRA ─── */}
      <section className="bg-[#0D1B2A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-blue-400 tracking-widest uppercase">Differentiators</span>
            <h2 className="text-3xl font-extrabold text-white mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Why BIS Mitra?
            </h2>
            <p className="text-slate-400 mt-3 max-w-xl mx-auto">
              This is not a chatbot. BIS Mitra connects questions to standards, evidence, certification, testing, and action.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: '🔍',
                title: 'UNDERSTAND',
                desc: 'Complex BIS information explained in plain language, personalized to your role and context.',
                accent: 'border-blue-800',
              },
              {
                icon: '🗺️',
                title: 'DISCOVER',
                desc: 'Semantic discovery of relevant standards — not just keyword search, but understanding product relationships.',
                accent: 'border-purple-800',
              },
              {
                icon: '✅',
                title: 'VERIFY',
                desc: 'Every important answer links to source evidence. See the document, page, section, and excerpt.',
                accent: 'border-green-800',
              },
              {
                icon: '📄',
                title: 'ANALYZE',
                desc: 'Upload tender documents, specifications, and procurement documents for instant compliance analysis.',
                accent: 'border-yellow-800',
              },
              {
                icon: '🔬',
                title: 'CONNECT',
                desc: 'From standards discovery to testing laboratories and certification pathways in one workflow.',
                accent: 'border-teal-800',
              },
              {
                icon: '⚡',
                title: 'ACT',
                desc: 'Turn information into a structured compliance checklist with required documents and next steps.',
                accent: 'border-orange-800',
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`p-6 rounded-2xl bg-white/5 border ${item.accent} hover:bg-white/8 transition-colors animate-fade-in-up`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white text-base mb-2 tracking-wider" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AI TRANSPARENCY ─── */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-semibold text-blue-600 tracking-widest uppercase">Evidence System</span>
              <h2 className="text-3xl font-extrabold text-[#0D1B2A] mt-2 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
                AI answers. Evidence proves.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                BIS Mitra connects every important AI claim to authoritative source documents.
                When evidence is unavailable, the platform says so — clearly and honestly.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: '🟢',
                    title: 'VERIFIED',
                    desc: 'Information supported by authoritative evidence from BIS publications, Quality Control Orders, and official standards.',
                    bg: 'bg-green-50 border-green-200',
                  },
                  {
                    icon: '🟡',
                    title: 'PARTIALLY VERIFIED',
                    desc: 'Some supporting evidence exists. Additional verification from official sources is recommended.',
                    bg: 'bg-yellow-50 border-yellow-200',
                  },
                  {
                    icon: '🔴',
                    title: 'INSUFFICIENT EVIDENCE',
                    desc: 'The system cannot verify this information. The AI will clearly state this rather than guessing.',
                    bg: 'bg-red-50 border-red-200',
                  },
                ].map(item => (
                  <div key={item.title} className={`flex items-start gap-4 p-4 rounded-xl border ${item.bg}`}>
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-slate-800 mb-1">{item.title}</div>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Evidence coverage demo card */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-800" style={{ fontFamily: 'Manrope, sans-serif' }}>Sample Answer Analysis</h3>
                  <span className="text-xs text-slate-500">Stainless steel bottles query</span>
                </div>
                <EvidenceCoverageBar percentage={88} verified={8} partial={1} insufficient={1} />

                <div className="space-y-2">
                  {[
                    { claim: 'IS XXXXX applies to stainless steel utensils', status: 'verified' },
                    { claim: 'BIS certification is mandatory for this product', status: 'verified' },
                    { claim: 'Testing must be at BIS-recognized laboratory', status: 'verified' },
                    { claim: 'Migration limits apply for food contact', status: 'partial' },
                    { claim: 'Specific grade requirements may vary by design', status: 'insufficient' },
                  ].map((c, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-slate-200 text-sm">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${c.status === 'verified' ? 'bg-green-500' : c.status === 'partial' ? 'bg-yellow-400' : 'bg-red-400'}`} />
                      <span className="text-slate-700 flex-1">{c.claim}</span>
                      <button className="text-xs text-blue-600 hover:text-blue-800 shrink-0">View →</button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setEvidenceOpen(true)}
                  className="w-full py-2.5 bg-[#0D1B2A] text-white rounded-xl text-sm font-semibold hover:bg-[#132338] transition-colors"
                >
                  View Evidence Sources →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TARGET USERS ─── */}
      <section className="bg-slate-50 py-20 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-blue-600 tracking-widest uppercase">For Everyone</span>
            <h2 className="text-3xl font-extrabold text-[#0D1B2A] mt-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Built for India's Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '🏭', label: 'Manufacturers', desc: 'Certification & quality compliance' },
              { icon: '🏪', label: 'MSMEs', desc: 'Simple guides for small business' },
              { icon: '🚀', label: 'Startups', desc: 'First-time certification support' },
              { icon: '🚢', label: 'Importers', desc: 'Mandatory certification checks' },
              { icon: '🛍️', label: 'Consumers', desc: 'Hallmarking and product safety' },
              { icon: '📋', label: 'Procurement', desc: 'Tender standards analysis' },
              { icon: '🔬', label: 'Researchers', desc: 'Standards intelligence' },
              { icon: '🎓', label: 'Students', desc: 'Learning and reference' },
            ].map(u => (
              <Link
                to="/onboarding"
                key={u.label}
                className="bg-white rounded-2xl border border-slate-200 p-5 text-center hover:border-blue-300 hover:shadow-md transition-all card-hover"
              >
                <div className="text-3xl mb-3">{u.icon}</div>
                <div className="font-semibold text-sm text-slate-800 mb-1">{u.label}</div>
                <div className="text-xs text-slate-500">{u.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="bg-gradient-to-br from-[#0D1B2A] to-[#1440A0] py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Ask. Understand. Verify. Act.
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            From standards discovery to evidence-backed compliance intelligence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/ask"
              className="px-8 py-3.5 bg-white text-[#0D1B2A] rounded-xl font-bold text-base hover:bg-blue-50 transition-colors"
            >
              Ask BIS Mitra
            </Link>
            <Link
              to="/tender-analyzer"
              className="px-8 py-3.5 bg-white/10 text-white border border-white/20 rounded-xl font-semibold text-base hover:bg-white/15 transition-colors"
            >
              Try Tender Analyzer
            </Link>
          </div>
          <p className="text-blue-300/60 text-xs mt-8">
            BIS Mitra is an AI research assistant. Not an official Bureau of Indian Standards service.
          </p>
        </div>
      </section>

      <EvidenceDrawer
        open={evidenceOpen}
        onClose={() => setEvidenceOpen(false)}
        sources={mockEvidenceSources}
        title="Stainless Steel Water Bottle Query"
      />
    </div>
  );
}
