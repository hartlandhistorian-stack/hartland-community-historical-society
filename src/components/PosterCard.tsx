import Link from 'next/link';
import type { Poster } from '@/lib/types';

export function PosterCard({ poster, photoCount }: { poster: Poster; photoCount: number }) {
  return (
    <Link
      href={`/posters/${poster.slug}`}
      className="group block no-underline focus:outline-none"
    >
      {/* Poster image — shadow depth to feel like a pinned print */}
      <div
        className="relative overflow-hidden bg-ink"
        style={{ aspectRatio: '3/4' }}
      >
        {poster.poster_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster.poster_image}
            alt={`Printed poster: ${poster.title}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex items-center justify-center h-full px-6 text-center">
            <span className="font-serif text-cream-soft text-lg italic">{poster.title}</span>
          </div>
        )}
        {/* Hover vignette */}
        <div className="absolute inset-0 bg-river-deep/0 group-hover:bg-river-deep/10 transition-colors duration-300" />
      </div>

      {/* Card caption — below the poster image */}
      <div className="mt-3 px-0.5">
        <div className="archive-label text-wood-dark">
          {photoCount} {photoCount === 1 ? 'photograph' : 'photographs'}
          {poster.display_date ? ` · ${poster.display_date}` : ''}
        </div>
        <h3 className="font-serif text-lg leading-snug text-river-deep mt-1 group-hover:text-river transition-colors duration-150">
          {poster.title}
        </h3>
        <p className="mt-1 text-sm text-ink-soft line-clamp-2">{poster.description}</p>
      </div>
    </Link>
  );
}
