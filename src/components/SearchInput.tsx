'use client';

import { useState, useMemo } from 'react';
import type { Photo } from '@/lib/types';
import { searchPhotos } from '@/lib/search';
import { PhotoCard } from './PhotoCard';

export function SearchInput({ photos }: { photos: Photo[] }) {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    if (!q.trim()) return photos.slice(0, 60);
    const sr = searchPhotos(q.trim(), photos);
    return sr.slice(0, 120).map((r) => r.photo);
  }, [q, photos]);

  return (
    <div>
      <label htmlFor="search" className="archive-label block">Search</label>
      <input
        id="search"
        type="search"
        autoComplete="off"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Try 'Doris Kennedy', '1922 flood', 'Sayre's Mill', 'salmon pool'…"
        className="mt-2 w-full bg-cream-soft border border-wood/30 px-4 py-3 text-lg font-serif text-ink placeholder:text-ink-mute focus:outline-none focus:border-river"
      />
      <div className="archive-label text-wood-dark mt-3">
        {q.trim()
          ? `${results.length} ${results.length === 1 ? 'result' : 'results'}`
          : `Showing the first 60 of ${photos.length} photographs`}
      </div>
      <div className="mt-5 grid gap-7 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {results.map((p) => (
          <PhotoCard key={p.id} photo={p} />
        ))}
        {q.trim() && results.length === 0 && (
          <div className="col-span-full border border-dashed border-wood/40 bg-cream-deep/40 p-10 text-center text-ink-mute font-serif italic">
            No matches for &ldquo;{q}&rdquo;. Try a person's name, a year, or a place.
          </div>
        )}
      </div>
    </div>
  );
}
