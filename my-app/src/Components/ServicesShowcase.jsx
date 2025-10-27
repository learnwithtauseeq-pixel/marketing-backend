import React from "react";

/** Violet-on-black version of the “Customer-centric digital services” section */
export default function ServicesShowcase() {
  const services = [
   {
  title: "Social Media\nMarketing",
  icon: MegaphoneIcon,
  desc:
    "Grow your brand on Facebook, Instagram, and LinkedIn with data-driven social media marketing strategies. From engaging content to targeted ads, we help you boost reach, engagement, and conversions.",
},
{
  title: "E-commerce\nSolutions",
  icon: SparkIcon,
  desc:
    "Build and scale your online store with our eCommerce website development and marketing expertise. We create fast, mobile-friendly, and SEO-optimized stores that drive sales and deliver measurable results.",
},
{
  title: "SEO\n(Search Engine Optimization)",
  icon: MailIcon,
  desc:
    "Increase visibility, rank higher on Google, and attract quality traffic with our proven SEO services. From on-page to technical SEO, we help your business grow organically and achieve long-term success.",
},

  ];

  return (
    <section className="relative bg-[#0b0713] text-white">
      {/* soft network-ish backdrop glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_-10%,rgba(124,77,255,0.18),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        {/* eyebrow */}
        <p className="text-xs font-semibold tracking-[0.18em] text-violet-300">
          OUR EXPERTISE
        </p>

        {/* heading (two lines like the reference) */}
        <h2 className="mt-2">
  <span className="block text-[38px] sm:text-[46px] lg:text-[56px] font-extrabold text-white leading-[1.08]">
    Customer-Centric Digital Marketing & 
  </span>
  <span className="block text-[38px] pb-[20px] sm:text-[46px] lg:text-[56px] font-extrabold leading-[1.08]
                   text-transparent bg-clip-text bg-gradient-to-r from-[#b493ff] to-[#7d54d6]">
    Web Solutions
  </span>
</h2>


        {/* intro line */}
        <p className="mt-4 max-w-3xl text-sm sm:text-[15px] text-white/75">
         We specialize in results-driven digital services that strengthen your brand’s online presence, increase customer engagement, and drive measurable business growth. Our expert team delivers tailored digital strategies designed to help your brand stand out in today’s competitive market.
        </p>

        {/* cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map(({ title, icon: Icon, desc }) => (
            <article
              key={title}
              className="relative rounded-[22px] bg-[#120d1f] border border-white/8
                         shadow-[0_18px_50px_rgba(0,0,0,0.45)] p-6 sm:p-7
                         hover:border-violet-400/40 transition"
            >
              {/* icon badge */}
              <div className="h-10 w-10 rounded-full bg-violet-600/90 ring-4 ring-violet-500/20 grid place-items-center">
                <Icon className="h-5 w-5 text-white" />
              </div>

              {/* title (allow manual line-breaks like mock) */}
              <h3 className="whitespace-pre-line mt-4 text-xl sm:text-2xl font-extrabold text-white">
                {title}
              </h3>

              <p className="mt-3 text-[13.5px] sm:text-[15px] leading-relaxed text-white/75">
                {desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- tiny inline icons to avoid extra deps --- */
function MegaphoneIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M21 8a1 1 0 0 0-1-1h-1.28L12 4H9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h1l1.2 2.4A2 2 0 0 0 13 19v-2.06l6-2.34H20a1 1 0 0 0 1-1V8Zm-9 7.44L10.618 14H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1.5l1.5.6v7.84ZM19 12.62l-6 2.34V7.04l6 2.34v3.24Z" />
    </svg>
  );
}
function SparkIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2 9.8 8.2 3.5 10.4 9.8 12.6 12 18.8 14.2 12.6 20.5 10.4 14.2 8.2 12 2z" />
    </svg>
  );
}
function MailIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </svg>
  );
}
