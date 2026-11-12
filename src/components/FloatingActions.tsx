"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconBot, IconClose, IconSend, IconWhatsapp } from "./Icons";
import { LogoMark } from "./Logo";
import { waLink } from "@/lib/data";

type Msg = {
  role: "bot" | "user";
  text: string;
  actions?: { label: string; href: string }[];
};

const quick = ["Harga rumah", "Tipe rumah", "Lokasi", "Simulasi KPR", "Jadwal visit"];

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "Halo 🌿 Saya asisten virtual Green Setiabudi Residence. Ada yang bisa saya bantu?",
    },
  ]);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, open, loading]);

  const send = async (text: string) => {
    const t = text.trim();
    if (!t || loading) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: t }),
      });
      if (!res.ok) throw new Error("bad");
      const data = (await res.json()) as { reply: string; actions?: Msg["actions"] };
      setMsgs((m) => [...m, { role: "bot", text: data.reply, actions: data.actions }]);
    } catch {
      setMsgs((m) => [
        ...m,
        {
          role: "bot",
          text: "Maaf, terjadi kendala. Silakan hubungi marketing langsung via WhatsApp.",
          actions: [{ label: "Chat WhatsApp", href: waLink("Halo, saya ingin bertanya tentang Green Setiabudi Residence.") }],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Panel chatbot */}
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-label="Chatbot Green Setiabudi"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-4 z-[60] flex h-[32rem] max-h-[calc(100vh-7rem)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-gold/30 bg-deep shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] md:bottom-28 md:right-6"
          >
            <div className="flex items-center gap-3 bg-forest px-5 py-4">
              <LogoMark className="h-9 w-9" />
              <div className="flex-1">
                <p className="font-heading text-sm font-semibold tracking-wider text-beige">Asisten Green Setiabudi</p>
                <p className="flex items-center gap-1.5 text-[11px] text-leaf">
                  <span className="h-1.5 w-1.5 rounded-full bg-leaf" /> Online
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Tutup chat" className="rounded-full p-1.5 text-beige/70 hover:bg-white/10">
                <IconClose className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {msgs.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user" ? "rounded-br-sm bg-gold text-charcoal" : "rounded-bl-sm bg-forest text-beige"
                    }`}
                  >
                    {m.text}
                    {m.actions?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {m.actions.map((a) => {
                          const ext = a.href.startsWith("http");
                          return (
                            <a
                              key={a.label}
                              href={a.href}
                              {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : { onClick: () => setOpen(false) })}
                              className="rounded-full border border-gold/50 px-3 py-1.5 text-[11px] font-semibold text-gold transition hover:bg-gold hover:text-charcoal"
                            >
                              {a.label}
                            </a>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
              {loading ? (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-forest px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-leaf" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              ) : null}
              <div ref={end} />
            </div>

            <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
              {quick.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => void send(q)}
                  className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-beige/80 transition hover:border-gold hover:text-gold"
                >
                  {q}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send(input);
              }}
              className="flex items-center gap-2 border-t border-white/10 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pertanyaan..."
                maxLength={300}
                aria-label="Tulis pesan"
                className="flex-1 rounded-full border border-white/15 bg-forest/50 px-4 py-2.5 text-sm text-beige outline-none placeholder:text-beige/30 focus:border-gold"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Kirim"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-charcoal transition disabled:opacity-40"
              >
                <IconSend className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Tombol mengambang */}
      <div className="fixed bottom-5 right-4 z-[60] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Tutup chatbot" : "Buka chatbot"}
          aria-expanded={open}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-forest text-gold shadow-xl transition hover:scale-105 hover:bg-gold hover:text-charcoal"
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconBot className="h-6 w-6" />}
        </button>

        <a
          href={waLink("Halo, saya tertarik dengan Green Setiabudi Residence. Boleh minta info lengkapnya?")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat WhatsApp"
          className="group relative flex h-14 items-center gap-2 rounded-full bg-[#25D366] pl-4 pr-5 text-white shadow-xl transition hover:scale-105"
        >
          <span className="absolute inset-0 -z-10 animate-pulseRing rounded-full bg-[#25D366]" />
          <IconWhatsapp className="h-7 w-7" />
          <span className="hidden text-sm font-semibold md:inline">Chat WhatsApp</span>
        </a>
      </div>
    </>
  );
}
