'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import ResilientImage from '@/app/components/ResilientImage';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   Cognitive Science｜认知科学 — Chapter 3
   Scroll Storytelling   Apple + Museum Exhibition
   ═══════════════════════════════════════════════════════════════ */

/* ─── Shared: Before/After Slider ─── */

function BeforeAfterSlider({
  beforeImg,
  afterImg,
  beforeLabel = 'Before',
  afterLabel = 'After',
  beforeFilter,
  afterFilter,
}: {
  beforeImg: string;
  afterImg: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeFilter?: string;
  afterFilter?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const dragging = useRef(false);

  const updatePos = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePos(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePos(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none cursor-ew-resize"
      style={{ userSelect: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* After (full) */}
      <div className="absolute inset-0">
        <ResilientImage src={afterImg} alt={afterLabel} className="w-full h-full object-cover" loading="lazy" style={{ filter: afterFilter }} />
        <span className="absolute top-3 right-3 font-en text-[clamp(0.5rem,0.6vw,0.75rem)] text-white/70 tracking-[0.08em] bg-black/40 px-2 py-0.5 rounded">
          {afterLabel}
        </span>
      </div>
      {/* Before (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
        <ResilientImage src={beforeImg} alt={beforeLabel} className="w-full h-full object-cover" loading="lazy" style={{ filter: beforeFilter }} />
        <span className="absolute top-3 left-3 font-en text-[clamp(0.5rem,0.6vw,0.75rem)] text-white/70 tracking-[0.08em] bg-black/40 px-2 py-0.5 rounded">
          {beforeLabel}
        </span>
      </div>
      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white bg-black/30 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M9 5L4 12L9 19" />
            <path d="M15 5L20 12L15 19" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Sections
   ═══════════════════════════════════════════════════════════════ */

/* ─── Section 01 — Title ─── */

function Section01Title() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ height: '100dvh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <h1 className="font-en text-[clamp(2.5rem,6vw,6rem)] font-black text-text tracking-tight leading-none">
          Cognitive Science
        </h1>
        <p className="font-cn text-[clamp(0.875rem,1.4vw,1.5rem)] text-text-secondary mt-6 tracking-[0.04em]">
          认知科学
        </p>
        <p className="font-en text-[clamp(0.625rem,0.9vw,1rem)] text-text-tertiary mt-4 tracking-[0.12em]">
          Human Perception
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 02 — Question ─── */

function Section02Question() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ height: '100dvh' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-6 max-w-3xl"
      >
        <p className="font-cn text-[clamp(1.5rem,3.5vw,3.5rem)] text-text font-medium leading-[1.3] tracking-tight">
          为什么24fps更像电影，
          <br />
          而60fps反而像电视剧？
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 03 — Frame Rate Comparison ─── */

const FRAME_RATE_ITEMS = [
  { fps: '24', label: '24fps', desc: '电影感', filter: 'none', accent: false, src: '/24fps.jpg' },
  { fps: '48', label: '48fps', desc: '中间状态', filter: 'none', accent: false, src: '/48fps.webp' },
  { fps: '60', label: '60fps', desc: '电视感', filter: 'none', accent: true, src: '/60fps.webp' },
];

function Section03FrameRate() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '100dvh', padding: '10vh 4vw' }}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-cn text-[clamp(0.75rem,1vw,1rem)] text-text-tertiary mb-8 tracking-[0.12em]"
      >
        同一段内容，三种帧率
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl w-full mb-10">
        {FRAME_RATE_ITEMS.map((item, i) => (
          <motion.div
            key={item.fps}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="flex flex-col items-center"
          >
            <div
              className="w-full aspect-[16/9] overflow-hidden rounded-sm mb-3 relative"
              style={{
                outline: item.accent ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <ResilientImage
                src={item.src}
                alt={`${item.fps}fps`}
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ filter: item.filter }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-3 left-3 font-en text-[clamp(1.25rem,2vw,2rem)] font-bold text-white/90 tracking-tight">
                {item.fps}
                <span className="text-[clamp(0.5rem,0.7vw,0.75rem)] font-normal text-white/60 ml-1">fps</span>
              </span>
            </div>
            <span className="font-cn text-[clamp(0.625rem,0.8vw,0.875rem)] text-text-secondary tracking-[0.04em]">
              {item.desc}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text tracking-tight"
      >
        哪一种更像电影？
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-30%' }}
        transition={{ duration: 1, delay: 1 }}
        className="font-cn text-[clamp(0.5rem,0.7vw,0.75rem)] text-text-tertiary mt-4 tracking-[0.12em]"
      >
        不要立即解释。
      </motion.p>
    </section>
  );
}

/* ─── Section 04 — Reveal ─── */

function Section04Reveal() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ height: '100dvh' }}>
      <div className="text-center px-6 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn text-[clamp(1rem,2vw,2rem)] text-text-secondary leading-relaxed tracking-tight"
        >
          大多数人会选择：
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-25%' }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-en text-[clamp(3rem,7vw,7rem)] font-black text-text tracking-tight mt-6 leading-none"
        >
          24fps。
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-35%' }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-12"
        >
          <p className="font-cn text-[clamp(0.875rem,1.2vw,1.25rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
            因为电影不是最清晰。
          </p>
          <p className="font-cn text-[clamp(0.875rem,1.2vw,1.25rem)] text-text mt-4 leading-relaxed tracking-[0.04em]">
            而是最熟悉。
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 05 — Soap Opera Effect ─── */

function Section05SoapOpera() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.5rem,3vw,3rem)] font-bold text-text tracking-tight text-center"
      >
        Soap Opera Effect
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-cn text-[clamp(0.625rem,0.85vw,0.875rem)] text-text-tertiary mt-2 mb-8 tracking-[0.12em]"
      >
        肥皂剧效应
      </motion.p>
      <a href="https://en.wikipedia.org/wiki/Motion_interpolation#Soap_opera_effect" target="_blank" rel="noopener noreferrer"
         className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
        ↗ wikipedia.org
      </a>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-4xl"
        style={{ height: '50vh', maxHeight: '400px' }}
      >
        <BeforeAfterSlider
          beforeImg="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=90"
          afterImg="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=90"
          beforeLabel="关闭 Motion Smoothing"
          afterLabel="开启 Motion Smoothing"
          afterFilter="contrast(1.25) saturate(1.15)"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-8 max-w-lg"
      >
        <p className="font-cn text-[clamp(0.75rem,1vw,1rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          画面越流畅，
          <br />
          反而越不像电影。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 06 — Predictive Coding ─── */

const PREDICTIVE_NODES = [
  { id: 'prediction', label: 'Prediction', cn: '预测' },
  { id: 'sensory', label: 'Sensory Input', cn: '感官输入' },
  { id: 'error', label: 'Prediction Error', cn: '预测误差' },
  { id: 'update', label: 'Update', cn: '更新模型' },
];

function Section06PredictiveCoding() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const ctx = gsap.context(() => {
      const paths = svg.querySelectorAll<SVGPathElement>('.pc-arrow');
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onEnter: () => {
          paths.forEach((p, i) => {
            const len = p.getTotalLength();
            gsap.fromTo(p,
              { strokeDashoffset: len, strokeDasharray: len },
              { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.1 }
            );
          });
        },
        once: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const boxW = 180;
  const boxH = 52;
  const gapY = 40;
  const startY = 20;
  const cx = 240;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black select-none flex flex-col items-center justify-center"
      style={{ minHeight: '100dvh', padding: '8vh 4vw' }}
    >
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-cn text-[clamp(0.625rem,0.85vw,0.875rem)] text-text-tertiary mb-8 tracking-[0.12em]"
      >
        大脑的工作机制
      </motion.p>
      <a href="https://en.wikipedia.org/wiki/Predictive_coding" target="_blank" rel="noopener noreferrer"
         className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
        ↗ wikipedia.org
      </a>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="w-full max-w-lg"
      >
        <svg
          ref={svgRef}
          viewBox="0 0 480 370"
          className="w-full h-auto"
          style={{ maxHeight: '55vh' }}
        >
          {PREDICTIVE_NODES.map((node, i) => {
            const y = startY + i * (boxH + gapY);
            return (
              <g key={node.id}>
                <rect
                  x={cx - boxW / 2}
                  y={y}
                  width={boxW}
                  height={boxH}
                  rx="6"
                  ry="6"
                  fill="none"
                  stroke="#555555"
                  strokeWidth="1"
                />
                <text
                  x={cx}
                  y={y + 22}
                  textAnchor="middle"
                  dominantBaseline="auto"
                  className="font-en"
                  fill="#e0e0e0"
                  fontSize="14"
                  fontWeight="500"
                >
                  {node.label}
                </text>
                <text
                  x={cx}
                  y={y + 40}
                  textAnchor="middle"
                  dominantBaseline="auto"
                  className="font-cn"
                  fill="#888888"
                  fontSize="12"
                >
                  {node.cn}
                </text>
              </g>
            );
          })}

          {/* Downward arrows */}
          {[0, 1, 2].map((i) => {
            const y1 = startY + i * (boxH + gapY) + boxH;
            const y2 = y1 + gapY;
            return (
              <g key={`arrow-${i}`}>
                <path
                  className="pc-arrow"
                  d={`M ${cx} ${y1} L ${cx} ${y2 - 8}`}
                  fill="none"
                  stroke="#555555"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <polygon
                  className="pc-arrow"
                  points={`${cx - 4},${y2 - 8} ${cx + 4},${y2 - 8} ${cx},${y2 - 2}`}
                  fill="#555555"
                />
              </g>
            );
          })}

          {/* Feedback arrow (Update → Prediction) */}
          <path
            className="pc-arrow"
            d={`M ${cx + boxW / 2} ${startY + 3 * (boxH + gapY) + boxH / 2}
                L ${cx + boxW / 2 + 40} ${startY + 3 * (boxH + gapY) + boxH / 2}
                L ${cx + boxW / 2 + 40} ${startY + boxH / 2}
                L ${cx + boxW / 2 + 10} ${startY + boxH / 2}`}
            fill="none"
            stroke="#555555"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="8 4"
          />
          <polygon
            className="pc-arrow"
            points={`${cx + boxW / 2 + 10},${startY + boxH / 2 - 4} ${cx + boxW / 2 + 10},${startY + boxH / 2 + 4} ${cx + boxW / 2 + 2},${startY + boxH / 2}`}
            fill="#555555"
          />

          {/* Right label for feedback loop */}
          <text
            x={cx + boxW / 2 + 50}
            y={startY + 3 * (boxH + gapY) + boxH / 2 + 4}
            textAnchor="start"
            dominantBaseline="auto"
            fill="#666666"
            fontSize="10"
            className="font-en"
          >
            feedback
          </text>
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-10 max-w-lg"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          大脑不是接收世界。
          <br />
          而是在不断预测世界。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 07 — Fovea ─── */

function Section07Fovea() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.5rem,3vw,3rem)] font-bold text-text tracking-tight mb-2"
      >
        Fovea
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-cn text-[clamp(0.625rem,0.85vw,0.875rem)] text-text-tertiary mb-8 tracking-[0.12em]"
      >
        中央凹
      </motion.p>
      <a href="https://en.wikipedia.org/wiki/Fovea_centralis" target="_blank" rel="noopener noreferrer"
         className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
        ↗ wikipedia.org
      </a>

      {/* Eyeball cross-section diagram */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full max-w-lg flex items-center justify-center"
        style={{ aspectRatio: '1', maxHeight: '45vh' }}
      >
        <ResilientImage
          src="/human-eye-diagram.svg"
          alt="Human eye cross-section — fovea centralis highlighted in retina"
          className="w-full h-full object-contain"
          style={{ filter: 'invert(1) hue-rotate(180deg)' }}
          loading="lazy"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-8 max-w-lg"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          真正清晰的，
          <br />
          只有中央凹。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 08 — Peripheral Vision ─── */

function Section08PeripheralVision() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight mb-8"
      >
        Peripheral Vision
      </motion.h2>
      <a href="https://en.wikipedia.org/wiki/Peripheral_vision" target="_blank" rel="noopener noreferrer"
         className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
        ↗ wikipedia.org
      </a>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full max-w-3xl overflow-hidden rounded-sm"
        style={{ aspectRatio: '16/9' }}
      >
        <ResilientImage
          src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200&q=90"
          alt="Peripheral vision demonstration"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Radial overlay: center clear, edges blurred/desaturated */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              circle at 50% 50%,
              transparent 0%,
              transparent 18%,
              rgba(0,0,0,0.15) 22%,
              rgba(0,0,0,0.5) 38%,
              rgba(0,0,0,0.75) 55%,
              rgba(0,0,0,0.9) 70%
            )`,
          }}
        />
        <div className="absolute inset-0" style={{ filter: 'blur(4px)', clipPath: 'circle(30% at 50% 50%)', opacity: 0 }} />
        {/* Label */}
        <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
          <span className="font-cn text-[clamp(0.5rem,0.7vw,0.75rem)] text-white/50 tracking-[0.08em]">
            周边几乎看不见细节
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-8 max-w-lg"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          人真正看到的，
          <br />
          远比想象中更少。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 09 — Saccade ─── */

const GAZE_POINTS = [
  { x: 25, y: 35, label: '①' },
  { x: 65, y: 25, label: '②' },
  { x: 55, y: 55, label: '③' },
  { x: 20, y: 60, label: '④' },
  { x: 75, y: 60, label: '⑤' },
];

function Section09Saccade() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const gazeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cursor = cursorRef.current;
    const container = gazeContainerRef.current;
    if (!section || !cursor || !container) return;

    let animation: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onEnter: () => {
          // Show gaze points
          gsap.to('.gaze-dot', { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08 });

          // Animate cursor jumping between points
          const points = GAZE_POINTS.map((p) => ({
            x: (p.x / 100) * container.offsetWidth,
            y: (p.y / 100) * container.offsetHeight,
          }));

          animation = gsap.timeline({ repeat: 2, repeatDelay: 1 });
          animation.set(cursor, { opacity: 1, x: points[0].x, y: points[0].y });

          for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            // Pause at current point
            animation.to(cursor, { x: prev.x, y: prev.y, duration: 0.4 });
            // Quick saccade jump
            animation.to(cursor, {
              x: curr.x,
              y: curr.y,
              duration: 0.08,
              ease: 'power1.in',
            });
          }

          animation.to(cursor, { x: points[0].x, y: points[0].y, duration: 0.08, ease: 'power1.in' });
        },
        once: true,
      });
    }, section);

    return () => {
      ctx.revert();
      if (animation) animation.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black select-none flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100dvh', padding: '8vh 4vw' }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.5rem,3vw,3rem)] font-bold text-text tracking-tight mb-2"
      >
        Saccade
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-cn text-[clamp(0.625rem,0.85vw,0.875rem)] text-text-tertiary mb-8 tracking-[0.12em]"
      >
        眼跳
      </motion.p>
      <a href="https://en.wikipedia.org/wiki/Saccade" target="_blank" rel="noopener noreferrer"
         className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
        ↗ wikipedia.org
      </a>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full max-w-3xl overflow-hidden rounded-sm"
        style={{ aspectRatio: '16/9' }}
        ref={gazeContainerRef}
      >
        <ResilientImage
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=90"
          alt="Saccade demonstration"
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Gaze points */}
        {GAZE_POINTS.map((p, i) => (
          <div
            key={i}
            className="gaze-dot absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/60 bg-white/10 flex items-center justify-center opacity-0 scale-0"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transition: 'opacity 0.3s, transform 0.3s' }}
          >
            <span className="font-en text-[8px] text-white/80">{p.label}</span>
          </div>
        ))}

        {/* Cursor (eye gaze indicator) */}
        <div
          ref={cursorRef}
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/50 opacity-0 pointer-events-none"
          style={{ boxShadow: '0 0 12px rgba(255,255,255,0.3)' }}
        />

        {/* Saccade path lines (static decoration) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          {GAZE_POINTS.slice(0, -1).map((p, i) => {
            const next = GAZE_POINTS[i + 1];
            return (
              <line
                key={i}
                x1={`${p.x}%`}
                y1={`${p.y}%`}
                x2={`${next.x}%`}
                y2={`${next.y}%`}
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-8 max-w-lg"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          眼睛不断跳跃。
          <br />
          大脑负责补全连续世界。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 10 — Gestalt Principles ─── */

function Section10Gestalt() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '10vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.5rem,3vw,3rem)] font-bold text-text tracking-tight mb-10"
      >
        Gestalt Principles
      </motion.h2>
      <a href="https://en.wikipedia.org/wiki/Gestalt_psychology" target="_blank" rel="noopener noreferrer"
         className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
        ↗ wikipedia.org
      </a>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full mb-10">
        {/* Closure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <svg viewBox="0 0 120 130" className="w-28 h-30 mb-4">
            <circle cx="60" cy="55" r="42" fill="none" stroke="#888888" strokeWidth="2.5" />
            <text x="60" y="118" className="font-en" fill="#666666" fontSize="8" textAnchor="middle">Closure</text>
          </svg>
          <p className="font-cn text-[clamp(0.625rem,0.8vw,0.875rem)] text-text-secondary tracking-[0.04em]">
            闭合
          </p>
        </motion.div>

        {/* Similarity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <svg viewBox="0 0 120 120" className="w-28 h-28 mb-4">
            {/* Row of circles then squares → grouped by similarity */}
            <circle cx="20" cy="45" r="6" fill="none" stroke="#888888" strokeWidth="2" />
            <circle cx="40" cy="45" r="6" fill="none" stroke="#888888" strokeWidth="2" />
            <circle cx="60" cy="45" r="6" fill="none" stroke="#888888" strokeWidth="2" />
            <rect x="76" y="39" width="12" height="12" rx="1" fill="none" stroke="#888888" strokeWidth="2" />
            <rect x="92" y="39" width="12" height="12" rx="1" fill="none" stroke="#888888" strokeWidth="2" />
            <rect x="76" y="65" width="12" height="12" rx="1" fill="none" stroke="#888888" strokeWidth="2" />
            <rect x="92" y="65" width="12" height="12" rx="1" fill="none" stroke="#888888" strokeWidth="2" />
            <circle cx="20" cy="75" r="6" fill="none" stroke="#888888" strokeWidth="2" />
            <circle cx="40" cy="75" r="6" fill="none" stroke="#888888" strokeWidth="2" />
            <circle cx="60" cy="75" r="6" fill="none" stroke="#888888" strokeWidth="2" />
            <text x="60" y="105" className="font-en" fill="#666666" fontSize="8" textAnchor="middle">Similarity</text>
          </svg>
          <p className="font-cn text-[clamp(0.625rem,0.8vw,0.875rem)] text-text-secondary tracking-[0.04em]">
            相似
          </p>
        </motion.div>

        {/* Continuity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <svg viewBox="0 0 120 120" className="w-28 h-28 mb-4">
            {/* Crossing lines — perceived as continuous */}
            <line x1="10" y1="35" x2="110" y2="35" stroke="#888888" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="10" y1="85" x2="110" y2="85" stroke="#888888" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="35" y1="10" x2="35" y2="110" stroke="#666666" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="85" y1="10" x2="85" y2="110" stroke="#666666" strokeWidth="2.5" strokeLinecap="round" />
            {/* Gap in vertical lines at crossing */}
            <line x1="35" y1="30" x2="35" y2="40" stroke="#0E0E0E" strokeWidth="4" />
            <line x1="35" y1="80" x2="35" y2="90" stroke="#0E0E0E" strokeWidth="4" />
            <line x1="85" y1="30" x2="85" y2="40" stroke="#0E0E0E" strokeWidth="4" />
            <line x1="85" y1="80" x2="85" y2="90" stroke="#0E0E0E" strokeWidth="4" />
            <text x="60" y="108" className="font-en" fill="#666666" fontSize="8" textAnchor="middle">Continuity</text>
          </svg>
          <p className="font-cn text-[clamp(0.625rem,0.8vw,0.875rem)] text-text-secondary tracking-[0.04em]">
            连续
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center max-w-lg"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          大脑会自动补全缺失的信息。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 11 — Temporal Resolution ─── */

function Section11TemporalResolution() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ height: '100dvh' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.5rem,3vw,3rem)] font-bold text-text tracking-tight mb-8"
      >
        Temporal Resolution
      </motion.h2>
      <a href="https://en.wikipedia.org/wiki/Temporal_resolution#Vision" target="_blank" rel="noopener noreferrer"
         className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
        ↗ wikipedia.org
      </a>

      {/* Visual: frame rate bar comparison */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-xl mb-10"
      >
        <div className="space-y-4">
          {/* 24 fps bar */}
          <div className="flex items-center gap-4">
            <span className="font-en text-[clamp(0.75rem,1vw,1rem)] text-text-tertiary w-16 text-right">24fps</span>
            <div className="flex-1 h-6 bg-[#1a1a1a] rounded-sm overflow-hidden flex">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 mx-[1px] first:ml-0 last:mr-0 rounded-sm"
                  style={{
                    backgroundColor: i < 4 ? '#555555' : '#222222',
                    opacity: 0.8 - i * 0.1,
                  }}
                />
              ))}
            </div>
            <span className="font-cn text-[clamp(0.5rem,0.7vw,0.75rem)] text-text-tertiary w-12">电影</span>
          </div>
          {/* 60 fps bar */}
          <div className="flex items-center gap-4">
            <span className="font-en text-[clamp(0.75rem,1vw,1rem)] text-text-tertiary w-16 text-right">60fps</span>
            <div className="flex-1 h-6 bg-[#1a1a1a] rounded-sm overflow-hidden flex">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 mx-[1px] first:ml-0 last:mr-0 rounded-sm"
                  style={{
                    backgroundColor: '#555555',
                    opacity: 0.9 - i * 0.05,
                  }}
                />
              ))}
            </div>
            <span className="font-cn text-[clamp(0.5rem,0.7vw,0.75rem)] text-text-tertiary w-12">电视</span>
          </div>
        </div>
        {/* Gap indicator */}
        <div className="mt-6 text-center">
          <span className="font-en text-[clamp(0.5rem,0.65vw,0.75rem)] text-accent/60 tracking-[0.08em]">
            每秒画面数量相差 2.5x
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center max-w-lg"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          人感受到的连续，
          <br />
          不是无限提高帧率。
          <br />
          而是达到预测所需即可。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 12 — Attention ─── */

function Section12Attention() {
  const [showHint, setShowHint] = useState(false);

  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.5rem,3vw,3rem)] font-bold text-text tracking-tight mb-8"
      >
        Attention
      </motion.h2>
      <a href="https://en.wikipedia.org/wiki/Selective_attention" target="_blank" rel="noopener noreferrer"
         className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
        ↗ wikipedia.org
      </a>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative w-full max-w-3xl overflow-hidden rounded-sm cursor-pointer"
        style={{ aspectRatio: '16/9' }}
        onClick={() => setShowHint(!showHint)}
      >
        <ResilientImage
          src="https://images.unsplash.com/photo-1520529277867-dbf8c5e0b340?w=1200&q=90"
          alt="Attention demonstration"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Spotlight overlay — only center is visible */}
        <div
          className="absolute inset-0"
          style={{
            background: showHint
              ? 'rgba(0,0,0,0.05)'
              : `radial-gradient(
                  circle at 50% 50%,
                  transparent 0%,
                  transparent 50%,
                  rgba(0,0,0,0.4) 55%,
                  rgba(0,0,0,0.85) 68%,
                  rgba(0,0,0,0.95) 80%
                )`,
            transition: 'background 0.6s ease',
          }}
        />
        <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
          <span className="font-cn text-[clamp(0.5rem,0.7vw,0.75rem)] text-white/50 tracking-[0.08em]">
            点击切换视野范围
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-8 max-w-lg"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          注意力决定你看到什么。
          <br />
          不是所有信息都会进入意识。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 13 — Uncanny Valley ─── */

const UNCANY_IMAGES = [
  { label: '卡通', src: 'https://images.unsplash.com/photo-1707396172424-f3293f788364?w=300&q=90', x: 8 },
  { label: '动画', src: 'https://images.unsplash.com/photo-1743247299142-35028faf885d?w=300&q=90', x: 35 },
  { label: '数字人', src: 'https://images.unsplash.com/photo-1662323399513-8e5e8efe5a08?w=300&q=90', x: 62 },
  { label: '真人', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=90', x: 88 },
];

function Section13UncannyValley() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center overflow-hidden" style={{ minHeight: '100dvh', padding: '10vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.5rem,3vw,3rem)] font-bold text-text tracking-tight mb-2"
      >
        Uncanny Valley
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-cn text-[clamp(0.625rem,0.85vw,0.875rem)] text-text-tertiary mb-8 tracking-[0.12em]"
      >
        恐怖谷
      </motion.p>
      <a href="https://en.wikipedia.org/wiki/Uncanny_valley" target="_blank" rel="noopener noreferrer"
         className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
        ↗ wikipedia.org
      </a>

      {/* 4 Faces */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-4 gap-3 max-w-2xl w-full mb-8"
      >
        {UNCANY_IMAGES.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-full aspect-square overflow-hidden rounded-sm mb-2 bg-[#1a1a1a]">
              <ResilientImage src={item.src} alt={item.label} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <span className="font-cn text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary tracking-[0.08em]">
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* Uncanny Valley Graph */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-xl"
      >
        <svg viewBox="0 0 400 160" className="w-full h-auto">
          {/* Axes */}
          <line x1="30" y1="130" x2="380" y2="130" stroke="#444444" strokeWidth="1" />
          <line x1="30" y1="130" x2="30" y2="15" stroke="#444444" strokeWidth="1" />

          {/* Y-axis label */}
          <text x="18" y="75" textAnchor="middle" transform="rotate(-90 18 75)" className="font-en" fill="#555555" fontSize="8">
            Familiarity
          </text>
          {/* X-axis label */}
          <text x="205" y="150" textAnchor="middle" className="font-en" fill="#555555" fontSize="8">
            Human Likeness →
          </text>

          {/* The Uncanny Valley curve */}
          <path
            d="M 35 40 C 60 30, 90 25, 120 30 C 150 35, 180 55, 200 70 C 220 85, 240 100, 260 95 C 280 90, 310 65, 340 45 C 360 35, 370 30, 375 28"
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Shaded valley area */}
          <path
            d="M 180 130 L 180 65 C 200 80, 220 92, 240 95 C 260 92, 280 80, 300 60 L 300 130 Z"
            fill="white"
            opacity="0.04"
          />

          {/* Valley label */}
          <text x="240" y="115" textAnchor="middle" className="font-cn" fill="#666666" fontSize="8">
            恐怖谷
          </text>
          <text x="240" y="125" textAnchor="middle" className="font-en" fill="#444444" fontSize="7">
            Uncanny Valley
          </text>

          {/* Data points matching images */}
          {UNCANY_IMAGES.map((item, i) => {
            const px = 30 + (item.x / 100) * 350;
            // Map x to curve y
            const nx = item.x / 100;
            const yPos = 130 - (15 + 90 * Math.exp(-Math.pow((nx - 0.15) / 0.15, 2)) + 60 * Math.exp(-Math.pow((nx - 0.9) / 0.12, 2)) - 35 * Math.exp(-Math.pow((nx - 0.5) / 0.12, 2)));
            return (
              <g key={item.label}>
                <circle cx={px} cy={yPos} r="3" fill="#e0e0e0" />
                <line x1={px} y1={yPos + 3} x2={px} y2={130} stroke="#444444" strokeWidth="0.5" strokeDasharray="2 2" />
              </g>
            );
          })}

          {/* Annotations on curve */}
          <text x="75" y="20" className="font-en" fill="#555555" fontSize="7" textAnchor="middle">卡通</text>
          <text x="270" y="18" className="font-en" fill="#555555" fontSize="7" textAnchor="middle">真人</text>
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center mt-8 max-w-lg"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          越接近真人，
          <br />
          越容易暴露错误。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 14 — Chapter Summary ─── */

function Section14Summary() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ height: '100dvh' }}>
      <div className="text-center px-6 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn text-[clamp(1rem,2vw,2rem)] text-text-secondary leading-relaxed tracking-tight"
        >
          真实，
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-25%' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn text-[clamp(1rem,2vw,2rem)] text-text-secondary leading-relaxed mt-6 tracking-tight"
        >
          不是信息越多。
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-25%' }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn text-[clamp(1rem,2vw,2rem)] text-text-secondary leading-relaxed mt-6 tracking-tight"
        >
          真实，
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-25%' }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn text-[clamp(1rem,2vw,2rem)] text-text-secondary leading-relaxed mt-6 tracking-tight"
        >
          不是分辨率越高。
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-25%' }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn text-[clamp(1rem,2vw,2rem)] text-text-secondary leading-relaxed mt-6 tracking-tight"
        >
          真实，
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-25%' }}
          transition={{ duration: 0.8, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn text-[clamp(1rem,2vw,2rem)] text-text-secondary leading-relaxed mt-6 tracking-tight"
        >
          不是帧率越高。
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-35%' }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-12"
        >
          <p className="font-cn text-[clamp(0.875rem,1.2vw,1.25rem)] text-text leading-relaxed tracking-[0.02em]">
            真实，
            <br />
            来自符合预测。
          </p>
          <p className="font-en text-[clamp(0.625rem,0.85vw,0.875rem)] text-accent mt-4 tracking-[0.02em]">
            Believability comes from expectation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Export
   ═══════════════════════════════════════════════════════════════ */

export default function CognitiveScienceSection() {
  return (
    <section id="section-cognitive-science" className="relative w-full bg-black">
      <Section01Title />
      <Section02Question />
      <Section03FrameRate />
      <Section04Reveal />
      <Section05SoapOpera />
      <Section06PredictiveCoding />
      <Section07Fovea />
      <Section08PeripheralVision />
      <Section09Saccade />
      <Section10Gestalt />
      <Section11TemporalResolution />
      <Section12Attention />
      <Section13UncannyValley />
      <Section14Summary />
    </section>
  );
}
