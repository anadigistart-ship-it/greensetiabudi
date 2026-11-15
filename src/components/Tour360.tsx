"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { IconArrow, IconClose, IconExpand, IconPlus, IconRotate } from "./Icons";
import { tourScenes, type Hotspot } from "@/lib/data";
import { usePanZoom } from "@/lib/usePanZoom";

/**
 * Viewer tour dari render rumah: putar pelan otomatis, seret / cubit untuk
 * menjelajah, ketuk dua kali untuk zoom, hotspot untuk pindah scene atau
 * melihat info. Tidak butuh library tambahan selain framer-motion.
 */
export default function Tour360() {
  const [sceneId, setSceneId] = useState(tourScenes[0].id);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const [full, setFull] = useState(false);
  const [open, setOpen] = useState<Hotspot | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const compassRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  const scene = tourScenes.find((s) => s.id === sceneId) ?? tourScenes[0];
  const index = tourScenes.findIndex((s) => s.id === scene.id);

  const onFrame = useCallback(({ heading }: { heading: number }) => {
    if (compassRef.current) compassRef.current.textContent = `${String(heading).padStart(3, "0")}°`;
    if (ringRef.current) ringRef.current.style.transform = `rotate(${-heading}deg)`;
  }, []);

  const pz = usePanZoom({
    imgW: scene.w,
    imgH: scene.h,
    fit: "cover",
    initialScale: 1.35,
    minScale: 1.05,
    maxScale: 3.2,
    auto,
    active: visible || full,
    onFrame,
  });

  // jalankan loop hanya saat viewer terlihat
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([en]) => setVisible(en.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // muat semua gambar lebih awal agar perpindahan scene mulus
  useEffect(() => {
    tourScenes.forEach((s) => {
      const im = new window.Image();
      im.src = s.src;
    });
  }, []);

  // pilih scene dari tombol di bagian Tipe Rumah
  useEffect(() => {
    const h = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (tourScenes.some((s) => s.id === id)) {
        setSceneId(id);
        setOpen(null);
      }
    };
    window.addEventListener("gs:open-scene", h);
    return () => window.removeEventListener("gs:open-scene", h);
  }, []);

  // layar penuh (pakai CSS agar jalan juga di iOS), Esc untuk keluar
  useEffect(() => {
    if (!full) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && setFull(false);
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", k);
    };
  }, [full]);

  const go = (id: string) => {
    setSceneId(id);
    setOpen(null);
  };
  const step = (d: number) => go(tourScenes[(index + d + tourScenes.length) % tourScenes.length].id);

  const onHotspot = (h: Hotspot) => {
    if (h.kind === "go") go(h.to);
    else setOpen((cur) => (cur?.id === h.id ? null : h));
  };

  const openUnit = (unit: string) => {
    window.dispatchEvent(new CustomEvent("gs:select-unit", { detail: unit }));
    setFull(false);
    setTimeout(() => document.getElementById("tipe")?.scrollIntoView({ behavior: "smooth" }), 60);
  };

  const iconBtn =
    "flex h-11 w-11 items-center justify-center rounded-full bg-deep/70 text-gold backdrop-blur transition active:scale-90 hover:bg-gold hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

  return (
    <section id="tour-360" className="relative overflow-hidden bg-deep py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Virtual Visit"
          title="Tour Virtual 360°"
          desc="Geser layar untuk melihat sekeliling, cubit untuk zoom, lalu ketuk titik yang menyala untuk pindah ke tipe lain atau melihat detailnya."
        />

        {/* penahan tinggi agar halaman tidak melompat saat layar penuh */}
        <motion.div
          ref={wrap}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          className="relative aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[16/9]"
        >
          <div
            className={
              full
                ? "fixed inset-0 z-[90] overflow-hidden bg-deep"
                : "absolute inset-0 overflow-hidden rounded-3xl border border-gold/20 bg-forest shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
            }
          >
            {/* panggung gambar */}
            <div
              ref={pz.setStage}
              role="application"
              tabIndex={0}
              aria-label={`Tour ${scene.label}. Seret atau gunakan tombol panah untuk memutar, plus dan minus untuk zoom.`}
              {...pz.bind}
              className={`absolute inset-0 touch-none select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold ${
                pz.dragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={scene.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.14 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div ref={pz.setLayer} className="absolute left-1/2 top-1/2 will-change-transform">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={scene.src}
                      alt={`Render ${scene.label}`}
                      draggable={false}
                      className="pointer-events-none h-full w-full select-none"
                    />
                    {scene.hotspots.map((h) => (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => onHotspot(h)}
                        aria-label={h.label}
                        className="group absolute z-10 flex items-center gap-2 focus-visible:outline-none"
                        style={{
                          left: `${h.x}%`,
                          top: `${h.y}%`,
                          transform: "translate(-50%, -50%) scale(var(--inv, 1))",
                        }}
                      >
                        <span className="relative flex h-9 w-9 items-center justify-center">
                          <span className="absolute inset-0 animate-pulseRing rounded-full bg-gold/70" />
                          <span
                            className={`relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-white/90 shadow-lg transition group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-white ${
                              h.kind === "go" ? "bg-leaf text-charcoal" : "bg-gold text-charcoal"
                            }`}
                          >
                            {h.kind === "go" ? <IconArrow className="h-3.5 w-3.5" /> : <IconPlus className="h-3.5 w-3.5" />}
                          </span>
                        </span>
                        <span className="whitespace-nowrap rounded-full bg-deep/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-beige backdrop-blur transition group-hover:bg-gold group-hover:text-charcoal">
                          {h.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* embed (Kuula / Matterport) menimpa viewer bila diisi */}
            {scene.embed ? (
              <iframe
                src={scene.embed}
                title={`Tour 360 ${scene.label}`}
                className="absolute inset-0 z-20 h-full w-full"
                allow="fullscreen; accelerometer; gyroscope; xr-spatial-tracking"
                loading="lazy"
              />
            ) : null}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep/80 via-transparent to-deep/25" />

            {/* kiri atas: status + kompas */}
            <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-2 md:left-5 md:top-5">
              <div className="flex items-center gap-2 rounded-full bg-deep/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulseRing rounded-full bg-gold" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                </span>
                Live 360°
              </div>
              <div className="flex w-fit items-center gap-2 rounded-full bg-deep/70 py-1.5 pl-1.5 pr-3 backdrop-blur" aria-hidden="true">
                <span ref={ringRef} className="relative block h-7 w-7 rounded-full border border-gold/50">
                  <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-gold" />
                  <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/40" />
                </span>
                <span ref={compassRef} className="font-mono text-[11px] tabular-nums text-beige/80">
                  180°
                </span>
              </div>
            </div>

            {/* kanan atas: kontrol */}
            <div className="absolute right-4 top-4 flex gap-2 md:right-5 md:top-5">
              <button type="button" onClick={() => pz.zoomBy(1.35)} className={iconBtn} aria-label="Perbesar">
                <IconPlus className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => pz.zoomBy(1 / 1.35)} className={iconBtn} aria-label="Perkecil">
                <span className="block h-0.5 w-4 rounded bg-current" />
              </button>
              <button
                type="button"
                onClick={() => setAuto((v) => !v)}
                className={`${iconBtn} ${auto ? "!bg-gold !text-charcoal" : ""}`}
                aria-label={auto ? "Hentikan putar otomatis" : "Putar otomatis"}
                aria-pressed={auto}
              >
                <IconRotate className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setFull((v) => !v)}
                className={iconBtn}
                aria-label={full ? "Keluar layar penuh" : "Layar penuh"}
              >
                {full ? <IconClose className="h-5 w-5" /> : <IconExpand className="h-5 w-5" />}
              </button>
            </div>

            {/* bawah: judul scene, panah, kartu info */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-3 p-4 md:p-6">
              <AnimatePresence>
                {open ? (
                  <motion.div
                    key={open.id}
                    initial={{ opacity: 0, y: 16, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-auto relative max-w-sm rounded-2xl border border-gold/30 bg-deep/90 p-5 pr-12 backdrop-blur-md"
                    role="dialog"
                    aria-label={open.label}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(null)}
                      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full text-beige/70 hover:text-gold"
                      aria-label="Tutup info"
                    >
                      <IconClose className="h-4 w-4" />
                    </button>
                    <p className="font-heading text-base font-semibold text-gold">{open.label}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-beige/80">{open.kind === "go" ? "" : open.text}</p>
                    {open.kind === "unit" ? (
                      <button type="button" onClick={() => openUnit(open.unit)} className="btn-gold mt-4 !px-5 !py-2.5 !text-xs">
                        Lihat denah & harga
                      </button>
                    ) : null}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="flex items-end justify-between gap-3">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={scene.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 14 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="font-heading text-2xl font-semibold text-beige md:text-3xl">{scene.label}</p>
                    <p className="mt-0.5 text-xs text-beige/60">{scene.sub}</p>
                  </motion.div>
                </AnimatePresence>
                <div className="pointer-events-auto flex gap-2">
                  <button type="button" onClick={() => step(-1)} className={iconBtn} aria-label="Scene sebelumnya">
                    <IconArrow className="h-5 w-5 rotate-180" />
                  </button>
                  <button type="button" onClick={() => step(1)} className={iconBtn} aria-label="Scene berikutnya">
                    <IconArrow className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {!pz.touched && !open ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 1.2 }}
                    className="pointer-events-none absolute inset-x-0 bottom-[5.5rem] text-center text-[11px] uppercase tracking-[0.25em] text-beige/70"
                  >
                    Geser · cubit · ketuk dua kali
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* pilih scene: gulir ke samping di HP */}
        <Reveal>
          <div className="-mx-5 mt-6 flex snap-x gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:justify-center md:px-0">
            {tourScenes.map((s) => {
              const on = s.id === sceneId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => go(s.id)}
                  aria-pressed={on}
                  className={`group relative h-20 w-36 shrink-0 snap-start overflow-hidden rounded-2xl border transition active:scale-95 md:h-24 md:w-44 ${
                    on ? "border-gold" : "border-line/10 hover:border-gold/50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    className={`h-full w-full object-cover transition duration-500 group-hover:scale-110 ${on ? "" : "opacity-60"}`}
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/90 to-transparent px-3 pb-2 pt-6 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-beige">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-center text-xs text-beige/40">
            Tampilan dibuat dari render desain; hasil akhir bangunan dapat sedikit berbeda.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
