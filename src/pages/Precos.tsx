import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, ArrowRight } from "lucide-react";

const Precos = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "pricing_view", {
        page_location: window.location.href,
      });
    }
  }, []);

  const plans = [
    {
      name: "Starter",
      price: "99,90",
      period: "/mês",
      description: "Para médicos individuais começarem",
      features: [
        "Até 10 consultas/dia",
        "Transcrição ilimitada",
        "Laudos automáticos",
        "Suporte por email",
        "Exportação PDF/DOCX",
      ],
      cta: "Começar Agora",
      highlight: false,
    },
    {
      name: "Pro",
      price: "299,00",
      period: "/mês",
      description: "Para clínicas e profissionais de alto volume",
      features: [
        "Consultas ilimitadas",
        "Tudo do Starter +",
        "Integrações EMR",
        "Dashboard gerencial",
        "Suporte prioritário",
        "API acesso",
      ],
      cta: "Testar 14 Dias Grátis",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Sob consulta",
      period: "",
      description: "Para redes e operadoras",
      features: [
        "Tudo do Pro +",
        "SLA 99.9% garantido",
        "Gerente dedicado",
        "Treinamento presencial",
        "Customizações",
        "Contrato personalizado",
      ],
      cta: "Falar com Vendas",
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-gradient-hero">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 lg:space-y-8">
            <h1 className="hero-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Preços transparentes que se pagam sozinhos</h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground">
              Investimento que retorna em consultas extras já no primeiro mês
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container-custom px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`card-premium ${
                  plan.highlight ? "border-2 border-secondary shadow-glow" : ""
                }`}
              >
                <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                  {plan.highlight && (
                    <Badge variant="secondary" className="mb-2 text-xs sm:text-sm">
                      Mais Popular
                    </Badge>
                  )}
                  <h3 className="text-xl sm:text-2xl font-bold">{plan.name}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{plan.description}</p>
                  <div className="py-3 sm:py-4">
                    <span className="text-3xl sm:text-4xl font-bold">
                      {plan.price.includes("R$") ? plan.price : `R$ ${plan.price}`}
                    </span>
                    <span className="text-sm sm:text-base text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full text-sm sm:text-base ${
                      plan.highlight
                        ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow"
                        : ""
                    }`}
                    variant={plan.highlight ? "default" : "outline"}
                    asChild
                  >
                    <Link to="/contato">
                      {plan.cta}
                      <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Precos;
