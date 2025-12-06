import Papa from "papaparse";
import top100Csv from "./imdb_most_popular_top_100.csv?raw";
import tagsList from "./tags.json";
import tagScoreData from "./movies.json";

export type Movie = {
  id: string;
  title: string;
  year?: number;
  rating?: number;        // IMDb rating
  ratingCount?: number;
  imdbUrl?: string;
  summary?: string;
  poster?: string;
  tags: string[];
  tagScores?: number[];   // aligned with tagScoreData.tags
};

type CsvRow = {
  Title: string;
  Year?: string | number;
  Rating?: string | number;
  RatingCount?: string | number;
  URL?: string;
  Summary?: string;
  Cover?: string;
};

type TagsEntry = { title: string; tags: string[] };

function toNum(v: any) {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function extractImdbId(url?: string) {
  if (!url) return undefined;
  const m = url.match(/tt\d+/);
  return m?.[0];
}

const tagsByTitle = new Map(
  (tagsList as TagsEntry[]).map(t => [t.title.toLowerCase(), t.tags])
);

// movies.json has shape { tags: string[], ratings: { title, scores[] }[] }
const scoreByTitle = new Map(
  (tagScoreData.ratings ?? []).map((r: any) => [String(r.title).toLowerCase(), r.scores])
);

export const ALL_TAGS: string[] =
  Array.from(
    new Set((tagsList as TagsEntry[]).flatMap(t => t.tags))
  ).sort();

export function loadCatalog(): Movie[] {
  const parsed = Papa.parse<CsvRow>(top100Csv, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = parsed.data.filter(r => r?.Title);

  return rows.map((r) => {
    const title = String(r.Title).trim();
    const imdbId = extractImdbId(r.URL);
    const year = toNum(r.Year);

    const mergedTags = tagsByTitle.get(title.toLowerCase()) ?? [];
    const mergedScores = scoreByTitle.get(title.toLowerCase());

    return {
      id: imdbId ?? `${title}-${year ?? "unknown"}`.toLowerCase().replace(/\s+/g, "-"),
      title,
      year,
      rating: toNum(r.Rating),
      ratingCount: toNum(r.RatingCount),
      imdbUrl: r.URL,
      summary: r.Summary,
      poster: r.Cover,
      tags: mergedTags,
      tagScores: mergedScores,
    };
  });
}
