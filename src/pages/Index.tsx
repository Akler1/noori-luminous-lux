import { Header } from "@/components/Header";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd, NOORI_ORG, NOORI_WEBSITE, breadcrumbs } from "@/components/JsonLd";
import { HeroSplitEditorial } from "@/components/HeroSplitEditorial";
import { StickyStoryRefined } from "@/components/StickyStoryRefined";
import Product3DCarousel from "@/components/Product3DCarousel";
import ScrollImageSequence from "@/components/ScrollImageSequence";
import { SocialFeed } from "@/components/SocialFeed";
import { FinalCTAForm } from "@/components/FinalCTAForm";
import { Footer } from "@/components/Footer";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageMeta
        title="Noori | Luxury Lab-Grown Diamond Jewelry — Pendants, Earrings & Bracelets"
        description="Heirloom-quality lab-grown diamond jewelry by Noori. IGI-certified pendants, earrings, and bracelets in 14K and 18K gold. Ethically sourced. Modern luxury, finally within reach."
        path="/"
      />
      <JsonLd data={[NOORI_ORG, NOORI_WEBSITE, breadcrumbs([{ name: "Home", url: "/" }])]} />
      <Header />
      <main>
        <HeroSplitEditorial />
        <Product3DCarousel />
        <ScrollImageSequence
          basePath="/earing_frames_final"
          frameCount={46}
          ext="webp"
          scrollVh={250}
        />
        <StickyStoryRefined />
        <SocialFeed />
        <FinalCTAForm />
      </main>
      <Footer />
      <EmailCaptureModal />
    </div>
  );
};

export default Index;
