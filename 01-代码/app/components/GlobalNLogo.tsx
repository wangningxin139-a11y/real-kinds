'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetUrl } from '@/app/lib/assets';

gsap.registerPlugin(ScrollTrigger);

export default function GlobalNLogo() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    const startAnchor = document.querySelector<HTMLElement>('[data-logo-anchor="start"]');
    const heroTrigger = document.querySelector<HTMLElement>('[data-logo-hero-trigger]');
    const endAnchor = document.querySelector<HTMLElement>('[data-logo-anchor="end"]');
    const endSection = document.getElementById('presentation-end');
    if (!logo || !startAnchor || !heroTrigger || !endAnchor || !endSection) return;

    const openingSize = () => Math.min(92, Math.max(68, window.innerWidth * 0.065));
    const cornerSize = () => window.innerWidth < 768 ? 32 : 40;
    const cornerInset = () => window.innerWidth < 768 ? 18 : 28;

    const openingPosition = () => {
      const r = startAnchor.getBoundingClientRect();
      const size = openingSize();
      return { x: r.left + r.width / 2 - size / 2, y: r.top + r.height / 2 - size / 2 };
    };

    const cornerPosition = () => {
      const size = cornerSize();
      const inset = cornerInset();
      return { x: window.innerWidth - inset - size, y: inset };
    };

    const endingPosition = () => {
      const anchorRect = endAnchor.getBoundingClientRect();
      const sectionRect = endSection.getBoundingClientRect();
      const size = openingSize();
      return {
        x: anchorRect.left + anchorRect.width / 2 - size / 2,
        y: anchorRect.top - sectionRect.top + anchorRect.height / 2 - size / 2,
      };
    };

    const ctx = gsap.context(() => {
      const start = openingPosition();
      gsap.set(logo, {
        x: start.x,
        y: start.y,
        width: openingSize(),
        height: openingSize(),
        opacity: 1,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: heroTrigger,
          start: 'top top',
          end: '+=600',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }).to(logo, {
        x: () => cornerPosition().x,
        y: () => cornerPosition().y,
        width: () => cornerSize(),
        height: () => cornerSize(),
        ease: 'power2.out',
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: endSection,
          start: 'top 72%',
          end: 'top top',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      }).to(logo, {
        x: () => endingPosition().x,
        y: () => endingPosition().y,
        width: () => openingSize(),
        height: () => openingSize(),
        ease: 'power2.out',
      });
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={logoRef}
      aria-hidden="true"
      className="fixed left-0 top-0 z-50 select-none bg-[#F5F5F5] opacity-0 pointer-events-none"
      style={{
        WebkitMaskImage: `url(${assetUrl('/n-logo.png')})`,
        maskImage: `url(${assetUrl('/n-logo.png')})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  );
}
