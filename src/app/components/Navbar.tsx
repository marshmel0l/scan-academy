// Floating navbar — fixed position, rounded pill, glassmorphism style
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ClipboardList, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { Logo } from './Logo';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [switchingState, setSwitchingState] = useState<{ target: 'ar' | 'en'; source: 'ar' | 'en' } | null>(null);
  const [showTargetText, setShowTargetText] = useState(false);
  const location = useLocation();
  const { lang, setLang, t, isAr } = useLanguage();
  const n = t('navbar');

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  // Elevate shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/',          label: n.home },
    { href: '/simulator', label: n.simulator },
    { href: '/pricing',   label: n.pricing },
  ];

  const handleLangToggle = () => {
    if (switchingState) return;
    const target = lang === 'ar' ? 'en' : 'ar';
    setSwitchingState({ target, source: lang });
    setShowTargetText(false);
    
    // Pause briefly, then trigger the big text swipe animation
    setTimeout(() => setShowTargetText(true), 600);
    
    // Change language midway through the swipe
    setTimeout(() => setLang(target), 1200);
    
    // Fade out white screen
    setTimeout(() => {
      setSwitchingState(null);
    }, 2000);
  };

  return (
    <>
      <AnimatePresence>
        {switchingState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-white flex items-center justify-center pointer-events-auto"
            style={{ margin: 0, padding: 0 }}
          >
            <div className="relative h-64 w-full flex justify-center items-center overflow-hidden">
              <AnimatePresence mode="popLayout">
                {!showTargetText ? (
                  <motion.div
                    key="source"
                    initial={{ x: 0, opacity: 1, color: '#0f172a' }}
                    exit={{ x: switchingState.source === 'en' ? -200 : 200, opacity: 0, color: '#94a3b8', scale: 0.9 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 text-center text-8xl sm:text-9xl font-bold"
                    style={{ fontFamily: switchingState.source === 'ar' ? 'var(--font-arabic)' : 'var(--font-body)' }}
                  >
                    {switchingState.source === 'ar' ? 'ع' : 'EN'}
                  </motion.div>
                ) : (
                  <motion.div
                    key="target"
                    initial={{ x: switchingState.target === 'en' ? -200 : 200, opacity: 0, color: '#94a3b8', scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, color: '#0f172a', scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 text-center text-8xl sm:text-9xl font-bold"
                    style={{ fontFamily: switchingState.target === 'ar' ? 'var(--font-arabic)' : 'var(--font-body)' }}
                  >
                    {switchingState.target === 'ar' ? 'ع' : 'EN'}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        <motion.nav
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          className="pointer-events-auto w-full"
        >
          {/* Full-width bar — radius only on bottom corners */}
          <div
            className={`border-b border-slate-200/90 transition-all duration-300 ${
              scrolled
                ? 'bg-white/97'
                : 'bg-white/92'
            }`}
            style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
          >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-[60px] gap-4">

                {/* Logo */}
                <Link 
                  to="/" 
                  className="flex items-center gap-2.5 group flex-shrink-0"
                  onClick={(e) => {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  <Logo className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-105" />
                  <div className="leading-none hidden sm:block">
                    <div className="text-slate-900 font-bold text-base tracking-tight">
                      Scan <span className="text-blue-600">Academy</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      {isAr ? 'تدريب الأشعة الطبية' : 'Medical Radiology Courses'}
                    </div>
                  </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={(e) => {
                        if (link.href === '/' && location.pathname === '/') {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`relative text-sm font-medium transition-colors duration-200 ${
                        location.pathname === link.href
                          ? 'text-blue-600'
                          : 'text-slate-500 hover:text-blue-600'
                      }`}
                    >
                      {link.label}
                      {location.pathname === link.href && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 inset-x-0 h-0.5 bg-blue-500 rounded-full"
                        />
                      )}
                    </Link>
                  ))}

                  <button
                    onClick={handleLangToggle}
                    className="flex items-center gap-1.5 border border-slate-200 hover:border-blue-300 bg-slate-50 hover:bg-blue-50 text-slate-500 hover:text-blue-700 px-3 py-1.5 rounded-xl transition-all duration-200 font-semibold text-[11px]"
                    title={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
                  >
                    <span style={{ fontFamily: 'var(--font-arabic)' }} className={`text-xs ${lang === 'ar' ? 'text-blue-600 font-bold' : ''}`}>ع</span>
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    <span style={{ fontFamily: 'var(--font-body)' }} className={`tracking-wider ${lang === 'en' ? 'text-blue-600 font-bold' : ''}`}>EN</span>
                  </button>

                  <Link
                    to="/register"
                    className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-px"
                  >
                    <ClipboardList className="w-3.5 h-3.5 flex-shrink-0" />
                    {n.register}
                  </Link>
                </div>

                {/* Mobile: Language Toggle + Hamburger */}
                <div className="md:hidden flex items-center gap-2">
                  <button
                    onClick={handleLangToggle}
                    className="flex items-center gap-1 border border-slate-200 bg-slate-50 text-slate-500 px-2 py-1.5 rounded-xl transition-colors hover:border-blue-300 hover:text-blue-600 font-semibold text-[10px]"
                    title={lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
                  >
                    <span style={{ fontFamily: 'var(--font-arabic)' }} className={`text-[11px] ${lang === 'ar' ? 'text-blue-600 font-bold' : ''}`}>ع</span>
                    <Globe className="w-3 h-3 text-slate-400" />
                    <span style={{ fontFamily: 'var(--font-body)' }} className={`tracking-wider ${lang === 'en' ? 'text-blue-600 font-bold' : ''}`}>EN</span>
                  </button>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-9 h-9 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                    aria-label="Toggle menu"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={isOpen ? 'close' : 'open'}
                        initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                        transition={{ duration: 0.18 }}
                      >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Dropdown — expands inside the pill */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.24, ease: 'easeInOut' }}
                  className="md:hidden overflow-hidden"
                  style={{ borderTop: '1px solid rgb(0 0 0 / 0.06)' }}
                >
                  <div className="px-4 py-3 space-y-1 pb-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={(e) => {
                          setIsOpen(false);
                          if (link.href === '/' && location.pathname === '/') {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className={`flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          location.pathname === link.href
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <div className="pt-2">
                      <Link
                        to="/register"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-1.5 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        <ClipboardList className="w-3.5 h-3.5" />
                        {n.register}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      </div>
    </>
  );
}