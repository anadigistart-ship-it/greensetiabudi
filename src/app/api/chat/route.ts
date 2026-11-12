import { NextResponse } from "next/server";
import { bookingFee, faqs, nearby, persyaratanKpr, rupiah, site, units, waLink } from "@/lib/data";

type Action = { label: string; href: string };
type Reply = { reply: string; actions?: Action[] };

const has = (t: string, words: string[]) => words.some((w) => t.includes(w));

function answer(raw: string): Reply {
  const t = raw.toLowerCase().trim();

  if (has(t, ["halo", "hai", "hi ", "hello", "pagi", "siang", "sore", "malam"]) && t.length < 25) {
    return {
      reply:
        "Halo, selamat datang di Green Setiabudi Residence 🌿 Saya asisten virtual. Mau tanya soal tipe rumah, harga, lokasi, KPR, atau jadwal visit?",
    };
  }

  if (has(t, ["harga", "price", "berapa", "biaya"])) {
    const list = units.map((u) => `• ${u.name} (${u.type}): ${rupiah(u.price)}, DP ${rupiah(u.dp)}`).join("\n");
    return {
      reply: `Harga promo:\n${list}\n\nBooking fee ${rupiah(bookingFee)} belum termasuk harga jual. Harga dapat berubah, hubungi marketing untuk penawaran terbaru.`,
      actions: [
        { label: "Lihat daftar harga", href: "#harga" },
        { label: "Tanya harga terbaru", href: waLink("Halo, saya ingin tanya harga terbaru Green Setiabudi Residence.") },
      ],
    };
  }

  if (has(t, ["tipe", "type", "unit", "kamar", "luas", "model"])) {
    const list = units
      .map((u) =>
        u.bedrooms != null
          ? `• ${u.name} ${u.type}: ${u.bedrooms} KT, ${u.bathrooms} KM, ${u.floors} lantai`
          : `• ${u.name} ${u.type}: detail denah segera hadir`,
      )
      .join("\n");
    return {
      reply: `Kami punya ${units.length} tipe:\n${list}\n\nLihat detail di bagian Tipe Rumah.`,
      actions: [{ label: "Lihat tipe rumah", href: "#tipe" }],
    };
  }

  if (has(t, ["lokasi", "alamat", "dimana", "di mana", "maps", "akses", "dekat"])) {
    const list = nearby.slice(0, 4).map((n) => `• ${n.name} ${n.time}`).join("\n");
    return {
      reply: `Green Setiabudi Residence berada di ${site.address}.\n\nAkses terdekat (perkiraan):\n${list}`,
      actions: [{ label: "Lihat peta", href: "#lokasi" }],
    };
  }

  if (has(t, ["syarat", "persyaratan", "berkas", "dokumen"])) {
    return {
      reply: `Berkas KPR utama:\n${persyaratanKpr.slice(0, 5).map((p) => `• ${p}`).join("\n")}\n\nDaftar lengkap ada di bagian Harga.`,
      actions: [{ label: "Lihat persyaratan", href: "#harga" }],
    };
  }

  if (has(t, ["kpr", "cicil", "dp", "angsuran", "kredit", "bank"])) {
    return {
      reply:
        "Tersedia KPR lewat Bank Syariah Nasional (BSN) dan BNI, tenor 5 sampai 25 tahun. Lihat angsuran per bank di bagian Harga, atau coba Simulasi KPR.",
      actions: [
        { label: "Tabel angsuran", href: "#harga" },
        { label: "Simulasi KPR", href: "#kpr" },
        { label: "Konsultasi via WA", href: waLink("Halo, saya ingin konsultasi KPR Green Setiabudi Residence.") },
      ],
    };
  }

  if (has(t, ["tour", "360", "virtual", "video"])) {
    return {
      reply: "Anda bisa melihat rumah secara virtual lewat Tour 360° tanpa perlu datang ke lokasi.",
      actions: [{ label: "Buka Tour 360°", href: "#tour-360" }],
    };
  }

  if (has(t, ["visit", "survey", "kunjung", "jadwal", "datang", "lihat langsung"])) {
    return {
      reply: `Kami buka ${site.hours}. Isi form jadwal visit di bagian Kontak, atau langsung chat marketing untuk booking.`,
      actions: [
        { label: "Jadwalkan Visit", href: "#kontak" },
        { label: "Booking via WA", href: waLink("Halo, saya ingin jadwalkan visit ke Green Setiabudi Residence.") },
      ],
    };
  }

  if (has(t, ["fasilitas", "keamanan", "security", "taman", "clubhouse"])) {
    return {
      reply:
        "Fasilitas utama: one gate system + CCTV 24 jam, taman tematik, jogging track, clubhouse, playground, dan ruang terbuka hijau luas.",
      actions: [{ label: "Lihat fasilitas", href: "#fasilitas" }],
    };
  }

  if (has(t, ["legal", "shm", "sertifikat", "imb", "pbg"])) {
    return { reply: faqs[2].a };
  }

  if (has(t, ["wa", "whatsapp", "kontak", "telepon", "hubungi", "marketing", "sales"])) {
    return {
      reply: `Anda bisa hubungi tim marketing di ${site.phoneDisplay} (${site.hours}).`,
      actions: [{ label: "Chat WhatsApp", href: waLink("Halo, saya tertarik dengan Green Setiabudi Residence.") }],
    };
  }

  return {
    reply:
      "Maaf, saya belum paham pertanyaan itu. Coba tanya soal harga, tipe, lokasi, KPR, atau visit. Atau langsung chat tim marketing kami.",
    actions: [{ label: "Chat WhatsApp", href: waLink("Halo, saya ingin bertanya tentang Green Setiabudi Residence.") }],
  };
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { message?: unknown };
    const message = typeof body.message === "string" ? body.message.slice(0, 500) : "";
    if (!message.trim()) {
      return NextResponse.json({ error: "Pesan kosong" }, { status: 400 });
    }
    return NextResponse.json(answer(message));
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid" }, { status: 400 });
  }
}
