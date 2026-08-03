'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { assetUrl } from '@/app/lib/assets';
import ResilientImage from '@/app/components/ResilientImage';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   Computer Graphics｜计算机图形学 — Chapter 2
   Scroll Storytelling   Apple + NVIDIA GTC + Museum Exhibition
   ═══════════════════════════════════════════════════════════════ */

/* ─── Types ─── */

interface PipelineNode {
  id: string;
  label: string;
  en: string;
  explanation: string;
}

/* ─── Data ─── */

const PIPELINE_NODES_CG: PipelineNode[] = [
  { id: 'world',    label: '现实世界',   en: 'World',      explanation: '所有视觉信息的起点。' },
  { id: 'object',   label: '物体',       en: 'Object',     explanation: '三维几何。定义世界的形状与结构。' },
  { id: 'material', label: '材质',       en: 'Material',   explanation: '决定物体如何响应光线。' },
  { id: 'lighting', label: '光照',       en: 'Lighting',   explanation: '决定整个世界的光能分布。' },
  { id: 'camera',   label: '相机',       en: 'Camera',     explanation: '模拟真实摄影机。定义视角与成像。' },
  { id: 'pixels',   label: '像素',       en: 'Pixels',     explanation: '最终计算结果。图像的最小单元。' },
  { id: 'screen',   label: '屏幕',       en: 'Screen',     explanation: '用户真正看到的图像。' },
];

const CG_ACHIEVEMENTS = [
  '真实光照', '真实阴影', '真实反射', '真实材质',
  '真实天气', '真实植被', '真实体积光', '真实相机运动',
];

const CG_SOLVED = [
  '光照', '阴影', '材质', '反射', '体积光', '天气', '景深', '运动',
];

/* ═══════════════════════════════════════════════════════════════
   Shared: Before/After Slider
   ═══════════════════════════════════════════════════════════════ */

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
          Computer Graphics
        </h1>
        <p className="font-cn text-[clamp(0.875rem,1.4vw,1.5rem)] text-text-secondary mt-6 tracking-[0.04em]">
          计算机图形学
        </p>
        <p className="font-en text-[clamp(0.625rem,0.9vw,1rem)] text-text-tertiary mt-4 tracking-[0.12em]">
          World Simulation
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
          为什么游戏越来越真实，
          <br />
          却越来越假？
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 03 — Four Full-Screen Images ─── */

const GAME_IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1760891494704-bd9fabef4757?w=1920&q=90',
    alt: 'Real landscape — golden hour mountain range (Sony Alpha)',
  },
  {
    src: assetUrl('/horizon-landscape.jpg'),
    alt: 'Horizon Forbidden West — sweeping valley landscape',
  },
  {
    src: assetUrl('/death-stranding-landscape.jpg'),
    alt: 'Death Stranding — Iceland-style mountain environment',
  },
  {
    src: 'https://images.unsplash.com/photo-1784146930580-6515cda159df?w=1920&q=90',
    alt: 'The Last of Us Part II — abandoned city overgrown by nature',
  },
];

function Section03FullImages() {
  return (
    <>
      {GAME_IMAGES.map((img, i) => (
        <section
          key={`game-${i}`}
          className="relative flex flex-col items-center justify-end w-full bg-black select-none overflow-hidden"
          style={{ height: '100dvh' }}
        >
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            src={img.src}
            alt={img.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20" />
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 mb-16"
          >
            <p className="font-cn text-[clamp(0.875rem,1.5vw,1.5rem)] text-white/80 tracking-[0.04em]">
              它真实吗？
            </p>
          </motion.div>
        </section>
      ))}
    </>
  );
}

/* ─── Section 03.5 — Page Title ─── */

function Section03Title() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ height: '100dvh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-6"
      >
        <p className="font-cn text-[clamp(1.25rem,3vw,3rem)] text-text font-medium leading-[1.4] tracking-tight">
          今天的游戏，
          <br />
          已经越来越像现实。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 04 — Four Images Shrink + Observations ─── */

function Section04ShrinkAndObserve() {
  return (
    <section className="relative w-full bg-black select-none" style={{ minHeight: '100dvh', padding: '12vh 4vw' }}>
      {/* 2×2 grid of the four images */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-2 gap-2 max-w-3xl mx-auto mb-16"
      >
        {GAME_IMAGES.map((img, i) => (
          <div key={i} className="aspect-[4/3] overflow-hidden rounded-sm">
            <ResilientImage src={img.src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </motion.div>

      {/* Main statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center mb-12"
      >
        <p className="font-cn text-[clamp(1rem,2vw,2rem)] text-text leading-relaxed tracking-tight">
          今天的CG，
          <br />
          几乎已经能够模拟：
        </p>
      </motion.div>

      {/* Achievements grid */}
      <div className="max-w-2xl mx-auto grid grid-cols-2 gap-x-8 gap-y-4">
        {CG_ACHIEVEMENTS.map((item, i) => (
          <motion.p
            key={item}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
            className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary tracking-[0.04em]"
          >
            {item}
          </motion.p>
        ))}
      </div>
    </section>
  );
}

/* ─── Section 05 — SVG Pipeline ─── */

function Section05Pipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const ctx = gsap.context(() => {
      const paths = svg.querySelectorAll<SVGPathElement>('.cg-pipeline-arrow');
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onEnter: () => {
          paths.forEach((p, i) => {
            const len = p.getTotalLength();
            gsap.fromTo(p,
              { strokeDashoffset: len, strokeDasharray: len },
              { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.08 }
            );
          });
        },
        once: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const nodeW = 90;
  const nodeH = 44;
  const gap = 32;
  const startX = 40;
  const y = 100;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black select-none flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100dvh', padding: '8vh 2vw' }}
    >
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-cn text-[clamp(0.75rem,1.1vw,1rem)] text-text-tertiary mb-8 tracking-[0.12em]"
      >
        现代CG到底在模拟什么？
      </motion.h3>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-5xl"
      >
        <svg
          ref={svgRef}
          viewBox="0 0 960 200"
          className="w-full h-auto"
          style={{ maxHeight: '50vh' }}
        >
          {/* Arrows */}
          {PIPELINE_NODES_CG.slice(0, -1).map((_, i) => {
            const rightEdge = startX + i * (nodeW + gap) + nodeW;
            const leftEdge = startX + (i + 1) * (nodeW + gap);
            return (
              <path
                key={`arrow-${i}`}
                className="cg-pipeline-arrow"
                d={`M ${rightEdge} ${y} L ${leftEdge - 6} ${y}`}
                fill="none"
                stroke="#555555"
                strokeWidth="1"
                strokeLinecap="round"
              />
            );
          })}
          {/* Arrow heads */}
          {PIPELINE_NODES_CG.slice(0, -1).map((_, i) => {
            const leftEdge = startX + (i + 1) * (nodeW + gap);
            return (
              <polygon
                key={`head-${i}`}
                className="cg-pipeline-arrow"
                points={`${leftEdge - 7},${y - 4} ${leftEdge - 7},${y + 4} ${leftEdge + 1},${y}`}
                fill="#555555"
                opacity="0.5"
              />
            );
          })}

          {/* Nodes */}
          {PIPELINE_NODES_CG.map((node, i) => {
            const x = startX + i * (nodeW + gap);
            const cx = x + nodeW / 2;
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: 'pointer' }}
              >
                <rect
                  x={x}
                  y={y - nodeH / 2}
                  width={nodeW}
                  height={nodeH}
                  rx="6"
                  ry="6"
                  fill="none"
                  stroke={hoveredId === node.id ? '#ffffff' : '#444444'}
                  strokeWidth="1"
                  style={{ transition: 'stroke 0.3s ease' }}
                />
                <text
                  x={cx}
                  y={y - 3}
                  textAnchor="middle"
                  dominantBaseline="auto"
                  className="font-cn"
                  fill={hoveredId === node.id ? '#ffffff' : '#999999'}
                  fontSize="13"
                  style={{ transition: 'fill 0.3s ease' }}
                >
                  {node.label}
                </text>
                <text
                  x={cx}
                  y={y + 14}
                  textAnchor="middle"
                  dominantBaseline="auto"
                  className="font-en"
                  fill={hoveredId === node.id ? '#ffffff' : '#666666'}
                  fontSize="10"
                  style={{ transition: 'fill 0.3s ease' }}
                >
                  {node.en}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredId && (
            <motion.div
              key={hoveredId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="text-center mt-6"
            >
              <p className="font-en text-[clamp(0.625rem,0.75vw,0.875rem)] text-accent tracking-[0.02em]">
                {PIPELINE_NODES_CG.find((n) => n.id === hoveredId)?.en}
              </p>
              <p className="font-cn text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-secondary mt-1">
                {PIPELINE_NODES_CG.find((n) => n.id === hoveredId)?.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom statement */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-12 max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          现代CG，
          <br />
          其实一直在模拟：
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.2vw,1.25rem)] text-text mt-2 tracking-[0.02em]">
          现实世界的物理规律。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 06 — PBR ─── */

function Section06PBR() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h2 className="font-en text-[clamp(1.5rem,3vw,3rem)] font-bold text-text tracking-tight">PBR</h2>
        <p className="font-en text-[clamp(0.625rem,0.85vw,0.875rem)] text-text-tertiary mt-2 tracking-[0.12em]">
          Physically Based Rendering
        </p>
        <a href="https://learnopengl.com/PBR/Theory" target="_blank" rel="noopener noreferrer"
           className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
          ↗ learnopengl.com
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-4xl"
        style={{ height: '50vh', maxHeight: '400px' }}
      >
        <BeforeAfterSlider
          beforeImg="https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=1200&q=80&sat=-80"
          afterImg="https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=1200&q=90"
          beforeLabel="没有PBR"
          afterLabel="使用PBR"
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
          PBR不是一种画风。
          <br />
          而是一套遵循物理规律的材质表达方式。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 07 — Ray Tracing ─── */

function Section07RayTracing() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight">Ray Tracing</h2>
        <a href="https://developer.nvidia.com/rtx/ray-tracing" target="_blank" rel="noopener noreferrer"
           className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
          ↗ nvidia.com/rtx
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-4xl"
        style={{ height: '50vh', maxHeight: '400px' }}
      >
        <BeforeAfterSlider
          beforeImg="https://images.unsplash.com/photo-1763217758104-3802e9b89909?w=1200&q=90"
          afterImg="https://images.unsplash.com/photo-1763217758104-3802e9b89909?w=1200&q=90"
          beforeLabel="传统渲染"
          afterLabel="Ray Tracing"
          beforeFilter="saturate(0.25) brightness(1.15)"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-8 max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          Ray Tracing
          <br />
          不是为了更漂亮。
          <br />
          而是为了让光线，
          <br />遵循现实。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 08 — Global Illumination ─── */

function Section08GlobalIllumination() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight">Global Illumination</h2>
        <a href="https://en.wikipedia.org/wiki/Global_illumination" target="_blank" rel="noopener noreferrer"
           className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
          ↗ wikipedia.org
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-4xl"
        style={{ height: '50vh', maxHeight: '400px' }}
      >
        <BeforeAfterSlider
          beforeImg="https://images.unsplash.com/photo-1780139618014-43dee310deca?w=1200&q=90"
          afterImg="https://images.unsplash.com/photo-1780139618014-43dee310deca?w=1200&q=90"
          beforeLabel="没有 GI"
          afterLabel="GI"
          beforeFilter="brightness(0.5) saturate(0.8)"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-8 max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          真实世界中，
          <br />
          每一次反射，
          <br />
          都会再次照亮世界。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 09 — Subsurface Scattering ─── */

const SSS_ITEMS = [
  { label: '皮肤', src: 'https://images.unsplash.com/photo-1634656883281-3a665dd2bb8a?w=400&q=80' },
  { label: '树叶', src: 'https://images.unsplash.com/photo-1773877149525-47079d416d7a?w=400&q=80' },
  { label: '蜡烛', src: 'https://images.unsplash.com/photo-1768935390834-618ff2b94ab5?w=400&q=80' },
  { label: '牛奶', src: 'https://images.unsplash.com/photo-1644346402970-d8d7304ff82f?w=400&q=80' },
  { label: '大理石', src: 'https://images.unsplash.com/photo-1756363211626-98f5a39bfbb4?w=400&q=80' },
];

function Section09SSS() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight mb-8"
      >
        Subsurface Scattering
      </motion.h2>
      <a href="https://en.wikipedia.org/wiki/Subsurface_scattering" target="_blank" rel="noopener noreferrer"
         className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
        ↗ wikipedia.org
      </a>

      <div className="grid grid-cols-5 gap-3 max-w-3xl w-full mb-10">
        {SSS_ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-full aspect-square overflow-hidden rounded-sm mb-2">
              <ResilientImage src={item.src} alt={item.label} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <span className="font-cn text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary tracking-[0.08em]">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          很多物体，
          <br />
          不是反射光。
          <br />
          而是让光进入，
          <br />
          再离开。
        </p>
        <p className="font-en text-[clamp(0.5rem,0.7vw,0.75rem)] text-accent mt-4 tracking-[0.12em]">
          Subsurface Scattering
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 10 — Motion Blur ─── */

function Section10MotionBlur() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      {/* SVG directional blur filter — horizontal motion blur */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="motion-blur-x" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14 0" />
          </filter>
        </defs>
      </svg>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight mb-8"
      >
        Motion Blur
      </motion.h2>
      <a href="https://en.wikipedia.org/wiki/Motion_blur#In_computer_graphics" target="_blank" rel="noopener noreferrer"
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
          beforeImg="https://images.unsplash.com/photo-1716738687053-1fdd116d41e1?w=1200&q=90"
          afterImg="https://images.unsplash.com/photo-1716738687053-1fdd116d41e1?w=1200&q=90"
          beforeLabel="关闭 Motion Blur"
          afterLabel="开启 Motion Blur"
          afterFilter="url(#motion-blur-x)"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-8 max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          真实世界中，
          <br />
          运动不是一系列静止图片。
        </p>
        <p className="font-cn text-[clamp(0.75rem,1vw,1rem)] text-text-tertiary mt-4 tracking-[0.04em]">
          Motion Blur 模拟的是：
          <br />
          <span className="text-text-secondary">曝光时间。</span>
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 11 — Temporal AA ─── */

function Section11TemporalAA() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight mb-8"
      >
        Temporal Anti-Aliasing
      </motion.h2>
      <a href="https://developer.unigine.com/en/docs/2.21/principles/render/antialiasing/taa" target="_blank" rel="noopener noreferrer"
         className="block font-en text-[clamp(0.375rem,0.45vw,0.5rem)] text-text-tertiary/30 hover:text-text-tertiary/60 transition-colors tracking-[0.12em] mt-1">
        ↗ unigine.dev
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
          beforeImg="https://images.unsplash.com/photo-1739288181795-e7bc90901884?w=1200&q=90"
          afterImg="https://images.unsplash.com/photo-1739288181795-e7bc90901884?w=1200&q=90"
          beforeLabel="开启前"
          afterLabel="开启后"
          beforeFilter="blur(1.5px)"
          afterFilter="contrast(1.35) saturate(1.15)"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center mt-8 max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          Temporal AA
          <br />
          利用时间，
          <br />
          改善空间。
        </p>
        <p className="font-cn text-[clamp(0.625rem,0.9vw,0.875rem)] text-text-tertiary mt-4 tracking-[0.04em]">
          它让锯齿，越来越接近连续世界。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 12 — The Real Question ─── */

function Section12RealQuestion() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ height: '100dvh' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-6 max-w-2xl"
      >
        <p className="font-cn text-[clamp(1.25rem,3vw,3rem)] text-text font-medium leading-[1.4] tracking-tight">
          那么。
          <br />
          为什么我们还是觉得：
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-30%' }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-cn text-[clamp(1.5rem,3.5vw,3.5rem)] text-text font-medium mt-6 leading-tight"
        >
          它是假的？
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ─── Section 13 — What's Missing ─── */

const WEATHERED_PHOTOS = [
  { label: '裂纹', src: 'https://images.unsplash.com/photo-1783970875247-211d014a3f2c?w=400&q=80' },
  { label: '生锈', src: 'https://images.unsplash.com/photo-1680860061439-fae4c57ae7ce?w=400&q=80' },
  { label: '磨损', src: 'https://images.unsplash.com/photo-1758348613707-96ffd2baa14d?w=400&q=80' },
  { label: '青苔', src: 'https://images.unsplash.com/photo-1733414170079-94fe59b06ae6?w=400&q=80' },
];

function Section13WhatsMissing() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none overflow-hidden" style={{ minHeight: '100dvh', padding: '10vh 4vw' }}>
      {/* CG已经解决了 word list */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.6 }}
        className="font-cn text-[clamp(1rem,2vw,2rem)] text-text mb-6 tracking-tight"
      >
        CG已经解决了：
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-4 gap-x-6 gap-y-3 max-w-2xl mb-16"
      >
        {CG_SOLVED.map((item, i) => (
          <motion.p
            key={item}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="font-cn text-[clamp(0.75rem,1vw,1rem)] text-text-secondary text-center tracking-[0.04em]"
          >
            {item}
          </motion.p>
        ))}
      </motion.div>

      {/* 真正缺少的 — 生活照片 */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-cn text-[clamp(0.75rem,1vw,1rem)] text-text-tertiary mb-6 tracking-[0.08em]"
      >
        但真正缺少的：
      </motion.p>

      <div className="grid grid-cols-4 gap-3 max-w-2xl w-full mb-8">
        {WEATHERED_PHOTOS.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-full aspect-[3/4] overflow-hidden rounded-sm mb-2 bg-[#1a1a1a]">
              <ResilientImage src={item.src} alt={item.label} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <span className="font-cn text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary tracking-[0.08em]">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-25%' }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center max-w-lg"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          真实，
          <br />
          不仅来自物理。
          <br />
          还来自生活。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 14 — Randomness ─── */

function Section14Randomness() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-cn text-[clamp(1rem,2vw,2rem)] text-text mb-8 tracking-tight"
      >
        随机性
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 max-w-4xl w-full mb-8">
        {/* CG wall */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8 }}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-sm mb-2 bg-[#1a1a1a] flex items-center justify-center">
            <ResilientImage
              src="https://images.unsplash.com/photo-1531685250784-7569952593d2?w=600&q=80"
              alt="CG wall"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="font-en text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary text-center tracking-[0.08em]">CG 墙壁</p>
        </motion.div>
        {/* Real wall */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-sm mb-2 bg-[#1a1a1a] flex items-center justify-center">
            <ResilientImage
              src="https://images.unsplash.com/photo-1767416567017-358c42bacb23?w=600&q=88"
              alt="Real wall"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="font-en text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary text-center tracking-[0.08em]">现实 墙壁</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          现实，
          <br />
          从来没有完全重复。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 15 — Time ─── */

function Section15Time() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-cn text-[clamp(1rem,2vw,2rem)] text-text mb-8 tracking-tight"
      >
        时间
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 max-w-4xl w-full mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8 }}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-sm mb-2">
            <ResilientImage src="https://images.unsplash.com/photo-1441148345475-03a2e82f9719?w=600&q=80" alt="New car" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <p className="font-cn text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary text-center tracking-[0.08em]">新车 / 新建筑</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-sm mb-2">
            <ResilientImage src="https://images.unsplash.com/photo-1774532738216-d8ddd591b7e8?w=600&q=80" alt="Old car" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <p className="font-cn text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary text-center tracking-[0.08em]">多年之后</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1vw,1rem)] text-text-tertiary leading-relaxed tracking-[0.04em]">
          CG世界往往：
          <br />
          所有东西都刚刚做好。
        </p>
        <p className="font-cn text-[clamp(0.75rem,1vw,1rem)] text-text-tertiary leading-relaxed mt-4 tracking-[0.04em]">
          现实世界：
          <br />
          所有东西都有时间。
        </p>
        <p className="font-cn text-[clamp(0.8125rem,1.1vw,1.125rem)] text-text-secondary mt-6 tracking-[0.02em]">
          时间，本身就是一种材质。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 16 — Experience ─── */

function Section16Experience() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-cn text-[clamp(1rem,2vw,2rem)] text-text mb-8 tracking-tight"
      >
        经验
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 max-w-4xl w-full mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8 }}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-sm mb-2">
            <ResilientImage src="https://images.unsplash.com/photo-1774200981075-a728eaaa3824?w=600&q=80" alt="CG Kitchen" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <p className="font-cn text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary text-center tracking-[0.08em]">CG 厨房</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-sm mb-2">
            <ResilientImage src="https://images.unsplash.com/photo-1763203010726-82d8546d62b6?w=600&q=80" alt="Real Kitchen" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <p className="font-cn text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary text-center tracking-[0.08em]">现实 厨房</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          真正让人觉得真实的，
          <br />
          不是细节数量。
          <br />
          而是：
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.2vw,1.25rem)] text-text mt-2 tracking-[0.02em]">
          生活经验。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 18 — Experience > Reality ─── */

function Section18ExperienceVsReality() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ height: '100dvh' }}>
      <div className="text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn text-[clamp(1rem,2vw,2rem)] text-text-tertiary leading-relaxed tracking-tight"
        >
          复制现实。
          <br />
          并不一定真实。
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30%' }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn text-[clamp(1.25rem,2.5vw,2.5rem)] text-text font-medium mt-8 leading-tight"
        >
          复制经验。
          <br />
          反而更真实。
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Section 19 — Summary ─── */

function Section19Summary() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ minHeight: '100dvh', padding: '10vh 4vw' }}>
      <div className="text-center max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn text-[clamp(1rem,2vw,2rem)] text-text-secondary leading-relaxed tracking-tight"
        >
          现代CG，
          <br />
          已经越来越接近：
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-en text-[clamp(1.5rem,3vw,3rem)] text-text font-bold mt-4 tracking-tight"
        >
          Reality
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-30%' }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-cn text-[clamp(0.8125rem,1.1vw,1.125rem)] text-text-tertiary mt-8 leading-relaxed tracking-[0.04em]"
        >
          但是。
          <br />
          人类相信的，
          <br />
          往往是：
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30%' }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] text-accent font-bold mt-4 tracking-tight"
        >
          Believability
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40%' }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="text-center mt-16"
      >
        <p className="font-cn text-[clamp(0.875rem,1.2vw,1.25rem)] text-text leading-relaxed tracking-[0.02em]">
          真实，
          <br />
          第二次被建构。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 20 — Transition ─── */

function Section20Transition() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ height: '100dvh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <h2 className="font-en text-[clamp(1.5rem,4vw,4rem)] font-bold text-text tracking-tight leading-none">
          Cognitive Science
        </h2>
        <p className="font-cn text-[clamp(0.75rem,1.2vw,1.25rem)] text-text-secondary mt-5 tracking-[0.04em]">
          认知科学
        </p>
        <p className="font-en text-[clamp(0.5rem,0.8vw,0.875rem)] text-text-tertiary mt-3 tracking-[0.12em]">
          Human Perception
        </p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Export
   ═══════════════════════════════════════════════════════════════ */

export default function ComputerGraphicsSection() {
  return (
    <section id="section-computer-graphics" className="relative w-full bg-black">
      <Section01Title />
      <Section02Question />
      <Section03FullImages />
      <Section03Title />
      <Section04ShrinkAndObserve />
      <Section05Pipeline />
      <Section06PBR />
      <Section07RayTracing />
      <Section08GlobalIllumination />
      <Section09SSS />
      <Section10MotionBlur />
      <Section11TemporalAA />
      <Section12RealQuestion />
      <Section13WhatsMissing />
      <Section14Randomness />
      <Section15Time />
      <Section16Experience />
      <Section18ExperienceVsReality />
      <Section19Summary />
      <Section20Transition />
    </section>
  );
}
