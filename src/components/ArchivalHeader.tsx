'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV = [
  { href: '/collection', label: 'Collection' },
  { href: '/categories', label: 'Categories' },
  { href: '/posters', label: 'Posters' },
  { href: '/about', label: 'About' },
  { href: '/contribute', label: 'Contribute' },
  { href: '/contact', label: 'Contact' }
];

/**
 * SVG silhouette of the Hartland Covered Bridge.
 * The world's longest covered bridge — the defining landmark of Hartland, NB.
 * Drawn from scratch: peaked gable roof, vertical board siding, Saint John River below.
 */
function CoveredBridgeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Peaked gable roof */}
      <path
        d="M6 22 L45 3 L84 22"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="bevel"
      />
      {/* Gable end caps (small triangular fills at each end) */}
      <line x1="6" y1="22" x2="6" y2="35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <line x1="84" y1="22" x2="84" y2="35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      {/* Bridge body — top and bottom rails */}
      <line x1="6" y1="22" x2="84" y2="22" stroke="currentColor" strokeWidth="1.6" />
      <line x1="6" y1="35" x2="84" y2="35" stroke="currentColor" strokeWidth="1.6" />
      {/* Vertical board siding — the covered bridge's distinctive look */}
      {[17, 28, 39, 51, 62, 73].map((x) => (
        <line key={x} x1={x} y1="22" x2={x} y2="35" stroke="currentColor" strokeWidth="0.85" opacity="0.5" />
      ))}
      {/* Entrance openings — darker rectangles at each end */}
      <rect x="6" y="26" width="9" height="9" fill="currentColor" opacity="0.18" />
      <rect x="75" y="26" width="9" height="9" fill="currentColor" opacity="0.18" />
      {/* Saint John River — two gentle wave lines */}
      <path
        d="M2 39 Q12 36 22 39 Q32 42 45 39 Q58 36 68 39 Q78 42 88 39"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="none"
        opacity="0.45"
      />
    </svg>
  );
}

export function ArchivalHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-cream-soft">
      {/* Top accent rule */}
      <div className="river-line-double" />

      {/* Main identity bar */}
      <div className="mx-auto max-w-gallery px-5 sm:px-8 pt-5 pb-4 flex items-start justify-between gap-6">

        {/* Logo + wordmark */}
        <Link href="/" className="group block no-underline flex-shrink-0" aria-label="Hartland Community Historical Society — home">
          <div className="flex items-center gap-4">
            <CoveredBridgeMark className="text-river-deep w-[72px] h-[34px] flex-shrink-0 transition-opacity duration-200 group-hover:opacity-75" />
            <div>
              <div className="archive-label text-wood-dark tracking-widest leading-none">
                Hartland · New Brunswick
              </div>
              <div className="font-serif text-[1.55rem] sm:text-[1.85rem] font-semibold text-river-deep leading-[1.1] mt-1">
                Hartland Community<br className="hidden xs:block sm:hidden" /> Historical Society
              </div>
              <div className="archive-label text-spruce mt-1 leading-none">
                Founded by Doris E. Kennedy
              </div>
            </div>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="sm:hidden mt-1 p-2 text-river-deep hover:text-river focus:outline-none focus-visible:ring-2 focus-visible:ring-river"
        >
          {menuOpen ? (
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation strip */}
      <div className="border-t border-wood/20">
        <div className={`mx-auto max-w-gallery px-5 sm:px-8 ${menuOpen ? 'block' : 'hidden sm:block'}`}>
          <nav
            aria-label="Primary"
            className="flex flex-col sm:flex-row sm:flex-wrap py-2 gap-0 sm:gap-0"
          >
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className={[
                  'no-underline font-medium text-[0.875rem] tracking-wide',
                  'text-ink-soft hover:text-river-deep',
                  'py-2.5 sm:py-2 px-0 sm:px-4 sm:first:pl-0',
                  'border-b border-wood/10 sm:border-b-0',
                  'last:border-b-0',
                  'relative sm:after:absolute sm:after:bottom-0 sm:after:left-0 sm:after:right-0 sm:after:h-[2px]',
                  'sm:after:bg-river-deep sm:after:scale-x-0 sm:after:origin-left',
                  'sm:hover:after:scale-x-100 sm:after:transition-transform sm:after:duration-200',
                ].join(' ')}
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="river-line" />
    </header>
  );
}
