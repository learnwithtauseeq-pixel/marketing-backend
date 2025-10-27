import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "./Images/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/aboutUs", label: "About Us" },
  { to: "/product", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact Us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // WhatsApp redirect function
  const redirectToWhatsApp = () => {
    const phoneNumber = "923144264269"; // Your WhatsApp number without +
    const message = "Hello! I would like to ask a question to the team.";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  // lock scroll when mobile menu open
  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  // bg on scroll (all breakpoints)
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-[1000] isolate transition-colors duration-300",
        open || scrolled
          ? "bg-[#502f8d] backdrop-blur border-b border-white/10"
          : "bg-transparent",
      ].join(" ")}
    >
      {/* header height strips (mobile 60 / desktop 70) */}
      <div className="pointer-events-none absolute inset-0 h-[60px] md:h-[70px] bg-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-[60px] md:top-[70px] mx-auto h-px w-full max-w-7xl" />

      <div className="relative mx-auto flex h-[60px] md:h-[70px] max-w-7xl items-center justify-between px-4">
        {/* logo */}
        <Link to="/" className="flex items-center gap-3 relative">
          <span className={["inline-flex items-center justify-center rounded-md transition-all"].join(" ")}>
            <img
              src={logo}
              alt="Brand logo"
              className="h-8 md:h-[57px] w-auto select-none block"
              draggable="false"
            />
          </span>
          <h1 className="font-heading text-[20px] font-bold text-white">78 MARKETING AGENCY</h1>
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-[16px]">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "transition-colors duration-200",
                  "text-slate-200 hover:text-white",
                  isActive && "text-white font-semibold",
                ]
                  .filter(Boolean)
                  .join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA - Now with WhatsApp redirect */}
        <button
          onClick={redirectToWhatsApp}
          className="hidden sm:inline-flex items-center rounded-full bg-gradient-to-r from-[rgb(125,84,214)] to-[rgb(70,39,126)] px-5 py-2 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,0.35)] hover:brightness-110 transition duration-200 cursor-pointer"
        >
          ASK TEAM?
        </button>

        {/* mobile burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden relative z-[1100] pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-200 hover:bg-white/5 transition duration-200"
          aria-label="Toggle menu"
        >
          <Burger open={open} />
        </button>
      </div>

      {/* Mobile overlay - COMPLETELY FIXED VERSION */}
      {open && (
        <div role="dialog" aria-modal="true" className="md:hidden fixed inset-0 z-[1200] bg-[#0f0a1a]">
          {/* overlay top bar: logo + close */}
          <div className="sticky top-0 z-[1210] h-[64px] px-4 flex items-center justify-between border-b border-white/10 bg-[#0f0a1a]">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
              <img src={logo} alt="Brand logo" className="h-7 w-auto" draggable="false" />
              <span className="sr-only">Home</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-200 hover:bg-white/5 transition duration-200"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* menu content - FIXED SCROLLING */}
          <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#0f0a1a]">
            <nav className="mx-auto max-w-7xl px-4 py-6 flex flex-col gap-1">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      "rounded-md px-3 py-3 text-[15px] transition duration-200",
                      "text-slate-200 hover:bg-white/5 hover:text-white",
                      isActive && "text-white font-semibold bg-white/10",
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Mobile ASK TEAM button with WhatsApp redirect */}
              <button
                onClick={() => {
                  redirectToWhatsApp();
                  setOpen(false);
                }}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[rgb(125,84,214)] to-[rgb(70,39,126)] px-4 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(139,92,246,0.35)] hover:brightness-110 transition duration-200 cursor-pointer"
              >
                ASK TEAM?
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

/* icons */
function Burger({ open }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
      <path
        d={open ? "M6 6l12 12M18 6L6 18" : "M3 6h18M3 12h18M3 18h18"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}