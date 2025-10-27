import React, { useRef, useEffect, useState } from "react";
import aboutImg from "../Images/digital.png";

export default function AboutSection() {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Perfect height sync for desktop
  useEffect(() => {
    const syncHeights = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (!mobile && textRef.current && imageRef.current) {
        const textHeight = textRef.current.offsetHeight;
        
        // Image container ko exactly text ki height denge
        imageRef.current.style.height = `${textHeight}px`;
        
        // Text container ko bhi same height denge (flexbox ke liye)
        textRef.current.style.height = `${textHeight}px`;
      } else {
        // Mobile pe heights reset karenge
        if (imageRef.current) imageRef.current.style.height = "auto";
        if (textRef.current) textRef.current.style.height = "auto";
      }
    };

    syncHeights();
    
    // Small delay for content load
    const timeoutId = setTimeout(syncHeights, 100);
    
    window.addEventListener('resize', syncHeights);
    window.addEventListener('load', syncHeights);
    
    return () => {
      window.removeEventListener('resize', syncHeights);
      window.removeEventListener('load', syncHeights);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="bg-[#0b0713] text-white py-12 md:py-24 px-4 sm:px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-8 md:gap-12">
        
        {/* LEFT IMAGE CONTAINER - Direct height control */}
        <div
          ref={imageRef}
          className="w-full md:w-1/2 flex-shrink-0 order-2 md:order-1"
        >
          <img
            src={aboutImg}
            alt="Creative marketing agency team"
            className="rounded-xl md:rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] md:shadow-[0_20px_50px_rgba(0,0,0,0.45)] w-full h-full md:h-[900px] object-cover"
          />
        </div>

        {/* RIGHT TEXT CONTAINER - Direct height control */}
        <div 
          ref={textRef} 
          className="w-full md:w-1/2 flex flex-col order-1 md:order-2"
        >
          <div className="flex flex-col justify-center h-full">
            {/* Heading with responsive text sizes */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
              About 78 Marketing Agency – Your Growth Partner in the{" "}
              <span className="block sm:inline">
                Digital World{" "}
                <span className="text-yellow-400">🤘</span>
              </span>
            </h2>

            {/* Main paragraph with responsive text */}
            <p className="text-base sm:text-lg md:text-[19px] leading-relaxed text-gray-300 mb-4 md:mb-6">
              Welcome to 78 Marketing Agency, a result-driven digital marketing and web development 
              agency dedicated to helping brands grow, scale, and dominate the online marketplace. 
              We specialize in performance marketing, TikTok & Meta ads, SEO services, Shopify store 
              development, and creative brand design – all tailored to boost your revenue and digital presence.
            </p>

            <p className="text-base sm:text-lg md:text-[19px] leading-relaxed text-gray-300 mb-6">
              With a strong focus on data, creativity, and ROI, our mission is to transform businesses 
              into powerful digital brands. Whether you are a startup, e-commerce store, or established 
              enterprise, we provide strategies that deliver measurable results and long-term growth.
            </p>

            {/* Why Trust Us section */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-lg sm:text-xl md:text-[20px] font-semibold text-white mb-3 md:mb-4">
                Why Businesses Trust Us
              </h3>
              <ul className="space-y-2 md:space-y-3 text-gray-300">
                {[
                  "Performance-based marketing strategies focused on ROI",
                  "High-converting Shopify and custom website development",
                  "Verified TikTok and Meta ad accounts with high spending limits",
                  "SEO services that increase Google rankings and organic traffic",
                  "Creative graphic design and professional video editing solutions",
                  "Global reach with localized marketing expertise"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm sm:text-base md:text-[16px] leading-relaxed">
                    <span className="text-yellow-400 mt-1 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative curve - Hidden on mobile, visible on desktop */}
            <div className="hidden md:flex justify-end mt-6">
              <div className="w-8 h-8 border-b-4 border-l-4 border-[#6c4bc5] rounded-bl-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}