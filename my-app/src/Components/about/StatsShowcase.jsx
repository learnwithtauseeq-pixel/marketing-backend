import React, { useEffect, useRef, useState } from "react";

// Animate numbers when visible
function useCountUp(target = 0, duration = 1400, startWhenVisibleRef) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!startWhenVisibleRef?.current) return;

    const el = startWhenVisibleRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
              setValue(Math.round(target * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target, duration, startWhenVisibleRef]);

  return value;
}

export default function StatsShowcase() {
  // THEME COLORS
  const PRIMARY = "#502f8d";     // violet
  const PRIMARY_SOFT = "rgba(124,77,255,0.35)";
  const PRIMARY_DIM  = "rgba(124,77,255,0.25)";
  const BG_DARK = "#0B0713";
  const STRIP_TEXT = "#0B0713";   // strip par dark text (great contrast on violet)

  const features = ["Creative People", "Good Reviews", "Awesome Design", "Fast Delivery"];

  const stats = [
    { id: "projects", label: "PROJECTS", value: 150, filled: false },
    { id: "clients", label: "CLIENTS", value: 130, filled: true },
    { id: "experts", label: "YEARS OF EXPERIENCE", value: 10, filled: false },
  ];

  const refs = useRef(stats.map(() => React.createRef()));
  const counts = stats.map((s, i) => useCountUp(s.value, 1600, refs.current[i]));

  return (
    <section className="text-white" style={{ backgroundColor: BG_DARK }}>
      {/* ======= TOP FEATURE STRIP (violet theme) ======= */}
      <div
        className="py-5"
        style={{
          background: PRIMARY,
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-x-20 gap-y-3 px-6">
          {features.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-lg" style={{ color: STRIP_TEXT }}>✺</span>
              <span
                className="font-semibold text-[18px]"
                style={{ color: STRIP_TEXT }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      
     {/* ======= COUNTERS SECTION ======= */}
<div
  className="relative w-full px-4 sm:px-6 py-16 sm:py-20 md:py-24"
  style={{
    backgroundColor: "#0B0713",
    backgroundImage: "radial-gradient(rgba(124,77,255,0.25) 1px, transparent 1px)",
    backgroundSize: "28px 28px",
    backgroundPosition: "center",
  }}
>
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 sm:grid-cols-3 items-end gap-10 text-center">
      {stats.map((s, i) => (
        <div
          ref={refs.current[i]}
          key={s.id}
          className="flex flex-col items-center justify-center gap-2"
        >
          <div className="mb-2">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="#7C4DFF"
              strokeWidth="2"
            >
              <path
                d="M20 6L9 17l-5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            className={`leading-none ${
              s.filled ? "" : "text-transparent"
            }`}
            style={{
              color: s.filled ? "#7C4DFF" : "transparent",
              fontWeight: 800,
              fontSize: "clamp(64px, 10vw, 128px)",
              WebkitTextStroke: s.filled ? "0px" : "3px rgba(124,77,255,0.35)",
            }}
          >
            {counts[i]}+
          </div>

          <div className="mt-1 text-sm tracking-widest text-white/75">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
    </section>
  );
}
