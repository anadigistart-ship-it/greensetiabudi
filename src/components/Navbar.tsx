"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LogoMark } from "./Logo";
import { IconClose, IconMenu } from "./Icons";
import { nav, waLink } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-white/10 bg-deep/90 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <a href="#beranda" className="flex items-center gap-3" aria-label="Green Setiabudi Residence">
          <LogoMark className="h-10 w-10" />
          <span className="hidden font-heading text-sm font-semibold leading-tight tracking-[0.15em] text-leaf sm:block">
            GREEN SETIABUDI
            <span className="block text-[9px] tracking-[0.5em] text-gold">RESIDENCE</span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 xl:gap-8 lg:flex" aria-label="Navigasi utama">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-xs font-medium uppercase tracking-[0.2em] text-beige/80 transition hover:text-gold"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waLink("Halo, saya ingin jadwalkan visit ke Green Setiabudi Residence.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold hidden !px-5 !py-2.5 !text-xs sm:inline-flex"
          >
            Jadwalkan Visit
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full p-2 text-beige lg:hidden"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
            aria-label="Navigasi mobile"
          >
            <div className="container-x flex flex-col gap-1 pb-6">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/5 py-3 text-sm uppercase tracking-[0.2em] text-beige/90"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={waLink("Halo, saya ingin jadwalkan visit ke Green Setiabudi Residence.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold mt-4"
              >
                Jadwalkan Visit
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
