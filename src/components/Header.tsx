import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => trackEvent("logo_click")}
          >
            <div className="relative w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-intense transition-all">
              <span className="text-2xl font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MindMed
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-secondary",
                isActive("/") ? "text-secondary" : "text-foreground"
              )}
            >
              Início
            </Link>
            
            <Link
              to="/produto"
              className={cn(
                "text-sm font-medium transition-colors hover:text-secondary",
                isActive("/produto") ? "text-secondary" : "text-foreground"
              )}
            >
              Produto
            </Link>

            <Link
              to="/solucoes"
              className={cn(
                "text-sm font-medium transition-colors hover:text-secondary",
                isActive("/solucoes") ? "text-secondary" : "text-foreground"
              )}
            >
              Soluções
            </Link>

            <Link
              to="/precos"
              className={cn(
                "text-sm font-medium transition-colors hover:text-secondary",
                isActive("/precos") ? "text-secondary" : "text-foreground"
              )}
            >
              Preços
            </Link>

            <Link
              to="/recursos"
              className={cn(
                "text-sm font-medium transition-colors hover:text-secondary",
                isActive("/recursos") ? "text-secondary" : "text-foreground"
              )}
            >
              Recursos
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              asChild
              className="hover:bg-secondary-muted"
            >
              <Link to="/contato">Falar com Vendas</Link>
            </Button>
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow hover:shadow-glow-intense transition-all"
              onClick={() => trackEvent("cta_header_demo")}
            >
              <Link to="/contato">Solicitar Demo</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in bg-background">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive("/")
                    ? "bg-secondary-muted text-secondary"
                    : "hover:bg-muted"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Início
              </Link>
              <Link
                to="/produto"
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive("/produto")
                    ? "bg-secondary-muted text-secondary"
                    : "hover:bg-muted"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Produto
              </Link>
              <Link
                to="/solucoes"
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive("/solucoes")
                    ? "bg-secondary-muted text-secondary"
                    : "hover:bg-muted"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Soluções
              </Link>
              <Link
                to="/precos"
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive("/precos")
                    ? "bg-secondary-muted text-secondary"
                    : "hover:bg-muted"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Preços
              </Link>
              <Link
                to="/recursos"
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive("/recursos")
                    ? "bg-secondary-muted text-secondary"
                    : "hover:bg-muted"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Recursos
              </Link>
              <div className="flex flex-col gap-2 px-4 pt-4 border-t border-border">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/contato" onClick={() => setIsMobileMenuOpen(false)}>
                    Falar com Vendas
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    trackEvent("cta_mobile_demo");
                  }}
                >
                  <Link to="/contato">Solicitar Demo</Link>
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
