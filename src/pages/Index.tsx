import { Header } from "@/components/Header";
import { CinematicHero } from "@/components/CinematicHero";
import { EditorialGallery } from "@/components/EditorialGallery";
import Product3DCarousel from "@/components/Product3DCarousel";
import { BrandPhilosophy } from "@/components/BrandPhilosophy";
import { SocialFeed } from "@/components/SocialFeed";
import { ValueBar } from "@/components/ValueBar";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { Footer } from "@/components/Footer";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <CinematicHero />
        <EditorialGallery />
        <Product3DCarousel />
        <BrandPhilosophy />
        <SocialFeed />
        <ValueBar />
        <NewsletterCTA />
      </main>
      <Footer />
      <EmailCaptureModal />
    </div>
  );
};

export default Index;
