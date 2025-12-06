import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

type MovieLike = {
  id: string | number;
  title: string;
  year?: number;
  type?: string;
  poster?: string;

  // legacy mock fields
  scores?: {
    rottenTomatoes: number;
    metacritic: number;
    letterboxd: number;
  };

  // new catalog field (IMDb rating out of 10)
  rating?: number;

  tags?: string[];
  genres?: string[];
};

interface MovieCardProps {
  movie: MovieLike;
}

export function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  const averageScore =
    movie.scores
      ? Math.round(
          (movie.scores.rottenTomatoes +
            movie.scores.metacritic +
            movie.scores.letterboxd * 20) / 3
        )
      : typeof movie.rating === 'number'
        ? Math.round(movie.rating * 10)
        : undefined;

  const displayType = movie.type ?? 'movie';

  return (
    <button
      type="button"
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="group w-full text-left"
    >
      <div className="relative overflow-hidden rounded-xl mb-3 aspect-[2/3] bg-gray-800">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
            No poster
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {averageScore !== undefined && (
          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-white">{averageScore}</span>
          </div>
        )}
      </div>

      <div className="space-y-1">
        <h3 className="text-white group-hover:text-orange-500 transition-colors line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-gray-400">
          {movie.year !== undefined && <span>{movie.year}</span>}
          <span>•</span>
          <span className="capitalize">{displayType}</span>
        </div>
      </div>
    </button>
  );
}
