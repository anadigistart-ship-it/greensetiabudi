// =====================================================================
// SEMUA DATA PROYEK ADA DI SINI. Angka bertanda "GANTI" adalah contoh,
// sesuaikan dengan data resmi developer sebelum website dipublikasikan.
// =====================================================================

export const site = {
  name: "Green Setiabudi Residence",
  short: "Green Setiabudi",
  tagline: "Live in Nature, Live in Luxury",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://greensetiabudiresidence.com",
  whatsapp: process.env.NEXT_PUBLIC_WA_NUMBER ?? "6285220318051",
  phoneDisplay: "+62 852-2031-8051",
  email: "greensetiabudiresidence@gmail.com",
  developer: "PT Karya Central Terang Abadi",
  address: "Jl. Terusan Sersan Bajuri, Cihideung, Kec. Parongpong, Kota Bandung, Jawa Barat 40559",
  geo: { lat: -6.8607, lng: 107.5937 }, // GANTI dengan koordinat gerbang cluster (titik ini masih perkiraan)
  instagram: "https://www.instagram.com/greensetiabudiresidence/",
  instagramHandle: "@greensetiabudiresidence",
  hours: "Senin - Minggu, 09.00 - 17.00 WIB",
};

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  { href: "#konsep", label: "Konsep" },
  { href: "#tipe", label: "Tipe Rumah" },
  { href: "#tour-360", label: "Tour 360" },
  { href: "#lokasi", label: "Lokasi" },
  { href: "#harga", label: "Harga" },
  { href: "#kpr", label: "Simulasi KPR" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontak", label: "Kontak" },
];

/** Menu navbar: "Hunian" jadi dropdown berisi Konsep, Tipe Rumah, dan Harga. */
export type NavItem = { label: string; href: string } | { label: string; children: { label: string; href: string; desc: string }[] };
export const navMenu: NavItem[] = [
  {
    label: "Hunian",
    children: [
      { label: "Konsep", href: "#konsep", desc: "Filosofi & keunggulan kawasan" },
      { label: "Tipe Rumah", href: "#tipe", desc: "Tancy, Lotus, dan Kaluna" },
      { label: "Harga", href: "#harga", desc: "Daftar harga & promo bank" },
    ],
  },
  { href: "#tour-360", label: "Tour 360" },
  { href: "#lokasi", label: "Lokasi" },
  { href: "#kpr", label: "Simulasi KPR" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontak", label: "Kontak" },
];

export const values = [
  {
    icon: "leaf",
    title: "Natural Environment",
    desc: "Selaras dengan alam untuk kehidupan berkelanjutan.",
  },
  {
    icon: "diamond",
    title: "Luxury Lifestyle",
    desc: "Menghadirkan kemewahan dan kenyamanan tanpa kompromi.",
  },
  {
    icon: "home",
    title: "Premium Residence",
    desc: "Hunian eksklusif dengan desain modern dan berkualitas tinggi.",
  },
  {
    icon: "tree",
    title: "Healthy Living",
    desc: "Lingkungan hijau yang sehat untuk hidup yang lebih baik.",
  },
  {
    icon: "shield",
    title: "Secure & Private",
    desc: "Keamanan 24 jam dan lingkungan yang aman dan privat.",
  },
] as const;

export type Bank = "BSN" | "BNI";
export const banks: { id: Bank; name: string }[] = [
  { id: "BSN", name: "Bank Syariah Nasional" },
  { id: "BNI", name: "BNI" },
];
export const tenors = [5, 10, 15, 20, 25] as const;
export type Tenor = (typeof tenors)[number];

export type Unit = {
  id: string;
  name: string;
  type: string; // "Tipe 60/90" (bangunan/tanah)
  tagline: string;
  building: number;
  land: number;
  bedrooms: number | null; // null = belum ada data denah
  bathrooms: number | null;
  carport: number | null;
  floors: number | null;
  frontage: string | null; // lebar x panjang kavling, dari denah
  price: number; // harga promo, Rupiah
  dp: number; // uang muka
  kpr: number; // plafon KPR
  installments: Record<Bank, Record<Tenor, number>>; // angsuran per bulan, dari daftar harga
  features: string[];
  gradient: string;
  image?: string; // render tampak depan
  gallery?: { src: string; label: string }[]; // foto interior (tab "Interior")
  carportLabel?: string; // override teks carport, mis. "2 mobil"
  oldPriceLabel?: string; // harga coret, mis. "Rp1,4 M"
  plan?: { src: string; w: number; h: number }; // denah
  scene?: string; // id scene di tourScenes
};

// Angka harga & angsuran disalin dari daftar harga promo developer.
export const units: Unit[] = [
  {
    id: "tancy",
    name: "Tancy",
    type: "Tipe 50/72",
    tagline: "Dua lantai 6 x 12 m, compact modern untuk keluarga muda",
    building: 50,
    land: 72,
    bedrooms: 2,
    bathrooms: 2,
    carport: 2,
    carportLabel: "2 mobil",
    floors: 2,
    frontage: "6 x 12 m",
    oldPriceLabel: "Rp1,4 M", // harga coret di brosur
    // PERIKSA: brosur menulis "900 jutaan", daftar harga di bawah 850 jt. Angsuran dihitung dari 850 jt.
    price: 850_000_000,
    dp: 50_000_000,
    kpr: 800_000_000,
    installments: {
      BSN: { 5: 17_393_938, 10: 8_877_623, 15: 6_746_533, 20: 5_726_834, 25: 5_149_522 },
      BNI: { 5: 15_188_787, 10: 8_583_336, 15: 6_431_022, 20: 5_390_753, 25: 4_793_982 },
    },
    features: ["Parkir 2 mobil", "Listrik 2200 watt", "Air PDAM", "Private residence"],
    gradient: "from-sage/40 via-forest to-deep",
    image: "/images/units/tancy-tampak.jpg",
    plan: { src: "/images/units/tancy-denah.png", w: 771, h: 628 },
    gallery: [
      { src: "/images/units/tancy-living.jpg", label: "Living room" },
      { src: "/images/units/tancy-kamar.jpg", label: "Bedroom" },
      { src: "/images/units/tancy-mandi.jpg", label: "Bathroom" },
    ],
  },
  {
    id: "lotus",
    name: "Lotus",
    type: "Tipe 60/90",
    tagline: "Dua lantai, taman belakang dan balkon hijau",
    building: 60,
    land: 90,
    bedrooms: 3,
    bathrooms: 2,
    carport: 1,
    floors: 2,
    frontage: "6 x 15 m",
    price: 975_000_000,
    dp: 50_000_000,
    kpr: 925_000_000,
    installments: {
      BSN: { 5: 20_111_741, 10: 10_264_752, 15: 7_800_679, 20: 6_621_652, 25: 5_954_135 },
      BNI: { 5: 17_562_035, 10: 9_924_482, 15: 7_435_869, 20: 6_233_059, 25: 5_543_041 },
    },
    features: ["Balkon + planter box", "Taman belakang", "Dapur & dining terbuka", "Kamar utama lantai 2"],
    gradient: "from-leaf/30 via-forest to-deep",
    image: "/360/lotus.jpg",
    plan: { src: "/images/denah-lotus.jpg", w: 741, h: 818 },
    scene: "lotus",
  },
  {
    id: "kaluna",
    name: "Kaluna",
    type: "Tipe 72/120",
    tagline: "Kavling lebar 8 m, carport lega dan dua balkon",
    building: 72,
    land: 120,
    bedrooms: 3,
    bathrooms: 2,
    carport: 1,
    floors: 2,
    frontage: "8 x 15 m",
    price: 1_250_000_000,
    dp: 100_000_000,
    kpr: 1_150_000_000,
    installments: {
      BSN: { 5: 25_003_786, 10: 12_761_584, 15: 9_698_141, 20: 8_232_324, 25: 7_402_438 },
      // PERIKSA: angsuran BNI Kaluna lebih tinggi dari BSN, sedangkan tipe lain sebaliknya.
      // Angka disalin apa adanya dari daftar harga; konfirmasi ke developer.
      BNI: { 5: 28_478_976, 10: 16_093_755, 15: 12_058_166, 20: 10_107_662, 25: 8_988_716 },
    },
    features: ["Balkon + planter box", "Carport mobil + motor", "Taman depan & belakang", "Kamar utama lantai 2"],
    gradient: "from-gold/25 via-forest to-deep",
    image: "/360/kaluna.jpg",
    plan: { src: "/images/denah-kaluna.jpg", w: 821, h: 818 },
    scene: "kaluna",
  },
];

// Ketentuan & persyaratan dari daftar harga developer.
export const bookingFee = 10_000_000;
export const ketentuan = [
  "Uang tanda jadi sebesar Rp10.000.000, sudah all in.", // PERIKSA: pastikan makna "all in" sesuai ketentuan developer
  "Berkas KPR harus dilengkapi dan diserahkan ke developer dalam 10 (sepuluh) hari sejak pembayaran uang tanda jadi.",
  "Pindah kavling dikenakan biaya Rp2.000.000.",
  "Harga kelebihan tanah sebesar Rp7.000.000 per m².",
];
export const persyaratanKpr = [
  "8 lembar fotokopi KTP pemohon (suami/istri)",
  "3 lembar fotokopi Kartu Keluarga",
  "2 lembar fotokopi Surat Nikah (jika sudah menikah)",
  "2 lembar pas foto suami istri (4 x 6)",
  "20 lembar meterai Rp10.000 (untuk akad kredit)",
  "1 lembar fotokopi Kartu Pegawai",
  "1 lembar fotokopi rekening tabungan (3 bulan terakhir)",
  "Slip gaji / surat keterangan penghasilan (asli)",
  "Surat keterangan bekerja",
  "Fotokopi SIUP dan NPWP perusahaan tempat bekerja",
  "NPWP pribadi / PPh 21",
  "Bukti pembayaran uang tanda jadi",
];
export const bookingAccount = {
  company: "PT Karya Central Terang Abadi",
  bank: "Bank Syariah Nasional (DH: BTN Syariah)",
  number: "2223456789", // PERIKSA ke developer sebelum publish
  holder: "Handy Halim dan Hasan Kurniawan",
};
export const bankAccountNote = "Pastikan nomor rekening dan nama penerima sama dengan yang diberikan marketing sebelum transfer.";

export const rupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export const rupiahShort = (n: number) =>
  n >= 1_000_000_000 ? `Rp ${(n / 1_000_000_000).toFixed(2).replace(".", ",").replace(/,?0+$/, "")} M` : `Rp ${Math.round(n / 1_000_000)} Jt`;

// Scene tour 360. Dibuat dari render yang ada (bukan foto equirectangular):
// viewer memberi efek putar, zoom, dan hotspot. Untuk panorama 360 sungguhan,
// isi `embed` dengan URL Kuula / Matterport / Pannellum.
export type Hotspot =
  | { id: string; kind: "go"; x: number; y: number; label: string; to: string }
  | { id: string; kind: "info"; x: number; y: number; label: string; text: string }
  | { id: string; kind: "unit"; x: number; y: number; label: string; text: string; unit: string };

export type Scene = {
  id: string;
  label: string;
  sub: string;
  src: string;
  w: number;
  h: number;
  embed: string;
  hotspots: Hotspot[];
};

// x, y = posisi hotspot dalam persen terhadap gambar.
export const tourScenes: Scene[] = [
  {
    id: "gerbang",
    label: "Gerbang Utama",
    sub: "One gate system",
    src: "/360/gerbang.jpg",
    w: 1600,
    h: 831,
    embed: "",
    hotspots: [
      { id: "pos", kind: "info", x: 36, y: 64, label: "Pos keamanan", text: "Akses masuk satu pintu dengan portal dan pos jaga." },
      { id: "taman", kind: "info", x: 62, y: 70, label: "Taman & pedestrian", text: "Jalur pejalan kaki dengan taman tanaman hias di sepanjang pagar cluster." },
      { id: "to-lotus", kind: "go", x: 70, y: 42, label: "Ke Tipe Lotus", to: "lotus" },
    ],
  },
  {
    id: "lotus",
    label: "Tipe Lotus",
    sub: "60/90 · tampak depan",
    src: "/360/lotus.jpg",
    w: 1600,
    h: 1003,
    embed: "",
    hotspots: [
      { id: "balkon", kind: "info", x: 37, y: 43, label: "Balkon", text: "Balkon lantai 2 dengan planter box tanaman rambat." },
      { id: "pintu", kind: "info", x: 36, y: 67, label: "Pintu utama", text: "Pintu kayu dengan carport untuk 1 mobil dan 1 motor." },
      { id: "denah", kind: "unit", x: 56, y: 33, label: "Denah Lotus", text: "Lihat denah dua lantai, spesifikasi, dan harga Tipe Lotus.", unit: "lotus" },
      { id: "to-kaluna", kind: "go", x: 91, y: 62, label: "Ke Tipe Kaluna", to: "kaluna" },
    ],
  },
  {
    id: "kaluna",
    label: "Tipe Kaluna",
    sub: "72/120 · tampak depan",
    src: "/360/kaluna.jpg",
    w: 1600,
    h: 1018,
    embed: "",
    hotspots: [
      { id: "balkon", kind: "info", x: 63, y: 40, label: "Dua balkon", text: "Balkon lantai 2 dengan planter box hijau yang menghadap jalan cluster." },
      { id: "carport", kind: "info", x: 25, y: 68, label: "Carport", text: "Lebar kavling 8 m, carport lega untuk mobil dan motor." },
      { id: "denah", kind: "unit", x: 50, y: 25, label: "Denah Kaluna", text: "Lihat denah dua lantai, spesifikasi, dan harga Tipe Kaluna.", unit: "kaluna" },
      { id: "to-gerbang", kind: "go", x: 7, y: 50, label: "Ke Gerbang", to: "gerbang" },
    ],
  },
];

export const facilities = [
  "One Gate System + CCTV 24 jam",
  "Taman tematik & jogging track",
  "Clubhouse & co-working space",
  "Playground anak",
  "Jalan lebar paving block & PJU",
  "Ruang terbuka hijau lebih dari 30%",
  "Fasilitas ibadah",
  "Instalasi fiber optic ready",
];

// Waktu tempuh perkiraan, verifikasi sebelum publish.
export const nearby = [
  { name: "UPI Setiabudi", time: "± 5 menit" },
  { name: "Terminal Ledeng", time: "± 8 menit" },
  { name: "Universitas Parahyangan", time: "± 15 menit" },
  { name: "Lembang & Parongpong", time: "± 20 menit" },
  { name: "Paris Van Java Mall", time: "± 15 menit" },
  { name: "Tol Pasteur", time: "± 25 menit" },
];

export const faqs = [
  {
    q: "Di mana lokasi Green Setiabudi Residence?",
    a: "Green Setiabudi Residence berada di Jl. Terusan Sersan Bajuri, Cihideung, Kec. Parongpong, Jawa Barat 40559, kawasan sejuk dan hijau di jalur Setiabudi menuju Lembang.",
  },
  {
    q: "Apakah rumah bisa dibeli dengan KPR?",
    a: "Bisa. Tersedia KPR lewat Bank Syariah Nasional (BSN) dan BNI dengan tenor 5 sampai 25 tahun. Lihat tabel angsuran di bagian Harga, atau hubungi marketing via WhatsApp untuk skema terbaik.",
  },
  {
    q: "Apa status legalitas tanah dan bangunannya?",
    a: "Unit dilengkapi dokumen legal lengkap berupa sertifikat dan izin bangunan. Detail dokumen akan dijelaskan oleh tim marketing saat visit atau konsultasi.",
  },
  {
    q: "Berapa DP dan cicilan per bulannya?",
    a: "DP mulai Rp50 juta untuk Tancy dan Lotus, dan Rp100 juta untuk Kaluna. Uang tanda jadi hanya Rp10 juta, sudah all in. Cicilan tergantung tipe, bank, dan tenor; lihat tabel di bagian Harga. Perhitungan final mengikuti ketentuan bank.",
  },
  {
    q: "Bagaimana cara melihat rumahnya?",
    a: "Anda bisa mencoba Virtual Tour 360° di website ini, atau jadwalkan kunjungan langsung ke lokasi lewat tombol Jadwalkan Visit.",
  },
  {
    q: "Apakah tersedia rumah ready stock?",
    a: "Ketersediaan unit berubah setiap saat. Hubungi marketing via WhatsApp untuk info unit ready stock dan indent terbaru.",
  },
];