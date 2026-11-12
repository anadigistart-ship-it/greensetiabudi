import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  align?: "center" | "left";
}) {
  const a = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <Reveal className={`mb-14 max-w-2xl ${a}`}>
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.4em] text-gold">{eyebrow}</p>
      <h2 className="font-heading text-3xl font-semibold leading-tight text-beige md:text-5xl">{title}</h2>
      <div className={`my-6 h-px w-20 bg-gold/70 ${align === "center" ? "mx-auto" : ""}`} />
      {desc ? <p className="text-base leading-relaxed text-beige/70">{desc}</p> : null}
    </Reveal>
  );
}
