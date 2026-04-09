// X-Ray viewer panel — Light Mode shell, dark DICOM viewer
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const XRAY_IMAGES: Record<string, string> = {
  Chest: 'https://images.unsplash.com/photo-1616012480717-fd9867059ca0?w=700&q=80',
  Abdomen: 'https://images.unsplash.com/photo-1728347037609-d59ba357b703?w=700&q=80',
  Skull: 'https://images.unsplash.com/photo-1616012480717-fd9867059ca0?w=700&q=80',
  Extremities: 'https://images.unsplash.com/photo-1759338666693-9faec028c157?w=700&q=80',
};

const TIPS: Record<string, Record<string, string>> = {
  Chest: {
    Standing:
      'PA Chest (Standing): Gold standard. Patient stands upright facing the detector. Shoulders rotated forward to clear scapulae from lung fields. Best for cardiac silhouette and pulmonary assessment.',
    Lying:
      'AP Chest (Supine): Reserved for critically ill patients. Causes cardiac magnification and reduced lung volume. Not ideal for routine chest evaluation.',
  },
  Abdomen: {
    Standing:
      'Erect Abdomen: Used to detect free air under the diaphragm (perforation) or air-fluid levels (obstruction). Good supplemental view.',
    Lying:
      'Supine KUB: Standard abdominal projection. Good for bowel gas patterns, renal calculi, and general abdominal survey.',
  },
  Skull: {
    Standing:
      'Erect Skull: Less common, sometimes used for fluid levels in sinuses or trauma surveys.',
    Lying:
      'Supine Skull (AP/PA): Standard skull series includes AP, lateral, and Towne projections. Supine is common for trauma patients.',
  },
  Extremities: {
    Standing:
      'Weight-Bearing Extremity: Used for ankles, knees, and feet to assess alignment and joint space under physiologic load.',
    Lying:
      'Non-Weight-Bearing: Standard for most upper extremity and foot/ankle imaging. Reduces patient motion and discomfort.',
  },
};

interface XrayDisplayProps {
  exam: string;
  position: string;
}

export function XrayDisplay({ exam, position }: XrayDisplayProps) {
  const isCorrect = exam === 'Chest' && position === 'Standing';
  const tip = TIPS[exam]?.[position] ?? 'Select an exam and position to see guidance.';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Viewer toolbar — stays dark for DICOM authenticity */}
      <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-slate-400 text-xs font-mono">DICOM Viewer v2.4</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400 text-xs font-mono">
          <span>{exam.toUpperCase()}</span>
          <span>·</span>
          <span>{position.toUpperCase()}</span>
        </div>
      </div>

      {/* X-ray Image Display */}
      <div className="relative bg-black overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <ImageWithFallback
          src={XRAY_IMAGES[exam]}
          alt={`${exam} X-ray`}
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(100%) contrast(1.5) brightness(0.85) invert(1)' }}
        />

        {/* DICOM annotations */}
        <div className="absolute top-3 left-3 font-mono text-[10px] text-green-400 space-y-0.5 bg-black/50 backdrop-blur-sm rounded-lg p-2.5 leading-relaxed">
          <div>INSTITUTION: RAD TRAINING EG</div>
          <div>PATIENT: DEMO CASE</div>
          <div>DATE: {new Date().toLocaleDateString('en-US')}</div>
          <div>MODALITY: DX (Digital Radiography)</div>
          <div>EXAM: {exam.toUpperCase()} · {position.toUpperCase()}</div>
          <div>kVp: {exam === 'Chest' ? '120' : exam === 'Skull' ? '80' : '70'} | mAs: {exam === 'Chest' ? '4' : '8'}</div>
        </div>

        <div className="absolute top-3 right-3 font-mono text-[10px] text-yellow-400/70 text-right space-y-0.5">
          <div>W: 2000 L: 500</div>
          <div>ZOOM: 1.0x</div>
        </div>

        {/* Result Badge */}
        <div
          className={`absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold backdrop-blur-sm border transition-all duration-300 ${
            isCorrect
              ? 'bg-green-500/25 border-green-500/50 text-green-300'
              : 'bg-red-500/25 border-red-500/50 text-red-300'
          }`}
        >
          {isCorrect ? (
            <><CheckCircle2 className="w-4 h-4" /> Correct Position ✅</>
          ) : (
            <><AlertCircle className="w-4 h-4" /> Incorrect ❌</>
          )}
        </div>

        {/* Crosshair reticle */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5">
          <div className="relative w-32 h-32">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-green-400" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-green-400" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-green-400 rounded-full" />
          </div>
        </div>
      </div>

      {/* Positioning Tip */}
      <div
        className={`px-5 py-4 border-t flex items-start gap-3 transition-colors duration-300 ${
          isCorrect ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
        }`}
      >
        <Info className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isCorrect ? 'text-green-600' : 'text-blue-600'}`} />
        <p className={`text-sm leading-relaxed ${isCorrect ? 'text-green-700' : 'text-slate-600'}`}>
          {tip}
        </p>
      </div>
    </div>
  );
}
