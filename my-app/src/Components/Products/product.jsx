
import MarketingCheckout from "./MarketingCheckout";
import StudentReviews from "./StudentReviews";
import PromoVideo from "./PromoVideo";
import SeminarCountdown from "./SeminarCountdown";
import ProductHeader from "./ProductHeader";
import AgencyAccountComparison from "./AgencyAccountComparison";


export default function Prosec() {
  return (
    <main className="min-h-screen bg-[#0b0713] text-white">
      <ProductHeader />
      <MarketingCheckout />
     <PromoVideo />
     <AgencyAccountComparison />
     <StudentReviews />
     <SeminarCountdown />
     
    </main>
  );
}