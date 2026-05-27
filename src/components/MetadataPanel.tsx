import Link from 'next/link';
import type { PhotoView } from '@/lib/types';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="py-3 grid grid-cols-[7rem_1fr] gap-3 items-baseline border-b border-wood/15 last:border-b-0">
      <div className="archive-label text-wood-dark">{label}</div>
      <div className="text-ink-soft">{children}</div>
    </div>
  );
}

export function MetadataPanel({ photo }: { photo: PhotoView }) {
  return (
    <aside aria-label="Photograph metadata" className="bg-cream-soft border border-wood/25 px-5 py-2 max-w-md">
      <Row label="Date">
        {photo.estimated_date && photo.date && !photo.date.startsWith('circa') ? 'circa ' : ''}
        {photo.date}
      </Row>
      {photo.location && <Row label="Location">{photo.location}</Row>}
      {photo.people && photo.people.length > 0 && (
        <Row label="People">{photo.people.join(', ')}</Row>
      )}
      {photo.categories.length > 0 && (
        <Row label="Categories">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {photo.categories.map((c) => (
              <Link key={c.id} href={`/categories/${c.slug}`} className="no-underline hover:underline">{c.title}</Link>
            ))}
          </div>
        </Row>
      )}
      {photo.posters.length > 0 && (
        <Row label="Appears on">
          <div className="flex flex-col gap-1">
            {photo.posters.map((p) => (
              <Link key={p.id} href={`/posters/${p.slug}`} className="no-underline hover:underline">{p.title}</Link>
            ))}
          </div>
        </Row>
      )}
      {photo.tags && photo.tags.length > 0 && (
        <Row label="Tags">
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
            {photo.tags.map((t) => (
              <span key={t} className="text-ink-mute">#{t}</span>
            ))}
          </div>
        </Row>
      )}
      {photo.annotation_author && (
        <Row label="Annotated">{photo.annotation_author}</Row>
      )}
      {photo.source && <Row label="Source">{photo.source}</Row>}
      {photo.credit && <Row label="Credit">{photo.credit}</Row>}
      {photo.rights && <Row label="Rights">{photo.rights}</Row>}
    </aside>
  );
}
