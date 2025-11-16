'use client';

import React from 'react';
import Navigation from '@/src/components/Navigation';
import HeroSection from '@/src/components/HeroSection';
import JourneySection from '@/src/components/JourneySection';
import ExperienceSection from '@/src/components/ExperienceSection';
import ProjectsSection from '@/src/components/ProjectsSection';
import ResearchSection from '@/src/components/ResearchSection';
import ModernSkillsSection from '@/src/components/ModernSkillsSection';
import MusicSection from '@/src/components/MusicSection';
import ContactSection from '@/src/components/ContactSection';
import Footer from '@/src/components/Footer';
import { Toaster } from '@/src/components/ui/toaster';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="App" style={{ backgroundColor: '#0a0e27' }}>
      <Navigation />
      <HeroSection />
      <JourneySection />
      <ExperienceSection />
      <ProjectsSection />
      <ResearchSection />
      <ModernSkillsSection />
      <MusicSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
}

