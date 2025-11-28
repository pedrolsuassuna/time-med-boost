import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  Timer,
  Gift,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

const Index = () => {
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

  const benefits = [
    { icon: FileText, text: "Gere laudos completos automaticamente" },
    { icon: Stethoscope, text: "Receituário com assinatura digital" },
    { icon: Mic, text: "Transcrição 99% precisa" },
    { icon: Zap, text: "CID sugerido automaticamente" },
    { icon: Clock, text: "Mais velocidade, menos burocracia" },
    { icon: DollarSign, text: "Aumento real do faturamento" },
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
      title: "A IA transcreve e organiza",
      description: "Nossa IA médica reconhece termos técnicos da sua especialidade.",
      icon: FileText,
    },
    {
      step: "3",
      title: "Laudo e receituário automáticos",
      description: "Em segundos, tudo pronto com todas as seções necessárias.",
      icon: Zap,
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
      text: "O receituário automático é surreal, mudou minha rotina. Não volto mais ao método antigo.",
      metric: "Rotina transformada",
      rating: 5,
    },
  ];

  const beforeAfter = {
    before: [
      "Horas escrevendo laudos manualmente",
      "Cansaço e burocracia excessiva",
      "Consultório lento e improdutivo",
      "Menos pacientes atendidos",
      "Faturamento estagnado",
    ],
    after: [
      "Laudos automáticos em segundos",
      "Foco total no paciente",
      "Consultório ágil e eficiente",
      "Até 40% mais pacientes/dia",
      "Faturamento em crescimento",
    ],
  };

  const bonuses = [
    {
      title: 'Curso "Como dobrar o faturamento do consultório"',
      value: "R$ 1.497",
      icon: Award,
    },
    {
      title: "Template premium de receituário",
      value: "R$ 297",
      icon: FileText,
    },
    {
      title: "Suporte VIP por 30 dias",
      value: "R$ 497",
      icon: ShieldCheck,
    },
  ];

  const faqs = [
    {
      question: "A MindMed funciona para qual especialidade?",
      answer: "A MindMed funciona para mais de 40 especialidades médicas, incluindo Cardiologia, Ortopedia, Pediatria, Dermatologia, Neurologia, e muitas outras. Nossa IA é treinada especificamente para terminologia médica brasileira.",
    },
    {
      question: "Posso cancelar quando quiser?",
      answer: "Sim! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais. Basta acessar sua conta e cancelar com um clique.",
    },
    {
      question: "Como funciona o receituário automático?",
      answer: "Após a transcrição da consulta, nossa IA identifica automaticamente as prescrições mencionadas e gera um receituário formatado profissionalmente, pronto para assinatura digital ou impressão.",
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
      question: "A MindMed está dentro das normas médicas?",
      answer: "Absolutamente. A MindMed está 100% em conformidade com a LGPD, utiliza criptografia AES-256 para proteção de dados e segue todas as diretrizes de segurança da informação em saúde.",
    },
  ];

  const stats = [
    { value: "+1.500", label: "Laudos Gerados" },
    { value: "97%", label: "Precisão de Transcrição" },
    { value: "500+", label: "Médicos Ativos" },
    { value: "4.9/5", label: "Avaliação Média" },
  ];

  const CTAButton = ({ className = "", size = "lg" as const }) => (
    <Button
      size={size}
      className={`bg-cta hover:bg-cta-hover text-cta-foreground shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base sm:text-lg rounded-full px-8 ${className}`}
      asChild
      onClick={() => trackEvent("cta_click")}
    >
      <a href="https://pay.cakto.com.br/u95r4cv_607505" target="_blank" rel="noopener noreferrer">
        Testar MindMed PRO — Começar Agora
        <ArrowRight className="ml-2 w-5 h-5" />
      </a>
    </Button>
  );

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent" />
        <div className="container-custom px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 lg:space-y-8 animate-fade-in">
            <Badge variant="secondary" className="text-sm px-4 py-2 mb-4">
              IA Médica #1 do Brasil
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground">
              Atenda até <span className="text-secondary">40% mais pacientes</span> por dia{" "}
              <span className="text-muted-foreground">sem digitar nada</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Laudos e receituários completos em segundos.{" "}
              <strong className="text-foreground">Economize até 2 horas por dia</strong> de
              papelada e aumente o faturamento do consultório usando IA.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <CTAButton />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cta" />
                <span>Cancele quando quiser</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cta" />
                <span>Suporte incluso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-cta" />
                <span>100% LGPD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 sm:py-12 bg-primary text-primary-foreground">
        <div className="container-custom px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
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

      {/* Benefits Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-4">
              Benefícios
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Tudo que você precisa para transformar seu consultório
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-cta/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-cta" />
                </div>
                <p className="text-base sm:text-lg font-medium pt-2">{benefit.text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-subtle">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-4">
              Como Funciona
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              4 passos simples para recuperar seu tempo
            </h2>
            <p className="text-lg text-muted-foreground">
              Simples, rápido e integrado ao seu fluxo de trabalho
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((step, index) => (
              <div
                key={index}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="card-premium text-center h-full">
                  <div className="p-6 space-y-4">
                    <div className="relative inline-block">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
                        <step.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cta flex items-center justify-center text-sm font-bold text-cta-foreground">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
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
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-4">
              Demonstração
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Veja a MindMed em ação
            </h2>
            <p className="text-lg text-muted-foreground">
              Assista como médicos estão transformando suas rotinas
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-primary-light shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-primary-foreground space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-cta/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-10 h-10 text-cta-foreground ml-1" />
                  </div>
                  <p className="text-lg font-medium">Clique para assistir</p>
                  <p className="text-sm text-primary-foreground/70">
                    Veja o médico gravando → Laudo sendo montado → Receituário finalizado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-subtle">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-4">
              Depoimentos
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Médicos que já transformaram sua rotina
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="card-premium animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                  <div className="pt-4 border-t border-border">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.specialty}</p>
                    <Badge variant="secondary" className="mt-2">
                      {testimonial.metric}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Authority Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-full shadow-md">
              <Award className="w-6 h-6 text-secondary" />
              <span className="font-semibold">+1.500 laudos gerados</span>
            </div>
            <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-full shadow-md">
              <Sparkles className="w-6 h-6 text-secondary" />
              <span className="font-semibold">97% de precisão com IA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-4">
              Transformação
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Antes e depois da MindMed
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <Card className="border-destructive/30 bg-destructive/5">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                    <X className="w-6 h-6 text-destructive" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-destructive">ANTES</h3>
                </div>
                <ul className="space-y-4">
                  {beforeAfter.before.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* After */}
            <Card className="border-cta/30 bg-cta/5 shadow-glow">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-cta/20 flex items-center justify-center">
                    <Check className="w-6 h-6 text-cta" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-cta">COM MINDMED</h3>
                </div>
                <ul className="space-y-4">
                  {beforeAfter.after.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-cta mt-0.5 flex-shrink-0" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Irresistible Offer Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />
        <div className="container-custom px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Urgency Timer */}
            <div className="inline-flex items-center gap-3 bg-destructive/90 text-destructive-foreground px-6 py-3 rounded-full mb-8 animate-pulse">
              <Timer className="w-5 h-5" />
              <span className="font-semibold">
                Oferta expira em: {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Plano MindMed PRO
            </h2>
            <div className="flex items-baseline justify-center gap-2 mb-6">
              <span className="text-5xl sm:text-6xl lg:text-7xl font-bold">R$ 299,90</span>
              <span className="text-xl text-primary-foreground/80">/mês</span>
            </div>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Consultas ilimitadas • Laudos automáticos • Receituários completos
            </p>

            {/* Bonuses */}
            <div className="bg-primary-light/30 backdrop-blur-sm rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Gift className="w-6 h-6 text-secondary" />
                <h3 className="text-xl font-bold">BÔNUS EXCLUSIVOS (por tempo limitado)</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {bonuses.map((bonus, i) => (
                  <div key={i} className="bg-primary/50 rounded-xl p-4">
                    <bonus.icon className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <p className="text-sm font-medium mb-1">{bonus.title}</p>
                    <p className="text-xs text-primary-foreground/60 line-through">{bonus.value}</p>
                    <Badge className="bg-cta text-cta-foreground mt-2">GRÁTIS</Badge>
                  </div>
                ))}
              </div>
              <p className="text-sm text-primary-foreground/60 mt-4">
                Total em bônus: <span className="line-through">R$ 2.291</span> → GRÁTIS
              </p>
            </div>

            <CTAButton className="text-xl px-12 py-6 h-auto" />

            <p className="text-sm text-primary-foreground/60 mt-4">
              Pagamento seguro • Cancele quando quiser • Sem taxas ocultas
            </p>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-12 sm:py-16 bg-cta/10">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto text-center flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="w-20 h-20 rounded-full bg-cta/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-10 h-10 text-cta" />
            </div>
            <div className="text-left">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Você pode cancelar quando quiser. Sem riscos.
              </h3>
              <p className="text-muted-foreground">
                Não gostou? Cancele a qualquer momento sem multas ou burocracias. Sua satisfação é
                nossa prioridade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <Badge variant="secondary" className="mb-4">
              Dúvidas Frequentes
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-secondary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-subtle">
        <div className="container-custom px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Pronto para transformar seu consultório?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Junte-se a mais de 500 médicos que já estão economizando tempo e aumentando o
              faturamento com a MindMed
            </p>
            <div className="pt-4">
              <CTAButton className="text-xl" />
            </div>
            <p className="text-sm text-muted-foreground">
              Pagamento seguro via Cakto • Suporte prioritário incluso
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
