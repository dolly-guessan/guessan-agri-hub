import { Phone, Mail, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "#accueil", label: "Accueil" },
    { href: "#apropos", label: "À propos" },
    { href: "#produits", label: "Produits" },
    { href: "#galerie", label: "Galerie" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="#accueil" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xl font-heading font-bold text-primary-foreground">GD</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-bold text-foreground leading-tight">
                GUESSAN BI DOLI
              </h1>
              <p className="text-xs text-muted-foreground">Agriculteur à Gagnoa</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+2250500216855"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">05 00 21 68 55</span>
            </a>
            <a
              href="https://wa.me/2250787677108"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors px-2 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
                <a
                  href="tel:+2250500216855"
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <Phone className="w-4 h-4" />
                  05 00 21 68 55
                </a>
                <a
                  href="https://wa.me/2250787677108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-center"
                >
                  Contacter sur WhatsApp
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
