import type { Metadata } from 'next';
import { getAllPosters } from '@/lib/content';
import { PosterCard } from '@/components/PosterCard';
import { RiverDivider } from '@/components/RiverDivider';

export const metadata: Metadata = {
  title: 'Wall Posters & QR Pages',
  description: 'Every printed poster from the Hartland Community Library, each linked to a page that shows its photographs in exact wall order. Each poster has a QR code that lands here.'
};

export default function PostersIndexPage() {
  const posters = getAllPosters();
  return (
    <div className="mx-auto max-w-gallery px-5 sm:px-8 py-12">
      <div className="archive-label text-wood-dark">Wall posters &amp; QR pages</div>
      <h1 className="font-serif text-4xl text-river-deep mt-2 leading-tight">
        Scan a poster. See the wall.
      </h1>
      <p className="mt-4 text-ink-soft max-w-prose">
        Each printed poster in the Hartland Community Library has a QR code printed in its corner. Scanning that
        QR opens this poster&rsquo;s page on a visitor&rsquo;s phone, showing the photographs in exactly the same
        order they appear on the wall — left to right, top to bottom — with Doris Kennedy&rsquo;s annotations under
        each one.
      </p>

      <RiverDivider />

      <div className="grid gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posters.map((p) => (
          <PosterCard key={p.id} poster={p} photoCount={p.photo_sequence.length} />
        ))}
      </div>
    </div>
  );
}
