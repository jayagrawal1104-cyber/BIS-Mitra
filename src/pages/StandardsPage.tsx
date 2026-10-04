import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockStandards } from '../data/mockData';
import type { Standard } from '../data/mockData';
import EvidenceBadge from '../components/EvidenceBadge';

const CATEGORIES = ['All', 'Household Products', 'Metals & Alloys', 'Electrical & Electronics', 'Electrical Appliances', 'Food Safety', 'Water & Environment'];
const STATUSES = ['All', 'Active', 'Under Revision', 'Withdrawn'];

export default function StandardsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [certification, setCertification] = useState<'All' | 'Required' | 'Optional'>('All');
  const [step, setStep] = useState(0); // finder step
  const [finderMode, setFinderMode] = useState(false);

  const filtered = mockStandards.filter(s => {
    const matchQ = !query || s.title.toLowerCase().includes(query.toLowerCase()) || s.number.toLowerCase().includes(query.toLowerCase()) || s.category.toLowerCase().includes(query.toLowerCase());
    const matchCat = category === 'All' || s.category === category;
    const matchStatus = status === 'All' || s.status === status;
    const matchCert = certification === 'All' || (certification === 'Required' ? s.certificationRequired : !s.certificationRequired);
    return matchQ && matchCat && matchStatus && matchCert;
  });

  useEffect(() => {
    if (query) setSearchParams({ q: query });
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Find Standards</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0D1B2A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Standards Intelligence
        </h1>
        <p className="text-slate-500 mt-1">Discover potentially relevant Indian Standards using semantic search and guided filtering.</p>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFinderMode(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!finderMode ? 'bg-[#0D1B2A] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          Search
        </button>
        <button
          onClick={() => setFinderMode(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${finderMode ? 'bg-[#0D1B2A] text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
        >
          Smart Finder
        </button>
        <Link
          to="/compare"
          className="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          Compare Standards
        </Link>
      </div>

      {finderMode ? (
        <SmartFinder />
      ) : (
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-800 mb-4 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>Filters</h3>

              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Category</label>
                <div className="space-y-1">
                  {CATEGORIES.map(c => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${category === c ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Status</label>
                <div className="space-y-1">
                  {STATUSES.map(s => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${status === s ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Certification</label>
                <div className="space-y-1">
                  {(['All', 'Required', 'Optional'] as const).map(c => (
                    <button
                      key={c}
                      onClick={() => setCertification(c)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${certification === c ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search */}
            <div className="relative">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13 13L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by product, standard number, or description…"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-slate-500">
              <span>{filtered.length} standard{filtered.length !== 1 ? 's' : ''} found</span>
              <span className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1 rounded-full">
                AI-assisted matching · Placeholder data
              </span>
            </div>

            {filtered.length === 0 ? (
              <EmptyState query={query} />
            ) : (
              filtered.map((std, i) => (
                <StandardCard key={std.id} standard={std} delay={i * 0.06} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StandardCard({ standard, delay }: { standard: Standard; delay: number }) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 p-5 card-hover animate-fade-in-up"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <span className="font-mono font-bold text-sm text-[#0D1B2A]">{standard.number}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              standard.status === 'Active' ? 'bg-green-100 text-green-700' :
              standard.status === 'Under Revision' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-600'
            }`}>
              {standard.status}
            </span>
            {standard.certificationRequired && (
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">
                BIS Certification Required
              </span>
            )}
          </div>
          <h3 className="font-semibold text-slate-800 text-base leading-snug">{standard.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{standard.category}</p>
        </div>
        <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium border ${
          standard.relevance === 'High' ? 'bg-green-50 text-green-700 border-green-200' :
          standard.relevance === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
          'bg-slate-50 text-slate-600 border-slate-200'
        }`}>
          {standard.relevance} Relevance
        </span>
      </div>

      <p className="text-sm text-slate-600 mb-4 leading-relaxed">{standard.scope}</p>

      {/* Evidence coverage bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-1000"
            style={{ width: `${standard.evidenceCoverage}%` }}
          />
        </div>
        <span className="text-xs text-slate-500 shrink-0">Evidence: {standard.evidenceCoverage}%</span>
      </div>

      {/* Related */}
      {standard.relatedStandards.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="text-xs text-slate-500">Related:</span>
          {standard.relatedStandards.map(r => (
            <span key={r} className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{r}</span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        <Link
          to={`/standards/${standard.id}`}
          className="px-4 py-1.5 bg-[#0D1B2A] text-white text-xs rounded-lg font-semibold hover:bg-[#132338] transition-colors"
        >
          View Details
        </Link>
        <Link
          to={`/ask?q=Tell me about ${standard.number}`}
          className="px-4 py-1.5 border border-slate-200 text-slate-600 text-xs rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          Ask AI
        </Link>
        <Link
          to="/certification"
          className="px-4 py-1.5 border border-slate-200 text-slate-600 text-xs rounded-lg font-medium hover:bg-slate-50 transition-colors"
        >
          Certification Guide
        </Link>
        <button className="ml-auto px-3 py-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8a5 5 0 11-10 0 5 5 0 0110 0zM8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function SmartFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    { id: 'product', label: 'Describe your product', placeholder: 'e.g., stainless steel water bottle, LED lamp, bicycle helmet…', type: 'text' },
    { id: 'category', label: 'Product category', options: ['Household Products', 'Electrical & Electronics', 'Food & Beverages', 'Textiles', 'Construction Materials', 'Automotive', 'Medical Devices', 'Chemicals', 'Other'] },
    { id: 'material', label: 'Primary material', options: ['Stainless Steel', 'Aluminium', 'Plastic / Polymer', 'Glass', 'Textile / Fabric', 'Wood', 'Ceramic', 'Electronic / PCB', 'Mixed', 'Other'] },
    { id: 'use', label: 'Intended use', options: ['Domestic / Consumer', 'Commercial / Industrial', 'Food Contact', 'Drinking Water Contact', 'Electrical / Electronic', 'Medical / Healthcare', 'Construction', 'Export'] },
    { id: 'origin', label: 'Manufacturing origin', options: ['Made in India', 'Imported', 'Not sure'] },
  ];

  const handleNext = (val: string) => {
    setAnswers(prev => ({ ...prev, [questions[step].id]: val }));
    if (step < questions.length - 1) setStep(s => s + 1);
    else setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-[#0D1B2A] text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Potentially Relevant Standards
          </h3>
          <button onClick={() => { setStep(0); setAnswers({}); setShowResults(false); }} className="text-sm text-blue-600 hover:text-blue-800">
            Start Over
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5 text-sm text-blue-800">
          Based on: <strong>{answers.product}</strong> · {answers.category} · {answers.material} · {answers.use}
        </div>

        <div className="space-y-4">
          {mockStandards.slice(0, 3).map((std, i) => (
            <StandardCard key={std.id} standard={std} delay={i * 0.1} />
          ))}
        </div>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${i <= step ? 'bg-[#1A56DB]' : 'bg-slate-200'}`}
            />
          ))}
        </div>

        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Step {step + 1} of {questions.length}
        </div>
        <h3 className="text-xl font-bold text-[#0D1B2A] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
          {q.label}
        </h3>

        {q.type === 'text' ? (
          <TextStep placeholder={q.placeholder!} onNext={handleNext} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {q.options!.map(opt => (
              <button
                key={opt}
                onClick={() => handleNext(opt)}
                className="p-4 rounded-xl border border-slate-200 text-sm text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all text-left font-medium"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TextStep({ placeholder, onNext }: { placeholder: string; onNext: (v: string) => void }) {
  const [val, setVal] = useState('');
  return (
    <div>
      <input
        autoFocus
        value={val}
        onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && val.trim() && onNext(val)}
        placeholder={placeholder}
        className="w-full px-5 py-3.5 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all mb-4"
      />
      <button
        onClick={() => val.trim() && onNext(val)}
        disabled={!val.trim()}
        className="px-6 py-2.5 bg-[#1A56DB] text-white rounded-xl text-sm font-semibold hover:bg-[#1440A0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Continue →
      </button>
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
      <div className="text-4xl mb-4">🔍</div>
      <h3 className="font-bold text-slate-700 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>No standards found</h3>
      <p className="text-slate-500 text-sm mb-4">
        No standards matched "{query}" in the current demo dataset.
      </p>
      <p className="text-xs text-slate-400">
        The production system would search across 22,000+ Indian Standards.
      </p>
    </div>
  );
}
