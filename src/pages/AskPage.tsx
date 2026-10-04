import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockEvidenceSources } from '../data/mockData';
import { EvidenceCoverageBar } from '../components/EvidenceBadge';
import EvidenceDrawer from '../components/EvidenceDrawer';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  processing?: boolean;
  step?: number;
  complete?: boolean;
  evidencePct?: number;
  verified?: number;
  partial?: number;
  insufficient?: number;
  standards?: Array<{ num: string; title: string; relevance: string }>;
}

const PROCESS_STEPS = [
  'Understanding your question…',
  'Searching relevant standards…',
  'Checking source evidence…',
  'Preparing answer…',
];

const SUGGESTED = [
  'What standard applies to my product?',
  'Is BIS certification mandatory for LED lights?',
  'What documents are needed for BIS certification?',
  'Which lab can test stainless steel products?',
  'What is the difference between ISI Mark and BIS CRS?',
  'How long does BIS certification take?',
];

let msgId = 0;

const sampleAnswers: Record<string, Partial<Message>> = {
  default: {
    content: `Based on the available evidence in BIS documentation, I've identified potentially relevant standards and certification information.

**Product Understanding:** This appears to fall under the household products / consumer goods category.

**Potentially Relevant Standards:**
- **IS XXXXX** — Primary applicable standard (High Relevance). This standard directly covers the product category based on scope analysis.
- **IS YYYYY** — Material specification (Medium Relevance). Relevant if specific materials are used in manufacturing.

**Certification:** Products in this category may require mandatory BIS certification under the applicable Quality Control Order. I recommend verifying the current status directly with BIS.

**Testing:** Testing is typically required at a BIS-recognized or NABL-accredited laboratory. I can help you find relevant laboratories.

**Important:** This answer is AI-generated and supported by available evidence. Always verify certification requirements with the official Bureau of Indian Standards.`,
    evidencePct: 82,
    verified: 5,
    partial: 2,
    insufficient: 1,
    standards: [
      { num: 'IS XXXXX', title: 'Primary Product Standard', relevance: 'High' },
      { num: 'IS YYYYY', title: 'Material Specification', relevance: 'Medium' },
    ],
  },
};

export default function AskPage() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setInput(q);
      setTimeout(() => sendMessage(q), 300);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, processStep]);

  const sendMessage = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || processing) return;

    const userMsg: Message = { id: `msg-${msgId++}`, role: 'user', content };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setProcessing(true);
    setProcessStep(0);

    // Simulate step-by-step processing
    PROCESS_STEPS.forEach((_, i) => {
      setTimeout(() => setProcessStep(i), i * 900 + 200);
    });

    setTimeout(() => {
      const ans = sampleAnswers.default;
      const aiMsg: Message = {
        id: `msg-${msgId++}`,
        role: 'assistant',
        complete: true,
        content: ans.content!,
        evidencePct: ans.evidencePct,
        verified: ans.verified,
        partial: ans.partial,
        insufficient: ans.insufficient,
        standards: ans.standards,
      };
      setMessages(prev => [...prev, aiMsg]);
      setProcessing(false);
    }, PROCESS_STEPS.length * 900 + 800);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200 shrink-0">
        <div className="p-4 border-b border-slate-100">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Suggested Questions</div>
          <div className="space-y-1">
            {SUGGESTED.map(q => (
              <button
                key={q}
                onClick={() => { setInput(q); inputRef.current?.focus(); }}
                className="w-full text-left text-xs px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors leading-relaxed"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 flex-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">AI Transparency</div>
          <div className="space-y-2.5">
            {[
              { dot: 'bg-green-500', label: 'Verified', desc: 'Supported by source evidence' },
              { dot: 'bg-yellow-400', label: 'Partial', desc: 'Some evidence available' },
              { dot: 'bg-red-400', label: 'Insufficient', desc: 'Cannot verify — stated clearly' },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-2.5">
                <div className={`w-2 h-2 rounded-full ${item.dot} mt-1.5 shrink-0`} />
                <div>
                  <div className="text-xs font-medium text-slate-700">{item.label}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-blue-50">
          <p className="text-xs text-blue-700 leading-relaxed">
            <strong>Note:</strong> BIS Mitra is an AI research assistant. Verify important compliance decisions with official BIS sources.
          </p>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#0D1B2A] flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L14 5V9C14 12 11.5 14.5 9 16C6.5 14.5 4 12 4 9V5L9 2Z" fill="white" fillOpacity="0.9"/>
              <path d="M7 9L8.5 10.5L11.5 7.5" stroke="#0D1B2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="font-semibold text-slate-800 text-sm" style={{ fontFamily: 'Manrope, sans-serif' }}>BIS Mitra AI</div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-xs text-slate-500">Evidence-backed · AI-powered</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
          {messages.length === 0 && !processing && (
            <div className="max-w-2xl mx-auto text-center py-16 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-[#0D1B2A] flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L14 5V9C14 12 11.5 14.5 9 16C6.5 14.5 4 12 4 9V5L9 2Z" fill="white" fillOpacity="0.9"/>
                  <path d="M7 9L8.5 10.5L11.5 7.5" stroke="#0D1B2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#0D1B2A] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Ask BIS Mitra
              </h2>
              <p className="text-slate-500 mb-8">
                Ask any question about Indian Standards, BIS certification, testing, or compliance.
                Every important answer is backed by source evidence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {SUGGESTED.slice(0, 4).map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="p-4 rounded-xl border border-slate-200 text-sm text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              {msg.role === 'user' ? (
                <div className="max-w-lg bg-[#1A56DB] text-white text-sm rounded-2xl rounded-tr-sm px-5 py-3.5 shadow-sm">
                  {msg.content}
                </div>
              ) : (
                <div className="max-w-2xl w-full space-y-4">
                  {/* AI message */}
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm overflow-hidden shadow-sm">
                    <div className="p-5">
                      <div className="prose-compact text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                        {msg.content.split('\n').map((line, i) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <p key={i} className="font-semibold text-slate-900">{line.slice(2, -2)}</p>;
                          }
                          if (line.startsWith('- **')) {
                            const parts = line.slice(2).split('** — ');
                            return (
                              <p key={i} className="flex items-start gap-2 my-1">
                                <span className="text-slate-400 mt-1">•</span>
                                <span>
                                  <span className="font-mono font-semibold text-[#0D1B2A]">{parts[0].replace(/\*\*/g, '')}</span>
                                  {parts[1] && <span className="text-slate-600"> — {parts[1]}</span>}
                                </span>
                              </p>
                            );
                          }
                          if (line.startsWith('**')) {
                            const cleaned = line.replace(/\*\*/g, '');
                            return <p key={i} className="font-medium text-slate-800">{cleaned}</p>;
                          }
                          return line.trim() ? <p key={i}>{line}</p> : <div key={i} className="h-2" />;
                        })}
                      </div>
                    </div>

                    {/* Evidence coverage */}
                    {msg.evidencePct !== undefined && (
                      <div className="px-5 pb-4">
                        <EvidenceCoverageBar
                          percentage={msg.evidencePct}
                          verified={msg.verified!}
                          partial={msg.partial!}
                          insufficient={msg.insufficient!}
                        />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="border-t border-slate-100 px-5 py-3 bg-slate-50 flex flex-wrap items-center gap-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                        ✓ Evidence-backed
                      </span>
                      <button
                        onClick={() => setEvidenceOpen(true)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold ml-auto"
                      >
                        View Evidence Sources →
                      </button>
                    </div>
                  </div>

                  {/* Standard cards */}
                  {msg.standards && (
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Potentially Relevant Standards</div>
                      {msg.standards.map(s => (
                        <div key={s.num} className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-4">
                          <span className="font-mono font-bold text-sm text-[#0D1B2A]">{s.num}</span>
                          <span className="text-sm text-slate-600 flex-1">{s.title}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.relevance === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {s.relevance}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Processing indicator */}
          {processing && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-5 max-w-sm shadow-sm">
                <div className="space-y-3">
                  {PROCESS_STEPS.map((step, i) => (
                    <div key={i} className={`flex items-center gap-3 transition-all duration-300 ${i <= processStep ? 'opacity-100' : 'opacity-30'}`}>
                      {i < processStep ? (
                        <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      ) : i === processStep ? (
                        <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-slate-200 shrink-0" />
                      )}
                      <span className={`text-xs ${i === processStep ? 'text-blue-700 font-medium' : i < processStep ? 'text-green-700' : 'text-slate-400'}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white border border-slate-300 rounded-2xl overflow-hidden shadow-sm focus-within:border-blue-400 focus-within:shadow-md transition-all">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask a BIS question, describe your product, or upload a document…"
                rows={2}
                className="w-full px-5 py-4 text-sm text-slate-800 placeholder-slate-400 outline-none resize-none"
              />
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white transition-colors" title="Voice input">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="5.5" y="1" width="5" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M2.5 8C2.5 10.8 4.9 13 8 13s5.5-2.2 5.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M8 13v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-white transition-colors" title="Upload document">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 11v3h12v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M8 1v9M5.5 3.5L8 1 10.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="text-xs text-slate-400">↵ to send</span>
                </div>
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || processing}
                  className="px-5 py-1.5 bg-[#1A56DB] text-white rounded-xl text-sm font-semibold hover:bg-[#1440A0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-400 text-center mt-2">
              AI answers are backed by source evidence. Always verify important compliance decisions with official BIS sources.
            </p>
          </div>
        </div>
      </div>

      <EvidenceDrawer
        open={evidenceOpen}
        onClose={() => setEvidenceOpen(false)}
        sources={mockEvidenceSources}
        title="Current Query Evidence"
      />
    </div>
  );
}
