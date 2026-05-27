import QRCode from 'qrcode';

/**
 * QR rendering helpers. Used by the build-time script (`scripts/generate-qr-codes.ts`)
 * and by the on-demand /api/qr/[slug] route in case a volunteer wants a fresh QR
 * before re-running the script.
 *
 * Error correction is set to "M" (medium) — sufficient for QR codes printed on
 * a poster behind glass, and produces a tidy module size for embedding.
 */

export interface QrOptions {
  /** Module size in pixels for PNG export. SVG ignores this. */
  scale?: number;
  /** Border padding in modules; 2 is the printable minimum. */
  margin?: number;
  /** Foreground colour. Default near-black to match archival ink. */
  dark?: string;
  /** Background colour. Default warm cream so QR blends with poster paper. */
  light?: string;
}

const DEFAULTS: Required<QrOptions> = {
  scale: 8,
  margin: 2,
  dark: '#1b1a17',
  light: '#fbf7f0'
};

export async function renderQrSvg(url: string, opts: QrOptions = {}): Promise<string> {
  const o = { ...DEFAULTS, ...opts };
  return QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: o.margin,
    color: { dark: o.dark, light: o.light }
  });
}

export async function renderQrPngBuffer(
  url: string,
  opts: QrOptions = {}
): Promise<Buffer> {
  const o = { ...DEFAULTS, ...opts };
  return QRCode.toBuffer(url, {
    errorCorrectionLevel: 'M',
    margin: o.margin,
    scale: o.scale,
    color: { dark: o.dark, light: o.light }
  });
}

/** Filename helper. Matches the convention documented in the README. */
export function qrFilename(posterSlug: string, ext: 'svg' | 'png'): string {
  return `qr-${posterSlug}.${ext}`;
}
