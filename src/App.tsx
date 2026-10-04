import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AskPage from './pages/AskPage';
import StandardsPage from './pages/StandardsPage';
import StandardDetailPage from './pages/StandardDetailPage';
import TenderAnalyzerPage from './pages/TenderAnalyzerPage';
import CertificationPage from './pages/CertificationPage';
import LaboratoriesPage from './pages/LaboratoriesPage';
import HallmarkingPage from './pages/HallmarkingPage';
import DashboardPage from './pages/DashboardPage';
import ComparePage from './pages/ComparePage';
import GraphPage from './pages/GraphPage';
import OnboardingPage from './pages/OnboardingPage';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Page Not Found</h1>
      <p className="text-slate-500 mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="px-6 py-2.5 bg-[#1A56DB] text-white rounded-xl font-semibold text-sm hover:bg-[#1440A0] transition-colors">
        Go Home
      </a>
    </div>
  );
}

function ResourcesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-extrabold text-[#0D1B2A] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>Resources</h1>
      <p className="text-slate-500 mb-8">Official BIS resources and reference documents.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: 'BIS Website', desc: 'Official Bureau of Indian Standards website', icon: '🏛️' },
          { title: 'BIS CARE Portal', desc: 'BIS Conformity Assessment and Regulation', icon: '✅' },
          { title: 'Quality Control Orders', desc: 'Mandatory QCOs by Ministry', icon: '📋' },
          { title: 'Standards Catalogue', desc: 'Complete catalogue of Indian Standards', icon: '📚' },
          { title: 'NABL Directory', desc: 'National Accreditation Board for Laboratories', icon: '🔬' },
          { title: 'Hallmark Verification', desc: 'Verify BIS Hallmark via HUID', icon: '🏅' },
        ].map(r => (
          <div key={r.title} className="bg-white rounded-2xl border border-slate-200 p-5 card-hover">
            <div className="text-3xl mb-3">{r.icon}</div>
            <h3 className="font-bold text-slate-800 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>{r.title}</h3>
            <p className="text-sm text-slate-500">{r.desc}</p>
            <p className="text-xs text-blue-600 mt-3 font-medium">Visit official source →</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/ask" element={<AskPage />} />
                <Route path="/standards" element={<StandardsPage />} />
                <Route path="/standards/:id" element={<StandardDetailPage />} />
                <Route path="/tender-analyzer" element={<TenderAnalyzerPage />} />
                <Route path="/certification" element={<CertificationPage />} />
                <Route path="/laboratories" element={<LaboratoriesPage />} />
                <Route path="/hallmarking" element={<HallmarkingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/graph" element={<GraphPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/documents" element={<DashboardPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
