"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { IconCheck, IconPlus, IconWhatsapp } from "./Icons";
import { bankAccountNote, banks, bookingAccount, bookingFee, ketentuan, persyaratanKpr, rupiah, tenors, units, waLink, type Bank } from "@/lib/data";

const nf = (n: number) => new Intl.NumberFormat("id-ID").format(n);

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-forest/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition active:bg-white/5"
      >
        <span className="font-heading text-base font-semibold text-beige md:text-lg">{title}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="text-gold">
          <IconPlus className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-6">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function PriceList() {
  const [bank, setBank] = useState<Bank>("BSN");
  const [showAcc, setShowAcc] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bookingAccount.number);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard tidak tersedia */
    }
  };

  const th = "px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold whitespace-nowrap";
  const td = "px-4 py-4 text-sm whitespace-nowrap tabular-nums";

  return (
    <section id="harga" className="bg-gradient-to-b from-deep to-forest/40 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Daftar Harga"
          title="Harga Promo & Angsuran"
          desc="Pilih bank untuk melihat angsuran per bulan di setiap tenor. Geser tabel ke samping di layar kecil."
        />

        <Reveal className="mb-8 flex justify-center">
          <div className="relative flex rounded-full border border-white/10 bg-deep/70 p-1" role="tablist" aria-label="Pilih bank">
            {banks.map((b) => (
              <button
                key={b.id}
                type="button"
                role="tab"
                aria-selected={bank === b.id}
                onClick={() => setBank(b.id)}
                className={`relative rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.25em] transition active:scale-95 ${
                  bank === b.id ? "text-charcoal" : "text-beige/80 hover:text-gold"
                }`}
              >
                {bank === b.id ? (
                  <motion.span layoutId="bank-pill" className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                ) : null}
                <span className="relative z-10">{b.id}</span>
              </button>
            ))}
          </div>
        </Reveal>
        <p className="-mt-3 mb-8 text-center text-xs text-beige/50">{banks.find((b) => b.id === bank)?.name}</p>

        <Reveal>
          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-forest/50 [-webkit-overflow-scrolling:touch]">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-deep/60">
                  <th className={`${th} sticky left-0 z-10 bg-deep`}>Tipe</th>
                  <th className={th}>Harga promo</th>
                  <th className={th}>Uang muka</th>
                  <th className={th}>KPR</th>
                  {tenors.map((t) => (
                    <th key={t} className={`${th} text-right`}>
                      {t} tahun
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {units.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 transition hover:bg-white/[0.04]">
                    <td className={`${td} sticky left-0 z-10 bg-forest`}>
                      <span className="font-heading font-semibold text-beige">{u.name}</span>
                      <span className="ml-2 text-xs text-beige/50">{u.building}/{u.land}</span>
                    </td>
                    <td className={`${td} font-medium text-gold`}>{nf(u.price)}</td>
                    <td className={`${td} text-beige/80`}>{nf(u.dp)}</td>
                    <td className={`${td} text-beige/80`}>{nf(u.kpr)}</td>
                    {tenors.map((t, i) => (
                      <td key={`${bank}-${t}`} className={`${td} text-right text-beige`}>
                        <motion.span
                          key={bank}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.3 }}
                          className="inline-block"
                        >
                          {nf(u.installments[bank][t])}
                        </motion.span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-beige/40">Semua angka dalam Rupiah. Harga & angsuran dapat berubah, perhitungan final mengikuti ketentuan bank.</p>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-2">
          <Reveal className="space-y-5">
            <Accordion title="Ketentuan" defaultOpen>
              <ul className="space-y-3">
                {ketentuan.map((k) => (
                  <li key={k} className="flex gap-3 text-sm leading-relaxed text-beige/80">
                    <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-leaf" /> {k}
                  </li>
                ))}
              </ul>
            </Accordion>

            <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Booking fee</p>
              <p className="mt-1 font-heading text-3xl font-semibold text-beige">{rupiah(bookingFee)}</p>
              <p className="mt-2 text-sm text-beige/70">Dibayar untuk mengunci unit. Berkas KPR diserahkan maksimal 10 hari setelahnya.</p>

              <button
                type="button"
                onClick={() => setShowAcc((v) => !v)}
                aria-expanded={showAcc}
                className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
              >
                {showAcc ? "Sembunyikan rekening" : "Lihat rekening pembayaran"}
              </button>
              <AnimatePresence initial={false}>
                {showAcc ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <dl className="mt-4 space-y-2 rounded-xl bg-deep/70 p-4 text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-beige/50">Penerima</dt>
                        <dd className="text-right text-beige">{bookingAccount.company}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-beige/50">Bank</dt>
                        <dd className="text-right text-beige">{bookingAccount.bank}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <dt className="text-beige/50">No. rekening</dt>
                        <dd className="flex items-center gap-3 font-medium tabular-nums text-beige">
                          {bookingAccount.number}
                          <button type="button" onClick={copy} className="rounded-full border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-widest text-gold active:scale-95">
                            {copied ? "Tersalin" : "Salin"}
                          </button>
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-beige/50">Atas nama</dt>
                        <dd className="text-right text-beige">{bookingAccount.holder}</dd>
                      </div>
                    </dl>
                    <p className="mt-3 text-xs text-beige/50">{bankAccountNote}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="space-y-5">
            <Accordion title="Persyaratan KPR">
              <ol className="space-y-3">
                {persyaratanKpr.map((p, i) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-beige/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold/40 text-[10px] text-gold">{i + 1}</span>
                    {p}
                  </li>
                ))}
              </ol>
            </Accordion>
            <a
              href={waLink("Halo, saya ingin booking unit di Green Setiabudi Residence dan menanyakan berkas KPR. Mohon infonya.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full"
            >
              <IconWhatsapp className="h-4 w-4" /> Booking via WhatsApp
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
