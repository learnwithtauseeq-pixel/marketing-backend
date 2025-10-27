import { useState } from "react";

const timeSlots = [
  "Morning (9–12)",
  "Afternoon (12–3)",
  "Evening (3–7)",
  "Weekends",
];

const channels = ["WhatsApp", "Email", "Phone Call", "Zoom/Meet"];

const services = [
  "Digital Marketing",
  "Graphic Designing",
  "Web Development",
  "Video Editing",
  "Shopify Development",
  "SEO",
  "Influencer Marketing",
  "Social Media Management",
];

const socialKinds = [
  "Facebook",
  "Instagram",
  "LinkedIn",
  "Twitter/X",
  "YouTube",
  "TikTok",
  "Other",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    time: "",
    channel: "",
    service: "",
    business: "",
    socialKind: "",
    socialUrl: "",
    website: "",
    brief: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Please enter at least your name and email.");
      return;
    }
    console.log("Contact form submitted", form);
    alert("Thanks! We'll get back to you soon.");
    setForm({
      name: "",
      email: "",
      phone: "",
      time: "",
      channel: "",
      service: "",
      business: "",
      socialKind: "",
      socialUrl: "",
      website: "",
      brief: "",
    });
  };

  return (
    <section className="relative w-full bg-[#0b0913] py-10 md:py-18 px-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[#0e0a18]/80 p-4 sm:p-6 md:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur overflow-hidden">
        
        {/* Always Running Border Animation */}
        <div className="absolute inset-0 rounded-3xl">
          {/* Top Border */}
          <div 
            className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent"
            style={{ 
              width: '100%',
              animation: 'slideTop 2s linear infinite',
              filter: 'drop-shadow(0 0 6px #8b5cf6)'
            }}
          />
          
          {/* Right Border */}
          <div 
            className="absolute top-0 right-0 w-0.5 bg-gradient-to-b from-transparent via-[#8b5cf6] to-transparent"
            style={{ 
              height: '100%',
              animation: 'slideRight 2s linear infinite',
              filter: 'drop-shadow(0 0 6px #8b5cf6)'
            }}
          />
          
          {/* Bottom Border */}
          <div 
            className="absolute bottom-0 right-0 h-0.5 bg-gradient-to-l from-transparent via-[#8b5cf6] to-transparent"
            style={{ 
              width: '100%',
              animation: 'slideBottom 2s linear infinite',
              filter: 'drop-shadow(0 0 6px #8b5cf6)'
            }}
          />
          
          {/* Left Border */}
          <div 
            className="absolute bottom-0 left-0 w-0.5 bg-gradient-to-t from-transparent via-[#8b5cf6] to-transparent"
            style={{ 
              height: '100%',
              animation: 'slideLeft 2s linear infinite',
              filter: 'drop-shadow(0 0 6px #8b5cf6)'
            }}
          />
        </div>

        {/* Static Border */}
        <div className="absolute inset-0 rounded-3xl border border-white/10" />

        <style jsx>{`
          @keyframes slideTop {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          @keyframes slideRight {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          @keyframes slideBottom {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          @keyframes slideLeft {
            0% { transform: translateY(100%); }
            100% { transform: translateY(-100%); }
          }
        `}</style>

        <header className="relative z-10 text-center mb-6 md:mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <span className="text-white">CONTACT </span>
            <span className="text-[rgb(125,84,214)]">US</span>
          </h2>
          <p className="mt-2 sm:mt-3 text-slate-300 text-sm sm:text-base">
            Let's build something extraordinary together — your vision, our expertise
          </p>
        </header>

        <form onSubmit={onSubmit} className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            <Input label="Name" name="name" value={form.name} onChange={onChange} placeholder="Name" />
            <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} placeholder="Email" />

            <Input label="Phone" name="phone" value={form.phone} onChange={onChange} placeholder="Phone" />
            <Select label="Best Time To Connect" name="time" value={form.time} onChange={onChange} options={timeSlots} />

            <Select label="Select Your Preferred Channel" name="channel" value={form.channel} onChange={onChange} options={channels} className="md:col-span-2" />

            <Select label="Select Your Service" name="service" value={form.service} onChange={onChange} options={services} className="md:col-span-2" />

            <Input label="Business Name" name="business" value={form.business} onChange={onChange} placeholder="Business Name" className="md:col-span-2" />

            <Select label="Select Your Social Link" name="socialKind" value={form.socialKind} onChange={onChange} options={socialKinds} />
            <Input label="Enter Your Social Link" name="socialUrl" value={form.socialUrl} onChange={onChange} placeholder="https://..." />

            <Input label="Enter Your Website Link" name="website" value={form.website} onChange={onChange} placeholder="https://..." className="md:col-span-2" />

            <Textarea label="Provide your brand brief – goals, challenges, or inspirations..." name="brief" value={form.brief} onChange={onChange} className="md:col-span-2" />
          </div>

          <div className="mt-4 sm:mt-5 md:mt-6">
            <button
              type="submit"
              className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-[#f6b10a] px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-[#0b0913] shadow-[0_10px_30px_rgba(246,177,10,0.35)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(125,84,214)] focus:ring-offset-[#0e0a18] md:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/25 transition group-hover:translate-x-0" />
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function FieldWrap({ label, children, className = "" }) {
  return (
    <label className={["block", className].join(" ")}> 
      <span className="mb-1 sm:mb-2 block text-xs sm:text-sm font-medium text-slate-300">{label}</span>
      {children}
    </label>
  );
}

function baseInputCls(extra = "") {
  return [
    "w-full rounded-xl bg-[#0a0a14] text-white placeholder:text-slate-400 text-sm sm:text-base",
    "border border-[rgba(246,177,10,0.8)]/70 focus:border-[rgba(246,177,10,1)]",
    "px-3 sm:px-4 py-2 sm:py-3 outline-none ring-0 transition",
    "focus-visible:shadow-[0_0_0_3px_rgba(125,84,214,0.35)]",
    extra,
  ].join(" ");
}

function Input({ label, className, ...props }) {
  return (
    <FieldWrap label={label} className={className}>
      <input {...props} className={baseInputCls()} />
    </FieldWrap>
  );
}

function Select({ label, options, className, ...props }) {
  return (
    <FieldWrap label={label} className={className}>
      <select {...props} className={baseInputCls()}>
        <option value="" disabled hidden>
          {label}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0a0a14] text-sm sm:text-base">
            {o}
          </option>
        ))}
      </select>
    </FieldWrap>
  );
}

function Textarea({ label, className, ...props }) {
  return (
    <FieldWrap label={label} className={className}>
      <textarea rows={4} {...props} className={baseInputCls()} />
    </FieldWrap>
  );
}