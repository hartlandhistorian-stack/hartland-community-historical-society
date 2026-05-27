import type { Metadata } from 'next';
import { RiverDivider } from '@/components/RiverDivider';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'nursekennedy@hotmail.com';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the Hartland Community Historical Society — corrections, contributions, and questions about the Doris Kennedy Collection.'
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-prose px-5 sm:px-8 py-16">
      <div className="archive-label text-wood-dark">Contact</div>
      <h1 className="font-serif text-4xl text-river-deep mt-2 leading-tight">Write to us.</h1>

      <RiverDivider variant="ornament" />

      <p className="text-ink-soft text-lg">
        The Society is a volunteer organisation. We don&rsquo;t maintain regular office hours, but we read every
        message and reply within a few days.
      </p>

      <div className="mt-10 bg-cream-soft border border-wood/30 p-6">
        <div className="archive-label text-wood-dark">By email</div>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=St.%20John%20River%20Valley%20Historical%20Society`}
          className="mt-2 inline-block font-serif text-2xl text-river-deep no-underline hover:underline break-all"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="mt-3 text-sm text-ink-mute">
          For corrections, identifications, contributions of photographs or documents, or any other inquiry.
        </p>
      </div>

      <RiverDivider />

      <h2 className="font-serif text-2xl text-river-deep">What to include</h2>
      <p className="mt-3 text-ink-soft">
        When you write, please tell us as much as you can about the photograph or topic you have in mind:
      </p>
      <ul className="mt-3 list-disc pl-6 space-y-1.5 text-ink-soft">
        <li>The names of the people in the photograph, if you know them.</li>
        <li>The approximate date and the location, if you know them.</li>
        <li>Where the photograph came from — an album, an attic, a relative.</li>
        <li>Whether you have the original, or only a scan.</li>
        <li>Whether we may publish it on this site, with credit.</li>
      </ul>

      <RiverDivider />

      <h2 className="font-serif text-2xl text-river-deep">Where we are</h2>
      <p className="mt-3 text-ink-soft">
        Hartland, New Brunswick — the home of the world&rsquo;s longest covered bridge and the source of the
        photographs in this archive. The physical posters that QR codes on this site refer to hang in the
        Hartland Community Library.
      </p>
    </article>
  );
}
