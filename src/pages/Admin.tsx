import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Save,
  Eye,
  LogOut,
  Plus,
  Trash2,
  Home,
  Package,
  HelpCircle,
  User,
  MessageSquare,
  Star,
  RefreshCw,
  Image,
  ImagePlus,
  Video,
  Youtube,
  ImageIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContent, type Product, type FAQ, type Testimonial, type GalleryImage, type Video as VideoType } from "@/contexts/ContentContext";
import ImageUploader from "@/components/admin/ImageUploader";

// Import default images for preview
import heroFarmer from "@/assets/hero-farmer.jpg";
import riceField from "@/assets/rice-field.jpg";
import riceWhite from "@/assets/rice-white.jpg";
import riceVarieties from "@/assets/rice-varieties.jpg";
import vegetables from "@/assets/vegetables.jpg";
import plantain from "@/assets/plantain.jpg";
import seedlings from "@/assets/seedlings.jpg";
import dryingRice from "@/assets/drying-rice.jpg";
import paddyField from "@/assets/paddy-field.jpg";
import tractor from "@/assets/tractor.jpg";

const defaultProductImages: Record<number, string> = {
  1: riceWhite,
  2: riceVarieties,
  3: vegetables,
  4: plantain,
  5: seedlings,
  6: dryingRice,
};

const defaultGalleryImages: Record<number, string> = {
  1: paddyField,
  2: riceField,
  3: tractor,
  4: vegetables,
  5: riceVarieties,
  6: dryingRice,
  7: seedlings,
  8: plantain,
};

type Tab = "overview" | "hero" | "about" | "products" | "gallery" | "videos" | "faq" | "testimonials" | "settings";

const Admin = () => {
  const { toast } = useToast();
  const { content, updateContent, saveContent, resetContent } = useContent();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
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

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveContent();
      toast({ title: "Sauvegardé !", description: "Les modifications ont été enregistrées dans la base de données" });
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de sauvegarder les modifications", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser tout le contenu ?")) {
      resetContent();
      toast({ title: "Réinitialisé", description: "Le contenu par défaut a été restauré" });
    }
  };

  // Products
  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now(),
      name: "Nouveau produit",
      description: "Description du produit",
      category: "Catégorie",
      image: "",
    };
    updateContent({ products: [...content.products, newProduct] });
    toast({ title: "Produit ajouté", description: "Un nouveau produit a été ajouté" });
  };

  const updateProduct = (id: number, field: keyof Product, value: string) => {
    const updated = content.products.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    updateContent({ products: updated });
  };

  const removeProduct = (id: number) => {
    updateContent({ products: content.products.filter((p) => p.id !== id) });
  };

  // Gallery
  const addGalleryImage = () => {
    const newImage: GalleryImage = {
      id: Date.now(),
      src: "",
      alt: "Nouvelle image",
    };
    updateContent({ gallery: [...content.gallery, newImage] });
    toast({ title: "Image ajoutée", description: "Une nouvelle image a été ajoutée à la galerie" });
  };

  const updateGalleryImage = (id: number, field: keyof GalleryImage, value: string) => {
    const updated = content.gallery.map((img) =>
      img.id === id ? { ...img, [field]: value } : img
    );
    updateContent({ gallery: updated });
  };

  const removeGalleryImage = (id: number) => {
    updateContent({ gallery: content.gallery.filter((img) => img.id !== id) });
  };

  // Videos
  const addVideo = () => {
    const newVideo: VideoType = {
      id: Date.now(),
      youtubeUrl: "",
      title: "Nouvelle vidéo",
    };
    updateContent({ videos: [...(content.videos || []), newVideo] });
    toast({ title: "Vidéo ajoutée", description: "Une nouvelle vidéo a été ajoutée" });
  };

  const updateVideo = (id: number, field: keyof VideoType, value: string) => {
    const updated = (content.videos || []).map((v) =>
      v.id === id ? { ...v, [field]: value } : v
    );
    updateContent({ videos: updated });
  };

  const removeVideo = (id: number) => {
    updateContent({ videos: (content.videos || []).filter((v) => v.id !== id) });
  };

  // FAQ
  const addFaq = () => {
    const newFaq: FAQ = { question: "Nouvelle question ?", answer: "Réponse..." };
    updateContent({ faqs: [...content.faqs, newFaq] });
    toast({ title: "FAQ ajoutée", description: "Une nouvelle question a été ajoutée" });
  };

  const updateFaq = (index: number, field: keyof FAQ, value: string) => {
    const updated = [...content.faqs];
    updated[index] = { ...updated[index], [field]: value };
    updateContent({ faqs: updated });
  };

  const removeFaq = (index: number) => {
    updateContent({ faqs: content.faqs.filter((_, i) => i !== index) });
  };

  // Testimonials
  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now(),
      name: "Nouveau client",
      role: "Profession",
      content: "Témoignage...",
      rating: 5,
    };
    updateContent({ testimonials: [...content.testimonials, newTestimonial] });
    toast({ title: "Témoignage ajouté", description: "Un nouveau témoignage a été ajouté" });
  };

  const updateTestimonial = (id: number, field: keyof Testimonial, value: string | number) => {
    const updated = content.testimonials.map((t) =>
      t.id === id ? { ...t, [field]: value } : t
    );
    updateContent({ testimonials: updated });
  };

  const removeTestimonial = (id: number) => {
    updateContent({ testimonials: content.testimonials.filter((t) => t.id !== id) });
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
              <label className="block text-sm font-medium text-foreground mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Entrez le mot de passe"
              />
            </div>
            <button type="submit" className="btn-admin w-full justify-center py-3">
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
    { id: "hero" as Tab, label: "Hero", icon: Home },
    { id: "about" as Tab, label: "À propos", icon: FileText },
    { id: "products" as Tab, label: "Produits", icon: Package },
    { id: "gallery" as Tab, label: "Galerie", icon: Image },
    { id: "videos" as Tab, label: "Vidéos", icon: Video },
    { id: "faq" as Tab, label: "FAQ", icon: HelpCircle },
    { id: "testimonials" as Tab, label: "Témoignages", icon: MessageSquare },
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
            <button type="button" onClick={handleSave} className="btn-admin" disabled={isSaving}>
              <Save className="w-4 h-4" />
              {isSaving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Voir le site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-destructive hover:text-destructive/80 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
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
            <div className="mt-6 pt-6 border-t border-border">
              <button
                onClick={handleReset}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Réinitialiser
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="bg-card rounded-2xl p-6 lg:p-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Aperçu du site</h2>
                
                {/* Stats */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                  <div className="p-6 rounded-xl bg-primary/10">
                    <Package className="w-8 h-8 text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">{content.products.length}</p>
                    <p className="text-sm text-muted-foreground">Produits</p>
                  </div>
                  <div className="p-6 rounded-xl bg-accent/10">
                    <Image className="w-8 h-8 text-accent mb-2" />
                    <p className="text-2xl font-bold text-foreground">{content.gallery.length}</p>
                    <p className="text-sm text-muted-foreground">Images galerie</p>
                  </div>
                  <div className="p-6 rounded-xl bg-destructive/10">
                    <Video className="w-8 h-8 text-destructive mb-2" />
                    <p className="text-2xl font-bold text-foreground">{(content.videos || []).length}</p>
                    <p className="text-sm text-muted-foreground">Vidéos</p>
                  </div>
                  <div className="p-6 rounded-xl bg-secondary/10">
                    <HelpCircle className="w-8 h-8 text-secondary mb-2" />
                    <p className="text-2xl font-bold text-foreground">{content.faqs.length}</p>
                    <p className="text-sm text-muted-foreground">Questions FAQ</p>
                  </div>
                  <div className="p-6 rounded-xl bg-primary/5">
                    <Star className="w-8 h-8 text-primary mb-2" />
                    <p className="text-2xl font-bold text-foreground">{content.testimonials.length}</p>
                    <p className="text-sm text-muted-foreground">Témoignages</p>
                  </div>
                </div>

                {/* Images Preview Section */}
                <div className="space-y-6 mb-8">
                  {/* Hero & About Images */}
                  <div className="p-6 rounded-xl bg-muted/50 border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Home className="w-5 h-5 text-primary" />
                      Images principales
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Hero</p>
                        <div className="aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                          <img
                            src={content.heroImage || heroFarmer}
                            alt="Image Hero"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">À propos</p>
                        <div className="aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                          <img
                            src={content.aboutImage || riceField}
                            alt="Image À propos"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Products Images */}
                  <div className="p-6 rounded-xl bg-muted/50 border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      Images des produits ({content.products.length})
                    </h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                      {content.products.map((product) => (
                        <div key={product.id} className="space-y-1">
                          <div className="aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                            <img
                              src={product.image || defaultProductImages[product.id] || riceWhite}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{product.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gallery Images */}
                  <div className="p-6 rounded-xl bg-muted/50 border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Image className="w-5 h-5 text-primary" />
                      Images de la galerie ({content.gallery.length})
                    </h3>
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                      {content.gallery.map((image, index) => (
                        <div key={image.id} className="aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                          <img
                            src={image.src || defaultGalleryImages[index + 1] || paddyField}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Guide */}
                <div className="p-6 rounded-xl bg-muted/50">
                  <h3 className="font-semibold text-foreground mb-2">Guide rapide</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• <strong>Hero</strong> : Modifiez le titre, slogan et image d'accueil</li>
                    <li>• <strong>À propos</strong> : Éditez votre présentation et photo</li>
                    <li>• <strong>Produits</strong> : Ajoutez/modifiez vos produits avec images</li>
                    <li>• <strong>Galerie</strong> : Gérez les images (upload depuis votre appareil)</li>
                    <li>• <strong>Vidéos</strong> : Ajoutez des vidéos YouTube</li>
                    <li>• Cliquez sur "Sauvegarder" pour enregistrer vos modifications</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Hero Tab */}
            {activeTab === "hero" && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Section Hero</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Titre principal</label>
                    <input
                      type="text"
                      value={content.heroTitle}
                      onChange={(e) => updateContent({ heroTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sous-titre</label>
                    <input
                      type="text"
                      value={content.heroSubtitle}
                      onChange={(e) => updateContent({ heroSubtitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea
                      value={content.heroDescription}
                      onChange={(e) => updateContent({ heroDescription: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>
                  <ImageUploader
                    label="Image d'arrière-plan Hero"
                    value={content.heroImage}
                    onChange={(v) => updateContent({ heroImage: v })}
                    defaultImage={heroFarmer}
                  />
                  <button type="button" onClick={handleSave} className="btn-admin">
                    <Save className="w-5 h-5" />
                    Sauvegarder
                  </button>
                </div>
              </div>
            )}

            {/* About Tab */}
            {activeTab === "about" && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Section À propos</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Titre de la section</label>
                    <input
                      type="text"
                      value={content.aboutTitle}
                      onChange={(e) => updateContent({ aboutTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Paragraphe 1</label>
                    <textarea
                      value={content.aboutText}
                      onChange={(e) => updateContent({ aboutText: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Paragraphe 2</label>
                    <textarea
                      value={content.aboutText2}
                      onChange={(e) => updateContent({ aboutText2: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Paragraphe 3</label>
                    <textarea
                      value={content.aboutText3}
                      onChange={(e) => updateContent({ aboutText3: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>
                  <ImageUploader
                    label="Image À propos"
                    value={content.aboutImage}
                    onChange={(v) => updateContent({ aboutImage: v })}
                    defaultImage={riceField}
                  />
                  <button type="button" onClick={handleSave} className="btn-admin">
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
                  <h2 className="text-2xl font-heading font-bold text-foreground">Gestion des produits</h2>
                  <button type="button" onClick={addProduct} className="btn-admin">
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>
                <div className="space-y-6">
                  {content.products.map((product) => (
                    <div key={product.id} className="p-6 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-foreground">{product.name || "Sans nom"}</h3>
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </button>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Nom du produit</label>
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                            placeholder="Nom"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Catégorie</label>
                          <input
                            type="text"
                            value={product.category}
                            onChange={(e) => updateProduct(product.id, "category", e.target.value)}
                            placeholder="Catégorie"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                        <textarea
                          value={product.description}
                          onChange={(e) => updateProduct(product.id, "description", e.target.value)}
                          placeholder="Description"
                          rows={2}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        />
                      </div>
                      <ImageUploader
                        label="Image du produit"
                        value={product.image}
                        onChange={(v) => updateProduct(product.id, "image", v)}
                        defaultImage={defaultProductImages[product.id] || riceWhite}
                      />
                    </div>
                  ))}
                </div>
                <button type="button" onClick={handleSave} className="btn-admin mt-6">
                  <Save className="w-5 h-5" />
                  Sauvegarder
                </button>
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === "gallery" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground">Gestion de la galerie</h2>
                  <button type="button" onClick={addGalleryImage} className="btn-admin">
                    <ImagePlus className="w-4 h-4" />
                    Ajouter une image
                  </button>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Uploadez des images depuis votre appareil ou glissez-les directement dans la zone d'upload.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  {content.gallery.map((image, index) => (
                    <div key={image.id} className="p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-sm font-medium text-foreground">Image #{index + 1}</span>
                        <button
                          onClick={() => removeGalleryImage(image.id)}
                          className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <ImageUploader
                          label="Image"
                          value={image.src}
                          onChange={(v) => updateGalleryImage(image.id, "src", v)}
                          defaultImage={defaultGalleryImages[index + 1] || paddyField}
                        />
                        <div>
                          <label className="block text-xs text-muted-foreground mb-1">Description (alt)</label>
                          <input
                            type="text"
                            value={image.alt}
                            onChange={(e) => updateGalleryImage(image.id, "alt", e.target.value)}
                            placeholder="Description de l'image"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={handleSave} className="btn-admin mt-6">
                  <Save className="w-5 h-5" />
                  Sauvegarder
                </button>
              </div>
            )}

            {/* Videos Tab */}
            {activeTab === "videos" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground">Gestion des vidéos</h2>
                  <button type="button" onClick={addVideo} className="btn-admin">
                    <Plus className="w-4 h-4" />
                    Ajouter une vidéo
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                  <div className="flex items-start gap-3">
                    <Youtube className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Vidéos YouTube supportées</h3>
                      <p className="text-sm text-muted-foreground">
                        Collez le lien de votre vidéo YouTube (formats acceptés: youtube.com/watch?v=..., youtu.be/..., youtube.com/shorts/...)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  {(content.videos || []).map((video) => (
                    <div key={video.id} className="p-6 rounded-xl bg-muted/50 border border-border">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-foreground">{video.title || "Sans titre"}</h3>
                        <button
                          onClick={() => removeVideo(video.id)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          Supprimer
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Titre de la vidéo</label>
                          <input
                            type="text"
                            value={video.title}
                            onChange={(e) => updateVideo(video.id, "title", e.target.value)}
                            placeholder="Titre"
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Lien YouTube</label>
                          <input
                            type="url"
                            value={video.youtubeUrl}
                            onChange={(e) => updateVideo(video.id, "youtubeUrl", e.target.value)}
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        {video.youtubeUrl && (
                          <div className="aspect-video rounded-lg overflow-hidden border border-border bg-muted">
                            <iframe
                              src={`https://www.youtube.com/embed/${video.youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&\n?#]+)/)?.[1] || ""}`}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full h-full"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {(content.videos || []).length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Aucune vidéo ajoutée</p>
                      <p className="text-sm">Cliquez sur "Ajouter une vidéo" pour commencer</p>
                    </div>
                  )}
                </div>
                <button type="button" onClick={handleSave} className="btn-admin mt-6">
                  <Save className="w-5 h-5" />
                  Sauvegarder
                </button>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === "faq" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground">Gestion des FAQ</h2>
                  <button type="button" onClick={addFaq} className="btn-admin">
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
                          onChange={(e) => updateFaq(index, "question", e.target.value)}
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
                        onChange={(e) => updateFaq(index, "answer", e.target.value)}
                        placeholder="Réponse"
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      />
                    </div>
                  ))}
                </div>
                <button type="button" onClick={handleSave} className="btn-admin mt-6">
                  <Save className="w-5 h-5" />
                  Sauvegarder
                </button>
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === "testimonials" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground">Gestion des témoignages</h2>
                  <button type="button" onClick={addTestimonial} className="btn-admin">
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                </div>
                <div className="space-y-4">
                  {content.testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-4 rounded-xl bg-muted/50 border border-border">
                      <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        <input
                          type="text"
                          value={testimonial.name}
                          onChange={(e) => updateTestimonial(testimonial.id, "name", e.target.value)}
                          placeholder="Nom"
                          className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <input
                          type="text"
                          value={testimonial.role}
                          onChange={(e) => updateTestimonial(testimonial.id, "role", e.target.value)}
                          placeholder="Profession"
                          className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <div className="flex items-center gap-2">
                          <select
                            value={testimonial.rating}
                            onChange={(e) => updateTestimonial(testimonial.id, "rating", parseInt(e.target.value))}
                            className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          >
                            {[1, 2, 3, 4, 5].map((n) => (
                              <option key={n} value={n}>{n} étoile{n > 1 ? "s" : ""}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => removeTestimonial(testimonial.id)}
                            className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <textarea
                        value={testimonial.content}
                        onChange={(e) => updateTestimonial(testimonial.id, "content", e.target.value)}
                        placeholder="Témoignage"
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      />
                    </div>
                  ))}
                </div>
                <button type="button" onClick={handleSave} className="btn-admin mt-6">
                  <Save className="w-5 h-5" />
                  Sauvegarder
                </button>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Paramètres SEO & Contact</h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
                    <h3 className="font-semibold text-foreground mb-2">SEO</h3>
                    <p className="text-sm text-muted-foreground">Ces paramètres affectent le référencement du site.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Titre SEO</label>
                    <input
                      type="text"
                      value={content.seoTitle}
                      onChange={(e) => updateContent({ seoTitle: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Meta Description</label>
                    <textarea
                      value={content.seoDescription}
                      onChange={(e) => updateContent({ seoDescription: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    />
                  </div>
                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-foreground mb-4">Contact</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Téléphone 1</label>
                        <input
                          type="text"
                          value={content.contactPhone1}
                          onChange={(e) => updateContent({ contactPhone1: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Téléphone 2</label>
                        <input
                          type="text"
                          value={content.contactPhone2}
                          onChange={(e) => updateContent({ contactPhone2: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      value={content.contactEmail}
                      onChange={(e) => updateContent({ contactEmail: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Numéro WhatsApp (avec indicatif pays)</label>
                    <input
                      type="text"
                      value={content.whatsappNumber}
                      onChange={(e) => updateContent({ whatsappNumber: e.target.value })}
                      placeholder="2250787677108"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Adresse</label>
                    <input
                      type="text"
                      value={content.address}
                      onChange={(e) => updateContent({ address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <button type="button" onClick={handleSave} className="btn-admin">
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
