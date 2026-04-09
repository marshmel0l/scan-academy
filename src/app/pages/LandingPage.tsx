// Landing Page — Hero, About, Social Proof sections with dividers between each
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { SocialProofSection } from '../components/SocialProofSection';
import { SectionDivider } from '../components/SectionDivider';

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <SectionDivider variant="pulse"   bgColor="#ffffff" />
      <AboutSection />
      <SectionDivider variant="branded" bgColor="#ffffff" />
      <SocialProofSection />
    </>
  );
}
