import Link from 'next/link';
import { getAllPhotos, getAllPosters, getAllCategories, getPhotosByPosterId, getPhotoBySlug } from '@/lib/content';
import { PhotoCard } from '@/components/PhotoCard';
import { PosterCard } from '@/components/PosterCard';
import { CategoryCard } from '@/components/CategoryCard';
import { RiverDivider } from '@/components/RiverDivider';

export default function HomePage() {
  const photos = getAllPhotos();
  const posters = getAllPosters();
  const categories = getAllCategories();

  const featuredPosters = posters.slice(0, 6);
  const featuredCategories = categories.filter((c) => c.cover_photo_id).slice(0, 6);

  // Hero photos: first two from the first two posters — varied subjects
  const heroPhotos = posters
    .flatMap((p) => getPhotosByPosterId(p.id).slice(0, 2))
    .slice(0, 4);

  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-cream-soft border-b border-wood/20">
        <div className="mx-auto max-w-gallery px-5 sm:px-8 py-14 sm:py-20 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">

          {/* Left — headline + CTA */}
          <div>
            <div className="archive-label text-wood mb-3">
              Hartland · New Brunswick · est. 1874
            </div>
            <h1 className="font-serif text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] leading-[1.03] text-river-deep tracking-tight">
              The town of Hartland,<br />
              <em className="not-italic text-river">photographed and annotated</em><br />
              by Doris E. Kennedy.
            </h1>

            <p className="mt-6 text-[1.05rem] text-ink-soft max-w-prose leading-relaxed">
              The world&rsquo;s longest covered bridge. Sayre&rsquo;s Mill on the Becaguimic.
              The Wolastoqey Salmon Pool. The schools, the churches, the businesses, the floods
              and the fires.{' '}
              <strong className="font-semibold text-river-deep">
                {photos.length} annotated photographs across {posters.length} wall posters
              </strong>{' '}
              — gathered, captioned, and arranged by Doris E. Kennedy. Made public by the
              Hartland Community Historical Society, with the support of community volunteers
              and local businesses.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/collection"
                className="inline-block bg-river-deep text-cream-soft px-6 py-3 text-[0.9rem] font-semibold tracking-wide no-underline hover:bg-river transition-colors"
              >
                Browse the collection
              </Link>
              <Link
                href="/posters"
                className="inline-block border border-wood text-river-deep px-6 py-3 text-[0.9rem] font-semibold tracking-wide no-underline hover:border-river-deep hover:bg-cream-deep transition-colors"
              >
                Wall posters &amp; QR
              </Link>
              <Link
                href="/about"
                className="inline-block px-4 py-3 text-[0.9rem] text-ink-soft no-underline hover:text-river-deep hover:underline transition-colors"
              >
                About Doris →
              </Link>
            </div>
          </div>

          {/* Right — staggered photo mosaic */}
          {heroPhotos.length >= 4 && (
            <div className="grid grid-cols-2 gap-4">
              {heroPhotos.slice(0, 4).map((p, i) => (
                <div
                  key={p.id}
                  className={`photo-frame ${i % 2 === 1 ? 'translate-y-5' : ''}`}
                  style={{ transition: 'none' }}  // disable hover lift in mosaic
                >
                  <Link href={`/photos/${p.slug}`} className="block no-underline">
                    <div className="aspect-[4/5] bg-cream-deep overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.alt}
                        loading="eager"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-1 px-0.5 text-[0.72rem] text-ink-mute truncate">{p.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Posters ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-gallery px-5 sm:px-8 py-16">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="archive-label text-wood mb-1">Wall posters</div>
            <h2 className="font-serif text-3xl sm:text-4xl text-river-deep leading-tight">
              Scan a QR. See the wall.
            </h2>
            <p className="mt-3 text-ink-soft max-w-prose">
              Each printed poster in the Hartland Community Library carries a QR code.
              Scanning it opens the poster&rsquo;s page here, showing every photograph
              in exactly the same order as the wall — left to right, top to bottom —
              with Doris Kennedy&rsquo;s annotations beneath each one.
            </p>
          </div>
          <Link href="/posters" className="archive-label no-underline hover:underline text-river-deep flex-shrink-0">
            All {posters.length} posters →
          </Link>
        </div>

        <RiverDivider />

        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
          {featuredPosters.map((p) => (
            <PosterCard
              key={p.id}
              poster={p}
              photoCount={p.photo_sequence.length}
            />
          ))}
        </div>
      </section>

      {/* ── Categories ────────────────────────────────────────── */}
      <section className="bg-ink/[0.025] border-y border-wood/15 py-16">
        <div className="mx-auto max-w-gallery px-5 sm:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="archive-label text-wood mb-1">By category</div>
              <h2 className="font-serif text-3xl sm:text-4xl text-river-deep leading-tight">
                Themes across the valley.
              </h2>
              <p className="mt-3 text-ink-soft max-w-prose">
                River life, bridges, mills, schools, churches, fires, floods, festivals —
                the valley&rsquo;s history organised by subject.
              </p>
            </div>
            <Link href="/categories" className="archive-label no-underline hover:underline text-river-deep flex-shrink-0">
              All categories →
            </Link>
          </div>

          <RiverDivider />

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((c) => (
              <CategoryCard
                key={c.id}
                category={c}
                photoCount={photos.filter((p) => p.category_ids.includes(c.id)).length}
                coverPhoto={
                  c.cover_photo_id
                    ? getPhotoBySlug(getAllPhotos().find((p) => p.id === c.cover_photo_id)?.slug ?? '')
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Doris ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-gallery px-5 sm:px-8 py-20">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
          <div>
            <div className="archive-label text-wood mb-2">The founder</div>
            <h2 className="font-serif text-3xl sm:text-4xl text-river-deep leading-tight">
              Doris E. Kennedy
            </h2>

            {/* Pull quote style blockquote */}
            <blockquote className="mt-6 border-l-[3px] border-wood pl-5 py-1">
              <p className="font-serif text-lg italic text-ink-soft leading-relaxed">
                &ldquo;Every photograph in this archive was gathered, named, and arranged by Doris.
                The captions and stories beneath every image are hers.&rdquo;
              </p>
            </blockquote>

            <div className="mt-6 space-y-4 text-ink-soft text-[1.02rem] leading-relaxed max-w-prose">
              <p>
                Doris co-chaired the 100th anniversary of the Hartland Covered Bridge in 2001
                and founded the Hartland Community Historical Society. For most of her adult life
                she has gathered photographs from neighbours, families, and her own albums —
                writing out who was in each one and when, and arranging them onto the wall posters
                that hang in the Hartland Community Library.
              </p>
              <p>
                This site is her work, made browsable.
              </p>
            </div>

            <Link
              href="/about"
              className="mt-6 inline-block text-river-deep font-semibold text-[0.9rem] tracking-wide no-underline hover:underline"
            >
              Read more about Doris and the Society →
            </Link>
          </div>

          {/* Doris photos grid */}
          {(() => {
            const dorisPhotos = photos
              .filter((p) => p.tags?.includes('doris-kennedy') || (p.people ?? []).some((n) => /doris kennedy/i.test(n)))
              .slice(0, 4);
            if (!dorisPhotos.length) return null;
            return (
              <div className="grid grid-cols-2 gap-5">
                {dorisPhotos.map((p) => (
                  <PhotoCard key={p.id} photo={p} />
                ))}
              </div>
            );
          })()}
        </div>
      </section>

    </div>
  );
}
