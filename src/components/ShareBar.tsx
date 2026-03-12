import { useState } from "react";
import { Check, Copy, Linkedin } from "lucide-react";

interface ShareBarProps {
  url: string;
  title: string;
}

export default function ShareBar({ url, title }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const twitterHref = `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback — do nothing
    }
  }

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-6">
      <span className="text-sm font-medium text-text-muted">Share:</span>
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-surface-raised px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
        aria-label="Share on X (Twitter)"
      >
        <svg
          viewBox="0 0 24 24"
          width={14}
          height={14}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Post
      </a>
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-surface-raised px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={14} aria-hidden />
        Share
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-surface-raised px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
        aria-label="Copy link to clipboard"
      >
        {copied ? (
          <>
            <Check size={14} aria-hidden />
            Copied
          </>
        ) : (
          <>
            <Copy size={14} aria-hidden />
            Copy link
          </>
        )}
      </button>
    </div>
  );
}
