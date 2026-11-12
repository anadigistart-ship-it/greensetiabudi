import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { IconCheck } from "./Icons";
import { facilities } from "@/lib/data";

export default function Facilities() {
  return (
    <section id="fasilitas" className="bg-forest/40 py-24 md:py-32">
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
                <li className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
                    <IconCheck className="h-4 w-4" />
                  </span>
                  <span className="text-sm leading-relaxed text-beige/85">{f}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal x={40} y={0}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sage/30 via-forest to-deep">
            <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full text-leaf/20" aria-hidden="true">
              <circle cx="320" cy="90" r="46" fill="#D4AF37" opacity=".35" />
              <path d="M0 360 Q100 300 200 340 T400 320 V500 H0Z" fill="currentColor" />
              <path d="M0 410 Q120 360 230 400 T400 380 V500 H0Z" fill="#6A8A5B" opacity=".35" />
              <g fill="#0F2218" opacity=".7">
                <path d="M60 340 L30 410 H90Z" />
                <path d="M60 300 L22 380 H98Z" />
                <path d="M330 330 L300 400 H360Z" />
                <path d="M330 290 L292 370 H368Z" />
              </g>
            </svg>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep to-transparent p-8">
              <p className="font-heading text-xl tracking-wide text-gold">Ruang hijau lebih dari 30%</p>
              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-beige/50">Ganti dengan foto kawasan</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
