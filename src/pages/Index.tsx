import { Header } from "@/components/Header";
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
