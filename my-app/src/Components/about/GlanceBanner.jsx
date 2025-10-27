import React from "react";
import glanceImg from "../Images/banner.png";

export default function GlanceBanner({ src = glanceImg, className = "" }) {
  return (
    <section className={`bg-[#0b0713] px-4 sm:px-6 md:px-8 py-8 md:py-12 ${className}`}>
      <div className="max-w-[1400px] mx-auto">
        <img
          src={src}
          alt="78 Marketing Agency — at a glance"
          loading="lazy"
          className="w-full h-auto md:h-[700px] rounded-xl md:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        />
      </div>
    </section>
  );
}

