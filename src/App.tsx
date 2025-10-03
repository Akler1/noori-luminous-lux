import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Capsule from "./pages/Capsule";
import Policies from "./pages/Policies";
import Earrings from "./pages/Earrings";
import Necklaces from "./pages/Necklaces";
import Bracelets from "./pages/Bracelets";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/capsule" element={<Capsule />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/collections/earrings" element={<Earrings />} />
          <Route path="/collections/necklaces" element={<Necklaces />} />
          <Route path="/collections/bracelets" element={<Bracelets />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
