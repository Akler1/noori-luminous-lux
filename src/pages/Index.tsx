import { Suspense, lazy } from "react";
import { Header } from "@/components/Header";
import { PageMeta } from "@/components/PageMeta";
import { JsonLd, NOORI_ORG, NOORI_WEBSITE, breadcrumbs } from "@/components/JsonLd";
import { HeroSplitEditorial } from "@/components/HeroSplitEditorial";
import { Footer } from "@/components/Footer";

// Above-the-fold components stay eager. Everything below the fold is split
// into its own chunk and rendered under Suspense so the hero paints fast.
const Product3DCarousel = lazy(() => import("@/components/Product3DCarousel"));
const ScrollImageSequence = lazy(() => import("@/components/ScrollImageSequence"));
const StickyStoryRefined = lazy(() =>
  import("@/components/StickyStoryRefined").then((m) => ({ default: m.StickyStoryRefined }))
);
const SocialFeed = lazy(() =>
  import("@/components/SocialFeed").then((m) => ({ default: m.SocialFeed }))
);
const FinalCTAForm = lazy(() =>
  import("@/components/FinalCTAForm").then((m) => ({ default: m.FinalCTAForm }))
);
const EmailCaptureModal = lazy(() =>
  import("@/components/EmailCaptureModal").then((m) => ({ default: m.EmailCaptureModal }))
);

// Placeholder with enough height to avoid layout shift while chunks stream in
const SectionSkeleton = ({ h = "60vh" }: { h?: string }) => (
  <div style={{ height: h }} aria-hidden="true" />
);

// Synchronous mobile detection — runs at module eval, before first render,
// so mobile users never load the ScrollImageSequence chunk or its 46 frames.
// Doesn't react to live resize, but a homepage section flipping mid-session
// is fine to skip.
const isMobileViewport =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;

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
        <Suspense fallback={<SectionSkeleton h="80vh" />}>
          <Product3DCarousel />
        </Suspense>
        {!isMobileViewport && (
          <Suspense fallback={<SectionSkeleton h="100vh" />}>
            <ScrollImageSequence
              basePath="/earing_frames_final"
              frameCount={45}
              ext="webp"
              scrollVh={250}
            />
          </Suspense>
        )}
        <Suspense fallback={<SectionSkeleton h="60vh" />}>
          <StickyStoryRefined />
        </Suspense>
        <Suspense fallback={<SectionSkeleton h="40vh" />}>
          <SocialFeed />
        </Suspense>
        <Suspense fallback={<SectionSkeleton h="40vh" />}>
          <FinalCTAForm />
        </Suspense>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <EmailCaptureModal />
      </Suspense>
    </div>
  );
};

export default Index;
