import Header from "../Components/Header";
import Hero from "../Components/Hero";
import StatsStrip from "../Components/StatsStrip";
import OffersSection from "../Components/OffersSection";
import UltimateExperience from "../Components/UltimateExperience";
import ServicesShowcase from "../Components/ServicesShowcase";
import ReviewsSection from "../Components/ReviewsSection";
import ContactSection from "../Components/ContactSection";
import Footer from "../Components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0713] text-white">
      <Header />
      <Hero />
       <StatsStrip />
       <OffersSection />
       <UltimateExperience />
       <ServicesShowcase />
       <ReviewsSection />
       <ContactSection />
       <Footer />
    </main>
  );
}
