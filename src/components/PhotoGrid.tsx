import type { Photo } from '@/lib/types';
import { PhotoCard } from './PhotoCard';

export function PhotoGrid({ photos, emptyMessage = 'No photographs yet.' }: { photos: Photo[]; emptyMessage?: string }) {
  if (photos.length === 0) {
    return (
      <div className="border border-dashed border-wood/40 bg-cream-deep/40 p-10 text-center text-ink-mute font-serif italic">
        {emptyMessage}
      </div>
    );
  }
  return (
    <div className="grid gap-7 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {photos.map((p) => (
        <PhotoCard key={p.id} photo={p} />
      ))}
    </div>
  );
}
