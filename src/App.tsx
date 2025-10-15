import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Produto from "./pages/Produto";
import Solucoes from "./pages/Solucoes";
import Precos from "./pages/Precos";
import Recursos from "./pages/Recursos";
import Contato from "./pages/Contato";
import Billing from "./pages/Billing";
import Perfil from "./pages/Perfil";
import Receita from "./pages/Receita";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
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
          <Route path="/produto" element={<Produto />} />
          <Route path="/solucoes" element={<Solucoes />} />
          <Route path="/precos" element={<Precos />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/contato" element={<Contato />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/receita" element={<Receita />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
