import { Header } from "@/components/Header";
import { LuxuryHero } from "@/components/LuxuryHero";
import Product3DCarousel from "@/components/Product3DCarousel";
import { BrandManifesto } from "@/components/BrandManifesto";
import { NooriDifference } from "@/components/NooriDifference";
import { SocialProof } from "@/components/SocialProof";
import { TrustIndicators } from "@/components/TrustIndicators";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <LuxuryHero />
        <Product3DCarousel />
        <BrandManifesto />
        <NooriDifference />
        <SocialProof />
        <TrustIndicators />
        <Newsletter />
      </main>
      <Footer />
      <EmailCaptureModal />
    </div>
  );
};

export default Index;
