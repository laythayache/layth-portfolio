import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";

interface Item {
  id: string;
  url: string;
  caption: string;
  kind?: "image" | "video";
}

export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadGallery = useCallback(async () => {
    try {
      const r = await fetch("/api/gallery");
      if (r.ok) {
        const d = await r.json();
        setItems(d.items || []);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        setAuthed(!!d.authed);
        if (d.authed) loadGallery();
      })
      .catch(() => setAuthed(false));
  }, [loadGallery]);

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
        loadGallery();
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
    setItems([]);
  }

  async function upload(files: FileList | null) {
    if (!files || !files.length) return;
    setBusy(true);
    setError("");
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const r = await fetch("/api/gallery", { method: "POST", body: fd });
        if (!r.ok) {
          const d = await r.json().catch(() => ({}));
          setError(d.error || `Upload failed: ${file.name}`);
        }
      } catch {
        setError(`Upload failed: ${file.name}`);
      }
    }
    if (fileRef.current) fileRef.current.value = "";
    await loadGallery();
    setBusy(false);
  }

  async function patch(id: string, body: Record<string, unknown>) {
    try {
      const r = await fetch(`/api/gallery/${id}`, {
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
    if (!window.confirm("Delete this item?")) return;
    try {
      const r = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (r.ok) {
        const d = await r.json();
        setItems(d.items || []);
      }
    } catch {
      /* ignore */
    }
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
          <h1 className="font-serif text-2xl text-text-primary">Gallery admin</h1>
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

  return (
    <div className="min-h-screen bg-surface px-6 py-10">
      <Helmet>
        <title>Admin — Layth Ayache</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between border-b border-border-strong pb-5">
          <div>
            <h1 className="font-serif text-2xl text-text-primary">Event gallery</h1>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
              {items.length} item{items.length === 1 ? "" : "s"} · order = display order on the hero
            </p>
          </div>
          <button onClick={logout} className="font-mono text-xs uppercase tracking-[0.18em] text-text-secondary transition-colors hover:text-accent">
            Log out
          </button>
        </header>

        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            upload(e.dataTransfer.files);
          }}
          className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-border-strong bg-surface-raised/50 px-6 py-10 text-center transition-colors hover:border-accent"
        >
          <input ref={fileRef} type="file" accept="image/*,video/mp4,video/webm" multiple className="hidden" onChange={(e) => upload(e.target.files)} />
          <span className="font-mono text-sm text-text-primary">{busy ? "Uploading…" : "Drop images or video here, or click to choose"}</span>
          <span className="font-mono text-[11px] text-text-muted">JPG · PNG · WEBP · AVIF · GIF up to 10MB · MP4 · WEBM up to 50MB</span>
        </label>
        {error && <p className="mt-3 font-mono text-xs text-warn">{error}</p>}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <div key={it.id} className="overflow-hidden border border-border-strong bg-surface-raised">
              <div className="relative aspect-[4/3] bg-surface-overlay">
                {it.kind === "video" ? (
                  <video src={it.url} className="h-full w-full object-cover" muted playsInline controls preload="metadata" />
                ) : (
                  <img src={it.url} alt={it.caption} className="h-full w-full object-cover" loading="lazy" />
                )}
                <span className="absolute left-2 top-2 bg-ink/70 px-2 py-0.5 font-mono text-[10px] text-surface">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {it.kind === "video" && (
                  <span className="absolute right-2 top-2 bg-accent/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-surface-raised">
                    video
                  </span>
                )}
              </div>
              <div className="p-3">
                <input
                  defaultValue={it.caption}
                  placeholder="Caption (event name)…"
                  onBlur={(e) => {
                    if (e.target.value !== it.caption) patch(it.id, { caption: e.target.value });
                  }}
                  className="w-full border-b border-border bg-transparent pb-1 font-mono text-xs text-text-primary outline-none focus:border-accent"
                />
                <div className="mt-3 flex items-center justify-between">
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
          ))}
        </div>
        {items.length === 0 && (
          <p className="mt-10 text-center font-mono text-sm text-text-muted">Nothing yet — add your first highlighted event above.</p>
        )}
      </div>
    </div>
  );
}
