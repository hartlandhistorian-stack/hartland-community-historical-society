import type { Metadata } from 'next';
import { getAllCategories, getAllPhotos, getPhotosByCategorySlug } from '@/lib/content';
import { CategoryCard } from '@/components/CategoryCard';
import { RiverDivider } from '@/components/RiverDivider';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse the Doris Kennedy Collection by theme — river life, bridges, mills, churches, fires, floods, schools, and more.'
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const photos = getAllPhotos();

  return (
    <div className="mx-auto max-w-gallery px-5 sm:px-8 py-12">
      <div className="archive-label text-wood-dark">Browse by category</div>
      <h1 className="font-serif text-4xl text-river-deep mt-2 leading-tight">
        Themes across the valley.
      </h1>
      <p className="mt-3 text-ink-soft max-w-prose">
        The collection arranged by subject. Each category gathers all photographs in that theme,
        across every wall poster.
      </p>

      <RiverDivider />

      <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const inCat = getPhotosByCategorySlug(c.slug);
          const cover = c.cover_photo_id ? photos.find((p) => p.id === c.cover_photo_id) : inCat[0];
          return (
            <CategoryCard key={c.id} category={c} photoCount={inCat.length} coverPhoto={cover} />
          );
        })}
      </div>
    </div>
  );
}
