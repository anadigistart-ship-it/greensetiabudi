import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";
import UnitTypes from "@/components/UnitTypes";
import Tour360 from "@/components/Tour360";
import Facilities from "@/components/Facilities";
import Location from "@/components/Location";
import PriceList from "@/components/PriceList";
import KprSimulator from "@/components/KprSimulator";
import Faq from "@/components/Faq";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import WelcomePopup from "@/components/WelcomePopup"; // ← tambahan 1
import { faqs } from "@/lib/data";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Navbar />
      <main>
        <Hero />
        <Concept />
        <UnitTypes />
        <Tour360 />
        <Facilities />
        <Location />
        <PriceList />
        <KprSimulator />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
      <WelcomePopup /> {/* ← tambahan 2 */}
    </>
  );
}