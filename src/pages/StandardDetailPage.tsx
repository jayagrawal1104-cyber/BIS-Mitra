import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mockStandards, mockEvidenceSources } from '../data/mockData';
import EvidenceDrawer from '../components/EvidenceDrawer';

const TABS = ['Overview', 'Applicability', 'Testing', 'Certification', 'Related Standards', 'Evidence'];

export default function StandardDetailPage() {
  const { id } = useParams();
  const standard = mockStandards.find(s => s.id === id) ?? mockStandards[0];
  const [tab, setTab] = useState('Overview');
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link to="/standards" className="hover:text-blue-600">Standards</Link>
        <span>/</span>
        <span className="font-mono text-slate-800">{standard.number}</span>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <span className="font-mono font-bold text-2xl text-[#0D1B2A]">{standard.number}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    standard.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {standard.status}
                  </span>
                  {standard.certificationRequired && (
                    <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                      BIS Certification Required
                    </span>
                  )}
                </div>
                <h1 className="text-xl font-bold text-slate-800 leading-snug" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  {standard.title}
                </h1>
                <p className="text-sm text-slate-500 mt-1">{standard.category}</p>
              </div>
              <button
                onClick={() => setSaved(!saved)}
                className={`shrink-0 p-2.5 rounded-xl border transition-colors ${saved ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-slate-200 text-slate-400 hover:border-blue-200 hover:text-blue-500'}`}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill={saved ? 'currentColor' : 'none'}>
                  <path d="M3 2h12a1 1 0 011 1v13l-7-3.5L2 16V3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </button>
            </div>

            {/* Evidence bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${standard.evidenceCoverage}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 shrink-0">Evidence: {standard.evidenceCoverage}%</span>
              <button
                onClick={() => setEvidenceOpen(true)}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold shrink-0"
              >
                View Sources →
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="border-b border-slate-200 flex overflow-x-auto">
              {TABS.map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`shrink-0 px-5 py-3.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    tab === t
                      ? 'border-[#1A56DB] text-[#1A56DB]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="p-6">
              {tab === 'Overview' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2 text-sm uppercase tracking-wide text-slate-500">Scope</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">{standard.scope}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-500 mb-2 text-sm uppercase tracking-wide">Applicability</h3>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
                      {standard.applicability}
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3 text-sm text-yellow-800">
                    <span>⚠️</span>
                    <p>This information is AI-generated and evidence-backed where possible. Always verify with the official BIS publication and current Quality Control Orders.</p>
                  </div>
                </div>
              )}

              {tab === 'Testing' && (
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm">Testing must be conducted at a BIS-recognized or NABL-accredited laboratory against the applicable test methods.</p>
                  <div>
                    <h4 className="font-medium text-slate-700 mb-3 text-sm">Applicable Test Methods</h4>
                    <div className="space-y-2">
                      {standard.testMethods.map(tm => (
                        <div key={tm} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <span className="font-mono text-sm font-semibold text-[#0D1B2A]">{tm}</span>
                          <span className="text-xs text-slate-500">Test Method Standard</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link to="/laboratories" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D1B2A] text-white rounded-xl text-sm font-semibold hover:bg-[#132338] transition-colors">
                    Find Testing Laboratory →
                  </Link>
                </div>
              )}

              {tab === 'Certification' && (
                <div className="space-y-4">
                  {standard.certificationRequired ? (
                    <>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <div className="font-semibold text-blue-800 mb-1">BIS Certification Required</div>
                        <p className="text-blue-700 text-sm">Products covered by this standard require mandatory BIS certification.</p>
                      </div>
                      {standard.certificationScheme && (
                        <div>
                          <h4 className="font-medium text-slate-700 mb-2 text-sm">Applicable Scheme</h4>
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-medium text-sm text-slate-800">
                            {standard.certificationScheme}
                          </div>
                        </div>
                      )}
                      <Link to="/certification" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D1B2A] text-white rounded-xl text-sm font-semibold hover:bg-[#132338] transition-colors">
                        View Full Certification Guide →
                      </Link>
                    </>
                  ) : (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600">
                      Based on available information, certification under this standard may not be mandatory. Verify with the latest Quality Control Orders.
                    </div>
                  )}
                </div>
              )}

              {tab === 'Related Standards' && (
                <div className="space-y-3">
                  {standard.relatedStandards.map(r => (
                    <div key={r} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-mono font-bold text-sm text-[#0D1B2A]">{r}</span>
                      <span className="text-sm text-slate-600 flex-1">Related Standard</span>
                      <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">View →</button>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'Evidence' && (
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">
                    These sources were used to generate information about this standard. Evidence coverage: <strong>{standard.evidenceCoverage}%</strong>.
                  </p>
                  {mockEvidenceSources.slice(0, 3).map((source, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl p-4">
                      <div className="font-medium text-sm text-slate-800 mb-1">{source.title}</div>
                      <div className="text-xs text-slate-500 mb-2">{source.docType} · {source.page} · {source.section}</div>
                      <p className="text-xs text-slate-600 italic">"{source.excerpt}"</p>
                    </div>
                  ))}
                  <button
                    onClick={() => setEvidenceOpen(true)}
                    className="px-5 py-2.5 bg-[#0D1B2A] text-white rounded-xl text-sm font-semibold hover:bg-[#132338] transition-colors"
                  >
                    View All Evidence Sources →
                  </button>
                </div>
              )}

              {(tab === 'Applicability') && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800">
                    {standard.applicability}
                  </div>
                  <p className="text-sm text-slate-600">
                    Applicability information is based on available source documents. Regulatory applicability may change with new Quality Control Orders.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-800 mb-4 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: '💬', label: 'Ask AI about this standard', path: `/ask?q=Tell me about ${standard.number}` },
                { icon: '✅', label: 'Certification Guide', path: '/certification' },
                { icon: '🔬', label: 'Find Testing Lab', path: '/laboratories' },
                { icon: '📊', label: 'Compare Standards', path: '/compare' },
              ].map(a => (
                <Link
                  key={a.label}
                  to={a.path}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-all"
                >
                  <span>{a.icon}</span>
                  <span className="font-medium">{a.label}</span>
                </Link>
              ))}
              <button
                onClick={() => setEvidenceOpen(true)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-all"
              >
                <span>📎</span>
                <span className="font-medium">View Evidence Sources</span>
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-xs text-yellow-800">
            <strong>Disclaimer:</strong> Standard numbers shown as IS XXXXX are placeholders. The production system connects to real BIS data.
          </div>
        </div>
      </div>

      <EvidenceDrawer
        open={evidenceOpen}
        onClose={() => setEvidenceOpen(false)}
        sources={mockEvidenceSources}
        title={`${standard.number} — Evidence Sources`}
      />
    </div>
  );
}
