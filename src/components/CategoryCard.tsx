import Link from 'next/link';
import type { Category, Photo } from '@/lib/types';

export function CategoryCard({
  category,
  photoCount,
  coverPhoto
}: {
  category: Category;
  photoCount: number;
  coverPhoto?: Photo;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block no-underline overflow-hidden relative bg-ink"
      style={{ aspectRatio: '4/3' }}
    >
      {/* Background image */}
      {coverPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={coverPhoto.image}
          alt={coverPhoto.alt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-75 transition-all duration-700 ease-out group-hover:opacity-85 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 bg-river-deep/40" />
      )}

      {/* Gradient overlay — text legibility at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />

      {/* Text — pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <div className="archive-label text-wood-pale mb-1">
          {photoCount} {photoCount === 1 ? 'photograph' : 'photographs'}
        </div>
        <h3 className="font-serif text-xl sm:text-2xl text-cream-soft leading-tight group-hover:text-white transition-colors">
          {category.title}
        </h3>
      </div>
    </Link>
  );
}
