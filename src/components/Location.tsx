"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import PlanLightbox from "./PlanLightbox";
import { IconExpand, IconPin } from "./Icons";
import { nearby, site } from "@/lib/data";

const PETA = { src: "/images/peta-lokasi.png", w: 2001, h: 921 };

export default function Location() {
  const [zoomMap, setZoomMap] = useState(false);
  // peta dicari dari alamat resmi (koordinat di site.geo masih perkiraan)
  const q = encodeURIComponent(site.address);
  const mapSrc = `https://www.google.com/maps?q=${q}&z=16&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${q}`;

  return (
    <section id="lokasi" className="bg-deep py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Lokasi Strategis"
          title="Jalur Setiabudi, Bandung"
          desc="Udara sejuk Bandung utara di Jl. Terusan Sersan Bajuri, Setiabudi, Bandung, dengan akses ke kampus, kuliner, pusat belanja, hingga destinasi Lembang."
        />

        {/* peta ilustrasi kawasan */}
        <Reveal className="mb-8">
          <button
            type="button"
            onClick={() => setZoomMap(true)}
            aria-label="Perbesar peta lokasi kawasan Setiabudi"
            className="group relative block w-full overflow-hidden rounded-3xl border border-gold/30 bg-[#0F2218] text-left shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PETA.src}
              alt="Peta lokasi Green Setiabudi Residence: dekat UPI, Paris Van Java Mall, Taman Hutan Raya Dago, Gaia Hotel Bandung, dan Lembang Park & Zoo"
              width={PETA.w}
              height={PETA.h}
              loading="lazy"
              draggable={false}
              className="h-auto w-full select-none transition duration-700 group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37] backdrop-blur">
              <IconExpand className="h-4 w-4" /> Perbesar peta
            </span>
          </button>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl border border-line/10">
              <iframe
                src={mapSrc}
                title="Peta lokasi Green Setiabudi Residence di Setiabudi Bandung"
                className="h-[380px] w-full md:h-[480px]"
                style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-3xl border border-line/10 bg-forest/50 p-8">
              <div className="flex items-start gap-3">
                <IconPin className="mt-1 h-6 w-6 shrink-0 text-gold" />
                <div>
                  <h3 className="font-heading text-lg text-beige">Alamat</h3>
                  <p className="mt-1 text-sm leading-relaxed text-beige/70">{site.address}</p>
                </div>
              </div>

              <h3 className="mb-4 mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Akses terdekat <span className="text-beige/40">(perkiraan)</span>
              </h3>
              <ul className="divide-y divide-line/10">
                {nearby.map((n) => (
                  <li key={n.name} className="flex items-center justify-between py-3 text-sm">
                    <span className="text-beige/85">{n.name}</span>
                    <span className="font-medium text-leaf">{n.time}</span>
                  </li>
                ))}
              </ul>

              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn-outline mt-8">
                Buka di Google Maps
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {zoomMap ? (
          <PlanLightbox key="peta" src={PETA.src} w={PETA.w} h={PETA.h} title="Peta Lokasi Green Setiabudi Residence" onClose={() => setZoomMap(false)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}