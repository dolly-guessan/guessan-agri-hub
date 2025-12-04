import { Heart, Award, Leaf, Users } from "lucide-react";
import riceField from "@/assets/rice-field.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "L'agriculture est ma vie depuis l'enfance",
    },
    {
      icon: Leaf,
      title: "Qualité",
      description: "Des produits cultivés avec soin et respect de la terre",
    },
    {
      icon: Award,
      title: "Expérience",
      description: "Plus de 10 ans de savoir-faire agricole",
    },
    {
      icon: Users,
      title: "Proximité",
      description: "Un service personnalisé pour chaque client",
    },
  ];

  return (
    <section id="apropos" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-soft">
              <img
                src={riceField}
                alt="Champs de riz de GUESSAN BI DOLI à Gagnoa"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soil/40 to-transparent" />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 glass-card p-6 shadow-harvest">
              <div className="text-center">
                <span className="text-4xl font-heading font-bold text-primary">10+</span>
                <p className="text-sm text-muted-foreground mt-1">Années d'expérience</p>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-accent/30 rounded-full -z-10" />
          </div>

          {/* Content Section */}
          <div>
            <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              À propos de moi
            </span>
            <h2 className="section-title">
              Un agriculteur dévoué à{" "}
              <span className="gradient-text">votre satisfaction</span>
            </h2>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                Je suis <strong className="text-foreground">GUESSAN BI DOLI</strong>, agriculteur 
                passionné basé à Gagnoa, au cœur de la Côte d'Ivoire. Depuis plus de 10 ans, 
                je cultive avec amour et dévouement du riz local de qualité supérieure, 
                des légumes frais et divers produits agricoles.
              </p>
              <p>
                Ma mission est simple : vous offrir des produits sains, cultivés selon 
                les méthodes traditionnelles ivoiriennes, tout en respectant notre belle 
                terre. Chaque grain de riz, chaque légume que je produis porte la marque 
                de mon engagement envers la qualité et l'authenticité.
              </p>
              <p>
                Que vous soyez un particulier ou un professionnel, je suis à votre 
                disposition pour répondre à vos besoins en produits agricoles frais 
                et de qualité.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors duration-300"
                >
                  <value.icon className="w-8 h-8 text-primary mb-2" />
                  <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
