import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { IconDiamond, IconHome, IconLeaf, IconShield, IconTree } from "./Icons";
import { values } from "@/lib/data";

const icons = {
  leaf: IconLeaf,
  diamond: IconDiamond,
  home: IconHome,
  tree: IconTree,
  shield: IconShield,
};

export default function Concept() {
  return (
    <section id="konsep" className="relative bg-deep py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Brand Concept"
          title="Harmoni Alam dan Kemewahan"
          desc="Green Setiabudi Residence hadir sebagai hunian eksklusif yang menyatu dengan alam, memberikan kenyamanan, kemewahan, dan kualitas hidup terbaik bagi Anda dan keluarga."
        />

        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {values.map((v, i) => {
            const Icon = icons[v.icon];
            return (
              <Reveal key={v.title} delay={i * 0.08} className="h-full">
                <div className="group h-full bg-forest/60 p-8 text-center transition duration-500 hover:bg-forest">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-gold transition duration-500 group-hover:scale-110 group-hover:bg-gold/10">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-gold">{v.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-beige/70">{v.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mx-auto mt-20 max-w-3xl text-center">
          <p className="font-heading text-2xl leading-relaxed tracking-wide text-gold md:text-3xl">
            &ldquo;Harmony between nature and luxury creates a life worth living.&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
