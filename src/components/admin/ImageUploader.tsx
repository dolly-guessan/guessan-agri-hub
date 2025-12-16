import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Maximize2 } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  preview?: boolean;
  defaultImage?: string;
}

const ImageUploader = ({ label, value, onChange, preview = true, defaultImage }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Image à afficher (personnalisée ou par défaut)
  const displayImage = value || defaultImage;
  const hasCustomImage = !!value;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      
      {/* Miniature actuelle */}
      {preview && displayImage && (
        <div className="relative">
          <div className="relative aspect-video w-full max-w-sm rounded-xl overflow-hidden border border-border bg-muted">
            <img
              src={displayImage}
              alt="Aperçu"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            {/* Boutons d'action */}
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(true);
                }}
                className="p-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                title="Voir en grand"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              {hasCustomImage && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                  className="p-1.5 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                  title="Supprimer l'image"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {!hasCustomImage && defaultImage && (
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-background/80 text-xs text-muted-foreground">
                Image par défaut
              </div>
            )}
          </div>
        </div>
      )}

      {/* Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
        <div className="flex items-center justify-center gap-3">
          <Upload className="w-5 h-5 text-muted-foreground" />
          <div className="text-left">
            <p className="text-sm text-foreground font-medium">
              {hasCustomImage ? "Remplacer l'image" : "Uploader une image"}
            </p>
            <p className="text-xs text-muted-foreground">
              Cliquez ou glissez (PNG, JPG, GIF)
            </p>
          </div>
        </div>
      </div>

      {/* Empty State - seulement si pas d'image du tout */}
      {!displayImage && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ImageIcon className="w-4 h-4" />
          <span>Aucune image sélectionnée</span>
        </div>
      )}

      {/* Lightbox */}
      {isLightboxOpen && displayImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={displayImage}
            alt="Aperçu en grand"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
