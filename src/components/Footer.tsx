import { Phone, Mail, MapPin, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-soil text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-xl font-heading font-bold">GD</span>
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">GUESSAN BI DOLI</h3>
                <p className="text-sm text-primary-foreground/70">Agriculteur à Gagnoa</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 max-w-md mb-6">
              Cultivateur passionné depuis plus de 10 ans, je vous propose du riz local 
              de qualité et des légumes frais cultivés avec amour à Gagnoa, Côte d'Ivoire.
            </p>
            <a
              href="https://wa.me/2250787677108"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex"
            >
              Contacter sur WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <nav className="space-y-3">
              <a href="#accueil" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Accueil
              </a>
              <a href="#apropos" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                À propos
              </a>
              <a href="#produits" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Produits
              </a>
              <a href="#galerie" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Galerie
              </a>
              <a href="#faq" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                FAQ
              </a>
              <a href="#contact" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <div>
                  <a href="tel:+2250500216855" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    05 00 21 68 55
                  </a>
                  <a href="tel:+2250787677108" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                    07 87 67 71 08
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <a href="mailto:guessandoli55@gmail.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  guessandoli55@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground/80">Gagnoa, Côte d'Ivoire</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60 text-center md:text-left">
              © {currentYear} GUESSAN BI DOLI. Tous droits réservés.
            </p>
            <p className="text-sm text-primary-foreground/60 flex items-center gap-1">
              Fait avec <Heart className="w-4 h-4 text-destructive fill-destructive" /> à Gagnoa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
