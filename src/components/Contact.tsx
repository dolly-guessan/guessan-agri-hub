import { useState } from "react";
import { Phone, Mail, MapPin, Send, MessageCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message envoyé !",
      description: "Merci pour votre message. Je vous répondrai dans les plus brefs délais.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
            Contact
          </span>
          <h2 className="section-title">
            Contactez-moi pour vos{" "}
            <span className="gradient-text">besoins agricoles</span>
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            Je suis disponible pour répondre à toutes vos questions et prendre vos commandes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
              Mes coordonnées
            </h3>

            <div className="space-y-6">
              {/* Phone Numbers */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Téléphone</h4>
                  <a
                    href="tel:+2250500216855"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    05 00 21 68 55
                  </a>
                  <a
                    href="tel:+2250787677108"
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    07 87 67 71 08
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Email</h4>
                  <a
                    href="mailto:guessandoli55@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    guessandoli55@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Localisation</h4>
                  <p className="text-muted-foreground">Gagnoa, Côte d'Ivoire</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Disponibilité</h4>
                  <p className="text-muted-foreground">Lundi - Samedi : 7h - 18h</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-8 p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-8 h-8 text-[#25D366]" />
                <h4 className="text-lg font-semibold text-foreground">
                  Contact rapide via WhatsApp
                </h4>
              </div>
              <p className="text-muted-foreground mb-4">
                Pour une réponse plus rapide, contactez-moi directement sur WhatsApp.
              </p>
              <a
                href="https://wa.me/2250787677108?text=Bonjour%20M.%20GUESSAN,%20je%20vous%20contacte%20depuis%20votre%20site%20web."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center"
              >
                <MessageCircle className="w-5 h-5" />
                Démarrer une conversation
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
              Envoyez-moi un message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Votre nom *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Entrez votre nom"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Votre email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  maxLength={255}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Votre message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={1000}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  placeholder="Comment puis-je vous aider ?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-hero w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer le message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
