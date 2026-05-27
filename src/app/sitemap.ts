import type { MetadataRoute } from 'next';
import { getAllPhotos, getAllCategories, getAllPosters } from '@/lib/content';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hartlandhistorical.ca').replace(/\/$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['', '/about', '/contact', '/contribute', '/collection', '/categories', '/posters'];
  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '' ? 1 : 0.7
  }));
  for (const c of getAllCategories()) {
    entries.push({ url: `${SITE}/categories/${c.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 });
  }
  for (const p of getAllPosters()) {
    entries.push({ url: `${SITE}/posters/${p.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 });
  }
  for (const p of getAllPhotos()) {
    entries.push({ url: `${SITE}/photos/${p.slug}`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 });
  }
  return entries;
}
