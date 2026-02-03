import { Header } from "@/components/Header";
import { ImageGridHero } from "@/components/ImageGridHero";
import Product3DCarousel from "@/components/Product3DCarousel";
import { BrandStory } from "@/components/BrandStory";
import { TrustIndicators } from "@/components/TrustIndicators";
import { SocialProof } from "@/components/SocialProof";
import { LabDiamondsSection } from "@/components/LabDiamondsSection";
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
        <ImageGridHero />
        <Product3DCarousel />
        <SocialProof />
        <TrustIndicators />
        <BrandStory />
        <LabDiamondsSection />
        <Newsletter />
      </main>
      <Footer />
      <EmailCaptureModal />
    </div>
  );
};

export default Index;
