import { useEffect, useState, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Clock,
  TrendingUp,
  DollarSign,
  Shield,
  Mic,
  FileText,
  Zap,
  CheckCircle2,
  ArrowRight,
  Star,
  Play,
  X,
  Check,
  Award,
  Users,
  Gift,
  ShieldCheck,
  Sparkles,
  Brain,
  Camera,
  Pill,
  UserCircle,
  LayoutDashboard,
  LineChart,
  Layers,
  Globe,
  Loader2,
  Monitor,
  Smartphone,
  HeartPulse,
  Target,
} from "lucide-react";
import { createCheckoutSession, STRIPE_PLANS } from "@/lib/stripe";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

// Lazy load below-the-fold heavy component
const FinancialCalculator = lazy(() => import("@/components/FinancialCalculator"));

const CalculatorSkeleton = () => (
  <div className="w-full max-w-5xl mx-auto">
    <Skeleton className="w-full h-[400px] rounded-lg" />
  </div>
);

const Index = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [trialDialogOpen, setTrialDialogOpen] = useState(false);
  const [trialEmail, setTrialEmail] = useState("");
  const [trialLoading, setTrialLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        page_title: "Home",
        page_location: window.location.href,
      });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, {
        page_location: window.location.href,
        ...params,
      });
    }
  };

  const handleCheckout = async (plan: "starter" | "pro") => {
    setLoadingPlan(plan);
    try {
      trackEvent("cta_click", { plan });
      await createCheckoutSession(STRIPE_PLANS[plan].price_id);
    } catch (error) {
      toast.error("Erro ao iniciar o checkout. Tente novamente.");
      console.error(error);
    } finally {
      setLoadingPlan(null);
    }
  };

  const featureCategories = [
    {
      title: "Assistente de Consulta (IA)",
      icon: Brain,
      color: "from-primary to-secondary",
      features: [
        "Grava o áudio da consulta",
        "Transcreve automaticamente",
        "Identifica achados clínicos",
        "Gera laudo completo instantâneo",
        "Sugere diagnóstico",
        "Sugere CID",
        "Cria conduta recomendada",
        "Adiciona embasamento teórico",
        "Exporta em PDF profissional",
      ],
    },
    {
      title: "Laudos Inteligentes",
      icon: FileText,
      color: "from-secondary to-primary",
      features: [
        "Layout moderno e profissional",
        "Revisão automática",
        "Histórico por paciente",
        "Laudos ilimitados",
        "Edição avançada",
        "Relatório evolutivo (PRO)",
      ],
    },
    {
      title: "Análise de Imagens",
      icon: Camera,
      color: "from-cta to-secondary",
      badge: "NOVIDADE",
      badgeColor: "bg-cta",
      features: [
        "Upload de raio-x, fotos clínicas e exames",
        "Interpretação visual automática",
        "Comparação com imagens anteriores",
        "Inclusão de achados no laudo",
        "Linha do tempo clínica",
        "Evolução do paciente baseada em imagem",
      ],
      note: "Disponível exclusivamente no Plano PRO",
    },
    {
      title: "Receituário Inteligente",
      icon: Pill,
      color: "from-primary to-cta",
      badge: "EXCLUSIVO PRO",
      badgeColor: "bg-primary",
      features: [
        "Receituário completo",
        "Assinatura digital",
        "Logo do consultório",
        "Modelos salvos",
        "Prescrição automática baseada no laudo",
        "Histórico de prescrições",
      ],
    },
    {
      title: "Perfil Profissional",
      icon: UserCircle,
      color: "from-secondary to-cta",
      features: [
        "CRM verificado",
        "Especialidade",
        "Foto / Logo",
        "Assinatura digital",
        "Dados fixos de prescrição",
      ],
    },
    {
      title: "Dashboard Inteligente",
      icon: LayoutDashboard,
      color: "from-cta to-primary",
      features: [
        "Visão geral de pacientes",
        "Gestão de laudos",
        "Galeria de imagens",
        "Acompanhamento de evolução",
        "Histórico completo",
        "Exportações rápidas",
      ],
    },
  ];

  const differentiators = [
    { icon: Layers, text: "Interpretação multimodal (áudio + texto + imagem)" },
    { icon: Brain, text: "Embasamento teórico clínico-científico" },
    { icon: Camera, text: "Análise de imagens integrada ao laudo" },
    { icon: LineChart, text: "Relatório evolutivo do paciente" },
    { icon: Zap, text: "Laudos profissionais em segundos" },
    { icon: Globe, text: "Funciona no consultório, telemedicina e visitas" },
    { icon: Clock, text: "Desbloqueia tempo para atender mais" },
    { icon: Shield, text: "Reduz chances de erro" },
    { icon: TrendingUp, text: "Melhora produtividade e faturamento" },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Grave o áudio da consulta",
      description: "Use seu smartphone, tablet ou microfone. Funciona com qualquer dispositivo.",
      icon: Mic,
    },
    {
      step: "2",
      title: "A IA transcreve e interpreta",
      description: "Nossa IA médica reconhece termos técnicos e analisa imagens clínicas.",
      icon: Brain,
    },
    {
      step: "3",
      title: "Laudo completo gerado",
      description: "CID, diagnóstico, achados, conduta e embasamento teórico prontos.",
      icon: FileText,
    },
    {
      step: "4",
      title: "Paciente sai com tudo pronto",
      description: "Exporte PDF, imprima ou integre ao seu sistema EMR.",
      icon: CheckCircle2,
    },
  ];

  const testimonials = [
    {
      name: "Dr. Fernando",
      specialty: "Clínico Geral",
      text: "Reduzi mais de 1h30 por dia de papelada. Agora consigo dar mais atenção aos meus pacientes.",
      metric: "-1h30/dia",
      rating: 5,
    },
    {
      name: "Dra. Mariana",
      specialty: "Cardiologia",
      text: "Consigo atender de 6 a 9 pacientes a mais por dia. Meu faturamento aumentou significativamente.",
      metric: "+9 pacientes/dia",
      rating: 5,
    },
    {
      name: "Dr. Ricardo",
      specialty: "Ortopedia",
      text: "A análise de imagens mudou tudo. Agora comparo exames anteriores automaticamente.",
      metric: "Rotina transformada",
      rating: 5,
    },
  ];

  const beforeAfter = {
    before: [
      "Horas escrevendo laudos manualmente",
      "Cansaço e burocracia excessiva",
      "Consultório lento e improdutivo",
      "Imagens sem análise integrada",
      "Faturamento estagnado",
    ],
    after: [
      "Laudos automáticos em segundos",
      "Foco total no paciente",
      "Consultório ágil e eficiente",
      "Imagens analisadas e comparadas",
      "Faturamento em crescimento",
    ],
  };

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

  const faqs = [
    {
      question: "A MindMed funciona para qual especialidade?",
      answer: "A MindMed funciona para mais de 40 especialidades médicas, incluindo Cardiologia, Ortopedia, Pediatria, Dermatologia, Neurologia, Radiologia, e muitas outras. Nossa IA é treinada especificamente para terminologia médica brasileira.",
    },
    {
      question: "Posso cancelar quando quiser?",
      answer: "Sim! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais. Basta acessar sua conta e cancelar com um clique.",
    },
    {
      question: "Como funciona o receituário automático?",
      answer: "Após a transcrição da consulta, nossa IA identifica automaticamente as prescrições mencionadas e gera um receituário formatado profissionalmente, com assinatura digital e logo do consultório.",
    },
    {
      question: "A IA acerta a transcrição?",
      answer: "Nossa IA possui 99% de precisão em transcrições médicas, sendo treinada especificamente para reconhecer termos técnicos, medicamentos, dosagens e jargões de cada especialidade.",
    },
    {
      question: "Posso usar no consultório e no celular?",
      answer: "Sim! A MindMed funciona em qualquer dispositivo com navegador: computador, tablet ou smartphone. Você pode gravar consultas de onde estiver.",
    },
    {
      question: "Como funciona a análise de imagens?",
      answer: "No Plano PRO, você pode fazer upload de raio-x, fotos clínicas e exames. Nossa IA interpreta visualmente, compara com exames anteriores e inclui os achados automaticamente no laudo.",
    },
    {
      question: "A MindMed está dentro das normas médicas?",
      answer: "Absolutamente. A MindMed está 100% em conformidade com a LGPD, utiliza criptografia AES-256 para proteção de dados e segue todas as diretrizes de segurança da informação em saúde.",
    },
  ];

  const stats = [
    { value: "+1.500", label: "Laudos Gerados" },
    { value: "99%", label: "Precisão de Transcrição" },
    { value: "500+", label: "Médicos Ativos" },
    { value: "4.9/5", label: "Avaliação Média" },
  ];

  const CTAButton = ({ className = "", size = "lg" as const, text = "Criar Minha Conta Agora" }) => {
    return (
      <button 
        onClick={() => handleCheckout("pro")}
        disabled={loadingPlan === "pro"}
        className={`inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-hover text-cta-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base sm:text-lg rounded-full px-8 min-h-[44px] h-11 ${size === "lg" ? "h-12 px-10" : ""} disabled:opacity-50 ${className}`}
      >
        {loadingPlan === "pro" ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Processando...</>
        ) : (
          <>{text} <ArrowRight className="w-5 h-5" /></>
        )}
      </button>
    );
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent" />
        <div className="container-custom px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-6 lg:space-y-8 animate-fade-in">
            <Badge variant="secondary" className="text-sm px-4 py-2 mb-4">
              IA Médica #1 do Brasil
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground">
              A IA médica que <span className="text-secondary font-extrabold">grava sua consulta</span>, interpreta imagens e gera{" "}
              <span className="text-cta font-extrabold">laudos completos</span> em segundos.
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-foreground/90 max-w-3xl mx-auto">
              Economize até <strong className="text-cta font-bold">2 horas por dia</strong> com um assistente clínico 100% automático.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <CTAButton />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                <span>7 dias grátis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                <span>Cancele quando quiser</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cta flex-shrink-0" />
                <span>100% LGPD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 sm:py-12 bg-primary text-primary-foreground">
        <div className="container-custom px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-1">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Description */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Plataforma Completa
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
              A MindMed é uma IA médica completa
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Grava sua consulta, interpreta as informações, <strong className="text-foreground">analisa imagens</strong>, compara com laudos anteriores e entrega um documento profissional pronto para o prontuário. Totalmente segura, rápida e com <strong className="text-foreground">embasamento teórico clínico-científico</strong>.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12">
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-muted/50">
                <Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Computador</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-muted/50">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Celular</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-muted/50">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-cta flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">100% Seguro</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-muted/50">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-secondary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Ultra Rápido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Sections */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-subtle">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-4">
              Funcionalidades
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Tudo que você precisa em uma única plataforma
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {featureCategories.map((category, index) => (
              <Card
                key={index}
                className="card-premium overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`} />
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                      <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold truncate">{category.title}</h3>
                      {category.badge && (
                        <Badge className={`${category.badgeColor} text-primary-foreground text-xs mt-1`}>
                          {category.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {category.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-cta mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {category.note && (
                    <p className="text-xs text-secondary font-medium mt-4 pt-4 border-t border-border">
                      {category.note}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge className="bg-secondary text-secondary-foreground mb-4">
              Diferenciais
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Por que a MindMed é a IA médica mais avançada do Brasil?
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                </div>
                <p className="text-sm sm:text-base font-medium pt-1.5 sm:pt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-4">
              Como Funciona
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              4 passos simples para recuperar seu tempo
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {howItWorks.map((step, index) => (
              <div
                key={index}
                className="relative"
              >
                <Card className="card-premium text-center h-full">
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="relative inline-block">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                        <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-cta flex items-center justify-center text-xs sm:text-sm font-bold text-cta-foreground">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-lg font-semibold">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 bg-gradient-to-r from-secondary/50 to-transparent transform translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video/Demo Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-subtle">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <Badge variant="secondary" className="mb-4">
              Demonstração
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Veja a MindMed em ação
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Assista como médicos estão transformando suas rotinas
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-primary-light shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-primary-foreground space-y-3 sm:space-y-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-cta/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-cta-foreground ml-1" />
                  </div>
                  <p className="text-base sm:text-lg font-medium">Clique para assistir</p>
                  <p className="text-xs sm:text-sm text-primary-foreground/70 px-4">
                    Médico gravando → IA analisando → Laudo + Receituário prontos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-4">
              Depoimentos
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Médicos que já transformaram sua rotina
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="card-premium"
              >
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground italic">"{testimonial.text}"</p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.specialty}</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {testimonial.metric}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Authority Badges */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-6 mt-8 sm:mt-12">
            <div className="flex items-center justify-center gap-3 bg-card px-4 sm:px-6 py-3 rounded-full shadow-md">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-secondary flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base">+1.500 laudos gerados</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-card px-4 sm:px-6 py-3 rounded-full shadow-md">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-secondary flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base">99% de precisão com IA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-subtle">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-4">
              Transformação
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Antes e depois da MindMed
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <Card className="border-destructive/30 bg-destructive/5">
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-destructive" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-destructive">ANTES</h3>
                </div>
                <ul className="space-y-3 sm:space-y-4">
                  {beforeAfter.before.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <X className="w-4 h-4 sm:w-5 sm:h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* After */}
            <Card className="border-cta/30 bg-cta/5 shadow-glow">
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cta/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 sm:w-6 sm:h-6 text-cta" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-cta">COM MINDMED</h3>
                </div>
                <ul className="space-y-3 sm:space-y-4">
                  {beforeAfter.after.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-cta mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Plans Comparison Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-4">
              Planos
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Escolha o plano ideal para você
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto mb-8 sm:mb-12">
            {/* Starter Plan */}
            <Card className="card-premium">
              <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                <div>
                  <Badge className="bg-muted text-foreground mb-3">STARTER</Badge>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Plano Starter</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Ideal para médicos que querem começar</p>
                </div>
                <div className="py-3 sm:py-4">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">R$ 99,90</span>
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
                <Button variant="outline" className="w-full min-h-[44px]" onClick={() => handleCheckout("starter")} disabled={loadingPlan === "starter"}>
                  {loadingPlan === "starter" ? (
                    <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Processando...</>
                  ) : (
                    <>Começar Agora <ArrowRight className="ml-2 w-4 h-4" /></>
                  )}
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
              <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
                <div>
                  <Badge className="bg-primary text-primary-foreground mb-3">PRO</Badge>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Plano PRO</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">Para médicos que querem máxima performance</p>
                </div>
                <div className="py-3 sm:py-4">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold">R$ 299</span>
                  <span className="text-sm sm:text-base text-muted-foreground">/mês</span>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {proFeatures.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 flex-shrink-0 ${i === 0 ? 'text-secondary' : 'text-cta'}`} />
                      <span className={`text-xs sm:text-sm ${i === 0 ? 'font-semibold text-secondary' : ''}`}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="cta" className="w-full min-h-[44px]" onClick={() => handleCheckout("pro")} disabled={loadingPlan === "pro"}>
                  {loadingPlan === "pro" ? (
                    <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Processando...</>
                  ) : (
                    <>Começar PRO Agora <ArrowRight className="ml-2 w-4 h-4" /></>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Comparison Table */}
          <Card className="card-premium max-w-4xl mx-auto overflow-hidden">
            <div className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-center">Comparativo Completo</h3>
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2.5 sm:py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base">Funcionalidade</th>
                      <th className="text-center py-2.5 sm:py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base">Starter</th>
                      <th className="text-center py-2.5 sm:py-3 px-2 sm:px-4 font-semibold text-sm sm:text-base text-secondary">PRO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonTable.map((row, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">{row.feature}</td>
                        <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-center">
                          {row.starter ? (
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-cta mx-auto" />
                          ) : (
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/50 mx-auto" />
                          )}
                        </td>
                        <td className="py-2.5 sm:py-3 px-2 sm:px-4 text-center">
                          {row.pro ? (
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-secondary mx-auto" />
                          ) : (
                            <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/50 mx-auto" />
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

      {/* Financial Calculator - Lazy Loaded */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-subtle">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <Badge variant="secondary" className="mb-4">
              Calculadora
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Descubra quanto você pode ganhar a mais
            </h2>
          </div>
          <Suspense fallback={<CalculatorSkeleton />}>
            <FinancialCalculator />
          </Suspense>
        </div>
      </section>

      {/* Free Trial CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-secondary/20 via-cta/20 to-secondary/20">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Teste a MindMed por 7 dias — zero risco.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Comece agora e veja a diferença na sua rotina médica
            </p>
            <CTAButton className="text-lg sm:text-xl px-8 sm:px-12" />
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-10 sm:py-12 lg:py-16 bg-cta/10">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto text-center sm:text-left flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cta/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-cta" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">
                Você pode cancelar quando quiser. Sem riscos.
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Não gostou? Cancele a qualquer momento sem multas ou burocracias. Sua satisfação é
                nossa prioridade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-4">
              Dúvidas Frequentes
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-4 sm:px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-secondary text-sm sm:text-base py-3 sm:py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-base text-muted-foreground pb-3 sm:pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />
        <div className="container-custom px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              A MindMed não é apenas uma ferramenta.
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              É sua nova assistente clínica — sempre presente, precisa e totalmente automática.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 py-4 sm:py-8">
              <div className="text-center p-3 sm:p-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-secondary mx-auto mb-2" />
                <p className="font-medium text-xs sm:text-base">Atenda mais pacientes</p>
              </div>
              <div className="text-center p-3 sm:p-4">
                <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-secondary mx-auto mb-2" />
                <p className="font-medium text-xs sm:text-base">Ganhe mais dinheiro</p>
              </div>
              <div className="text-center p-3 sm:p-4">
                <HeartPulse className="w-6 h-6 sm:w-8 sm:h-8 text-secondary mx-auto mb-2" />
                <p className="font-medium text-xs sm:text-base">Reduza estresse</p>
              </div>
              <div className="text-center p-3 sm:p-4">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-secondary mx-auto mb-2" />
                <p className="font-medium text-xs sm:text-base">Evolua sua prática</p>
              </div>
            </div>
            <CTAButton className="text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-6 h-auto" />
            <p className="text-xs sm:text-sm text-primary-foreground/60 mt-4">
              Pagamento seguro • 7 dias grátis • Cancele quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* Hidden Trial Button */}
      <div className="py-4 text-center">
        <button
          onClick={() => setTrialDialogOpen(true)}
          className="text-xs text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors cursor-pointer bg-transparent border-none underline-offset-2 hover:underline"
        >
          Testar gratuitamente por 15 dias
        </button>
      </div>

      <Dialog open={trialDialogOpen} onOpenChange={setTrialDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">🎁 Teste Grátis de 15 Dias</DialogTitle>
            <DialogDescription>
              Experimente todos os recursos do Plano PRO por 15 dias, sem compromisso e sem cartão de crédito.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <label htmlFor="trial-email" className="text-sm font-medium">
                Seu melhor e-mail
              </label>
              <Input
                id="trial-email"
                type="email"
                placeholder="seu@email.com"
                value={trialEmail}
                onChange={(e) => setTrialEmail(e.target.value)}
                disabled={trialLoading}
              />
            </div>
            <Button
              className="w-full"
              variant="cta"
              disabled={trialLoading || !trialEmail.includes("@")}
              onClick={async () => {
                setTrialLoading(true);
                try {
                  const { data, error } = await supabase.functions.invoke("activate-free-trial", {
                    body: { email: trialEmail.trim().toLowerCase() },
                  });
                  if (error) throw error;
                  if (data?.success) {
                    toast.success(data.message);
                    setTrialDialogOpen(false);
                    setTrialEmail("");
                    setTimeout(() => {
                      window.location.href = "https://acesso.mindmed.online";
                    }, 1500);
                  } else if (data?.expired) {
                    toast.error(data.message);
                  } else {
                    toast.error(data?.error || "Erro ao ativar teste gratuito");
                  }
                } catch (err) {
                  console.error(err);
                  toast.error("Erro ao ativar teste gratuito. Tente novamente.");
                } finally {
                  setTrialLoading(false);
                }
              }}
            >
              {trialLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Ativando...</>
              ) : (
                "Ativar Teste Grátis"
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Sem cartão de crédito • Acesso PRO completo • 15 dias
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Index;
