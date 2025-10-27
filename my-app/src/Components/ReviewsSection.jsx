import React, { useEffect, useRef, useState } from "react";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Faiza Imran",
      role: "Owner",
      text:
        "Very nice experience. Professional work and clear weekly updates. Highly recommended if you want results without guesswork!",
    },
    {
      name: "Ali Raza",
      role: "Marketing Director",
      text:
        "Excellent digital marketing team! They helped us grow brand visibility and improve ROI through targeted campaigns.",
    },
    {
      name: "Sara Khan",
      role: "Founder, Luxe Studio",
      text:
        "Creative, responsive, and very professional. Our social presence has never been this strong.",
    },
  ];

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const AUTO_MS = 4000;

  const next = () => setIndex((i) => (i + 1) % reviews.length);
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);

  // autoplay with pause-on-hover/focus
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, AUTO_MS);
    return () => clearInterval(intervalRef.current);
  }, [paused, reviews.length]);

  const { name, role, text } = reviews[index];

  return (
    <section className="relative bg-[#0b0713] text-white py-14 px-4 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_0%,rgba(124,77,255,0.1),transparent_70%)]" />
      <div className="relative max-w-5xl mx-auto text-center">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-violet-300">
          OUR CLIENTS SAY
        </p>
        <h2 className="text-2xl sm:text-4xl font-extrabold mt-2 text-white leading-tight">
          What People Say About Us
        </h2>

        {/* slider wrapper — pause on hover/focus */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="relative mt-8 sm:mt-10 flex items-center justify-center overflow-visible"
        >
          {/* left arrow — outside on mobile */}
          <button
            onClick={prev}
            className="absolute z-10 top-1/2 -translate-y-1/2 -left-3 sm:-left-10 rounded-full border border-violet-400/40 hover:bg-violet-600/20 p-2 sm:p-3 transition"
            aria-label="Previous review"
          >
            <ArrowLeft />
          </button>

          <article
            tabIndex={0}
            className="bg-[#120d1f] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]
                      rounded-2xl px-4 py-5 sm:px-10 sm:py-10 w-full max-w-[92%] sm:max-w-2xl text-left outline-none mx-auto"
          >
            <header className="flex items-center gap-4 mb-4 sm:mb-5">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-violet-600 flex items-center justify-center text-base sm:text-lg font-bold">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h4 className="font-bold text-base sm:text-lg text-violet-200">{name}</h4>
                <p className="text-xs sm:text-sm text-white/70">{role}</p>
              </div>
            </header>
            <p className="text-white/80 text-[14px] sm:text-[15px] leading-relaxed">
              {text}
            </p>
          </article>

          {/* right arrow — outside on mobile */}
          <button
            onClick={next}
            className="absolute z-10 top-1/2 -translate-y-1/2 -right-3 sm:-right-10 rounded-full border border-violet-400/40 hover:bg-violet-600/20 p-2 sm:p-3 transition"
            aria-label="Next review"
          >
            <ArrowRight />
          </button>
        </div>

        {/* dots */}
        <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={[
                "h-2.5 w-2.5 rounded-full transition",
                i === index ? "bg-violet-400" : "bg-white/20 hover:bg-white/40",
              ].join(" ")}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Icons */
function ArrowLeft({ className = "h-5 w-5 text-violet-300" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}
function ArrowRight({ className = "h-5 w-5 text-violet-300" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
