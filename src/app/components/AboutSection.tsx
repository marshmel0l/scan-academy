// About section — features + location banner
import { MapPin, Users, Zap, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { useAnimateOnce } from '../hooks/useAnimateOnce';

const fade = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0 },
};

export function AboutSection() {
  const { t } = useLanguage();
  const a = t('about');

  const header  = useAnimateOnce('about-header',  0.3);
  const cards   = useAnimateOnce('about-cards',   0.2);
  const banner  = useAnimateOnce('about-banner',  0.3);

  const features = [
    { icon: MapPin, title: a.feat_1_title, description: a.feat_1_desc },
    { icon: Users,  title: a.feat_2_title, description: a.feat_2_desc },
    { icon: Zap,    title: a.feat_3_title, description: a.feat_3_desc },
    { icon: Award,  title: a.feat_4_title, description: a.feat_4_desc },
  ];

  return (
    <section
      id="about"
      className="min-h-[100dvh] flex flex-col justify-center py-24 bg-white"
      style={{ borderTop: '1px solid var(--border-subtle)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          ref={header.ref as React.RefObject<HTMLDivElement>}
          variants={fade}
          initial="hidden"
          animate={header.shown ? 'show' : 'hidden'}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-blue-600 text-sm font-medium uppercase tracking-widest">
            {a.badge}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800 leading-snug">
            {a.title_1}{' '}
            <span className="text-blue-600">{a.title_brand}</span>
          </h2>
          <p className="mt-5 text-slate-500 text-lg leading-relaxed">
            {a.subtitle}
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div
          ref={cards.ref as React.RefObject<HTMLDivElement>}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={fade}
                initial="hidden"
                animate={cards.shown ? 'show' : 'hidden'}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-100 hover:bg-blue-50/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* How Location is Determined — Banner */}
        <motion.div
          ref={banner.ref as React.RefObject<HTMLDivElement>}
          variants={fade}
          initial="hidden"
          animate={banner.shown ? 'show' : 'hidden'}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-xl shadow-blue-500/20"
        >
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2">
              {a.banner_title}
            </h3>
            <p className="text-blue-100 leading-relaxed">
              {a.banner_desc}
            </p>
          </div>
          <Link
            to="/register"
            className="flex-shrink-0 inline-flex items-center justify-center bg-white text-blue-700 hover:bg-slate-50 px-6 py-3.5 rounded-xl text-sm font-bold shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            {a.banner_cta}
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
