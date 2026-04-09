// Social proof section — infinite auto-scroll testimonials carousel (pauses on hover)
import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { useAnimateOnce } from '../hooks/useAnimateOnce';

interface Testimonial {
  name: string;
  college: string;
  text: string;
  photo: string;
  rating: number;
  governorate: string;
}

const testimonialsAr: Testimonial[] = [
  {
    name: 'نور أحمد',
    college: 'كلية الطب، جامعة القاهرة',
    text: 'تجربة مذهلة! ما كنت أتخيل إني هشتغل على جهاز أشعة وأنا لسه طالبة، لكن الورشة دي خلت ده ممكن. المدربون كانوا صبورين ومتخصصين وشغوفين بشكل حقيقي.',
    photo: 'https://images.unsplash.com/photo-1673865641073-4479f93a7776?w=200&q=80',
    rating: 5,
    governorate: 'القاهرة',
  },
  {
    name: 'محمد حسن',
    college: 'المعهد العالي للتكنولوجيا الصحية، الجيزة',
    text: 'يستاهل كل قرش! التدريب العملي على أجهزة حقيقية هو حاجة مش هتلاقيها في الكتب أبداً. خرجت من الورشة بثقة عملية ما كانتش عندي قبل كده.',
    photo: 'https://images.unsplash.com/photo-1659353888242-e7c29b331c61?w=200&q=80',
    rating: 5,
    governorate: 'الجيزة',
  },
  {
    name: 'سارة مصطفى',
    college: 'كلية العلوم الصحية التطبيقية، الإسكندرية',
    text: 'الورشة جات للإسكندرية بسبب العدد الكبير من التسجيلات من مدينتنا! أحببت الأسلوب — يومين من التدريب العملي الحقيقي مع توجيه متخصص. أنصح بشدة!',
    photo: 'https://images.unsplash.com/photo-1731027613642-7720820edc1b?w=200&q=80',
    rating: 5,
    governorate: 'الإسكندرية',
  },
  {
    name: 'ليلى إبراهيم',
    college: 'كلية العلوم الطبية التطبيقية، المنصورة',
    text: 'انبهرت بجودة التدريب والبيئة السريرية الحقيقية. التشغيل الفعلي لجهاز الأشعة أعطاني دفعة ثقة كبيرة قبل دخول المستشفى.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
    rating: 5,
    governorate: 'الدقهلية',
  },
  {
    name: 'يوسف كمال',
    college: 'المعهد العالي للتكنولوجيا الصحية، أسيوط',
    text: 'قيمة استثنائية مقابل السعر. الشهادة معتمدة والمهارا اللي اكتسبتها في يومين كانت أكثر عملياً من فصل دراسي كامل من النظريات. 10/10.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
    governorate: 'أسيوط',
  },
  {
    name: 'رانيا عادل',
    college: 'كلية الطب، جامعة عين شمس',
    text: 'أسلوب المجموعات الصغيرة معناه إن كل طالب أخد وقت فردي مع الجهاز. المدربون صوّبوا أسلوبي في الوقت الحقيقي — ده تغذية راجعة لا تقدر بثمن.',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    rating: 5,
    governorate: 'القاهرة',
  },
];

const testimonialsEn: Testimonial[] = [
  {
    name: 'Nour Ahmed',
    college: 'Faculty of Medicine, Cairo University',
    text: "An incredible experience! I never imagined I'd operate an X-ray machine as a student, but this workshop made it possible. The instructors were patient, knowledgeable, and genuinely passionate.",
    photo: 'https://images.unsplash.com/photo-1673865641073-4479f93a7776?w=200&q=80',
    rating: 5,
    governorate: 'Cairo',
  },
  {
    name: 'Mohamed Hassan',
    college: 'Higher Institute of Health Technology, Giza',
    text: "Worth every penny! The hands-on practice with real equipment is something you simply cannot get from textbooks. I left the workshop with practical confidence I didn't have before.",
    photo: 'https://images.unsplash.com/photo-1659353888242-e7c29b331c61?w=200&q=80',
    rating: 5,
    governorate: 'Giza',
  },
  {
    name: 'Sara Mostafa',
    college: 'Faculty of Allied Health Sciences, Alexandria',
    text: 'The workshop came to Alexandria because of the high registrations from our city! Loved the format — 2 days of pure hands-on learning with expert guidance. Highly recommended!',
    photo: 'https://images.unsplash.com/photo-1731027613642-7720820edc1b?w=200&q=80',
    rating: 5,
    governorate: 'Alexandria',
  },
  {
    name: 'Layla Ibrahim',
    college: 'Faculty of Applied Medical Sciences, Mansoura',
    text: 'I was amazed by the quality of instruction and the real clinical setting. Operating actual X-ray equipment gave me a massive confidence boost before entering the hospital.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80',
    rating: 5,
    governorate: 'Dakahlia',
  },
  {
    name: 'Youssef Kamal',
    college: 'Higher Institute of Health Technology, Assiut',
    text: 'Exceptional value for money. The certification is recognized and the skills I gained in just 2 days were more practical than a whole semester of theory. 10/10 would recommend.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 5,
    governorate: 'Asyut',
  },
  {
    name: 'Rania Adel',
    college: 'Faculty of Medicine, Ain Shams University',
    text: 'The small group format meant every student got individual time with the equipment. The instructors corrected my technique in real time — that feedback is priceless.',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
    rating: 5,
    governorate: 'Cairo',
  },
];

const fade = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0 },
};

export function SocialProofSection() {
  const [paused, setPaused] = useState(false);

  const sectionHeader  = useAnimateOnce('social-header',   0.3);
  const sectionCarousel = useAnimateOnce('social-carousel', 0.2);
  const { t, isAr } = useLanguage();
  const tr = t('testimonials');

  const testimonials = isAr ? testimonialsAr : testimonialsEn;
  const looped = [...testimonials, ...testimonials];

  return (
    <section
      className="py-24 bg-slate-50 overflow-hidden border-t border-slate-200"
    >
      {/* Marquee keyframes */}
      <style>{`
        @keyframes sa-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .sa-marquee-track {
          animation: sa-marquee 34s linear infinite;
          will-change: transform;
        }
        .sa-marquee-track.sa-paused {
          animation-play-state: paused;
        }
        /* RTL: scroll in reverse direction */
        [dir="rtl"] .sa-marquee-track {
          animation-name: sa-marquee-rtl;
        }
        @keyframes sa-marquee-rtl {
          0%   { transform: translateX(0); }
          100% { transform: translateX(50%); }
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={sectionHeader.ref as React.RefObject<HTMLDivElement>}
          variants={fade}
          initial="hidden"
          animate={sectionHeader.shown ? 'show' : 'hidden'}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 text-sm font-medium uppercase tracking-widest">
            {tr.badge}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-800">
            {tr.title}
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            {tr.subtitle}
          </p>
        </motion.div>
      </div>

      {/* Infinite Scroll Carousel */}
      <motion.div
        ref={sectionCarousel.ref as React.RefObject<HTMLDivElement>}
        variants={fade}
        initial="hidden"
        animate={sectionCarousel.shown ? 'show' : 'hidden'}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Edge fade masks */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10"
          style={{ background: 'linear-gradient(90deg, #F8FAFC 0%, transparent 100%)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 pointer-events-none z-10"
          style={{ background: 'linear-gradient(270deg, #F8FAFC 0%, transparent 100%)' }}
        />

        {/* Scrolling track */}
        <div
          className={`sa-marquee-track flex gap-5 pb-2 pt-1${paused ? ' sa-paused' : ''}`}
          style={{ width: 'max-content' }}
        >
          {looped.map((card, i) => (
            <div
              key={`${card.name}-${i}`}
              className="w-[320px] sm:w-[370px] flex-shrink-0 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-500/5 cursor-default select-none"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: card.rating }).map((_, idx) => (
                  <span key={idx} className="text-amber-400">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-4">
                "{card.text}"
              </p>

              {/* Author */}
              <div
                className="flex items-center gap-3 pt-4 border-t border-slate-100"
              >
                <ImageWithFallback
                  src={card.photo}
                  alt={card.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-100 flex-shrink-0"
                />
                <div>
                  <div className="font-semibold text-slate-800 text-sm">{card.name}</div>
                  <div className="text-slate-400 text-xs leading-tight mt-0.5">{card.college}</div>
                  <div className="text-blue-500 text-xs mt-0.5">📍 {card.governorate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pause hint */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-400 text-xs mt-6 tracking-wide">
          {paused ? tr.hint_paused : tr.hint_move}
        </p>
      </div>
    </section>
  );
}