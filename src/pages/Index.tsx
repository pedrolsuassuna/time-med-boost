import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FinancialCalculator from "@/components/FinancialCalculator";
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
  BarChart3,
  Lock,
  Stethoscope,
} from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";
import techAbstract from "@/assets/tech-abstract.jpg";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";

const Index = () => {
  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        page_title: "Home",
        page_location: window.location.href,
      });
    }
  }, []);

  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventName, {
        page_location: window.location.href,
        ...params,
      });
    }
  };

  const benefits = [
    {
      icon: Clock,
      title: "Mais Tempo",
      description: "Recupere até 75% do tempo gasto em documentação e papelada médica.",
    },
    {
      icon: TrendingUp,
      title: "Mais Consultas",
      description: "Atenda até 10 pacientes a mais por dia com o tempo recuperado.",
    },
    {
      icon: DollarSign,
      title: "Mais Faturamento",
      description: "Aumente sua receita em até 50% sem trabalhar horas extras.",
    },
    {
      icon: Shield,
      title: "Mais Compliance",
      description: "Documentação padronizada e completa, reduzindo riscos legais.",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Capture o Áudio",
      description:
        "Grave a consulta usando seu smartphone, tablet ou microfone. Nossa IA funciona com qualquer dispositivo.",
      icon: Mic,
    },
    {
      step: "02",
      title: "Transcrição Automática",
      description:
        "Nossa IA médica transcreve automaticamente, reconhecendo termos técnicos e jargões da sua especialidade.",
      icon: FileText,
    },
    {
      step: "03",
      title: "Geração de Laudo",
      description:
        "Em segundos, seu laudo estruturado está pronto com todas as seções necessárias para seu prontuário.",
      icon: Zap,
    },
    {
      step: "04",
      title: "Integração ao EMR",
      description:
        "Exporte diretamente para seu sistema de prontuário eletrônico ou copie com um clique.",
      icon: CheckCircle2,
    },
  ];

  const testimonials = [
    {
      name: "Dra. Ana Silva",
      specialty: "Cardiologia",
      location: "São Paulo, SP",
      rating: 5,
      text: "Recuperei 2 horas por dia que antes gastava com laudos. Agora consigo atender mais pacientes e ainda sair no horário. Meu faturamento aumentou 35% em 3 meses.",
      metric: "+35% faturamento",
    },
    {
      name: "Dr. Carlos Mendes",
      specialty: "Ortopedia",
      location: "Rio de Janeiro, RJ",
      rating: 5,
      text: "A precisão da transcrição é impressionante. Termos técnicos complexos são capturados perfeitamente. Minha equipe toda usa e economizamos mais de 10 horas por semana.",
      metric: "10h/semana economizadas",
    },
    {
      name: "Dra. Marina Costa",
      specialty: "Pediatria",
      location: "Belo Horizonte, MG",
      rating: 5,
      text: "Como mãe e médica, tempo é tudo. O MindMed me devolveu meu equilíbrio. Consigo atender mais crianças e ainda ter tempo para minha família. Investimento que se paga sozinho.",
      metric: "+8 pacientes/dia",
    },
  ];

  const stats = [
    { value: "10.000+", label: "Consultas Processadas" },
    { value: "500+", label: "Médicos Ativos" },
    { value: "4.9", label: "Avaliação Média" },
    { value: "99.8%", label: "Precisão IA" },
  ];

  const techFeatures = [
    {
      icon: Lock,
      title: "Criptografia End-to-End",
      description: "Dados protegidos com criptografia AES-256 em trânsito e em repouso.",
    },
    {
      icon: Shield,
      title: "Conformidade LGPD",
      description: "100% adequado à Lei Geral de Proteção de Dados Pessoais.",
    },
    {
      icon: BarChart3,
      title: "IA Especializada",
      description: "Modelos treinados especificamente para terminologia médica brasileira.",
    },
    {
      icon: Stethoscope,
      title: "Multi-especialidade",
      description: "Suporte para mais de 40 especialidades médicas diferentes.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="hero-section pt-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                IA Médica que Transforma Tempo em Faturamento
              </Badge>

              <h1 className="hero-headline text-balance">
                Transforme 2 horas de papelada em até 10 pacientes a mais por dia
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground text-balance">
                A IA da MindMed automatiza relatórios e transcrições para você focar
                no que fatura: <strong className="text-foreground">atender pacientes</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow hover:shadow-glow-intense transition-all text-lg"
                  asChild
                  onClick={() => trackEvent("cta_hero_main")}
                >
                  <Link to="/contato">
                    Quero recuperar meu tempo agora
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg border-2"
                  asChild
                >
                  <Link to="#calculadora">Ver quanto posso ganhar</Link>
                </Button>
              </div>

              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Confiado por médicos em:
                </p>
                <div className="flex flex-wrap gap-8 opacity-60">
                  {["Hospital XYZ", "Clínica ABC", "Rede Med+", "Instituto DEF"].map(
                    (name) => (
                      <div key={name} className="text-sm font-medium">
                        {name}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in animation-delay-200">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Médica usando tecnologia MindMed"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl border border-border animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2.5h</p>
                    <p className="text-sm text-muted-foreground">tempo economizado/dia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-gradient-subtle">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="stat-number mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculadora" className="section-padding bg-background">
        <div className="container-custom">
          <FinancialCalculator />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">
              Benefícios
            </Badge>
            <h2 className="mb-4">Por que escolher a MindMed?</h2>
            <p className="text-xl text-muted-foreground">
              Tecnologia que entende que <strong>tempo é dinheiro</strong> na medicina
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="card-premium text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 space-y-4">
                  <div className="inline-flex w-16 h-16 rounded-full bg-secondary/10 items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">
              Como Funciona
            </Badge>
            <h2 className="mb-4">4 passos para recuperar seu tempo</h2>
            <p className="text-xl text-muted-foreground">
              Simples, rápido e integrado ao seu fluxo de trabalho
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div
                key={index}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                      <step.icon className="w-10 h-10 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-secondary-foreground">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 right-0 w-full h-0.5 bg-gradient-to-r from-secondary to-transparent transform translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Features */}
      <section
        className="section-padding relative overflow-hidden"
        style={{
          backgroundImage: `url(${techAbstract})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/95" />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 text-primary-foreground">
            <Badge variant="secondary" className="mb-4">
              Tecnologia & Segurança
            </Badge>
            <h2 className="mb-4 text-primary-foreground">
              IA Clínica de Classe Mundial
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Tecnologia de ponta com segurança máxima para seus dados e de seus
              pacientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techFeatures.map((feature, index) => (
              <Card
                key={index}
                className="bg-primary-light/50 backdrop-blur-sm border-primary-glow/20 hover:border-primary-glow/50 transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 space-y-4 text-center text-primary-foreground">
                  <div className="inline-flex w-16 h-16 rounded-full bg-secondary/20 items-center justify-center">
                    <feature.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-primary-foreground/80">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">
              Depoimentos
            </Badge>
            <h2 className="mb-4">Médicos que já recuperaram seu tempo</h2>
            <p className="text-xl text-muted-foreground">
              Histórias reais de profissionais que transformaram sua prática
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="card-premium animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-secondary text-secondary"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.text}"
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.specialty} • {testimonial.location}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {testimonial.metric}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-primary text-primary-foreground">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-primary-foreground">
              Pronto para recuperar seu tempo e aumentar seu faturamento?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Junte-se a centenas de médicos que já transformaram sua prática com
              a MindMed
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow-intense text-lg"
                asChild
                onClick={() => trackEvent("cta_final_demo")}
              >
                <Link to="/contato">
                  Solicitar Demonstração Gratuita
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/precos">Ver Planos e Preços</Link>
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/60">
              Sem cartão de crédito necessário para demonstração
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
