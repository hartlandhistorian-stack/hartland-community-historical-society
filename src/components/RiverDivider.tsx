/**
 * Archival section divider.
 * 'plain'    — a single fine rule.
 * 'ornament' — rule with a centred diamond ornament, matching archival typesetting.
 */
export function RiverDivider({
  variant = 'plain',
  label
}: {
  variant?: 'plain' | 'ornament';
  label?: string;
}) {
  if (variant === 'ornament') {
    return (
      <div className="my-12 flex items-center gap-4">
        <div className="river-line flex-1" />
        <div className="flex items-center gap-2.5 text-wood">
          {label && (
            <span className="archive-label text-wood-dark">{label}</span>
          )}
          {/* Diamond ornament — drawn inline, no icon library */}
          <svg viewBox="0 0 12 12" fill="currentColor" className="w-2.5 h-2.5 text-wood opacity-70" aria-hidden="true">
            <path d="M6 0 L12 6 L6 12 L0 6 Z" />
          </svg>
        </div>
        <div className="river-line flex-1" />
      </div>
    );
  }

  return <div className="river-line my-10" />;
}
