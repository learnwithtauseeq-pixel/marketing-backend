import React, { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const submit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!form.firstName.trim()) return alert("Please enter First Name.");
    if (!emailOk(form.email)) return alert("Please enter a valid Email.");
    if (!form.message.trim()) return alert("Please write a Message.");

    try {
      setSending(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json?.ok) {
        alert("Thanks! Your message has been sent.");
        setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      } else {
        alert(json?.message || "Failed to send. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="bg-[#0b0713] text-white py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-8 md:gap-10 lg:gap-12">
          {/* LEFT: Card + Form with Animated Border */}
          <div className="relative">
            <div className="relative rounded-[26px] bg-[#0e0a16] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.45)] p-5 sm:p-6 md:p-8 lg:p-10 backdrop-blur overflow-hidden">
              {/* Animated Border Overlay */}
              <div className="absolute inset-0 rounded-[26px] overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent"
                     style={{ width: "100%", animation: "slideTop 2s linear infinite" }} />
                <div className="absolute top-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-[#8b5cf6] to-transparent"
                     style={{ height: "100%", animation: "slideRight 2s linear infinite" }} />
                <div className="absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-transparent via-[#8b5cf6] to-transparent"
                     style={{ width: "100%", animation: "slideBottom 2s linear infinite" }} />
                <div className="absolute bottom-0 left-0 w-[2px] bg-gradient-to-t from-transparent via-[#8b5cf6] to-transparent"
                     style={{ height: "100%", animation: "slideLeft 2s linear infinite" }} />
              </div>

              {/* heading */}
              <h2 className="text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] font-extrabold leading-tight relative z-10">
                <span className="text-white">Let&apos;s start a conversation</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b493ff] to-[#7d54d6]">
                  Start your breakthrough now
                </span>
                <br />
                <span className="text-[#cdb6ff]">Chat With Me.</span>
              </h2>

              {/* form */}
              <form onSubmit={submit} className="mt-5 sm:mt-6 md:mt-7 space-y-3 sm:space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <Input
                    name="firstName"
                    placeholder="First Name *"
                    value={form.firstName}
                    onChange={update}
                    required
                  />
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={update}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={update}
                    required
                  />
                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={update}
                  />
                </div>

                <Textarea
                  name="message"
                  placeholder="Message *"
                  value={form.message}
                  onChange={update}
                  required
                />

                <div className="pt-1 sm:pt-2">
                  <button
                    type="submit"
                    disabled={sending}
                    className="
                      inline-flex items-center justify-center
                      rounded-full px-5 sm:px-6 md:px-7 py-2.5 sm:py-3
                      text-sm sm:text-base font-semibold
                      bg-gradient-to-r from-[rgb(125,84,214)] to-[rgb(70,39,126)]
                      shadow-[0_12px_32px_rgba(125,84,214,0.35)]
                      hover:brightness-110 transition duration-200
                      w-full md:w-auto disabled:opacity-60
                    "
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
              @keyframes slideTop { 0%{transform:translateX(-100%);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateX(100%);opacity:0} }
              @keyframes slideRight{ 0%{transform:translateY(-100%);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(100%);opacity:0} }
              @keyframes slideBottom{0%{transform:translateX(100%);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateX(-100%);opacity:0}}
              @keyframes slideLeft { 0%{transform:translateY(100%);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translateY(-100%);opacity:0} }
            `}</style>
          </div>

          {/* RIGHT: Contact info */}
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 md:pt-4 lg:pt-6">
            <InfoBlock
              label="Phone"
              value="+92 314 4264269"
              href="tel:+923144264269"
              icon={<PhoneIcon className="h-4 sm:h-5 w-4 sm:w-5 text-white" />}
            />
            <InfoBlock
              label="Email"
              value="78MARKETINGAGENCY@GMAIL.COM"
              href="mailto:78marketingagency@gmail.com"
              icon={<MailIcon className="h-4 sm:h-5 w-4 sm:w-5 text-white" />}
            />
            <InfoBlock
              label="Address"
              value="LAHORE, PAKISTAN"
              icon={<PinIcon className="h-4 sm:h-5 w-4 sm:w-5 text-white" />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small building blocks ---------- */

function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={[
        "w-full h-11 sm:h-12 rounded-full px-3 sm:px-4 text-sm sm:text-[14px] bg-transparent",
        "border border-violet-400/30 focus:border-violet-400/70 outline-none",
        "placeholder-white/40 text-white transition duration-200",
        className,
      ].join(" ")}
    />
  );
}

function Textarea({ className = "", ...props }) {
  return (
    <textarea
      {...props}
      rows={4}
      className={[
        "w-full rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-[14px] bg-transparent",
        "border border-violet-400/30 focus:border-violet-400/70 outline-none",
        "placeholder-white/40 text-white transition duration-200 resize-y",
        className,
      ].join(" ")}
    />
  );
}

function InfoBlock({ label, value, href, icon }) {
  const content = (
    <div className="flex items-center justify-between gap-4 sm:gap-6 border-b border-white/10 pb-4 sm:pb-6">
      <div>
        <p className="text-xs sm:text-[13px] text-white/60">{label}</p>
        <p className="mt-1 text-sm sm:text-[16px] md:text-[18px] font-semibold">{value}</p>
      </div>
      <span className="shrink-0 grid place-items-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#3b2470] ring-2 ring-violet-500/30">
        {icon}
      </span>
    </div>
  );
  if (href) return <a href={href} className="group block hover:opacity-95 transition">{content}</a>;
  return <div className="block">{content}</div>;
}

/* ---------- Inline icons ---------- */
function PhoneIcon({ className = "h-5 w-5" }) { return (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 5a3 3 0 0 1 3-3h2l2 5-2 2a16 16 0 0 0 8 8l2-2 5 2v2a3 3 0 0 1-3 3h-1C9.163 22 2 14.837 2 6V5z" />
  </svg>
);}
function MailIcon({ className = "h-5 w-5" }) { return (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
    <path d="M22 8 12 13 2 8" />
  </svg>
);}
function PinIcon({ className = "h-5 w-5" }) { return (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s7-5.33 7-12A7 7 0 0 0 5 10c0 6.67 7 12 7 12z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);}
