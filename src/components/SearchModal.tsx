
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Search, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const API_KEY = '48b703fa744b0f879d4a310a5dc75ae0';
const BASE_URL = 'https://api.themoviedb.org/3';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return { results: [] };
      
      const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&language=pl-PL&query=${encodeURIComponent(searchQuery)}`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      return response.json();
    },
    enabled: searchQuery.length > 2,
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchQuery('');
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto p-4 pt-16">
        <div className="bg-gray-900 rounded-lg shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="flex items-center p-4 border-b border-gray-700">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Szukaj filmów, seriali, aktorów..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading && searchQuery.length > 2 && (
              <div className="p-8 text-center text-gray-400">
                Wyszukiwanie...
              </div>
            )}

            {searchResults?.results && searchResults.results.length === 0 && searchQuery.length > 2 && (
              <div className="p-8 text-center text-gray-400">
                Nie znaleziono wyników dla "{searchQuery}"
              </div>
            )}

            {searchResults?.results?.map((item: any) => (
              <Link
                key={item.id}
                to={`/${item.media_type || 'movie'}/${item.id}`}
                onClick={onClose}
                className="flex items-center p-4 hover:bg-gray-800 transition-colors border-b border-gray-700 last:border-b-0"
              >
                <div className="w-12 h-16 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                  {item.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                      alt={item.title || item.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                <div className="ml-4 flex-1">
                  <h3 className="text-white font-medium">
                    {item.title || item.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400 mt-1">
                    <span className="capitalize">
                      {item.media_type === 'movie' ? 'Film' : 
                       item.media_type === 'tv' ? 'Serial' : 'Osoba'}
                    </span>
                    {item.vote_average > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span>{item.vote_average.toFixed(1)}</span>
                        </div>
                      </>
                    )}
                    {(item.release_date || item.first_air_date) && (
                      <>
                        <span>•</span>
                        <span>
                          {new Date(item.release_date || item.first_air_date).getFullYear()}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
