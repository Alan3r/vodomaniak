
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Play, Star, Calendar, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Header from '../components/Header';
import MovieCard from '../components/MovieCard';
import HeroSection from '../components/HeroSection';
import MovieSection from '../components/MovieSection';

const API_KEY = '48b703fa744b0f879d4a310a5dc75ae0';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (endpoint: string) => {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=pl-PL`);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

const Index = () => {
  const { data: popularMovies } = useQuery({
    queryKey: ['movies', 'popular'],
    queryFn: () => fetchMovies('/movie/popular'),
  });

  const { data: topRatedMovies } = useQuery({
    queryKey: ['movies', 'top_rated'],
    queryFn: () => fetchMovies('/movie/top_rated'),
  });

  const { data: upcomingMovies } = useQuery({
    queryKey: ['movies', 'upcoming'],
    queryFn: () => fetchMovies('/movie/upcoming'),
  });

  const { data: trendingMovies } = useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: () => fetchMovies('/trending/movie/week'),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header />
      
      {/* Hero Section */}
      {popularMovies?.results && (
        <HeroSection movie={popularMovies.results[0]} />
      )}

      {/* Movie Sections */}
      <div className="relative z-10 -mt-32 space-y-12 px-4 pb-20">
        {trendingMovies?.results && (
          <MovieSection
            title="Trendy Tygodnia"
            movies={trendingMovies.results}
            icon={<TrendingUp className="w-6 h-6" />}
          />
        )}

        {popularMovies?.results && (
          <MovieSection
            title="Popularne Teraz"
            movies={popularMovies.results}
            icon={<Star className="w-6 h-6" />}
          />
        )}

        {topRatedMovies?.results && (
          <MovieSection
            title="Najwyżej Oceniane"
            movies={topRatedMovies.results}
            icon={<Star className="w-6 h-6 text-yellow-400" />}
          />
        )}

        {upcomingMovies?.results && (
          <MovieSection
            title="Nadchodzące Premiery"
            movies={upcomingMovies.results}
            icon={<Calendar className="w-6 h-6" />}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
