
import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : '/placeholder.svg';

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group flex-shrink-0 w-48 hover:scale-105 transition-all duration-300"
    >
      <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl">
        <div className="aspect-[2/3] relative">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-3">
          <h3 className="text-white font-medium text-sm line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
