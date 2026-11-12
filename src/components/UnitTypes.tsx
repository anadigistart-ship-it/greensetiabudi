"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import PlanLightbox from "./PlanLightbox";
import { IconBath, IconBed, IconCar, IconCheck, IconExpand, IconHome, IconRuler, IconWhatsapp } from "./Icons";
import { rupiah, units, waLink } from "@/lib/data";

type View = "tampak" | "denah";

export default function UnitTypes() {
  const [active, setActive] = useState("lotus");
  const [view, setView] = useState<View>("tampak");
  const [zoomPlan, setZoomPlan] = useState(false);
  const idx = Math.max(0, units.findIndex((x) => x.id === active));
  const u = units[idx];
  const hasVisual = Boolean(u.image);

  const select = (id: string) => {
    setActive(id);
    setView("tampak");
  };

  // dipanggil dari hotspot di Tour 360
  useEffect(() => {
    const h = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (units.some((x) => x.id === id)) {
        setActive(id);
        setView("denah");
      }
    };
    window.addEventListener("gs:select-unit", h);
    return () => window.removeEventListener("gs:select-unit", h);
  }, []);

  const swipe = (dx: number) => {
    if (Math.abs(dx) < 70) return;
    const next = (idx + (dx < 0 ? 1 : -1) + units.length) % units.length;
    select(units[next].id);
  };

  const lowest = Math.min(...Object.values(u.installments).map((b) => b[25]));

  const specs = [
    { icon: IconRuler, label: "Luas Bangunan / Tanah", value: `${u.building} m² / ${u.land} m²` },
    u.frontage ? { icon: IconRuler, label: "Ukuran Kavling", value: u.frontage } : null,
    u.bedrooms != null ? { icon: IconBed, label: "Kamar Tidur", value: `${u.bedrooms}` } : null,
    u.bathrooms != null ? { icon: IconBath, label: "Kamar Mandi", value: `${u.bathrooms}` } : null,
    u.carport != null ? { icon: IconCar, label: "Carport", value: `${u.carport} mobil + motor` } : null,
    u.floors != null ? { icon: IconHome, label: "Lantai", value: `${u.floors}` } : null,
  ].filter((s): s is NonNullable<typeof s> => s !== null);

  const money = [
    { label: "Harga promo", value: rupiah(u.price), strong: true },
    { label: "Uang muka", value: rupiah(u.dp) },
    { label: "Plafon KPR", value: rupiah(u.kpr) },
  ];

  return (
    <section id="tipe" className="bg-gradient-to-b from-deep to-forest/40 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Pilihan Hunian"
          title="Tipe Rumah"
          desc="Tiga pilihan tipe dengan desain modern tropis, dirancang untuk gaya hidup keluarga masa kini."
        />

        <Reveal className="-mx-5 mb-10 flex snap-x gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {units.map((x) => (
            <button
              key={x.id}
              type="button"
              onClick={() => select(x.id)}
              aria-pressed={x.id === active}
              className={`relative shrink-0 snap-start rounded-full border px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] transition active:scale-95 ${
                x.id === active ? "border-gold text-charcoal" : "border-white/15 text-beige/80 hover:border-gold/60 hover:text-gold"
              }`}
            >
              {x.id === active ? (
                <motion.span layoutId="unit-pill" className="absolute inset-0 -z-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              ) : null}
              <span className="relative z-10">
                {x.name} <span className="ml-1 opacity-70">{x.building}/{x.land}</span>
              </span>
            </button>
          ))}
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.article
            key={u.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
            onPanEnd={(_, info) => swipe(info.offset.x)}
            style={{ touchAction: "pan-y" }}
            className="grid overflow-hidden rounded-3xl border border-white/10 bg-forest/50 lg:grid-cols-2"
          >
            {/* visual: render / denah */}
            <div className="relative min-h-[340px] overflow-hidden bg-deep lg:min-h-[560px]">
              <AnimatePresence mode="wait" initial={false}>
                {hasVisual && view === "tampak" ? (
                  <motion.div
                    key="tampak"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <motion.img
                      src={u.image}
                      alt={`Render tampak depan ${u.name} ${u.type}`}
                      draggable={false}
                      initial={{ scale: 1.12 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 6, ease: "easeOut" }}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep/70 via-transparent to-transparent" />
                  </motion.div>
                ) : null}

                {hasVisual && view === "denah" && u.plan ? (
                  <motion.button
                    key="denah"
                    type="button"
                    onClick={() => setZoomPlan(true)}
                    aria-label={`Perbesar denah ${u.name}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex cursor-zoom-in items-center justify-center bg-[#f7f8f4] p-3"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={u.plan.src} alt={`Denah lantai 1 dan 2 ${u.name} ${u.type}`} draggable={false} className="max-h-full max-w-full object-contain" />
                    <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-deep/85 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold backdrop-blur">
                      <IconExpand className="h-4 w-4" /> Ketuk untuk zoom
                    </span>
                  </motion.button>
                ) : null}

                {!hasVisual ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br ${u.gradient}`}
                  >
                    <svg viewBox="0 0 200 140" className="w-2/3 max-w-xs text-leaf/70" aria-hidden="true">
                      <path d="M10 70 L100 15 L190 70" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                      <rect x="28" y="70" width="144" height="60" fill="none" stroke="currentColor" strokeWidth="3" />
                      <rect x="88" y="92" width="24" height="38" fill="currentColor" opacity=".6" />
                    </svg>
                    <p className="text-[11px] uppercase tracking-[0.25em] text-beige/60">Render & denah segera hadir</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <span className="absolute left-5 top-5 rounded-full bg-deep/70 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur">
                {u.type}
              </span>

              {hasVisual && u.plan ? (
                <div className="absolute bottom-4 left-4 flex rounded-full bg-deep/80 p-1 backdrop-blur" role="tablist" aria-label="Tampilan">
                  {(["tampak", "denah"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      role="tab"
                      aria-selected={view === v}
                      onClick={() => setView(v)}
                      className={`relative rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] transition ${
                        view === v ? "text-charcoal" : "text-beige/80 hover:text-gold"
                      }`}
                    >
                      {view === v ? (
                        <motion.span layoutId="view-pill" className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                      ) : null}
                      <span className="relative z-10">{v === "tampak" ? "Tampak depan" : "Denah"}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            {/* info */}
            <div className="p-8 md:p-12">
              <h3 className="font-heading text-3xl font-semibold text-beige md:text-4xl">{u.name}</h3>
              <p className="mt-2 text-beige/60">{u.tagline}</p>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {specs.map((s, i) => (
                  <motion.li
                    key={s.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-[10px] uppercase tracking-[0.2em] text-beige/50">{s.label}</span>
                      <span className="text-sm font-medium text-beige">{s.value}</span>
                    </span>
                  </motion.li>
                ))}
              </ul>

              <ul className="mt-8 grid gap-2 sm:grid-cols-2">
                {u.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-beige/80">
                    <IconCheck className="h-4 w-4 text-leaf" /> {f}
                  </li>
                ))}
              </ul>

              <dl className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                {money.map((m) => (
                  <div key={m.label}>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-beige/50">{m.label}</dt>
                    <dd className={`mt-1 font-heading text-sm font-semibold md:text-base ${m.strong ? "text-gold" : "text-beige"}`}>{m.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-xs text-beige/50">
                Cicilan mulai {rupiah(lowest)} per bulan (tenor 25 tahun). Booking fee Rp10.000.000 belum termasuk harga jual.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink(`Halo, saya tertarik dengan rumah ${u.name} (${u.type}) di Green Setiabudi Residence. Mohon info detail dan promo terbaru.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold"
                >
                  <IconWhatsapp className="h-4 w-4" /> Tanya Unit Ini
                </a>
                {u.scene ? (
                  <a
                    href="#tour-360"
                    onClick={() => window.dispatchEvent(new CustomEvent("gs:open-scene", { detail: u.scene }))}
                    className="btn-outline"
                  >
                    Lihat Tour 360°
                  </a>
                ) : null}
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        <p className="mt-4 text-center text-xs text-beige/40">Geser kartu ke kiri atau kanan untuk berganti tipe. Gambar adalah render desain.</p>
      </div>

      <AnimatePresence>
        {zoomPlan && u.plan ? (
          <PlanLightbox key="plan" src={u.plan.src} w={u.plan.w} h={u.plan.h} title={`Denah ${u.name} ${u.type}`} onClose={() => setZoomPlan(false)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
