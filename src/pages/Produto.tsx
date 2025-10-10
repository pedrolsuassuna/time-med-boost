import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Mic,
  FileText,
  Zap,
  Lock,
  BarChart3,
  Cloud,
  Database,
  Plug,
  Shield,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  Brain,
  Languages,
} from "lucide-react";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";

const Produto = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        page_title: "Produto",
        page_location: window.location.href,
      });
    }
  }, []);

  const features = [
    {
      icon: Mic,
      title: "Transcrição Médica Inteligente",
      description:
        "IA especializada em terminologia médica com precisão de 99.8%. Reconhece mais de 50 mil termos técnicos e adapta-se ao seu vocabulário.",
      benefits: [
        "Reconhecimento de 40+ especialidades",
        "Suporte a múltiplos sotaques",
        "Correção automática de erros",
        "Exportação em múltiplos formatos",
      ],
    },
    {
      icon: FileText,
      title: "Geração Automática de Laudos",
      description:
        "Estruturas prontas para cada especialidade. Seu laudo formatado e completo em segundos, seguindo as melhores práticas.",
      benefits: [
        "Templates por especialidade",
        "Formatação SOAP/POMR",
        "CID-10 sugerido automaticamente",
        "Assinatura digital integrada",
      ],
    },
    {
      icon: Brain,
      title: "Sumário Clínico Automático",
      description:
        "IA extrai automaticamente informações-chave: queixa principal, história, exame físico, hipóteses diagnósticas e conduta.",
      benefits: [
        "Estruturação automática",
        "Destaques de informações críticas",
        "Timeline de evolução",
        "Alertas de seguimento",
      ],
    },
    {
      icon: Languages,
      title: "Multi-idioma",
      description:
        "Transcrição e tradução em tempo real. Atenda pacientes internacionais sem barreiras linguísticas.",
      benefits: [
        "Português, Inglês, Espanhol",
        "Tradução simultânea",
        "Manutenção de termos técnicos",
        "Exportação bilíngue",
      ],
    },
  ];

  const integrations = [
    {
      name: "Prontuários Eletrônicos",
      description: "Integração nativa com principais EMRs do mercado",
      systems: ["MV", "Tasy", "Philips", "Wareline"],
    },
    {
      name: "Armazenamento",
      description: "Sincronização automática com nuvem",
      systems: ["Google Drive", "Dropbox", "OneDrive", "AWS S3"],
    },
    {
      name: "Comunicação",
      description: "Compartilhamento seguro com equipe e pacientes",
      systems: ["WhatsApp", "Email", "SMS", "Portal do Paciente"],
    },
  ];

  const security = [
    {
      icon: Lock,
      title: "Criptografia de Ponta",
      description: "AES-256 em trânsito e em repouso. Mesma segurança de bancos.",
    },
    {
      icon: Shield,
      title: "Conformidade LGPD",
      description: "100% adequado à Lei Geral de Proteção de Dados brasileira.",
    },
    {
      icon: Database,
      title: "Retenção Controlada",
      description: "Você decide por quanto tempo seus dados ficam armazenados.",
    },
    {
      icon: Cloud,
      title: "Backup Automático",
      description: "Redundância geográfica. Seus dados sempre seguros e disponíveis.",
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
              Produto
            </Badge>
            <h1 className="hero-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Plataforma completa de automação médica com IA
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground">
              Tudo que você precisa para eliminar papelada e focar no que importa:
              seus pacientes
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow text-base sm:text-lg w-full sm:w-auto"
                asChild
              >
                <Link to="/contato">
                  Solicitar Demo
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg w-full sm:w-auto" asChild>
                <Link to="/precos">Ver Preços</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container-custom px-4">
          <div className="max-w-6xl mx-auto">
            <img
              src={dashboardMockup}
              alt="Interface do MindMed"
              className="w-full rounded-xl sm:rounded-2xl shadow-2xl border border-border"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="transcricao" className="py-12 sm:py-16 lg:py-24 bg-gradient-subtle">
        <div className="container-custom px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
            <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl">Recursos Principais</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground">
              Tecnologia de ponta para automatizar cada etapa do seu atendimento
            </p>
          </div>

          <div className="space-y-12 lg:space-y-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <Card className="card-premium">
                    <div className="p-6 sm:p-8 space-y-4 sm:space-y-6">
                      <div className="inline-flex w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary/10 items-center justify-center">
                        <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-secondary" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold">{feature.title}</h3>
                      <p className="text-base sm:text-lg text-muted-foreground">
                        {feature.description}
                      </p>
                      <ul className="space-y-3">
                        {feature.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm sm:text-base">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </div>
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className="aspect-video bg-gradient-primary rounded-xl sm:rounded-2xl flex items-center justify-center shadow-glow">
                    <feature.icon className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-primary-foreground opacity-50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integracao" className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">
              Integrações
            </Badge>
            <h2 className="mb-4">Conecte com suas ferramentas favoritas</h2>
            <p className="text-xl text-muted-foreground">
              Integração nativa com os principais sistemas do mercado
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {integrations.map((integration, index) => (
              <Card key={index} className="card-premium">
                <div className="p-8 space-y-6">
                  <div className="inline-flex w-14 h-14 rounded-full bg-secondary/10 items-center justify-center">
                    <Plug className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold">{integration.name}</h3>
                  <p className="text-muted-foreground">{integration.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {integration.systems.map((system, i) => (
                      <Badge key={i} variant="outline">
                        {system}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section id="seguranca" className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4">
              Segurança & Privacidade
            </Badge>
            <h2 className="mb-4 text-primary-foreground">
              Seus dados e de seus pacientes em primeiro lugar
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Segurança de classe hospitalar para proteger informações sensíveis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {security.map((item, index) => (
              <Card
                key={index}
                className="bg-primary-light/50 backdrop-blur-sm border-primary-glow/20"
              >
                <div className="p-6 space-y-4 text-center text-primary-foreground">
                  <div className="inline-flex w-14 h-14 rounded-full bg-secondary/20 items-center justify-center">
                    <item.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-primary-foreground/80">
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 max-w-3xl mx-auto p-6 bg-primary-light/30 rounded-xl border border-primary-glow/20">
            <p className="text-center text-primary-foreground/90">
              <strong>Certificações:</strong> ISO 27001 • SOC 2 Type II • HIPAA
              Compliant • LGPD Adequado
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-subtle">
        <div className="container-custom">
          <Card className="card-premium bg-gradient-primary text-primary-foreground border-0">
            <div className="p-12 text-center space-y-8">
              <h2 className="text-primary-foreground">
                Pronto para experimentar a MindMed?
              </h2>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Veja na prática como nossa plataforma pode transformar sua rotina
                médica
              </p>
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-glow-intense text-lg"
                asChild
              >
                <Link to="/contato">
                  Agendar Demonstração Gratuita
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Produto;
