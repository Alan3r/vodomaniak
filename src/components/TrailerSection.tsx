
import React from 'react';
import { Play } from 'lucide-react';

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface TrailerSectionProps {
  videos: Video[];
}

const TrailerSection = ({ videos }: TrailerSectionProps) => {
  const trailer = videos.find(video => 
    video.type === 'Trailer' && video.site === 'YouTube'
  ) || videos[0];

  if (!trailer) {
    return null;
  }

  return (
    <section className="py-12 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Zwiastun</h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrailerSection;
