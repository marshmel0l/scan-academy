// Educational video section — Light Mode
import { Play, BookOpen, GraduationCap } from 'lucide-react';

const KEY_POINTS = [
  'X-rays are produced when fast electrons decelerate suddenly in the anode',
  'Bremsstrahlung radiation produces a continuous spectrum of X-ray energies',
  'Characteristic radiation occurs at specific discrete energies unique to the target material',
  'kVp controls beam penetrating power (quality) — higher kVp = more energetic photons',
  'mAs controls the number of X-ray photons (quantity) — affects image density',
  'Tungsten is used as the anode target due to its high atomic number and melting point',
  'Only ~1% of electron energy converts to X-rays; the rest becomes heat',
];

export function VideoSection() {
  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-red-600 fill-red-600" />
            </div>
            <div>
              <h2 className="text-slate-900 font-semibold">Educational Video</h2>
              <p className="text-slate-500 text-sm mt-0.5">
                How X-rays are produced — physics and clinical relevance
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* YouTube Embed */}
          <div className="lg:flex-1">
            <div className="relative bg-black" style={{ aspectRatio: '16/9' }}>
              <iframe
                src="https://www.youtube.com/embed/Ic-I4KBhB44?rel=0&modestbranding=1"
                title="How X-rays are Produced — Radiology Education"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Key Learning Points */}
          <div className="lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-gray-200">
            <div className="flex items-center gap-2 mb-5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h3 className="text-slate-900 font-medium text-sm">Key Learning Points</h3>
            </div>
            <ul className="space-y-3">
              {KEY_POINTS.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <span className="text-blue-600 font-bold flex-shrink-0 mt-0.5">→</span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* CTA to register */}
            <div className="mt-8 pt-5 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span className="text-slate-700 text-sm font-medium">
                  Want to practice for real?
                </span>
              </div>
              <a
                href="/#register"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-xl transition-colors duration-200"
              >
                Join the Workshop — 250 EGP
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
