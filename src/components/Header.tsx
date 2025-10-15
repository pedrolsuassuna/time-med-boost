import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
  };
  const isActive = (path: string) => location.pathname === path;
  const trackEvent = (eventName: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, {
        page_location: window.location.href
      });
    }
  };
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent")}>
      <nav className="container-custom px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group" onClick={() => trackEvent("logo_click")}>
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-intense transition-all">
              <span className="text-lg sm:text-2xl font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MindMed
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className={cn("text-sm font-medium transition-colors hover:text-secondary", isActive("/") ? "text-secondary" : "text-foreground")}>
              Início
            </Link>
            
            <Link to="/produto" className={cn("text-sm font-medium transition-colors hover:text-secondary", isActive("/produto") ? "text-secondary" : "text-foreground")}>
              Produto
            </Link>

            <Link to="/solucoes" className={cn("text-sm font-medium transition-colors hover:text-secondary", isActive("/solucoes") ? "text-secondary" : "text-foreground")}>
              Soluções
            </Link>

            <Link to="/precos" className={cn("text-sm font-medium transition-colors hover:text-secondary", isActive("/precos") ? "text-secondary" : "text-foreground")}>
              Preços
            </Link>

            <Link to="/recursos" className={cn("text-sm font-medium transition-colors hover:text-secondary", isActive("/recursos") ? "text-secondary" : "text-foreground")}>
              Recursos
            </Link>

            <Link to="/perfil" className={cn("text-sm font-medium transition-colors hover:text-secondary", isActive("/perfil") ? "text-secondary" : "text-foreground")}>
              Perfil
            </Link>

            <Link to="/receita" className={cn("text-sm font-medium transition-colors hover:text-secondary", isActive("/receita") ? "text-secondary" : "text-foreground")}>
              Receitas
            </Link>

            <Link to="/dashboard" className={cn("text-sm font-medium transition-colors hover:text-secondary", isActive("/dashboard") ? "text-secondary" : "text-foreground")}>
              Dashboard
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <>
                  <Button variant="ghost" asChild className="hover:bg-secondary-muted">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
              <>
                <Button variant="ghost" asChild className="hover:bg-secondary-muted">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow hover:shadow-glow-intense transition-all" onClick={() => trackEvent("cta_header_signup")}>
                  <Link to="/signup">Criar Conta</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-1.5 sm:p-2 rounded-md hover:bg-muted transition-colors" aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="lg:hidden py-3 sm:py-4 border-t border-border animate-fade-in bg-background">
            <div className="flex flex-col gap-2 sm:gap-4">
              <Link to="/" className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", isActive("/") ? "bg-secondary-muted text-secondary" : "hover:bg-muted")} onClick={() => setIsMobileMenuOpen(false)}>
                Início
              </Link>
              <Link to="/produto" className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", isActive("/produto") ? "bg-secondary-muted text-secondary" : "hover:bg-muted")} onClick={() => setIsMobileMenuOpen(false)}>
                Produto
              </Link>
              <Link to="/solucoes" className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", isActive("/solucoes") ? "bg-secondary-muted text-secondary" : "hover:bg-muted")} onClick={() => setIsMobileMenuOpen(false)}>
                Soluções
              </Link>
              <Link to="/precos" className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", isActive("/precos") ? "bg-secondary-muted text-secondary" : "hover:bg-muted")} onClick={() => setIsMobileMenuOpen(false)}>
                Preços
              </Link>
              <Link to="/recursos" className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", isActive("/recursos") ? "bg-secondary-muted text-secondary" : "hover:bg-muted")} onClick={() => setIsMobileMenuOpen(false)}>
                Recursos
              </Link>
              <Link to="/perfil" className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", isActive("/perfil") ? "bg-secondary-muted text-secondary" : "hover:bg-muted")} onClick={() => setIsMobileMenuOpen(false)}>
                Perfil
              </Link>
              <Link to="/receita" className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", isActive("/receita") ? "bg-secondary-muted text-secondary" : "hover:bg-muted")} onClick={() => setIsMobileMenuOpen(false)}>
                Receitas
              </Link>
              <Link to="/dashboard" className={cn("px-4 py-2 text-sm font-medium rounded-md transition-colors", isActive("/dashboard") ? "bg-secondary-muted text-secondary" : "hover:bg-muted")} onClick={() => setIsMobileMenuOpen(false)}>
                Dashboard
              </Link>
              <div className="flex flex-col gap-2 px-4 pt-3 sm:pt-4 border-t border-border">
                {user ? (
                  <>
                    <Button variant="outline" asChild className="w-full text-sm">
                      <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        Dashboard
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-sm hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild className="w-full text-sm">
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        Entrar
                      </Link>
                    </Button>
                    <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm" onClick={() => {
                      setIsMobileMenuOpen(false);
                      trackEvent("cta_mobile_signup");
                    }}>
                      <Link to="/signup">Criar Conta</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>}
      </nav>
    </header>;
};
export default Header;