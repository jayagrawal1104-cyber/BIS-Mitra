import { useEffect } from 'react';
import type { EvidenceSource } from '../data/mockData';

interface EvidenceDrawerProps {
  open: boolean;
  onClose: () => void;
  sources: EvidenceSource[];
  title?: string;
}

export default function EvidenceDrawer({ open, onClose, sources, title }: EvidenceDrawerProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-[80] animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-[90] shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#0D1B2A]">
          <div>
            <h3 className="text-white font-semibold" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Evidence Sources
            </h3>
            {title && <p className="text-slate-400 text-sm mt-0.5">{title}</p>}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 bg-white/10 px-2 py-1 rounded-full">{sources.length} sources</span>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* AI disclaimer */}
        <div className="px-5 py-3 bg-blue-50 border-b border-blue-100 flex items-start gap-2.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-600 shrink-0 mt-0.5">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p className="text-xs text-blue-700">
            These sources support the AI-generated answer. AI interpretation may differ from source content. Always verify important information with official BIS publications.
          </p>
        </div>

        {/* Sources */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {sources.map((source, i) => (
            <div
              key={source.id}
              className="border border-slate-200 rounded-xl overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Source header */}
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#0D1B2A] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-slate-800 leading-tight">{source.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">{source.docType}</span>
                      {source.date && <span className="text-xs text-slate-500">{source.date}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1"/><path d="M4 6h4M4 8h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
                  {source.page}
                </span>
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3h8M2 6h6M2 9h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
                  {source.section}
                </span>
              </div>

              {/* Excerpt */}
              <div className="px-4 py-3">
                <div className="bg-yellow-50 border-l-3 border-yellow-400 pl-3 py-2 rounded-r-lg mb-3">
                  <p className="text-sm text-slate-700 italic leading-relaxed">"{source.excerpt}"</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full shrink-0 mt-0.5">Relevance</span>
                  <p className="text-xs text-slate-600">{source.relevance}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 pb-3 flex items-center gap-2">
                <button className="flex-1 text-xs py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium">
                  Open Official Source
                </button>
                <button className="flex-1 text-xs py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors font-medium">
                  Copy Citation
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-5 py-4 bg-slate-50">
          <p className="text-xs text-slate-500 text-center">
            BIS Mitra AI uses these sources to generate evidence-backed answers. Evidence coverage may vary.
          </p>
        </div>
      </div>
    </>
  );
}
