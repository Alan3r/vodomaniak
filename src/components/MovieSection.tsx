
import { ReactNode } from 'react';
import MovieCard from './MovieCard';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  icon?: ReactNode;
}

const MovieSection = ({ title, movies, icon }: MovieSectionProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-3 px-4">
        {icon}
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex space-x-4 px-4 pb-4">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieSection;
