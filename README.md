# Green Setiabudi Residence, Website Perumahan

Next.js 14 (App Router) · Tailwind CSS · Framer Motion · TypeScript

## Jalankan

```bash
npm install
cp .env.example .env.local   # isi nomor WA & domain
npm run dev                  # http://localhost:3000
npm run build && npm start   # produksi
```

## Yang WAJIB diganti sebelum publish

Semua ada di `src/lib/data.ts` (cari tanda `GANTI`):

| Item | Keterangan |
| --- | --- |
| `whatsapp`, `phoneDisplay`, `email` | Kontak marketing asli (atau lewat `.env.local`) |
| `developer`, `address`, `geo` | Nama PT, alamat lengkap, koordinat lokasi |
| `units` | Tipe, spesifikasi, dan harga resmi |
| `nearby` | Waktu tempuh perkiraan, verifikasi dulu |
| `facilities`, `faqs` | Sesuaikan dengan fasilitas & legalitas nyata |
| `NEXT_PUBLIC_SITE_URL` | Domain final (dipakai sitemap, canonical, OG) |

## Tour 360°

Scene ada di `tourScenes` (`src/lib/data.ts`), dibuat dari render di `public/360/` (gerbang, Lotus, Kaluna).
Viewer (`Tour360.tsx` + `src/lib/usePanZoom.ts`): putar otomatis, seret / cubit / ketuk dua kali, zoom +/-,
kompas, layar penuh, dan hotspot (`go` pindah scene, `info` kartu keterangan, `unit` buka denah & harga).
Posisi hotspot dalam persen (`x`, `y`) terhadap gambar.

1. **Tambah scene**: taruh gambar di `public/360/`, tambahkan objek baru (isi `w`, `h` sesuai ukuran gambar).
2. **Panorama 360 sungguhan**: isi `embed` dengan URL Kuula / Matterport / Pannellum; iframe menimpa viewer.

## Tipe, harga, dan denah

Semua di `units` (`data.ts`): harga promo, DP, plafon KPR, dan angsuran per bank (BSN / BNI) per tenor.
Denah ada di `public/images/`. Tipe **Tansy** belum punya render & denah (field kamar/lantai masih `null`).
Bagian `#harga` (`PriceList.tsx`) menampilkan tabel angsuran, ketentuan, persyaratan KPR, dan booking fee.

## Chatbot

Rule-based di `src/app/api/chat/route.ts` (harga, tipe, lokasi, KPR, visit, fasilitas, legal, kontak).
Tambah intent baru di fungsi `answer()`. Setiap jawaban punya tombol aksi (anchor / WhatsApp).

## SEO yang sudah ada

- Metadata lengkap: title template, description, keywords, canonical, Open Graph, Twitter Card
- JSON-LD: `WebSite`, `RealEstateAgent`, `Residence`, `FAQPage`
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, favicon SVG, OG image dinamis
- HTML semantik (satu `h1`, hierarki `h2`/`h3`), `lang="id"`, label aksesibilitas
- `next/font` (tanpa layout shift), header keamanan, dukungan Google Analytics (`NEXT_PUBLIC_GA_ID`)

Setelah live: daftarkan domain di Google Search Console, kirim sitemap, dan buat Google Business Profile
untuk marketing gallery agar muncul di pencarian lokal ("rumah Setiabudi Bandung").

## Deploy

Vercel paling mudah: import repo, set environment variable dari `.env.example`, deploy.
