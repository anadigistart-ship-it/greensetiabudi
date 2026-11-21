"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IconWhatsapp } from "./Icons";
import { waLink } from "@/lib/data";

// Muncul sekali setiap sesi kunjungan (pertama kali web dibuka di tab/browser itu).
// Setelah ditutup, tidak muncul lagi sampai tab ditutup dan web dibuka kembali.
const KEY = "gs-welcome-seen";

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* storage diblokir: tetap tampilkan sekali per muat halaman */
    }
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* abaikan */
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Promo Green Setiabudi Residence"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-md overflow-hidden rounded-3xl border border-gold/40 bg-deep shadow-2xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Tutup"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-lg leading-none text-beige backdrop-blur transition hover:bg-gold hover:text-charcoal"
        >
          ×
        </button>

        <div className="relative h-60 sm:h-72">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-gunung.jpg" alt="Render Green Setiabudi Residence dengan pemandangan pegunungan" className="h-full w-full object-cover object-[50%_40%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/20 to-transparent" />
          <p className="absolute left-5 top-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">Green Setiabudi Residence</p>
        </div>

        <div className="-mt-10 px-6 pb-7 text-center sm:px-8">
          <div className="relative mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-gold bg-deep shadow-[0_0_30px_rgba(212,175,55,0.35)]">
            <span className="text-[8px] uppercase tracking-[0.2em] text-beige/70">Uang tanda jadi</span>
            <span className="font-heading text-4xl font-semibold leading-none text-gold">
              10<span className="ml-0.5 text-sm">JT</span>
            </span>
            <span className="text-[9px] font-semibold text-beige">Sudah all in!</span>
          </div>

          <h2 className="mt-5 font-heading text-2xl font-semibold text-beige">Suasana asri dengan pemandangan pegunungan</h2>
          <p className="mt-2 text-sm text-beige/70">Sersan Bajuri, Setiabudi, Bandung. Amankan unit impianmu dengan uang tanda jadi Rp10 juta saja.</p>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href={waLink("Halo, saya tertarik dengan promo uang tanda jadi Rp10 juta di Green Setiabudi Residence. Mohon info detail dan unit yang tersedia.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="btn-gold justify-center"
            >
              <IconWhatsapp className="h-4 w-4" /> Hubungi Marketing
            </a>
            <a href="#tipe" onClick={close} className="btn-outline justify-center">
              Lihat Tipe Rumah
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}