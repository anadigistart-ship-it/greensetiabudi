"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { IconInstagram, IconMail, IconPhone, IconPin, IconWhatsapp } from "./Icons";
import { site, units, waLink } from "@/lib/data";

export default function Contact() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [unit, setUnit] = useState(units[0].id);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = units.find((x) => x.id === unit) ?? units[0];
    const msg = `Halo, saya ${name} ingin jadwalkan visit ke Green Setiabudi Residence.\nTanggal: ${date}\nJam: ${time} WIB\nTipe diminati: ${u.name} (${u.type})\nTerima kasih.`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };

  const field =
    "mt-2 w-full rounded-xl border border-white/15 bg-deep px-4 py-3 text-sm text-beige outline-none transition placeholder:text-beige/30 focus:border-gold";
  const label = "text-xs font-semibold uppercase tracking-[0.25em] text-gold";

  return (
    <section id="kontak" className="relative overflow-hidden bg-gradient-to-b from-deep to-forest py-24 md:py-32">
      <div className="pointer-events-none absolute -left-20 top-20 h-80 w-80 rounded-full bg-leaf/10 blur-[120px]" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Jadwalkan Kunjungan"
          title="Rasakan Langsung Hunian Anda"
          desc="Isi form singkat, kami akan menyiapkan kunjungan pribadi dan konsultasi bersama tim marketing."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form onSubmit={submit} className="rounded-3xl border border-white/10 bg-forest/60 p-8 md:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="c-name" className={label}>Nama lengkap</label>
                  <input id="c-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama Anda" className={field} />
                </div>
                <div>
                  <label htmlFor="c-date" className={label}>Tanggal visit</label>
                  <input id="c-date" type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={field} />
                </div>
                <div>
                  <label htmlFor="c-time" className={label}>Jam</label>
                  <input id="c-time" type="time" required min="09:00" max="17:00" value={time} onChange={(e) => setTime(e.target.value)} className={field} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-unit" className={label}>Tipe yang diminati</label>
                  <select id="c-unit" value={unit} onChange={(e) => setUnit(e.target.value)} className={field}>
                    {units.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} · {u.type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className="btn-gold mt-8 w-full">
                <IconWhatsapp className="h-4 w-4" /> Kirim via WhatsApp
              </button>
              <p className="mt-3 text-center text-[11px] text-beige/40">Anda akan diarahkan ke WhatsApp dengan pesan yang sudah terisi.</p>
            </form>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-gold/20 bg-deep/70 p-8 md:p-10">
              <div className="space-y-6">
                <h3 className="font-heading text-2xl text-gold">Marketing Gallery</h3>
                <ul className="space-y-5 text-sm text-beige/80">
                  <li className="flex gap-3">
                    <IconPin className="h-5 w-5 shrink-0 text-gold" />
                    {site.address}
                  </li>
                  <li className="flex gap-3">
                    <IconPhone className="h-5 w-5 shrink-0 text-gold" />
                    <a href={`tel:+${site.whatsapp}`} className="hover:text-gold">{site.phoneDisplay}</a>
                  </li>
                  <li className="flex gap-3">
                    <IconMail className="h-5 w-5 shrink-0 text-gold" />
                    <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>
                  </li>
                  <li className="flex gap-3">
                    <IconInstagram className="h-5 w-5 shrink-0 text-gold" />
                    <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                      {site.instagramHandle}
                    </a>
                  </li>
                </ul>
                <p className="text-xs uppercase tracking-[0.25em] text-beige/50">{site.hours}</p>
              </div>
              <a
                href={waLink("Halo, saya tertarik dengan Green Setiabudi Residence.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-8"
              >
                <IconWhatsapp className="h-4 w-4" /> Chat Langsung
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
