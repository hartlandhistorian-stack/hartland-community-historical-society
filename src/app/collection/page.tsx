import type { Metadata } from 'next';
import { getAllPhotos } from '@/lib/content';
import { SearchInput } from '@/components/SearchInput';
import { RiverDivider } from '@/components/RiverDivider';

export const metadata: Metadata = {
  title: 'Browse the Collection',
  description: "Search and browse the full Doris Kennedy Collection — every photograph in the archive, with people, dates, and locations."
};

export default function CollectionPage() {
  const photos = getAllPhotos();
  return (
    <div className="mx-auto max-w-gallery px-5 sm:px-8 py-12">
      <div className="archive-label text-wood-dark">The Collection</div>
      <h1 className="font-serif text-4xl text-river-deep mt-2 leading-tight">
        {photos.length} annotated photographs.
      </h1>
      <p className="mt-3 text-ink-soft max-w-prose">
        The full Doris Kennedy Collection. Search by person, year, place, or subject.
      </p>

      <RiverDivider />

      <SearchInput photos={photos} />
    </div>
  );
}
