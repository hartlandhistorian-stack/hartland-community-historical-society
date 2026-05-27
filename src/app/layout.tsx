import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import { ArchivalHeader } from '@/components/ArchivalHeader';
import { ArchivalFooter } from '@/components/ArchivalFooter';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['400', '600', '700'],
  style: ['normal', 'italic']
});

const SITE_NAME = 'Hartland Community Historical Society';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hartlandhistorical.ca'),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`
  },
  description:
    "Founded by Doris E. Kennedy and supported by community volunteers and local businesses, the Hartland Community Historical Society preserves the photographs and stories of Hartland, New Brunswick — the Hartland Covered Bridge, Sayre's Mill, the Wolastoqey Salmon Pool, the schools, the churches, the fires and the floods.",
  keywords: [
    'Hartland New Brunswick history',
    'Hartland Community Historical Society',
    'Doris Kennedy Collection',
    'Hartland Covered Bridge',
    'Becaguimic Mill',
    'Wolastoqey Salmon Pool',
    'New Brunswick historical photographs',
    'Carleton County',
    'NB Archives'
  ],
  authors: [{ name: 'Hartland Community Historical Society' }],
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_CA',
    title: SITE_NAME,
    description:
      "Doris E. Kennedy's annotated photograph collection of Hartland, New Brunswick — the Hartland Covered Bridge, Sayre's Mill, the Wolastoqey Salmon Pool, and the families and businesses of the town."
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={playfair.variable}>
      <body className="min-h-screen flex flex-col">
        <a className="skip-link" href="#main">Skip to main content</a>
        <ArchivalHeader />
        <main id="main" className="flex-1">{children}</main>
        <ArchivalFooter />
      </body>
    </html>
  );
}
