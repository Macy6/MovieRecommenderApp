import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Movie } from './mockData';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="group w-full text-left"
    >
      <div className="relative overflow-hidden rounded-xl mb-3 aspect-[2/3] bg-gray-800">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="space-y-1">
        <h3 className="text-white group-hover:text-orange-500 transition-colors line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-gray-400">
          <span>{movie.year}</span>
          <span>•</span>
          <span className="capitalize">{movie.type}</span>
        </div>
      </div>
    </button>
  );
}