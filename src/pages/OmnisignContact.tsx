import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Copy } from "lucide-react";
import Badge from "@/components/microsite/Badge";

interface FormData {
  name: string;
  email: string;
  org: string;
  role: string;
  intendedUse: string;
  datasetNeeds: string;
  ndaReady: boolean;
}

const initial: FormData = {
  name: "",
  email: "",
  org: "",
  role: "",
  intendedUse: "",
  datasetNeeds: "",
  ndaReady: false,
};

function buildEmailTemplate(data: FormData): string {
  return `To: hello@laythayache.com
Subject: OmniSign — Access Request (NDA)

Name: ${data.name}
Email: ${data.email}
Organization: ${data.org}
Role: ${data.role}

Intended Use:
${data.intendedUse}

Dataset Access Needs:
${data.datasetNeeds}

NDA Ready: ${data.ndaReady ? "Yes" : "No"}
`;
}

const fieldClass =
  "w-full border border-border bg-transparent px-4 py-2.5 font-mono text-sm text-text-primary placeholder:text-text-muted/50 focus:border-border-strong focus:outline-none";

export default function OmnisignContact() {
  const [form, setForm] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleCopy() {
    navigator.clipboard.writeText(buildEmailTemplate(form));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <Link
        to="/projects/omnisign"
        className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-text-secondary"
      >
        <ArrowLeft size={14} />
        Back to OmniSign
      </Link>

      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h1 className="font-sans text-2xl font-semibold text-text-primary">
            Request Access
          </h1>
          <Badge variant="nda">NDA Required</Badge>
        </div>

        <p className="text-base leading-relaxed text-text-secondary">
          Access to OmniSign's model architecture, training data specifications,
          edge infrastructure details, and developer APIs requires a
          non-disclosure agreement. This protects the privacy of sign language
          data contributors and the integrity of ongoing research.
        </p>

        <p className="text-sm text-text-muted">
          Fill out the form below. On submission, you'll receive an email
          template to send — no data is transmitted from this page.
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-text-muted"
            >
              Name *
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your full name"
              className={fieldClass}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-text-muted"
            >
              Email *
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@organization.com"
              className={fieldClass}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="org"
                className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-text-muted"
              >
                Organization *
              </label>
              <input
                id="org"
                type="text"
                required
                value={form.org}
                onChange={(e) => update("org", e.target.value)}
                placeholder="Company, university, or org"
                className={fieldClass}
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-text-muted"
              >
                Role *
              </label>
              <input
                id="role"
                type="text"
                required
                value={form.role}
                onChange={(e) => update("role", e.target.value)}
                placeholder="Your role or title"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="intendedUse"
              className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-text-muted"
            >
              Intended use *
            </label>
            <textarea
              id="intendedUse"
              required
              rows={3}
              value={form.intendedUse}
              onChange={(e) => update("intendedUse", e.target.value)}
              placeholder="How do you plan to use OmniSign's technology or data?"
              className={fieldClass}
            />
          </div>

          <div>
            <label
              htmlFor="datasetNeeds"
              className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-text-muted"
            >
              Dataset access needs
            </label>
            <textarea
              id="datasetNeeds"
              rows={2}
              value={form.datasetNeeds}
              onChange={(e) => update("datasetNeeds", e.target.value)}
              placeholder="Specific datasets or model details you need access to (optional)"
              className={fieldClass}
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={form.ndaReady}
              onChange={(e) => update("ndaReady", e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-text-primary"
            />
            <span className="text-sm text-text-secondary">
              I understand that access requires signing a non-disclosure
              agreement and I am prepared to do so. *
            </span>
          </label>

          <button
            type="submit"
            className="mt-2 border border-text-primary px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-text-primary transition-colors hover:bg-text-primary hover:text-surface focus:outline-none focus:ring-1 focus:ring-text-primary focus:ring-offset-2 focus:ring-offset-surface"
          >
            Generate email template
          </button>
        </form>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-emerald-400">
            <Check size={18} />
            <span className="font-mono text-sm">
              Template generated. Copy and send via email.
            </span>
          </div>

          <div className="relative border border-border bg-surface-raised p-4">
            <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-text-secondary">
              {buildEmailTemplate(form)}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute right-3 top-3 flex items-center gap-1.5 border border-border px-2.5 py-1 font-mono text-[11px] text-text-muted transition-colors hover:border-border-strong hover:text-text-secondary focus:outline-none focus:ring-1 focus:ring-border-strong"
            >
              {copied ? (
                <>
                  <Check size={12} /> Copied
                </>
              ) : (
                <>
                  <Copy size={12} /> Copy
                </>
              )}
            </button>
          </div>

          <a
            href={`mailto:hello@laythayache.com?subject=OmniSign%20—%20Access%20Request%20(NDA)&body=${encodeURIComponent(buildEmailTemplate(form))}`}
            className="inline-flex items-center gap-2 border border-text-primary px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-text-primary transition-colors hover:bg-text-primary hover:text-surface"
          >
            Open in email client
          </a>

          <button
            onClick={() => {
              setSubmitted(false);
              setForm(initial);
            }}
            className="self-start font-mono text-xs text-text-muted underline underline-offset-2 hover:text-text-secondary"
          >
            Start over
          </button>
        </div>
      )}
    </div>
  );
}
