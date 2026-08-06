'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const TICK_COUNT = 64;

export default function ProgressRail() {
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState<{
    index: number;
    title: string;
    detail: string;
    y: number;
  } | null>(null);

  useEffect(() => {
    let frame = 0;
    const lenis = (window as any).__lenis;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const current = typeof lenis?.scroll === 'number' ? lenis.scroll : window.scrollY;
        setProgress(Math.min(1, Math.max(0, current / max)));
      });
    };

    update();
    if (lenis) lenis.on('scroll', update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(frame);
      if (lenis) lenis.off('scroll', update);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const activeIndex = Math.min(TICK_COUNT - 1, Math.round(progress * (TICK_COUNT - 1)));

  const contentAt = (target: number) => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section'));
    const candidates = sections
      .map((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const distance = target < top ? top - target : target > bottom ? target - bottom : 0;
        return { section, distance, height: section.offsetHeight };
      })
      .sort((a, b) => a.distance - b.distance || a.height - b.height);

    const section = candidates[0]?.section;
    if (!section) return { title: '演讲进度', detail: `${Math.round(target)} px` };

    const lines = Array.from(section.querySelectorAll<HTMLElement>('h1, h2, h3, p'))
      .map((element) => (element.textContent || '').replace(/\s+/g, ' ').trim())
      .filter((line, index, all) => line && all.indexOf(line) === index && line.length <= 90);

    return {
      title: lines[0] || '演讲进度',
      detail: lines.slice(1, 3).join(' · ') || '点击刻度，进入这一段叙事。',
    };
  };

  const previewAt = (index: number, button: HTMLButtonElement) => {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const target = max * (index / (TICK_COUNT - 1));
    const content = contentAt(target);
    const rect = button.getBoundingClientRect();
    setSelected({
      index,
      title: content.title,
      detail: content.detail,
      y: Math.min(window.innerHeight - 90, Math.max(90, rect.top + rect.height / 2)),
    });
  };

  const navigateTo = (index: number) => {
    const max = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const target = max * (index / (TICK_COUNT - 1));
    setSelected(null);
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(target, { duration: 1.35 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        aria-label="演讲进度"
        className="fixed left-2 top-1/2 z-[60] flex -translate-y-1/2 flex-col items-start md:left-6"
      >
        {Array.from({ length: TICK_COUNT }, (_, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          return (
            <button
              key={index}
              type="button"
              aria-label={`跳转到演讲进度 ${Math.round(index / (TICK_COUNT - 1) * 100)}%`}
              aria-current={isActive ? 'step' : undefined}
              onPointerEnter={(event) => previewAt(index, event.currentTarget)}
              onMouseMove={(event) => {
                if (selected?.index !== index) previewAt(index, event.currentTarget);
              }}
              onPointerLeave={() => setSelected(null)}
              onFocus={(event) => previewAt(index, event.currentTarget)}
              onBlur={() => setSelected(null)}
              onClick={() => navigateTo(index)}
              className="group flex h-2 w-10 cursor-pointer items-center justify-start pl-1 focus:outline-none"
            >
              <span
                className={`block h-[2px] rounded-full transition-[width,background-color,opacity] duration-300 ease-out group-hover:w-5 group-hover:bg-white ${
                  isActive
                    ? 'w-5 bg-white opacity-90'
                    : isPast
                      ? 'w-3 bg-[#666666] opacity-70'
                      : 'w-3 bg-[#3A3A3A] opacity-70'
                }`}
              />
            </button>
          );
        })}
      </nav>

      <AnimatePresence>
        {selected && (
          <motion.aside
            key={selected.index}
            initial={{ opacity: 0, x: -10, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed left-16 z-50 w-[min(72vw,360px)] -translate-y-1/2 border border-white/10 bg-[#171717] px-5 py-5 shadow-2xl md:left-20 md:px-6 md:py-6"
            style={{ top: selected.y }}
          >
            <p className="font-cn text-[clamp(0.9rem,1.25vw,1.15rem)] font-medium leading-relaxed text-text">
              {selected.title}
            </p>
            <p className="mt-4 font-cn text-[clamp(0.7rem,0.9vw,0.85rem)] leading-[1.75] text-text-secondary">
              {selected.detail}
            </p>
            <p className="mt-5 font-en text-[9px] tracking-[0.14em] text-text-tertiary">
              {String(selected.index + 1).padStart(2, '0')} / {TICK_COUNT}
            </p>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
