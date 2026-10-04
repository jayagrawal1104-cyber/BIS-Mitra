import { useState } from 'react';
import { Link } from 'react-router-dom';
import { certificationSteps } from '../data/mockData';

type UserType = 'Manufacturer' | 'MSME' | 'Startup' | 'Importer';

export default function CertificationPage() {
  const [userType, setUserType] = useState<UserType>('Manufacturer');
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Certification Guide</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0D1B2A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
          BIS Certification Journey
        </h1>
        <p className="text-slate-500 mt-1">
          A step-by-step guide to obtaining BIS certification. AI-assisted and evidence-supported.
        </p>
      </div>

      {/* User type selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium text-slate-600 mr-2">Customize for:</span>
        {(['Manufacturer', 'MSME', 'Startup', 'Importer'] as UserType[]).map(t => (
          <button
            key={t}
            onClick={() => setUserType(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              userType === t ? 'bg-[#0D1B2A] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Certification schemes overview */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { title: 'ISI Mark', desc: 'Mandatory certification for specified products. Demonstrates compliance with Indian Standards.', color: 'bg-blue-50 border-blue-200', icon: '🏆' },
          { title: 'Compulsory Registration', desc: 'Online registration for electronics and IT products. Faster than ISI Mark for eligible categories.', color: 'bg-purple-50 border-purple-200', icon: '📝' },
          { title: 'Hallmark', desc: 'Purity certification for gold and silver jewellery. Mandatory since April 2023.', color: 'bg-yellow-50 border-yellow-200', icon: '🏅' },
        ].map(s => (
          <div key={s.title} className={`p-5 rounded-2xl border ${s.color}`}>
            <div className="text-3xl mb-3">{s.icon}</div>
            <h3 className="font-bold text-slate-800 mb-1.5" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8">
        <div className="bg-[#0D1B2A] px-6 py-4">
          <h2 className="text-white font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>
            ISI Mark Certification — {userType} Pathway
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">Click any step to expand details</p>
        </div>

        <div className="p-6">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />

            <div className="space-y-4">
              {certificationSteps.map((step, i) => (
                <div key={step.step} className="relative animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                  {/* Step number */}
                  <div className="flex items-start gap-6">
                    <div className="relative z-10 shrink-0">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer transition-all ${
                          activeStep === i
                            ? 'bg-[#1A56DB] text-white shadow-lg shadow-blue-200'
                            : 'bg-white border-2 border-slate-300 text-slate-600 hover:border-blue-400'
                        }`}
                        onClick={() => setActiveStep(activeStep === i ? null : i)}
                      >
                        {step.step}
                      </div>
                    </div>

                    <div className="flex-1 pb-4">
                      <button
                        className="w-full text-left"
                        onClick={() => setActiveStep(activeStep === i ? null : i)}
                      >
                        <h3 className={`font-bold text-base ${activeStep === i ? 'text-[#1A56DB]' : 'text-slate-800'}`} style={{ fontFamily: 'Manrope, sans-serif' }}>
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-500 mt-0.5">{step.description}</p>
                      </button>

                      {activeStep === i && (
                        <div className="mt-4 space-y-4 animate-fade-in-up bg-slate-50 rounded-xl p-4 border border-slate-200">
                          <p className="text-sm text-slate-700 leading-relaxed">{step.details}</p>

                          <div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Required Documents</div>
                            <div className="space-y-1.5">
                              {step.documents.map(doc => (
                                <div key={doc} className="flex items-center gap-2 text-sm text-slate-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                                  {doc}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                            <span className="text-lg">💬</span>
                            <div>
                              <div className="text-xs font-medium text-blue-700">{step.aiHelp}</div>
                            </div>
                            <Link
                              to={`/ask?q=${encodeURIComponent(step.aiHelp.replace('Ask BIS Mitra: ', ''))}`}
                              className="ml-auto text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shrink-0"
                            >
                              Ask AI
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Required Documents */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Typical Documents Required</h3>
          <ul className="space-y-2">
            {[
              'Test report from BIS-recognized laboratory',
              'Factory premises details and layout',
              'Quality control plan',
              'Manufacturing process flow chart',
              'Form V — Application for BIS licence',
              'Fee payment proof',
              'Product samples as required',
            ].map(d => (
              <li key={d} className="flex items-center gap-3 text-sm text-slate-700">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                </div>
                {d}
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500 mt-4">* Document requirements vary by product and certification scheme.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Estimated Timeline</h3>
          <div className="space-y-3">
            {[
              { phase: 'Application Submission', time: '1–2 weeks', color: 'bg-blue-500' },
              { phase: 'Laboratory Testing', time: '2–6 weeks', color: 'bg-purple-500' },
              { phase: 'BIS Review', time: '4–8 weeks', color: 'bg-yellow-500' },
              { phase: 'Factory Inspection', time: '2–4 weeks', color: 'bg-orange-500' },
              { phase: 'Licence Grant', time: '1–2 weeks', color: 'bg-green-500' },
            ].map(p => (
              <div key={p.phase} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${p.color} shrink-0`} />
                <span className="text-sm text-slate-700 flex-1">{p.phase}</span>
                <span className="text-xs font-medium text-slate-500">{p.time}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-4">* Timelines are approximate. Actual time depends on product complexity and application completeness.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#0D1B2A] to-[#1440A0] rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Ready to start your certification journey?</h3>
        <p className="text-blue-200 text-sm mb-6">BIS Mitra can guide you from product identification to certification action steps.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/ask" className="px-6 py-2.5 bg-white text-[#0D1B2A] rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors">
            Ask BIS Mitra
          </Link>
          <Link to="/standards" className="px-6 py-2.5 bg-white/10 text-white border border-white/20 rounded-xl font-semibold text-sm hover:bg-white/15 transition-colors">
            Find Your Standard
          </Link>
          <Link to="/laboratories" className="px-6 py-2.5 bg-white/10 text-white border border-white/20 rounded-xl font-semibold text-sm hover:bg-white/15 transition-colors">
            Find Testing Lab
          </Link>
        </div>
      </div>
    </div>
  );
}
