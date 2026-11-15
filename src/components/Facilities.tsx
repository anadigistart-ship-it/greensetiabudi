"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { IconCheck } from "./Icons";
import { facilities } from "@/lib/data";

/** Angka naik dari 0 ke `to` saat masuk layar. */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const value = useMotionValue(reduce ? to : 0);
  const text = useTransform(value, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(value, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [inView, reduce, to, value]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

export default function Facilities() {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  // foto bergeser pelan berlawanan arah scroll (parallax)
  const imgY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const float = (delay: number) =>
    reduce ? {} : { animate: { y: [0, -9, 0] }, transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const, delay } };

  return (
    <section id="fasilitas" className="overflow-hidden bg-forest/40 py-16 sm:py-20 md:py-28 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Fasilitas"
            title="Hidup Nyaman, Aman, dan Hijau"
            desc="Setiap detail kawasan dirancang untuk kenyamanan harian keluarga, mulai dari keamanan, ruang bermain, hingga area hijau untuk bersantai."
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {facilities.map((f, i) => (
              <Reveal key={f} delay={i * 0.05}>
                <li className="flex items-start gap-3 rounded-2xl border border-line/10 bg-line/[0.03] p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed text-beige/85">{f}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div ref={frame} className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* bingkai emas bergeser di belakang foto */}
          <motion.div
            initial={{ opacity: 0, x: -16, y: -16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -bottom-4 -right-4 left-6 top-6 rounded-3xl border border-gold/40 sm:-bottom-5 sm:-right-5"
            aria-hidden="true"
          />

          {/* foto: terbuka dari tengah saat masuk layar */}
          <motion.div
            initial={{ clipPath: "inset(14% 14% 14% 14% round 28px)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line/10 bg-forest shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="/images/fasilitas-keluarga.png"
              alt="Keluarga bahagia bermain di halaman rumah hijau Green Setiabudi Residence"
              loading="lazy"
              draggable={false}
              style={reduce ? undefined : { y: imgY, scale: 1.18 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/10 to-transparent" />

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute inset-x-0 bottom-0 p-6 sm:p-8"
            >
              <p className="font-heading text-xl tracking-wide text-gold sm:text-2xl">Tempat anak tumbuh bahagia</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.3em] text-beige/70">Lingkungan hijau, aman, dan ramah keluarga</p>
            </motion.div>
          </motion.div>

          {/* kartu melayang */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9, type: "spring", stiffness: 160, damping: 16 }}
            className="absolute -left-3 top-8 sm:-left-6"
          >
            <motion.div {...float(0)} className="rounded-2xl border border-gold/40 bg-deep/85 px-5 py-3 text-center shadow-xl backdrop-blur">
              <div className="font-heading text-3xl font-semibold leading-none text-gold">
                <CountUp to={30} suffix="%+" />
              </div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-beige/70">Ruang hijau</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.1, type: "spring", stiffness: 160, damping: 16 }}
            className="absolute -right-2 top-1/2 sm:-right-6"
          >
            <motion.div {...float(1.2)} className="flex items-center gap-3 rounded-2xl border border-gold/40 bg-deep/85 px-4 py-3 shadow-xl backdrop-blur">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-leaf" />
              </span>
              <div>
                <div className="font-heading text-lg font-semibold leading-none text-gold">24/7</div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-beige/70">Keamanan</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
