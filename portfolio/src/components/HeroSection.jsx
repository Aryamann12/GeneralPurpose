import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { Button } from './ui/button';
import { personalInfo } from '../data/content';
import useTypewriter from '../hooks/useTypewriter';

const HeroSection = () => {
  const dynamicText = useTypewriter(personalInfo.rotatingWords, 100, 50, 2000);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: '#0a0e27' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a78bfa]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[60%_40%] gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            {/* Greeting */}
            <p className="text-gray-400 text-lg mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              Hi, I am
            </p>
            
            {/* Name with Gradient */}
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-light mb-6"
              style={{ 
                fontFamily: 'Outfit, sans-serif', 
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #00d4ff 0%, #a78bfa 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {personalInfo.name}
            </h1>

            {/* Typewriter Effect */}
            <div className="mb-6">
              <h2
                className="text-2xl md:text-4xl font-light text-white"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                I'm a{' '}
                <span className="text-[#00d4ff]">
                  {dynamicText}
                  <span className="animate-blink">|</span>
                </span>
              </h2>
            </div>

            {/* Expanded Professional Description */}
            <div className="mb-8 space-y-4">
              <p className="text-lg text-gray-300 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                {personalInfo.tagline}
              </p>
              <p className="text-base text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Currently serving as a <span className="text-[#00d4ff] font-semibold">Senior AI Data Scientist at GEP</span>, 
                I architect production-grade ML systems and drive AI innovation for enterprise procurement intelligence. 
                Previously at <span className="text-[#a78bfa]">GST Network</span>, I optimized taxpayer network processing by 99%+ 
                and built fraud detection models with 70% recall.
              </p>
              <p className="text-base text-gray-400 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                My research at <span className="text-[#a78bfa]">IIIT Hyderabad's Precog Lab</span> on AI for Legal Citation 
                and COVID-19 community dynamics has been published at <span className="text-[#00d4ff]">ASONAM</span>. 
                An <span className="text-[#00d4ff] font-semibold">IIT Gandhinagar</span> alumnus with 2× Dean's List honors, 
                I combine technical excellence with creative problem-solving.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Button
                onClick={() => scrollToSection('journey')}
                className="bg-gradient-to-r from-[#00d4ff] to-[#a78bfa] hover:opacity-90 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-[#00d4ff]/50 transition-all hover:scale-105"
              >
                View My Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#a78bfa] text-[#a78bfa] hover:bg-[#a78bfa]/10 font-semibold px-8 py-6 text-lg rounded-lg transition-all hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap items-center gap-3">
              {['AI', 'Data Science', 'Full-Stack', 'Music'].map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 border border-gray-500 text-gray-300 rounded-full text-sm hover:border-[#00d4ff] hover:text-[#00d4ff] transition-all hover:scale-105"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column - Profile Picture */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative group">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00d4ff] to-[#a78bfa] rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500"></div>
              
              {/* Profile Picture Container */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a1f3a] to-[#0f1329] border border-white/10">
                {/* Placeholder with gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/20 to-[#a78bfa]/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#a78bfa] flex items-center justify-center shadow-2xl">
                      <span className="text-white text-6xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {personalInfo.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">Profile Photo</p>
                    <p className="text-gray-500 text-xs mt-1">Professional Headshot</p>
                  </div>
                </div>
                
                {/* Subtle background blur effect */}
                <div className="absolute inset-0 backdrop-blur-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[#00d4ff] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
