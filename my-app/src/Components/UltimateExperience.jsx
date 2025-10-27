import React from "react";
import promoVideo from "./Images/video.mp4"

export default function UltimateExperience() {
  return (
    <section className="bg-[#0b0713] text-white py-12 px-4 md:px-8">
      <h2 className="text-center text-[32px] md:text-[40px] font-extrabold text-purple-400">
        Ultimate Experience
      </h2>

      <div
        className="
          mx-auto mt-8 max-w-[1200px]
          grid grid-cols-1 md:grid-cols-2 gap-10 items-center
        "
      >
        {/* LEFT: video */}
        <div className="flex justify-center">
          <div
            className="
              relative rounded-2xl border border-white/10 overflow-hidden
              shadow-[0_16px_60px_rgba(0,0,0,0.45)]
              w-[325px] sm:w-[350px] md:w-[430px]
              h-[420px] md:h-[650px]
              bg-[#120d1f]
            "
          >
            <video
              src={promoVideo}
              controls
              playsInline
              className="w-full h-full object-cover bg-white"
            />
          </div>
        </div>

        {/* RIGHT: text */}
        <div
          className="
            min-h-[420px] md:min-h-[520px]
            flex flex-col justify-between
            px-2 sm:px-4 md:px-0   /* 🟣 added horizontal padding for mobile */
          "
        >
         <div>
  <h3 className="text-[22px] md:text-[28px] font-extrabold leading-snug text-white">
    Why 78 Marketing Agency is the Best Digital Marketing Agency in Pakistan
  </h3>

  <div className="mt-4 space-y-3 text-[14.5px] md:text-[15px] leading-relaxed text-white/85">
    <p>
      78 Marketing Agency is recognized as one of Pakistan’s leading digital marketing agencies, delivering high-performance solutions in SEO, TikTok Ads, Meta Ads, Shopify development, web design, and performance marketing. Our mission is to help businesses grow faster, scale globally, and dominate their industry through proven digital strategies.
    </p>
    <p>
      We combine data-driven marketing, creative content, and result-focused campaigns to ensure our clients get maximum ROI. From startups to established brands, we provide complete marketing solutions that increase sales, generate leads, and enhance brand visibility.
    </p>
    <p className="font-semibold text-white">
      What Makes Us #1 in Pakistan:
    </p>
    <ul className="list-disc list-inside space-y-2">
      <li>🚀 Top-performing TikTok & Meta Ads Agency</li>
      <li>📈 Experts in Shopify and Conversion-Focused Web Development</li>
      <li>🌍 Serving Local and International Brands</li>
      <li>✅ Transparent Reporting & Guaranteed Performance</li>
      <li>🎯 ROI-Driven Marketing Strategies</li>
    </ul>
    <p>
      Whether you are launching a new business or scaling your brand globally, <span className="font-semibold text-white">78 Marketing Agency</span> is your trusted partner for digital success in Pakistan and beyond. Our campaigns are built to deliver measurable performance so your business doesn’t just grow — it dominates.
    </p>
  </div>
</div>
        </div>
      </div>
    </section>
  );
}


