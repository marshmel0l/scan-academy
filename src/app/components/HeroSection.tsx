import { useRef, useEffect, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

// ── Precise PA Chest X-Ray Canvas ───────────────────────────────────────────
function ChestXrayCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0.5, y: 0.5 });
  const curRef    = useRef({ x: 0.5, y: 0.5 });
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const p = canvas.parentElement;
      if (p) { canvas.width = p.clientWidth; canvas.height = p.clientHeight; }
    };
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const track = (cx2: number, cy2: number) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: Math.max(0, Math.min(1, (cx2 - r.left)  / r.width)),
        y: Math.max(0, Math.min(1, (cy2 - r.top) / r.height)),
      };
    };
    const onMouse = (e: MouseEvent) => track(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) track(e.touches[0].clientX, e.touches[0].clientY);
    };
    window.addEventListener('mousemove', onMouse);
    canvas.addEventListener('touchmove', onTouch, { passive: true });

    let t = 0;
    const frame = () => {
      t += 0.013;
      const c = curRef.current;
      c.x += (mouseRef.current.x - c.x) * 0.045;
      c.y += (mouseRef.current.y - c.y) * 0.045;

      const ctx = canvas.getContext('2d');
      if (!ctx) { rafRef.current = requestAnimationFrame(frame); return; }

      const W = canvas.width;
      const H = canvas.height;
      const S = Math.min(W, H) / 680;   // universal scale
      const cx = W * 0.5;
      const cy = H * 0.50;

      ctx.clearRect(0, 0, W, H);

      // ── Parallax offsets ──────────────────────────
      const p1x = (c.x - 0.5) * 5;   const p1y = (c.y - 0.5) * 5;   // deep
      const p2x = (c.x - 0.5) * 13;  const p2y = (c.y - 0.5) * 13;  // mid
      const p3x = (c.x - 0.5) * 22;  const p3y = (c.y - 0.5) * 22;  // near

      // ── Reference geometry ────────────────────────
      const chestTop    = cy - H * 0.42;
      const chestBottom = cy + H * 0.38;
      const spineTop    = chestTop + H * 0.025;
      const spineBottom = chestBottom - H * 0.05;
      const spineRange  = spineBottom - spineTop;

      // ── Ambient glow ──────────────────────────────
      const amb = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.58);
      amb.addColorStop(0,   'rgba(214,230,254,0.52)');
      amb.addColorStop(0.65,'rgba(239,246,255,0.22)');
      amb.addColorStop(1,   'rgba(255,255,255,0)');
      ctx.fillStyle = amb;
      ctx.fillRect(0, 0, W, H);

      // ╔═══════════════════════════════════════════╗
      // ║  LAYER 1 – LUNG FIELDS  (deep parallax)  ║
      // ╚═══════════════════════════════════════════╝
      ctx.save(); ctx.translate(p1x, p1y);

      const drawLung = (lx: number, ly: number, rx: number, ry: number) => {
        const g = ctx.createRadialGradient(lx, ly, 0, lx, ly, rx * 1.3);
        g.addColorStop(0, 'rgba(59,130,246,0.07)');
        g.addColorStop(1, 'rgba(59,130,246,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.ellipse(lx, ly, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
      };
      // RIGHT lung on the right side (cx + positive offset)
      drawLung(cx + W * 0.175, cy - H * 0.03, W * 0.195, H * 0.30);
      // LEFT lung on the left side (cx - negative offset)
      drawLung(cx - W * 0.155, cy - H * 0.04, W * 0.175, H * 0.285);

      ctx.restore();

      // ╔══════════════════════════════════════════╗
      // ║  LAYER 2 – SPINE  (deep parallax)       ║
      // ╚══════════════════════════════════════════╝
      ctx.save(); ctx.translate(p1x, p1y);
      ctx.shadowBlur = 4; ctx.shadowColor = 'rgba(30,58,138,0.18)';

      const nV = 20;
      for (let i = 0; i < nV; i++) {
        const isNeck = i < 4;
        const vw = (isNeck ? 8 : 12) * S;
        const vh = (spineRange / nV) * 0.68;
        const vy = spineTop + i * (spineRange / nV) + (spineRange / nV) * 0.12;
        const alpha = isNeck ? 0.32 : 0.26;
        ctx.fillStyle = `rgba(30,58,138,${alpha})`;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(cx - vw / 2, vy, vw, vh, 2 * S);
        else ctx.rect(cx - vw / 2, vy, vw, vh);
        ctx.fill();
        if (!isNeck && i < 16) {
          const ty = vy + vh * 0.35;
          ctx.fillStyle = `rgba(30,58,138,${alpha * 0.55})`;
          [-1, 1].forEach(d => {
            ctx.beginPath(); ctx.ellipse(cx + d * vw * 0.9, ty, vw * 0.35, vh * 0.18, 0, 0, Math.PI * 2); ctx.fill();
          });
        }
      }
      for (let i = 0; i < nV - 1; i++) {
        const dy = spineTop + (i + 0.8) * (spineRange / nV);
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.fillRect(cx - 6 * S, dy, 12 * S, (spineRange / nV) * 0.1);
      }
      ctx.restore();

      // ╔═════════════════════════════════════════════╗
      // ║  LAYER 3 – RIBS  (mid parallax)            ║
      // ╚═════════════════════════════════════════════╝
      ctx.save(); ctx.translate(p2x, p2y);
      ctx.lineCap = 'round';

      for (let i = 0; i < 12; i++) {
        const t2     = i / 11;
        const ribY   = spineTop + (i + 0.8) * (spineRange / 14.5);
        const alpha  = Math.max(0.11, 0.45 - t2 * 0.18);
        const lw     = Math.max(1, (2.2 - t2 * 0.8)) * S;
        const latExt = W * (0.275 + t2 * 0.075);
        const archUp = Math.max(0, (5 - i) * 16) * S;
        const drop   = (22 + i * 20) * S;

        ctx.lineWidth   = lw;
        ctx.shadowBlur  = 6;
        ctx.shadowColor = `rgba(29,78,216,${alpha * 0.4})`;
        ctx.strokeStyle = `rgba(29,78,216,${alpha})`;

        [-1, 1].forEach(side => {
          const sx = cx + side * 12 * S;
          const sy = ribY;
          const ex = cx + side * latExt;
          const ey = ribY + drop;
          const cp1x = cx + side * latExt * 0.28;
          const cp1y = sy - archUp;
          const cp2x = cx + side * latExt * 0.80;
          const cp2y = ey - drop * 0.25;

          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);
          ctx.stroke();
        });
      }
      ctx.restore();

      // ╔════════════════════════════════════════════╗
      // ║  LAYER 4 – SCAPULAE  (mid parallax)       ║
      // ╚════════════════════════════════════════════╝
      ctx.save(); ctx.translate(p2x, p2y);
      ctx.lineWidth  = 1.3 * S;
      ctx.setLineDash([3, 5]);
      ctx.shadowBlur = 0;

      [-1, 1].forEach(side => {
        const scTop  = spineTop + spineRange * 0.02;
        const scBot  = spineTop + spineRange * 0.40;
        const scMedX = cx + side * W * 0.23;
        const scLatX = cx + side * W * 0.38;
        const scMidY = (scTop + scBot) / 2;

        ctx.strokeStyle = 'rgba(30,58,138,0.17)';
        ctx.beginPath();
        ctx.moveTo(scMedX, scTop);
        ctx.bezierCurveTo(scMedX + side * 4 * S, scMidY, scMedX + side * 6 * S, scMidY + spineRange * 0.06, scMedX + side * 4 * S, scBot);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(scLatX - side * 10 * S, scTop + spineRange * 0.03);
        ctx.bezierCurveTo(scLatX, scMidY - spineRange * 0.02, scLatX, scMidY + spineRange * 0.06, scMedX + side * 10 * S, scBot);
        ctx.stroke();
      });

      ctx.setLineDash([]);
      ctx.restore();

      // ╔══════════════════════════════════════════════╗
      // ║  LAYER 5 – TRACHEA & CARINA  (near)         ║
      // ╚══════════════════════════════════════════════╝
      ctx.save(); ctx.translate(p3x, p3y);

      const trW   = 5 * S;
      const trTop = chestTop - 8 * S;
      const trBot = spineTop + spineRange * 0.17;
      ctx.strokeStyle = 'rgba(30,58,138,0.28)';
      ctx.lineWidth   = 1.5 * S;
      ctx.shadowColor = 'rgba(30,58,138,0.12)';
      ctx.shadowBlur  = 6;
      ctx.setLineDash([4 * S, 3 * S]);
      ctx.beginPath(); ctx.moveTo(cx - trW, trTop); ctx.lineTo(cx - trW, trBot); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + trW, trTop); ctx.lineTo(cx + trW, trBot); ctx.stroke();
      ctx.setLineDash([]);

      ctx.lineWidth   = 2.2 * S;
      ctx.strokeStyle = 'rgba(30,58,138,0.30)';
      ctx.shadowBlur  = 8;
      [-1, 1].forEach(side => {
        const bx = cx + side * W * 0.155;
        const by = trBot + spineRange * 0.085;
        ctx.beginPath();
        ctx.moveTo(cx, trBot);
        ctx.bezierCurveTo(cx + side * W * 0.04, trBot + spineRange * 0.04, cx + side * W * 0.11, by - spineRange * 0.01, bx, by);
        ctx.stroke();
        ctx.lineWidth   = 1.4 * S;
        ctx.strokeStyle = `rgba(30,58,138,0.18)`;
        ctx.shadowBlur  = 4;
        for (let b = 0; b < 3; b++) {
          const ang = (side > 0 ? 0.3 : Math.PI - 0.3) + (b - 1) * 0.35;
          const bLen = (35 + b * 12) * S;
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(bx + Math.cos(ang) * bLen, by + Math.sin(ang) * bLen);
          ctx.stroke();
        }
      });

      ctx.restore();

      // ╔═════════════════════════════════════════════╗
      // ║  LAYER 6 – CLAVICLES  (near parallax)       ║
      // ╚══════════════════════════════════════════════╝
      ctx.save(); ctx.translate(p3x, p3y);
      ctx.lineWidth   = 3 * S;
      ctx.lineCap     = 'round';
      ctx.strokeStyle = 'rgba(30,58,138,0.52)';
      ctx.shadowColor = 'rgba(30,58,138,0.28)';
      ctx.shadowBlur  = 10;

      [-1, 1].forEach(side => {
        const medX = cx + side * 16 * S;
        const medY = spineTop + 20 * S;
        const latX = cx + side * W * 0.31;
        const latY = spineTop - 8 * S;
        ctx.beginPath();
        ctx.moveTo(medX, medY);
        ctx.bezierCurveTo(
          cx + side * W * 0.10, medY - 28 * S,
          cx + side * W * 0.22, medY - 22 * S,
          latX, latY
        );
        ctx.stroke();
      });

      ctx.lineWidth   = 1.5 * S;
      ctx.strokeStyle = 'rgba(30,58,138,0.28)';
      ctx.shadowBlur  = 5;
      [-1, 1].forEach(side => {
        ctx.beginPath();
        ctx.moveTo(cx + side * 14 * S, spineTop + 10 * S);
        ctx.bezierCurveTo(
          cx + side * W * 0.10, spineTop - 14 * S,
          cx + side * W * 0.24, spineTop - 2 * S,
          cx + side * W * 0.30, spineTop + 18 * S
        );
        ctx.stroke();
      });

      ctx.restore();

      // ╔══════════════════════════════════════════════╗
      // ║  LAYER 7 – CARDIAC SILHOUETTE  (near)        ║
      // ╚══════════════════════════════════════════════╝
      ctx.save(); ctx.translate(p3x, p3y);

      const pulse  = 1 + Math.sin(t * 1.55) * 0.011;
      const hcx    = cx - W * 0.025;
      const hcTop  = spineTop + spineRange * 0.14;
      const hcBot  = spineTop + spineRange * 0.68;
      const hcMid  = (hcTop + hcBot) / 2;

      ctx.beginPath();
      ctx.moveTo(cx + W * 0.023, hcTop);
      ctx.bezierCurveTo(
        cx + W * 0.082 * pulse, hcTop + (hcBot - hcTop) * 0.18,
        cx + W * 0.096 * pulse, hcMid,
        cx + W * 0.075 * pulse, hcBot
      );
      ctx.bezierCurveTo(
        cx + W * 0.040, hcBot + (hcBot - hcTop) * 0.06,
        cx - W * 0.040, hcBot + (hcBot - hcTop) * 0.07,
        cx - W * 0.095 * pulse, hcBot - (hcBot - hcTop) * 0.04
      );
      ctx.bezierCurveTo(
        cx - W * 0.155 * pulse, hcMid + (hcBot - hcTop) * 0.10,
        cx - W * 0.148 * pulse, hcMid - (hcBot - hcTop) * 0.10,
        cx - W * 0.110, hcTop + (hcBot - hcTop) * 0.25
      );
      ctx.bezierCurveTo(
        cx - W * 0.080, hcTop + (hcBot - hcTop) * 0.10,
        cx - W * 0.040, hcTop - (hcBot - hcTop) * 0.02,
        cx + W * 0.023, hcTop
      );
      ctx.closePath();

      ctx.fillStyle   = 'rgba(30,58,138,0.055)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(30,58,138,0.26)';
      ctx.lineWidth   = 1.6 * S;
      ctx.shadowColor = 'rgba(30,58,138,0.18)';
      ctx.shadowBlur  = 14;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx - W * 0.01, hcTop - (hcBot - hcTop) * 0.04, W * 0.055, Math.PI * 0.6, Math.PI * 1.9);
      ctx.strokeStyle = 'rgba(30,58,138,0.22)';
      ctx.lineWidth   = 1.4 * S;
      ctx.shadowBlur  = 10;
      ctx.stroke();

      ctx.restore();

      // ╔══════════════════════════════════════════════╗
      // ║  LAYER 8 – DIAPHRAGM  (mid parallax)        ║
      // ╚══════════════════════════════════════════════╝
      ctx.save(); ctx.translate(p2x, p2y);
      ctx.lineCap     = 'round';
      ctx.lineWidth   = 2.2 * S;
      ctx.shadowColor = 'rgba(30,58,138,0.18)';
      ctx.shadowBlur  = 7;

      const rDomeY = spineTop + spineRange * 0.72;
      const lDomeY = spineTop + spineRange * 0.76;

      ctx.strokeStyle = 'rgba(30,58,138,0.34)';
      ctx.beginPath();
      ctx.moveTo(cx + W * 0.01, rDomeY + H * 0.012);
      ctx.bezierCurveTo(cx + W * 0.11, rDomeY - H * 0.058, cx + W * 0.28, rDomeY - H * 0.058, cx + W * 0.42, rDomeY + H * 0.012);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(30,58,138,0.30)';
      ctx.beginPath();
      ctx.moveTo(cx - W * 0.01, lDomeY + H * 0.008);
      ctx.bezierCurveTo(cx - W * 0.09, lDomeY - H * 0.052, cx - W * 0.26, lDomeY - H * 0.054, cx - W * 0.42, lDomeY + H * 0.012);
      ctx.stroke();

      [[cx + W * 0.42, rDomeY + H * 0.012], [cx - W * 0.42, lDomeY + H * 0.012]].forEach(([ax, ay]) => {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(30,58,138,0.22)';
        ctx.lineWidth = 1.5 * S;
        ctx.moveTo(ax, ay - H * 0.04);
        ctx.lineTo(ax, ay + H * 0.02);
        ctx.stroke();
      });

      ctx.restore();

      // ╔════════════════════════════════════════════╗
      // ║  LAYER 9 – VASCULAR MARKINGS  (mid)       ║
      // ╚════════════════════════════════════════════╝
      ctx.save(); ctx.translate(p2x, p2y);

      [[cx + W * 0.17, cy - H * 0.08, 1], [cx - W * 0.14, cy - H * 0.09, -1]].forEach(([hx, hy, side]) => {
        for (let v = 0; v < 7; v++) {
          const baseAngle = (side as number) > 0 ? 0.15 : Math.PI - 0.15;
          const angle = baseAngle + (v - 3) * 0.28;
          const len   = (55 + v * 18) * S;
          const alpha = 0.07 - v * 0.005;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(30,58,138,${Math.max(0.02, alpha)})`;
          ctx.lineWidth   = Math.max(0.4, (1.4 - v * 0.15)) * S;
          ctx.moveTo(hx as number, hy as number);
          ctx.lineTo((hx as number) + Math.cos(angle) * len, (hy as number) + Math.sin(angle) * len);
          ctx.stroke();
        }
      });

      ctx.restore();

      // Subtle scanlines
      ctx.save();
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = 'rgba(0,0,30,0.014)';
        ctx.fillRect(0, y, W, 1);
      }
      ctx.restore();

      rafRef.current = requestAnimationFrame(frame);
    };

    frame();

    return () => {
      ro.disconnect();
      window.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('touchmove', onTouch);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full cursor-crosshair mx-[0px] my-[5px]" />;
}

// ── Hero Section ─────────────────────────────────────────────────────────────
export function HeroSection() {
  const [hovered, setHovered] = useState(false);
  const { t, isAr } = useLanguage();
  const h = t('hero');

  const pills = [
    { label: h.pill_1, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: h.pill_2, color: 'bg-green-50 text-green-700 border-green-200' },
    { label: h.pill_3, color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { label: h.pill_4, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  ];

  const stats = [
    { value: h.stat_1_val, label: h.stat_1_lbl },
    { value: h.stat_2_val, label: h.stat_2_lbl },
    { value: h.stat_3_val, label: h.stat_3_lbl },
    { value: h.stat_4_val, label: h.stat_4_lbl },
  ];

  // Anatomy hotspots — RIGHT lung on the right side, LEFT lung on the left side
  const hotspots = [
    { label: h.anatomy_left_lung,  x: '30%', y: '38%', delay: 1.2 },
    { label: h.anatomy_right_lung, x: '65%', y: '39%', delay: 1.4 },
    { label: h.anatomy_cardiac,    x: '43%', y: '57%', delay: 1.6 },
    { label: h.anatomy_trachea,    x: '50%', y: '22%', delay: 1.8 },
    { label: h.anatomy_diaphragm,  x: '68%', y: '72%', delay: 2.0 },
  ];

  return (
    <section
      className="relative bg-white min-h-[calc(100svh-64px)] flex flex-col lg:block"
    >

      {/* Subtle dot-grid */}
      <div
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage:
            'linear-gradient(#2563eb 1px,transparent 1px),linear-gradient(90deg,#2563eb 1px,transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />
      {/* Right-side blue tint */}
      <div className="absolute right-0 top-0 w-full lg:w-1/2 h-full bg-gradient-to-b lg:bg-gradient-to-l from-blue-50/65 to-transparent pointer-events-none" />

      {/* ── Full-bleed grid — noticeably wider than the navbar ────── */}
      <div className="relative w-full flex-1 grid grid-cols-1 lg:grid-cols-[52%_48%] lg:items-center lg:h-full min-h-[calc(100svh-64px)]">

        {/* ── LEFT: Text content — centered vertically in full height ── */}
        <div className="order-2 lg:order-1 flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 xl:px-28 py-10 lg:py-8 lg:h-full">

          {/* Badge */}
          

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] mb-4"
          >
            {h.title_1}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              {h.title_brand}
            </span>{' '}
            {h.title_2}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-500 mb-5 leading-relaxed max-w-xl"
          >
            {h.subtitle}
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-1.5 mb-5"
          >
            {pills.map((p) => (
              <span
                key={p.label}
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${p.color}`}
              >
                {p.label}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              to="/#about"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5"
            >
              {t('about').badge}
              <ArrowRight className={`w-4 h-4 flex-shrink-0 ${isAr ? 'rotate-180' : ''}`} />
            </Link>
            <Link
              to="/simulator"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:border-blue-300 hover:shadow-md"
            >
              <Play className="w-4 h-4 fill-slate-700 flex-shrink-0" />
              {h.cta_simulator}
            </Link>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:divide-x divide-slate-100 border-t border-slate-100 pt-6"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.62 + i * 0.08 }}
                className="flex flex-col items-center text-center px-2 first:ps-0 last:pe-0"
              >
                <div className="text-xl font-bold text-slate-900">{s.value}</div>
                <div className="text-blue-500 text-xs mt-0.5 leading-tight">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: X-ray visual — fills full column height ─────── */}
        <div
          className="order-1 lg:order-2 h-[420px] sm:h-[480px] lg:h-full w-full relative overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Mobile badge — overlaid at top of X-ray panel */}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute inset-0"
          >
            <ChestXrayCanvas />
          </motion.div>

          {/* DICOM chip */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full shadow-sm pointer-events-none m-[0px] px-[11px] py-[4px]"
          >
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-slate-600 tracking-wide">PA CHEST 14 kV - 32 mA</span>
          </motion.div>

          {/* L / R markers — anatomically correct */}
          {[
            { label: 'L', side: 'left-5'  },
            { label: 'R', side: 'right-5' },
          ].map(m => (
            <motion.span
              key={m.label}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className={`absolute ${m.side} top-1/2 -translate-y-1/2 font-mono text-xs text-blue-400 font-bold pointer-events-none`}
            >{m.label}</motion.span>
          ))}

          {/* Anatomy hotspot dots */}
          {hotspots.map(h2 => (
            <motion.div
              key={h2.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: h2.delay, type: 'spring', stiffness: 240 }}
              className="absolute"
              style={{ left: h2.x, top: h2.y }}
            >
              <div className="relative group cursor-default">
                <div className="w-2 h-2 bg-blue-500 rounded-full border-2 border-white shadow-md" />
                <div className="absolute start-3.5 top-1/2 -translate-y-1/2 hidden group-hover:flex bg-slate-900/90 text-white text-[9px] px-1.5 py-0.5 rounded-md whitespace-nowrap z-10">
                  {h2.label}
                </div>
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-35" />
              </div>
            </motion.div>
          ))}

          {/* Interact hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-medium tracking-wide pointer-events-none whitespace-nowrap"
          >
            {h.hint}
          </motion.div>
        </div>

      </div>
    </section>
  );
}