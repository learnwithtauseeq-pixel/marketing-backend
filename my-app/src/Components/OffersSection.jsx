// OffersSection.jsx
export default function OffersSection() {
  const items = [
  
    {
      title: "Web Design & Development",
      desc: "Get a fast, SEO-optimized, and user-friendly website that boosts your brand visibility and turns visitors into customers.",
    },
    {
      title: "SEO (Search Engine Optimization)",
      desc: "Rank higher on Google and generate organic traffic with our proven SEO strategies designed for long-term business growth.",
    },
     {
      title: "Social Media Marketing",
      desc: "Grow your brand presence and increase engagement through targeted social media campaigns that convert followers into paying customers.",
    },
     {
      title: "Video Editing & Animation",
      desc: "Engage your audience with professional video editing and animation services that enhance brand storytelling and boost conversions.",
    },
    {
      title: "Graphic Designing",
      desc: "Stand out with creative and brand-focused graphic designs that build recognition and attract your ideal audience.",
    },
    {
      title: "Shopify Store Development",
      desc: "Launch a high-converting Shopify store with professional design, fast performance, and SEO optimization to grow your e-commerce business and boost sales.",
    },
    
  ];

  return (
    <section className="py-10 sm:py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* heading */}
        <h2 className="text-center text-[22px] sm:text-2xl md:text-3xl font-extrabold text-violet-400">
          What We Offer
        </h2>

        {/* cards: mobile 1-col, md 2-col, lg 3-col */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              className="
                rounded-3xl border border-violet-500/40
                bg-[#120d1f]/50 backdrop-blur
                p-5 sm:p-6 lg:p-8
                shadow-[0_12px_40px_rgba(0,0,0,0.35)]
                hover:border-violet-400/60 transition
              "
            >
              <h3 className="text-white text-xl sm:text-2xl md:text-[26px] font-extrabold leading-tight">
                {splitTwoLines(it.title)}
              </h3>
              <p className="mt-3 text-[13px] sm:text-sm md:text-base leading-relaxed text-white/70">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* optional helper: break long titles similar to screenshot */
function splitTwoLines(title) {
  // Manually insert line break for known titles (or just return title)
  if (title === "Networking Opportunities")
    return (
      <>
        Networking
        <br /> Opportunities
      </>
    );
  if (title === "Comprehensive Resources")
    return (
      <>
        Comprehensive
        <br /> Resources
      </>
    );
  return title;
}
