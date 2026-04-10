// Body Region Positioning Simulator — Dark Mode
// Matches the reference design: full-body skeleton → select region → positioning view
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

interface BodyRegion {
  id: string;
  label: string;
  labelAr: string;
  /** Clickable region coords on the skeleton (percentage of image dimensions) */
  x: string;
  y: string;
  parts: BodyPart[];
}

interface BodyPart {
  id: string;
  label: string;
  labelAr: string;
}

interface View {
  id: string;
  label: string;
  labelAr: string;
}

interface TechParams {
  kvp: number;
  mas: number;
  exposureTime: number; // seconds
  distance: number; // cm
}

interface CommonCase {
  id: string;
  titleAr: string;
  title: string;
  badge: 'NORMAL' | 'FRACTURE' | 'DISLOCATION';
  descAr: string;
  desc: string;
}

// Image mapping from your images folder
const EXAM_IMAGES: Record<string, Record<string, string>> = {
  hand: {
    PA: '/images/hand-pa.jpg',
    LAT: '/images/hand-lat.jpg',
    OBL: '/images/hand-obl.jpg',
  },
  wrist: {
    PA: '/images/wrist-pa.jpg',
    LAT: '/images/wrist-lat.jpg',
    OBL: '/images/wrist-obl.jpg',
  },
  forearm: {
    AP: '/images/forearm-ap.jpg',
    LAT: '/images/forearm-lat.jpg',
  },
  elbow: {
    AP: '/images/elbow-ap.jpg',
    LAT: '/images/elbow-lat.jpg',
    OBL: '/images/elbow-obl.jpg',
  },
  humerus: {
    AP: '/images/humerus-ap.jpg',
    LAT: '/images/humerus-lat.jpg',
  },
  shoulder: {
    AP: '/images/shoulder-joint-ap.jpg',
    LAT: '/images/shoulder-joint-lat.jpg',
  },
  knee: {
    AP: '/images/knee-ap.jpg',
    LAT: '/images/knee-lat.jpg',
    OBL: '/images/knee-obl.jpg',
  },
  ankle: {
    AP: '/images/ankle-ap.jpg',
    LAT: '/images/ankle-lat.jpg',
    OBL: '/images/ankle-obl.jpg',
  },
  foot: {
    AP: '/images/foot-ap.jpg',
    LAT: '/images/foot-lat.jpg',
    OBL: '/images/foot-obl.jpg',
  },
  chest: {
    PA: '/images/chest-pa.jpg',
    LAT: '/images/chest-lat.jpg',
    AP: '/images/chest-ap.jpg',
  },
};

function getExamImage(partId: string, viewId: string): string | null {
  const partImages = EXAM_IMAGES[partId];
  if (!partImages) return null;
  return partImages[viewId] || Object.values(partImages)[0] || null;
}

const VIEWS: View[] = [
  { id: 'PA', label: 'PA', labelAr: 'أمامي خلفي' },
  { id: 'LAT', label: 'LAT', labelAr: 'جانبي' },
  { id: 'AP', label: 'AP', labelAr: 'خلفي أمامي' },
  { id: 'OBL', label: 'OBL', labelAr: 'مائل' },
];

const BODY_REGIONS: BodyRegion[] = [
  {
    id: 'head',
    label: 'Head',
    labelAr: 'الرأس',
    x: '50%',
    y: '8%',
    parts: [
      { id: 'skull', label: 'Skull', labelAr: 'الجمجمة' },
      { id: 'sinuses', label: 'Sinuses', labelAr: 'الجيوب الأنفية' },
      { id: 'jaw', label: 'Jaw', labelAr: 'الفك' },
      { id: 'cervical', label: 'Cervical Spine', labelAr: 'الفقرات العنقية' },
    ],
  },
  {
    id: 'chest',
    label: 'Chest',
    labelAr: 'الصدر',
    x: '50%',
    y: '28%',
    parts: [
      { id: 'chest', label: 'Chest', labelAr: 'القفص الصدري' },
      { id: 'ribs', label: 'Ribs', labelAr: 'الأضلاع' },
      { id: 'heart', label: 'Heart', labelAr: 'القلب' },
      { id: 'lungs', label: 'Lungs', labelAr: 'الرئتان' },
    ],
  },
  {
    id: 'shoulder',
    label: 'Shoulder',
    labelAr: 'الكتف',
    x: '32%',
    y: '22%',
    parts: [
      { id: 'shoulder', label: 'Shoulder Joint', labelAr: 'مفصل الكتف' },
      { id: 'clavicle', label: 'Clavicle', labelAr: 'الترقوة' },
      { id: 'scapula', label: 'Scapula', labelAr: 'عظم اللوح' },
    ],
  },
  {
    id: 'shoulder-r',
    label: 'Shoulder',
    labelAr: 'الكتف',
    x: '68%',
    y: '22%',
    parts: [
      { id: 'shoulder', label: 'Shoulder Joint', labelAr: 'مفصل الكتف' },
      { id: 'clavicle', label: 'Clavicle', labelAr: 'الترقوة' },
      { id: 'scapula', label: 'Scapula', labelAr: 'عظم اللوح' },
    ],
  },
  {
    id: 'humerus',
    label: 'Arm',
    labelAr: 'الذراع',
    x: '22%',
    y: '38%',
    parts: [
      { id: 'humerus', label: 'Humerus', labelAr: 'العضد' },
      { id: 'elbow', label: 'Elbow', labelAr: 'الكوع' },
    ],
  },
  {
    id: 'humerus-r',
    label: 'Arm',
    labelAr: 'الذراع',
    x: '78%',
    y: '38%',
    parts: [
      { id: 'humerus', label: 'Humerus', labelAr: 'العضد' },
      { id: 'elbow', label: 'Elbow', labelAr: 'الكوع' },
    ],
  },
  {
    id: 'wrist',
    label: 'Wrist',
    labelAr: 'الرسغ',
    x: '22%',
    y: '55%',
    parts: [
      { id: 'wrist', label: 'Wrist', labelAr: 'الرسغ' },
      { id: 'hand', label: 'Hand', labelAr: 'اليد' },
      { id: 'forearm', label: 'Forearm', labelAr: 'الساعد' },
    ],
  },
  {
    id: 'wrist-r',
    label: 'Wrist',
    labelAr: 'الرسغ',
    x: '78%',
    y: '55%',
    parts: [
      { id: 'wrist', label: 'Wrist', labelAr: 'الرسغ' },
      { id: 'hand', label: 'Hand', labelAr: 'اليد' },
      { id: 'forearm', label: 'Forearm', labelAr: 'الساعد' },
    ],
  },
  {
    id: 'spine',
    label: 'Spine',
    labelAr: 'العمود الفقري',
    x: '50%',
    y: '42%',
    parts: [
      { id: 'thoracic', label: 'Thoracic Spine', labelAr: 'الفقرات الصدرية' },
      { id: 'lumbar', label: 'Lumbar Spine', labelAr: 'الفقرات القطنية' },
      { id: 'sacral', label: 'Sacrum', labelAr: 'العجز' },
    ],
  },
  {
    id: 'pelvis',
    label: 'Pelvis',
    labelAr: 'الحوض',
    x: '50%',
    y: '52%',
    parts: [
      { id: 'pelvis', label: 'Pelvis', labelAr: 'عظام الحوض' },
      { id: 'hip', label: 'Hip Joint', labelAr: 'مفصل الورك' },
    ],
  },
  {
    id: 'digestive',
    label: 'Digestive',
    labelAr: 'الجهاز الهضمي',
    x: '50%',
    y: '46%',
    parts: [
      { id: 'esophagus', label: 'Esophagus', labelAr: 'المريء' },
      { id: 'stomach', label: 'Stomach', labelAr: 'المعدة' },
      { id: 'intestines', label: 'Intestines', labelAr: 'الأمعاء' },
    ],
  },
  {
    id: 'knee',
    label: 'Knee',
    labelAr: 'الركبة',
    x: '46%',
    y: '70%',
    parts: [
      { id: 'knee', label: 'Knee', labelAr: 'الركبة' },
      { id: 'tibia', label: 'Tibia/Fibula', labelAr: 'الساق' },
    ],
  },
  {
    id: 'knee-r',
    label: 'Knee',
    labelAr: 'الركبة',
    x: '54%',
    y: '70%',
    parts: [
      { id: 'knee', label: 'Knee', labelAr: 'الركبة' },
      { id: 'tibia', label: 'Tibia/Fibula', labelAr: 'الساق' },
    ],
  },
  {
    id: 'ankle',
    label: 'Ankle',
    labelAr: 'الكاحل',
    x: '46%',
    y: '88%',
    parts: [
      { id: 'ankle', label: 'Ankle', labelAr: 'الكاحل' },
      { id: 'foot', label: 'Foot', labelAr: 'القدم' },
    ],
  },
  {
    id: 'ankle-r',
    label: 'Ankle',
    labelAr: 'الكاحل',
    x: '54%',
    y: '88%',
    parts: [
      { id: 'ankle', label: 'Ankle', labelAr: 'الكاحل' },
      { id: 'foot', label: 'Foot', labelAr: 'القدم' },
    ],
  },
];

// Technical parameters per body part + view (from your HTML file)
const TECH_PARAMS: Record<string, Record<string, TechParams>> = {
  // Head & Skull
  skull: {
    AP: { kvp: 75, mas: 15, exposureTime: 0.20, distance: 100 },
    LAT: { kvp: 75, mas: 15, exposureTime: 0.20, distance: 100 },
    PA: { kvp: 75, mas: 15, exposureTime: 0.20, distance: 100 },
  },
  sinuses: {
    PA: { kvp: 75, mas: 10, exposureTime: 0.15, distance: 100 },
    LAT: { kvp: 75, mas: 10, exposureTime: 0.15, distance: 100 },
  },
  cervical: {
    AP: { kvp: 76, mas: 8, exposureTime: 0.10, distance: 183 },
    LAT: { kvp: 76, mas: 8, exposureTime: 0.10, distance: 183 },
    OBL: { kvp: 76, mas: 8, exposureTime: 0.10, distance: 183 },
  },
  // Chest
  chest: {
    PA: { kvp: 110, mas: 10, exposureTime: 0.02, distance: 180 },
    LAT: { kvp: 110, mas: 12, exposureTime: 0.03, distance: 180 },
    AP: { kvp: 96, mas: 8, exposureTime: 0.03, distance: 100 },
  },
  ribs: {
    AP: { kvp: 75, mas: 10, exposureTime: 0.10, distance: 100 },
    OBL: { kvp: 75, mas: 10, exposureTime: 0.10, distance: 100 },
  },
  // Shoulder & Arm
  shoulder: {
    AP: { kvp: 75, mas: 8, exposureTime: 0.10, distance: 100 },
    LAT: { kvp: 75, mas: 8, exposureTime: 0.10, distance: 100 },
  },
  humerus: {
    AP: { kvp: 70, mas: 6, exposureTime: 0.08, distance: 100 },
    LAT: { kvp: 70, mas: 6, exposureTime: 0.08, distance: 100 },
  },
  elbow: {
    AP: { kvp: 60, mas: 5, exposureTime: 0.06, distance: 100 },
    LAT: { kvp: 60, mas: 5, exposureTime: 0.06, distance: 100 },
    OBL: { kvp: 60, mas: 5, exposureTime: 0.06, distance: 100 },
  },
  forearm: {
    AP: { kvp: 60, mas: 4, exposureTime: 0.05, distance: 100 },
    LAT: { kvp: 60, mas: 4, exposureTime: 0.05, distance: 100 },
  },
  wrist: {
    PA: { kvp: 55, mas: 4, exposureTime: 0.05, distance: 100 },
    LAT: { kvp: 55, mas: 4, exposureTime: 0.05, distance: 100 },
    OBL: { kvp: 55, mas: 4, exposureTime: 0.05, distance: 100 },
  },
  hand: {
    PA: { kvp: 50, mas: 2.5, exposureTime: 0.04, distance: 100 },
    LAT: { kvp: 50, mas: 2.5, exposureTime: 0.04, distance: 100 },
    OBL: { kvp: 50, mas: 2.5, exposureTime: 0.04, distance: 100 },
  },
  // Spine
  thoracic: {
    AP: { kvp: 80, mas: 15, exposureTime: 0.30, distance: 100 },
    LAT: { kvp: 85, mas: 20, exposureTime: 0.40, distance: 100 },
  },
  lumbar: {
    AP: { kvp: 80, mas: 20, exposureTime: 0.40, distance: 100 },
    LAT: { kvp: 90, mas: 30, exposureTime: 0.60, distance: 100 },
    OBL: { kvp: 85, mas: 25, exposureTime: 0.50, distance: 100 },
  },
  // Pelvis & Hip
  pelvis: {
    AP: { kvp: 80, mas: 20, exposureTime: 0.40, distance: 100 },
    LAT: { kvp: 85, mas: 25, exposureTime: 0.50, distance: 100 },
  },
  hip: {
    AP: { kvp: 80, mas: 20, exposureTime: 0.40, distance: 100 },
    LAT: { kvp: 85, mas: 25, exposureTime: 0.50, distance: 100 },
  },
  // Digestive (Barium studies)
  esophagus: {
    AP: { kvp: 100, mas: 15, exposureTime: 0.20, distance: 100 },
    LAT: { kvp: 100, mas: 18, exposureTime: 0.25, distance: 100 },
  },
  stomach: {
    AP: { kvp: 100, mas: 15, exposureTime: 0.20, distance: 100 },
    LAT: { kvp: 100, mas: 18, exposureTime: 0.25, distance: 100 },
  },
  // Knee & Leg
  knee: {
    AP: { kvp: 66, mas: 6, exposureTime: 0.08, distance: 100 },
    LAT: { kvp: 66, mas: 6, exposureTime: 0.08, distance: 100 },
    OBL: { kvp: 66, mas: 6, exposureTime: 0.08, distance: 100 },
  },
  tibia: {
    AP: { kvp: 65, mas: 5, exposureTime: 0.07, distance: 100 },
    LAT: { kvp: 65, mas: 5, exposureTime: 0.07, distance: 100 },
  },
  // Ankle & Foot
  ankle: {
    AP: { kvp: 60, mas: 4, exposureTime: 0.05, distance: 100 },
    LAT: { kvp: 60, mas: 4, exposureTime: 0.05, distance: 100 },
    OBL: { kvp: 60, mas: 4, exposureTime: 0.05, distance: 100 },
  },
  foot: {
    AP: { kvp: 55, mas: 3, exposureTime: 0.04, distance: 100 },
    LAT: { kvp: 55, mas: 3, exposureTime: 0.04, distance: 100 },
    OBL: { kvp: 55, mas: 3, exposureTime: 0.04, distance: 100 },
  },
};

function getTechParams(partId: string, viewId: string): TechParams {
  return (
    TECH_PARAMS[partId]?.[viewId] ?? { kvp: 70, mas: 5, exposureTime: 0.06, distance: 100 }
  );
}

// Common cases per region
const COMMON_CASES: Record<string, CommonCase[]> = {
  knee: [
    { id: 'normal', titleAr: 'ركبة طبيعية', title: 'Normal Knee', badge: 'NORMAL', descAr: 'مفصل سليم، غضاريف واضحة', desc: 'Healthy joint, visible cartilage' },
    { id: 'fracture', titleAr: 'كسر الظنبوب', title: 'Tibial Fracture', badge: 'FRACTURE', descAr: 'كسر في عظم الساق العلوي', desc: 'Fracture of upper tibia' },
    { id: 'dislocation', titleAr: 'خلع الرضفة', title: 'Patellar Dislocation', badge: 'DISLOCATION', descAr: 'خروج عظمة الصابونة من مكانها', desc: 'Kneecap displacement' },
  ],
  shoulder: [
    { id: 'normal', titleAr: 'كتف طبيعي', title: 'Normal Shoulder', badge: 'NORMAL', descAr: 'مفصل سليم، رباط سليم', desc: 'Healthy joint, intact ligaments' },
    { id: 'fracture', titleAr: 'كسر الترقوة', title: 'Clavicle Fracture', badge: 'FRACTURE', descAr: 'كسر في مفصل الترقوة', desc: 'Fracture in clavicle joint' },
    { id: 'dislocation', titleAr: 'خلع الكتف', title: 'Shoulder Dislocation', badge: 'DISLOCATION', descAr: 'خروج رأس العضد من المفصل', desc: 'Humeral head displacement' },
  ],
  'shoulder-r': [
    { id: 'normal', titleAr: 'كتف طبيعي', title: 'Normal Shoulder', badge: 'NORMAL', descAr: 'مفصل سليم، رباط سليم', desc: 'Healthy joint, intact ligaments' },
    { id: 'fracture', titleAr: 'كسر الترقوة', title: 'Clavicle Fracture', badge: 'FRACTURE', descAr: 'كسر في مفصل الترقوة', desc: 'Fracture in clavicle joint' },
    { id: 'dislocation', titleAr: 'خلع الكتف', title: 'Shoulder Dislocation', badge: 'DISLOCATION', descAr: 'خروج رأس العضد من المفصل', desc: 'Humeral head displacement' },
  ],
  wrist: [
    { id: 'normal', titleAr: 'رسغ طبيعي', title: 'Normal Wrist', badge: 'NORMAL', descAr: 'عظام سليمة، مسافات مفصلية طبيعية', desc: 'Intact bones, normal joint spaces' },
    { id: 'fracture', titleAr: 'كسر كوليس', title: 'Colles Fracture', badge: 'FRACTURE', descAr: 'كسر في عظم الكعبرة البعيد، شائع عند السقوط', desc: 'Distal radius fracture, common from falls' },
  ],
  'wrist-r': [
    { id: 'normal', titleAr: 'رسغ طبيعي', title: 'Normal Wrist', badge: 'NORMAL', descAr: 'عظام سليمة، مسافات مفصلية طبيعية', desc: 'Intact bones, normal joint spaces' },
    { id: 'fracture', titleAr: 'كسر كوليس', title: 'Colles Fracture', badge: 'FRACTURE', descAr: 'كسر في عظم الكعبرة البعيد، شائع عند السقوط', desc: 'Distal radius fracture, common from falls' },
  ],
  pelvis: [
    { id: 'normal', titleAr: 'حوض طبيعي', title: 'Normal Pelvis', badge: 'NORMAL', descAr: 'عظام سليمة، مفاصل سليمة', desc: 'Intact bones, healthy joints' },
    { id: 'fracture', titleAr: 'كسر الحوض', title: 'Pelvic Fracture', badge: 'FRACTURE', descAr: 'كسر في حلقة الحوض', desc: 'Fracture in pelvic ring' },
  ],
  ankle: [
    { id: 'normal', titleAr: 'كاحل طبيعي', title: 'Normal Ankle', badge: 'NORMAL', descAr: 'مفصل سليم، أربطة سليمة', desc: 'Healthy joint, intact ligaments' },
    { id: 'fracture', titleAr: 'كسر الكاحل', title: 'Ankle Fracture', badge: 'FRACTURE', descAr: 'كسر ثنائي الكعب', desc: 'Bimalleolar fracture' },
    { id: 'dislocation', titleAr: 'خلع الكاحل', title: 'Ankle Dislocation', badge: 'DISLOCATION', descAr: 'إزاحة كاملة للمفصل', desc: 'Complete joint dislocation' },
  ],
  chest: [
    { id: 'normal', titleAr: 'صدر طبيعي', title: 'Normal Chest', badge: 'NORMAL', descAr: 'رئتان نقيتان، قلب بحجم طبيعي', desc: 'Clear lungs, normal heart size' },
    { id: 'fracture', titleAr: 'كسر ضلع', title: 'Rib Fracture', badge: 'FRACTURE', descAr: 'كسر في أحد الأضلاع، عادة من الصدمات', desc: 'Broken rib, usually from trauma' },
  ],
  hand: [
    { id: 'normal', titleAr: 'يد طبيعية', title: 'Normal Hand', badge: 'NORMAL', descAr: 'عظام سليمة، مفاصل طبيعية', desc: 'Intact bones, normal joints' },
    { id: 'fracture', titleAr: 'كسر في اليد', title: 'Hand Fracture', badge: 'FRACTURE', descAr: 'كسر في عظام اليد', desc: 'Fracture in hand bones' },
  ],
  forearm: [
    { id: 'normal', titleAr: 'ساعد طبيعي', title: 'Normal Forearm', badge: 'NORMAL', descAr: 'عظام سليمة، الكعبرة والزند سليمة', desc: 'Intact radius and ulna' },
    { id: 'fracture', titleAr: 'كسر الساعد', title: 'Forearm Fracture', badge: 'FRACTURE', descAr: 'كسر في الكعبرة أو الزند', desc: 'Radius or ulna fracture' },
  ],
  elbow: [
    { id: 'normal', titleAr: 'كوع طبيعي', title: 'Normal Elbow', badge: 'NORMAL', descAr: 'مفصل سليم، مسافات مفصلية طبيعية', desc: 'Healthy joint, normal joint spaces' },
    { id: 'fracture', titleAr: 'كسر الكوع', title: 'Elbow Fracture', badge: 'FRACTURE', descAr: 'كسر في عظام الكوع', desc: 'Fracture in elbow bones' },
  ],
  humerus: [
    { id: 'normal', titleAr: 'عضد طبيعي', title: 'Normal Humerus', badge: 'NORMAL', descAr: 'عظم سليم، لا توجد كسور', desc: 'Intact bone, no fractures' },
    { id: 'fracture', titleAr: 'كسر العضد', title: 'Humerus Fracture', badge: 'FRACTURE', descAr: 'كسر في عظم العضد', desc: 'Fracture in humerus bone' },
  ],
  foot: [
    { id: 'normal', titleAr: 'قدم طبيعية', title: 'Normal Foot', badge: 'NORMAL', descAr: 'عظام سليمة، مفاصل طبيعية', desc: 'Intact bones, normal joints' },
    { id: 'fracture', titleAr: 'كسر القدم', title: 'Foot Fracture', badge: 'FRACTURE', descAr: 'كسر في عظام القدم', desc: 'Fracture in foot bones' },
  ],
};

function getCases(regionId: string): CommonCase[] {
  return COMMON_CASES[regionId] ?? [];
}

/* ─────────────────────────────────────────────
   Badge component
───────────────────────────────────────────── */
function Badge({ type }: { type: CommonCase['badge'] }) {
  const styles = {
    NORMAL: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    FRACTURE: 'bg-red-500/20 text-red-400 border border-red-500/30',
    DISLOCATION: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  };
  return (
    <span
      className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide ${styles[type]}`}
    >
      {type}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Param row
───────────────────────────────────────────── */
function ParamRow({
  value,
  unit,
  labelAr,
}: {
  value: string | number;
  unit: string;
  labelAr: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5">
      <span className="text-cyan-400 font-bold text-sm font-mono">{value}</span>
      <span className="text-[#8b9fbe] text-xs">{labelAr} {unit}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Body skeleton with clickable regions
───────────────────────────────────────────── */
function SkeletonView({ onSelectRegion }: { onSelectRegion: (r: BodyRegion) => void }) {
  return (
    <div className="flex-1 relative flex items-center justify-center bg-[#0d1117] overflow-hidden">
      {/* Skeleton image */}
      <div className="relative h-full max-h-[560px] aspect-[9/16] mx-auto select-none">
        {/* Full-body skeleton image */}
        <img
          src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=90"
          alt="Full body X-ray skeleton"
          className="w-full h-full object-cover"
          style={{
            filter:
              'grayscale(100%) invert(1) contrast(1.4) brightness(0.9) hue-rotate(180deg) saturate(3)',
          }}
          draggable={false}
        />

        {/* Clickable hotspots */}
        {BODY_REGIONS.map((region) => (
          <button
            key={region.id}
            onClick={() => onSelectRegion(region)}
            style={{ left: region.x, top: region.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10"
            aria-label={`Select ${region.label}`}
          >
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-30 animate-ping scale-[2]" />
            {/* Dot */}
            <div className="relative w-3.5 h-3.5 rounded-full bg-cyan-400 ring-2 ring-cyan-300 ring-offset-1 ring-offset-transparent group-hover:scale-125 transition-transform duration-200 shadow-[0_0_12px_#00e5ff]" />
            {/* Tooltip */}
            <div className="absolute left-5 top-1/2 -translate-y-1/2 bg-[#0d2235]/95 backdrop-blur text-cyan-300 text-xs px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-cyan-500/30 shadow-xl z-20 font-medium">
              {region.labelAr}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Region detail view
───────────────────────────────────────────── */
function RegionView({
  region,
  onBack,
}: {
  region: BodyRegion;
  onBack: () => void;
}) {
  const [selectedPart, setSelectedPart] = useState(region.parts[0]);
  const [selectedView, setSelectedView] = useState<View>(VIEWS[1]); // LAT default
  const [selectedCase, setSelectedCase] = useState<CommonCase | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const tech = getTechParams(selectedPart.id, selectedView.id);
  const cases = getCases(region.id);
  const examImage = getExamImage(selectedPart.id, selectedView.id);

  const displayLabel = selectedCase ? selectedCase.title : region.label;
  const displayView = selectedCase ? '' : `${selectedView.label === 'LAT' ? 'Lateral' : selectedView.id} View`;

  return (
    <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">

      {/* ═══════════════════════════════════════════════
          MOBILE CONTROLS BAR — shown only on < lg
      ═══════════════════════════════════════════════ */}
      <div
        className="lg:hidden flex-shrink-0 border-b border-white/5"
        style={{ background: 'linear-gradient(180deg, #0d1117 0%, #0f1923 100%)' }}
      >
        {/* Row 1: back · region name · info toggle */}
        <div className="px-3 pt-2 pb-1.5 flex items-center justify-between gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-[#8b9fbe] hover:text-cyan-400 transition-colors text-xs flex-shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>رجوع</span>
          </button>
          <span className="text-white text-sm font-semibold truncate">{region.labelAr}</span>
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`flex-shrink-0 flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-all duration-200 ${
              showInfo
                ? 'bg-cyan-400/15 border-cyan-500/40 text-cyan-400'
                : 'border-white/10 text-[#8b9fbe] hover:border-white/20 hover:text-white'
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
            </svg>
            <span>معلومات</span>
          </button>
        </div>
        {/* Row 2: part tabs + view selector — horizontally scrollable */}
        <div className="flex items-center gap-1.5 px-3 pb-2.5 overflow-x-auto no-scrollbar">
          {region.parts.map((part) => (
            <button
              key={part.id}
              onClick={() => { setSelectedPart(part); setSelectedCase(null); }}
              className={`flex-shrink-0 py-1.5 px-3 rounded-lg text-xs font-medium transition-all duration-150 border ${
                selectedPart.id === part.id
                  ? 'bg-cyan-400 text-[#0d1117] border-cyan-400 shadow-[0_0_8px_#00e5ff44]'
                  : 'bg-white/5 text-[#8b9fbe] border-white/5'
              }`}
            >
              {part.labelAr}
            </button>
          ))}
          {/* Divider */}
          <div className="w-px h-5 bg-white/15 flex-shrink-0 mx-0.5" />
          {/* View buttons */}
          {VIEWS.map((v) => (
            <button
              key={v.id}
              onClick={() => { setSelectedView(v); setSelectedCase(null); }}
              className={`flex-shrink-0 py-1.5 px-3 rounded-lg text-xs font-bold transition-all duration-150 border ${
                selectedView.id === v.id
                  ? 'bg-cyan-400 text-[#0d1117] border-cyan-400'
                  : 'bg-white/5 text-[#8b9fbe] border-white/5'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          DESKTOP LEFT PANEL — hidden on mobile
      ═══════════════════════════════════════════════ */}
      <div
        className="hidden lg:flex w-72 flex-shrink-0 flex-col overflow-y-auto border-r border-white/5"
        style={{ background: 'linear-gradient(180deg, #0d1117 0%, #0f1923 100%)' }}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
          <span className="text-white font-semibold text-sm">معلومات الفحص</span>
        </div>

        {/* Body part tabs */}
        <div className="px-3 pt-3 pb-1">
          <div className="grid grid-cols-2 gap-1.5">
            {region.parts.map((part) => (
              <button
                key={part.id}
                onClick={() => { setSelectedPart(part); setSelectedCase(null); }}
                className={`py-2 px-3 rounded-lg text-xs font-medium transition-all duration-150 text-center border ${
                  selectedPart.id === part.id
                    ? 'bg-cyan-400 text-[#0d1117] border-cyan-400 shadow-[0_0_10px_#00e5ff55]'
                    : 'bg-white/5 text-[#8b9fbe] hover:bg-white/10 hover:text-white border-white/5'
                }`}
              >
                {part.labelAr}
              </button>
            ))}
          </div>
        </div>

        {/* View selector */}
        <div className="px-3 pt-3">
          <p className="text-[#8b9fbe] text-[11px] mb-2 text-right">اختر الوضعية</p>
          <div className="grid grid-cols-3 gap-1">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                onClick={() => { setSelectedView(v); setSelectedCase(null); }}
                className={`py-1.5 rounded-lg text-xs font-bold transition-all duration-150 border ${
                  selectedView.id === v.id
                    ? 'bg-cyan-400 text-[#0d1117] border-cyan-400'
                    : 'bg-white/5 text-[#8b9fbe] hover:bg-white/10 hover:text-white border-white/5'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Technical params */}
        <div className="mx-3 mt-4 border-l-2 border-cyan-400/60 pl-3">
          <ParamRow value={tech.kvp} unit="(kV)" labelAr="الكيلو فولت" />
          <ParamRow value={tech.mas} unit="(mA)" labelAr="التيار الأمبير" />
          <ParamRow value={tech.exposureTime} unit="(s)" labelAr="زمن التعريض" />
          <ParamRow value={tech.distance} unit="(cm)" labelAr="المسافة" />
        </div>

        {/* Common cases */}
        <div className="px-3 pt-4 pb-3 flex-1">
          <p className="text-[#8b9fbe] text-[11px] mb-2 text-right">الحالات الشائعة</p>
          <div className="space-y-2">
            {cases.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCase(selectedCase?.id === c.id ? null : c)}
                className={`w-full rounded-xl px-3 py-2.5 text-right transition-all duration-150 border ${
                  selectedCase?.id === c.id
                    ? 'bg-white/10 border-cyan-500/30'
                    : 'bg-white/3 border-white/5 hover:bg-white/8'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <Badge type={c.badge} />
                  <span className="text-white text-xs font-semibold">{c.titleAr}</span>
                </div>
                <p className="text-[#8b9fbe] text-[10px] text-right leading-relaxed">
                  {c.descAr}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          DISPLAY AREA
      ═══════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col bg-[#0d1117] relative overflow-hidden">

        {/* Desktop back button toolbar */}
        <div className="hidden lg:flex px-6 py-3 border-b border-white/5 items-center justify-end">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[#8b9fbe] hover:text-cyan-400 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← العودة للجسم الكامل</span>
          </button>
        </div>

        {/* Image / label area */}
        <div className="flex-1 relative flex items-center justify-center">
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Corner brackets */}
          <div className="absolute top-6 left-6 w-6 h-6 lg:top-8 lg:left-8 lg:w-8 lg:h-8 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-sm" />
          <div className="absolute top-6 right-6 w-6 h-6 lg:top-8 lg:right-8 lg:w-8 lg:h-8 border-t-2 border-r-2 border-cyan-500/40 rounded-tr-sm" />
          <div className="absolute bottom-6 left-6 w-6 h-6 lg:bottom-8 lg:left-8 lg:w-8 lg:h-8 border-b-2 border-l-2 border-cyan-500/40 rounded-bl-sm" />
          <div className="absolute bottom-6 right-6 w-6 h-6 lg:bottom-8 lg:right-8 lg:w-8 lg:h-8 border-b-2 border-r-2 border-cyan-500/40 rounded-br-sm" />

          {/* X-ray Image or Center label */}
          {examImage ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={examImage}
                alt={`${selectedPart.label} X-ray - ${selectedView.label} view`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                style={{ filter: 'contrast(1.1) brightness(1.05)' }}
              />
            </div>
          ) : (
            <div className="text-center select-none px-6">
              <p className="text-white text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide mb-3 drop-shadow-[0_0_40px_rgba(0,229,255,0.2)]">
                {displayLabel}
              </p>
              {displayView && (
                <p className="text-cyan-400 text-base lg:text-xl font-light tracking-widest">
                  {displayView}
                </p>
              )}
              {selectedCase && (
                <div className="mt-4">
                  <Badge type={selectedCase.badge} />
                </div>
              )}
            </div>
          )}

          {/* DICOM overlay — top left */}
          <div className="absolute top-4 left-4 font-mono text-[9px] text-green-400/60 space-y-0.5 pointer-events-none leading-relaxed">
            <div>INSTITUTION: RAD TRAINING EG</div>
            <div>REGION: {region.label.toUpperCase()}</div>
            <div>PART: {selectedPart.label.toUpperCase()}</div>
            <div>VIEW: {selectedView.id}</div>
            <div>DATE: {new Date().toLocaleDateString('en-US')}</div>
            <div>kVp: {tech.kvp} | mAs: {tech.mas}</div>
          </div>

          {/* DICOM overlay — top right */}
          <div className="absolute top-4 right-4 font-mono text-[9px] text-yellow-400/40 text-right space-y-0.5 pointer-events-none">
            <div>W: 2000 L: 500</div>
            <div>ZOOM: 1.0x</div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            MOBILE INFO OVERLAY (shown when showInfo=true)
        ═══════════════════════════════════════════════ */}
        {showInfo && (
          <div className="lg:hidden absolute inset-0 bg-[#0a0e17]/96 backdrop-blur-sm flex flex-col z-30">
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
                <span className="text-white font-semibold text-sm">معلومات الفحص</span>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="w-7 h-7 flex items-center justify-center text-[#8b9fbe] hover:text-white transition-colors rounded-lg hover:bg-white/10 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Tech params */}
              <div className="mx-4 mt-5 border-l-2 border-cyan-400/60 pl-3">
                <ParamRow value={tech.kvp} unit="(kV)" labelAr="الكيلو فولت" />
                <ParamRow value={tech.mas} unit="(mA)" labelAr="التيار الأمبير" />
                <ParamRow value={tech.exposureTime} unit="(s)" labelAr="زمن التعريض" />
                <ParamRow value={tech.distance} unit="(cm)" labelAr="المسافة" />
              </div>

              {/* Cases */}
              <div className="px-4 pt-5 pb-8">
                <p className="text-[#8b9fbe] text-[11px] mb-3 text-right">الحالات الشائعة</p>
                <div className="space-y-2">
                  {cases.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCase(selectedCase?.id === c.id ? null : c);
                        setShowInfo(false);
                      }}
                      className={`w-full rounded-xl px-3 py-3 text-right transition-all duration-150 border ${
                        selectedCase?.id === c.id
                          ? 'bg-white/10 border-cyan-500/30'
                          : 'bg-white/3 border-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <Badge type={c.badge} />
                        <span className="text-white text-xs font-semibold">{c.titleAr}</span>
                      </div>
                      <p className="text-[#8b9fbe] text-[10px] text-right leading-relaxed">
                        {c.descAr}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────
   Main export
───────────────────────────────────────────── */
export function ChestXrayExplorer() {
  const [selectedRegion, setSelectedRegion] = useState<BodyRegion | null>(null);

  return (
    <div
      className="flex flex-col w-full h-full"
      style={{ background: '#0a0e17' }}
    >
      {/* Top bar */}
      <div
        className="flex-shrink-0 px-4 lg:px-6 py-3 border-b border-white/5 flex items-center justify-between"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="flex items-center gap-3" />

        <div className="flex items-center gap-3">
          <h2 className="text-white font-semibold text-sm lg:text-base tracking-wide">
            محاكي وضعيات الأشعة
          </h2>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_16px_#00e5ff44]">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Body — fills all available space */}
      <div className="flex flex-1 overflow-hidden">
        {selectedRegion ? (
          <RegionView
            region={selectedRegion}
            onBack={() => setSelectedRegion(null)}
          />
        ) : (
          <>
            {/* Left info panel - hidden on mobile */}
            <div
              className="hidden lg:flex w-72 flex-shrink-0 border-r border-white/5 flex-col"
              style={{ background: 'linear-gradient(180deg, #0d1117 0%, #0f1923 100%)' }}
            >
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
                <span className="text-white font-semibold text-sm">معلومات الفحص</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-3 opacity-40">
                <svg
                  viewBox="0 0 24 24"
                  className="w-10 h-10 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
                <p className="text-[#8b9fbe] text-xs leading-relaxed">
                  انقر على أي منطقة في الجسم لعرض معلومات الفحص
                </p>
              </div>
            </div>

            {/* Skeleton viewer */}
            <SkeletonView onSelectRegion={setSelectedRegion} />
          </>
        )}
      </div>
    </div>
  );
}
