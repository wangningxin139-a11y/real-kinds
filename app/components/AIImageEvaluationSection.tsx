'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { assetUrl } from '@/app/lib/assets';

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
    assetUrl('/media/theory/layer-physical.jpg'),
  ],
  perceptual: [assetUrl('/media/theory/layer-perceptual.jpg')],
  semantic: [
    assetUrl('/media/ai/layer-semantic.jpg'),
  ],
  cultural: [
    assetUrl('/media/theory/layer-cultural.jpg'),
  ],
  communicative: [
    assetUrl('/media/news/layer-communicative.jpg'),
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
      <div className="relative flex h-[72vh] w-full max-w-6xl items-center justify-center">
        <div className="absolute inset-0 hidden md:block">
          {[14, 38, 62, 84].map((x, i) => (
            <motion.div
              key={x}
              className="absolute top-[24%] h-[13%] w-px origin-top bg-[#555]"
              style={{ left: `${x}%` }}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: .75, delay: .2 + i * .12, ease }}
            />
          ))}
          <motion.div
            className="absolute left-[14%] top-[37%] h-px w-[70%] origin-left bg-[#555]"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.05, delay: .72, ease }}
          />
          <motion.div
            className="absolute left-1/2 top-[37%] h-[10%] w-px origin-top bg-[#555]"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: .65, delay: 1.25, ease }}
          />
        </div>
        {chapters.map((label, i) => {
          const desktopPositions = ['md:left-[14%]','md:left-[38%]','md:left-[62%]','md:left-[84%]'];
          const mobilePositions = ['top-[3%]','top-[15%]','top-[27%]','top-[39%]'];
          return (
            <div
              key={label}
              className={`absolute left-1/2 ${mobilePositions[i]} -translate-x-1/2 bg-black px-4 py-2 text-center md:top-[14%] ${desktopPositions[i]}`}
            >
              <Fade delay={.2 + i * .12}>
                <span className="whitespace-nowrap font-en text-[clamp(.7rem,1vw,1rem)] tracking-[.08em] text-text-secondary">{label}</span>
              </Fade>
            </div>
          );
        })}
        <div className="absolute left-1/2 top-[51%] z-10 -translate-x-1/2 bg-black px-10 py-5 text-center md:top-[49%]">
          <Fade delay={1.05}>
            <p className="font-en text-[clamp(2rem,5vw,5rem)] font-bold tracking-[-.03em]">Believability</p>
            <p className="mt-3 text-sm tracking-[.12em] text-text-secondary">真实感</p>
            <p className="mt-12 font-en text-xs tracking-[.14em] text-accent">AI Image Evaluation</p>
          </Fade>
        </div>
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
    <FullScreen min="100dvh" className="py-[7vh]">
      <Fade className="mb-7 text-center"><p className="font-en text-[10px] tracking-[.2em] text-text-tertiary">A SIX-LAYER MODEL</p><h2 className="mt-3 font-en text-[clamp(1.8rem,3.5vw,3.5rem)] font-bold">Layers of Believability</h2></Fade>
      <div className="relative aspect-square w-[min(72vw,560px)]">
        <svg viewBox="0 0 680 680" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
          {[90,170,250].map((r, i) => <motion.circle key={r} cx="340" cy="340" r={r} stroke={i === 0 ? '#444' : '#2B2B2B'} strokeWidth="1" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: i * .18, ease }} />)}
          {LAYERS.map((_, i) => { const a = (i * 60 - 90) * Math.PI / 180; return <motion.line key={i} x1={340 + 90 * Math.cos(a)} y1={340 + 90 * Math.sin(a)} x2={340 + 250 * Math.cos(a)} y2={340 + 250 * Math.sin(a)} stroke="#333" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: .7, delay: .55 + i * .08, ease }} />; })}
        </svg>
        <div className="absolute inset-[38%] grid place-items-center rounded-full bg-black text-center"><span className="font-en text-[clamp(.72rem,1.3vw,1.1rem)] font-semibold">Believability</span></div>
        {LAYERS.map((layer, i) => {
          const a = (i * 60 - 90) * Math.PI / 180;
          const x = 50 + 43 * Math.cos(a);
          const y = 50 + 43 * Math.sin(a);
          return (
            <div key={layer.en} className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-black px-3 py-2 text-center" style={{ left: `${x}%`, top: `${y}%` }}>
              <motion.div initial={{ opacity: 0, scale: .92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .6, delay: .75 + i * .1 }}>
                <p className="font-en text-[clamp(.55rem,1vw,.85rem)] font-semibold">{layer.en}</p>
                <p className="mt-1 text-[9px] text-text-tertiary">{layer.zh}</p>
              </motion.div>
            </div>
          );
        })}
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
          <a href={layer.link} target="_blank" rel="noopener noreferrer" className="reference-link">参考资料 ↗</a>
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
    <FullScreen min="100dvh" className="py-[7vh]">
      <Fade className="mb-3 text-center"><p className="font-en text-[10px] tracking-[.18em] text-text-tertiary">SIX-LAYER EVALUATION</p><h2 className="mt-3 text-[clamp(1.4rem,2.5vw,2.5rem)] font-medium">不要只问它是真是假。</h2></Fade>
      <div className="mt-5 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[.82fr_1.18fr] md:gap-14">
        <Fade className="mx-auto w-full max-w-[360px]">
          <SafeImage src={assetUrl('/media/ai/ai-03.jpg')} alt="用于六层真实感评测的 AI 摄影作品" className="aspect-[4/5] max-h-[58vh]" />
          <p className="mt-3 text-center font-en text-[9px] tracking-[.14em] text-text-tertiary">EVALUATION SUBJECT · AI IMAGE</p>
        </Fade>
        <div>
          <svg viewBox="0 0 500 500" className="mx-auto w-full max-w-[400px] overflow-visible" aria-label="六层真实感雷达图">
            {[40,80,120,160].map(r => <polygon key={r} points={Array.from({ length: 6 }, (_, i) => { const a=(i*60-90)*Math.PI/180; return `${250+r*Math.cos(a)},${250+r*Math.sin(a)}`; }).join(' ')} fill="none" stroke="#292929" />)}
            {labels.map((label,i)=>{const a=(i*60-90)*Math.PI/180; const x=250+194*Math.cos(a), y=250+194*Math.sin(a); return <g key={label}><line x1="250" y1="250" x2={250+160*Math.cos(a)} y2={250+160*Math.sin(a)} stroke="#292929"/><text x={x} y={y} fill="#8A8A8A" fontSize="11" textAnchor="middle" dominantBaseline="middle">{label}</text></g>;})}
            <motion.polygon points={pts} fill="rgba(78,161,255,.10)" stroke="#4EA1FF" strokeWidth="2" initial={{ opacity: 0, scale: .5, transformOrigin: '250px 250px' }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease }} />
          </svg>
          <Fade delay={.3} className="mx-auto mt-1 grid max-w-lg grid-cols-2 border-t border-white/10 pt-5 text-center text-[clamp(.72rem,1vw,.9rem)] leading-[1.7] text-text-secondary"><p>光学很强，<br/><span className="text-text">但语义失败。</span></p><p className="border-l border-white/10">物理完美，<br/><span className="text-text">但文化违和。</span></p></Fade>
        </div>
      </div>
    </FullScreen>
  );
}

function Revisit() {
  const items = [
    { label: 'iPhone', src: assetUrl('/media/real/photo-life-04.jpg') },
    { label: 'Leica', src: assetUrl('/media/real/leica-documentary-01.jpg') },
    { label: 'CG Environment', src: 'https://images.unsplash.com/photo-1753010835776-3fd4bf38ef3c?w=1200&q=88' },
    { label: 'AI Generated', src: assetUrl('/media/ai/ai-03.jpg') },
  ];
  return <FullScreen min="120dvh" className="py-[10vh]"><Fade className="mb-12 text-center"><p className="text-[clamp(1.4rem,3vw,3rem)] font-medium">不再问：哪张是真的？</p><p className="mt-5 text-[clamp(1rem,1.8vw,1.7rem)] text-text-secondary">它们分别在哪些层面建立了真实感？</p></Fade><div className="grid w-full max-w-6xl grid-cols-2 gap-2 md:grid-cols-4">{items.map((item,i)=><Fade key={item.label} delay={i*.1}><SafeImage src={item.src} alt={item.label} className="aspect-[3/4]"/><p className="mt-3 font-en text-[10px] tracking-[.1em] text-text-tertiary">{item.label}</p></Fade>)}</div></FullScreen>;
}

function FinalSummary() {
  return (
    <section className="bg-black">
      <FullScreen min="120dvh"><Fade className="text-center"><p className="font-en text-[clamp(3rem,8vw,8rem)] font-black tracking-[-.05em]">Believability</p><div className="mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-4 gap-y-3 font-en text-[clamp(.8rem,1.4vw,1.2rem)] text-text-secondary">{LAYERS.map((l,i)=><span key={l.en} className="flex items-center gap-4"><span>{l.en}</span>{i<LAYERS.length-1&&<span className="text-text-tertiary">+</span>}</span>)}</div><p className="mt-24 text-[clamp(1.3rem,3vw,3rem)] leading-[1.55]">AI学习的从来不是世界。<br/><span className="text-text-secondary">而是：</span><br/><span className="font-medium">人类如何相信世界。</span></p></Fade></FullScreen>
      <div id="presentation-end">
        <FullScreen><Fade className="text-center"><h2 className="text-[clamp(3rem,9vw,9rem)] font-black leading-none tracking-[-.05em]">真实几种</h2><p className="mt-6 text-[clamp(.9rem,1.5vw,1.5rem)] text-text-secondary">真实感的N次建构</p><div data-logo-anchor="end" className="mx-auto mt-8 h-[92px] w-[92px]" /><p className="mt-8 font-en text-[clamp(.8rem,1.2vw,1.1rem)] tracking-[.08em] text-text-tertiary">Believability is constructed.</p></Fade></FullScreen>
      </div>
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
