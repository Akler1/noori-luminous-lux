import { Header } from "@/components/Header";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import Product3DCarousel from "@/components/Product3DCarousel";
import { BrandStory } from "@/components/BrandStory";
import { TrustIndicators } from "@/components/TrustIndicators";
import { Impact } from "@/components/Impact";
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
        <Product3DCarousel />
        <TrustIndicators />
        <FeaturedProducts />
        <BrandStory />
        <Impact />
        <Newsletter />
      </main>
      <Footer />
      <EmailCaptureModal />
    </div>
  );
};

export default Index;
