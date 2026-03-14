import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SECTION } from "@/motion/tokens";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterSignup() {
  const reduced = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");

    try {
      const res = await fetch("https://buttondown.com/api/emails/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          tags: ["portfolio"],
        }),
      });

      if (res.ok || res.status === 201) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-border bg-surface-raised px-5 py-4 text-center">
        <p className="text-sm font-medium text-emerald-700">
          You're subscribed. I'll email you when I publish something new.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-border bg-surface-raised px-5 py-5"
    >
      <p className="text-base font-semibold text-text-primary">
        Get notified when I publish
      </p>
      <p className="mt-1 text-sm text-text-muted">
        No spam, no noise. Unsubscribe anytime.
      </p>
      <div className="mt-3 flex gap-2">
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          required
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-md border border-border-strong bg-white px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none"
        />
        <motion.button
          type="submit"
          disabled={status === "loading"}
          whileHover={reduced ? undefined : SECTION.buttonHover}
          whileTap={reduced ? undefined : SECTION.buttonTap}
          className="shrink-0 rounded-md border border-accent bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </motion.button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
