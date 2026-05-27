import type { PosterView } from '@/lib/types';
import { PhotoCard } from './PhotoCard';

/**
 * Renders the poster's photos in exact L→R, T→B wall order.
 * Each card is numbered 1..N matching the physical poster position.
 * This is the page a QR-scan visitor lands on after scanning a wall poster.
 */
export function PosterPhotoSequence({ posterView }: { posterView: PosterView }) {
  return (
    <ol className="not-prose grid gap-7 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {posterView.orderedPhotos.map(({ photo, numericLabel }) => (
        <li key={photo.id} className="list-none">
          <PhotoCard photo={photo} label={numericLabel} />
        </li>
      ))}
    </ol>
  );
}
