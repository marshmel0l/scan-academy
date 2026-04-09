// Control panel for the X-ray simulator — Light Mode
import { Stethoscope, UserCheck, BookOpen } from 'lucide-react';

const EXAMS = [
  { name: 'Chest', emoji: '🫁', description: 'Lungs, heart, mediastinum' },
  { name: 'Abdomen', emoji: '🩺', description: 'Abdominal organs, bowel' },
  { name: 'Skull', emoji: '🧠', description: 'Cranial bones & sinuses' },
  { name: 'Extremities', emoji: '🦴', description: 'Arms, legs & joints' },
];

const POSITIONS = [
  { name: 'Standing', emoji: '🧍', description: 'Upright / weight-bearing' },
  { name: 'Lying', emoji: '🛌', description: 'Supine / prone' },
];

const GUIDE_ITEMS = [
  {
    color: 'text-green-600',
    icon: '✓',
    text: (
      <>
        <strong className="text-slate-700">Chest PA (Standing):</strong> Gold
        standard — reduces cardiac magnification, best lung field visualization.
      </>
    ),
  },
  {
    color: 'text-yellow-600',
    icon: '!',
    text: (
      <>
        <strong className="text-slate-700">Chest AP (Lying):</strong> For
        critically ill only. Causes magnification and reduced volumes.
      </>
    ),
  },
  {
    color: 'text-blue-600',
    icon: 'i',
    text: (
      <>
        <strong className="text-slate-700">Abdomen KUB (Lying):</strong>{' '}
        Standard supine for bowel gas patterns and renal stones.
      </>
    ),
  },
];

interface ControlPanelProps {
  selectedExam: string;
  selectedPosition: string;
  onExamChange: (exam: string) => void;
  onPositionChange: (pos: string) => void;
}

export function ControlPanel({
  selectedExam,
  selectedPosition,
  onExamChange,
  onPositionChange,
}: ControlPanelProps) {
  const isCorrect = selectedExam === 'Chest' && selectedPosition === 'Standing';

  return (
    <div className="flex flex-col gap-4">
      {/* ── Exam Type ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Stethoscope className="w-4 h-4 text-blue-600" />
          <h3 className="text-slate-900 font-medium text-sm">Select Exam Type</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {EXAMS.map((exam) => (
            <button
              key={exam.name}
              onClick={() => onExamChange(exam.name)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 ${
                selectedExam === exam.name
                  ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-600/30'
                  : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="text-xl mb-1.5">{exam.emoji}</div>
              <div className={`text-sm font-semibold ${selectedExam === exam.name ? 'text-white' : 'text-slate-800'}`}>
                {exam.name}
              </div>
              <div className={`text-xs mt-0.5 ${selectedExam === exam.name ? 'text-blue-200' : 'text-slate-500'}`}>
                {exam.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Patient Position ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <UserCheck className="w-4 h-4 text-blue-600" />
          <h3 className="text-slate-900 font-medium text-sm">Select Patient Position</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {POSITIONS.map((pos) => (
            <button
              key={pos.name}
              onClick={() => onPositionChange(pos.name)}
              className={`p-5 rounded-xl border text-center transition-all duration-200 ${
                selectedPosition === pos.name
                  ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-600/30'
                  : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="text-3xl mb-2">{pos.emoji}</div>
              <div className={`text-sm font-semibold ${selectedPosition === pos.name ? 'text-white' : 'text-slate-800'}`}>
                {pos.name}
              </div>
              <div className={`text-xs mt-1 ${selectedPosition === pos.name ? 'text-blue-200' : 'text-slate-500'}`}>
                {pos.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Result Card ── */}
      <div
        className={`rounded-2xl border p-5 text-center transition-all duration-300 ${
          isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}
      >
        <div className="text-4xl mb-2">{isCorrect ? '✅' : '❌'}</div>
        <div className={`font-bold text-lg ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
          {isCorrect ? 'Correct Position' : 'Incorrect Position'}
        </div>
        <div className={`text-xs mt-2 leading-relaxed ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
          {selectedExam} + {selectedPosition} →{' '}
          {isCorrect
            ? 'Standard PA chest — optimal for cardiac & pulmonary evaluation.'
            : 'This combination deviates from preferred clinical positioning guidelines.'}
        </div>
      </div>

      {/* ── Positioning Guide ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <h3 className="text-slate-900 font-medium text-sm">📚 Quick Positioning Guide</h3>
        </div>
        <ul className="space-y-3">
          {GUIDE_ITEMS.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
              <span className={`font-bold mt-0.5 flex-shrink-0 ${item.color}`}>
                {item.icon}
              </span>
              <span className="leading-relaxed">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
