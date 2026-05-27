import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosters, getPosterBySlug, buildPosterView, getAdjacentPosters, getPosterUrl } from '@/lib/content';
import { PosterPhotoSequence } from '@/components/PosterPhotoSequence';
import { QRCodeDownload } from '@/components/QRCodeDownload';
import { RiverDivider } from '@/components/RiverDivider';
import { DorisAttribution } from '@/components/DorisAttribution';

export async function generateStaticParams() {
  return getAllPosters().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const poster = getPosterBySlug(slug);
  if (!poster) return {};
  return {
    title: poster.title,
    description: poster.description,
    openGraph: {
      title: poster.title,
      description: poster.description,
      images: poster.poster_image ? [poster.poster_image] : []
    }
  };
}

export default async function PosterDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const poster = getPosterBySlug(slug);
  if (!poster) notFound();

  const view = buildPosterView(poster);
  const { prev, next } = getAdjacentPosters(slug);
  const qrUrl = getPosterUrl(poster);

  return (
    <article className="mx-auto max-w-gallery px-5 sm:px-8 py-12">
      <div className="archive-label text-wood-dark">
        <Link href="/posters" className="no-underline hover:underline">Wall posters</Link> · {poster.title}
      </div>
      <h1 className="font-serif text-4xl sm:text-5xl text-river-deep mt-2 leading-tight">{poster.title}</h1>
      <div className="mt-3 archive-label text-wood-dark">
        {view.orderedPhotos.length} photographs{poster.display_date ? ` · ${poster.display_date}` : ''}
        {poster.physical_location ? ` · ${poster.physical_location}` : ''}
      </div>

      <div className="mt-8 grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
        <div>
          <p className="text-lg text-ink-soft archive-prose">{poster.description}</p>
          <DorisAttribution variant="block" />
          {view.categories.length > 0 && (
            <div className="mt-6">
              <div className="archive-label text-wood-dark">In categories</div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {view.categories.map((c) => (
                  <Link key={c.id} href={`/categories/${c.slug}`} className="no-underline hover:underline text-river-deep">{c.title}</Link>
                ))}
              </div>
            </div>
          )}
          {poster.poster_pdf && (
            <p className="mt-6 text-sm text-ink-mute">
              <a href={poster.poster_pdf} className="no-underline hover:underline">↓ Download the printed poster (PDF)</a>
            </p>
          )}
        </div>
        <aside className="space-y-6 min-w-0">
          {poster.poster_image && (
            <div className="bg-cream-soft border border-wood/30 p-3 overflow-hidden">
              <div className="archive-label text-wood-dark mb-2 px-1">The printed poster</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={poster.poster_image} alt={`Printed poster: ${poster.title}`} className="w-full max-w-full h-auto block" />
            </div>
          )}
          <QRCodeDownload url={qrUrl} slug={poster.slug} title={poster.title} />
        </aside>
      </div>

      <RiverDivider variant="ornament" label="On the wall, in this order" />

      <PosterPhotoSequence posterView={view} />

      <RiverDivider />

      <nav aria-label="Adjacent posters" className="flex justify-between gap-6 text-sm">
        {prev ? (
          <Link href={`/posters/${prev.slug}`} className="block no-underline hover:underline max-w-[45%]">
            <div className="archive-label text-wood-dark">← Previous poster</div>
            <div className="mt-1 font-serif text-lg text-river-deep">{prev.title}</div>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/posters/${next.slug}`} className="block text-right no-underline hover:underline max-w-[45%]">
            <div className="archive-label text-wood-dark">Next poster →</div>
            <div className="mt-1 font-serif text-lg text-river-deep">{next.title}</div>
          </Link>
        ) : <div />}
      </nav>
    </article>
  );
}
