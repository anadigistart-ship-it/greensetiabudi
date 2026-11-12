"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { IconWhatsapp } from "./Icons";
import { banks, rupiah, tenors, units, waLink, type Bank, type Tenor } from "@/lib/data";

type Mode = "bank" | "bebas";

export default function KprSimulator() {
  const [mode, setMode] = useState<Mode>("bank");
  const [unitId, setUnitId] = useState("lotus");
  const [bank, setBank] = useState<Bank>("BSN");
  const [tenor, setTenor] = useState<Tenor>(15);
  // mode simulasi bebas
  const [dp, setDp] = useState(20);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(7.5);

  const unit = units.find((u) => u.id === unitId) ?? units[0];

  const free = useMemo(() => {
    const dpAmount = (unit.price * dp) / 100;
    const loan = unit.price - dpAmount;
    const n = years * 12;
    const r = rate / 100 / 12;
    const monthly = r === 0 ? loan / n : (loan * r) / (1 - Math.pow(1 + r, -n));
    return { dpAmount, loan, monthly };
  }, [unit.price, dp, years, rate]);

  const view =
    mode === "bank"
      ? {
          monthly: unit.installments[bank][tenor],
          dpAmount: unit.dp,
          loan: unit.kpr,
          note: `Angsuran resmi dari daftar harga developer, bank ${bank}, tenor ${tenor} tahun.`,
        }
      : { monthly: free.monthly, dpAmount: free.dpAmount, loan: free.loan, note: "*Estimasi dengan bunga tetap, belum termasuk provisi, administrasi, asuransi, dan BPHTB." };

  const msg =
    mode === "bank"
      ? `Halo, saya sudah lihat angsuran Green Setiabudi Residence.\nUnit: ${unit.name} (${unit.type})\nHarga promo: ${rupiah(unit.price)}\nDP: ${rupiah(unit.dp)}\nBank: ${bank}, tenor ${tenor} tahun\nAngsuran: ${rupiah(view.monthly)}/bulan\nMohon info skema yang tersedia.`
      : `Halo, saya sudah coba simulasi KPR Green Setiabudi Residence.\nUnit: ${unit.name} (${unit.type})\nDP: ${dp}% (${rupiah(free.dpAmount)})\nTenor: ${years} tahun, bunga ${rate}%\nEstimasi cicilan: ${rupiah(free.monthly)}/bulan\nMohon info skema yang tersedia.`;

  const slider = "mt-3 h-8 w-full touch-pan-y accent-[#D4AF37]";
  const label = "text-xs font-semibold uppercase tracking-[0.25em] text-gold";
  const chip = (on: boolean) =>
    `relative rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition active:scale-95 ${
      on ? "border-gold bg-gold text-charcoal" : "border-white/15 text-beige/80 hover:border-gold/60 hover:text-gold"
    }`;

  return (
    <section id="kpr" className="bg-gradient-to-b from-forest/40 to-deep py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Simulasi KPR"
          title="Hitung Cicilan Impian Anda"
          desc="Lihat angsuran resmi per bank dan tenor, atau atur sendiri DP, tenor, dan bunga untuk gambaran awal."
        />

        <Reveal className="mb-8 flex justify-center">
          <div className="flex rounded-full border border-white/10 bg-deep/70 p-1" role="tablist" aria-label="Mode simulasi">
            {([
              ["bank", "Angsuran bank"],
              ["bebas", "Simulasi bebas"],
            ] as const).map(([id, text]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={mode === id}
                onClick={() => setMode(id)}
                className={`relative rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition active:scale-95 ${
                  mode === id ? "text-charcoal" : "text-beige/80 hover:text-gold"
                }`}
              >
                {mode === id ? (
                  <motion.span layoutId="kpr-mode" className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                ) : null}
                <span className="relative z-10">{text}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-forest/50 lg:grid-cols-2">
            <div className="space-y-7 p-8 md:p-10">
              <div>
                <label htmlFor="kpr-unit" className={label}>
                  Pilih tipe
                </label>
                <select
                  id="kpr-unit"
                  value={unitId}
                  onChange={(e) => setUnitId(e.target.value)}
                  className="mt-3 w-full rounded-xl border border-white/15 bg-deep px-4 py-3.5 text-sm text-beige outline-none focus:border-gold"
                >
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} · {u.type} · {rupiah(u.price)}
                    </option>
                  ))}
                </select>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {mode === "bank" ? (
                  <motion.div key="bank" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-7">
                    <div>
                      <p className={label}>Bank</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {banks.map((b) => (
                          <button key={b.id} type="button" aria-pressed={bank === b.id} onClick={() => setBank(b.id)} className={chip(bank === b.id)}>
                            {b.id}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className={label}>Tenor</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {tenors.map((t) => (
                          <button key={t} type="button" aria-pressed={tenor === t} onClick={() => setTenor(t)} className={chip(tenor === t)}>
                            {t} th
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="bebas" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-7">
                    <div>
                      <div className="flex justify-between text-xs font-semibold uppercase tracking-[0.25em]">
                        <label htmlFor="kpr-dp" className="text-gold">Uang muka (DP)</label>
                        <span className="text-beige">{dp}%</span>
                      </div>
                      <input id="kpr-dp" type="range" min={5} max={50} step={5} value={dp} onChange={(e) => setDp(+e.target.value)} className={slider} />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold uppercase tracking-[0.25em]">
                        <label htmlFor="kpr-tenor" className="text-gold">Tenor</label>
                        <span className="text-beige">{years} tahun</span>
                      </div>
                      <input id="kpr-tenor" type="range" min={5} max={25} step={5} value={years} onChange={(e) => setYears(+e.target.value)} className={slider} />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold uppercase tracking-[0.25em]">
                        <label htmlFor="kpr-rate" className="text-gold">Suku bunga / tahun</label>
                        <span className="text-beige">{rate.toFixed(1)}%</span>
                      </div>
                      <input id="kpr-rate" type="range" min={3} max={12} step={0.5} value={rate} onChange={(e) => setRate(+e.target.value)} className={slider} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col justify-center bg-deep/70 p-8 md:p-10">
              <p className="text-[10px] uppercase tracking-[0.3em] text-beige/50">
                {mode === "bank" ? "Angsuran per bulan" : "Estimasi cicilan per bulan"}
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={`${mode}-${unitId}-${bank}-${tenor}-${mode === "bebas" ? Math.round(view.monthly / 1000) : 0}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 font-heading text-4xl font-semibold text-gold md:text-5xl"
                  aria-live="polite"
                >
                  {rupiah(Math.round(view.monthly))}
                </motion.p>
              </AnimatePresence>

              <dl className="mt-8 space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <dt className="text-beige/60">Harga promo</dt>
                  <dd className="font-medium text-beige">{rupiah(unit.price)}</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <dt className="text-beige/60">Uang muka</dt>
                  <dd className="font-medium text-beige">{rupiah(view.dpAmount)}</dd>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <dt className="text-beige/60">Pokok pinjaman</dt>
                  <dd className="font-medium text-beige">{rupiah(view.loan)}</dd>
                </div>
              </dl>

              <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8">
                <IconWhatsapp className="h-4 w-4" /> Konsultasi Skema KPR
              </a>
              <p className="mt-3 text-[11px] leading-relaxed text-beige/40">{view.note} Perhitungan final mengikuti ketentuan bank.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
