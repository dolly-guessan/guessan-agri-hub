import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface Video {
  id: number;
  youtubeUrl: string;
  title: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  aboutTitle: string;
  aboutText: string;
  aboutText2: string;
  aboutText3: string;
  aboutImage: string;
  products: Product[];
  faqs: FAQ[];
  testimonials: Testimonial[];
  gallery: GalleryImage[];
  videos: Video[];
  seoTitle: string;
  seoDescription: string;
  contactPhone1: string;
  contactPhone2: string;
  contactEmail: string;
  whatsappNumber: string;
  address: string;
}

const defaultContent: SiteContent = {
  heroTitle: "GUESSAN BI DOLI",
  heroSubtitle: "Votre cultivateur de confiance à Gagnoa, Côte d'Ivoire",
  heroDescription: "Du riz local de qualité supérieure et des légumes frais cultivés avec passion, directement de mes champs à votre table.",
  heroImage: "",
  aboutTitle: "Un agriculteur dévoué à votre satisfaction",
  aboutText: "Je suis GUESSAN BI DOLI, agriculteur passionné basé à Gagnoa, au cœur de la Côte d'Ivoire. Depuis plus de 10 ans, je cultive avec amour et dévouement du riz local de qualité supérieure, des légumes frais et divers produits agricoles.",
  aboutText2: "Ma mission est simple : vous offrir des produits sains, cultivés selon les méthodes traditionnelles ivoiriennes, tout en respectant notre belle terre. Chaque grain de riz, chaque légume que je produis porte la marque de mon engagement envers la qualité et l'authenticité.",
  aboutText3: "Que vous soyez un particulier ou un professionnel, je suis à votre disposition pour répondre à vos besoins en produits agricoles frais et de qualité.",
  aboutImage: "",
  products: [
    { id: 1, name: "Riz Blanc Local", description: "Riz de qualité supérieure, cultivé et décortiqué localement. Grain long et parfumé.", category: "Céréales", image: "" },
    { id: 2, name: "Variétés de Riz", description: "Différentes variétés de riz local : blanc, brun, rouge. Chacun avec ses saveurs uniques.", category: "Céréales", image: "" },
    { id: 3, name: "Choux et Légumes", description: "Légumes frais cultivés naturellement. Choux, salades et légumes de saison.", category: "Légumes", image: "" },
    { id: 4, name: "Plants de Banane", description: "Plants de bananiers sains et vigoureux, prêts à être transplantés.", category: "Plants", image: "" },
    { id: 5, name: "Pépinière", description: "Large sélection de plants et semis pour votre exploitation agricole.", category: "Plants", image: "" },
    { id: 6, name: "Riz Paddy", description: "Riz paddy séché au soleil, prêt pour le décorticage ou la conservation.", category: "Céréales", image: "" },
  ],
  faqs: [
    { question: "Quels types de produits cultivez-vous ?", answer: "Je cultive principalement du riz local de plusieurs variétés (blanc, brun, rouge), des légumes frais comme le chou et la salade, ainsi que des plants de bananiers. Je dispose également d'une pépinière pour différents types de plants." },
    { question: "Livrez-vous à Gagnoa et ses environs ?", answer: "Oui, je livre dans toute la ville de Gagnoa et ses environs. Pour les commandes importantes, la livraison peut être organisée dans d'autres villes de la région. Contactez-moi pour discuter des modalités." },
    { question: "Comment puis-je passer commande ?", answer: "Vous pouvez me contacter par téléphone au 05 00 21 68 55 ou 07 87 67 71 08, par WhatsApp, ou par email à guessandoli55@gmail.com. Je réponds généralement dans les 24 heures." },
    { question: "Quels sont vos prix ?", answer: "Mes prix varient selon les produits et les quantités commandées. Je propose des tarifs compétitifs pour les particuliers et des prix de gros pour les professionnels. N'hésitez pas à me contacter pour un devis personnalisé." },
    { question: "Vos produits sont-ils cultivés naturellement ?", answer: "Oui, je privilégie les méthodes de culture traditionnelles et respectueuses de l'environnement. Mes produits sont cultivés avec soin, sans utilisation excessive de produits chimiques, pour vous garantir qualité et fraîcheur." },
    { question: "Proposez-vous des commandes en gros ?", answer: "Absolument ! Je travaille avec des restaurateurs, des commerçants et d'autres professionnels. Pour les commandes en gros, je propose des tarifs préférentiels et une livraison adaptée à vos besoins." },
  ],
  testimonials: [
    { id: 1, name: "Kouamé Adjoua", role: "Restauratrice à Gagnoa", content: "Le riz de M. GUESSAN est d'une qualité exceptionnelle. Mes clients adorent ! Je recommande vivement ses produits pour tous les professionnels de la restauration.", rating: 5 },
    { id: 2, name: "Yao Koffi", role: "Commerçant", content: "Cela fait 3 ans que je travaille avec GUESSAN BI DOLI. Son riz se vend très bien sur le marché. Un partenaire fiable et ses prix sont justes.", rating: 5 },
    { id: 3, name: "Marie Brou", role: "Ménagère", content: "Les légumes sont toujours frais et délicieux. M. GUESSAN livre directement chez moi à Gagnoa. Service impeccable et produits de qualité !", rating: 5 },
  ],
  gallery: [
    { id: 1, src: "", alt: "Vue panoramique des rizières à Gagnoa" },
    { id: 2, src: "", alt: "Champs de riz en croissance" },
    { id: 3, src: "", alt: "Travail des champs avec tracteur" },
    { id: 4, src: "", alt: "Culture de légumes frais" },
    { id: 5, src: "", alt: "Différentes variétés de riz" },
    { id: 6, src: "", alt: "Séchage du riz au soleil" },
    { id: 7, src: "", alt: "Pépinière de plants" },
    { id: 8, src: "", alt: "Plants de bananiers" },
  ],
  videos: [],
  seoTitle: "GUESSAN BI DOLI – Agriculteur à Gagnoa, Côte d'Ivoire",
  seoDescription: "Contactez GUESSAN BI DOLI, cultivateur passionné à Gagnoa, pour des fruits et légumes frais et de qualité.",
  contactPhone1: "0500216855",
  contactPhone2: "0787677108",
  contactEmail: "guessandoli55@gmail.com",
  whatsappNumber: "2250787677108",
  address: "Gagnoa, Côte d'Ivoire",
};

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  saveContent: () => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    const saved = localStorage.getItem("site_content");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultContent, ...parsed };
      } catch {
        return defaultContent;
      }
    }
    return defaultContent;
  });

  // Synchroniser les changements entre les onglets
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "site_content" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setContent({ ...defaultContent, ...parsed });
        } catch {
          // Ignore parsing errors
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent((prev) => {
      const updated = { ...prev, ...newContent };
      // Sauvegarde automatique à chaque mise à jour
      localStorage.setItem("site_content", JSON.stringify(updated));
      return updated;
    });
  };

  const saveContent = () => {
    localStorage.setItem("site_content", JSON.stringify(content));
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem("site_content");
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, saveContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
};
