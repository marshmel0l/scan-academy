// Final call-to-action section with primary and WhatsApp CTAs
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAnimateOnce } from '../hooks/useAnimateOnce';

export function FinalCTA() {
  const { t } = useLanguage();
  const c = t('finalcta');

  const section = useAnimateOnce('finalcta-section', 0.2);

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{
        background: 'var(--grad-cta)',
        borderTop: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.03] rounded-full pointer-events-none" />

      <div
        ref={section.ref as React.RefObject<HTMLDivElement>}
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={section.shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-sm px-4 py-2 rounded-full mb-8"
        >
          {c.badge}
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={section.shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight"
        >
          {c.title_1}{' '}
          <span className="text-blue-200">{c.title_brand}</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={section.shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {c.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={section.shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://wa.me/201208124665"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 flex-shrink-0" />
            {c.cta_whatsapp}
          </a>
        </motion.div>

        {/* Micro trust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={section.shown ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-10 flex flex-wrap justify-center gap-6 text-blue-200 text-sm"
        >
          <span>{c.trust_1}</span>
          <span>{c.trust_2}</span>
          <span>{c.trust_3}</span>
        </motion.div>
      </div>
    </section>
  );
}
