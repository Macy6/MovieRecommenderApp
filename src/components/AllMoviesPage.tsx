import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { loadCatalog, ALL_TAGS } from "../data/catalog";
import { MovieCard } from "./MovieCard";
import { Checkbox } from "./ui/checkbox";
import { AppHeader } from "./AppHeader";

export function AllMoviesPage() {
  const movies = useMemo(() => loadCatalog(), []);
  const genres = ALL_TAGS;

  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "year" | "title">("rating");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = movies
    .filter((m) =>
      query.trim() === ""
        ? true
        : m.title.toLowerCase().includes(query.toLowerCase())
    )
    .filter((m) => {
      const tags = (m as any).tags ?? (m as any).genres ?? [];
      return selectedTags.length === 0
        ? true
        : selectedTags.some((t) => tags.includes(t));
    })
    .sort((a, b) => {
      if (sortBy === "rating") return (b.rating ?? 0) - (a.rating ?? 0);
      if (sortBy === "year") return (b.year ?? 0) - (a.year ?? 0);
      return a.title.localeCompare(b.title);
    });

  return (
    <div className="min-h-screen">
      <AppHeader />

      {/* Roomy page padding */}
      <div className="container mx-auto px-6 py-20">
        {/* Force side-by-side layout */}
        <div className="flex flex-row items-start gap-11">
          {/* Left filter */}
          <aside className="w-72 sticky top-24 self-start flex-shrink-0">
            <div className="bg-gradient-to-br from-gray-900/70 to-gray-950/70 border border-gray-800/60 rounded-xl">
              <div className="p-5">
                <h3 className="text-white text-lg mb-4">Filter</h3>

                <div className="mb-6">
                  <label className="text-gray-300 text-sm block mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search titles..."
                      className="w-full bg-gray-950/40 border border-gray-800 rounded-lg py-2 pl-12 pr-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-300 text-sm block mb-2">
                    Genres
                  </label>
                  <div className="space-y-2 max-h-[28rem] overflow-y-auto pr-1">
                    {genres.map((tag) => (
                      <label
                        key={tag}
                        className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white"
                      >
                        <Checkbox
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={() => toggleTag(tag)}
                        />
                        <span>{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main movies area */}
          <main className="flex-1 min-w-0">
            {/* padded container */}
            <div className="bg-gradient-to-br from-gray-900/30 to-gray-950/30 border border-gray-800/40 rounded-2xl p-8 md:p-10 lg:p-12">
              <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl text-white">
                  All Movies{" "}
                  <span className="text-gray-500 text-base">({filtered.length})</span>
                </h1>

                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Sort</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-gray-900/80 border border-gray-700/80 text-white rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50"
                  >
                    <option value="rating">Rating</option>
                    <option value="year">Year</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>

              {filtered.length > 0 ? (
                <div className="pt-4 pb-14">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {filtered.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/40 rounded-xl">
                  <p className="text-gray-400">No results found.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}