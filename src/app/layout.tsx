import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/lib/data";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const title = "Green Setiabudi Residence | Rumah di Parongpong Bandung Barat";
const description =
  "Rumah 2 lantai modern tropis dengan view pegunungan di Jl. Terusan Sersan Bajuri, Parongpong, Bandung Barat. Uang tanda jadi Rp10 juta. Tipe Tancy, Lotus, Kaluna, virtual tour 360°, simulasi KPR.";
const ogImage = { url: "/og-image.jpg", width: 1200, height: 630, alt: "Green Setiabudi Residence, rumah dengan pemandangan pegunungan di Parongpong" };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | Green Setiabudi Residence" },
  description,
  keywords: [
    "Green Setiabudi Residence",
    "rumah Parongpong",
    "perumahan Parongpong Bandung Barat",
    "rumah dijual Bandung Barat",
    "rumah Sersan Bajuri",
    "rumah Cihideung Parongpong",
    "rumah dekat Setiabudi Lembang",
    "rumah 2 lantai Bandung utara",
    "cluster Bandung utara",
    "rumah uang tanda jadi 10 juta",
    "KPR rumah Bandung Barat",
    "virtual tour rumah 360",
  ],
  authors: [{ name: site.developer }],
  creator: site.developer,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: site.name,
    title,
    description,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", title, description, images: [ogImage.url] },
  // Verifikasi Search Console: isi NEXT_PUBLIC_GSC_VERIFICATION dengan kode dari metode "HTML tag" (opsional)
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "real estate",
};

export const viewport: Viewport = {
  themeColor: "#1E3D2B",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "id-ID",
    },
    {
      "@type": "RealEstateAgent",
      "@id": `${site.url}/#org`,
      name: site.name,
      url: site.url,
      telephone: site.phoneDisplay,
      email: site.email,
      description,
      image: `${site.url}/og-image.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Terusan Sersan Bajuri, Cihideung",
        addressLocality: "Parongpong",
        addressRegion: "Jawa Barat",
        postalCode: "40559",
        addressCountry: "ID",
      },
      // geo dimatikan sampai koordinat gerbang cluster dipastikan (site.geo masih perkiraan; koordinat salah merugikan SEO lokal)
      // geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
      areaServed: ["Parongpong", "Cihideung", "Lembang", "Bandung Barat", "Bandung"],
      openingHours: "Mo-Su 09:00-17:00",
      sameAs: [site.instagram],
    },
    {
      "@type": "Residence",
      "@id": `${site.url}/#residence`,
      name: site.name,
      description,
      url: site.url,
      image: [`${site.url}/og-image.jpg`, `${site.url}/images/hero-gunung.jpg`, `${site.url}/images/units/tancy-tampak.jpg`],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Terusan Sersan Bajuri, Cihideung",
        addressLocality: "Parongpong",
        addressRegion: "Jawa Barat",
        postalCode: "40559",
        addressCountry: "ID",
      },
    },
  ],
};

// Dijalankan sebelum halaman tampil supaya tema tersimpan langsung terpasang (tanpa kedip). Default: dark (hijau).
const themeInit = `try{var t=localStorage.getItem("gsr-theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark");if(t==="light"){var m=document.querySelector('meta[name="theme-color"]');m&&m.setAttribute("content","#FFFFFF")}}catch(e){document.documentElement.setAttribute("data-theme","dark")}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="id" data-theme="dark" suppressHydrationWarning className={`${cinzel.variable} ${montserrat.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
