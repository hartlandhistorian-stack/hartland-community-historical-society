import Link from 'next/link';

/**
 * Inline attribution block that names Doris Kennedy as the curator/annotator
 * of the collection. Used on the home page hero and on each photo's metadata panel.
 */
export function DorisAttribution({ variant = 'inline' }: { variant?: 'inline' | 'block' }) {
  if (variant === 'block') {
    return (
      <aside className="border-l-2 border-wood pl-5 py-2 my-8 text-ink-soft italic max-w-prose">
        <p className="mb-2">
          Every photograph in this archive was selected, annotated, and arranged by{' '}
          <span className="font-medium text-river-deep not-italic">Doris E. Kennedy</span>, founder of the
          Hartland Community Historical Society and co-chair of the 100th Bridge Anniversary Committee.
        </p>
        <p className="text-sm">
          <Link href="/about" className="no-underline hover:underline">Read more about Doris and the Society →</Link>
        </p>
      </aside>
    );
  }
  return (
    <span className="archive-label">
      From the Doris Kennedy Collection
    </span>
  );
}
