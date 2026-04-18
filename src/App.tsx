import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Code-split every route — each page loads only when visited
const Index = lazy(() => import("./pages/Index"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const About = lazy(() => import("./pages/About"));
const Solitaires = lazy(() => import("./pages/Solitaires"));
const FAQ = lazy(() => import("./pages/FAQ"));
const WhyNoori = lazy(() => import("./pages/WhyNoori"));
const WhyLabDiamonds = lazy(() => import("./pages/WhyLabDiamonds"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Minimal splash shown only while a route chunk is downloading
const RouteFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product/:handle" element={<ProductDetail />} />
            <Route path="/policies" element={<About />} />
            <Route path="/collections/solitaires" element={<Solitaires />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/why-noori" element={<WhyNoori />} />
            <Route path="/why-lab-diamonds" element={<WhyLabDiamonds />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
