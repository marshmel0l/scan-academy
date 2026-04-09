// Offer/Pricing cards section
import { Clock, Wrench, Tag, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAnimateOnce } from '../hooks/useAnimateOnce';

const icons = [Clock, Wrench, Tag];
const highlights = [false, true, false];

export function OfferSection() {
  const { t } = useLanguage();
  const o = t('offer');

  const header = useAnimateOnce('offer-header', 0.3);
  const cardsA = useAnimateOnce('offer-cards',  0.2);

  return (
    <section
      className="py-24 bg-slate-50"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={header.ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 24 }}
          animate={header.shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-blue-600 text-sm font-medium uppercase tracking-widest">
            {o.badge}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 leading-snug">
            {o.title_1}{' '}
            <span className="text-blue-600">{o.title_price}</span>
          </h2>
          <p className="mt-4 text-slate-500 leading-relaxed">{o.subtitle}</p>
        </motion.div>

        {/* Cards Grid */}
        <div
          ref={cardsA.ref as React.RefObject<HTMLDivElement>}
          className="grid sm:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 w-full items-start"
        >
          {o.cards.map((card, i) => {
            const Icon = icons[i];
            const isHighlight = highlights[i];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 32 }}
                animate={cardsA.shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                  isHighlight
                    ? 'bg-blue-600 scale-105'
                    : 'bg-white border hover:shadow-xl hover:border-blue-100'
                }`}
                style={
                  isHighlight
                    ? { boxShadow: 'var(--shadow-blue)' }
                    : { borderColor: 'var(--border-light)', boxShadow: 'var(--shadow-card)' }
                }
              >
                {/* Popular badge */}
                {isHighlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                      {o.popular}
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    isHighlight ? 'bg-white/20' : 'bg-blue-50'
                  }`}
                >
                  <Icon className={`w-7 h-7 ${isHighlight ? 'text-white' : 'text-blue-600'}`} />
                </div>

                {/* Title & Subtitle */}
                <h3 className={`text-xl font-bold mb-1 ${isHighlight ? 'text-white' : 'text-slate-800'}`}>
                  {card.title}
                </h3>
                <p className={`text-sm mb-5 ${isHighlight ? 'text-blue-100' : 'text-slate-400'}`}>
                  {card.sub}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className={`text-4xl font-extrabold ${isHighlight ? 'text-white' : 'text-slate-800'}`}>
                    {card.price}
                  </span>
                  {card.period && (
                    <span className={`text-sm ms-1 ${isHighlight ? 'text-blue-200' : 'text-slate-400'}`}>
                      {card.period}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isHighlight ? 'text-blue-200' : 'text-blue-500'}`}
                      />
                      <span className={`text-sm ${isHighlight ? 'text-blue-100' : 'text-slate-600'}`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Single CTA button below cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={cardsA.shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex justify-center mt-12"
        >
          <a
            href="https://wa.me/201208124665"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
            style={{ boxShadow: 'var(--shadow-blue)' }}
          >
            {o.register_btn}
          </a>
        </motion.div>

      </div>
    </section>
  );
}