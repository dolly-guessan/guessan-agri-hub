import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Kouamé Adjoua",
    role: "Restauratrice à Gagnoa",
    content:
      "Le riz de M. GUESSAN est d'une qualité exceptionnelle. Mes clients adorent ! Je recommande vivement ses produits pour tous les professionnels de la restauration.",
    rating: 5,
  },
  {
    id: 2,
    name: "Yao Koffi",
    role: "Commerçant",
    content:
      "Cela fait 3 ans que je travaille avec GUESSAN BI DOLI. Son riz se vend très bien sur le marché. Un partenaire fiable et ses prix sont justes.",
    rating: 5,
  },
  {
    id: 3,
    name: "Marie Brou",
    role: "Ménagère",
    content:
      "Les légumes sont toujours frais et délicieux. M. GUESSAN livre directement chez moi à Gagnoa. Service impeccable et produits de qualité !",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Témoignages
          </span>
          <h2 className="section-title">
            Ce que disent nos <span className="gradient-text">clients</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            La satisfaction de mes clients est ma plus grande fierté.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              className="relative bg-card rounded-2xl p-8 shadow-card hover:shadow-soft transition-shadow duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Quote className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-heading font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
