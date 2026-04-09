// Pricing Page — full offer/pricing breakdown with CTA
import { OfferSection } from '../components/OfferSection';
import { FinalCTA } from '../components/FinalCTA';
import { SectionDivider } from '../components/SectionDivider';

export function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <OfferSection />

      <div className="bg-slate-50">
        <SectionDivider variant="branded" bgColor="#f8fafc" />
      </div>

      <FinalCTA />
    </div>
  );
}
