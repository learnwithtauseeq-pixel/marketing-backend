import Header from "../Header";
import ServicesGrid from "./ServicesGrid";
import Footer from "../Footer";
import ContactForm from "./ContactForm";

export default function Services() {
  return (
    <main className="min-h-screen bg-[#0b0713] text-white">
      <Header />
      <ServicesGrid />
      <ContactForm />
     <Footer />
    </main>
  );
}