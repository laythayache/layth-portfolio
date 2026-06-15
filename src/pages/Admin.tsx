import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";

/* ── collection config ─────────────────────────────────────────────
   One admin screen manages two R2-backed collections — the event
   gallery and the Trusted-by client logos. They share the same CRUD
   shape (upload → list → edit fields → reorder → delete); only the
   endpoint, accepted types, editable fields, and preview differ. */
type Field = { key: string; label: string; placeholder: string; type?: string };
type Config = {
  endpoint: string;
  title: string;
  countNoun: string;
  orderNote: string;
  accept: string;
  acceptNote: string;
  dropLabel: string;
  preview: "cover" | "logo";
  fields: Field[];
  deriveName?: string; // field auto-filled from the filename on upload
  emptyNote: string;
  hasVisibility?: boolean; // show a per-item "show on site" toggle
  listQuery?: string; // extra query for the admin list fetch (e.g. "?admin=1")
};

const GALLERY_CONFIG: Config = {
  endpoint: "/api/gallery",
  title: "Event gallery",
  countNoun: "image",
  orderNote: "order = display order on the hero",
  accept: "image/*",
  acceptNote: "JPG · PNG · WEBP · AVIF · GIF — up to 10MB each",
  dropLabel: "Drop images here, or click to choose",
  preview: "cover",
  fields: [{ key: "caption", label: "Caption", placeholder: "Caption (event name)…" }],
  emptyNote: "No images yet — add your first highlighted event above.",
};

const CLIENTS_CONFIG: Config = {
  endpoint: "/api/clients",
  title: "Trusted by",
  countNoun: "logo",
  orderNote: "order = display order in the Trusted by section",
  accept: "image/svg+xml,image/png,image/webp,image/avif,image/gif,image/jpeg",
  acceptNote: "SVG · PNG · WEBP · AVIF · GIF · JPG — light or monochrome reads best on the dark band · up to 5MB",
  dropLabel: "Drop logos here, or click to choose",
  preview: "logo",
  fields: [
    { key: "name", label: "Name", placeholder: "Client name…" },
    { key: "href", label: "Link", placeholder: "https://…", type: "url" },
  ],
  deriveName: "name",
  emptyNote: "No logos yet — drop a client logo above, then set its name and link.",
  hasVisibility: true,
  listQuery: "?admin=1",
};

const TABS = [
  { id: "gallery", label: "Gallery", config: GALLERY_CONFIG },
  { id: "clients", label: "Trusted by", config: CLIENTS_CONFIG },
  { id: "about", label: "About", config: undefined },
] as const;

type Item = { id: string; url: string; [k: string]: unknown };

function prettyName(filename: string) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function CollectionManager({ config }: { config: Config }) {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const r = await fetch(config.endpoint + (config.listQuery || ""), { cache: "no-store" });
      if (r.ok) {
        const d = await r.json();
        setItems(d.items || []);
      }
    } catch {
      /* ignore */
    }
  }, [config.endpoint, config.listQuery]);

  useEffect(() => {
    load();
  }, [load]);

  async function upload(files: FileList | null) {
    if (!files || !files.length) return;
    setBusy(true);
    setError("");
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      if (config.deriveName) fd.append(config.deriveName, prettyName(file.name));
      try {
        const r = await fetch(config.endpoint, { method: "POST", body: fd });
        if (!r.ok) {
          const d = await r.json().catch(() => ({}));
          setError(d.error || `Upload failed: ${file.name}`);
        }
      } catch {
        setError(`Upload failed: ${file.name}`);
      }
    }
    if (fileRef.current) fileRef.current.value = "";
    await load();
    setBusy(false);
  }

  async function patch(id: string, body: Record<string, unknown>) {
    try {
      const r = await fetch(`${config.endpoint}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (r.ok) {
        const d = await r.json();
        setItems(d.items || []);
      }
    } catch {
      /* ignore */
    }
  }

  async function del(id: string) {
    if (!window.confirm(`Delete this ${config.countNoun}?`)) return;
    try {
      const r = await fetch(`${config.endpoint}/${id}`, { method: "DELETE" });
      if (r.ok) {
        const d = await r.json();
        setItems(d.items || []);
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <div>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
        {items.length} {config.countNoun}
        {items.length === 1 ? "" : "s"}
        {config.hasVisibility && items.some((it) => it.visible === false)
          ? ` · ${items.filter((it) => it.visible === false).length} hidden`
          : ""}{" "}
        · {config.orderNote}
      </p>

      <label
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          upload(e.dataTransfer.files);
        }}
        className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-border-strong bg-surface-raised/50 px-6 py-10 text-center transition-colors hover:border-accent"
      >
        <input
          ref={fileRef}
          type="file"
          accept={config.accept}
          multiple
          className="hidden"
          onChange={(e) => upload(e.target.files)}
        />
        <span className="font-mono text-sm text-text-primary">{busy ? "Uploading…" : config.dropLabel}</span>
        <span className="font-mono text-[11px] text-text-muted">{config.acceptNote}</span>
      </label>
      {error && <p className="mt-3 font-mono text-xs text-warn">{error}</p>}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => {
          const hidden = config.hasVisibility && it.visible === false;
          return (
            <div key={it.id} className="overflow-hidden border border-border-strong bg-surface-raised">
              <div className="relative aspect-[4/3]">
                {config.preview === "logo" ? (
                  <div className="grid h-full w-full place-items-center bg-ink p-6">
                    <img
                      src={it.url}
                      alt={String(it.name ?? "")}
                      className={`max-h-16 max-w-[72%] object-contain${hidden ? " opacity-20" : ""}`}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <img
                    src={it.url}
                    alt={String(it.caption ?? "")}
                    className={`h-full w-full bg-surface-overlay object-cover${hidden ? " opacity-30" : ""}`}
                    loading="lazy"
                  />
                )}
                <span className="absolute left-2 top-2 bg-ink/70 px-2 py-0.5 font-mono text-[10px] text-surface">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {hidden && (
                  <span className="absolute right-2 top-2 bg-warn/85 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-surface">
                    Hidden
                  </span>
                )}
              </div>
              <div className="space-y-2 p-3">
                {config.fields.map((f) => (
                  <input
                    key={f.key}
                    type={f.type ?? "text"}
                    defaultValue={String(it[f.key] ?? "")}
                    placeholder={f.placeholder}
                    onBlur={(e) => {
                      if (e.target.value !== String(it[f.key] ?? "")) patch(it.id, { [f.key]: e.target.value });
                    }}
                    className="w-full border-b border-border bg-transparent pb-1 font-mono text-xs text-text-primary outline-none focus:border-accent"
                  />
                ))}
                {config.hasVisibility && (
                  <button
                    type="button"
                    onClick={() => patch(it.id, { visible: it.visible === false })}
                    className={
                      "flex w-full items-center justify-center gap-2 border px-2 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors " +
                      (hidden
                        ? "border-border-strong text-text-muted hover:border-accent hover:text-accent"
                        : "border-accent/50 bg-accent/12 text-accent hover:bg-accent/20")
                    }
                  >
                    {hidden ? "○ Hidden — show on site" : "● Shown on site"}
                  </button>
                )}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex gap-1">
                    <button
                      onClick={() => patch(it.id, { direction: "up" })}
                      disabled={i === 0}
                      aria-label="Move up"
                      className="border border-border-strong px-2 py-1 font-mono text-xs text-text-secondary transition-colors disabled:opacity-30 hover:enabled:border-accent hover:enabled:text-accent"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => patch(it.id, { direction: "down" })}
                      disabled={i === items.length - 1}
                      aria-label="Move down"
                      className="border border-border-strong px-2 py-1 font-mono text-xs text-text-secondary transition-colors disabled:opacity-30 hover:enabled:border-accent hover:enabled:text-accent"
                    >
                      ↓
                    </button>
                  </div>
                  <button onClick={() => del(it.id)} className="font-mono text-xs uppercase tracking-wide text-warn/80 transition-colors hover:text-warn">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {items.length === 0 && <p className="mt-10 text-center font-mono text-sm text-text-muted">{config.emptyNote}</p>}
    </div>
  );
}

/* ── About page editor (single CMS document, GET/PUT /api/about) ──── */
type AFact = { label: string; value: string };
type APrinciple = { title: string; body: string };
type ADoc = { role: string; intro: string; facts: AFact[]; focusTitle: string; focus: string[]; principlesTitle: string; principles: APrinciple[] };
const ABOUT_EMPTY: ADoc = { role: "", intro: "", facts: [], focusTitle: "Focus areas", focus: [], principlesTitle: "How I work", principles: [] };
const aInput = "w-full border border-border-strong bg-surface px-3 py-2 font-mono text-sm text-text-primary outline-none focus:border-accent";
const aLabel = "mb-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted";
const aAdd = "border border-border-strong px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-text-secondary transition-colors hover:border-accent hover:text-accent";
const aDel = "shrink-0 border border-border-strong px-3 font-mono text-xs text-warn/80 transition-colors hover:text-warn";

function AboutEditor() {
  const [doc, setDoc] = useState<ADoc>(ABOUT_EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    fetch("/api/about")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d) setDoc({ ...ABOUT_EMPTY, ...d }); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const set = (patch: Partial<ADoc>) => setDoc((d) => ({ ...d, ...patch }));

  async function save() {
    setStatus("saving");
    try {
      const r = await fetch("/api/about", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(doc) });
      if (r.ok) {
        const d = await r.json();
        setDoc({ ...ABOUT_EMPTY, ...d });
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 2500);
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (!loaded) return <p className="font-mono text-sm text-text-muted">Loading…</p>;

  return (
    <div className="space-y-7">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
        Edit the /about page text · empty sections hide · feeds the homepage About band too · live ~30s after save
      </p>

      <div>
        <label className={aLabel}>Role / subtitle</label>
        <input className={aInput} value={doc.role} onChange={(e) => set({ role: e.target.value })} placeholder="AI Systems Engineer & Technical Consultant" />
      </div>

      <div>
        <label className={aLabel}>Intro — your bio (blank line = new paragraph)</label>
        <textarea className={`${aInput} min-h-[150px] leading-relaxed`} value={doc.intro} onChange={(e) => set({ intro: e.target.value })} placeholder="Write your bio in your own words…" />
      </div>

      <div>
        <label className={aLabel}>Facts — label + value</label>
        <div className="space-y-2">
          {doc.facts.map((f, i) => (
            <div key={i} className="flex gap-2">
              <input className={`${aInput} sm:w-44 sm:flex-none`} value={f.label} placeholder="Based in" onChange={(e) => set({ facts: doc.facts.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)) })} />
              <input className={aInput} value={f.value} placeholder="Lebanon" onChange={(e) => set({ facts: doc.facts.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)) })} />
              <button className={aDel} onClick={() => set({ facts: doc.facts.filter((_, j) => j !== i) })} aria-label="Remove">✕</button>
            </div>
          ))}
          <button className={aAdd} onClick={() => set({ facts: [...doc.facts, { label: "", value: "" }] })}>+ Add fact</button>
        </div>
      </div>

      <div>
        <label className={aLabel}>Focus section title</label>
        <input className={aInput} value={doc.focusTitle} onChange={(e) => set({ focusTitle: e.target.value })} />
      </div>
      <div>
        <label className={aLabel}>Focus areas</label>
        <div className="space-y-2">
          {doc.focus.map((v, i) => (
            <div key={i} className="flex gap-2">
              <input className={aInput} value={v} placeholder="e.g. Workflow automation" onChange={(e) => set({ focus: doc.focus.map((x, j) => (j === i ? e.target.value : x)) })} />
              <button className={aDel} onClick={() => set({ focus: doc.focus.filter((_, j) => j !== i) })} aria-label="Remove">✕</button>
            </div>
          ))}
          <button className={aAdd} onClick={() => set({ focus: [...doc.focus, ""] })}>+ Add focus area</button>
        </div>
      </div>

      <div>
        <label className={aLabel}>Principles section title</label>
        <input className={aInput} value={doc.principlesTitle} onChange={(e) => set({ principlesTitle: e.target.value })} />
      </div>
      <div>
        <label className={aLabel}>Principles — title + body</label>
        <div className="space-y-3">
          {doc.principles.map((p, i) => (
            <div key={i} className="space-y-2 border border-border-strong/60 p-3">
              <div className="flex gap-2">
                <input className={aInput} value={p.title} placeholder="Architecture before automation" onChange={(e) => set({ principles: doc.principles.map((x, j) => (j === i ? { ...x, title: e.target.value } : x)) })} />
                <button className={aDel} onClick={() => set({ principles: doc.principles.filter((_, j) => j !== i) })} aria-label="Remove">✕</button>
              </div>
              <textarea className={`${aInput} min-h-[72px]`} value={p.body} placeholder="Short paragraph in your own words…" onChange={(e) => set({ principles: doc.principles.map((x, j) => (j === i ? { ...x, body: e.target.value } : x)) })} />
            </div>
          ))}
          <button className={aAdd} onClick={() => set({ principles: [...doc.principles, { title: "", body: "" }] })}>+ Add principle</button>
        </div>
      </div>

      <div className="flex items-center gap-4 border-t border-border-strong pt-5">
        <button onClick={save} disabled={status === "saving"} className="bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-surface-raised transition-colors hover:bg-accent-hover disabled:opacity-50">
          {status === "saving" ? "Saving…" : "Save"}
        </button>
        {status === "saved" && <span className="font-mono text-xs text-accent">✓ Saved — live in ~30s</span>}
        {status === "error" && <span className="font-mono text-xs text-warn">Save failed</span>}
      </div>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("gallery");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setAuthed(!!d.authed))
      .catch(() => setAuthed(false));
  }, []);

  async function login(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (r.ok) {
        setAuthed(true);
        setPassword("");
      } else {
        const d = await r.json().catch(() => ({}));
        setError(d.error || "Login failed");
      }
    } catch {
      setError("Network error");
    }
  }

  async function logout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    setAuthed(false);
  }

  if (authed === null) {
    return <div className="grid min-h-screen place-items-center bg-surface font-mono text-sm text-text-muted">Loading…</div>;
  }

  if (!authed) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface px-6">
        <Helmet>
          <title>Admin — Layth Ayache</title>
          <meta name="robots" content="noindex,nofollow" />
        </Helmet>
        <form onSubmit={login} className="w-full max-w-sm border border-border-strong bg-surface-raised p-8">
          <h1 className="font-serif text-2xl text-text-primary">Admin</h1>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">Enter password to continue</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            placeholder="Password"
            className="mt-6 w-full border border-border-strong bg-surface px-4 py-3 text-text-primary outline-none focus:border-accent"
          />
          {error && <p className="mt-3 font-mono text-xs text-warn">{error}</p>}
          <button
            type="submit"
            className="mt-5 w-full bg-accent px-4 py-3 font-mono text-xs uppercase tracking-[0.18em] text-surface-raised transition-colors hover:bg-accent-hover"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  const active = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <div className="min-h-screen bg-surface px-6 py-10">
      <Helmet>
        <title>Admin — Layth Ayache</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between border-b border-border-strong pb-5">
          <h1 className="font-serif text-2xl text-text-primary">{active.id === "about" ? "About page" : active.config?.title}</h1>
          <button onClick={logout} className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary transition-colors hover:text-accent">
            Log out
          </button>
        </header>

        {/* collection tabs */}
        <div className="mt-5 flex gap-2" role="tablist" aria-label="Collections">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={
                tab === t.id
                  ? "border border-accent bg-accent/12 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-text-primary"
                  : "border border-border-strong px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-text-secondary transition-colors hover:border-accent hover:text-accent"
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {/* key forces a fresh load when switching collections */}
          {active.id === "about" ? (
            <AboutEditor key="about" />
          ) : (
            <CollectionManager key={active.id} config={active.config as Config} />
          )}
        </div>
      </div>
    </div>
  );
}
