'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * HeroSection
 *
 * Apple-style hero collapse:
 * - Title starts centered at large scale
 * - On scroll, smoothly shrinks and moves to top-left (~700ms of scroll)
 * - Subtitle fades out in parallel
 * - Uses GSAP ScrollTrigger with scrub for the cinematic feel
 */
export default function HeroSection() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const titleBlockRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const spacer = spacerRef.current;
    const titleBlock = titleBlockRef.current;
    const subtitle = subtitleRef.current;
    if (!spacer || !titleBlock || !subtitle) return;

    const ctx = gsap.context(() => {
      // ── Force initial state before any scroll ──
      gsap.set(subtitle, { opacity: 1 });

      // ── Calculate translation: current center → top-left (32px, 36px) ──
      const calcTransform = () => {
        const rect = titleBlock.getBoundingClientRect();
        return {
          x: 32 - rect.left,
          y: 36 - rect.top,
        };
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: spacer,
          start: 'top top',
          end: '+=600',             // ~700ms of scroll distance
          scrub: 1,                  // 1-second smoothing lag
          invalidateOnRefresh: true, // recalculate on resize
        },
        defaults: {
          ease: 'power2.out',
        },
      });

      // Phase 1: Title shrinks and moves to top-left
      tl.to(titleBlock, {
        x: () => calcTransform().x,
        y: () => calcTransform().y,
        scale: 0.25,
        transformOrigin: 'left top',
        duration: 1,
      }, 0);

      // Phase 2: Subtitle fades out over first 70% of the scroll
      tl.to(subtitle, {
        opacity: 0,
        duration: 0.7,
      }, 0);

      // Refresh ScrollTrigger on resize
      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, spacer);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ─── ScrollTrigger spacer ─── */}
      <div ref={spacerRef} className="h-screen w-full" />

      {/* ─── Fixed hero title overlay ─── */}
      <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center">
        <div
          ref={titleBlockRef}
          className="text-center"
        >
          <h1
            className="
              font-cn
              text-[clamp(2.5rem,9vw,7rem)]
              font-bold
              leading-none
              text-text
              whitespace-nowrap
              select-none
              tracking-tight
            "
          >
            真实几种
          </h1>
          <p
            ref={subtitleRef}
            style={{ opacity: 1 }}
            className="
              font-cn
              mt-5
              text-[clamp(0.875rem,2vw,1.5rem)]
              font-normal
              text-text-secondary
              tracking-[0.06em]
              select-none
            "
          >
            真实感的 N 次建构
          </p>
        </div>
      </div>
    </>
  );
}
