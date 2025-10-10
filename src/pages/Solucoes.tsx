import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Building2,
  Users,
  Network,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";

const Solucoes = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        page_title: "Soluções",
        page_location: window.location.href,
      });
    }
  }, []);

  const solutions = [
    {
      id: "clinicas",
      icon: Building2,
      title: "Clínicas Pequenas",
      subtitle: "2-10 médicos",
      description:
        "Solução completa para clínicas que querem crescer sem aumentar custos operacionais.",
      benefits: [
        "Redução de 70% no tempo administrativo",
        "ROI médio de 300% em 6 meses",
        "Onboarding em menos de 1 hora",
        "Suporte prioritário via WhatsApp",
      ],
      metrics: [
        { label: "Tempo economizado", value: "15h/semana" },
        { label: "Consultas extras", value: "+30/semana" },
        { label: "Aumento de receita", value: "R$ 18k/mês" },
      ],
      cta: "Solicitar proposta para clínica",
      price: "A partir de R$ 299/mês",
    },
    {
      id: "consultorios",
      icon: Users,
      title: "Consultórios Individuais",
      subtitle: "Médicos autônomos",
      description:
        "Ideal para profissionais que querem mais produtividade sem depender de equipe administrativa.",
      benefits: [
        "Configure e comece a usar em minutos",
        "Zero curva de aprendizado",
        "Atenda mais pacientes no mesmo horário",
        "Economia de até R$ 3.000/mês em custos",
      ],
      metrics: [
        { label: "Tempo recuperado", value: "2.5h/dia" },
        { label: "Pacientes extras", value: "+50/mês" },
        { label: "ROI mensal", value: "400%" },
      ],
      cta: "Começar agora",
      price: "R$ 99,90/mês",
    },
    {
      id: "redes",
      icon: Network,
      title: "Redes e Operadoras",
      subtitle: "10+ médicos",
      description:
        "Solução enterprise com controle centralizado, relatórios gerenciais e SLA garantido.",
      benefits: [
        "Dashboard executivo com KPIs",
        "Gestão centralizada de usuários",
        "API completa para integrações",
        "SLA de 99.9% uptime garantido",
        "Gerente de conta dedicado",
        "Treinamento presencial incluído",
      ],
      metrics: [
        { label: "Produtividade", value: "+45%" },
        { label: "Economia anual", value: "R$ 500k+" },
        { label: "Satisfação NPS", value: "92" },
      ],
      cta: "Falar com especialista",
      price: "Sob consulta",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-gradient-hero">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 lg:space-y-8">
            <Badge variant="secondary" className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
              Soluções
            </Badge>
            <h1 className="hero-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Uma solução perfeita para cada tipo de prática médica
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground">
              Do consultório individual às grandes redes hospitalares, temos o plano
              ideal para você
            </p>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="section-padding bg-background">
        <div className="container-custom space-y-24">
          {solutions.map((solution, index) => (
            <div
              key={solution.id}
              id={solution.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-secondary/10 rounded-full">
                    <solution.icon className="w-6 h-6 text-secondary" />
                    <span className="text-sm font-medium text-secondary">
                      {solution.subtitle}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-bold">
                    {solution.title}
                  </h2>

                  <p className="text-xl text-muted-foreground">
                    {solution.description}
                  </p>

                  <ul className="space-y-4">
                    {solution.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6">
                    <p className="text-sm text-muted-foreground mb-4">
                      A partir de:
                    </p>
                    <p className="text-3xl font-bold text-secondary mb-6">
                      {solution.price}
                    </p>
                    <Button
                      size="lg"
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow w-full sm:w-auto"
                      asChild
                    >
                      <Link to="/contato">
                        {solution.cta}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <Card className="card-premium">
                  <div className="p-8 space-y-8">
                    <h3 className="text-2xl font-semibold">
                      Resultados Esperados
                    </h3>
                    <div className="grid gap-6">
                      {solution.metrics.map((metric, i) => (
                        <div
                          key={i}
                          className="p-6 bg-gradient-subtle rounded-lg"
                        >
                          <p className="text-sm text-muted-foreground mb-2">
                            {metric.label}
                          </p>
                          <p className="text-3xl font-bold text-secondary">
                            {metric.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-border">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">
                            Produtividade
                          </p>
                        </div>
                        <div>
                          <Clock className="w-6 h-6 text-secondary mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">
                            Tempo Livre
                          </p>
                        </div>
                        <div>
                          <DollarSign className="w-6 h-6 text-success mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">
                            Faturamento
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-subtle">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl">Compare os planos</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              Todos os planos incluem o essencial. Escolha o que melhor se adapta
              ao seu volume
            </p>
          </div>

          <div className="max-w-5xl mx-auto overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">Recurso</th>
                  <th className="text-center py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">Individual</th>
                  <th className="text-center py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">Clínica</th>
                  <th className="text-center py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Transcrições ilimitadas",
                    individual: true,
                    clinica: true,
                    enterprise: true,
                  },
                  {
                    feature: "Geração de laudos",
                    individual: true,
                    clinica: true,
                    enterprise: true,
                  },
                  {
                    feature: "Integrações EMR",
                    individual: false,
                    clinica: true,
                    enterprise: true,
                  },
                  {
                    feature: "Dashboard gerencial",
                    individual: false,
                    clinica: true,
                    enterprise: true,
                  },
                  {
                    feature: "API completa",
                    individual: false,
                    clinica: false,
                    enterprise: true,
                  },
                  {
                    feature: "SLA garantido",
                    individual: false,
                    clinica: false,
                    enterprise: true,
                  },
                  {
                    feature: "Gerente dedicado",
                    individual: false,
                    clinica: false,
                    enterprise: true,
                  },
                 ].map((row, index) => (
                  <tr key={index} className="border-b border-border">
                    <td className="py-3 sm:py-4 px-3 sm:px-6 text-sm sm:text-base">{row.feature}</td>
                    <td className="text-center py-3 sm:py-4 px-3 sm:px-6">
                      {row.individual ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success mx-auto" />
                      ) : (
                        <span className="text-muted-foreground text-sm sm:text-base">—</span>
                      )}
                    </td>
                    <td className="text-center py-3 sm:py-4 px-3 sm:px-6">
                      {row.clinica ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success mx-auto" />
                      ) : (
                        <span className="text-muted-foreground text-sm sm:text-base">—</span>
                      )}
                    </td>
                    <td className="text-center py-3 sm:py-4 px-3 sm:px-6">
                      {row.enterprise ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success mx-auto" />
                      ) : (
                        <span className="text-muted-foreground text-sm sm:text-base">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-primary-foreground">
              Ainda não sabe qual plano é ideal para você?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Fale com nossa equipe de especialistas e descubra a solução perfeita
              para sua prática
            </p>
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow-intense text-lg"
              asChild
            >
              <Link to="/contato">
                Falar com Especialista
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solucoes;
