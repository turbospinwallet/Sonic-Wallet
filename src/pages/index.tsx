import React from 'react';
import LandingHero from '@/modules/landing/components/LandingHero';
import LandingFooter from '@/modules/landing/components/LandingFooter';
import LandingFeatures from '@/modules/landing/components/LandingFeatures';
import LandingWhyChoose from '@/modules/landing/components/LandingWhyChoose';
import LandingTokenUtility from '@/modules/landing/components/LandingTokenUtility';
import LandingRoadmap from '@/modules/landing/components/LandingRoadmap';
import LandingTokenomics from '@/modules/landing/components/LandingTokenomics';

export default function LandingPage() {
  return (
    <main className="min-h-screen ">
      <LandingHero />
      <div className="bg-secondary">
        <LandingFeatures />
        <LandingWhyChoose />
        <LandingTokenUtility />
        <LandingTokenomics />
        <LandingRoadmap />
        <LandingFooter />
      </div>
    </main>
  );
}
