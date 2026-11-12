/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // alamat pendek untuk dibagikan, contoh: nama-project.vercel.app/harga
  async redirects() {
    return [
      { source: "/tour", destination: "/#tour-360", permanent: false },
      { source: "/tipe", destination: "/#tipe", permanent: false },
      { source: "/denah", destination: "/#tipe", permanent: false },
      { source: "/harga", destination: "/#harga", permanent: false },
      { source: "/kpr", destination: "/#kpr", permanent: false },
      { source: "/lokasi", destination: "/#lokasi", permanent: false },
      { source: "/visit", destination: "/#kontak", permanent: false },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      // render & denah jarang berubah: cache 1 hari
      {
        source: "/(360|images)/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
