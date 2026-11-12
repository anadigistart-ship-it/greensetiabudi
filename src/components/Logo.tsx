// Logo memakai file PNG di folder /public:
//   /public/logo-green-setiabudi.png  -> logo lengkap (ikon + nama)
//   /public/logo-mark.png             -> ikon saja (rumah + bintang)

/** Logo yang dipakai di Hero / Navbar / Footer. Atur ukuran lewat tinggi (h-*), lebar mengikuti. */
export function LogoMark({ className = "h-20 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-green-setiabudi.png"
      alt="Logo Green Setiabudi Residence"
      draggable={false}
      className={`select-none object-contain ${className}`}
    />
  );
}

/** Logo lengkap dengan nama. */
export function LogoFull({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const h = size === "lg" ? "h-56 md:h-80" : size === "md" ? "h-36 md:h-40" : "h-24";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo-green-setiabudi.png"
      alt="Green Setiabudi Residence"
      draggable={false}
      className={`w-auto select-none object-contain ${h}`}
    />
  );
}
