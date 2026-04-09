// SimulatorPage — fullscreen dark-mode, no Navbar/Footer
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { ChestXrayExplorer } from '../components/simulator/ChestXrayExplorer';
import { LanguageProvider } from '../contexts/LanguageContext';

function SimulatorShell() {
  return (
    <div
      className="flex flex-col"
      style={{
        width: '100vw',
        height: '100dvh',
        background: '#0a0e17',
        overflow: 'hidden',
      }}
    >
      {/* Slim top bar */}
      <header
        className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6"
        style={{
          height: '48px',
          background: 'rgba(255,255,255,0.02)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Back to site */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-[#8b9fbe] hover:text-cyan-400 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">الرئيسية</span>
        </Link>

        {/* Logo + title */}
        <div className="flex items-center gap-2.5">
          <span className="text-white font-semibold text-sm tracking-wide">
            محاكي الأشعة التشخيصية
          </span>
          <img
            src="/logo.png"
            alt="Scan Academy"
            className="h-8 w-8 object-contain"
            draggable={false}
          />
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-xs font-medium hidden sm:inline">LIVE</span>
        </div>
      </header>

      {/* Simulator fills remaining height */}
      <div className="flex-1 overflow-hidden">
        <ChestXrayExplorer />
      </div>
    </div>
  );
}

export function SimulatorPage() {
  return (
    <LanguageProvider>
      <SimulatorShell />
    </LanguageProvider>
  );
}