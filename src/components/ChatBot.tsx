import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  Calendar,
  Mail,
  Mic,
  MicOff,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "@/context/ChatContext";

interface Message {
  role: "user" | "assistant";
  content: string;
  showActionCard?: boolean;
}

interface ContactFormState {
  name: string;
  email: string;
  note: string;
}

const INITIAL_FORM: ContactFormState = { name: "", email: "", note: "" };

const SUGGESTIONS = [
  "What has Layth built?",
  "What can Layth build for me?",
  "I want to collaborate",
  "How do I reach him?",
];

const ACTION_TOKEN = "[ACTION:contact]";
const CALENDLY_URL = "https://calendly.com/laythayache5/30min";
const EMAIL = "laythayache5@gmail.com";

/** Strip [ACTION:contact] token and detect if it was present */
function parseMessage(content: string): { text: string; hasAction: boolean } {
  const hasAction = content.includes(ACTION_TOKEN);
  const text = content.replace(ACTION_TOKEN, "").trim();
  return { text, hasAction };
}

/** Render markdown-style links [text](url) as anchor tags */
function renderLinks(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <a
          key={i}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent transition-colors"
        >
          {match[1]}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function ContactCard() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.note.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          message: `[LBV Chatbot] ${form.note}`,
          subject: `Chat inquiry from ${form.name}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm(INITIAL_FORM);
      } else {
        setError("Something went wrong. Try emailing directly.");
      }
    } catch {
      setError("Something went wrong. Try emailing directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-2 rounded-xl border border-border bg-surface px-4 py-3 text-sm">
      {/* Quick action buttons */}
      <div className="flex flex-wrap gap-2">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border border-accent/40",
            "bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent",
            "transition-colors hover:bg-accent hover:text-white",
          )}
        >
          <Calendar size={12} aria-hidden />
          Schedule a Call
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border border-border-strong",
            "bg-surface-overlay px-3 py-1.5 text-xs font-medium text-text-secondary",
            "transition-colors hover:border-accent hover:text-accent",
          )}
        >
          <Mail size={12} aria-hidden />
          Email Layth
        </a>
      </div>

      {/* Divider + form toggle */}
      <button
        type="button"
        onClick={() => setShowForm((v) => !v)}
        className="mt-3 flex w-full items-center gap-2 text-xs text-text-muted transition-colors hover:text-text-secondary"
      >
        <span className="flex-1 border-t border-border" />
        <span>or leave a message</span>
        {showForm ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        <span className="flex-1 border-t border-border" />
      </button>

      {/* Inline form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {submitted ? (
              <div className="flex items-center gap-2 pt-3 text-xs text-emerald-500">
                <CheckCircle2 size={14} />
                Got it — Layth will follow up shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-3 space-y-2">
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={cn(
                    "w-full rounded-lg border border-border bg-surface-overlay px-3 py-2",
                    "text-xs text-text-primary placeholder:text-text-muted",
                    "outline-none transition-colors focus:border-accent/50",
                  )}
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={cn(
                    "w-full rounded-lg border border-border bg-surface-overlay px-3 py-2",
                    "text-xs text-text-primary placeholder:text-text-muted",
                    "outline-none transition-colors focus:border-accent/50",
                  )}
                />
                <textarea
                  placeholder="What's on your mind?"
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                  rows={2}
                  className={cn(
                    "w-full resize-none rounded-lg border border-border bg-surface-overlay px-3 py-2",
                    "text-xs text-text-primary placeholder:text-text-muted",
                    "outline-none transition-colors focus:border-accent/50",
                  )}
                />
                {error && (
                  <p className="text-xs text-red-400">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className={cn(
                    "w-full rounded-lg bg-accent py-2 text-xs font-medium text-white",
                    "transition-colors hover:bg-accent-hover disabled:opacity-50",
                  )}
                >
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Voice helpers ---
type SpeechRecognitionInstance = InstanceType<typeof SpeechRecognition>;

function getSpeechRecognition(): SpeechRecognitionInstance | null {
  const SR =
    typeof window !== "undefined"
      ? (window as unknown as Record<string, unknown>).SpeechRecognition ??
        (window as unknown as Record<string, unknown>).webkitSpeechRecognition
      : null;
  if (!SR) return null;
  const instance = new (SR as new () => SpeechRecognitionInstance)();
  instance.continuous = false;
  instance.interimResults = false;
  instance.lang = "en-US";
  return instance;
}

function speak(text: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

export default function ChatBot() {
  const { isOpen: open, isVoiceMode, toggleChat, closeChat } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const voiceAutoStarted = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current && !isVoiceMode) {
      inputRef.current.focus();
    }
  }, [open, isVoiceMode]);

  // Auto-start listening when opened in voice mode
  useEffect(() => {
    if (open && isVoiceMode && !voiceAutoStarted.current) {
      voiceAutoStarted.current = true;
      startListening();
    }
    if (!open) {
      voiceAutoStarted.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isVoiceMode]);

  function startListening() {
    const recognition = getSpeechRecognition();
    if (!recognition) return;
    recognitionRef.current = recognition;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) sendMessage(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
    setIsListening(true);
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setIsListening(false);
  }

  function toggleListening() {
    if (isListening) stopListening();
    else startListening();
  }

  async function sendMessage(text: string) {
    if (!text.trim() || streaming) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setStreaming(true);

    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages([...newMessages, assistantMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (response.status === 429) throw new Error("rate-limited");
      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((l) => l.trim() !== "");

          for (const line of lines) {
            if (line === "data: [DONE]") continue;
            if (!line.startsWith("data: ")) continue;
            try {
              const json = JSON.parse(line.slice(6));
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                accumulated += delta;
                const { text: displayText, hasAction } = parseMessage(accumulated);
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: accumulated,
                    showActionCard: hasAction,
                  };
                  return updated;
                });
                void displayText; // used via showActionCard
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }

      // Speak the final response in voice mode
      if (isVoiceMode && accumulated) {
        const { text: spokenText } = parseMessage(accumulated);
        if (spokenText) speak(spokenText);
      }
    } catch (error) {
      const isRateLimited =
        error instanceof Error && error.message === "rate-limited";
      const errorMsg = isRateLimited
        ? "Too many questions — try again in a bit."
        : "Sorry, I couldn't process that. Please try again.";
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: errorMsg,
        };
        return updated;
      });
      if (isVoiceMode) speak(errorMsg);
      if (!isRateLimited) console.error("Chat error:", error);
    } finally {
      setStreaming(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        type="button"
        onClick={toggleChat}
        className={cn(
          "chatbot-toggle fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center",
          "rounded-full border border-accent/30 bg-accent text-white shadow-lg",
          "transition-colors hover:bg-accent-hover",
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close chat" : "Chat with AI assistant"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={cn(
              "chatbot-panel fixed z-50 flex flex-col",
              "border border-border bg-surface-raised shadow-2xl overflow-hidden",
              "inset-0 h-[100dvh] rounded-none",
              "sm:inset-auto sm:bottom-24 sm:right-6 sm:h-[min(560px,calc(100vh-8rem))] sm:w-[380px] sm:max-w-[calc(100vw-2rem)] sm:rounded-2xl",
            )}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-border px-5 py-4">
              <img
                src="/logo-mark.svg"
                alt="LBV assistant logo"
                width={1248}
                height={832}
                loading="eager"
                decoding="async"
                className="h-9 w-9 rounded-full border border-border bg-surface-overlay p-1.5"
              />
              <div>
                <p className="text-sm font-semibold text-text-primary">LBV</p>
                <p className="text-xs text-text-muted">
                  Layth&rsquo;s AI &middot; ask me anything
                </p>
              </div>
            </div>

            {/* Messages area */}
            <div className="chatbot-messages flex-1 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <img
                    src="/logo-mark.svg"
                    alt="LBV logo"
                    width={1248}
                    height={832}
                    loading="lazy"
                    decoding="async"
                    className="h-14 w-14 rounded-full border border-border bg-surface-overlay p-2 opacity-60"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Hey, I&rsquo;m LBV.
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      Ask me anything — about Layth, his work, or how he can help you.
                    </p>
                  </div>
                  <div className="mt-2 flex flex-wrap justify-center gap-2">
                    {SUGGESTIONS.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => sendMessage(suggestion)}
                        className={cn(
                          "rounded-full border border-border-strong px-3 py-1.5",
                          "font-mono text-xs text-text-secondary",
                          "transition-colors hover:border-accent hover:text-accent",
                        )}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, i) => {
                    const { text, hasAction } = parseMessage(msg.content);
                    return (
                      <div key={i}>
                        <div
                          className={cn(
                            "flex",
                            msg.role === "user" ? "justify-end" : "justify-start",
                          )}
                        >
                          <div
                            className={cn(
                              "max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                              msg.role === "user"
                                ? "rounded-br-md bg-accent text-white"
                                : "rounded-bl-md border border-border bg-surface-overlay text-text-primary",
                            )}
                          >
                            {text ? (
                              renderLinks(text)
                            ) : (
                              <Loader2 size={14} className="animate-spin text-text-muted" />
                            )}
                          </div>
                        </div>

                        {/* Action card — shown when bot signals [ACTION:contact] */}
                        {msg.role === "assistant" &&
                          (hasAction || msg.showActionCard) &&
                          text && <ContactCard />}
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Voice listening indicator */}
            {isListening && (
              <div className="flex items-center gap-2 border-t border-border px-4 py-2">
                <span className="animate-mic-pulse inline-block h-3 w-3 rounded-full bg-red-500" />
                <span className="text-xs text-text-muted">Listening...</span>
                <button
                  type="button"
                  onClick={stopListening}
                  className="ml-auto text-xs text-text-muted hover:text-accent"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Input area */}
            <form
              onSubmit={handleSubmit}
              className="flex shrink-0 items-center gap-2 border-t border-border px-4 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask LBV anything…"
                disabled={streaming || isListening}
                className={cn(
                  "flex-1 rounded-xl border border-border bg-surface px-4 py-2.5",
                  "text-sm text-text-primary placeholder:text-text-muted",
                  "outline-none transition-colors focus:border-accent/50",
                  "disabled:opacity-50",
                )}
              />
              <button
                type="button"
                onClick={toggleListening}
                disabled={streaming}
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  "border transition-colors",
                  isListening
                    ? "animate-mic-pulse border-red-400 bg-red-50 text-red-500"
                    : "border-border-strong bg-surface-overlay text-text-muted hover:border-accent hover:text-accent",
                  "disabled:opacity-40",
                )}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
              <button
                type="submit"
                disabled={streaming || !input.trim()}
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  "bg-accent text-white transition-colors",
                  "hover:bg-accent-hover disabled:opacity-40 disabled:hover:bg-accent",
                )}
                aria-label="Send message"
              >
                {streaming ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
