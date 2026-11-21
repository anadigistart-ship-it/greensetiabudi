"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LogoMark } from "./Logo";
import { IconArrow } from "./Icons";
import { site, units, waLink } from "@/lib/data";

const leaves = [
  { left: "6%", top: "18%", size: 90, delay: 0, rotate: -20 },
  { left: "88%", top: "26%", size: 120, delay: 1.2, rotate: 25 },
  { left: "80%", top: "72%", size: 70, delay: 2.4, rotate: 10 },
  { left: "12%", top: "70%", size: 60, delay: 3.2, rotate: -40 },
];

const stats = [
  { v: String(units.length), l: "Tipe Rumah" },
  { v: "30%+", l: "Area Hijau" },
  { v: "24/7", l: "Keamanan" },
  { v: "360°", l: "Virtual Tour" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Parallax hanya untuk foto latar. Konten (teks + tombol CTA) tidak ikut bergeser atau memudar,
  // supaya tombol tidak tertutup bar statistik saat halaman di-scroll.
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="beranda"
      ref={ref}
      // flex-col: konten di tengah, bar statistik di bawah sebagai bagian dari alur (bukan absolute),
      // jadi tinggi section otomatis menyesuaikan layar laptop, tablet, maupun HP.
      // svh = tinggi layar HP yang sudah memperhitungkan bar browser; min-h-screen sebagai cadangan
      className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-deep via-forest to-deep supports-[height:100svh]:min-h-svh"
    >
      {/* foto latar: render senja dengan pemandangan pegunungan */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-gunung.jpg" alt="" className="h-full w-full object-cover object-[50%_30%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/85 via-deep/55 to-deep/90" />
      </motion.div>

      {/* cahaya */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-leaf/10 blur-[100px] md:h-[600px] md:w-[600px] md:blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-gold/10 blur-[90px] md:h-72 md:w-72 md:blur-[110px]" />

      {/* daun melayang: disembunyikan di HP supaya tidak menabrak logo dan teks */}
      {leaves.map((l, i) => (
        <svg
          key={i}
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="pointer-events-none absolute hidden animate-float text-[#6A8A5B]/30 sm:block [[data-theme=light]_&]:text-[#4F7A3F]/55"
          style={{
            left: l.left,
            top: l.top,
            width: l.size,
            height: l.size,
            animationDelay: `${l.delay}s`,
            transform: `rotate(${l.rotate}deg)`,
          }}
        >
          <path d="M10 90 C10 40 40 10 90 10 C90 60 60 90 10 90Z" fill="currentColor" />
          <path d="M10 90 C35 60 55 40 80 20" stroke="#0F2218" strokeWidth="2" fill="none" opacity=".5" />
        </svg>
      ))}

      {/* konten: mengisi sisa tinggi di atas bar statistik, tetap di tengah */}
      <div className="container-x relative z-10 flex flex-1 flex-col items-center justify-center pb-10 pt-24 text-center sm:pb-12 sm:pt-28 md:pt-32 lg:pb-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto flex justify-center"
        >
          {/* lebar & tinggi dibatasi lebar/tinggi layar, rasio logo tetap; di laptop dikecilkan sedikit agar CTA muat di layar pertama */}
          <LogoMark className="h-auto w-auto max-h-[28svh] max-w-[88vw] drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] sm:max-h-[32svh] sm:max-w-[34rem] md:max-h-[34svh] md:max-w-[38rem] lg:max-h-[36svh]" />
        </motion.div>

        {/* judul untuk mesin pencari & pembaca layar; tampilannya sudah ada di logo */}
        <h1 className="sr-only">Green Setiabudi Residence</h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-[10px] font-medium uppercase tracking-[0.3em] text-gold sm:text-xs sm:tracking-[0.5em]"
        >
          Sersan Bajuri · Setiabudi · Bandung
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mx-auto mt-5 max-w-xl px-2 text-sm leading-relaxed text-beige/75 sm:mt-6 sm:text-base md:text-lg"
        >
          <span className="mb-3 block font-heading text-xl font-semibold text-gold sm:text-2xl md:text-3xl">
            Suasana asri dengan pemandangan pegunungan
          </span>
          Hunian eksklusif yang menyatu dengan alam di jantung Bandung utara. <br className="hidden md:block" />
          <span className="text-gold">{site.tagline}.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-6 inline-flex items-center gap-3 rounded-full border border-gold/60 bg-deep/60 px-5 py-2 backdrop-blur"
        >
          <span className="font-heading text-2xl font-semibold leading-none text-gold">10 JT</span>
          <span className="text-left text-[10px] uppercase leading-tight tracking-[0.2em] text-beige/80">
            Uang tanda jadi
            <br />
            sudah all in
          </span>
        </motion.div>

        {/* sm:flex-wrap: di tablet tombol turun ke baris berikutnya, tidak terpotong */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mx-auto mt-8 flex w-full max-w-xs flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <a
            href={waLink("Halo, saya ingin jadwalkan visit ke Green Setiabudi Residence.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Jadwalkan Visit <IconArrow className="h-4 w-4" />
          </a>
          <a href="#tour-360" className="btn-outline">
            Tour Virtual 360°
          </a>
          <a href="/brosur.pdf" download="Brosur-Green-Setiabudi-Residence.pdf" className="btn-outline">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4M4 19h16" />
            </svg>
            Unduh Brosur PDF
          </a>
        </motion.div>
      </div>

      {/* statistik: berada di alur normal di bawah konten, sehingga tidak pernah menimpa tombol */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative z-10 border-t border-line/10 bg-deep/60 backdrop-blur-md"
      >
        <div className="container-x grid grid-cols-2 gap-y-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 md:grid-cols-4 md:py-5">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-heading text-xl font-semibold text-gold sm:text-2xl md:text-3xl">{s.v}</div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-beige/60 sm:text-[10px] sm:tracking-[0.3em]">{s.l}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}