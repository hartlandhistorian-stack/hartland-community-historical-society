import Link from 'next/link';
import type { Photo } from '@/lib/types';

export function PhotoCard({ photo, label }: { photo: Photo; label?: string | number }) {
  return (
    <Link
      href={`/photos/${photo.slug}`}
      className="group block no-underline focus:outline-none"
      aria-label={photo.alt}
    >
      <div className="photo-frame relative overflow-hidden">
        {label !== undefined && (
          <span
            aria-hidden
            className="absolute top-2 left-2 z-10 inline-flex items-center justify-center min-w-[1.75rem] h-[1.75rem] px-1.5 bg-river-deep text-cream-soft text-[0.7rem] font-semibold tabular-nums tracking-wide"
          >
            {label}
          </span>
        )}
        <div className="aspect-[4/3] bg-cream-deep overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.image}
            alt={photo.alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
      </div>

      {/* Caption — archival label treatment */}
      <div className="mt-2.5 px-0.5">
        <h3 className="font-serif text-[1rem] leading-snug text-river-deep group-hover:text-river transition-colors duration-150">
          {photo.title}
        </h3>
        <p className="mt-0.5 text-[0.78rem] text-ink-mute tracking-wide">
          {photo.estimated_date && photo.date && !photo.date.startsWith('circa') ? 'circa ' : ''}
          {photo.date}
          {photo.location && photo.location !== 'Hartland, NB' ? ` · ${photo.location.split(',')[0]}` : ''}
        </p>
      </div>
    </Link>
  );
}
