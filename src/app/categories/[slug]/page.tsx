import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllCategories, getCategoryBySlug, getPhotosByCategorySlug, getPostersByCategorySlug } from '@/lib/content';
import { PhotoGrid } from '@/components/PhotoGrid';
import { PosterCard } from '@/components/PosterCard';
import { RiverDivider } from '@/components/RiverDivider';

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.description
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const photos = getPhotosByCategorySlug(slug);
  const posters = getPostersByCategorySlug(slug);

  return (
    <article className="mx-auto max-w-gallery px-5 sm:px-8 py-12">
      <div className="archive-label text-wood-dark">
        <Link href="/categories" className="no-underline hover:underline">Categories</Link> · {category.title}
      </div>
      <h1 className="font-serif text-4xl text-river-deep mt-2 leading-tight">{category.title}</h1>
      <p className="mt-4 text-ink-soft max-w-prose archive-prose">{category.description}</p>

      {posters.length > 0 && (
        <>
          <RiverDivider variant="ornament" label="Posters in this category" />
          <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {posters.map((p) => (
              <PosterCard key={p.id} poster={p} photoCount={p.photo_sequence.length} />
            ))}
          </div>
        </>
      )}

      <RiverDivider variant="ornament" label={`${photos.length} ${photos.length === 1 ? 'photograph' : 'photographs'}`} />

      <PhotoGrid
        photos={photos}
        emptyMessage="This category is awaiting its first photographs. If you have one to contribute, please get in touch."
      />
    </article>
  );
}
