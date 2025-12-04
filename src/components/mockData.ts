export interface Movie {
  id: number;
  title: string;
  year: number;
  poster: string;
  genres: string[];
  synopsis: string;
  scores: {
    rottenTomatoes: number;
    metacritic: number;
    letterboxd: number;
  };
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
  };
  platforms: string[];
  type: 'movie' | 'tv';
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Oppenheimer",
    year: 2023,
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    genres: ["Biography", "Drama", "History"],
    synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    scores: { rottenTomatoes: 93, metacritic: 90, letterboxd: 4.2 },
    sentiment: { positive: 75, neutral: 20, negative: 5 },
    platforms: ["Netflix", "Prime Video", "Apple TV+"],
    type: "movie"
  },
  {
    id: 2,
    title: "The Last of Us",
    year: 2023,
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    genres: ["Drama", "Sci-Fi", "Thriller"],
    synopsis: "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
    scores: { rottenTomatoes: 96, metacritic: 84, letterboxd: 4.4 },
    sentiment: { positive: 82, neutral: 15, negative: 3 },
    platforms: ["Max", "HBO"],
    type: "tv"
  },
  {
    id: 3,
    title: "Dune: Part Two",
    year: 2024,
    poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    synopsis: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    scores: { rottenTomatoes: 92, metacritic: 79, letterboxd: 4.3 },
    sentiment: { positive: 78, neutral: 18, negative: 4 },
    platforms: ["Prime Video", "Apple TV+"],
    type: "movie"
  },
  {
    id: 4,
    title: "The Bear",
    year: 2023,
    poster: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=600&fit=crop",
    genres: ["Drama", "Comedy"],
    synopsis: "A young chef from the fine dining world returns to Chicago to run his family's sandwich shop.",
    scores: { rottenTomatoes: 99, metacritic: 88, letterboxd: 4.1 },
    sentiment: { positive: 85, neutral: 12, negative: 3 },
    platforms: ["Hulu", "Disney+"],
    type: "tv"
  },
  {
    id: 5,
    title: "Killers of the Flower Moon",
    year: 2023,
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
    genres: ["Crime", "Drama", "History"],
    synopsis: "Members of the Osage tribe in Oklahoma are murdered under mysterious circumstances in the 1920s, sparking a major FBI investigation.",
    scores: { rottenTomatoes: 93, metacritic: 89, letterboxd: 4.0 },
    sentiment: { positive: 72, neutral: 22, negative: 6 },
    platforms: ["Apple TV+", "Paramount+"],
    type: "movie"
  },
  {
    id: 6,
    title: "Succession",
    year: 2023,
    poster: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=600&fit=crop",
    genres: ["Drama"],
    synopsis: "The Roy family controls one of the biggest media and entertainment conglomerates in the world as they contemplate their future.",
    scores: { rottenTomatoes: 97, metacritic: 92, letterboxd: 4.5 },
    sentiment: { positive: 88, neutral: 10, negative: 2 },
    platforms: ["Max", "HBO"],
    type: "tv"
  },
  {
    id: 7,
    title: "Past Lives",
    year: 2023,
    poster: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=600&fit=crop",
    genres: ["Drama", "Romance"],
    synopsis: "Two childhood friends are reunited after 24 years, exploring themes of destiny, love, and the choices that shape our lives.",
    scores: { rottenTomatoes: 95, metacritic: 94, letterboxd: 4.3 },
    sentiment: { positive: 80, neutral: 16, negative: 4 },
    platforms: ["Prime Video", "Paramount+"],
    type: "movie"
  },
  {
    id: 8,
    title: "The Batman",
    year: 2022,
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop",
    genres: ["Action", "Crime", "Drama"],
    synopsis: "Batman ventures into Gotham City's underworld when a sadistic killer leaves behind a trail of cryptic clues.",
    scores: { rottenTomatoes: 85, metacritic: 72, letterboxd: 3.9 },
    sentiment: { positive: 70, neutral: 23, negative: 7 },
    platforms: ["Max", "HBO"],
    type: "movie"
  },
  {
    id: 9,
    title: "Wednesday",
    year: 2022,
    poster: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=400&h=600&fit=crop",
    genres: ["Comedy", "Horror", "Mystery"],
    synopsis: "Wednesday Addams attempts to master her emerging psychic ability while solving a supernatural mystery at Nevermore Academy.",
    scores: { rottenTomatoes: 72, metacritic: 68, letterboxd: 3.5 },
    sentiment: { positive: 65, neutral: 28, negative: 7 },
    platforms: ["Netflix"],
    type: "tv"
  },
  {
    id: 10,
    title: "Everything Everywhere All at Once",
    year: 2022,
    poster: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=600&fit=crop",
    genres: ["Action", "Adventure", "Sci-Fi"],
    synopsis: "An aging Chinese immigrant is swept up in an insane adventure where she alone can save the multiverse.",
    scores: { rottenTomatoes: 95, metacritic: 81, letterboxd: 4.4 },
    sentiment: { positive: 85, neutral: 12, negative: 3 },
    platforms: ["Netflix", "Prime Video"],
    type: "movie"
  },
  {
    id: 11,
    title: "Stranger Things",
    year: 2022,
    poster: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=600&fit=crop",
    genres: ["Drama", "Fantasy", "Horror"],
    synopsis: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
    scores: { rottenTomatoes: 91, metacritic: 78, letterboxd: 4.0 },
    sentiment: { positive: 76, neutral: 19, negative: 5 },
    platforms: ["Netflix"],
    type: "tv"
  },
  {
    id: 12,
    title: "Poor Things",
    year: 2023,
    poster: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop",
    genres: ["Comedy", "Drama", "Romance"],
    synopsis: "The incredible tale of Bella Baxter, a young woman brought back to life by a brilliant and unorthodox scientist.",
    scores: { rottenTomatoes: 92, metacritic: 87, letterboxd: 4.1 },
    sentiment: { positive: 74, neutral: 20, negative: 6 },
    platforms: ["Hulu", "Disney+"],
    type: "movie"
  }
];

export const genres = [
  "Action", "Adventure", "Animation", "Biography", "Comedy", 
  "Crime", "Drama", "Fantasy", "History", "Horror", 
  "Mystery", "Romance", "Sci-Fi", "Thriller", "Western"
];

export const streamingPlatforms = [
  "Netflix", "Prime Video", "Max", "HBO", "Disney+", 
  "Hulu", "Apple TV+", "Paramount+"
];
