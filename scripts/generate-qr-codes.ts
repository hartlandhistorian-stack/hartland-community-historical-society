/**
 * Bulk-generate QR codes for every poster in the archive.
 *
 * Outputs:
 *   /public/qr/<slug>.svg
 *   /public/qr/<slug>.png
 *
 * Run with:
 *   npm run qr
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { getAllPosters, getPosterUrl } from '@/lib/content';
import { renderQrSvg, renderQrPngBuffer } from '@/lib/qr';

async function main() {
  const outDir = join(process.cwd(), 'public/qr');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const posters = getAllPosters();
  console.log(`Generating QR codes for ${posters.length} posters → ${outDir}`);

  for (const poster of posters) {
    const url = getPosterUrl(poster);
    const svg = await renderQrSvg(url, { scale: 8, margin: 2 });
    const png = await renderQrPngBuffer(url, { scale: 12, margin: 2 });
    writeFileSync(join(outDir, `${poster.slug}.svg`), svg);
    writeFileSync(join(outDir, `${poster.slug}.png`), png);
    console.log(`  ✓ ${poster.slug.padEnd(36)} → ${url}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
