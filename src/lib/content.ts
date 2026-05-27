import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type {
  Category,
  Photo,
  Poster,
  PosterView,
  PhotoView,
  PosterPhotoEntry
} from './types';

/**
 * Filesystem-backed content loader.
 *
 * Volunteers add or edit content by dropping JSON files into:
 *   /content/photos/<slug>.json
 *   /content/categories/<slug>.json
 *   /content/posters/<slug>.json
 *
 * Loaders are memoised at module level so a full static build only reads the
 * filesystem once. In dev, the Next.js bundler invalidates this module when
 * source files change; content JSON edits require a page refresh.
 */

const CONTENT_ROOT = join(process.cwd(), 'content');

function readJsonDir<T>(subdir: string): T[] {
  const dir = join(CONTENT_ROOT, subdir);
  let files: string[];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.json'));
  } catch {
    return [];
  }
  return files
    .map((f) => {
      const raw = readFileSync(join(dir, f), 'utf8');
      try {
        return JSON.parse(raw) as T;
      } catch (err) {
        throw new Error(`Invalid JSON in ${subdir}/${f}: ${(err as Error).message}`);
      }
    })
    .sort((a, b) => {
      const sa = (a as { sort_order?: number }).sort_order ?? 0;
      const sb = (b as { sort_order?: number }).sort_order ?? 0;
      if (sa !== sb) return sa - sb;
      const ta = (a as { title?: string }).title ?? '';
      const tb = (b as { title?: string }).title ?? '';
      return ta.localeCompare(tb);
    });
}

let photoCache: Photo[] | null = null;
let categoryCache: Category[] | null = null;
let posterCache: Poster[] | null = null;

export function getAllPhotos(): Photo[] {
  if (!photoCache) photoCache = readJsonDir<Photo>('photos');
  return photoCache;
}

export function getAllCategories(): Category[] {
  if (!categoryCache) categoryCache = readJsonDir<Category>('categories');
  return categoryCache;
}

export function getAllPosters(): Poster[] {
  if (!posterCache) posterCache = readJsonDir<Poster>('posters');
  return posterCache;
}

export function getPhotoBySlug(slug: string): Photo | undefined {
  return getAllPhotos().find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getAllCategories().find((c) => c.slug === slug);
}

export function getPosterBySlug(slug: string): Poster | undefined {
  return getAllPosters().find((p) => p.slug === slug);
}

export function getPhotosByCategorySlug(slug: string): Photo[] {
  const cat = getCategoryBySlug(slug);
  if (!cat) return [];
  return getAllPhotos().filter((p) => p.category_ids.includes(cat.id));
}

export function getPostersByCategorySlug(slug: string): Poster[] {
  const cat = getCategoryBySlug(slug);
  if (!cat) return [];
  return getAllPosters().filter((p) => (p.category_ids ?? []).includes(cat.id));
}

export function getPhotosByPosterId(posterId: string): Photo[] {
  return getAllPhotos().filter((p) => (p.poster_ids ?? []).includes(posterId));
}

/**
 * Sort poster entries by display_order, falling back to (row, column).
 * Numeric labels are assigned 1..N so the UI can show "1. ferry crossing" etc.
 * matching the order on the physical poster (left → right, top → bottom).
 */
function orderPosterEntries(entries: PosterPhotoEntry[]): PosterPhotoEntry[] {
  return [...entries].sort((a, b) => {
    if (a.display_order !== b.display_order) return a.display_order - b.display_order;
    if (a.row !== b.row) return a.row - b.row;
    return a.column - b.column;
  });
}

export function buildPosterView(poster: Poster): PosterView {
  const photos = getAllPhotos();
  const cats = getAllCategories();

  const ordered = orderPosterEntries(poster.photo_sequence).map((entry, i) => {
    const photo = photos.find((p) => p.id === entry.photo_id);
    if (!photo) {
      throw new Error(
        `Poster "${poster.slug}" references missing photo "${entry.photo_id}". ` +
          `Check /content/photos/ for a matching id.`
      );
    }
    return { entry, photo, numericLabel: i + 1 };
  });

  return {
    ...poster,
    orderedPhotos: ordered,
    categories: cats.filter((c) => (poster.category_ids ?? []).includes(c.id))
  };
}

export function buildPhotoView(photo: Photo): PhotoView {
  const cats = getAllCategories();
  const posters = getAllPosters();
  const photos = getAllPhotos();
  return {
    ...photo,
    categories: cats.filter((c) => photo.category_ids.includes(c.id)),
    posters: posters.filter((p) => (photo.poster_ids ?? []).includes(p.id)),
    relatedPhotos: photos.filter((p) => (photo.related_photo_ids ?? []).includes(p.id))
  };
}

/** The poster QR target URL, computed from env if not stored on the poster. */
export function getPosterUrl(poster: Poster): string {
  if (poster.qr_url) return poster.qr_url;
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hartlandhistorical.ca';
  return `${base.replace(/\/$/, '')}/posters/${poster.slug}`;
}

/** Previous / next poster navigation, sorted by display_date then title. */
export function getAdjacentPosters(slug: string): { prev?: Poster; next?: Poster } {
  const all = [...getAllPosters()].sort((a, b) => {
    const da = a.display_date ?? '';
    const db = b.display_date ?? '';
    if (da !== db) return da.localeCompare(db);
    return a.title.localeCompare(b.title);
  });
  const i = all.findIndex((p) => p.slug === slug);
  if (i < 0) return {};
  return { prev: all[i - 1], next: all[i + 1] };
}
