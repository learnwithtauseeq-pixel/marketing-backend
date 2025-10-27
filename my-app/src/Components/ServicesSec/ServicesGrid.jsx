import { useState, useRef } from "react";

const SERVICES = [
  { title: "Digital Marketing", Icon: MegaphoneIcon },
  { title: "Graphic Designing", Icon: PaletteIcon },
  { title: "Web Development", Icon: MonitorIcon },
  { title: "Video Editing", Icon: ClapperboardIcon },
  { title: "Shopify Development", Icon: ShoppingBagIcon },
  { title: "SEO", Icon: SearchIcon },
  { title: "Influencer Marketing", Icon: UsersIcon },
  { title: "Social Media Management", Icon: ShareIcon },
];

export default function ServicesGrid() {
  return (
    <section className="relative w-full bg-[#0b0913] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <header className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-white">OUR </span>
            <span className="text-[rgb(125,84,214)]">SERVICES</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-300 max-w-3xl mx-auto">
            Our services go beyond the ordinary. From captivating web design to data-driven marketing strategies.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} title={s.title} Icon={s.Icon} />)
          )}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, Icon }) {
  const [hover, setHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
      className="group relative overflow-hidden rounded-2xl bg-[#0e0a18] border border-white/5 p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
    >
      {/* mouse-follow glow */}
      <span
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-150"
        style={{
          left: pos.x,
          top: pos.y,
          width: 260,
          height: 260,
          background:
            "radial-gradient(120px circle at center, rgba(125,84,214,0.35), rgba(125,84,214,0.15) 40%, transparent 60%)",
          filter: "blur(6px)",
          opacity: hover ? 1 : 0,
        }}
      />

      {/* Icon circle */}
      <div className="relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(125,84,214,0.6)]/90 text-[rgb(125,84,214)]">
        <Icon className="h-8 w-8" />
      </div>

      <h3 className="relative z-10 text-center text-white text-lg md:text-xl font-extrabold leading-tight">
        {title}
      </h3>
    </div>
  );
}

/* --- inline SVG icons --- */
function MegaphoneIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l4 4v-6l8-3V6l-8-3H7a2 2 0 0 0-2 2v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function PaletteIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path d="M12 22a9.5 9.5 0 1 0-9.5-9.5c0 4.142 3.358 3.5 5.5 3.5 2 0 2 2 2 3.5 0 1.5.5 2.5 2 2.5z" strokeWidth="2"/>
      <circle cx="7" cy="10" r="1"/><circle cx="12" cy="7" r="1"/><circle cx="17" cy="10" r="1"/><circle cx="15" cy="14" r="1"/>
    </svg>
  );
}
function MonitorIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <rect x="3" y="4" width="18" height="12" rx="2" ry="2" strokeWidth="2"/>
      <path d="M8 20h8M12 16v4" strokeWidth="2"/>
    </svg>
  );
}
function ClapperboardIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <rect x="3" y="8" width="18" height="13" rx="2" ry="2" strokeWidth="2"/>
      <path d="M3 8l4-5 6 5 4-5 4 5" strokeWidth="2"/>
    </svg>
  );
}
function ShoppingBagIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path d="M6 2l1 4h10l1-4M3 6h18l-1 16H4L3 6z" strokeWidth="2"/>
      <path d="M16 10a4 4 0 0 1-8 0" strokeWidth="2"/>
    </svg>
  );
}
function SearchIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <circle cx="11" cy="11" r="8" strokeWidth="2"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2"/>
    </svg>
  );
}
function UsersIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" strokeWidth="2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeWidth="2"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="2"/>
    </svg>
  );
}
function ShareIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49" strokeWidth="2"/>
    </svg>
  );
}