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

const title = "Green Setiabudi Residence | Rumah Mewah di Setiabudi Bandung";
const description =
  "Green Setiabudi Residence: hunian eksklusif dan hijau di kawasan Setiabudi, Bandung. Lihat tipe rumah, virtual tour 360°, simulasi KPR, dan jadwalkan visit lewat WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | Green Setiabudi Residence" },
  description,
  keywords: [
    "rumah Setiabudi Bandung",
    "perumahan Setiabudi Bandung",
    "rumah mewah Bandung",
    "cluster Bandung utara",
    "rumah dijual Bandung",
    "Green Setiabudi Residence",
    "KPR rumah Bandung",
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
  },
  twitter: { card: "summary_large_image", title, description },
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
      image: `${site.url}/opengraph-image`,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.address,
        addressLocality: "Bandung",
        addressRegion: "Jawa Barat",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.geo.lat,
        longitude: site.geo.lng,
      },
      openingHours: "Mo-Su 09:00-17:00",
      sameAs: [site.instagram],
    },
    {
      "@type": "Residence",
      name: site.name,
      description,
      url: site.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bandung",
        addressRegion: "Jawa Barat",
        addressCountry: "ID",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="id" className={`${cinzel.variable} ${montserrat.variable}`}>
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
