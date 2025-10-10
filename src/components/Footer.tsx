import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shadow-glow">
                <span className="text-2xl font-bold text-secondary-foreground">M</span>
              </div>
              <span className="text-xl font-bold">MindMed</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Transforme papelada em faturamento. IA médica que automatiza laudos e
              transcrições para você focar no que realmente importa.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Produto */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Produto</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/produto"
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Recursos
                </Link>
              </li>
              <li>
                <Link
                  to="/produto#transcricao"
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Transcrição Médica
                </Link>
              </li>
              <li>
                <Link
                  to="/produto#laudos"
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Geração de Laudos
                </Link>
              </li>
              <li>
                <Link
                  to="/produto#integracao"
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Integrações
                </Link>
              </li>
              <li>
                <Link
                  to="/produto#seguranca"
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Segurança
                </Link>
              </li>
            </ul>
          </div>

          {/* Soluções */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Soluções</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/solucoes#clinicas"
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Clínicas Pequenas
                </Link>
              </li>
              <li>
                <Link
                  to="/solucoes#consultorios"
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Consultórios Individuais
                </Link>
              </li>
              <li>
                <Link
                  to="/solucoes#redes"
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Redes e Operadoras
                </Link>
              </li>
              <li>
                <Link
                  to="/precos"
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Preços
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 mt-0.5 text-secondary" />
                <a
                  href="mailto:contato@mindmed.com.br"
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  contato@mindmed.com.br
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 mt-0.5 text-secondary" />
                <a
                  href="tel:+5511999999999"
                  className="text-sm text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 text-secondary" />
                <span className="text-sm text-primary-foreground/80">
                  São Paulo, SP - Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-light">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} MindMed. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                to="/termos"
                className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                Termos de Uso
              </Link>
              <Link
                to="/privacidade"
                className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                to="/lgpd"
                className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors"
              >
                LGPD
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
