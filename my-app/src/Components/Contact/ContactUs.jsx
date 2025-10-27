import Header from "../Header";
import ContactSection from "../ContactSection";
import Footer from "../Footer";

export default function ContactUs() {
  return (
    // dvh = dynamic viewport (mobile browser bars ke saath sahi)
    <div className="min-h-dvh flex flex-col bg-[#0b0713] text-white overflow-x-hidden">
      <Header />

      {/* Content grows; footer pushes to bottom */}
      <div className="flex-1">
        <ContactSection />
      </div>

      {/* Make sure Footer ke upar hi gap aa sake, neeche nahi */}
      <Footer />
    </div>
  );
}
