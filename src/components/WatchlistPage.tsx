import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Bookmark, Check } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { loadCatalog } from '../data/catalog';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useWatchlist } from './WatchlistContext';
import { AppHeader } from './AppHeader';

export function WatchlistPage() {
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();
  const movies = useMemo(() => loadCatalog(), []);

  const wantToWatch = movies.filter(movie => 
    watchlist.find(item => String(item.id) === String(movie.id) && item.status === 'want')
  );

  const watched = movies.filter(movie => 
    watchlist.find(item => String(item.id) === String(movie.id) && item.status === 'watched')
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <AppHeader />

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl text-white mb-8">My Watchlist</h1>

        <Tabs defaultValue="want" className="w-full">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger 
              value="want"
              className="bg-gray-900/60 text-gray-300 border border-gray-800/80 hover:bg-gray-800/70 hover:text-white data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=active]:border-orange-500/60"
            >
              <Bookmark className="w-4 h-4 mr-2" />
              Want to Watch ({wantToWatch.length})
            </TabsTrigger>
            <TabsTrigger 
              value="watched"
              className="bg-gray-900/60 text-gray-300 border border-gray-800/80 hover:bg-gray-800/70 hover:text-white data-[state=active]:bg-orange-600 data-[state=active]:text-white data-[state=active]:border-orange-500/60"
            >
              <Check className="w-4 h-4 mr-2" />
              Watched ({watched.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="want" className="mt-8">
            {wantToWatch.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {wantToWatch.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl">
                <Bookmark className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No movies in your watchlist yet</p>
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Browse Movies
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="watched" className="mt-8">
            {watched.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {watched.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl">
                <Check className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">No watched movies yet</p>
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Browse Movies
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
