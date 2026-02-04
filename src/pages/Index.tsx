import { Header } from "@/components/Header";
import { HeroSplitEditorial } from "@/components/HeroSplitEditorial";
import { StickyStoryRefined } from "@/components/StickyStoryRefined";
import Product3DCarousel from "@/components/Product3DCarousel";
import { SocialFeed } from "@/components/SocialFeed";
import { StoryDuoModules } from "@/components/StoryDuoModules";
import { FinalCTAForm } from "@/components/FinalCTAForm";
import { Footer } from "@/components/Footer";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSplitEditorial />
        <StickyStoryRefined />
        <Product3DCarousel />
        <SocialFeed />
        <StoryDuoModules />
        <FinalCTAForm />
      </main>
      <Footer />
      <EmailCaptureModal />
    </div>
  );
};

export default Index;
