import Link from 'next/link';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hartlandhistorian@gmail.com';

/** SVG of the covered bridge — reused from the header at smaller size */
function BridgeMini() {
  return (
    <svg
      viewBox="0 0 90 42"
      fill="none"
      aria-hidden="true"
      className="w-12 h-auto text-wood opacity-50"
    >
      <path d="M6 22 L45 3 L84 22" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="bevel" />
      <line x1="6" y1="22" x2="6" y2="35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <line x1="84" y1="22" x2="84" y2="35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <line x1="6" y1="22" x2="84" y2="22" stroke="currentColor" strokeWidth="1.6" />
      <line x1="6" y1="35" x2="84" y2="35" stroke="currentColor" strokeWidth="1.6" />
      {[17, 28, 39, 51, 62, 73].map((x) => (
        <line key={x} x1={x} y1="22" x2={x} y2="35" stroke="currentColor" strokeWidth="0.85" opacity="0.5" />
      ))}
      <path d="M2 39 Q12 36 22 39 Q32 42 45 39 Q58 36 68 39 Q78 42 88 39" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.45" />
    </svg>
  );
}

export function ArchivalFooter() {
  return (
    <footer className="mt-20 bg-cream-deep">
      <div className="river-line" />

      <div className="mx-auto max-w-gallery px-5 sm:px-8 pt-12 pb-8 grid gap-10 sm:grid-cols-3">

        {/* Column 1 — The Society */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <BridgeMini />
          </div>
          <div className="archive-label mb-2">The Society</div>
          <p className="text-sm text-ink-soft leading-relaxed">
            The Hartland Community Historical Society was founded by{' '}
            <span className="font-semibold text-river-deep">Doris E. Kennedy</span>{' '}
            and is supported by community volunteers and local businesses.
          </p>
          <p className="mt-3 text-sm text-ink-soft leading-relaxed">
            We preserve the photographs, documents, and recollections of Hartland, New Brunswick —
            home of the world&rsquo;s longest covered bridge.
          </p>
        </div>

        {/* Column 2 — Explore */}
        <div>
          <div className="archive-label mb-3">Explore</div>
          <ul className="space-y-2 text-sm text-ink-soft">
            <li>
              <Link href="/collection" className="no-underline hover:text-river-deep hover:underline transition-colors">
                Browse the Collection
              </Link>
            </li>
            <li>
              <Link href="/categories" className="no-underline hover:text-river-deep hover:underline transition-colors">
                By Category
              </Link>
            </li>
            <li>
              <Link href="/posters" className="no-underline hover:text-river-deep hover:underline transition-colors">
                Wall Posters &amp; QR Pages
              </Link>
            </li>
            <li>
              <Link href="/about" className="no-underline hover:text-river-deep hover:underline transition-colors">
                About Doris Kennedy
              </Link>
            </li>
            <li>
              <Link href="/contribute" className="no-underline hover:text-river-deep hover:underline transition-colors">
                Contribute a Photograph
              </Link>
            </li>
            <li>
              <Link href="/contact" className="no-underline hover:text-river-deep hover:underline transition-colors">
                Contact the Society
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 — Contact */}
        <div>
          <div className="archive-label mb-3">Contact</div>
          <p className="text-sm text-ink-soft leading-relaxed">
            Have a photograph, a correction, an identification, or a story to add to the archive?
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-3 inline-block text-sm font-semibold text-river-deep no-underline hover:underline break-all transition-colors"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-4 text-xs text-ink-mute leading-relaxed">
            We are a volunteer organisation and read every message. Replies within a few days.
          </p>
        </div>
      </div>

      <div className="river-line" />

      {/* Copyright bar */}
      <div className="mx-auto max-w-gallery px-5 sm:px-8 py-5 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <p className="text-xs text-ink-mute">
          &copy; {new Date().getFullYear()} Hartland Community Historical Society.
          Photographs and annotations &copy; Doris E. Kennedy unless otherwise noted.
        </p>
        <p className="archive-label text-wood">Hartland · New Brunswick · Canada</p>
      </div>
    </footer>
  );
}
