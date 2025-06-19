
import { Link } from 'react-router-dom';
import { Play, Star, Calendar, Clock } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  runtime?: number;
}

interface HeroSectionProps {
  movie: Movie;
}

const HeroSection = ({ movie }: HeroSectionProps) => {
  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  
  return (
    <div className="relative h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />
      
      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {movie.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-6 text-sm text-gray-300">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(movie.release_date).getFullYear()}</span>
            </div>
          </div>
          
          <p className="text-lg text-gray-300 mb-8 leading-relaxed line-clamp-3">
            {movie.overview}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to={`/movie/${movie.id}`}
              className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 hover:shadow-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Zobacz szczegóły
            </Link>
            
            <button className="inline-flex items-center justify-center px-8 py-3 bg-gray-800/80 hover:bg-gray-700 text-white font-semibold rounded-lg backdrop-blur-sm transition-all border border-gray-600 hover:border-gray-500">
              Dodaj do listy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
