import { Link } from 'react-router-dom';

const RECENT_SEARCHES = [
  { q: 'Stainless steel water bottle BIS standard', time: '2 hours ago', results: 3 },
  { q: 'LED light certification requirements', time: '1 day ago', results: 5 },
  { q: 'MSME certification process', time: '3 days ago', results: 7 },
];

const SAVED_STANDARDS = [
  { num: 'IS XXXXX', title: 'Stainless Steel Utensils', category: 'Household', saved: '2 hours ago' },
  { num: 'IS CCCCC', title: 'LED Luminaires Performance', category: 'Electrical', saved: '1 day ago' },
];

const RECENT_DOCS = [
  { name: 'Tender_Specification_2025.pdf', type: 'Tender', uploaded: '2 hours ago', status: 'Analyzed', standards: 3 },
  { name: 'Product_Spec_WaterBottle.pdf', type: 'Specification', uploaded: '3 days ago', status: 'Analyzed', standards: 2 },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0D1B2A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
            Welcome back, Researcher
          </h1>
          <p className="text-slate-500 text-sm mt-1">Your BIS compliance intelligence hub</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-xs font-medium text-blue-700">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          All systems active
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Questions Asked', value: '12', icon: '💬', color: 'bg-blue-50 border-blue-200' },
          { label: 'Standards Explored', value: '8', icon: '📚', color: 'bg-purple-50 border-purple-200' },
          { label: 'Documents Analyzed', value: '3', icon: '📄', color: 'bg-green-50 border-green-200' },
          { label: 'Saved Standards', value: '2', icon: '🔖', color: 'bg-yellow-50 border-yellow-200' },
        ].map(stat => (
          <div key={stat.label} className={`p-5 rounded-2xl border ${stat.color}`}>
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-[#0D1B2A]" style={{ fontFamily: 'Manrope, sans-serif' }}>{stat.value}</div>
            <div className="text-xs text-slate-600 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-800 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { icon: '💬', label: 'Ask AI', path: '/ask', color: 'bg-blue-50 border-blue-200 text-blue-700' },
                { icon: '🔍', label: 'Find Standard', path: '/standards', color: 'bg-purple-50 border-purple-200 text-purple-700' },
                { icon: '📄', label: 'Analyze Document', path: '/tender-analyzer', color: 'bg-green-50 border-green-200 text-green-700' },
                { icon: '✅', label: 'Certification', path: '/certification', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
                { icon: '🔬', label: 'Find Lab', path: '/laboratories', color: 'bg-teal-50 border-teal-200 text-teal-700' },
                { icon: '🏅', label: 'Hallmarking', path: '/hallmarking', color: 'bg-orange-50 border-orange-200 text-orange-700' },
              ].map(a => (
                <Link
                  key={a.label}
                  to={a.path}
                  className={`flex items-center gap-2.5 p-3.5 rounded-xl border ${a.color} hover:opacity-80 transition-opacity font-medium text-sm`}
                >
                  <span className="text-xl">{a.icon}</span>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Research */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800" style={{ fontFamily: 'Manrope, sans-serif' }}>Recent Research</h3>
              <Link to="/ask" className="text-xs text-blue-600 hover:text-blue-800 font-medium">View all →</Link>
            </div>
            <div className="space-y-3">
              {RECENT_SEARCHES.map((s, i) => (
                <Link
                  key={i}
                  to={`/ask?q=${encodeURIComponent(s.q)}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M11.5 11.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{s.q}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{s.results} standards found · {s.time}</p>
                  </div>
                  <span className="text-slate-400">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800" style={{ fontFamily: 'Manrope, sans-serif' }}>Recent Documents</h3>
              <Link to="/documents" className="text-xs text-blue-600 hover:text-blue-800 font-medium">View all →</Link>
            </div>
            <div className="space-y-3">
              {RECENT_DOCS.map((doc, i) => (
                <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl border border-slate-200">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-lg shrink-0">
                    📄
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{doc.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.type} · {doc.standards} standards · {doc.uploaded}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{doc.status}</span>
                    <Link to="/tender-analyzer" className="text-xs text-blue-600 hover:text-blue-800 font-medium">View</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Saved Standards */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800" style={{ fontFamily: 'Manrope, sans-serif' }}>Saved Standards</h3>
              <Link to="/standards" className="text-xs text-blue-600 hover:text-blue-800 font-medium">Browse →</Link>
            </div>
            <div className="space-y-3">
              {SAVED_STANDARDS.map((s, i) => (
                <Link
                  key={i}
                  to={`/standards/${i + 1}`}
                  className="block p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-bold text-[#0D1B2A]">{s.num}</span>
                    <span className="text-xs text-slate-400">{s.saved}</span>
                  </div>
                  <p className="text-sm text-slate-700">{s.title}</p>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full mt-1 inline-block">{s.category}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* AI Usage */}
          <div className="bg-[#0D1B2A] rounded-2xl p-5">
            <h3 className="font-semibold text-white mb-3 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>AI Evidence Summary</h3>
            <div className="space-y-2.5">
              {[
                { label: 'Verified answers', pct: 72, color: 'bg-green-500' },
                { label: 'Partially verified', pct: 21, color: 'bg-yellow-400' },
                { label: 'Insufficient evidence', pct: 7, color: 'bg-red-400' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>{item.label}</span>
                    <span>{item.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-4">Across your last 12 AI queries</p>
          </div>

          {/* Onboarding profile */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-800 mb-3 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>Your Profile</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-lg">🔬</span>
                <span className="text-slate-700 font-medium">Researcher</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg">🌐</span>
                <span className="text-slate-700">English</span>
              </div>
            </div>
            <Link to="/onboarding" className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-medium block">
              Update profile →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
