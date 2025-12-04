import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  FileText,
  Settings,
  Save,
  Eye,
  LogOut,
  Plus,
  Trash2,
  Youtube,
  Home,
  Package,
  HelpCircle,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentData {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  products: Array<{
    id: number;
    name: string;
    description: string;
    category: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  seoTitle: string;
  seoDescription: string;
  contactPhone1: string;
  contactPhone2: string;
  contactEmail: string;
}

const defaultContent: ContentData = {
  heroTitle: "GUESSAN BI DOLI",
  heroSubtitle: "Votre cultivateur de confiance à Gagnoa, Côte d'Ivoire",
  aboutText:
    "Je suis GUESSAN BI DOLI, agriculteur passionné basé à Gagnoa, au cœur de la Côte d'Ivoire...",
  products: [
    { id: 1, name: "Riz Blanc Local", description: "Riz de qualité supérieure", category: "Céréales" },
    { id: 2, name: "Légumes Frais", description: "Légumes cultivés naturellement", category: "Légumes" },
  ],
  faqs: [
    { question: "Quels types de produits cultivez-vous ?", answer: "Je cultive du riz local, des légumes frais..." },
  ],
  seoTitle: "GUESSAN BI DOLI – Agriculteur à Gagnoa, Côte d'Ivoire",
  seoDescription: "Contactez GUESSAN BI DOLI, cultivateur passionné à Gagnoa...",
  contactPhone1: "0500216855",
  contactPhone2: "0787677108",
  contactEmail: "guessandoli55@gmail.com",
};

type Tab = "overview" | "content" | "products" | "faq" | "settings";

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("admin_content");
    if (saved) {
      setContent(JSON.parse(saved));
    }
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "guessan2024") {
      setIsLoggedIn(true);
      localStorage.setItem("admin_auth", "true");
      toast({ title: "Connexion réussie", description: "Bienvenue dans l'administration" });
    } else {
      toast({ title: "Erreur", description: "Mot de passe incorrect", variant: "destructive" });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("admin_auth");
    toast({ title: "Déconnexion", description: "À bientôt !" });
  };

  const saveContent = () => {
    localStorage.setItem("admin_content", JSON.stringify(content));
    toast({ title: "Sauvegardé !", description: "Les modifications ont été enregistrées" });
  };

  const addProduct = () => {
    setContent((prev) => ({
      ...prev,
      products: [
        ...prev.products,
        { id: Date.now(), name: "Nouveau produit", description: "Description", category: "Catégorie" },
      ],
    }));
  };

  const removeProduct = (id: number) => {
    setContent((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  };

  const addFaq = () => {
    setContent((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "Nouvelle question ?", answer: "Réponse..." }],
    }));
  };

  const removeFaq = (index: number) => {
    setContent((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-soft p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center mb-4">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Administration</h1>
            <p className="text-muted-foreground mt-2">Connectez-vous pour accéder au dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Entrez le mot de passe"
              />
            </div>
            <button type="submit" className="btn-hero w-full justify-center">
              Se connecter
            </button>
          </form>

          <Link
            to="/"
            className="block text-center mt-6 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Retour au site
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview" as Tab, label: "Aperçu", icon: LayoutDashboard },
    { id: "content" as Tab, label: "Contenu", icon: FileText },
    { id: "products" as Tab, label: "Produits", icon: Package },
    { id: "faq" as Tab, label: "FAQ", icon: HelpCircle },
    { id: "settings" as Tab, label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-lg font-heading font-bold text-primary-foreground">GD</span>
            </div>
            <div>
              <h1 className="font-heading font-bold text-foreground">Dashboard Admin</h1>
              <p className="text-xs text-muted-foreground">GUESSAN BI DOLI</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Eye className="w-4 h-4" />
              Voir le site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-destructive hover:text-destructive/80 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="bg-card rounded-2xl p-4 h-fit lg:sticky lg:top-24">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="bg-card rounded-2xl p-6 lg:p-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Aperçu</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <div className="p-6 rounded-xl bg-primary/10">
                    <Package className="w-8 h-8 text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">{content.products.length}</p>
                    <p className="text-sm text-muted-foreground">Produits</p>
                  </div>
                  <div className="p-6 rounded-xl bg-accent/10">
                    <HelpCircle className="w-8 h-8 text-accent mb-2" />
                    <p className="text-2xl font-bold text-foreground">{content.faqs.length}</p>
                    <p className="text-sm text-muted-foreground">Questions FAQ</p>
                  </div>
                  <div className="p-6 rounded-xl bg-secondary/10">
                    <Image className="w-8 h-8 text-secondary mb-2" />
                    <p className="text-2xl font-bold text-foreground">10</p>
                    <p className="text-sm text-muted-foreground">Images</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Utilisez les onglets pour gérer le contenu de votre site.
                </p>
              </div>
            )}

            {/* Content Tab */}
            {activeTab === "content" && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Gestion du contenu
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Titre Hero
                    </label>
                    <input
                      type="text"
                      value={content.heroTitle}
                      onChange={(e) => setContent((prev) => ({ ...prev, heroTitle: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Sous-titre Hero
                    </label>
                    <input
                      type="text"
                      value={content.heroSubtitle}
                      onChange={(e) => setContent((prev) => ({ ...prev, heroSubtitle: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Texte À propos
                    </label>
                    <textarea
                      value={content.aboutText}
                      onChange={(e) => setContent((prev) => ({ ...prev, aboutText: e.target.value }))}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>
                  <button onClick={saveContent} className="btn-hero">
                    <Save className="w-5 h-5" />
                    Sauvegarder
                  </button>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Gestion des produits
                  </h2>
                  <button onClick={addProduct} className="btn-hero text-sm">
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>
                <div className="space-y-4">
                  {content.products.map((product, index) => (
                    <div key={product.id} className="p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => {
                            const newProducts = [...content.products];
                            newProducts[index].name = e.target.value;
                            setContent((prev) => ({ ...prev, products: newProducts }));
                          }}
                          placeholder="Nom"
                          className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <input
                          type="text"
                          value={product.category}
                          onChange={(e) => {
                            const newProducts = [...content.products];
                            newProducts[index].category = e.target.value;
                            setContent((prev) => ({ ...prev, products: newProducts }));
                          }}
                          placeholder="Catégorie"
                          className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </button>
                      </div>
                      <textarea
                        value={product.description}
                        onChange={(e) => {
                          const newProducts = [...content.products];
                          newProducts[index].description = e.target.value;
                          setContent((prev) => ({ ...prev, products: newProducts }));
                        }}
                        placeholder="Description"
                        rows={2}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      />
                    </div>
                  ))}
                </div>
                <button onClick={saveContent} className="btn-hero mt-6">
                  <Save className="w-5 h-5" />
                  Sauvegarder
                </button>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === "faq" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    Gestion des FAQ
                  </h2>
                  <button onClick={addFaq} className="btn-hero text-sm">
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>
                <div className="space-y-4">
                  {content.faqs.map((faq, index) => (
                    <div key={index} className="p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const newFaqs = [...content.faqs];
                            newFaqs[index].question = e.target.value;
                            setContent((prev) => ({ ...prev, faqs: newFaqs }));
                          }}
                          placeholder="Question"
                          className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <button
                          onClick={() => removeFaq(index)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => {
                          const newFaqs = [...content.faqs];
                          newFaqs[index].answer = e.target.value;
                          setContent((prev) => ({ ...prev, faqs: newFaqs }));
                        }}
                        placeholder="Réponse"
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      />
                    </div>
                  ))}
                </div>
                <button onClick={saveContent} className="btn-hero mt-6">
                  <Save className="w-5 h-5" />
                  Sauvegarder
                </button>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                  Paramètres SEO & Contact
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Titre SEO
                    </label>
                    <input
                      type="text"
                      value={content.seoTitle}
                      onChange={(e) => setContent((prev) => ({ ...prev, seoTitle: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Meta Description
                    </label>
                    <textarea
                      value={content.seoDescription}
                      onChange={(e) => setContent((prev) => ({ ...prev, seoDescription: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Téléphone 1
                      </label>
                      <input
                        type="text"
                        value={content.contactPhone1}
                        onChange={(e) => setContent((prev) => ({ ...prev, contactPhone1: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Téléphone 2
                      </label>
                      <input
                        type="text"
                        value={content.contactPhone2}
                        onChange={(e) => setContent((prev) => ({ ...prev, contactPhone2: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={content.contactEmail}
                      onChange={(e) => setContent((prev) => ({ ...prev, contactEmail: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <button onClick={saveContent} className="btn-hero">
                    <Save className="w-5 h-5" />
                    Sauvegarder
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
