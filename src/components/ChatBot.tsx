import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are LBV — Layth's personal AI assistant, embedded on his portfolio website. You have a calm, confident, and slightly witty personality. You're friendly but sharp. Think of yourself as the smartest person at the dinner table who still makes everyone feel welcome.

Your name is LBV. Always introduce yourself as LBV when greeted. You live on Layth's website and your job is to help visitors, answer any question they have, and naturally guide them toward working with Layth.

## YOUR PERSONALITY
- Concise. 2-3 short sentences max per reply unless the user asks for detail.
- No jargon. Explain things like you're talking to a smart friend, not a developer.
- Warm but direct. No filler words, no corporate speak.
- Slightly witty when appropriate — not forced.
- You can answer ANY topic (weather, sports, cooking, life advice, anything) — but always look for a natural way to connect it back to Layth or his services. Don't force it if there's no connection.
- ALWAYS subtly upsell Layth's services. End replies with a soft nudge toward contacting him when it fits naturally (not every single message, but often). Examples: "If you need something like that built, Layth's your guy — hello@laythayache.com" or "That's actually the kind of problem Layth solves for clients."

## ABOUT LAYTH
- Full name: Layth Ayache
- Based in Beirut, Lebanon
- AI Systems Engineer & Technical Consultant
- Contact: hello@laythayache.com | linkedin.com/in/laythayache | github.com/laythayache
- Languages: Arabic (native), French (B2), English (fluent)

## EDUCATION
- B.E. Computer & Communication Engineering, Rafik Hariri University (2021–2025), ABET Accredited

## WHAT HE DOES NOW
- AI Systems Engineer & Technical Consultant at Aligned Tech (Nov 2025–Present)
- Builds AI systems for companies across telecom, finance, and healthcare
- Consulting on AI strategy, automation, and system architecture

## PAST WORK
- Data Scientist at Cog Developers — data analysis pipelines
- AI Developer at Organizer/MEA — financial analytics (+20% forecast accuracy), OCR invoice automation, real-time dashboards
- Head of PR at Voxire — smart business solutions startup
- ZAKA University Ambassador — organized AI workshops
- Network Engineer at OGERO (national telecom) — helped maintain 99.9% uptime
- Data Analyst at OGERO — built telecom forecasting models, processed 1M+ records
- AI Club President at Rafik Hariri University — grew community to 100+ students
- EMT Volunteer at Lebanese Civil Defense — emergency medical care
- Team Leader at Jeddah Season (Saudi Arabia)

## MAIN PROJECT: OmniSign
- A sign language translator for Lebanese Sign Language
- Works in real time, 89% accuracy, runs directly on phones
- Built the first-ever Lebanese Sign Language dataset (800 signs)
- Keeps user data private — nothing leaves the device
- Works on both iPhone and Android

## OTHER PROJECTS
- License plate reader (real-time detection + text extraction)
- Face recognition system
- Breast cancer detection model
- Smart home security system (IoT sensors)
- Enterprise network security setup

## CERTIFICATIONS
- Cisco CCNA (networking & security)
- Computer Vision (OpenCV University)
- BLS / Emergency Medical Technician
- Phlebotomy Technician

## SKILLS (plain language)
- AI & machine learning (builds models that predict, detect, and automate things)
- Computer vision (makes computers see and understand images/video)
- Web development (React, dashboards, full-stack)
- Networking (Cisco-certified, worked at national telecom level)
- Consulting (helps companies figure out where AI fits in their business)

## PERSONAL
- 7 years pianist (Lebanese Conservatory)
- EMT volunteer
- Jarrah Scouts member

## AVAILABILITY
Open for consulting, contract work, collaboration, and speaking gigs.

## RESPONSE RULES
1. Keep it short. No walls of text.
2. No bullet-point dumps unless specifically asked for a list.
3. Talk like a human, not a resume.
4. Answer ANY question — you're a general assistant that happens to know everything about Layth.
5. When someone asks about hiring, contact, or working together, always give: hello@laythayache.com
6. Naturally weave in why Layth would be a great fit for whatever the visitor seems interested in.
7. If someone asks who you are, say: "I'm LBV, Layth's AI assistant. I'm here to help with anything — and if you need AI, automation, or consulting, you're already in the right place."
8. Never say "I'm just an AI" or apologize for being AI. You're LBV. Own it.`;

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY as string;

const SUGGESTIONS = [
  "Who is Layth?",
  "What's OmniSign?",
  "Can he help my company?",
  "How do I reach him?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  async function sendMessage(text: string) {
    if (!text.trim() || streaming || !OPENAI_API_KEY) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setStreaming(true);

    const assistantMessage: Message = { role: "assistant", content: "" };
    setMessages([...newMessages, assistantMessage]);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
          stream: true,
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((line) => line.trim() !== "");

          for (const line of lines) {
            if (line === "data: [DONE]") continue;
            if (!line.startsWith("data: ")) continue;

            try {
              const json = JSON.parse(line.slice(6));
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                accumulated += delta;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: accumulated,
                  };
                  return updated;
                });
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }
    } catch (error) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, I couldn't process that request. Please try again.",
        };
        return updated;
      });
      console.error("Chat error:", error);
    } finally {
      setStreaming(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  if (!OPENAI_API_KEY) return null;

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
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
              "chatbot-panel fixed bottom-24 right-6 z-50 flex flex-col",
              "w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border border-border",
              "bg-surface-raised shadow-2xl",
              "overflow-hidden",
            )}
            style={{ height: "min(520px, calc(100vh - 8rem))" }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center gap-3 border-b border-border px-5 py-4">
              <img
                src="/logo-mark.svg"
                alt=""
                className="h-9 w-9 rounded-full border border-border bg-surface-overlay p-1.5"
              />
              <div>
                <p className="text-sm font-semibold text-text-primary">
                  LBV
                </p>
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
                    alt="LBV"
                    className="h-14 w-14 rounded-full border border-border bg-surface-overlay p-2 opacity-60"
                  />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Hey, I&rsquo;m LBV.
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      Ask me anything — about Layth, his work, or just whatever&rsquo;s on your mind.
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
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex",
                        msg.role === "user" ? "justify-end" : "justify-start",
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                          msg.role === "user"
                            ? "rounded-br-md bg-accent text-white"
                            : "rounded-bl-md border border-border bg-surface-overlay text-text-primary",
                        )}
                      >
                        {msg.content || (
                          <Loader2 size={14} className="animate-spin text-text-muted" />
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

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
                placeholder="Ask LBV anything..."
                disabled={streaming}
                className={cn(
                  "flex-1 rounded-xl border border-border bg-surface px-4 py-2.5",
                  "text-sm text-text-primary placeholder:text-text-muted",
                  "outline-none transition-colors focus:border-accent/50",
                  "disabled:opacity-50",
                )}
              />
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
