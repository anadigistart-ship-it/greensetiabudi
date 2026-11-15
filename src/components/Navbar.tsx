"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { IconClose, IconMenu } from "./Icons";
import { navMenu, waLink } from "@/lib/data";

const WA_VISIT = "Halo, saya ingin jadwalkan visit ke Green Setiabudi Residence.";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // menu mobile
  const [dropdown, setDropdown] = useState<string | null>(null); // dropdown desktop
  const [mobileGroup, setMobileGroup] = useState<string | null>("Hunian"); // accordion mobile
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // tutup dropdown saat klik di luar / tekan Escape
  useEffect(() => {
    if (!dropdown) return;
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setDropdown(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDropdown(null);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropdown]);

  // kunci scroll body saat menu mobile terbuka, dan tutup otomatis saat layar melebar ke desktop
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = "";
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-line/10 bg-deep/90 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-3 sm:h-20">
        <a href="#beranda" className="flex shrink-0 items-center gap-3" aria-label="Green Setiabudi Residence">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-green-setiabudi.png" alt="Green Setiabudi Residence" className="h-9 w-auto sm:h-11" />
          {/* <span className="hidden font-heading text-sm font-semibold leading-tight tracking-[0.15em] text-leaf md:block">
            GREEN SETIABUDI
            <span className="block text-[9px] tracking-[0.5em] text-gold">RESIDENCE</span>
          </span> */}
        </a>

        {/* menu desktop */}
        <nav
          ref={navRef}
          className="hidden items-center gap-5 xl:gap-8 lg:flex"
          aria-label="Navigasi utama"
        >
          {navMenu.map((n) =>
            "children" in n ? (
              <div
                key={n.label}
                className="relative"
                onMouseEnter={() => setDropdown(n.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() => setDropdown((d) => (d === n.label ? null : n.label))}
                  aria-haspopup="menu"
                  aria-expanded={dropdown === n.label}
                  className={`flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] transition hover:text-gold ${
                    dropdown === n.label ? "text-gold" : "text-beige/80"
                  }`}
                >
                  {n.label}
                  <Chevron open={dropdown === n.label} />
                </button>

                <AnimatePresence>
                  {dropdown === n.label ? (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      // pt-4 menjaga area hover tetap menyambung antara tombol dan panel
                      className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                    >
                      <div className="w-64 overflow-hidden rounded-2xl border border-gold/30 bg-deep/95 p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)] backdrop-blur-lg">
                        {n.children.map((c) => (
                          <a
                            key={c.href}
                            href={c.href}
                            role="menuitem"
                            onClick={() => setDropdown(null)}
                            className="block rounded-xl px-4 py-3 transition hover:bg-gold/10"
                          >
                            <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-beige">{c.label}</span>
                            <span className="mt-0.5 block text-[11px] normal-case tracking-normal text-beige/60">{c.desc}</span>
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={n.href}
                href={n.href}
                className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.2em] text-beige/80 transition hover:text-gold"
              >
                {n.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a href={waLink(WA_VISIT)} target="_blank" rel="noopener noreferrer" className="btn-gold hidden !px-5 !py-2.5 !text-xs sm:inline-flex">
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

      {/* menu mobile / tablet */}
      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-y-auto overscroll-contain lg:hidden"
            style={{ maxHeight: "calc(100svh - 4rem)" }}
            aria-label="Navigasi mobile"
          >
            <div className="container-x flex flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]">
              {navMenu.map((n) =>
                "children" in n ? (
                  <div key={n.label} className="border-b border-line/5">
                    <button
                      type="button"
                      onClick={() => setMobileGroup((g) => (g === n.label ? null : n.label))}
                      aria-expanded={mobileGroup === n.label}
                      className="flex w-full items-center justify-between py-3.5 text-sm uppercase tracking-[0.2em] text-beige/90"
                    >
                      {n.label}
                      <Chevron open={mobileGroup === n.label} />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileGroup === n.label ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mb-3 ml-1 flex flex-col border-l border-gold/40 pl-4">
                            {n.children.map((c) => (
                              <a
                                key={c.href}
                                href={c.href}
                                onClick={() => setOpen(false)}
                                className="py-2.5 transition hover:text-gold"
                              >
                                <span className="block text-sm uppercase tracking-[0.18em] text-beige/90">{c.label}</span>
                                <span className="block text-[11px] text-beige/50">{c.desc}</span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-line/5 py-3.5 text-sm uppercase tracking-[0.2em] text-beige/90"
                  >
                    {n.label}
                  </a>
                )
              )}
              <a href={waLink(WA_VISIT)} target="_blank" rel="noopener noreferrer" className="btn-gold mt-5 sm:hidden">
                Jadwalkan Visit
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
