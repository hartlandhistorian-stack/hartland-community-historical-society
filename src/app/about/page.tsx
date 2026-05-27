import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPhotos } from '@/lib/content';
import { PhotoCard } from '@/components/PhotoCard';
import { RiverDivider } from '@/components/RiverDivider';

export const metadata: Metadata = {
  title: 'About',
  description:
    "About the Hartland Community Historical Society — founded by Doris E. Kennedy and supported by community volunteers and local businesses to preserve the photographs, documents, and stories of Hartland, New Brunswick."
};

export default function AboutPage() {
  const photos = getAllPhotos();
  const dorisPhotos = photos
    .filter((p) => p.tags?.includes('doris-kennedy') || (p.people ?? []).some((n) => /doris kennedy/i.test(n)))
    .slice(0, 6);

  return (
    <article className="mx-auto max-w-prose px-5 sm:px-8 py-16">
      <div className="archive-label text-wood-dark">About</div>
      <h1 className="font-serif text-4xl text-river-deep mt-2 leading-tight">
        Hartland Community Historical Society
      </h1>
      <p className="mt-3 archive-label text-spruce">Founded by Doris E. Kennedy · Hartland, New Brunswick</p>

      <RiverDivider variant="ornament" />

      <section className="archive-prose">
        <h2 className="font-serif text-2xl text-river-deep">A pioneering family, a lifelong dedication</h2>
        <p>
          Doris Kennedy comes from a pioneering family that settled in what is now Hartland. Her interest in local
          history began with her grandmother, who told stories of the town&rsquo;s struggles with fires and floods
          and of the people who overcame them.
        </p>
        <p>
          The Hartland Community Historical Society was <strong>founded by Doris E. Kennedy</strong> and is sustained
          by <strong>community volunteers and local businesses</strong>. The Society preserves and presents the
          photographs, documents, and recollections of Hartland — the small town in Carleton County, New Brunswick,
          best known as the home of the world&rsquo;s longest covered bridge.
        </p>
        <p>
          The archive at the heart of this site is Doris&rsquo;s. The structure that surrounds it — categories,
          posters, search, QR codes on the wall — was built around her annotations so that anyone with a phone can
          stand in the Hartland Community Library, scan a QR code on a printed poster, and read every caption Doris
          wrote.
        </p>

        <RiverDivider />

        <h2 className="font-serif text-2xl text-river-deep">Writer, nurse, and keeper of the valley&rsquo;s stories</h2>
        <p>
          Doris is dedicated to writing historical plays and books about the community of Hartland, including:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-ink-soft">
          <li>
            <em>Hidden History of Hartland</em>
          </li>
          <li>
            <em>The Hartland Salmon Pool</em> — once known as the famous international salmon pool, a bountiful
            resource, to its tragic distinction
          </li>
          <li>
            <em>The Bridge</em> — built out of need by the people and how it became an icon, the Longest Covered
            Bridge in the World
          </li>
          <li>
            <em>The Life of Heber Hatfield</em> — father of New Brunswick&rsquo;s 17-year Premier Richard Hatfield
          </li>
          <li>
            <em>From There to Here</em> — the evolution of the Carleton County nursing program and the local
            cottage-style hospitals
          </li>
        </ul>
        <p>
          After 40 years as a nurse, Doris retired to run a bed-and-breakfast and now enjoys writing and travelling
          with her husband across Canada to see her four adult children, their spouses, and 11 grandchildren.
        </p>

        <RiverDivider />

        <h2 className="font-serif text-2xl text-river-deep">Built and sustained by community</h2>
        <p>
          The Society is not a museum, not yet, and not a paid organisation. It is community volunteers and local
          businesses pooling time, scans, identifications, equipment, and storage to make sure the work Doris has
          done continues and grows. If you live in or near Hartland and would like to contribute — a photograph
          from an album, an identification on an unlabelled face, an hour of volunteer time, or a small
          sponsorship from your business — we want to hear from you.
        </p>
        <p>
          <Link href="/contribute" className="no-underline hover:underline font-medium">
            See how to contribute &rarr;
          </Link>
        </p>

        <RiverDivider />

        <h2 className="font-serif text-2xl text-river-deep">How the archive is organised</h2>
        <p>The collection is built around three structures:</p>
        <ul className="list-disc pl-6 space-y-2 text-ink-soft">
          <li>
            <strong>Photographs</strong>, each carrying Doris&rsquo;s identification, date, location, and the names
            of those in the picture.
          </li>
          <li>
            <strong>Categories</strong>, which group photographs thematically (River Life, Bridges, Churches,
            Fires, Farming, &hellip;).
          </li>
          <li>
            <strong>Posters</strong>, which mirror the physical wall displays in the Hartland Community Library. Each
            poster page shows its photographs in the exact left-to-right, top-to-bottom order of the wall, so a
            visitor who scans the poster&rsquo;s QR code sees the same images in the same order.
          </li>
        </ul>
      </section>

      {dorisPhotos.length > 0 && (
        <section className="mt-12">
          <div className="archive-label text-wood-dark">Doris in the archive</div>
          <h2 className="font-serif text-2xl text-river-deep mt-1">Photographs featuring Doris</h2>
          <div className="mt-6 grid gap-7 grid-cols-2 sm:grid-cols-3">
            {dorisPhotos.map((p) => (
              <PhotoCard key={p.id} photo={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
