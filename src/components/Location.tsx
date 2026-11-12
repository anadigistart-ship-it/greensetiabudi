import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { IconPin } from "./Icons";
import { nearby, site } from "@/lib/data";

export default function Location() {
  const mapSrc = `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=15&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${site.geo.lat},${site.geo.lng}`;

  return (
    <section id="lokasi" className="bg-deep py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Lokasi Strategis"
          title="Jalur Setiabudi, Bandung Barat"
          desc="Udara sejuk Bandung utara di Jl. Sersan Bajuri KM 4,2, dengan akses ke kampus, kuliner, pusat belanja, hingga destinasi Lembang."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <iframe
                src={mapSrc}
                title="Peta lokasi Green Setiabudi Residence di Bandung Barat"
                className="h-[380px] w-full md:h-[480px]"
                style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-forest/50 p-8">
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
              <ul className="divide-y divide-white/10">
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
    </section>
  );
}
