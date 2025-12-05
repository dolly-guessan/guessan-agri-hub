import { MessageCircle } from "lucide-react";
import { useContent } from "@/contexts/ContentContext";
import riceWhite from "@/assets/rice-white.jpg";
import riceVarieties from "@/assets/rice-varieties.jpg";
import vegetables from "@/assets/vegetables.jpg";
import plantain from "@/assets/plantain.jpg";
import seedlings from "@/assets/seedlings.jpg";
import dryingRice from "@/assets/drying-rice.jpg";

const defaultProductImages: Record<number, string> = {
  1: riceWhite,
  2: riceVarieties,
  3: vegetables,
  4: plantain,
  5: seedlings,
  6: dryingRice,
};

const Products = () => {
  const { content } = useContent();

  const getProductImage = (product: { id: number; image: string }) => {
    if (product.image) return product.image;
    return defaultProductImages[product.id] || riceWhite;
  };

  return (
    <section id="produits" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Nos Produits
          </span>
          <h2 className="section-title">
            Découvrez nos <span className="gradient-text">récoltes</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Des produits frais cultivés avec passion à Gagnoa. Du champ directement à votre table.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.products.map((product, index) => (
            <article
              key={product.id}
              className="card-product group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={getProductImage(product)}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-soil/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                  {product.category}
                </span>

                {/* Hover Actions */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <a
                    href={`https://wa.me/${content.whatsappNumber}?text=Bonjour,%20je%20suis%20intéressé%20par%20${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-whatsapp text-sm justify-center"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Commander
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={`https://wa.me/${content.whatsappNumber}?text=Bonjour%20M.%20GUESSAN,%20je%20voudrais%20connaître%20vos%20produits%20disponibles.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-hero inline-flex"
          >
            <MessageCircle className="w-5 h-5" />
            Voir tous les produits disponibles
          </a>
        </div>
      </div>
    </section>
  );
};

export default Products;
