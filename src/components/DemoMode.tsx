import { useState } from 'react';
import { Link } from 'react-router-dom';

const DEMO_FLOWS = [
  {
    title: 'Product Compliance Demo',
    steps: [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Ask BIS Mitra', path: '/ask?q=I manufacture stainless steel water bottles', icon: '💬' },
      { label: 'Find Standards', path: '/standards?q=stainless steel', icon: '📚' },
      { label: 'Standard Detail', path: '/standards/std-1', icon: '🔍' },
      { label: 'Standards Graph', path: '/graph', icon: '🗺️' },
      { label: 'Certification Guide', path: '/certification', icon: '✅' },
      { label: 'Find Testing Lab', path: '/laboratories', icon: '🔬' },
    ],
  },
  {
    title: 'Tender Analyzer Demo',
    steps: [
      { label: 'Home', path: '/', icon: '🏠' },
      { label: 'Tender Analyzer', path: '/tender-analyzer', icon: '📄' },
      { label: 'Standards Found', path: '/standards', icon: '📚' },
      { label: 'Compare Standards', path: '/compare', icon: '📊' },
    ],
  },
];

export default function DemoMode() {
  const [open, setOpen] = useState(false);
  const [flow, setFlow] = useState(0);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-[#F59E0B] text-[#0D1B2A] rounded-full shadow-lg font-bold text-sm hover:bg-yellow-400 transition-all hover:shadow-xl"
      >
        <span>🎯</span>
        <span>Demo Mode</span>
      </button>

      {/* Panel */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/40 z-[80]" onClick={() => setOpen(false)} />
          <div className="fixed bottom-20 right-4 lg:bottom-20 lg:right-6 w-80 bg-white rounded-2xl shadow-2xl z-[90] overflow-hidden animate-fade-in-up border border-slate-200">
            <div className="bg-[#0D1B2A] px-5 py-4 flex items-center justify-between">
              <div>
                <div className="text-white font-bold text-sm flex items-center gap-2">🎯 Hackathon Demo Mode</div>
                <p className="text-slate-400 text-xs mt-0.5">SIH 2026 · Quick navigation</p>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white p-1">✕</button>
            </div>

            {/* Flow selector */}
            <div className="flex border-b border-slate-200">
              {DEMO_FLOWS.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setFlow(i)}
                  className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                    flow === i ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {f.title}
                </button>
              ))}
            </div>

            <div className="p-3 space-y-1.5 max-h-72 overflow-y-auto">
              {DEMO_FLOWS[flow].steps.map((step, i) => (
                <Link
                  key={i}
                  to={step.path}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0D1B2A] text-white text-xs flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-sm">{step.icon}</span>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{step.label}</span>
                  <span className="text-slate-400 ml-auto group-hover:text-blue-500">→</span>
                </Link>
              ))}
            </div>

            <div className="px-4 py-3 bg-yellow-50 border-t border-yellow-100">
              <p className="text-xs text-yellow-800 text-center">
                Click any step to jump directly in the demo flow
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
