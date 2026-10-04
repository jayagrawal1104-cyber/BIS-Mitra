import { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'Is BIS Hallmarking mandatory?',
    a: 'BIS Hallmarking is mandatory for gold jewellery sold in India since June 2021 (for 14, 18, and 22 carat). Since April 2023, selling of gold jewellery without HUID-based hallmarking is prohibited. Always verify the current notification for specific exemptions.',
  },
  {
    q: 'What is HUID?',
    a: 'HUID stands for Hallmark Unique Identification. It is a 6-character alphanumeric code assigned to each piece of jewellery during hallmarking. It allows traceability of any hallmarked article.',
  },
  {
    q: 'Which precious metals require BIS Hallmarking?',
    a: 'Currently, BIS Hallmarking is mandatory for gold jewellery. Silver and platinum hallmarking is available on a voluntary basis, though mandatory requirements may be extended in future.',
  },
  {
    q: 'What is a BIS-recognized Assaying and Hallmarking Centre (AHC)?',
    a: 'An AHC is a laboratory licensed by BIS to test the purity of precious metals and apply hallmarks. Only AHC-hallmarked articles can bear the BIS Hallmark.',
  },
  {
    q: 'What do the symbols in a BIS Hallmark mean?',
    a: 'A complete BIS Hallmark includes the BIS logo (triangle), purity/fineness (e.g., 916 for 22K), and the HUID (6-character alphanumeric code). Earlier hallmarks also included year of marking and jeweller\'s mark.',
  },
];

export default function HallmarkingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Hallmarking</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0D1B2A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
          BIS Hallmarking
        </h1>
        <p className="text-slate-500 mt-1">
          Understanding purity certification for precious metal jewellery in India.
        </p>
      </div>

      {/* What is Hallmarking */}
      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="text-4xl mb-4">🏅</div>
          <h2 className="text-xl font-bold text-[#0D1B2A] mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
            What is BIS Hallmarking?
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            BIS Hallmarking is a purity certification scheme for precious metal articles. It provides an assurance of the
            fineness/purity of the precious metal. Hallmarking is governed by the Bureau of Indian Standards under
            the BIS Act 2016.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            For consumers, a BIS Hallmark guarantees that the jewellery has been independently tested and certified
            to meet the declared purity standard. This protects against under-caratage.
          </p>
        </div>

        <div className="bg-[#0D1B2A] rounded-2xl p-6 text-white">
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>How to Read a BIS Hallmark</h2>
          {/* Hallmark visual */}
          <div className="bg-white/10 rounded-xl p-6 mb-5">
            <div className="flex items-center justify-center gap-6">
              {[
                { symbol: '△', label: 'BIS Logo', sublabel: 'Bureau of Indian Standards' },
                { symbol: '916', label: 'Purity', sublabel: '22 Karat Gold' },
                { symbol: 'A1B2C3', label: 'HUID', sublabel: 'Unique ID Code' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-yellow-400/20 border-2 border-yellow-400/40 flex items-center justify-center mb-2">
                    <span className="text-yellow-300 font-bold text-lg" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{item.symbol}</span>
                  </div>
                  <div className="text-xs font-semibold text-yellow-300">{item.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-slate-400 text-xs">
            Mandatory since April 2023. Each piece has a unique HUID traceable through the BIS CARE portal.
          </p>
        </div>
      </div>

      {/* Purity standards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-[#0D1B2A] mb-5" style={{ fontFamily: 'Manrope, sans-serif' }}>Gold Purity Standards</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left pb-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">Carat</th>
                <th className="text-left pb-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">Fineness (Parts per 1000)</th>
                <th className="text-left pb-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">Purity</th>
                <th className="text-left pb-3 text-slate-500 font-semibold text-xs uppercase tracking-wider">Stamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { carat: '24 Karat', fineness: '999', purity: '99.9%', stamp: '999' },
                { carat: '23 Karat', fineness: '958', purity: '95.8%', stamp: '958' },
                { carat: '22 Karat', fineness: '916', purity: '91.6%', stamp: '916' },
                { carat: '21 Karat', fineness: '875', purity: '87.5%', stamp: '875' },
                { carat: '18 Karat', fineness: '750', purity: '75.0%', stamp: '750' },
                { carat: '17 Karat', fineness: '708', purity: '70.8%', stamp: '708' },
                { carat: '14 Karat', fineness: '585', purity: '58.5%', stamp: '585' },
                { carat: '9 Karat', fineness: '375', purity: '37.5%', stamp: '375' },
              ].map(row => (
                <tr key={row.carat}>
                  <td className="py-3 font-medium text-slate-800">{row.carat}</td>
                  <td className="py-3 text-slate-600">{row.fineness}</td>
                  <td className="py-3 text-slate-600">{row.purity}</td>
                  <td className="py-3 font-mono font-semibold text-[#0D1B2A] bg-yellow-50 px-2 rounded">{row.stamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-4">* Mandatory hallmarking currently applies to 14K, 18K, and 22K gold jewellery. Verify current notification for updates.</p>
      </div>

      {/* Process */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-[#0D1B2A] mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>Hallmarking Process</h2>
        <div className="grid sm:grid-cols-4 gap-4">
          {[
            { step: '01', title: 'Jeweller Registration', desc: 'Jeweller registers with BIS and obtains a licence to sell hallmarked jewellery.', icon: '📝' },
            { step: '02', title: 'Submit to AHC', desc: 'Jewellery is submitted to a BIS-recognized Assaying and Hallmarking Centre.', icon: '🏛️' },
            { step: '03', title: 'Testing & Assaying', desc: 'Purity of each article is independently tested at the AHC laboratory.', icon: '🔬' },
            { step: '04', title: 'HUID Assignment', desc: 'A unique 6-character HUID code is assigned and the hallmark is applied.', icon: '🏅' },
          ].map((s, i) => (
            <div key={i} className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className="text-3xl font-black text-yellow-200 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.step}</div>
              <h3 className="font-bold text-sm text-yellow-900 mb-1">{s.title}</h3>
              <p className="text-xs text-yellow-800 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-[#0D1B2A] mb-5" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-medium text-slate-800 text-sm">{faq.q}</span>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className={`shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''} text-slate-400`}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 animate-fade-in">
                  <p className="text-sm text-slate-600 leading-relaxed">{faq.a}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">△ Partially Verified</span>
                    <span className="text-xs text-slate-400">Verify with official BIS notifications</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-yellow-900 mb-1">Have questions about hallmarking?</h3>
          <p className="text-yellow-800 text-sm">Ask BIS Mitra for evidence-backed guidance on hallmarking requirements.</p>
        </div>
        <Link
          to="/ask?q=How does BIS hallmarking work for gold jewellery?"
          className="px-6 py-2.5 bg-[#0D1B2A] text-white rounded-xl text-sm font-semibold hover:bg-[#132338] transition-colors shrink-0"
        >
          Ask BIS Mitra
        </Link>
      </div>
    </div>
  );
}
