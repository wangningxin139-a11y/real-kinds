'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const LAYERS = [
  { id: '01', en: 'Optical', zh: '光学真实', summary: '像不像一台真实相机拍出来的。', terms: ['镜头', '景深', '噪点', '炫光', '色彩响应'], link: 'https://en.wikipedia.org/wiki/Optics' },
  { id: '02', en: 'Physical', zh: '物理真实', summary: '是否符合物理世界规律。', terms: ['光照', '材质', '阴影', '运动'], link: 'https://en.wikipedia.org/wiki/Physically_based_rendering' },
  { id: '03', en: 'Perceptual', zh: '认知真实', summary: '是否符合人的感知习惯。', terms: ['预测', '注意力', '时间连续性'], link: 'https://en.wikipedia.org/wiki/Predictive_coding' },
  { id: '04', en: 'Semantic', zh: '语义真实', summary: '它是否符合我们对世界的理解。', terms: ['手指数量', '文字逻辑', '空间关系', '物体功能', '常识判断'], link: 'https://en.wikipedia.org/wiki/Semantics' },
  { id: '05', en: 'Cultural', zh: '文化真实', summary: '它是否符合一个时代的视觉文化。', terms: ['视觉风格', '时代经验', '审美习惯', '摄影语言'], link: 'https://en.wikipedia.org/wiki/Visual_culture' },
  { id: '06', en: 'Communicative', zh: '传播真实', summary: '真实，也是一种社会共识。', terms: ['社会接受', '传播场景', '观看期待'], link: 'https://en.wikipedia.org/wiki/Social_constructionism' },
] as const;

const MEDIA = {
  optical: [
    'https://images.unsplash.com/photo-1512851177535-9c23d9570784?w=1600&q=88',
  ],
  physical: [
    'https://images.unsplash.com/photo-1758239651959-61770ec854cd?w=1600&q=88',
  ],
  perceptual: ['https://images.unsplash.com/photo-1743930286867-acbd47f58e8b?w=1600&q=88'],
  semantic: [
    '/ai-semantic-evaluation.jpg',
  ],
  cultural: [
    'https://images.unsplash.com/photo-1723476519181-c7b229149c43?w=1600&q=88',
  ],
  communicative: [
    'https://images.unsplash.com/photo-1759215524530-a00b7768ce91?w=1600&q=88',
  ],
};

function SafeImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-[#151515] ${className}`}>
      {!failed && <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />}
      {failed && <div className="absolute inset-0 grid place-items-center font-en text-[10px] tracking-[0.18em] text-text-tertiary">IMAGE STUDY</div>}
    </div>
  );
}

function FullScreen({ children, className = '', min = '100dvh' }: { children: React.ReactNode; className?: string; min?: string }) {
  return <section className={`relative flex w-full flex-col items-center justify-center overflow-hidden bg-black px-[5vw] ${className}`} style={{ minHeight: min }}>{children}</section>;
}

function Fade({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-18%' }} transition={{ duration: 0.9, delay, ease }} className={className}>
      {children}
    </motion.div>
  );
}

function ChapterTitle() {
  return (
    <FullScreen>
      <Fade className="text-center">
        <h1 className="font-en text-[clamp(2.6rem,7vw,7rem)] font-black leading-none tracking-[-0.04em]">AI Image Evaluation</h1>
        <p className="mt-6 text-[clamp(.9rem,1.4vw,1.5rem)] text-text-secondary">AI图片评测</p>
        <p className="mt-4 font-en text-[clamp(.65rem,.9vw,1rem)] tracking-[.14em] text-text-tertiary">Layers of Believability</p>
      </Fade>
    </FullScreen>
  );
}

function Convergence() {
  const chapters = ['Photography', 'Computer Graphics', 'Cognitive Science', 'Communication Studies'];
  return (
    <FullScreen min="125dvh">
      <div className="relative flex h-[78vh] w-full max-w-5xl items-center justify-center">
        <div className="absolute inset-0 hidden md:block">
          <svg viewBox="0 0 1000 700" className="h-full w-full" fill="none" aria-hidden="true">
            {[[170,120],[830,120],[170,580],[830,580]].map(([x,y], i) => (
              <motion.path key={i} d={`M ${x} ${y} C ${x} 350, 500 260, 500 350`} stroke="#555" strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: .2 + i * .16, ease }} />
            ))}
          </svg>
        </div>
        {chapters.map((label, i) => {
          const positions = ['md:left-[7%] md:top-[12%]','md:right-[5%] md:top-[12%]','md:left-[7%] md:bottom-[12%]','md:right-[5%] md:bottom-[12%]'];
          return <Fade key={label} delay={.2 + i * .12} className={`absolute ${positions[i]} ${i === 0 ? 'top-[5%]' : i === 1 ? 'top-[18%]' : i === 2 ? 'bottom-[18%]' : 'bottom-[5%]'} left-1/2 -translate-x-1/2 md:translate-x-0`}><span className="font-en text-[clamp(.7rem,1vw,1rem)] tracking-[.08em] text-text-secondary">{label}</span></Fade>;
        })}
        <Fade delay={1.05} className="relative z-10 text-center">
          <p className="font-en text-[clamp(2rem,5vw,5rem)] font-bold tracking-[-.03em]">Believability</p>
          <p className="mt-3 text-sm tracking-[.12em] text-text-secondary">真实感</p>
          <p className="mt-16 font-en text-xs tracking-[.14em] text-accent">AI Image Evaluation</p>
        </Fade>
      </div>
    </FullScreen>
  );
}

function CoreStatement() {
  return (
    <section className="bg-black">
      <FullScreen><Fade className="text-center text-[clamp(1.5rem,3.7vw,3.8rem)] font-medium leading-[1.28]"><p>AI图片评测，</p><p className="mt-3 text-text-secondary">评测的不是：</p><p className="mt-8 font-en font-bold">Reality</p></Fade></FullScreen>
      <FullScreen><Fade className="text-center"><p className="text-[clamp(1.2rem,2.4vw,2.5rem)] text-text-secondary">而是：</p><p className="mt-7 font-en text-[clamp(3rem,8vw,8rem)] font-black tracking-[-.04em]">Believability</p></Fade></FullScreen>
      <FullScreen><Fade className="max-w-4xl text-center text-[clamp(1.2rem,2.5vw,2.6rem)] leading-[1.55]"><p>AI生成的图片，</p><p>不是因为它复制了世界，</p><p className="mt-8 text-text-secondary">而是因为它符合</p><p className="text-text">人类相信世界的方式。</p></Fade></FullScreen>
    </section>
  );
}

function LayerModel() {
  return (
    <FullScreen min="130dvh">
      <Fade className="mb-14 text-center"><p className="font-en text-xs tracking-[.2em] text-text-tertiary">A SIX-LAYER MODEL</p><h2 className="mt-4 font-en text-[clamp(2rem,4vw,4rem)] font-bold">Layers of Believability</h2></Fade>
      <div className="relative aspect-square w-[min(82vw,680px)]">
        <svg viewBox="0 0 680 680" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
          {[80,125,170,215,260,305].map((r, i) => <motion.circle key={r} cx="340" cy="340" r={r} stroke={i === 0 ? '#F5F5F5' : '#333'} strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: i * .16, ease }} />)}
          {LAYERS.map((_, i) => { const a = (i * 60 - 90) * Math.PI / 180; return <motion.line key={i} x1="340" y1="340" x2={340 + 305 * Math.cos(a)} y2={340 + 305 * Math.sin(a)} stroke="#292929" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: .8, delay: .8 + i * .08 }} />; })}
        </svg>
        <div className="absolute inset-[38%] grid place-items-center rounded-full bg-black text-center"><span className="font-en text-[clamp(.75rem,1.5vw,1.25rem)] font-semibold">Believability</span></div>
        {LAYERS.map((layer, i) => { const a = (i * 60 - 90) * Math.PI / 180; const x = 50 + 44 * Math.cos(a); const y = 50 + 44 * Math.sin(a); return <motion.div key={layer.en} initial={{ opacity: 0, scale: .92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .6, delay: .8 + i * .12 }} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-black px-2 text-center" style={{ left: `${x}%`, top: `${y}%` }}><p className="font-en text-[clamp(.55rem,1.1vw,.95rem)] font-semibold">{layer.en}</p><p className="mt-1 text-[10px] text-text-tertiary">{layer.zh}</p></motion.div>; })}
      </div>
    </FullScreen>
  );
}

function LayerSection({ index, images }: { index: number; images: readonly string[] }) {
  const layer = LAYERS[index];
  return (
    <FullScreen min="115dvh" className="py-[10vh]">
      <div className="grid w-full max-w-6xl items-center gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-20">
        <Fade>
          <p className="font-en text-xs tracking-[.18em] text-text-tertiary">LAYER {layer.id}</p>
          <h2 className="mt-4 font-en text-[clamp(2.8rem,6vw,6rem)] font-black leading-none tracking-[-.04em]">{layer.en}</h2>
          <p className="mt-5 text-[clamp(.9rem,1.3vw,1.25rem)] text-text-secondary">{layer.zh}</p>
          <a href={layer.link} target="_blank" rel="noopener noreferrer" className="mt-4 block font-en text-[10px] tracking-[.12em] text-text-tertiary/60 transition-colors hover:text-text-secondary">↗ Reference</a>
          <div className="mt-12 flex max-w-sm flex-wrap gap-x-6 gap-y-3">{layer.terms.map(term => <span key={term} className="text-sm text-text-secondary">{term}</span>)}</div>
          <p className="mt-12 max-w-md text-[clamp(1.05rem,1.7vw,1.6rem)] leading-[1.55]">{layer.summary}</p>
        </Fade>
        <Fade className="h-[min(68vh,680px)]">
          <SafeImage src={images[0]} alt={`${layer.en} visual study`} className="h-full" />
        </Fade>
      </div>
    </FullScreen>
  );
}

function RadarChart() {
  const labels = LAYERS.map(l => l.en);
  const scores = [88, 82, 76, 42, 58, 66];
  const pts = scores.map((v, i) => { const a = (i * 60 - 90) * Math.PI / 180; return `${250 + v * 1.8 * Math.cos(a)},${250 + v * 1.8 * Math.sin(a)}`; }).join(' ');
  return (
    <FullScreen min="120dvh">
      <Fade className="mb-10 text-center"><p className="font-en text-xs tracking-[.18em] text-text-tertiary">SIX-LAYER EVALUATION</p><h2 className="mt-4 text-[clamp(1.5rem,3vw,3rem)] font-medium">不要只问它是真是假。</h2></Fade>
      <div className="w-full max-w-3xl">
        <div>
          <svg viewBox="0 0 500 500" className="mx-auto w-full max-w-[560px] overflow-visible" aria-label="六层真实感雷达图">
            {[40,80,120,160].map(r => <polygon key={r} points={Array.from({ length: 6 }, (_, i) => { const a=(i*60-90)*Math.PI/180; return `${250+r*Math.cos(a)},${250+r*Math.sin(a)}`; }).join(' ')} fill="none" stroke="#292929" />)}
            {labels.map((label,i)=>{const a=(i*60-90)*Math.PI/180; const x=250+205*Math.cos(a), y=250+205*Math.sin(a); return <g key={label}><line x1="250" y1="250" x2={250+160*Math.cos(a)} y2={250+160*Math.sin(a)} stroke="#292929"/><text x={x} y={y} fill="#8A8A8A" fontSize="12" textAnchor="middle" dominantBaseline="middle">{label}</text></g>;})}
            <motion.polygon points={pts} fill="rgba(78,161,255,.10)" stroke="#4EA1FF" strokeWidth="2" initial={{ opacity: 0, scale: .5, transformOrigin: '250px 250px' }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} />
          </svg>
          <Fade delay={.3} className="mt-4 grid grid-cols-2 gap-4 text-sm text-text-secondary"><p>光学很强，<br/><span className="text-text">但语义失败。</span></p><p>物理完美，<br/><span className="text-text">但文化违和。</span></p></Fade>
        </div>
      </div>
    </FullScreen>
  );
}

function Revisit() {
  const items = [
    { label: 'iPhone', src: 'https://images.unsplash.com/photo-1763994683003-582f2fce55d5?w=1200&q=88' },
    { label: 'Leica', src: 'https://images.unsplash.com/photo-1743930286525-e48a7bce0d70?w=1200&q=88' },
    { label: 'CG Environment', src: 'https://images.unsplash.com/photo-1753010835776-3fd4bf38ef3c?w=1200&q=88' },
    { label: 'AI Generated', src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=88' },
  ];
  return <FullScreen min="120dvh" className="py-[10vh]"><Fade className="mb-12 text-center"><p className="text-[clamp(1.4rem,3vw,3rem)] font-medium">不再问：哪张是真的？</p><p className="mt-5 text-[clamp(1rem,1.8vw,1.7rem)] text-text-secondary">它们分别在哪些层面建立了真实感？</p></Fade><div className="grid w-full max-w-6xl grid-cols-2 gap-2 md:grid-cols-4">{items.map((item,i)=><Fade key={item.label} delay={i*.1}><SafeImage src={item.src} alt={item.label} className="aspect-[3/4]"/><p className="mt-3 font-en text-[10px] tracking-[.1em] text-text-tertiary">{item.label}</p></Fade>)}</div></FullScreen>;
}

function FinalSummary() {
  return (
    <section className="bg-black">
      <FullScreen min="120dvh"><Fade className="text-center"><p className="font-en text-[clamp(3rem,8vw,8rem)] font-black tracking-[-.05em]">Believability</p><div className="mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-4 gap-y-3 font-en text-[clamp(.8rem,1.4vw,1.2rem)] text-text-secondary">{LAYERS.map((l,i)=><span key={l.en} className="flex items-center gap-4"><span>{l.en}</span>{i<LAYERS.length-1&&<span className="text-text-tertiary">+</span>}</span>)}</div><p className="mt-24 text-[clamp(1.3rem,3vw,3rem)] leading-[1.55]">AI学习的从来不是世界。<br/><span className="text-text-secondary">而是：</span><br/><span className="font-medium">人类如何相信世界。</span></p></Fade></FullScreen>
      <FullScreen><Fade className="text-center"><h2 className="text-[clamp(3rem,9vw,9rem)] font-black leading-none tracking-[-.05em]">真实几种</h2><p className="mt-6 text-[clamp(.9rem,1.5vw,1.5rem)] text-text-secondary">真实感的N次建构</p><p className="mt-16 font-en text-[clamp(.8rem,1.2vw,1.1rem)] tracking-[.08em] text-text-tertiary">Believability is constructed.</p></Fade></FullScreen>
    </section>
  );
}

export default function AIImageEvaluationSection() {
  return (
    <section id="section-ai-image-evaluation" className="relative w-full bg-black">
      <ChapterTitle />
      <Convergence />
      <CoreStatement />
      <LayerModel />
      <LayerSection index={0} images={MEDIA.optical} />
      <LayerSection index={1} images={MEDIA.physical} />
      <LayerSection index={2} images={MEDIA.perceptual} />
      <LayerSection index={3} images={MEDIA.semantic} />
      <LayerSection index={4} images={MEDIA.cultural} />
      <LayerSection index={5} images={MEDIA.communicative} />
      <RadarChart />
      <Revisit />
      <FinalSummary />
    </section>
  );
}
