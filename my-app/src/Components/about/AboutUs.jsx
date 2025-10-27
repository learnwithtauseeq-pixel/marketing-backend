import Header from "../Header";
import AboutSection from "../about/AboutSection"
import StatsShowcase from "../about/StatsShowcase";
import ContactSection from "../ContactSection";
import Footer from "../Footer";

export default function AboutUs() {
  return (
    <main className="min-h-screen bg-[#0b0713] text-white">
      
      <Header />
     <AboutSection />
     <StatsShowcase />
      <ContactSection />
     <Footer />
    </main>
  );
}