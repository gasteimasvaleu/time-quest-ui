import { Link } from "@/lib/router-compat";
import { Heart, Mail, MapPin } from "lucide-react";
import { FloatingDockAnchor } from "@/components/FloatingDock";

const Footer = () => {
  return (
    <footer className="bg-secondary py-4 md:py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 dark:bg-secondary/80 backdrop-blur-md rounded-2xl border border-border/50 shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Section */}
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">Sexando</h3>
              <p className="text-muted-foreground mb-4">
                A rede social brasileira do estilo de vida liberal. Casais, solteiros(as) e o universo swing — com perfis verificados e total privacidade.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                <span>Feito para conexões livres e adultas</span>
              </div>
            </div>

            {/* Navigation Section */}
            <div className="hidden md:block">
              <h3 className="text-lg font-semibold mb-4">Navegação</h3>
              <nav className="flex flex-col gap-2">
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Começar
                </Link>
                <Link to="/search" className="text-muted-foreground hover:text-primary transition-colors">
                  Buscar
                </Link>
                <Link to="/funcionalidades" className="text-muted-foreground hover:text-primary transition-colors">
                  Funcionalidades
                </Link>
                <Link to="/precos" className="text-muted-foreground hover:text-primary transition-colors">
                  Preços
                </Link>
                <Link to="/contato" className="text-muted-foreground hover:text-primary transition-colors">
                  Dúvidas
                </Link>
                <Link to="/sobre" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre
                </Link>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </nav>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <div className="flex flex-col gap-3">
                <a 
                  href="mailto:sexandoapp@hotmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">sexandoapp@hotmail.com</span>
                </a>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Brasil</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar — floating dock docks here on scroll */}
          <div className="border-t border-border/30 mt-8 pt-6 flex flex-col items-center gap-4">
            <FloatingDockAnchor />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
