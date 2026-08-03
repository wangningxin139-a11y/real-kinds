'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.8,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Expose globally so other components can call lenis.scrollTo()
    (window as any).__lenis = lenis;

    // Connect Lenis scroll to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP ticker to drive Lenis
    const tickCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      delete (window as any).__lenis;
      lenis.destroy();
      gsap.ticker.remove(tickCallback);
    };
  }, []);

  return <>{children}</>;
}
