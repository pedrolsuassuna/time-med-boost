import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// Lazy-load secondary routes for code splitting
const Produto = lazy(() => import("./pages/Produto"));
const Solucoes = lazy(() => import("./pages/Solucoes"));
const Precos = lazy(() => import("./pages/Precos"));
const Recursos = lazy(() => import("./pages/Recursos"));
const Contato = lazy(() => import("./pages/Contato"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow animate-pulse">
      <span className="text-2xl font-bold text-primary-foreground">M</span>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produto" element={<Produto />} />
            <Route path="/solucoes" element={<Solucoes />} />
            <Route path="/precos" element={<Precos />} />
            <Route path="/recursos" element={<Recursos />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
