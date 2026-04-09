// SectionDivider — Medical-themed ornamental separator between page sections
// Variants:
//   'pulse'   – gradient line + centered Activity icon (default, between same-color sections)
//   'fade'    – plain gradient line only (for bg-color transitions)
//   'branded' – blue gradient line + glowing brand dot (for premium emphasis)

import { Activity } from 'lucide-react';

type DividerVariant = 'pulse' | 'fade' | 'branded';

interface SectionDividerProps {
  /**
   * CSS color value of the section this divider sits inside / on top of.
   * The center ornament background must match this exactly so it "cuts" the line.
   * e.g. '#ffffff' for white sections, '#f8fafc' for slate-50 sections.
   * Defaults to '#ffffff'.
   */
  bgColor?: string;
  /** Visual variant. Default: 'pulse' */
  variant?: DividerVariant;
  /** Extra class names for the outer wrapper */
  className?: string;
}

export function SectionDivider({
  bgColor = '#ffffff',
  variant = 'pulse',
  className = '',
}: SectionDividerProps) {
  /* ── Fade: simple gradient line, no ornament ──────────────────── */
  if (variant === 'fade') {
    return (
      <div
        className={`h-px w-full ${className}`}
        style={{ background: 'var(--grad-divider)' }}
        role="separator"
        aria-hidden="true"
      />
    );
  }

  /* ── Branded: blue glow dot, stronger line ─────────────────────── */
  if (variant === 'branded') {
    return (
      null
    );
  }

  /* ── Pulse (default): neutral line + Activity icon ─────────────── */
  return (
    null
  );
}
