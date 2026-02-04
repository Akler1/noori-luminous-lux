import { Header } from "@/components/Header";
import { HeroSplitEditorial } from "@/components/HeroSplitEditorial";
import { StickyStoryRefined } from "@/components/StickyStoryRefined";
import { Product3DStaggeredGrid } from "@/components/Product3DStaggeredGrid";
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
        <Product3DStaggeredGrid />
        <StickyStoryRefined />
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
