"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { IconClose, IconPlus } from "./Icons";
import { usePanZoom } from "@/lib/usePanZoom";

/** Denah layar penuh: cubit, ketuk dua kali, atau seret untuk melihat detail ukuran. */
export default function PlanLightbox({
  src,
  w,
  h,
  title,
  onClose,
}: {
  src: string;
  w: number;
  h: number;
  title: string;
  onClose: () => void;
}) {
  const pz = usePanZoom({ imgW: w, imgH: h, fit: "contain", initialScale: 1, minScale: 1, maxScale: 4.5 });

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", k);
    };
  }, [onClose]);

  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[#E8E3D1] backdrop-blur transition active:scale-90 hover:bg-gold hover:text-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[95] bg-black/90"
    >
      <div
        ref={pz.setStage}
        tabIndex={0}
        {...pz.bind}
        className={`absolute inset-0 touch-none select-none overflow-hidden outline-none ${pz.dragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <div ref={pz.setLayer} className="absolute left-1/2 top-1/2 will-change-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={title} draggable={false} className="pointer-events-none h-full w-full select-none rounded-lg" />
          </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between gap-3 bg-gradient-to-b from-black/70 to-transparent p-4">
        <p className="font-heading text-lg font-semibold text-[#E8E3D1]">{title}</p>
        <div className="pointer-events-auto flex gap-2">
          <button type="button" onClick={() => pz.zoomBy(1.4)} className={btn} aria-label="Perbesar">
            <IconPlus className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => pz.zoomBy(1 / 1.4)} className={btn} aria-label="Perkecil">
            <span className="block h-0.5 w-4 rounded bg-current" />
          </button>
          <button type="button" onClick={onClose} className={btn} aria-label="Tutup denah">
            <IconClose className="h-5 w-5" />
          </button>
        </div>
      </div>

      {!pz.touched ? (
        <p className="pointer-events-none absolute inset-x-0 bottom-6 text-center text-[11px] uppercase tracking-[0.25em] text-[#E8E3D1]/60">
          Cubit atau ketuk dua kali untuk zoom
        </p>
      ) : null}
    </motion.div>
  );
}
