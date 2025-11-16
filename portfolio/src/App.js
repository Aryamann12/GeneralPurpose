import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import JourneySection from './components/JourneySection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ResearchSection from './components/ResearchSection';
import ModernSkillsSection from './components/ModernSkillsSection';
import MusicSection from './components/MusicSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';

function App() {
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

export default App;
