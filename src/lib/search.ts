import type { Photo, Category, Poster } from './types';

/**
 * Lightweight in-memory search over photo title, description, location, people,
 * tags, and Doris Kennedy's annotations. No external search dependency — the
 * collection is small (~hundreds of photos at most) so this is fast enough.
 *
 * Match scoring is intentionally simple: substring matches on lower-cased
 * fields. Title matches outrank description matches outrank tag matches.
 */

export interface SearchResult {
  photo: Photo;
  score: number;
  matchedOn: string[];
}

function tokens(q: string): string[] {
  return q
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1);
}

export function searchPhotos(
  query: string,
  photos: Photo[],
  filter?: { categoryId?: string; posterId?: string }
): SearchResult[] {
  const q = query.trim().toLowerCase();
  const ts = tokens(q);
  const filtered = photos.filter((p) => {
    if (filter?.categoryId && !p.category_ids.includes(filter.categoryId)) return false;
    if (filter?.posterId && !(p.poster_ids ?? []).includes(filter.posterId)) return false;
    return true;
  });

  if (ts.length === 0) {
    return filtered.map((photo) => ({ photo, score: 1, matchedOn: [] }));
  }

  const results: SearchResult[] = [];
  for (const photo of filtered) {
    const haystacks: Array<[string, string, number]> = [
      ['title', photo.title.toLowerCase(), 10],
      ['location', (photo.location ?? '').toLowerCase(), 6],
      ['people', (photo.people ?? []).join(' ').toLowerCase(), 5],
      ['description', photo.description.toLowerCase(), 4],
      ['tags', (photo.tags ?? []).join(' ').toLowerCase(), 3],
      ['date', (photo.date ?? '').toLowerCase(), 2]
    ];
    let score = 0;
    const matchedOn = new Set<string>();
    for (const t of ts) {
      for (const [field, hay, weight] of haystacks) {
        if (hay.includes(t)) {
          score += weight;
          matchedOn.add(field);
        }
      }
    }
    if (score > 0) results.push({ photo, score, matchedOn: [...matchedOn] });
  }
  return results.sort((a, b) => b.score - a.score);
}

export function searchAll(
  query: string,
  data: { photos: Photo[]; categories: Category[]; posters: Poster[] }
): {
  photos: SearchResult[];
  categories: Category[];
  posters: Poster[];
} {
  const q = query.trim().toLowerCase();
  if (!q) return { photos: [], categories: [], posters: [] };
  return {
    photos: searchPhotos(query, data.photos),
    categories: data.categories.filter(
      (c) =>
        c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    ),
    posters: data.posters.filter(
      (p) =>
        p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    )
  };
}
