import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockLaboratories } from '../data/mockData';

export default function LaboratoriesPage() {
  const [query, setQuery] = useState('');
  const [state, setState] = useState('All');
  const [type, setType] = useState<'All' | 'Government' | 'Private' | 'University'>('All');

  const filtered = mockLaboratories.filter(l => {
    const matchQ = !query || l.name.toLowerCase().includes(query.toLowerCase()) || l.capabilities.some(c => c.toLowerCase().includes(query.toLowerCase()));
    const matchState = state === 'All' || l.state === state;
    const matchType = type === 'All' || l.type === type;
    return matchQ && matchState && matchType;
  });

  const states = ['All', ...Array.from(new Set(mockLaboratories.map(l => l.state)))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Testing Laboratories</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0D1B2A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Find Testing Laboratory
        </h1>
        <p className="text-slate-500 mt-1">
          Discover NABL-accredited and BIS-recognized testing laboratories. Data shown is for demonstration purposes.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1 space-y-5">
          {/* Search */}
          <div className="relative">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11.5 11.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by name or capability…"
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">State</label>
              <div className="space-y-1">
                {states.map(s => (
                  <button
                    key={s}
                    onClick={() => setState(s)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${state === s ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Type</label>
              <div className="space-y-1">
                {(['All', 'Government', 'Private', 'University'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${type === t ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-xs text-yellow-800">
            <strong>Note:</strong> Laboratory data shown is for demonstration. In production, this connects to verified BIS and NABL directories.
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="text-sm text-slate-500">{filtered.length} laboratories found</div>

          {filtered.map((lab, i) => (
            <div
              key={lab.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-slate-800 text-base" style={{ fontFamily: 'Manrope, sans-serif' }}>{lab.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      lab.type === 'Government' ? 'bg-blue-100 text-blue-700' :
                      lab.type === 'Private' ? 'bg-purple-100 text-purple-700' :
                      'bg-teal-100 text-teal-700'
                    }`}>
                      {lab.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1C5 1 3 2.8 3 5c0 3 4 8 4 8s4-5 4-8c0-2.2-2-4-4-4z" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="7" cy="5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    {lab.location}, {lab.city}, {lab.state}
                  </div>
                </div>
                <span className="shrink-0 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium border border-green-200">
                  {lab.accreditation}
                </span>
              </div>

              {/* Capabilities */}
              <div className="mb-3">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Testing Capabilities</div>
                <div className="flex flex-wrap gap-1.5">
                  {lab.capabilities.map(c => (
                    <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{c}</span>
                  ))}
                </div>
              </div>

              {/* Relevant standards */}
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Relevant Standards</div>
                <div className="flex flex-wrap gap-1.5">
                  {lab.standards.map(s => (
                    <span key={s} className="text-xs font-mono bg-blue-50 text-blue-700 px-2.5 py-1 rounded border border-blue-200">{s}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  to="/ask"
                  className="px-4 py-1.5 bg-[#0D1B2A] text-white text-xs rounded-lg font-semibold hover:bg-[#132338] transition-colors"
                >
                  Ask AI about this lab
                </Link>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2h10a1 1 0 011 1v7a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M2 4l5 3 5-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  {lab.email}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 2.5c-.3.6-.3 1.3.1 1.8l1.5 1.5c.4.4.5 1 .2 1.4L3.2 8.4c-.3.5-.2 1.1.3 1.5l.6.6c.4.4 1.1.5 1.5.1L7 9.5c.5-.4 1.1-.5 1.6-.2l1.8 1c.6.3.9 1 .6 1.6-.2.4-.8.6-1.3.5C5 11.7 2.3 9 1.4 4.3c-.1-.5.1-1.1.5-1.3.5-.3 1.2-.2 1.5.3z" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                  {lab.contact}
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="font-bold text-slate-700 mb-2">No laboratories found</h3>
              <p className="text-slate-500 text-sm">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
