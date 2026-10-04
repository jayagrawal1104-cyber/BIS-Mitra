import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ROLES = [
  { id: 'consumer', icon: '🛍️', label: 'Consumer', desc: 'Product safety & hallmarking' },
  { id: 'msme', icon: '🏪', label: 'MSME', desc: 'Small business compliance' },
  { id: 'manufacturer', icon: '🏭', label: 'Manufacturer', desc: 'Certification & quality' },
  { id: 'startup', icon: '🚀', label: 'Startup', desc: 'First certification support' },
  { id: 'importer', icon: '🚢', label: 'Importer', desc: 'Mandatory certification checks' },
  { id: 'researcher', icon: '🔬', label: 'Researcher', desc: 'Standards intelligence' },
  { id: 'lab', icon: '🧪', label: 'Laboratory', desc: 'Testing & certification' },
  { id: 'other', icon: '👤', label: 'Other', desc: 'General BIS information' },
];

const NEEDS = [
  { id: 'standards', icon: '📚', label: 'Find Standards' },
  { id: 'certification', icon: '✅', label: 'Certification' },
  { id: 'testing', icon: '🔬', label: 'Testing' },
  { id: 'tender', icon: '📄', label: 'Tender Analysis' },
  { id: 'hallmarking', icon: '🏅', label: 'Hallmarking' },
  { id: 'general', icon: '💬', label: 'General Info' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('');
  const [needs, setNeeds] = useState<string[]>([]);
  const [lang, setLang] = useState('English');
  const navigate = useNavigate();

  const toggleNeed = (id: string) => {
    setNeeds(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]);
  };

  const handleFinish = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1B2A] to-[#1E3A5F] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#1A56DB] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L14 5V9C14 12 11.5 14.5 9 16C6.5 14.5 4 12 4 9V5L9 2Z" fill="white" fillOpacity="0.9"/>
                <path d="M7 9L8.5 10.5L11.5 7.5" stroke="#0D1B2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-white text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>BIS Mitra</span>
          </div>
          <p className="text-blue-300 text-sm">Personalize your experience</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[0, 1, 2].map(i => (
            <div key={i} className={`flex items-center gap-3 ${i < 2 ? 'flex-1' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i === step ? 'bg-[#1A56DB] text-white' :
                i < step ? 'bg-green-500 text-white' :
                'bg-white/20 text-white/50'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 rounded-full ${i < step ? 'bg-green-500' : 'bg-white/20'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          {step === 0 && (
            <div className="p-8">
              <h2 className="text-xl font-bold text-[#0D1B2A] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Who are you?</h2>
              <p className="text-slate-500 text-sm mb-6">Help us personalize your BIS Mitra experience.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ROLES.map(r => (
                  <button
                    key={r.id}
                    onClick={() => { setRole(r.id); }}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      role === r.id ? 'border-[#1A56DB] bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{r.icon}</div>
                    <div className="font-semibold text-xs text-slate-800">{r.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{r.desc}</div>
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(1)}
                  disabled={!role}
                  className="px-8 py-2.5 bg-[#1A56DB] text-white rounded-xl font-semibold text-sm hover:bg-[#1440A0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="p-8">
              <h2 className="text-xl font-bold text-[#0D1B2A] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>What do you need?</h2>
              <p className="text-slate-500 text-sm mb-6">Select all that apply.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {NEEDS.map(n => (
                  <button
                    key={n.id}
                    onClick={() => toggleNeed(n.id)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      needs.includes(n.id) ? 'border-[#1A56DB] bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{n.icon}</div>
                    <div className="font-semibold text-sm text-slate-800">{n.label}</div>
                    {needs.includes(n.id) && (
                      <div className="w-4 h-4 rounded-full bg-[#1A56DB] flex items-center justify-center text-white mx-auto mt-1">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-between">
                <button onClick={() => setStep(0)} className="px-6 py-2.5 text-slate-600 text-sm">← Back</button>
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-2.5 bg-[#1A56DB] text-white rounded-xl font-semibold text-sm hover:bg-[#1440A0] transition-colors"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
              <h2 className="text-xl font-bold text-[#0D1B2A] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>Preferred Language</h2>
              <p className="text-slate-500 text-sm mb-6">Choose your preferred language for BIS Mitra.</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { id: 'English', label: 'English', sub: 'Default' },
                  { id: 'Hindi', label: 'हिन्दी', sub: 'Hindi' },
                ].map(l => (
                  <button
                    key={l.id}
                    onClick={() => setLang(l.id)}
                    className={`p-5 rounded-xl border-2 text-center transition-all ${
                      lang === l.id ? 'border-[#1A56DB] bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-bold text-lg text-slate-800 mb-1">{l.label}</div>
                    <div className="text-xs text-slate-500">{l.sub}</div>
                  </button>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center mb-6">
                <div className="text-2xl mb-2">🎉</div>
                <p className="font-semibold text-green-800 text-sm">Your BIS Mitra experience is ready.</p>
                <p className="text-green-700 text-xs mt-1">Personalized for {ROLES.find(r => r.id === role)?.label ?? 'you'}</p>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="px-6 py-2.5 text-slate-600 text-sm">← Back</button>
                <button
                  onClick={handleFinish}
                  className="px-8 py-2.5 bg-[#1A56DB] text-white rounded-xl font-semibold text-sm hover:bg-[#1440A0] transition-colors"
                >
                  Get Started →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
