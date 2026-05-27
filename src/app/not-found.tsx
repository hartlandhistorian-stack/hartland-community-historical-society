import Link from 'next/link';
import { RiverDivider } from '@/components/RiverDivider';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-prose px-5 sm:px-8 py-24 text-center">
      <div className="archive-label text-wood-dark">404</div>
      <h1 className="font-serif text-4xl text-river-deep mt-2">This page is not in the archive.</h1>
      <RiverDivider />
      <p className="text-ink-soft">
        The page or photograph you were looking for either hasn&rsquo;t been added yet, or has been renamed.
      </p>
      <p className="mt-6">
        <Link href="/" className="text-river-deep font-medium no-underline hover:underline">← Return to the home page</Link>
      </p>
    </div>
  );
}
