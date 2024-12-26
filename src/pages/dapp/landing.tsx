import React from 'react';
import LandingHero from '@/modules/landing/components/LandingHero';
import LandingFeatures from '@/modules/landing/components/LandingFeatures';
import LandingWhyChoose from '@/modules/landing/components/LandingWhyChoose';
import LandingTokenUtility from '@/modules/landing/components/LandingTokenUtility';
import LandingTokenomics from '@/modules/landing/components/LandingTokenomics';
import LandingRoadmap from '@/modules/landing/components/LandingRoadmap';
import LandingFooter from '@/modules/landing/components/LandingFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <LandingHero />
      <LandingFeatures />
      <LandingWhyChoose />
      <LandingTokenUtility />
      <LandingTokenomics />
      <LandingRoadmap />
      <LandingFooter />
    </div>
  );
}
