import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { mockEvidenceSources } from '../data/mockData';
import { EvidenceCoverageBar } from '../components/EvidenceBadge';
import EvidenceDrawer from '../components/EvidenceDrawer';

type Stage = 'upload' | 'processing' | 'result';

const PROCESS_STAGES = [
  { label: 'Uploading document…', icon: '📤' },
  { label: 'Extracting text and structure…', icon: '📑' },
  { label: 'Identifying requirements…', icon: '🔍' },
  { label: 'Matching to standards database…', icon: '📚' },
  { label: 'Checking referenced standards…', icon: '✅' },
  { label: 'Detecting potential gaps…', icon: '⚠️' },
  { label: 'Generating compliance checklist…', icon: '📋' },
];

const MOCK_DETECTED_STANDARDS = [
  { num: 'IS XXXXX', title: 'Stainless Steel Utensils', explicit: true, confidence: 'High' },
  { num: 'IS YYYYY', title: 'Wrought Stainless Steel Material', explicit: false, confidence: 'Medium' },
  { num: 'IS ZZZZZ', title: 'Drinking Water Requirements', explicit: false, confidence: 'Medium' },
];

const MOCK_ISSUES = [
  { type: 'warning', title: 'Potentially outdated reference', desc: 'Reference to IS XXXXX may require version verification. Current edition status should be confirmed.' },
  { type: 'info', title: 'Related standard may apply', desc: 'IS AAAAA (Food Safety for Metal Containers) may be relevant for food contact applications.' },
  { type: 'warning', title: 'Testing requirement detected', desc: 'Document requires testing per IS TTTTT but does not specify laboratory accreditation requirements.' },
  { type: 'success', title: 'Certification requirement identified', desc: 'ISI Mark requirement is explicitly stated and references the correct BIS certification scheme.' },
];

const CHECKLIST = [
  { label: 'Primary product standard identified', done: true, evidence: true },
  { label: 'Material specification standard identified', done: true, evidence: true },
  { label: 'Certification scheme identified', done: true, evidence: true },
  { label: 'Test method standards identified', done: true, evidence: false },
  { label: 'Laboratory accreditation requirement', done: false, evidence: false },
  { label: 'Current standard version confirmed', done: false, evidence: false },
  { label: 'All cross-referenced standards reviewed', done: false, evidence: false },
];

export default function TenderAnalyzerPage() {
  const [stage, setStage] = useState<Stage>('upload');
  const [processStep, setProcessStep] = useState(0);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const startProcessing = (name: string) => {
    setFileName(name);
    setStage('processing');
    setProcessStep(0);

    PROCESS_STAGES.forEach((_, i) => {
      setTimeout(() => setProcessStep(i), i * 700 + 300);
    });

    setTimeout(() => {
      setStage('result');
    }, PROCESS_STAGES.length * 700 + 1000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) startProcessing(file.name);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) startProcessing(file.name);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Tender Analyzer</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0D1B2A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Tender & Document Analyzer
        </h1>
        <p className="text-slate-500 mt-1">
          Upload procurement documents, technical specifications, or tenders. BIS Mitra identifies referenced standards, checks for gaps, and generates a compliance checklist.
        </p>
      </div>

      {/* Workflow indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
        {['Upload', 'Extract', 'Understand', 'Identify Standards', 'Check References', 'Detect Gaps', 'Checklist'].map((s, i, arr) => (
          <div key={s} className="flex items-center gap-2 shrink-0">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              (stage === 'result' || (stage === 'processing' && i <= processStep))
                ? 'bg-[#0D1B2A] text-white'
                : stage === 'upload' && i === 0
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-slate-100 text-slate-500'
            }`}>
              {i + 1}. {s}
            </div>
            {i < arr.length - 1 && <span className="text-slate-300">→</span>}
          </div>
        ))}
      </div>

      {stage === 'upload' && (
        <div className="max-w-2xl mx-auto">
          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${
              dragOver ? 'border-blue-400 bg-blue-50' : 'border-slate-300 bg-white hover:border-blue-300 hover:bg-slate-50'
            }`}
            onClick={() => fileRef.current?.click()}
          >
            <div className="text-5xl mb-4">📄</div>
            <h3 className="font-bold text-slate-700 text-lg mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Upload Your Document
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Drag & drop or click to select a tender, specification, or procurement document
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6 text-xs text-slate-400">
              {['PDF', 'DOCX', 'TXT', 'Technical Specification', 'Tender Document', 'Procurement Spec'].map(t => (
                <span key={t} className="px-2 py-1 bg-slate-100 rounded">{t}</span>
              ))}
            </div>
            <button className="px-6 py-2.5 bg-[#1A56DB] text-white rounded-xl text-sm font-semibold hover:bg-[#1440A0] transition-colors">
              Choose File
            </button>
          </div>
          <input ref={fileRef} type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" />

          {/* Demo button */}
          <div className="mt-4 text-center">
            <button
              onClick={() => startProcessing('Sample_Tender_Specification.pdf')}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium underline underline-offset-2"
            >
              Run with demo document →
            </button>
          </div>
        </div>
      )}

      {stage === 'processing' && (
        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xl">📄</div>
              <div>
                <div className="font-semibold text-slate-800 text-sm">{fileName}</div>
                <div className="text-xs text-slate-500">Processing document…</div>
              </div>
            </div>

            <div className="space-y-4">
              {PROCESS_STAGES.map((s, i) => (
                <div key={i} className={`flex items-center gap-4 transition-all duration-300 ${i <= processStep ? 'opacity-100' : 'opacity-30'}`}>
                  {i < processStep ? (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ) : i === processStep ? (
                    <div className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin shrink-0" />
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center text-sm shrink-0">{s.icon}</div>
                  )}
                  <div>
                    <div className={`text-sm font-medium ${i === processStep ? 'text-blue-700' : i < processStep ? 'text-green-700' : 'text-slate-400'}`}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1A56DB] rounded-full transition-all duration-500"
                  style={{ width: `${((processStep + 1) / PROCESS_STAGES.length) * 100}%` }}
                />
              </div>
              <div className="text-xs text-slate-500 text-right mt-1">{Math.round(((processStep + 1) / PROCESS_STAGES.length) * 100)}%</div>
            </div>
          </div>
        </div>
      )}

      {stage === 'result' && (
        <div className="grid lg:grid-cols-3 gap-6 animate-fade-in-up">
          {/* Left: Analysis */}
          <div className="lg:col-span-2 space-y-5">
            {/* Document summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-xl">📄</div>
                <div>
                  <div className="font-semibold text-slate-800">{fileName}</div>
                  <div className="text-xs text-slate-500">Analysis complete · {new Date().toLocaleDateString()}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="text-center">
                  <div className="text-xl font-bold text-[#0D1B2A]" style={{ fontFamily: 'Manrope, sans-serif' }}>3</div>
                  <div className="text-xs text-slate-500">Standards Detected</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-600" style={{ fontFamily: 'Manrope, sans-serif' }}>3</div>
                  <div className="text-xs text-slate-500">Potential Issues</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-green-600" style={{ fontFamily: 'Manrope, sans-serif' }}>4/7</div>
                  <div className="text-xs text-slate-500">Checklist Items</div>
                </div>
              </div>
            </div>

            {/* Detected standards */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-800 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Detected Standards</h3>
              <div className="space-y-3">
                {MOCK_DETECTED_STANDARDS.map((s, i) => (
                  <div key={i} className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-mono font-bold text-sm text-[#0D1B2A] shrink-0">{s.num}</span>
                    <span className="text-sm text-slate-700 flex-1">{s.title}</span>
                    <div className="flex items-center gap-2">
                      {s.explicit ? (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Explicitly Referenced</span>
                      ) : (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">AI-Inferred</span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.confidence === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {s.confidence}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Potential issues */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800" style={{ fontFamily: 'Manrope, sans-serif' }}>Potential Issues</h3>
                <span className="text-xs text-slate-500 bg-yellow-50 border border-yellow-200 px-2 py-0.5 rounded-full">Requires verification</span>
              </div>
              <div className="space-y-3">
                {MOCK_ISSUES.map((issue, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border overflow-hidden ${
                      issue.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                      issue.type === 'info' ? 'border-blue-200 bg-blue-50' :
                      'border-green-200 bg-green-50'
                    }`}
                  >
                    <button
                      className="w-full flex items-start gap-3 p-4 text-left"
                      onClick={() => setExpandedIssue(expandedIssue === i ? null : i)}
                    >
                      <span className="text-lg shrink-0">
                        {issue.type === 'warning' ? '⚠️' : issue.type === 'info' ? 'ℹ️' : '✅'}
                      </span>
                      <div className="flex-1">
                        <div className={`font-medium text-sm ${
                          issue.type === 'warning' ? 'text-yellow-800' :
                          issue.type === 'info' ? 'text-blue-800' :
                          'text-green-800'
                        }`}>
                          {issue.title}
                        </div>
                        {expandedIssue === i && (
                          <p className={`text-xs mt-2 leading-relaxed ${
                            issue.type === 'warning' ? 'text-yellow-700' :
                            issue.type === 'info' ? 'text-blue-700' :
                            'text-green-700'
                          }`}>
                            {issue.desc}
                          </p>
                        )}
                      </div>
                      <svg
                        width="16" height="16" viewBox="0 0 16 16" fill="none"
                        className={`shrink-0 transition-transform ${expandedIssue === i ? 'rotate-180' : ''} text-slate-400`}
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-800" style={{ fontFamily: 'Manrope, sans-serif' }}>Evidence Coverage</h3>
              </div>
              <EvidenceCoverageBar percentage={76} verified={5} partial={3} insufficient={2} />
              <button
                onClick={() => setEvidenceOpen(true)}
                className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-semibold"
              >
                View Evidence Sources →
              </button>
            </div>
          </div>

          {/* Right: Checklist */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800" style={{ fontFamily: 'Manrope, sans-serif' }}>Compliance Checklist</h3>
                <span className="text-sm font-bold text-[#0D1B2A]">4/7</span>
              </div>

              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '57%' }} />
              </div>

              <div className="space-y-2">
                {CHECKLIST.map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-3 rounded-xl border text-sm ${
                      item.done ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border-2 shrink-0 mt-0.5 flex items-center justify-center ${
                      item.done ? 'bg-green-500 border-green-500' : 'border-slate-300'
                    }`}>
                      {item.done && (
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className={item.done ? 'text-green-800' : 'text-slate-500'}>{item.label}</span>
                    {item.evidence && <span className="ml-auto text-xs text-green-600 shrink-0">✓ Evidence</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Link
                to="/ask"
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1A56DB] text-white rounded-xl text-sm font-semibold hover:bg-[#1440A0] transition-colors"
              >
                Ask AI about this analysis
              </Link>
              <Link
                to="/standards"
                className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Explore Detected Standards
              </Link>
              <button
                onClick={() => setStage('upload')}
                className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                Analyze Another Document
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-xs text-yellow-800">
              <strong>Important:</strong> This analysis is AI-generated and evidence-supported where possible. Always verify with official BIS standards and current regulations.
            </div>
          </div>
        </div>
      )}

      <EvidenceDrawer
        open={evidenceOpen}
        onClose={() => setEvidenceOpen(false)}
        sources={mockEvidenceSources}
        title="Tender Analysis — Evidence Sources"
      />
    </div>
  );
}
