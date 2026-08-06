'use client';

import ScrollProvider from '@/app/components/ScrollProvider';
import FilmGrain from '@/app/components/FilmGrain';
import HeroSection from '@/app/components/HeroSection';
import KnowledgeLandscape from '@/app/components/KnowledgeLandscape';
import PhotographySection from '@/app/components/PhotographySection';
import ComputerGraphicsSection from '@/app/components/ComputerGraphicsSection';
import CognitiveScienceSection from '@/app/components/CognitiveScienceSection';
import CommunicationSection from '@/app/components/CommunicationSection';
import AIImageEvaluationSection from '@/app/components/AIImageEvaluationSection';
import GlobalNLogo from '@/app/components/GlobalNLogo';
import ProgressRail from '@/app/components/ProgressRail';

export default function HomePage() {
  return (
    <ScrollProvider>
      <main className="relative bg-black">
        {/* ─── Film grain overlay (fixed) ─── */}
        <FilmGrain />
        <GlobalNLogo />
        <ProgressRail />

        {/* ─── Hero ─── */}
        <HeroSection />

        {/* ─── Knowledge Landscape ─── */}
        <KnowledgeLandscape />

        {/* ─── Photography ─── */}
        <PhotographySection />

        {/* ─── Computer Graphics ─── */}
        <ComputerGraphicsSection />

        {/* ─── Cognitive Science ─── */}
        <CognitiveScienceSection />

        {/* ─── Communication Studies ─── */}
        <CommunicationSection />

        {/* ─── AI Image Evaluation ─── */}
        <AIImageEvaluationSection />
      </main>
    </ScrollProvider>
  );
}
