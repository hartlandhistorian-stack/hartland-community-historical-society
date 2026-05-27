import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPhotos, getPhotoBySlug, buildPhotoView } from '@/lib/content';
import { MetadataPanel } from '@/components/MetadataPanel';
import { RiverDivider } from '@/components/RiverDivider';
import { PhotoCard } from '@/components/PhotoCard';

export async function generateStaticParams() {
  return getAllPhotos().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const photo = getPhotoBySlug(slug);
  if (!photo) return {};
  return {
    title: photo.title,
    description: photo.description.slice(0, 240),
    openGraph: {
      title: photo.title,
      description: photo.description.slice(0, 240),
      images: [photo.image],
      type: 'article'
    }
  };
}

export default async function PhotoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const photo = getPhotoBySlug(slug);
  if (!photo) notFound();

  const view = buildPhotoView(photo);

  return (
    <article className="mx-auto max-w-gallery px-5 sm:px-8 py-12">
      <div className="archive-label text-wood-dark">
        <Link href="/collection" className="no-underline hover:underline">Collection</Link>
        {view.categories[0] && (
          <>
            {' · '}
            <Link href={`/categories/${view.categories[0].slug}`} className="no-underline hover:underline">
              {view.categories[0].title}
            </Link>
          </>
        )}
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl text-river-deep mt-2 leading-tight max-w-prose">
        {photo.title}
      </h1>

      <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
        <figure>
          <div className="photo-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.image} alt={photo.alt} className="w-full h-auto" />
          </div>
          <figcaption className="mt-6 archive-prose max-w-prose text-ink-soft">
            <p>{photo.description}</p>
            {photo.annotation_author && (
              <p className="text-sm text-ink-mute mt-3">
                — annotation by {photo.annotation_author}
              </p>
            )}
          </figcaption>
        </figure>
        <MetadataPanel photo={view} />
      </div>

      {view.relatedPhotos.length > 0 && (
        <>
          <RiverDivider variant="ornament" label="Related" />
          <div className="grid gap-7 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {view.relatedPhotos.map((p) => (
              <PhotoCard key={p.id} photo={p} />
            ))}
          </div>
        </>
      )}
    </article>
  );
}
