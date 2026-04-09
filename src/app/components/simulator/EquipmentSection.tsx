// Interactive X-ray equipment explorer — Light Mode
import { useState } from 'react';
import { X, Zap } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Hotspot {
  id: string;
  label: string;
  shortLabel: string;
  x: string;
  y: string;
  color: string;
  ringColor: string;
  badgeBg: string;
  badgeText: string;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'tube',
    label: 'X-Ray Tube',
    shortLabel: 'Tube',
    x: '38%',
    y: '22%',
    color: 'bg-blue-500',
    ringColor: 'ring-blue-400',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    description:
      'The X-ray tube is the heart of the radiographic system. It is a vacuum-sealed glass or metal envelope containing the cathode and anode. When powered, it converts electrical energy into X-ray photons and heat. The tube is housed in a protective lead-lined housing filled with oil for cooling and insulation.',
  },
  {
    id: 'cathode',
    label: 'Cathode (Filament)',
    shortLabel: 'Cathode',
    x: '22%',
    y: '42%',
    color: 'bg-purple-500',
    ringColor: 'ring-purple-400',
    badgeBg: 'bg-purple-50',
    badgeText: 'text-purple-700',
    description:
      'The cathode consists of a tungsten filament surrounded by a focusing cup (molybdenum). When heated by electrical current, the filament undergoes thermionic emission — releasing a cloud of electrons. The focusing cup creates an electrostatic field that directs the electron beam toward the focal spot on the anode. Filament size determines focal spot size and image sharpness.',
  },
  {
    id: 'anode',
    label: 'Rotating Anode',
    shortLabel: 'Anode',
    x: '58%',
    y: '42%',
    color: 'bg-orange-500',
    ringColor: 'ring-orange-400',
    badgeBg: 'bg-orange-50',
    badgeText: 'text-orange-700',
    description:
      'The anode (target) is a beveled tungsten-rhenium disk that rotates at 3,000–10,000 RPM during exposure. Only ~1% of electron kinetic energy is converted to X-rays via Bremsstrahlung and characteristic interactions; the remaining 99% becomes heat. Rotation distributes heat across a larger focal track area, preventing overheating and extending tube life.',
  },
  {
    id: 'generator',
    label: 'High-Voltage Generator',
    shortLabel: 'Generator',
    x: '78%',
    y: '68%',
    color: 'bg-green-500',
    ringColor: 'ring-green-400',
    badgeBg: 'bg-green-50',
    badgeText: 'text-green-700',
    description:
      'The high-frequency generator provides stable high-voltage power to the X-ray tube. It controls kVp (kilovoltage peak) — which determines beam energy and penetrating power — and mA (milliamperage) — which controls the number of electrons and therefore X-ray quantity. Modern solid-state generators achieve near-constant potential output for consistent, reproducible exposures.',
  },
  {
    id: 'control',
    label: 'Operator Console',
    shortLabel: 'Console',
    x: '18%',
    y: '72%',
    color: 'bg-red-500',
    ringColor: 'ring-red-400',
    badgeBg: 'bg-red-50',
    badgeText: 'text-red-700',
    description:
      'The operator control panel is located behind a lead-lined protective barrier. The radiographer sets exposure parameters: kVp (beam quality), mA and time or mAs (beam quantity), focal spot size, and collimation. Safety interlocks, backup timers, and rotor-ready indicators prevent accidental exposures and ensure equipment safety.',
  },
];

export function EquipmentSection() {
  const [active, setActive] = useState<Hotspot | null>(null);

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Section header */}
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-slate-900 font-semibold">X-Ray Equipment Explorer</h2>
              <p className="text-slate-500 text-sm mt-0.5">
                Click the glowing hotspots to learn about each component of the X-ray system
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Image with hotspots */}
          <div className="lg:flex-1 relative">
            <div className="relative w-full" style={{ height: '400px' }}>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758206523747-69af03fb56e4?w=900&q=80"
                alt="X-ray room equipment"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.65) saturate(0.7)' }}
              />
              {/* Overlay tint */}
              <div className="absolute inset-0 bg-blue-950/30" />

              {/* Hotspot buttons */}
              {HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActive(active?.id === spot.id ? null : spot)}
                  style={{ left: spot.x, top: spot.y }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                  aria-label={`Learn about ${spot.label}`}
                >
                  <div className={`absolute inset-0 rounded-full ${spot.color} opacity-30 animate-ping scale-150`} />
                  <div
                    className={`relative w-5 h-5 rounded-full ${spot.color} ring-2 ${spot.ringColor} ring-offset-1 ring-offset-transparent group-hover:scale-125 ${active?.id === spot.id ? 'scale-125' : ''} transition-transform duration-200 shadow-lg`}
                  />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm text-slate-900 text-xs px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-200 shadow-xl z-10">
                    {spot.shortLabel}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div className="lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col">
            {active ? (
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${active.badgeBg} ${active.badgeText}`}>
                    {active.label}
                  </span>
                  <button
                    onClick={() => setActive(null)}
                    className="text-slate-400 hover:text-slate-900 transition-colors ml-2 flex-shrink-0"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {active.description}
                </p>
              </div>
            ) : (
              <div className="flex-1">
                <p className="text-slate-500 text-sm mb-5">
                  🔍 Click any glowing dot on the image, or select a component below:
                </p>
                <div className="space-y-2">
                  {HOTSPOTS.map((spot) => (
                    <button
                      key={spot.id}
                      onClick={() => setActive(spot)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left hover:bg-gray-100 transition-colors group ${spot.badgeBg}`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${spot.color}`} />
                      <span className={`${spot.badgeText} group-hover:text-slate-900 transition-colors font-medium`}>
                        {spot.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
