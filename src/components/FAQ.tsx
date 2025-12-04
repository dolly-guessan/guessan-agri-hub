import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quels types de produits cultivez-vous ?",
    answer:
      "Je cultive principalement du riz local de plusieurs variétés (blanc, brun, rouge), des légumes frais comme le chou et la salade, ainsi que des plants de bananiers. Je dispose également d'une pépinière pour différents types de plants.",
  },
  {
    question: "Livrez-vous à Gagnoa et ses environs ?",
    answer:
      "Oui, je livre dans toute la ville de Gagnoa et ses environs. Pour les commandes importantes, la livraison peut être organisée dans d'autres villes de la région. Contactez-moi pour discuter des modalités.",
  },
  {
    question: "Comment puis-je passer commande ?",
    answer:
      "Vous pouvez me contacter par téléphone au 05 00 21 68 55 ou 07 87 67 71 08, par WhatsApp, ou par email à guessandoli55@gmail.com. Je réponds généralement dans les 24 heures.",
  },
  {
    question: "Quels sont vos prix ?",
    answer:
      "Mes prix varient selon les produits et les quantités commandées. Je propose des tarifs compétitifs pour les particuliers et des prix de gros pour les professionnels. N'hésitez pas à me contacter pour un devis personnalisé.",
  },
  {
    question: "Vos produits sont-ils cultivés naturellement ?",
    answer:
      "Oui, je privilégie les méthodes de culture traditionnelles et respectueuses de l'environnement. Mes produits sont cultivés avec soin, sans utilisation excessive de produits chimiques, pour vous garantir qualité et fraîcheur.",
  },
  {
    question: "Proposez-vous des commandes en gros ?",
    answer:
      "Absolument ! Je travaille avec des restaurateurs, des commerçants et d'autres professionnels. Pour les commandes en gros, je propose des tarifs préférentiels et une livraison adaptée à vos besoins.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              Questions Fréquentes
            </span>
            <h2 className="section-title">
              Vous avez des <span className="gradient-text">questions</span> ?
            </h2>
            <p className="section-subtitle mx-auto mt-4">
              Trouvez rapidement les réponses à vos questions les plus courantes.
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border-none shadow-card px-6 data-[state=open]:shadow-soft transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Additional Help */}
          <div className="mt-12 text-center p-8 rounded-2xl bg-primary/5 border border-primary/10">
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              Vous n'avez pas trouvé votre réponse ?
            </h3>
            <p className="text-muted-foreground mb-4">
              N'hésitez pas à me contacter directement, je serai ravi de vous aider.
            </p>
            <a
              href="https://wa.me/2250787677108?text=Bonjour%20M.%20GUESSAN,%20j'ai%20une%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp inline-flex"
            >
              Poser une question
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
