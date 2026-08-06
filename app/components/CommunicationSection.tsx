'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { assetUrl } from '@/app/lib/assets';
import ResilientImage from '@/app/components/ResilientImage';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════
   Communication Studies｜传播学 — Chapter 4
   Scroll Storytelling   Social Construction of Reality
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
          Communication Studies
        </h1>
        <p className="font-cn text-[clamp(0.875rem,1.4vw,1.5rem)] text-text-secondary mt-6 tracking-[0.04em]">
          传播学
        </p>
        <p className="font-en text-[clamp(0.625rem,0.9vw,1rem)] text-text-tertiary mt-4 tracking-[0.12em]">
          Reality is Constructed
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
        <p className="font-cn text-[clamp(1.25rem,3vw,3rem)] text-text font-medium leading-[1.3] tracking-tight">
          我们相信的是图像，
          <br />
          还是一种观看方式？
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 03 — John Berger / Ways of Seeing ─── */

const BERGER_IMAGES = [
  { src: assetUrl('/media/theory/seeing-01.jpg'), alt: 'Ways of Seeing visual study', label: 'Ways of Seeing' },
  { src: assetUrl('/media/theory/seeing-02.jpg'), alt: 'Ways of Seeing visual study', label: 'Ways of Seeing' },
  { src: assetUrl('/media/theory/seeing-03.jpg'), alt: 'Ways of Seeing visual study', label: 'Ways of Seeing' },
];

function Section03Berger() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.5rem,3vw,3rem)] font-bold text-text tracking-tight mb-2"
      >
        Ways of Seeing
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-en text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary mb-8 tracking-[0.12em]"
      >
        John Berger · 1972
      </motion.p>
      <p className="-mt-6 mb-2 font-cn text-[clamp(0.625rem,0.85vw,0.875rem)] tracking-[0.1em] text-text-secondary">观看之道</p>
      <a href="https://en.wikipedia.org/wiki/Ways_of_Seeing" target="_blank" rel="noopener noreferrer"
         className="reference-link mb-8">
        参考资料 ↗
      </a>

      {/* 2×2 image grid */}
      <div className="grid grid-cols-3 gap-2 max-w-2xl w-full mb-10">
        {BERGER_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="aspect-square overflow-hidden rounded-sm bg-bg-elevated"
          >
            <ResilientImage src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-xl"
      >
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          我们不是先看见，
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text-secondary leading-relaxed tracking-[0.04em] mt-2">
          再理解。
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text-secondary leading-relaxed tracking-[0.04em] mt-6">
          而是先拥有观看方式，
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em] mt-2">
          再看见世界。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 04 — Roland Barthes / Camera Lucida ─── */

const BARTHES_IMAGES = [
  { src: assetUrl('/media/theory/camera-lucida-01.png'), alt: 'Camera Lucida visual archive', label: 'Camera Lucida' },
  { src: assetUrl('/media/theory/camera-lucida-02.png'), alt: 'Camera Lucida family photograph', label: '旧照片' },
  { src: assetUrl('/media/theory/roland-barthes.png'), alt: 'Roland Barthes portrait', label: 'Roland Barthes' },
  { src: assetUrl('/media/theory/camera-lucida-03.png'), alt: 'Camera Lucida portrait study', label: '肖像' },
];

function Section04Barthes() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.5rem,3vw,3rem)] font-bold text-text tracking-tight mb-2"
      >
        Camera Lucida
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-en text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary mb-8 tracking-[0.12em]"
      >
        Roland Barthes · 1980
      </motion.p>
      <p className="-mt-6 mb-2 font-cn text-[clamp(0.625rem,0.85vw,0.875rem)] tracking-[0.1em] text-text-secondary">明室</p>
      <a href="https://en.wikipedia.org/wiki/Camera_Lucida_(book)" target="_blank" rel="noopener noreferrer"
         className="reference-link mb-8">
        参考资料 ↗
      </a>

      {/* 2×2 grid of documentary photography */}
      <div className="grid grid-cols-2 gap-2 max-w-lg w-full mb-10">
        {BARTHES_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="aspect-[4/3] overflow-hidden rounded-sm bg-bg-elevated"
          >
            <ResilientImage src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          照片让人相信，
        </p>
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em] mt-2">
          不是因为真实。
        </p>
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em] mt-6">
          而是因为：
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.02em] mt-4">
          &ldquo;它曾经存在过。&rdquo;
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 05 — McLuhan ─── */

function Section05McLuhan() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight mb-2"
      >
        The Medium is the Message
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-en text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary mb-8 tracking-[0.12em]"
      >
        Marshall McLuhan · 1964
      </motion.p>
      <p className="-mt-6 mb-2 font-cn text-[clamp(0.625rem,0.85vw,0.875rem)] tracking-[0.1em] text-text-secondary">媒介即讯息</p>
      <a href="https://en.wikipedia.org/wiki/The_medium_is_the_message" target="_blank" rel="noopener noreferrer"
         className="reference-link mb-8">
        参考资料 ↗
      </a>

      {/* Media evolution images */}
      <div className="grid grid-cols-2 gap-3 max-w-lg w-full mb-10">
        {/* TV image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="aspect-[4/3] overflow-hidden rounded-sm bg-bg-elevated"
        >
          <ResilientImage
            src={assetUrl('/marshall-mcluhan.jpg')}
            alt="Marshall McLuhan with television"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
        {/* Smartphone */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="aspect-[4/3] overflow-hidden rounded-sm bg-bg-elevated"
        >
          <ResilientImage
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80"
            alt="Smartphone"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          媒介改变了内容。
        </p>
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em] mt-6">
          手机改变了摄影。
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em] mt-6">
          摄影改变了真实。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 06 — News Photography —── */

const NEWS_KEYWORDS = [
  '即时', '现场', '抓拍', '自然光', '未经摆拍', '公共传播',
];

function Section06NewsPhoto() {
  return (
    <section className="relative w-full bg-black select-none" style={{ minHeight: '100dvh', padding: '10vh 4vw' }}>
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-cn text-[clamp(0.75rem,1.1vw,1rem)] text-text-tertiary text-center mb-8 tracking-[0.12em]"
      >
        新闻照片为什么天然可信？
      </motion.h3>
      <a href="https://en.wikipedia.org/wiki/Photojournalism" target="_blank" rel="noopener noreferrer"
         className="reference-link text-center mb-8">
        参考资料 ↗
      </a>

      {/* News photos */}
      <div className="grid grid-cols-2 gap-2 max-w-2xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="aspect-[4/3] overflow-hidden rounded-sm bg-bg-elevated"
        >
          <ResilientImage src={assetUrl('/media/news/news-03.jpg')} alt="Documentary childhood" className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="aspect-[4/3] overflow-hidden rounded-sm bg-bg-elevated"
        >
          <ResilientImage src={assetUrl('/media/news/news-04.jpg')} alt="Decisive moment" className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="aspect-[4/3] overflow-hidden rounded-sm bg-bg-elevated"
        >
          <ResilientImage src={assetUrl('/media/news/news-05.jpg')} alt="Street documentary" className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="aspect-[4/3] overflow-hidden rounded-sm bg-bg-elevated"
        >
          <ResilientImage src={assetUrl('/media/news/news-06.jpg')} alt="Public event news photograph" className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
      </div>

      {/* Keywords */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-xl mx-auto mb-12"
      >
        {NEWS_KEYWORDS.map((kw, i) => (
          <motion.span
            key={kw}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
            className="font-cn text-[clamp(0.625rem,0.85vw,0.8125rem)] text-text-secondary px-3 py-1.5 border border-white/10 rounded-full tracking-[0.04em]"
          >
            {kw}
          </motion.span>
        ))}
      </motion.div>

      {/* Conclusion */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center max-w-lg mx-auto"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          新闻摄影值得相信，
        </p>
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em] mt-2">
          不是因为相机。
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em] mt-6">
          而是因为一种传播规范。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 07 — 24fps as film language ─── */

const FILM_IMAGES = [
  { src: assetUrl('/media/theory/film-01.jpg'), alt: '《美丽人生》电影画面' },
  { src: assetUrl('/media/theory/film-02.jpg'), alt: '《霸王别姬》电影画面' },
  { src: assetUrl('/media/theory/film-03.jpg'), alt: '《游览意大利》电影画面' },
  { src: assetUrl('/media/theory/film-04.jpg'), alt: '奥黛丽·赫本电影画面' },
];

function Section07FilmLanguage() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight mb-8"
      >
        24fps
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-cn text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary mb-8 tracking-[0.12em]"
      >
        为什么24fps成为电影语言？
      </motion.p>
      <a href="https://en.wikipedia.org/wiki/24p" target="_blank" rel="noopener noreferrer"
         className="reference-link mb-8">
        参考资料 ↗
      </a>

      {/* Film images 2×2 */}
      <div className="grid grid-cols-2 gap-2 max-w-lg w-full mb-10">
        {FILM_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="aspect-[4/3] overflow-hidden rounded-sm bg-bg-elevated"
          >
            <ResilientImage src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          24fps
        </p>
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em] mt-2">
          不是最真实。
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em] mt-6">
          而是100年电影共同建立的语言。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 08 — iPhone / Visual Habit ─── */

const PHONE_PIPELINE = [
  { label: 'iPhone Camera', cn: 'iPhone 相机' },
  { label: 'Social Media', cn: '社交媒体' },
  { label: 'Daily Exposure', cn: '每天观看' },
  { label: 'Visual Habit', cn: '视觉经验' },
  { label: 'Believability', cn: '真实感' },
];

function Section08iPhoneVisualHabit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const ctx = gsap.context(() => {
      const paths = svg.querySelectorAll<SVGPathElement>('.phone-pipeline-arrow');
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

  const nodeW = 140;
  const nodeH = 48;
  const gap = 28;
  const startX = 40;
  const y = 100;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black select-none flex flex-col items-center justify-center"
      style={{ minHeight: '100dvh', padding: '8vh 4vw' }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight mb-8"
      >
        Visual Habit
      </motion.h2>

      {/* Pipeline SVG */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-5xl mb-10"
      >
        <svg
          ref={svgRef}
          viewBox="0 0 920 200"
          className="w-full h-auto"
          style={{ maxHeight: '45vh' }}
        >
          {/* Arrows + nodes */}
          {PHONE_PIPELINE.map((node, i) => {
            const x = startX + i * (nodeW + gap);
            const cx = x + nodeW / 2;
            return (
              <g key={node.label}>
                {/* Arrow from previous */}
                {i > 0 && (
                  <>
                    <path
                      className="phone-pipeline-arrow"
                      d={`M ${startX + (i - 1) * (nodeW + gap) + nodeW} ${y} L ${x - 6} ${y}`}
                      fill="none"
                      stroke="#555555"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <polygon
                      className="phone-pipeline-arrow"
                      points={`${x - 7},${y - 4} ${x - 7},${y + 4} ${x + 1},${y}`}
                      fill="#555555"
                      opacity="0.5"
                    />
                  </>
                )}
                {/* Node */}
                <rect
                  x={x}
                  y={y - nodeH / 2}
                  width={nodeW}
                  height={nodeH}
                  rx="6"
                  ry="6"
                  fill="none"
                  stroke="#444444"
                  strokeWidth="1"
                />
                <text
                  x={cx}
                  y={y - 4}
                  textAnchor="middle"
                  dominantBaseline="auto"
                  className="font-en"
                  fill="#999999"
                  fontSize="11"
                >
                  {node.label}
                </text>
                <text
                  x={cx}
                  y={y + 14}
                  textAnchor="middle"
                  dominantBaseline="auto"
                  className="font-cn"
                  fill="#666666"
                  fontSize="11"
                >
                  {node.cn}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center max-w-xl"
      >
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em]">
          真实，
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em] mt-2">
          来自重复观看。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 09 — Stuart Hall / Encoding Decoding ─── */

function Section09StuartHall() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const ctx = gsap.context(() => {
      const paths = svg.querySelectorAll<SVGPathElement>('.hall-arrow');
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onEnter: () => {
          paths.forEach((p, i) => {
            const len = p.getTotalLength();
            gsap.fromTo(p,
              { strokeDashoffset: len, strokeDasharray: len },
              { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out', delay: i * 0.2 }
            );
          });
        },
        once: true,
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black select-none flex flex-col items-center justify-center"
      style={{ minHeight: '100dvh', padding: '8vh 4vw' }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight mb-2"
      >
        Encoding / Decoding
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-en text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary mb-8 tracking-[0.12em]"
      >
        Stuart Hall · 1973
      </motion.p>
      <p className="-mt-6 mb-2 font-cn text-[clamp(0.625rem,0.85vw,0.875rem)] tracking-[0.1em] text-text-secondary">编码／解码</p>
      <a href="https://en.wikipedia.org/wiki/Encoding/decoding_model_of_communication" target="_blank" rel="noopener noreferrer"
         className="reference-link mb-8">
        参考资料 ↗
      </a>

      {/* SVG: Encoding → Media → Decoding */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-lg mb-10"
      >
        <svg viewBox="0 0 400 120" className="w-full h-auto">
          {[
            { label: 'Encoding', x: 30 },
            { label: 'Media', x: 155 },
            { label: 'Decoding', x: 280 },
          ].map((node, i, arr) => (
            <g key={node.label}>
              {i > 0 && (
                <>
                  <path
                    className="hall-arrow"
                    d={`M ${arr[i - 1].x + 110} 60 L ${node.x - 6} 60`}
                    fill="none"
                    stroke="#555555"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <polygon
                    className="hall-arrow"
                    points={`${node.x - 7},56 ${node.x - 7},64 ${node.x + 1},60`}
                    fill="#555555"
                    opacity="0.5"
                  />
                </>
              )}
              <rect x={node.x} y={36} width={110} height={48} rx="6" ry="6" fill="none" stroke="#444444" strokeWidth="1" />
              <text x={node.x + 55} y={65} textAnchor="middle" dominantBaseline="auto" className="font-en" fill="#999999" fontSize="13">
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          图像没有固定意义。
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em] mt-6">
          意义来自观看者。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 10 — Baudrillard / Simulacra ─── */

const SIMULACRA_IMAGES = [
  { src: assetUrl('/media/theory/simulacra-01.jpg'), alt: '拟像视觉案例一', label: '现实' },
  { src: assetUrl('/media/theory/simulacra-02.jpg'), alt: '拟像视觉案例二', label: '照片' },
  { src: assetUrl('/media/theory/simulacra-03.jpg'), alt: '拟像视觉案例三', label: '社交媒体' },
  { src: assetUrl('/media/theory/simulacra-04.jpg'), alt: '拟像视觉案例四', label: 'AI生成' },
];

function Section10Baudrillard() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight mb-2"
      >
        Simulacra
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="font-en text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary mb-8 tracking-[0.12em]"
      >
        Jean Baudrillard · 1981
      </motion.p>
      <p className="-mt-6 mb-2 font-cn text-[clamp(0.625rem,0.85vw,0.875rem)] tracking-[0.1em] text-text-secondary">拟像</p>
      <a href="https://en.wikipedia.org/wiki/Simulacra_and_Simulation" target="_blank" rel="noopener noreferrer"
         className="reference-link mb-8">
        参考资料 ↗
      </a>

      {/* Three images cascading — reality → photo → social media → AI */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-3xl w-full mb-8">
        {SIMULACRA_IMAGES.map((img, i) => (
          <motion.div
            key={img.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex flex-col items-center"
          >
            <div className="w-full aspect-[3/4] overflow-hidden rounded-sm mb-2 bg-bg-elevated">
              <ResilientImage src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          我们越来越多地生活在：
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em] mt-4">
          图像中的世界。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 11 — Framing ─── */

function Section11Framing() {
  const [cropMode, setCropMode] = useState<'wide' | 'tight'>('wide');
  const [titleMode, setTitleMode] = useState<'neutral' | 'biased'>('neutral');

  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight mb-8"
      >
        Framing
      </motion.h2>
      <p className="-mt-5 mb-2 font-cn text-[clamp(0.625rem,0.85vw,0.875rem)] tracking-[0.1em] text-text-secondary">框架</p>
      <a href="https://en.wikipedia.org/wiki/Framing_(social_sciences)" target="_blank" rel="noopener noreferrer"
         className="reference-link mb-8">
        参考资料 ↗
      </a>

      {/* The same image — different crops */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mb-6 cursor-pointer overflow-hidden rounded-sm"
        onClick={() => setCropMode(cropMode === 'wide' ? 'tight' : 'wide')}
      >
        <div className="aspect-[16/9] overflow-hidden bg-bg-elevated relative">
          <ResilientImage
            src={assetUrl('/media/theory/framing-01.jpg')}
            alt="Framing example"
            className="w-full h-full object-cover transition-all duration-700"
            style={{
              objectPosition: cropMode === 'tight' ? '60% 50%' : '50% 50%',
              transform: cropMode === 'tight' ? 'scale(2.5)' : 'scale(1)',
            }}
            loading="lazy"
          />
        </div>
        <p className="font-cn text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary text-center mt-2 tracking-[0.08em]">
          点击切换裁切 · {cropMode === 'wide' ? '远景' : '特写'}
        </p>
      </motion.div>

      {/* Headline toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-6 cursor-pointer"
        onClick={() => setTitleMode(titleMode === 'neutral' ? 'biased' : 'neutral')}
      >
        <p className="font-cn text-[clamp(1rem,1.5vw,1.5rem)] text-text font-medium tracking-tight leading-relaxed">
          {titleMode === 'neutral'
            ? '现场发生了一起事件'
            : '震惊！你绝对不敢相信发生了什么'
          }
        </p>
        <p className="font-cn text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary mt-2 tracking-[0.08em]">
          点击切换标题
        </p>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-xl"
      >
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em]">
          改变框架，
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em] mt-2">
          就改变真实。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 12 — Reality Construction ─── */

function Section12RealityConstruction() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;

    const ctx = gsap.context(() => {
      const paths = svg.querySelectorAll<SVGPathElement>('.reality-arrow');
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

  const nodes = ['Reality', 'Camera', 'Media', 'Culture', 'Memory', 'Believability'];
  const nodeW = 120;
  const nodeH = 44;
  const gap = 16;
  const startX = 50;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black select-none flex flex-col items-center justify-center"
      style={{ minHeight: '100dvh', padding: '8vh 4vw' }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight mb-8"
      >
        Reality Construction
      </motion.h2>

      {/* Vertical pipeline */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-sm"
      >
        <svg
          ref={svgRef}
          viewBox="0 0 280 500"
          className="w-full h-auto"
          style={{ maxHeight: '60vh' }}
        >
          {nodes.map((node, i) => {
            const y = 20 + i * (nodeH + gap);
            const x = 80;
            const cx = x + nodeW / 2;
            return (
              <g key={node}>
                {/* Arrow from previous */}
                {i > 0 && (
                  <>
                    <path
                      className="reality-arrow"
                      d={`M ${cx} ${20 + (i - 1) * (nodeH + gap) + nodeH} L ${cx} ${y - 6}`}
                      fill="none"
                      stroke="#555555"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <polygon
                      className="reality-arrow"
                      points={`${cx - 4},${y - 7} ${cx + 4},${y - 7} ${cx},${y + 1}`}
                      fill="#555555"
                      opacity="0.5"
                    />
                  </>
                )}
                <rect x={x} y={y} width={nodeW} height={nodeH} rx="6" ry="6" fill="none"
                  stroke={node === 'Believability' ? '#4EA1FF' : '#444444'}
                  strokeWidth={node === 'Believability' ? 1.5 : 1}
                />
                <text
                  x={cx} y={y + nodeH / 2 + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  className="font-en"
                  fill={node === 'Believability' ? '#4EA1FF' : '#999999'}
                  fontSize="12"
                >
                  {node}
                </text>
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-xl mt-8"
      >
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em]">
          真实，
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em] mt-2">
          不是被发现。
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em] mt-6">
          而是不断被建构。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 13 — AI & Visual Culture ─── */

const AI_IMAGES = [
  { src: assetUrl('/media/ai/ai-01.jpg'), alt: 'AI visual culture study', label: 'AI 生成' },
  { src: assetUrl('/media/ai/ai-02.jpg'), alt: 'AI visual culture study', label: 'AI 生成' },
  { src: assetUrl('/media/ai/ai-03.jpg'), alt: 'AI visual culture study', label: 'AI 生成' },
  { src: assetUrl('/media/ai/ai-04.jpg'), alt: 'AI visual culture study', label: 'AI 生成' },
];

function Section13AI() {
  return (
    <section className="relative w-full bg-black select-none flex flex-col items-center justify-center" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6 }}
        className="font-en text-[clamp(1.25rem,2.5vw,2.5rem)] font-bold text-text tracking-tight mb-8"
      >
        AI & Visual Culture
      </motion.h2>

      {/* AI images 2×2 */}
      <div className="grid grid-cols-2 gap-2 max-w-md w-full mb-10">
        {AI_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="aspect-square overflow-hidden rounded-sm bg-bg-elevated"
          >
            <ResilientImage src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        ))}
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center max-w-xl"
      >
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
          AI
        </p>
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em] mt-2">
          没有理解世界。
        </p>
        <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em] mt-6">
          AI 理解的是：
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text leading-relaxed tracking-[0.04em] mt-4">
          人类长期建立的视觉文化。
        </p>
      </motion.div>
    </section>
  );
}

/* ─── Section 14 — Chapter Summary ─── */

function Section14Summary() {
  const lines = [
    { text: '新闻摄影可信，', sub: '因为传播规范。' },
    { text: '24fps真实，', sub: '因为电影规范。' },
    { text: 'iPhone真实，', sub: '因为视觉规范。' },
    { text: 'AI真实，', sub: '因为文化规范。' },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ minHeight: '100dvh', padding: '10vh 4vw' }}>
      <div className="text-center max-w-2xl">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.8, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <p className="font-cn text-[clamp(1rem,1.8vw,1.75rem)] text-text-secondary tracking-tight">
              {line.text}
            </p>
            <p className="font-cn text-[clamp(1rem,1.8vw,1.75rem)] text-text tracking-tight mt-1">
              {line.sub}
            </p>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-30%' }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-16"
        >
          <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em]">
            我们相信的，
            <br />
            从来不是图像本身。
          </p>
          <p className="font-cn text-[clamp(0.75rem,1.1vw,1.125rem)] text-text-secondary leading-relaxed tracking-[0.04em] mt-6">
            而是长期建立起来的
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['文化', '媒介', '观看方式'].map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 2 + i * 0.15 }}
                className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text border border-white/20 px-4 py-1.5 rounded-full tracking-[0.04em]"
              >
                {w}
              </motion.span>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-25%' }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="font-en text-[clamp(0.75rem,1.1vw,1.125rem)] text-accent mt-10 tracking-[0.02em]"
          >
            Believability is socially constructed.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Section 15 — Final Convergence ─── */

const FINAL_DISCIPLINES = [
  { en: 'Photography', cn: '摄影学' },
  { en: 'Computer Graphics', cn: '计算机图形学' },
  { en: 'Cognitive Science', cn: '认知科学' },
  { en: 'Communication Studies', cn: '传播学' },
];

function Section15FinalConvergence() {
  return (
    <section className="relative flex flex-col items-center justify-center w-full bg-black select-none" style={{ minHeight: '100dvh', padding: '8vh 4vw' }}>
      {/* Believability */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <h2 className="font-en text-[clamp(2rem,5vw,5rem)] font-black text-text tracking-tight leading-none">
          Believability
        </h2>
        <p className="font-cn text-[clamp(0.875rem,1.4vw,1.5rem)] text-text-secondary mt-4 tracking-[0.06em]">
          真实感
        </p>
      </motion.div>

      {/* Four disciplines */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl w-full mb-12"
      >
        {FINAL_DISCIPLINES.map((d, i) => (
          <motion.div
            key={d.en}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            className="text-center"
          >
            <p className="font-en text-[clamp(0.625rem,0.8vw,0.875rem)] text-text-secondary tracking-[0.02em]">
              {d.en}
            </p>
            <p className="font-cn text-[clamp(0.5rem,0.65vw,0.75rem)] text-text-tertiary mt-1 tracking-[0.08em]">
              {d.cn}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Arrow pointing down */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mb-10"
      >
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
          <line x1="12" y1="0" x2="12" y2="30" stroke="#555555" strokeWidth="1" />
          <path d="M12 40 L5 30 H19 Z" fill="#555555" />
        </svg>
      </motion.div>

      {/* AI Image Evaluation */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center"
      >
        <h3 className="font-en text-[clamp(0.875rem,1.3vw,1.375rem)] font-medium text-accent tracking-[0.02em]">
          AI Image Evaluation
        </h3>
      </motion.div>

      {/* Final statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-2xl mt-20"
      >
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text-secondary leading-relaxed tracking-[0.02em]">
          真实，
        </p>
        <p className="font-cn text-[clamp(0.875rem,1.3vw,1.375rem)] text-text-secondary leading-relaxed tracking-[0.02em] mt-2">
          从来都不是一种属性。
        </p>
        <p className="font-cn text-[clamp(1rem,1.5vw,1.5rem)] text-text font-medium leading-relaxed tracking-[0.02em] mt-6">
          而是一种不断被建构的相信。
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-35%' }}
          transition={{ duration: 0.8, delay: 2 }}
          className="font-en text-[clamp(0.75rem,1.1vw,1.125rem)] text-accent mt-8 tracking-[0.02em]"
        >
          Believability is continuously constructed.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Export
   ═══════════════════════════════════════════════════════════════ */

export default function CommunicationSection() {
  return (
    <section id="section-communication" className="relative w-full bg-black">
      <Section01Title />
      <Section02Question />
      <Section03Berger />
      <Section04Barthes />
      <Section05McLuhan />
      <Section06NewsPhoto />
      <Section07FilmLanguage />
      <Section08iPhoneVisualHabit />
      <Section09StuartHall />
      <Section10Baudrillard />
      <Section11Framing />
      <Section12RealityConstruction />
      <Section13AI />
      <Section14Summary />
      <Section15FinalConvergence />
    </section>
  );
}
