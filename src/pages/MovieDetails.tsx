
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Star, Calendar, Clock, Users, Globe } from 'lucide-react';
import Header from '../components/Header';
import CastSection from '../components/CastSection';
import TrailerSection from '../components/TrailerSection';
import MonetizingPlayer from '../components/MonetizingPlayer';

const API_KEY = '48b703fa744b0f879d4a310a5dc75ae0';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovieDetails = async (id: string) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pl-PL`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};

const fetchMovieCredits = async (id: string) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=pl-PL`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie credits');
  }
  return response.json();
};

const fetchMovieVideos = async (id: string) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=pl-PL`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie videos');
  }
  return response.json();
};

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();

  const { data: movie, isLoading: movieLoading } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => fetchMovieDetails(id!),
    enabled: !!id,
  });

  const { data: credits } = useQuery({
    queryKey: ['movie', id, 'credits'],
    queryFn: () => fetchMovieCredits(id!),
    enabled: !!id,
  });

  const { data: videos } = useQuery({
    queryKey: ['movie', id, 'videos'],
    queryFn: () => fetchMovieVideos(id!),
    enabled: !!id,
  });

  if (movieLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Ładowanie...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Film nie został znaleziony</div>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.svg';

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Hero Section with Cinematic Background */}
      <div className="relative min-h-screen flex items-center">
        {/* Cinematic Background */}
        {backdropUrl && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
        )}
        
        {/* Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        
        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link
            to="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Powrót do strony głównej
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Poster */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-full max-w-sm mx-auto lg:mx-0 rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            
            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title and Basic Info */}
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {movie.title}
                </h1>
                
                {movie.tagline && (
                  <p className="text-xl text-gray-300 italic mb-6">
                    "{movie.tagline}"
                  </p>
                )}
                
                <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <span className="text-2xl font-bold">{movie.vote_average.toFixed(1)}</span>
                    <span className="text-sm">({movie.vote_count} ocen)</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg">{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                  
                  {movie.runtime && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span className="text-lg">{formatRuntime(movie.runtime)}</span>
                    </div>
                  )}
                </div>
                
                {/* Genres */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {movie.genres?.map((genre: any) => (
                    <span
                      key={genre.id}
                      className="px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-600/30 hover:bg-blue-600/30 transition-colors"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Overview */}
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-white">Opis Fabuły</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {movie.overview || 'Brak opisu filmu.'}
                </p>
              </div>

              {/* Monetizing Video Player */}
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold text-white">Obejrzyj Film</h2>
                <MonetizingPlayer />
              </div>

              {/* Cast Preview */}
              {credits?.cast && credits.cast.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-semibold text-white">Główna Obsada</h2>
                  <div className="overflow-x-auto scrollbar-hide">
                    <div className="flex space-x-4 pb-4">
                      {credits.cast.slice(0, 6).map((actor: any) => {
                        const profileUrl = actor.profile_path 
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : '/placeholder.svg';

                        return (
                          <div
                            key={actor.id}
                            className="flex-shrink-0 w-24 text-center group cursor-pointer"
                          >
                            <div className="relative mb-2">
                              <img
                                src={profileUrl}
                                alt={actor.name}
                                className="w-full h-32 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <h3 className="text-white font-medium text-xs mb-1 line-clamp-2">
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
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Full Cast Section */}
      {credits?.cast && (
        <CastSection cast={credits.cast} />
      )}
      
      {/* Trailer Section */}
      {videos?.results && (
        <TrailerSection videos={videos.results} />
      )}
    </div>
  );
};

export default MovieDetails;
