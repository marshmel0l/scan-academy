// Root layout — wraps all pages with Navbar, Footer, language support, and page transitions
import { useEffect, useRef } from 'react';
import { useOutlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// Inner shell — reads language context to apply dir + font
function AppShell() {
  const { dir, isAr } = useLanguage();
  const location = useLocation();
  const element = useOutlet(); 

  return (
    <div
      dir={dir}
      className="min-h-screen flex flex-col bg-white" // Base background to white for seamless light transitions
      style={{
        fontFamily: isAr
          ? 'var(--font-arabic)'
          : 'var(--font-body)',
      }}
    >
      <AnimatePresence mode="wait">
        <PageWrapper key={location.pathname} location={location} element={element} />
      </AnimatePresence>
    </div>
  );
}

// Inner wrapper handles its own layout based on routing, so exit animations preserve the exact layout they had
import React from 'react'; // ensure React is available for cloneElement

function PageWrapper({ location, element }: { location: any, element: React.ReactElement | null }) {
  const isSimulator = location.pathname === '/simulator';

  const isMounted = useRef(false);

  // Ensures we only scroll or jump *after* this new route's page structure mounts.
  // On initial mount we always go to the top, ignoring any stale hash in the URL.
  useEffect(() => {
    if (!isMounted.current) {
      // First render — always start at the top regardless of URL hash
      isMounted.current = true;
      window.scrollTo(0, 0);
      return;
    }
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50); // small delay to ensure DOM layout
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: isSimulator ? 0.96 : 1, y: isSimulator ? 0 : 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: isSimulator ? 1.02 : 1, y: isSimulator ? 0 : -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex-1 w-full flex flex-col ${isSimulator ? 'h-screen overflow-hidden bg-[#0a0e17]' : 'min-h-screen bg-white'}`}
    >
      {!isSimulator && <Navbar />}

      <main className={`flex-1 flex flex-col w-full ${!isSimulator ? 'pt-[64px]' : ''}`}>
        {element ? React.cloneElement(element, { key: location.pathname }) : null}
      </main>

      {!isSimulator && <Footer />}
    </motion.div>
  );
}

export function Root() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}