import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Green Setiabudi Residence",
    short_name: "Green Setiabudi",
    description: "Hunian eksklusif dan hijau di Setiabudi, Bandung.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F2218",
    theme_color: "#1E3D2B",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
