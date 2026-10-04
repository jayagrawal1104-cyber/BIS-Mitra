import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DemoMode from './DemoMode';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Ask BIS Mitra', path: '/ask' },
  { label: 'Find Standards', path: '/standards' },
  { label: 'Tender Analyzer', path: '/tender-analyzer' },
  { label: 'Certification', path: '/certification' },
  { label: 'Laboratories', path: '/laboratories' },
  { label: 'Hallmarking', path: '/hallmarking' },
  { label: 'Resources', path: '/resources' },
  { label: 'Graph', path: '/graph' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/standards?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-nav shadow-lg' : 'bg-[#0D1B2A]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1A56DB] to-[#1440A0] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L14 5V9C14 12 11.5 14.5 9 16C6.5 14.5 4 12 4 9V5L9 2Z" fill="white" fillOpacity="0.9"/>
                  <path d="M7 9L8.5 10.5L11.5 7.5" stroke="#0D1B2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="text-white font-bold text-lg" style={{ fontFamily: 'Manrope, sans-serif' }}>BIS Mitra</span>
                <div className="text-xs text-blue-300 leading-none -mt-0.5 hidden sm:block">Standards Intelligence</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-blue-600/20 text-blue-300'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white transition-colors text-sm"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="hidden md:inline text-xs text-slate-400">Ctrl+K</span>
              </button>

              <Link
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 text-slate-300 hover:bg-white/15 hover:text-white transition-colors text-sm"
              >
                Dashboard
              </Link>

              <Link
                to="/ask"
                className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#1A56DB] text-white hover:bg-[#1440A0] transition-colors text-sm font-semibold"
              >
                Ask AI
              </Link>

              <button
                className="lg:hidden p-2 text-slate-300 hover:text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <div className={`w-5 space-y-1 transition-all ${mobileOpen ? 'opacity-0' : ''}`}>
                  <span className="block h-0.5 bg-current rounded"></span>
                  <span className="block h-0.5 bg-current rounded"></span>
                  <span className="block h-0.5 bg-current rounded"></span>
                </div>
                {mobileOpen && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0D1B2A] animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-blue-600/20 text-blue-300'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 flex items-start justify-center pt-24 px-4 animate-fade-in"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-slate-400 shrink-0">
                <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search standards, certifications, laboratories..."
                className="flex-1 text-lg text-slate-800 placeholder-slate-400 outline-none"
              />
              <kbd className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">ESC</kbd>
            </form>
            <div className="p-4 space-y-1">
              {['Find standards for water bottles', 'Mandatory certification products', 'BIS hallmarking process', 'LED certification requirements'].map(s => (
                <button
                  key={s}
                  onClick={() => { setSearchQuery(s); }}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-3"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-slate-400">
                    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {s}
                </button>
              ))}
            </div>
            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
              <span>↵ to search</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {[
            { path: '/', icon: '🏠', label: 'Home' },
            { path: '/ask', icon: '💬', label: 'Ask AI' },
            { path: '/standards', icon: '📚', label: 'Standards' },
            { path: '/documents', icon: '📄', label: 'Docs' },
            { path: '/dashboard', icon: '👤', label: 'Profile' },
          ].map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                isActive(item.path) ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <DemoMode />

      {/* Footer */}
      <footer className="bg-[#0D1B2A] text-slate-400 mt-auto hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1A56DB] to-[#1440A0] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2L14 5V9C14 12 11.5 14.5 9 16C6.5 14.5 4 12 4 9V5L9 2Z" fill="white" fillOpacity="0.9"/>
                    <path d="M7 9L8.5 10.5L11.5 7.5" stroke="#0D1B2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-white font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>BIS Mitra</span>
              </div>
              <p className="text-sm leading-relaxed">Evidence-first AI assistant for Indian Standards, BIS certification, and compliance intelligence.</p>
              <p className="text-xs mt-4 text-slate-600">Smart India Hackathon 2026 · SIH26107</p>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                {['Ask BIS Mitra', 'Find Standards', 'Tender Analyzer', 'Certification Guide'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                {['Laboratories', 'Hallmarking', 'Standards Comparison', 'Document Center'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold mb-4">Trust & Policy</h4>
              <ul className="space-y-2 text-sm">
                {['AI Transparency', 'Evidence Policy', 'Data Responsibility', 'About BIS Mitra'].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>BIS Mitra is an AI research assistant. It is not an official Bureau of Indian Standards service. Always verify important information with official BIS sources.</p>
            <div className="flex items-center gap-2 text-yellow-400/80">
              <span>🇮🇳</span>
              <span>Made for India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
