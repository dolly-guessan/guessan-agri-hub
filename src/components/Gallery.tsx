import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import riceField from "@/assets/rice-field.jpg";
import paddyField from "@/assets/paddy-field.jpg";
import tractor from "@/assets/tractor.jpg";
import vegetables from "@/assets/vegetables.jpg";
import riceVarieties from "@/assets/rice-varieties.jpg";
import dryingRice from "@/assets/drying-rice.jpg";
import seedlings from "@/assets/seedlings.jpg";
import plantain from "@/assets/plantain.jpg";

const images = [
  { src: riceField, alt: "Vue panoramique des rizières à Gagnoa" },
  { src: paddyField, alt: "Champs de riz en croissance" },
  { src: tractor, alt: "Travail des champs avec tracteur" },
  { src: vegetables, alt: "Culture de légumes frais" },
  { src: riceVarieties, alt: "Différentes variétés de riz" },
  { src: dryingRice, alt: "Séchage du riz au soleil" },
  { src: seedlings, alt: "Pépinière de plants" },
  { src: plantain, alt: "Plants de bananiers" },
];

const Gallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  
  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };
  
  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <section id="galerie" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Galerie
          </span>
          <h2 className="section-title">
            Découvrez mon <span className="gradient-text">exploitation</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Des images de mes champs, mes récoltes et mon travail quotidien à Gagnoa.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-soil/0 group-hover:bg-soil/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  Voir
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-soil/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="Fermer"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />

          <button
            onClick={goToNext}
            className="absolute right-4 p-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-4 text-primary-foreground/80 text-sm">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
