
import React from 'react';

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CastSectionProps {
  cast: CastMember[];
}

const CastSection = ({ cast }: CastSectionProps) => {
  const mainCast = cast.slice(0, 10); // Show only first 10 cast members

  return (
    <section className="py-12 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Obsada</h2>
        
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 pb-4">
            {mainCast.map((actor) => {
              const profileUrl = actor.profile_path 
                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                : '/placeholder.svg';

              return (
                <div
                  key={actor.id}
                  className="flex-shrink-0 w-32 text-center group cursor-pointer"
                >
                  <div className="relative mb-3">
                    <img
                      src={profileUrl}
                      alt={actor.name}
                      className="w-full h-40 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
                    {actor.name}
                  </h3>
                  <p className="text-gray-400 text-xs line-clamp-2">
                    {actor.character}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CastSection;
