import { renderQrSvg } from '@/lib/qr';

/**
 * Renders an inline QR code (SVG) and provides download links for SVG / PNG.
 * Used on the poster detail page — volunteers can print the QR onto the wall poster.
 */
export async function QRCodeDownload({ url, slug, title }: { url: string; slug: string; title: string }) {
  const svg = await renderQrSvg(url, { scale: 6, margin: 2 });
  // Inline SVG (no external request); set fill via wrapper since the lib output is monochrome.
  return (
    <div className="bg-cream-soft border border-wood/30 p-5 max-w-xs">
      <div className="archive-label text-wood-dark">QR Code</div>
      <h3 className="font-serif text-lg text-river-deep mt-1">Print this on the poster</h3>
      <div
        className="mt-4 w-full aspect-square bg-cream-soft p-2 border border-wood/15 [&_svg]:w-full [&_svg]:h-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <div className="mt-4 flex gap-2 text-sm">
        <a
          href={`/api/qr/${slug}?format=svg`}
          download={`${slug}-qr.svg`}
          className="inline-block px-3 py-1.5 bg-river-deep text-cream-soft no-underline hover:bg-river"
        >
          Download SVG
        </a>
        <a
          href={`/api/qr/${slug}?format=png`}
          download={`${slug}-qr.png`}
          className="inline-block px-3 py-1.5 bg-spruce text-cream-soft no-underline hover:bg-spruce-dark"
        >
          Download PNG
        </a>
      </div>
      <p className="mt-3 text-xs text-ink-mute">
        Visitors who scan this QR land on the page for &ldquo;{title}&rdquo; with photographs in the same order they appear on the wall.
      </p>
      <p className="mt-2 text-xs text-ink-mute break-all">{url}</p>
    </div>
  );
}
