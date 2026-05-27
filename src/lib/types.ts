/**
 * Content model for the Doris Kennedy Collection.
 *
 * These types mirror the JSON files under /content. A volunteer editing a JSON file
 * does not need to read this file — but if they want to know which fields are
 * required and which are optional, this is the source of truth.
 *
 * Required fields are not optional in TypeScript (no `?`). Anything marked optional
 * here can be omitted from the JSON.
 */

export type EntityId = string;
export type Slug = string;

/**
 * A single historical photograph from the collection.
 * One JSON file per photo, stored in /content/photos/<slug>.json.
 */
export interface Photo {
  id: EntityId;
  slug: Slug;
  title: string;
  /** Path relative to /public, e.g. "/images/photos/ferry-1935.jpg". */
  image: string;
  /** Optional smaller image for grids; falls back to `image` if omitted. */
  thumbnail?: string;
  /** Doris Kennedy's annotation in full — the heart of the archive. */
  description: string;
  /** Defaults to "Doris Kennedy" if omitted. */
  annotation_author?: string;
  /** Display date — may be exact or include "circa". */
  date: string;
  /** Set to true when the date is uncertain; UI will display "circa". */
  estimated_date?: boolean;
  location?: string;
  latitude?: number;
  longitude?: number;
  /** Identified people in the photo. Use "Unidentified" for unknowns. */
  people?: string[];
  category_ids: EntityId[];
  tags?: string[];
  /** Where the photo physically came from (album, donor, archive box). */
  source?: string;
  /** Credit line as it should appear, e.g. "Doris Kennedy Collection". */
  credit?: string;
  /** Rights statement, e.g. "Used with permission". */
  rights?: string;
  /** Posters this photo appears on. Position is defined on the poster. */
  poster_ids?: EntityId[];
  related_photo_ids?: EntityId[];
  /** Required alt text for screen readers. */
  alt: string;
}

export interface Category {
  id: EntityId;
  slug: Slug;
  title: string;
  description: string;
  /** Photo whose image is used as the category banner. */
  cover_photo_id?: EntityId;
  /** Lower numbers sort first. */
  sort_order?: number;
}

/**
 * A poster sequence entry. Order is determined by `display_order`, but
 * `row`/`column` are preserved so future layouts (or the admin) can show a
 * grid that mirrors the physical poster.
 */
export interface PosterPhotoEntry {
  photo_id: EntityId;
  row: number;
  column: number;
  display_order: number;
  /**
   * Optional per-poster description. If present, takes precedence over the
   * photo's general description on this poster's page.
   */
  description_override?: string;
}

export interface Poster {
  id: EntityId;
  slug: Slug;
  title: string;
  description: string;
  /** Where the physical poster is displayed (library, town hall, etc.). */
  physical_location?: string;
  /** Date the poster was/will be displayed publicly. */
  display_date?: string;
  /** Optional photo of the full physical poster (for previews). */
  poster_image?: string;
  /** Optional path to the source poster PDF, e.g. "/posters/becaguimic-mill.pdf". */
  poster_pdf?: string;
  /**
   * URL the QR code points to. If omitted, the build computes
   * `${NEXT_PUBLIC_SITE_URL}/posters/${slug}`.
   */
  qr_url?: string;
  category_ids?: EntityId[];
  photo_sequence: PosterPhotoEntry[];
  /** Curator's notes / acknowledgements. */
  notes?: string;
}

/** A photo enriched with derived fields used in UI. */
export interface PhotoView extends Photo {
  categories: Category[];
  posters: Poster[];
  relatedPhotos: Photo[];
}

/** A poster enriched with the ordered photos in display sequence. */
export interface PosterView extends Poster {
  orderedPhotos: Array<{ entry: PosterPhotoEntry; photo: Photo; numericLabel: number }>;
  categories: Category[];
}
