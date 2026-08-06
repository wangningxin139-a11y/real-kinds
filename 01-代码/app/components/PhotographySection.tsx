'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { assetUrl } from '@/app/lib/assets';
import ResilientImage from '@/app/components/ResilientImage';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   Photography｜摄影学 — Chapter 1
   Scroll Storytelling   Apple + Documentary + Museum Exhibition
   ═══════════════════════════════════════════════════════════════ */

/* ─── Types ─── */

interface ComparisonItem {
  left: string;
  right: string;
  leftDesc: string;
  rightDesc: string;
}

interface FeatureItem {
  id: string;
  label: string;
  hoverHint: string;
}

/* ─── Data ─── */

const COMPARISONS: ComparisonItem[] = [
  { left: 'Lens', right: 'Eye', leftDesc: '镜头收集光线，但不会像眼睛一样主动适应环境。', rightDesc: '人眼是生物器官，具备自动调节和感知能力。' },
  { left: 'CMOS', right: 'Retina', leftDesc: 'CMOS 只是光电转换器，不是视网膜。', rightDesc: '视网膜有复杂的神经元结构，远不止感光。' },
  { left: 'ISP', right: 'Brain', leftDesc: 'ISP 可以重新诠释画面。', rightDesc: '大脑是在不断预测世界。' },
  { left: 'Exposure', right: 'Perception', leftDesc: '曝光是物理测量。', rightDesc: '感知是主观解释。' },
];

const FEATURES: FeatureItem[] = [
  { id: 'hdr', label: 'HDR', hoverHint: '不是记录更多光线，而是重新组合多个曝光。' },
  { id: 'night', label: 'Night Mode', hoverHint: '不是夜视。而是长时间、多帧计算。' },
  { id: 'fusion', label: 'Deep Fusion', hoverHint: '不是镜头能力。而是算法能力。' },
  { id: 'portrait', label: 'Portrait Mode', hoverHint: '不是光学景深。而是语义分割。' },
  { id: 'rolling', label: 'Rolling Shutter', hoverHint: '相机记录的不是一个瞬间，而是一段扫描时间。' },
];

const DOCU_KEYWORDS = [
  '手持', '自然光', '环境声', '长镜头',
  '人物看向镜头之外', '偶然', '轻微失焦', '构图不完美',
];

const NEWS_KEYWORDS = [
  '即时', '现场', '未经摆拍', '连续记录', '公共传播',
];

/* ─── Before / After Slider ─── */

function BeforeAfterSlider({
  beforeGrad,
  afterGrad,
  beforeLabel = 'Before',
  afterLabel = 'After',
}: {
  beforeGrad: string;
  afterGrad: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, x)));
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none rounded-lg"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* After — full area */}
      <div className="absolute inset-0" style={{ background: afterGrad }} />
      {/* Before — clipped */}
      <div
        className="absolute inset-0"
        style={{ background: beforeGrad, clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white/70 cursor-ew-resize z-10"
        style={{ left: `${pos}%` }}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center cursor-ew-resize"
          onPointerDown={handlePointerDown}
        >
          <span className="text-white/80 text-[10px] font-light tracking-widest">∥</span>
        </div>
      </div>
      {/* Labels */}
      <span className="absolute top-3 left-3 text-[10px] text-white/50 font-en tracking-wider">{beforeLabel}</span>
      <span className="absolute top-3 right-3 text-[10px] text-white/50 font-en tracking-wider">{afterLabel}</span>
    </div>
  );
}

/* ─── Section 01 — Chapter Title ─── */

function Section01Title() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ height: '100dvh' }}>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="font-en text-[clamp(2.5rem,7vw,6rem)] font-bold tracking-tight text-text"
      >
        Photography
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="font-cn text-[clamp(1rem,1.8vw,1.5rem)] text-text-secondary mt-5 tracking-[0.06em]"
      >
        摄影学
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
        className="font-cn text-[clamp(0.75rem,1vw,0.9375rem)] text-text-tertiary mt-6 tracking-[0.12em]"
      >
        Image Formation
      </motion.p>
    </section>
  );
}

/* ─── Section 02 — The Question ─── */

function Section02Question() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ height: '100dvh' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-6"
      >
        <h2 className="font-cn text-[clamp(1.5rem,4vw,3.5rem)] font-medium text-text leading-[1.6] tracking-tight">
          为什么更好的相机，
          <br />
          反而不像生活？
        </h2>
      </motion.div>
    </section>
  );
}

/* ─── Section 03 — Four Photos 2×2 ─── */

const GRID_IMAGES = [
  { src: assetUrl('/media/real/photo-life-01.jpg'), alt: '' },
  { src: assetUrl('/media/real/photo-life-02.jpg'), alt: '' },
  { src: assetUrl('/media/real/photo-life-03.jpg'), alt: '' },
  { src: assetUrl('/media/real/photo-life-04.jpg'), alt: '' },
];

function Section03FourPhotos() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '5vh 4vw' }}>
      {/* 2×2 Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 gap-2 w-full max-w-4xl aspect-square"
      >
        {GRID_IMAGES.map((img, i) => (
          <div key={i} className="overflow-hidden bg-bg-elevated">
            <ResilientImage
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>

      {/* Question */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mt-10"
      >
        <h3 className="font-cn text-[clamp(1.25rem,2.5vw,2.25rem)] text-text font-medium tracking-tight">
          哪一张，
          <br />
          最像真实生活？
        </h3>
        <p className="font-cn text-[clamp(0.75rem,1vw,1rem)] text-text-tertiary mt-6 tracking-[0.08em]">
          请先在心里做出选择。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 04 — Reveal ─── */

function Section04Reveal() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ height: '100dvh' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-6"
      >
        <p className="font-cn text-[clamp(0.875rem,1.5vw,1.25rem)] text-text-secondary leading-relaxed tracking-[0.02em]">
          大多数普通观众，
          <br />
          会选择：
        </p>
        <p className="font-cn text-[clamp(1.75rem,4vw,3rem)] text-text font-medium mt-4 tracking-tight">
          iPhone。
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-30%' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <p className="font-cn text-[clamp(0.875rem,1.5vw,1.25rem)] text-text-secondary leading-relaxed tracking-[0.02em]">
            不是因为它最真实。
          </p>
          <p className="font-cn text-[clamp(0.875rem,1.5vw,1.25rem)] text-text-secondary leading-relaxed tracking-[0.02em] mt-3">
            而是因为：
            <br />
            <span className="text-text font-medium">它最熟悉。</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Section 05 — Visual Experience ─── */

function Section05VisualExperience() {
  const lines = [
    { text: '我们熟悉的，', delay: 0 },
    { text: '不是现实。', delay: 0.3 },
    { text: '而是手机摄影。', delay: 0.6 },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ minHeight: '100dvh', padding: '15vh 6vw' }}>
      <div className="text-center max-w-2xl">
        {lines.map((l, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.8, delay: l.delay, ease: [0.16, 1, 0.3, 1] }}
            className="font-cn text-[clamp(1.25rem,2.5vw,2rem)] text-text leading-[1.8] tracking-tight"
          >
            {l.text}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 space-y-4"
        >
          <p className="font-cn text-[clamp(0.8125rem,1.2vw,1rem)] text-text-tertiary leading-relaxed tracking-[0.04em]">
            过去十几年，
            <br />
            绝大多数人每天看到的照片，
            <br />
            都来自手机。
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-25%' }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-cn text-[clamp(0.875rem,1.3vw,1.0625rem)] text-text-secondary mt-8 leading-relaxed tracking-[0.02em]"
          >
            于是：
            <br />
            手机照片，
            <br />
            开始成为
            <br />
            <span className="text-text font-medium">&ldquo;真实&rdquo;的标准。</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 06 — Pipeline SVG Flowchart ─── */

const PIPELINE_NODES = [
  { id: 'world',    label: '世界',          en: 'World' },
  { id: 'light',    label: '光线',          en: 'Light' },
  { id: 'lens',     label: '镜头',          en: 'Lens' },
  { id: 'cmos',     label: 'CMOS',          en: 'CMOS' },
  { id: 'isp',      label: 'ISP',           en: 'ISP' },
  { id: 'photo',    label: '照片',          en: 'Photo' },
  { id: 'human',    label: '人的观看',      en: 'Human' },
];

const PIPELINE_INFO: Record<string, string> = {
  lens: '镜头收集光线，但不会像眼睛一样主动适应环境。',
  cmos: 'CMOS 只是光电转换器，不是视网膜。',
  isp: 'ISP 负责计算、降噪、HDR、白平衡、锐化、色彩映射。它更接近一种实时图像解释器。',
  human: '最终观看照片的是人的大脑，而不是相机。',
};

function Section06Pipeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const ctx = gsap.context(() => {
      // Animate arrow paths using stroke-dashoffset
      const paths = svg.querySelectorAll<SVGPathElement>('.pipeline-arrow');
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
  const gap = 48;
  const startX = 40;
  const y = 100;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black select-none flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: '100dvh', padding: '8vh 4vw' }}
    >
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-cn text-[clamp(0.75rem,1.1vw,1rem)] text-text-tertiary mb-8 tracking-[0.12em]"
      >
        摄影并不是复制现实
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
          {/* Arrows between nodes — from right edge of node i to left edge of node i+1 */}
          {PIPELINE_NODES.slice(0, -1).map((_, i) => {
            const rightEdge = startX + i * (nodeW + gap) + nodeW;
            const leftEdge = startX + (i + 1) * (nodeW + gap);
            return (
              <path
                key={`arrow-${i}`}
                className="pipeline-arrow"
                d={`M ${rightEdge} ${y} L ${leftEdge - 6} ${y}`}
                fill="none"
                stroke="#555555"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="0"
                strokeDashoffset="0"
              />
            );
          })}
          {/* Arrow heads — tip at left edge of each node */}
          {PIPELINE_NODES.slice(0, -1).map((_, i) => {
            const leftEdge = startX + (i + 1) * (nodeW + gap);
            return (
              <polygon
                key={`head-${i}`}
                className="pipeline-arrow"
                points={`${leftEdge - 7},${y - 4} ${leftEdge - 7},${y + 4} ${leftEdge + 1},${y}`}
                fill="#555555"
                strokeDasharray="0"
                strokeDashoffset="0"
                opacity="0.5"
              />
            );
          })}

          {/* Nodes */}
          {PIPELINE_NODES.map((node, i) => {
            const x = startX + i * (nodeW + gap);
            const cx = x + nodeW / 2;
            return (
              <g
                key={node.id}
                className="pipeline-node"
                onMouseEnter={() => setHoveredId(node.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ cursor: PIPELINE_INFO[node.id] ? 'pointer' : 'default' }}
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
                  fontSize="14"
                  style={{ transition: 'fill 0.3s ease' }}
                >
                  {node.label}
                </text>
                {node.en && (
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
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover tooltip */}
        <AnimatePresence>
          {hoveredId && PIPELINE_INFO[hoveredId] && (
            <motion.div
              key={hoveredId}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="text-center mt-6 max-w-lg mx-auto"
            >
              <p className="font-cn text-[clamp(0.75rem,1vw,0.875rem)] text-text-secondary leading-relaxed tracking-[0.02em]">
                {PIPELINE_INFO[hoveredId]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

/* ─── Section 07 — Human vs Camera ─── */

function Section07HumanVsCamera() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    COMPARISONS.forEach((_, i) => {
      const el = itemRefs.current[i];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex((prev) => Math.max(prev, i));
          }
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="relative w-full bg-black select-none" style={{ minHeight: '100dvh' }}>
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-cn text-[clamp(0.75rem,1.1vw,1rem)] text-text-tertiary text-center pt-12 tracking-[0.12em]"
      >
        人眼 vs 相机
      </motion.h3>

      <div className="flex flex-col items-center w-full" style={{ padding: '8vh 6vw' }}>
        {COMPARISONS.map((item, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="w-full max-w-4xl"
            style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={activeIndex >= i ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full grid grid-cols-5 gap-4 items-center"
            >
              {/* Left: Human Vision */}
              <div className="col-span-2 text-right">
                <p className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight">
                  {item.left}
                </p>
                <p className="font-cn text-[clamp(0.625rem,0.85vw,0.8125rem)] text-text-tertiary mt-2 leading-relaxed tracking-[0.04em]">
                  {item.leftDesc}
                </p>
              </div>

              {/* Center: ≠ */}
              <div className="text-center">
                <span className="font-en text-[clamp(1.5rem,3vw,3rem)] font-thin text-text-secondary">≠</span>
              </div>

              {/* Right: Camera */}
              <div className="col-span-2 text-left">
                <p className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight">
                  {item.right}
                </p>
                <p className="font-cn text-[clamp(0.625rem,0.85vw,0.8125rem)] text-text-tertiary mt-2 leading-relaxed tracking-[0.04em]">
                  {item.rightDesc}
                </p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-center pb-16 px-6"
      >
        <p className="font-cn text-[clamp(0.875rem,1.4vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.02em]">
          相机从来没有复制现实。
          <br />
          它一直在重建现实。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 08 — Computational Photography ─── */

const GRAD_PRESETS: Record<string, { before: string; after: string }> = {
  hdr: {
    before: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #e94560 80%, #fff5e6 100%)',
    after: 'linear-gradient(135deg, #2d3a4a 0%, #3d5a6e 25%, #6b8d9e 50%, #a8c5d0 75%, #e8edf0 100%)',
  },
  night: {
    before: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 30%, #1a1a1a 60%, #0d0d0d 100%)',
    after: 'linear-gradient(135deg, #1a2744 0%, #2c4a6e 30%, #4a7a9e 60%, #7aabca 100%)',
  },
  fusion: {
    before: 'linear-gradient(135deg, #3a3a3a 0%, #5a5a5a 25%, #4a4a4a 50%, #6a6a6a 75%, #5a5a5a 100%)',
    after: 'linear-gradient(135deg, #4a4a3a 0%, #7a7a5a 25%, #9a9a7a 50%, #babaa0 75%, #dadac0 100%)',
  },
  portrait: {
    before: 'linear-gradient(135deg, #4a4a5a 0%, #6a6a8a 30%, #5a5a7a 50%, #7a7a9a 70%, #6a6a8a 100%)',
    after: 'linear-gradient(135deg, #4a4a5a 0%, #8a6a7a 30%, #d4a0b0 50%, #e8c0c8 70%, #f0d8d8 100%)',
  },
  rolling: {
    before: 'repeating-linear-gradient(10deg, #2a2a2a 0px, #2a2a2a 8px, #4a4a4a 8px, #4a4a4a 16px, #3a3a3a 16px, #3a3a3a 24px, #5a5a4a 24px, #5a5a4a 32px)',
    after: 'linear-gradient(135deg, #3a3a4a 0%, #5a5a7a 30%, #7a7a9a 50%, #6a6a8a 70%, #5a5a6a 100%)',
  },
};

function Section08Computational() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    FEATURES.forEach((_, i) => {
      const el = featureRefs.current[i];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveFeature(i);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="relative w-full bg-black select-none" style={{ minHeight: '100dvh' }}>
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-cn text-[clamp(0.75rem,1.1vw,1rem)] text-text-tertiary text-center pt-12 tracking-[0.12em]"
      >
        计算摄影
      </motion.h3>

      {/* Sticky keyword bar */}
      <div className="sticky top-0 z-20 w-full bg-bg/90 backdrop-blur-md py-4" style={{ top: '4vh' }}>
        <div className="flex justify-center gap-4 md:gap-8 px-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.id}
              className="relative"
              onMouseEnter={() => setHoveredId(f.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <span
                className={`font-en text-[clamp(0.625rem,0.9vw,0.9375rem)] font-medium tracking-tight whitespace-nowrap transition-all duration-300 cursor-default ${
                  i === activeFeature ? 'text-text' : 'text-[#555555]'
                }`}
              >
                {f.label}
              </span>
              {/* Active indicator */}
              {i === activeFeature && (
                <motion.div
                  layoutId="feat-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-text"
                />
              )}
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredId === f.id && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 whitespace-nowrap font-cn text-[clamp(0.5rem,0.7vw,0.75rem)] text-text-secondary bg-bg/80 backdrop-blur px-3 py-1.5 rounded border border-white/5 pointer-events-none"
                  >
                    {f.hoverHint}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Feature comparison panels */}
      <div className="w-full">
        {FEATURES.map((f, i) => {
          const g = GRAD_PRESETS[f.id] || GRAD_PRESETS.hdr;
          return (
            <div
              key={f.id}
              ref={(el) => { featureRefs.current[i] = el; }}
              className="w-full flex flex-col items-center justify-center"
              style={{ minHeight: '70vh', padding: '6vh 6vw' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg"
                style={{ height: 'clamp(240px, 40vh, 420px)' }}
              >
                <BeforeAfterSlider
                  beforeGrad={g.before}
                  afterGrad={g.after}
                />
              </motion.div>
              <div className="flex items-center gap-3 mt-4">
                <span className="font-cn text-[clamp(0.625rem,0.8vw,0.8125rem)] text-text-tertiary">Before</span>
                <span className="text-text-tertiary text-[10px]">↓</span>
                <span className="font-cn text-[clamp(0.625rem,0.8vw,0.8125rem)] text-text-tertiary">After</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Section 09 — Documentary Photography ─── */

function Section09Documentary() {
  return (
    <section className="relative w-full bg-black select-none" style={{ minHeight: '100dvh' }}>
      {/* Two photos side by side */}
      <div className="w-full" style={{ padding: '10vh 4vw 4vh' }}>
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.6 }}
          className="font-cn text-[clamp(0.75rem,1.1vw,1rem)] text-text-tertiary text-center mb-8 tracking-[0.12em]"
        >
          纪录片为什么真实？
        </motion.h3>

        <div className="grid grid-cols-2 gap-3 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-bg-elevated"
          >
            <ResilientImage
              src={assetUrl('/media/real/documentary-01.webp')}
              alt=""
              className="w-full h-full object-cover"
              style={{ aspectRatio: '7/5' }}
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-bg-elevated"
          >
            <ResilientImage
              src={assetUrl('/media/real/commercial-portrait-01.jpg')}
              alt=""
              className="w-full h-full object-cover"
              style={{ aspectRatio: '7/5' }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>

      {/* Keywords that arrange around */}
      <div className="w-full flex flex-wrap justify-center gap-3 px-6" style={{ padding: '2vh 4vw 8vh' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-2xl"
        >
          {DOCU_KEYWORDS.map((kw, i) => (
            <motion.span
              key={kw}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="font-cn text-[clamp(0.625rem,0.85vw,0.8125rem)] text-text-secondary px-3 py-1.5 border border-white/10 rounded-full tracking-[0.04em]"
            >
              {kw}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Conclusion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center pb-16 px-6"
      >
        <p className="font-cn text-[clamp(0.8125rem,1.2vw,1rem)] text-text-secondary leading-relaxed tracking-[0.02em]">
          这些元素，
          <br />
          长期共同塑造了：
        </p>
        <p className="font-cn text-[clamp(1rem,1.8vw,1.5rem)] text-text font-medium mt-3">
          &ldquo;纪录片真实&rdquo;
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 10 — News Photography ─── */

function Section10NewsPhoto() {
  return (
    <section className="relative w-full bg-black select-none" style={{ minHeight: '100dvh', padding: '10vh 4vw' }}>
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-cn text-[clamp(0.75rem,1.1vw,1rem)] text-text-tertiary text-center mb-8 tracking-[0.12em]"
      >
        新闻摄影为什么可信？
      </motion.h3>

      {/* News photos */}
      <div className="grid grid-cols-2 gap-3 max-w-3xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden bg-bg-elevated"
        >
          <ResilientImage
            src={assetUrl('/media/news/news-01.jpg')}
            alt=""
            className="w-full h-full object-cover"
            style={{ aspectRatio: '7/5' }}
            loading="lazy"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden bg-bg-elevated"
        >
          <ResilientImage
            src={assetUrl('/media/news/news-02.webp')}
            alt=""
            className="w-full h-full object-cover"
            style={{ aspectRatio: '7/5' }}
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Keywords */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-xl mx-auto mb-12">
        {NEWS_KEYWORDS.map((kw, i) => (
          <motion.span
            key={kw}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="font-cn text-[clamp(0.625rem,0.85vw,0.8125rem)] text-text-secondary px-3 py-1.5 border border-white/10 rounded-full tracking-[0.04em]"
          >
            {kw}
          </motion.span>
        ))}
      </div>

      {/* Conclusion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-lg mx-auto"
      >
        <p className="font-cn text-[clamp(0.8125rem,1.2vw,1rem)] text-text-secondary leading-relaxed tracking-[0.02em]">
          新闻摄影的真实性，
          <br />
          来自一种社会长期建立的视觉规范。
          <br />
          <span className="text-text-tertiary">而不是摄影技术本身。</span>
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 11 — Summary ─── */

function Section11Summary() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ height: '100dvh' }}>
      <div className="text-center px-6 max-w-lg">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn text-[clamp(0.9375rem,1.6vw,1.375rem)] text-text leading-relaxed tracking-tight"
        >
          镜头不是眼睛。
          <br />
          CMOS 不是视网膜。
          <br />
          ISP 不是大脑。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-25%' }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <p className="font-cn text-[clamp(0.9375rem,1.6vw,1.375rem)] text-text leading-relaxed tracking-tight">
            相机
            <br />
            从来不是复制现实。
            <br />
            而是在重建现实。
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30%' }}
          transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-cn text-[clamp(0.8125rem,1.3vw,1.125rem)] text-accent mt-12 tracking-[0.04em]"
        >
          真实，
          <br />
          第一次被建构。
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════ */

export default function PhotographySection() {
  return (
    <section id="section-photography" className="relative bg-black">
      <Section01Title />
      <Section02Question />
      <Section03FourPhotos />
      <Section04Reveal />
      <Section05VisualExperience />
      <Section06Pipeline />
      <Section07HumanVsCamera />
      <Section08Computational />
      <Section09Documentary />
      <Section10NewsPhoto />
      <Section11Summary />
    </section>
  );
}
