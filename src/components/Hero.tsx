import { ArrowDown, Phone, MessageCircle } from "lucide-react";
import heroFarmer from "@/assets/hero-farmer.jpg";
import { useContent } from "@/contexts/ContentContext";

const Hero = () => {
  const { content } = useContent();
  const heroImage = content.heroImage || heroFarmer;

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="GUESSAN BI DOLI dans ses champs de riz à Gagnoa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-soil/70 via-soil/50 to-background" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border-2 border-accent/30 rounded-full animate-float opacity-60" />
      <div className="absolute bottom-1/3 right-10 w-32 h-32 border-2 border-primary/20 rounded-full animate-float opacity-40" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground">
              Agriculteur passionné depuis plus de 10 ans
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground mb-6 animate-fade-up stagger-1">
            {content.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl text-primary-foreground/90 mb-4 animate-fade-up stagger-2 font-light">
            {content.heroSubtitle.split(" à ")[0]} à
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-heading text-accent mb-8 animate-fade-up stagger-3">
            Gagnoa, Côte d'Ivoire
          </p>

          {/* Description */}
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-12 animate-fade-up stagger-4">
            {content.heroDescription}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-5">
            <a href="#contact" className="btn-hero group">
              <Phone className="w-5 h-5" />
              Contactez-moi
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href={`https://wa.me/${content.whatsappNumber}?text=Bonjour%20M.%20GUESSAN,%20je%20suis%20intéressé%20par%20vos%20produits%20agricoles.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Direct
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#apropos" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
            <ArrowDown className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
