import { Header } from "@/components/Header";
import Product3DCarousel from "@/components/Product3DCarousel";
import { TrustIndicators } from "@/components/TrustIndicators";
import { CollectionShowcase } from "@/components/CollectionShowcase";
import { EditorialGallery } from "@/components/EditorialGallery";
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
        <CollectionShowcase />
        <EditorialGallery />
        <Newsletter />
      </main>
      <Footer />
      <EmailCaptureModal />
    </div>
  );
};

export default Index;
