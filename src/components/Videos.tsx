import { useContent } from "@/contexts/ContentContext";
import { Play } from "lucide-react";

const getYouTubeEmbedUrl = (url: string): string | null => {
  const regexes = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  
  for (const regex of regexes) {
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  return null;
};

const getYouTubeThumbnail = (url: string): string | null => {
  const regexes = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  
  for (const regex of regexes) {
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
    }
  }
  return null;
};

const Videos = () => {
  const { content } = useContent();

  if (!content.videos || content.videos.length === 0) {
    return null;
  }

  return (
    <section id="videos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Nos Vidéos
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Découvrez notre travail en vidéo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Suivez-nous sur YouTube et TikTok pour voir nos activités agricoles au quotidien
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.videos.map((video) => {
            const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);
            const thumbnail = getYouTubeThumbnail(video.youtubeUrl);

            if (!embedUrl) return null;

            return (
              <div
                key={video.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-soft border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                {video.title && (
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground line-clamp-2">
                      {video.title}
                    </h3>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Videos;
