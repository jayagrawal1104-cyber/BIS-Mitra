import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockStandards } from '../data/mockData';

export default function ComparePage() {
  const [stdA, setStdA] = useState(mockStandards[0]);
  const [stdB, setStdB] = useState(mockStandards[4]);

  const rows = [
    { label: 'Standard Number', a: stdA.number, b: stdB.number },
    { label: 'Title', a: stdA.title, b: stdB.title },
    { label: 'Category', a: stdA.category, b: stdB.category },
    { label: 'Status', a: stdA.status, b: stdB.status },
    { label: 'Scope', a: stdA.scope, b: stdB.scope },
    { label: 'Applicability', a: stdA.applicability, b: stdB.applicability },
    { label: 'BIS Certification', a: stdA.certificationRequired ? 'Required' : 'Not Mandatory', b: stdB.certificationRequired ? 'Required' : 'Not Mandatory' },
    { label: 'Certification Scheme', a: stdA.certificationScheme ?? 'N/A', b: stdB.certificationScheme ?? 'N/A' },
    { label: 'Evidence Coverage', a: `${stdA.evidenceCoverage}%`, b: `${stdB.evidenceCoverage}%` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Compare Standards</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0D1B2A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Compare Standards
        </h1>
        <p className="text-slate-500 mt-1">Side-by-side comparison of two Indian Standards.</p>
      </div>

      {/* Selectors */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {[
          { label: 'Standard A', value: stdA, onChange: (s: typeof stdA) => setStdA(s) },
          { label: 'Standard B', value: stdB, onChange: (s: typeof stdB) => setStdB(s) },
        ].map(({ label, value, onChange }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200 p-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</div>
            <select
              value={value.id}
              onChange={e => onChange(mockStandards.find(s => s.id === e.target.value) ?? mockStandards[0])}
              className="w-full text-sm text-slate-800 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-400 bg-white"
            >
              {mockStandards.map(s => (
                <option key={s.id} value={s.id}>{s.number} — {s.title}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50">
          <div className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Attribute</div>
          <div className="p-4 border-l border-slate-200">
            <span className="font-mono font-bold text-[#0D1B2A]">{stdA.number}</span>
          </div>
          <div className="p-4 border-l border-slate-200">
            <span className="font-mono font-bold text-[#0D1B2A]">{stdB.number}</span>
          </div>
        </div>

        {rows.map((row, i) => (
          <div key={i} className={`grid grid-cols-3 border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
            <div className="p-4 text-sm font-medium text-slate-600">{row.label}</div>
            <div className="p-4 border-l border-slate-100 text-sm text-slate-700">{row.a}</div>
            <div className="p-4 border-l border-slate-100 text-sm text-slate-700">
              {row.b}
              {row.label !== 'Attribute' && (
                <button className="block text-xs text-blue-600 hover:text-blue-800 mt-1 font-medium">
                  View Evidence →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800">
        Comparison data is AI-generated and evidence-supported where possible. Always verify with official BIS publications. Standard numbers are placeholders.
      </div>
    </div>
  );
}
