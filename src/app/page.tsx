'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import JourneySection from './components/JourneySection';
import AudiobookSection from './components/AudiobookSection';
import MeaningSection from './components/MeaningSection';
import KindergartenSection from './components/KindergartenSection';
import UseCasesSection from './components/UseCasesSection';
import TechOverviewSection from './components/TechOverviewSection';
import UIExamplesSection from './components/UIExamplesSection';
import RoadmapSection from './components/RoadmapSection';
import CollaborationSection from './components/CollaborationSection';
import Footer from './components/Footer';

/**
 * Home page component for the Ownabee landing page
 * Integrates all section components into a complete landing page
 * @returns {JSX.Element} The complete Ownabee landing page
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <JourneySection />
      <AudiobookSection />
      <MeaningSection />
      <KindergartenSection />
      <UseCasesSection />
      <TechOverviewSection />
      <UIExamplesSection />
      <RoadmapSection />
      <CollaborationSection />
      <Footer />
    </main>
  );
}
