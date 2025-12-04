import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useContent } from "@/contexts/ContentContext";

const FAQ = () => {
  const { content } = useContent();

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
            {content.faqs.map((faq, index) => (
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
              href={`https://wa.me/${content.whatsappNumber}?text=Bonjour%20M.%20GUESSAN,%20j'ai%20une%20question.`}
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
