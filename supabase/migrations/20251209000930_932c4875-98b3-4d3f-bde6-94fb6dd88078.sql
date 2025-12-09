-- Table pour stocker le contenu du site
CREATE TABLE public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre à tout le monde de lire le contenu
CREATE POLICY "Anyone can read site content" 
ON public.site_content 
FOR SELECT 
USING (true);

-- Politique pour permettre les mises à jour (admin via mot de passe local)
CREATE POLICY "Anyone can update site content" 
ON public.site_content 
FOR UPDATE 
USING (true);

-- Politique pour permettre les insertions
CREATE POLICY "Anyone can insert site content" 
ON public.site_content 
FOR INSERT 
WITH CHECK (true);

-- Trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();