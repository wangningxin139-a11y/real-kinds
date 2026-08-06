'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Data ─── */

interface Discipline {
  id: string;
  labelEn: string;
  labelCn: string;
  subtitle: string;
  hoverEn: string;
  hoverCn: string;
  direction: 'left' | 'right' | 'top' | 'bottom';
  posX: string;
  posY: string;
}

const DISCIPLINES: Discipline[] = [
  {
    id: 'photography',
    labelEn: 'Photography',
    labelCn: '摄影学',
    subtitle: '图像如何形成？',
    hoverEn: 'Camera does not capture reality.\nIt reconstructs reality.',
    hoverCn: '相机不是复制现实。\n而是在重建现实。',
    direction: 'left', posX: '18%', posY: '42%',
  },
  {
    id: 'cognitive-science',
    labelEn: 'Cognitive Science',
    labelCn: '认知科学',
    subtitle: '人如何感知图像？',
    hoverEn: 'Reality is not received.\nIt is predicted.',
    hoverCn: '真实不是被接收。\n而是被预测。',
    direction: 'right', posX: '82%', posY: '42%',
  },
  {
    id: 'communication',
    labelEn: 'Communication Studies',
    labelCn: '传播学',
    subtitle: '为什么一种图像会成为"真实"？',
    hoverEn: 'Reality is constructed\nthrough collective belief.',
    hoverCn: '真实由共同相信建构。',
    direction: 'top', posX: '50%', posY: '14%',
  },
  {
    id: 'computer-graphics',
    labelEn: 'Computer Graphics',
    labelCn: '计算机图形学',
    subtitle: '世界如何被模拟？',
    hoverEn: 'A simulated world\ncan still feel unreal.',
    hoverCn: '模拟世界，\n依然可能不真实。',
    direction: 'bottom', posX: '50%', posY: '64%',
  },
];

/* ─── Helpers ─── */

interface Point { x: number; y: number }

function cubicBezierPath(a: Point, b: Point, pull: number = 0): string {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  // Perpendicular unit vector (counter-clockwise normal)
  const nx = -dy / len;
  const ny = dx / len;
  // Control points: 40% along the line + perpendicular pull
  return `M ${a.x},${a.y} C ${a.x + dx * 0.4 + nx * pull},${a.y + dy * 0.4 + ny * pull} ${b.x - dx * 0.4 + nx * pull},${b.y - dy * 0.4 + ny * pull} ${b.x},${b.y}`;
}

/* ─── Component ─── */

export default function KnowledgeLandscape() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const pathGroupRef = useRef<SVGGElement>(null);
  const played = useRef<Record<string, boolean>>({});
  const ready = useRef(false);
  const pathsInited = useRef(false);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [belLines, setBelLines] = useState<string[]>([]);
  const [aiLines, setAiLines] = useState<Array<string | null>>([]);
  const [showAll, setShowAll] = useState(false);

  /* ─── Measure DOM & compute SVG paths ─── */

  const measure = useCallback(() => {
    const section = mapRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();

    const centerOf = (sel: string): Point => {
      const el = section.querySelector(sel) as HTMLElement | null;
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - rect.left, y: r.top + r.height / 2 - rect.top };
    };

    const edgeOf = (sel: string, side: 'top' | 'bottom' | 'left' | 'right'): Point => {
      const el = section.querySelector(sel) as HTMLElement | null;
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2 - rect.left;
      const cy = r.top + r.height / 2 - rect.top;
      switch (side) {
        case 'top':    return { x: cx, y: r.top - rect.top };
        case 'bottom': return { x: cx, y: r.bottom - rect.top };
        case 'left':   return { x: r.left - rect.left, y: cy };
        case 'right':  return { x: r.right - rect.left, y: cy };
      }
    };

    // Treat the English title and Chinese subtitle as one protected block.
    // Connection lines anchor outside this block instead of touching the
    // English heading itself, which previously made the downward path run
    // through “真实感”.
    const belCenter = centerOf('[data-anchor="believability-block"]');
    const belL = edgeOf('[data-anchor="believability-block"]', 'left');
    const belR = edgeOf('[data-anchor="believability-block"]', 'right');
    const belT = edgeOf('[data-anchor="believability-block"]', 'top');
    const belB = edgeOf('[data-anchor="believability-block"]', 'bottom');

    const centerClearance = 18;
    belL.x -= centerClearance;
    belR.x += centerClearance;
    belT.y -= centerClearance;
    belB.y += centerClearance;

    const photoRight = edgeOf('[data-node="photography"]', 'right');
    const cognitiveLeft = edgeOf('[data-node="cognitive-science"]', 'left');
    const communicationBottom = edgeOf('[data-node="communication"]', 'bottom');
    const graphicsTop = edgeOf('[data-node="computer-graphics"]', 'top');
    const graphicsBottom = edgeOf('[data-node="computer-graphics"]', 'bottom');
    const aiTop = edgeOf('[data-node="ai-eval"]', 'top');

    if (
      belCenter.x === 0 || photoRight.x === 0 || cognitiveLeft.x === 0 ||
      communicationBottom.x === 0 || graphicsTop.x === 0 || aiTop.x === 0
    ) return;

    // A mathematically strict cross: left/right paths share one y-axis value;
    // top/bottom paths share one x-axis value. This remains orthogonal even
    // when labels have different heights or font metrics.
    setBelLines([
      cubicBezierPath(
        { x: photoRight.x, y: belCenter.y },
        { x: belL.x, y: belCenter.y },
        0
      ),
      cubicBezierPath(
        { x: belR.x, y: belCenter.y },
        { x: cognitiveLeft.x, y: belCenter.y },
        0
      ),
      cubicBezierPath(
        { x: belCenter.x, y: communicationBottom.y },
        { x: belCenter.x, y: belT.y },
        0
      ),
      cubicBezierPath(
        { x: belCenter.x, y: belB.y },
        { x: belCenter.x, y: graphicsTop.y },
        0
      ),
    ]);

    // Disciplines → AI: arc outward to avoid crossing center text
    const aiPathData: Array<{ id: string; from: Point; to: Point; pull: number } | null> = [
      null,
      null,
      null,
      {
        id: 'computer-graphics',
        from: { x: belCenter.x, y: graphicsBottom.y },
        to: { x: belCenter.x, y: aiTop.y },
        pull: 0,
      },
    ];
    setAiLines(aiPathData.map((d) => d ? cubicBezierPath(d.from, d.to, d.pull) : null));
    ready.current = true;
  }, []);

  // ── Measure on mount & resize ──

  useEffect(() => {
    const t = setTimeout(() => requestAnimationFrame(measure), 100);
    const onResize = () => { ready.current = false; setTimeout(() => requestAnimationFrame(measure), 100); };
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize); };
  }, [measure]);

  /* ─── Scroll-based animation driver (replaces ScrollTrigger) ─── */

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;
    let destroyed = false;

    const checkScroll = () => {
      if (destroyed) return;
      ticking = false;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionTop = rect.top;          // negative when scrolled past top
      const sectionBottom = rect.bottom;     // negative when fully above

      // ── Stage 1: section top enters viewport (top < 80% of viewport) ──
      if (!played.current.stage1 && sectionTop < vh * 0.8 && sectionBottom > 0) {
        played.current.stage1 = true;
        gsap.to('[data-node="believability"]', {
          opacity: 1, scale: 1, duration: 1, ease: 'easeOut',
        });
        gsap.to('[data-node="believability-cn"]', {
          opacity: 1, scale: 1, duration: 1, ease: 'easeOut', delay: 0.2,
        });
      }

      // ── Stage 2: disciplines in order ──
      const order = ['photography', 'cognitive-science', 'communication', 'computer-graphics'];
      const thresholds = [vh * 0.55, vh * 0.45, vh * 0.35, vh * 0.25]; // sectionTop threshold for each

      order.forEach((id, i) => {
        if (played.current[id]) return;
        if (sectionTop < thresholds[i] && sectionBottom > 0) {
          played.current[id] = true;

          // Draw line — use fromTo for reliable GSAP + SVG compatibility
          const pEl = pathGroupRef.current?.querySelector<SVGPathElement>(`.path-bel-${id}`);
          if (pEl) {
            const len = pEl.getTotalLength();
            gsap.fromTo(pEl,
              { strokeDashoffset: len, strokeDasharray: len },
              { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' }
            );
          }

          // Show text
          gsap.to(`[data-node="${id}"]`, {
            opacity: 1, y: 0, duration: 0.6, ease: 'easeOut', delay: 0.3,
          });
        }
      });

      // ── Stage 3: convergence when section top is well past viewport top ──
      if (!played.current.stage3 && sectionTop < -vh * 0.15) {
        played.current.stage3 = true;

        gsap.to('[data-node="ai-eval"]', {
          opacity: 1, y: 0, duration: 0.8, ease: 'easeOut',
        });

        const aiPathEls = pathGroupRef.current?.querySelectorAll<SVGPathElement>('.path-to-ai');
        if (aiPathEls?.length) {
          // Animate each path individually with fromTo for reliability
          aiPathEls.forEach((p, idx) => {
            const len = p.getTotalLength();
            gsap.fromTo(p,
              { strokeDashoffset: len, strokeDasharray: len },
              { strokeDashoffset: 0, duration: 1, ease: 'power2.out', delay: idx * 0.08 }
            );
          });
        }

        gsap.to('.discipline-node', {
          opacity: 1, y: 0, duration: 0.4, ease: 'easeOut', overwrite: 'auto',
        });
      }
    };

    // Tick via Lenis scroll (if available) + RAF fallback
    const onLenisScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(checkScroll);
      }
    };

    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.on('scroll', onLenisScroll);
    } else {
      // Fallback: use native scroll
      window.addEventListener('scroll', onLenisScroll, { passive: true });
    }

    // Also check immediately in case already scrolled
    requestAnimationFrame(checkScroll);

    return () => {
      destroyed = true;
      if (lenis) lenis.off('scroll', onLenisScroll);
      else window.removeEventListener('scroll', onLenisScroll);
    };
  }, [belLines, aiLines]);

  /* ─── Initial transforms + SVG path hiding ─── */

  useEffect(() => {
    const pathGroup = pathGroupRef.current;
    if (!pathGroup || !ready.current || belLines.length === 0) return;
    if (pathsInited.current) return;
    pathsInited.current = true;

    // Set initial GSAP transforms
    gsap.set('[data-node="believability"]', { scale: 0.95 });
    gsap.set('[data-node="believability-cn"]', { scale: 0.95 });
    DISCIPLINES.forEach((d) => gsap.set(`[data-node="${d.id}"]`, { y: 20 }));
    gsap.set('[data-node="ai-eval"]', { y: 20 });

    // Hide SVG paths via GSAP set (so GSAP knows values for later fromTo)
    pathGroup.querySelectorAll<SVGPathElement>('path').forEach((p) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    });
  }, [belLines]);

  /* ─── Fallback: show all after 5s timeout ─── */

  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!ready.current) return;
    fallbackTimer.current = setTimeout(() => {
      if (!played.current.stage1) {
        setShowAll(true);
        gsap.to('[data-node="believability"]', { opacity: 1, scale: 1, duration: 0.8, ease: 'easeOut' });
        gsap.to('[data-node="believability-cn"]', { opacity: 1, scale: 1, duration: 0.8, ease: 'easeOut' });
        gsap.to('.discipline-node', { opacity: 1, y: 0, duration: 0.6, ease: 'easeOut', stagger: 0.08 });
        gsap.to('[data-node="ai-eval"]', { opacity: 1, y: 0, duration: 0.8, ease: 'easeOut' });
        // Also reveal SVG paths
        gsap.to('svg path', { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' });
      }
    }, 5000);
    return () => { if (fallbackTimer.current) clearTimeout(fallbackTimer.current); };
  }, [ready.current]);

  /* ─── Click → scroll to chapter ─── */

  const handleClick = (id: string) => {
    const target = document.getElementById(`section-${id}`);
    if (!target) return;
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(target);
    else target.scrollIntoView({ behavior: 'smooth' });
  };

  /* ─── Render ─── */

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ minHeight: '150vh' }}
    >
      <div ref={mapRef} className="sticky top-0 h-screen w-full overflow-hidden">
      {/* ═══ Center: Believability / 真实感 ═══ */}
      <div
        data-anchor="believability-block"
        className="absolute left-1/2 -translate-x-1/2 bg-black px-5 py-4 text-center pointer-events-none z-20"
        style={{ top: '42%', opacity: showAll ? 1 : undefined }}
      >
        <h2
          data-node="believability"
          className="font-en text-[clamp(2.5rem,5vw,5rem)] font-black text-text tracking-tight leading-none opacity-0"
        >
          Believability
        </h2>
        <p
          data-node="believability-cn"
          className="font-cn text-[clamp(0.75rem,1.2vw,1.125rem)] font-normal text-text-secondary mt-3 tracking-[0.04em] opacity-0"
        >
          真实感
        </p>
      </div>

      {/* ═══ Four disciplines ═══ */}
      {DISCIPLINES.map((d) => (
        <div
          key={d.id}
          data-node={d.id}
          className="absolute z-10 discipline-node -translate-x-1/2 bg-black px-5 py-4 opacity-0"
          style={{ left: d.posX, top: d.posY }}
        >
          <motion.div
            className="flex flex-col items-center cursor-pointer text-center"
            onHoverStart={() => setHoveredId(d.id)}
            onHoverEnd={() => setHoveredId(null)}
            onClick={() => handleClick(d.id)}
          >
            <span
              className={`font-en text-[clamp(0.75rem,1.1vw,1.125rem)] font-medium tracking-tight whitespace-nowrap transition-colors duration-300 leading-tight ${
                hoveredId === d.id ? 'text-text' : 'text-[#999999]'
              }`}
            >
              {d.labelEn}
            </span>
            <span
              className={`font-cn text-[clamp(0.6rem,0.85vw,0.875rem)] tracking-[0.06em] whitespace-nowrap transition-colors duration-300 mt-1 ${
                hoveredId === d.id ? 'text-text' : 'text-[#999999]'
              }`}
            >
              {d.labelCn}
            </span>
            <span className="font-cn text-[clamp(0.5rem,0.65vw,0.6875rem)] text-text-tertiary tracking-[0.08em] mt-2 leading-relaxed whitespace-nowrap">
              {d.subtitle}
            </span>

            <AnimatePresence>
              {hoveredId === d.id && (
                <motion.div
                  key={`${d.id}-h`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="absolute top-full mt-4 pointer-events-none"
                  style={{ width: 'max-content', maxWidth: '300px' }}
                >
                  <p className="font-en text-[clamp(0.5rem,0.65vw,0.6875rem)] text-text-secondary leading-relaxed text-center whitespace-pre-line">
                    {d.hoverEn}
                  </p>
                  <p className="font-cn text-[clamp(0.4375rem,0.55vw,0.625rem)] text-text-tertiary leading-relaxed text-center mt-2 whitespace-pre-line">
                    {d.hoverCn}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      ))}

      {/* ═══ Convergence: AI Image Evaluation ═══ */}
      <div
        data-node="ai-eval"
        className="absolute left-1/2 -translate-x-1/2 bg-black px-5 py-3 text-center pointer-events-none z-20 opacity-0"
        style={{ bottom: '9%' }}
      >
        <h3 className="font-en text-[clamp(0.875rem,1.3vw,1.375rem)] font-medium text-accent tracking-[0.02em] leading-tight">
          AI Image Evaluation
        </h3>
      </div>

      {/* ═══ SVG: Connection lines ═══ */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: 'visible' }}
      >
        <g ref={pathGroupRef}>
          {belLines.map((d, i) => (
            <path
              key={`bel-${i}`}
              className={`path-bel-${DISCIPLINES[i]?.id}`}
              d={d}
              fill="none"
              stroke={hoveredId === DISCIPLINES[i]?.id ? '#FFFFFF' : '#666666'}
              strokeWidth="1"
              strokeLinecap="round"
              style={{ transition: 'stroke 0.3s ease' }}
            />
          ))}
          {aiLines.map((d, i) => (
            d ? (
            <path
              key={`ai-${i}`}
              className={`path-to-ai path-ai-${DISCIPLINES[i]?.id}`}
              d={d}
              fill="none"
              stroke={hoveredId === DISCIPLINES[i]?.id ? '#FFFFFF' : '#666666'}
              strokeWidth="1"
              strokeLinecap="round"
              style={{ transition: 'stroke 0.3s ease' }}
            />
            ) : null
          ))}
        </g>
      </svg>
      </div>
    </section>
  );
}
