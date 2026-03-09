import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, ArrowRight, X, Check, Sparkles, Loader2 } from "lucide-react";
import { createCheckoutSession, STRIPE_PLANS } from "@/lib/stripe";
import { toast } from "sonner";

const Precos = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "pricing_view", {
        page_location: window.location.href,
      });
    }
  }, []);

  const handleCheckout = async (plan: "starter" | "pro") => {
    setLoadingPlan(plan);
    try {
      await createCheckoutSession(STRIPE_PLANS[plan].price_id);
    } catch (error) {
      toast.error("Erro ao iniciar o checkout. Tente novamente.");
      console.error(error);
    } finally {
      setLoadingPlan(null);
    }
  };

  const starterFeatures = [
    "Gravação de áudio da consulta",
    "Transcrição automática",
    "Laudo completo básico",
    "CID + diagnóstico + conduta",
    "Embasamento teórico (30%)",
    "Exportação em PDF",
    "1 imagem por consulta",
    "Histórico básico do paciente",
    "7 dias grátis",
  ];

  const proFeatures = [
    "Tudo do Starter, e MAIS:",
    "Receituário completo",
    "Assinatura digital",
    "Logo do consultório no laudo",
    "Embasamento teórico completo",
    "Prescrição automática",
    "Modelos salvos de prescrição",
    "Upload ilimitado de imagens",
    "Interpretação de raio-x e exames",
    "Comparação de imagens antigas",
    "Relatório evolutivo automático",
    "Histórico completo do paciente",
    "Timeline visual do paciente",
    "Funcionalidades ilimitadas",
    "Suporte prioritário",
  ];

  const enterpriseFeatures = [
    "Tudo do PRO, e MAIS:",
    "SLA 99.9% garantido",
    "Gerente de conta dedicado",
    "Treinamento presencial",
    "Customizações sob demanda",
    "Contrato personalizado",
    "Integração com sistemas EMR",
    "API dedicada",
    "Suporte 24/7",
  ];

  const comparisonTable = [
    { feature: "Laudos automáticos", starter: true, pro: true },
    { feature: "Transcrição de áudio", starter: true, pro: true },
    { feature: "CID + diagnóstico + conduta", starter: true, pro: true },
    { feature: "Exportação PDF", starter: true, pro: true },
    { feature: "Embasamento teórico completo", starter: false, pro: true },
    { feature: "Receituário completo", starter: false, pro: true },
    { feature: "Prescrição automática", starter: false, pro: true },
    { feature: "Upload ilimitado de imagens", starter: false, pro: true },
    { feature: "Comparação de exames", starter: false, pro: true },
    { feature: "Relatório evolutivo", starter: false, pro: true },
    { feature: "Assinatura digital", starter: false, pro: true },
    { feature: "Modelo de receituário", starter: false, pro: true },
    { feature: "Logo personalizada", starter: false, pro: true },
    { feature: "Histórico completo", starter: false, pro: true },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 bg-gradient-hero">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 lg:space-y-8">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              Planos e Preços
            </Badge>
            <h1 className="hero-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Escolha o plano ideal para sua prática médica
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground">
              Comece com 7 dias grátis. Cancele quando quiser.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container-custom px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="card-premium">
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <Badge className="bg-muted text-foreground mb-3">STARTER</Badge>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Plano Starter</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Ideal para médicos que querem começar
                  </p>
                </div>
                <div className="py-3 sm:py-4">
                  <span className="text-3xl sm:text-4xl font-bold">R$ 99,90</span>
                  <span className="text-sm sm:text-base text-muted-foreground">/mês</span>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {starterFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-cta mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full text-sm sm:text-base" variant="outline" asChild>
                  <a
                    href="https://pay.cakto.com.br/3bsu2vi_607441"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Começar Agora
                    <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </Button>
              </div>
            </Card>

            {/* Pro Plan */}
            <Card className="card-premium border-2 border-secondary shadow-glow relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-secondary text-secondary-foreground px-4 py-1">
                  MAIS POPULAR
                </Badge>
              </div>
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <Badge className="bg-primary text-primary-foreground mb-3">PRO</Badge>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Plano PRO</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Para médicos que querem máxima performance
                  </p>
                </div>
                <div className="py-3 sm:py-4">
                  <span className="text-3xl sm:text-4xl font-bold">R$ 299</span>
                  <span className="text-sm sm:text-base text-muted-foreground">/mês</span>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {proFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 ${
                          i === 0 ? "text-secondary" : "text-cta"
                        }`}
                      />
                      <span
                        className={`text-xs sm:text-sm ${
                          i === 0 ? "font-semibold text-secondary" : ""
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full text-sm sm:text-base bg-cta hover:bg-cta-hover text-cta-foreground shadow-lg"
                  variant="cta"
                  asChild
                >
                  <a
                    href="https://pay.cakto.com.br/u95r4cv_607505"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Começar PRO Agora
                    <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </Button>
              </div>
            </Card>

            {/* Enterprise Plan */}
            <Card className="card-premium">
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <Badge className="bg-muted text-foreground mb-3">ENTERPRISE</Badge>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Para redes, clínicas e operadoras
                  </p>
                </div>
                <div className="py-3 sm:py-4">
                  <span className="text-3xl sm:text-4xl font-bold">Sob consulta</span>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {enterpriseFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 ${
                          i === 0 ? "text-secondary" : "text-cta"
                        }`}
                      />
                      <span
                        className={`text-xs sm:text-sm ${
                          i === 0 ? "font-semibold text-secondary" : ""
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full text-sm sm:text-base" variant="outline" asChild>
                  <Link to="/contato">
                    Falar com Vendas
                    <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-subtle">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">
              Comparativo
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Starter vs PRO — Veja a diferença
            </h2>
          </div>

          <Card className="card-premium max-w-4xl mx-auto overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold">Funcionalidade</th>
                      <th className="text-center py-3 px-4 font-semibold">Starter</th>
                      <th className="text-center py-3 px-4 font-semibold text-secondary">PRO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTable.map((row, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-3 px-4 text-sm">{row.feature}</td>
                        <td className="py-3 px-4 text-center">
                          {row.starter ? (
                            <Check className="w-5 h-5 text-cta mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {row.pro ? (
                            <Check className="w-5 h-5 text-secondary mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground/50 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Sparkles className="w-12 h-12 text-secondary mx-auto" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Comece com 7 dias grátis
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Teste a MindMed PRO sem compromisso. Cancele quando quiser.
            </p>
            <Button
              size="lg"
              className="bg-cta hover:bg-cta-hover text-cta-foreground shadow-lg text-lg px-8"
              asChild
            >
              <a
                href="https://pay.cakto.com.br/u95r4cv_607505"
                target="_blank"
                rel="noopener noreferrer"
              >
                Criar Minha Conta Agora
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Precos;
