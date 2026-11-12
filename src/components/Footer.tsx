import { LogoFull } from "./Logo";
import { nav, site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-deep pb-28 pt-16">
      <div className="container-x grid gap-12 md:grid-cols-3">
        <div className="flex justify-center md:justify-start">
          <LogoFull size="sm" />
        </div>
        <nav aria-label="Navigasi footer" className="grid grid-cols-2 gap-3 text-sm">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-beige/60 transition hover:text-gold">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="text-sm leading-relaxed text-beige/60">
          <p className="font-medium text-beige">{site.developer}</p>
          <p className="mt-2">{site.address}</p>
          <p className="mt-2">{site.phoneDisplay}</p>
        </div>
      </div>
      <div className="container-x mt-12 border-t border-white/5 pt-6 text-center text-xs leading-relaxed text-beige/40">
        <p>
          © {new Date().getFullYear()} {site.name}. Seluruh hak cipta dilindungi.
        </p>
        <p className="mt-2">
          Gambar, ilustrasi, dan harga bersifat informatif dan dapat berubah sewaktu-waktu tanpa pemberitahuan terlebih dahulu.
        </p>
      </div>
    </footer>
  );
}
