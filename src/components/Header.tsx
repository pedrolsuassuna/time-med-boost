import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { createCheckoutSession, STRIPE_PLANS } from "@/lib/stripe";
import { toast } from "sonner";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const trackEvent = (eventName: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, {
        page_location: window.location.href,
      });
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      trackEvent("cta_header_demo");
      await createCheckoutSession(STRIPE_PLANS.pro.price_id);
    } catch (error) {
      toast.error("Erro ao iniciar o checkout. Tente novamente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent")}>
      <nav className="container-custom px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group" onClick={() => trackEvent("logo_click")}>
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-intense transition-all">
              <span className="text-lg sm:text-2xl font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MindMed
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className={cn("text-sm font-medium transition-colors hover:text-secondary", isActive("/") ? "text-secondary" : "text-foreground")}>Início</Link>
            <Link to="/produto" className={cn("text-sm font-medium transition-colors hover:text-secondary", isActive("/produto") ? "text-secondary" : "text-foreground")}>Produto</Link>
            <Link to="/solucoes" className={cn("text-sm font-medium transition-colors hover:text-secondary", isActive("/solucoes") ? "text-secondary" : "text-foreground")}>Soluções</Link>
            <Link to="/precos" className={cn("text-sm font-medium transition-colors hover:text-secondary", isActive("/precos") ? "text-secondary" : "text-foreground")}>Preços</Link>
            <Link to="/recursos" className={cn("text-sm font-medium transition-colors hover:text-secondary", isActive("/recursos") ? "text-secondary" : "text-foreground")}>Recursos</Link>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button variant="ghost" asChild className="hover:bg-secondary-muted">
              <a href="https://acesso.mindmed.online" target="_blank" rel="noopener noreferrer">Entrar</a>
            </Button>
            <Button variant="cta" className="rounded-full px-6 shadow-lg hover:shadow-xl min-h-[44px]" onClick={handleCheckout} disabled={loading}>
              {loading ? <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Processando...</> : "Testar MindMed PRO"}
            </Button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-md hover:bg-muted transition-colors" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 sm:py-4 border-t border-border animate-fade-in bg-background">
            <div className="flex flex-col gap-1 sm:gap-2">
              <Link to="/" className={cn("px-4 py-3 text-sm font-medium rounded-md transition-colors min-h-[44px] flex items-center", isActive("/") ? "bg-secondary-muted text-secondary" : "hover:bg-muted")} onClick={() => setIsMobileMenuOpen(false)}>Início</Link>
              <Link to="/produto" className={cn("px-4 py-3 text-sm font-medium rounded-md transition-colors min-h-[44px] flex items-center", isActive("/produto") ? "bg-secondary-muted text-secondary" : "hover:bg-muted")} onClick={() => setIsMobileMenuOpen(false)}>Produto</Link>
              <Link to="/solucoes" className={cn("px-4 py-3 text-sm font-medium rounded-md transition-colors min-h-[44px] flex items-center", isActive("/solucoes") ? "bg-secondary-muted text-secondary" : "hover:bg-muted")} onClick={() => setIsMobileMenuOpen(false)}>Soluções</Link>
              <Link to="/precos" className={cn("px-4 py-3 text-sm font-medium rounded-md transition-colors min-h-[44px] flex items-center", isActive("/precos") ? "bg-secondary-muted text-secondary" : "hover:bg-muted")} onClick={() => setIsMobileMenuOpen(false)}>Preços</Link>
              <Link to="/recursos" className={cn("px-4 py-3 text-sm font-medium rounded-md transition-colors min-h-[44px] flex items-center", isActive("/recursos") ? "bg-secondary-muted text-secondary" : "hover:bg-muted")} onClick={() => setIsMobileMenuOpen(false)}>Recursos</Link>
              <div className="flex flex-col gap-2 px-4 pt-3 sm:pt-4 border-t border-border">
                <Button variant="outline" asChild className="w-full text-sm min-h-[44px]">
                  <a href="https://acesso.mindmed.online" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>Entrar</a>
                </Button>
                <Button variant="cta" className="w-full text-sm rounded-full min-h-[44px]" onClick={() => { setIsMobileMenuOpen(false); handleCheckout(); }} disabled={loading}>
                  {loading ? <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Processando...</> : "Testar MindMed PRO"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
