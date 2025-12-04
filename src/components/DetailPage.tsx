import { useParams, useNavigate } from 'react-router-dom';
import { Film, Calendar, Star, Bookmark, Check, Play } from 'lucide-react';
import { movies } from './mockData';
import { Button } from './ui/button';
import { useWatchlist } from './WatchlistContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInWatchlist, addToWatchlist, getStatus, moveToWatched } = useWatchlist();
  
  const movie = movies.find(m => m.id === Number(id));
  
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Movie not found</p>
      </div>
    );
  }

  const sentimentData = [
    { name: 'Positive', value: movie.sentiment.positive, color: '#22c55e' },
    { name: 'Neutral', value: movie.sentiment.neutral, color: '#6b7280' },
    { name: 'Negative', value: movie.sentiment.negative, color: '#ef4444' },
  ];

  const recommendations = movies
    .filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
    .slice(0, 6);

  const inWatchlist = isInWatchlist(movie.id);
  const status = getStatus(movie.id);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-50 bg-gray-950/80">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-8 h-8 text-orange-500" />
            <span className="text-xl text-white">CineScope</span>
          </div>
          <nav className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-gray-300 hover:text-white"
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/watchlist')}
              className="text-gray-300 hover:text-white"
            >
              Watchlist
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-full h-full object-cover blur-2xl"
          />
        </div>
        
        <div className="relative container mx-auto px-6 h-full flex items-end pb-12">
          <div className="flex gap-8 items-end">
            {/* Poster */}
            <div className="w-64 flex-shrink-0">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl"
              />
            </div>

            {/* Info */}
            <div className="flex-1 pb-4 space-y-4">
              <div className="space-y-2">
                <h1 className="text-5xl text-white">{movie.title}</h1>
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.year}</span>
                  </div>
                  <span>•</span>
                  <span className="capitalize">{movie.type}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-gray-800/80 border border-gray-700 rounded-full text-gray-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {!inWatchlist ? (
                  <>
                    <Button
                      onClick={() => addToWatchlist(movie.id, 'want')}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Bookmark className="w-4 h-4 mr-2" />
                      Want to Watch
                    </Button>
                    <Button
                      onClick={() => addToWatchlist(movie.id, 'watched')}
                      variant="outline"
                      className="border-gray-700 text-white hover:bg-gray-800"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Mark as Watched
                    </Button>
                  </>
                ) : status === 'want' ? (
                  <Button
                    onClick={() => moveToWatched(movie.id)}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Mark as Watched
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="bg-gray-700"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Watched
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Synopsis */}
            <div>
              <h2 className="text-2xl text-white mb-4">Synopsis</h2>
              <p className="text-gray-400 leading-relaxed">{movie.synopsis}</p>
            </div>

            {/* Aggregated Scores */}
            <div>
              <h2 className="text-2xl text-white mb-6">Aggregated Scores</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-xl p-6 text-center">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Rotten_Tomatoes.svg" 
                    alt="Rotten Tomatoes"
                    className="h-8 mx-auto mb-3 opacity-80"
                  />
                  <div className="text-3xl text-white mb-1">{movie.scores.rottenTomatoes}%</div>
                  <div className="text-gray-400">Rotten Tomatoes</div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-xl p-6 text-center">
                  <div className="h-8 flex items-center justify-center mb-3">
                    <span className="text-xl text-orange-500">MC</span>
                  </div>
                  <div className="text-3xl text-white mb-1">{movie.scores.metacritic}</div>
                  <div className="text-gray-400">Metacritic</div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-xl p-6 text-center">
                  <Star className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                  <div className="text-3xl text-white mb-1">{movie.scores.letterboxd}</div>
                  <div className="text-gray-400">Letterboxd</div>
                </div>
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div>
              <h2 className="text-2xl text-white mb-6">Sentiment Analysis</h2>
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-xl p-8">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Where to Watch */}
            <div>
              <h2 className="text-2xl text-white mb-4">Where to Watch</h2>
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-xl p-6 space-y-3">
                {movie.platforms.map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700/50"
                  >
                    <span className="text-white">{platform}</span>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      <Play className="w-4 h-4 mr-1" />
                      Watch
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl text-white mb-8">You May Also Like</h2>
          <div className="overflow-x-auto pb-4 -mx-6 px-6">
            <div className="flex gap-6 min-w-max">
              {recommendations.map((rec) => (
                <div key={rec.id} className="w-[200px] flex-shrink-0">
                  <button
                    onClick={() => navigate(`/movie/${rec.id}`)}
                    className="group w-full text-left"
                  >
                    <div className="relative overflow-hidden rounded-xl mb-3 aspect-[2/3] bg-gray-800">
                      <img
                        src={rec.poster}
                        alt={rec.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-white group-hover:text-orange-500 transition-colors line-clamp-1">
                      {rec.title}
                    </h3>
                    <p className="text-gray-400">{rec.year}</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
