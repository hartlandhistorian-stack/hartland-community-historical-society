import { NextResponse, type NextRequest } from 'next/server';
import { getPosterBySlug, getPosterUrl } from '@/lib/content';
import { renderQrSvg, renderQrPngBuffer } from '@/lib/qr';

export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const poster = getPosterBySlug(slug);
  if (!poster) return NextResponse.json({ error: 'Poster not found' }, { status: 404 });

  const url = getPosterUrl(poster);
  const format = req.nextUrl.searchParams.get('format') ?? 'svg';

  if (format === 'png') {
    const buf = await renderQrPngBuffer(url, { scale: 12, margin: 2 });
    return new NextResponse(buf as unknown as BodyInit, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400, immutable',
        'Content-Disposition': `inline; filename="${slug}-qr.png"`
      }
    });
  }

  const svg = await renderQrSvg(url, { scale: 8, margin: 2 });
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, immutable',
      'Content-Disposition': `inline; filename="${slug}-qr.svg"`
    }
  });
}
