import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Film, TrendingUp } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { loadCatalog, ALL_TAGS } from '../data/catalog';
import { Button } from './ui/button';
import { AppHeader } from './AppHeader';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const movies = useMemo(() => loadCatalog(), []);
  const genres = ALL_TAGS;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const trendingMovies = movies.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <AppHeader />

      {/* Hero Section with Search */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl text-white">
              Discover Your Next Favorite
            </h1>
            <p className="text-xl text-gray-400">
              Search, explore, and track movies and TV shows with aggregated reviews
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for movies or TV shows..."
                className="w-full bg-gray-900/50 border border-gray-800 rounded-full py-5 pl-14 pr-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Trending Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl text-white">Trending Now</h2>
        </div>
        
        <div className="overflow-x-auto pb-4 -mx-6 px-6">
          <div className="flex gap-6 min-w-max">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="w-[280px] flex-shrink-0">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Genre Categories */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-2xl text-white mb-8">Browse by Genre</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => navigate(`/search?genre=${encodeURIComponent(genre)}`)}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-gray-700/80 hover:to-gray-800/80 border border-gray-700/50 rounded-xl p-6 text-white transition-all hover:scale-105 hover:border-orange-500/50"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
