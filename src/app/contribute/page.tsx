import type { Metadata } from 'next';
import { RiverDivider } from '@/components/RiverDivider';

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'nursekennedy@hotmail.com';

export const metadata: Metadata = {
  title: 'Contribute',
  description: "Contribute a photograph, a correction, or a story to the Doris Kennedy Collection."
};

export default function ContributePage() {
  const subject = encodeURIComponent('Hartland Community Historical Society — contribution');
  const body = encodeURIComponent(
    [
      'Hello,',
      '',
      'I would like to contribute the following to the archive:',
      '',
      'What I have:',
      '   [briefly describe the photograph, document, or story]',
      '',
      'Names and people:',
      '   [the names of those in the photograph, if known]',
      '',
      'Approximate date:',
      '   [year or decade, if known]',
      '',
      'Location:',
      '   [where the photograph was taken or the event took place]',
      '',
      'Where it came from:',
      '   [an album, an attic, a relative, etc.]',
      '',
      'Permission to publish:',
      '   [yes / no / I would like to discuss]',
      '',
      'Best,',
      ''
    ].join('\n')
  );

  return (
    <article className="mx-auto max-w-prose px-5 sm:px-8 py-16">
      <div className="archive-label text-wood-dark">Contribute</div>
      <h1 className="font-serif text-4xl text-river-deep mt-2 leading-tight">
        Add to the archive.
      </h1>

      <RiverDivider variant="ornament" />

      <p className="text-ink-soft text-lg">
        Doris E. Kennedy&rsquo;s collection is the foundation of this archive, but it is not all of Hartland&rsquo;s
        history. The Hartland Community Historical Society is built by community volunteers and local businesses
        — and if you have photographs, identifications, corrections, recollections, an hour of time, or a small
        sponsorship to share, we want to hear from you.
      </p>

      <div className="mt-10 bg-cream-soft border border-wood/30 p-6">
        <h2 className="font-serif text-2xl text-river-deep">Start by writing to us</h2>
        <p className="mt-3 text-ink-soft">
          The simplest way to contribute is by email. Click below to open a pre-filled message you can adapt and send.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`}
          className="mt-5 inline-block bg-river-deep text-cream-soft px-5 py-3 no-underline hover:bg-river"
        >
          Open a draft email
        </a>
        <p className="mt-3 text-xs text-ink-mute">
          Sends to <span className="break-all">{CONTACT_EMAIL}</span>
        </p>
      </div>

      <RiverDivider />

      <h2 className="font-serif text-2xl text-river-deep">What we&rsquo;re looking for</h2>
      <ul className="mt-3 list-disc pl-6 space-y-2 text-ink-soft">
        <li>Photographs of the upper St. John River Valley — streets, buildings, families, work, gatherings.</li>
        <li>Identifications: names, dates, locations for photographs already in the archive that are unlabelled.</li>
        <li>Corrections: anywhere we&rsquo;ve got a name or date wrong.</li>
        <li>Stories: the why and how behind a photograph that already lives in the archive.</li>
        <li>Documents, programmes, ledgers, letters, and other paper that helps locate a photograph in time.</li>
      </ul>

      <RiverDivider />

      <h2 className="font-serif text-2xl text-river-deep">What happens next</h2>
      <ol className="mt-3 list-decimal pl-6 space-y-2 text-ink-soft">
        <li>We&rsquo;ll reply by email, usually within a few days.</li>
        <li>If a photograph is appropriate for the archive, we&rsquo;ll discuss permissions and credits.</li>
        <li>We may ask for a higher-resolution scan, or for permission to scan an original.</li>
        <li>Once added, your contribution will be credited under the photograph as you direct.</li>
      </ol>

      <RiverDivider />

      <h2 className="font-serif text-2xl text-river-deep">For volunteers maintaining the site</h2>
      <p className="mt-3 text-ink-soft">
        The archive is stored as JSON files under <code className="text-sm bg-cream-deep px-1.5 py-0.5">/content/</code>{' '}
        and image files under <code className="text-sm bg-cream-deep px-1.5 py-0.5">/public/images/photos/</code>. Adding a new photograph means:
      </p>
      <ol className="mt-3 list-decimal pl-6 space-y-2 text-ink-soft">
        <li>Saving the scanned image into the appropriate folder under <code className="text-sm bg-cream-deep px-1.5 py-0.5">/public/images/photos/&lt;category&gt;/</code>.</li>
        <li>Copying an existing JSON file in <code className="text-sm bg-cream-deep px-1.5 py-0.5">/content/photos/</code> as a template.</li>
        <li>Filling in the <em>id</em>, <em>slug</em>, <em>title</em>, <em>image</em> path, <em>description</em> (Doris&rsquo;s identification), date, people, and category.</li>
        <li>Saving the file with a unique name. The site rebuilds on next load.</li>
      </ol>
      <p className="mt-3 text-ink-soft">
        See the README for the full content model. No coding required for content updates — just plain text editing.
      </p>
    </article>
  );
}
