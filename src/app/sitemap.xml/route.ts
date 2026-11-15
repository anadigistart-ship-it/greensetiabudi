import { site } from "@/lib/data";

// Sitemap sebagai route handler (bukan app/sitemap.ts) supaya bisa memuat <image:image>
// tanpa bergantung versi Next.js. HAPUS app/sitemap.ts lama agar tidak bentrok.
export const dynamic = "force-static";

// Tanggal build/deploy. Hanya berubah saat situs di-deploy ulang, bukan tiap request,
// karena Google mengabaikan <lastmod> yang selalu "baru".
const LASTMOD = new Date().toISOString();

const base = site.url.replace(/\/+$/, "");

// Halaman situs ini satu halaman (anchor #tipe, #harga, dst. bukan URL terpisah), jadi cukup satu <url>.
// Kalau nanti ada halaman baru (mis. /tipe/tancy, /blog/...), tambahkan di sini.
const pages = [
  {
    path: "/",
    images: [
      "/images/hero-gunung.jpg",
      "/images/units/tancy-tampak.jpg",
      "/images/units/tancy-denah.png",
      "/images/units/tancy-living.jpg",
      "/images/units/tancy-kamar.jpg",
      "/360/lotus.jpg",
      "/360/kaluna.jpg",
      "/360/gerbang.jpg",
      "/images/fasilitas-keluarga.jpg",
      "/images/peta-lokasi.png",
    ],
  },
];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${esc(base + p.path)}</loc>
    <lastmod>${LASTMOD}</lastmod>
${p.images.map((i) => `    <image:image><image:loc>${esc(base + i)}</image:loc></image:image>`).join("\n")}
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
