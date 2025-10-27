import React, { useState } from "react";

/* ================================
   Theme Colors
================================= */
const COLORS = {
  bg: "#0b0713",
  panel: "#141217",
  accent: "#F5B400",
  accentSoft: "#F5B40026",
  text: "#ffffff",
  textDim: "rgba(255,255,255,.75)",
};

export default function MarketingCheckout() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [proofFile, setProofFile] = useState(null);

  // form state
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);

  // ---- simple validators ----
  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const isStep1Valid = () =>
    form.name.trim().length > 1 && emailOk(form.email); // phone optional
  const isStep2Valid = () => !!paymentMethod;
  const isStep3Valid = () => true; // info only
  const isStep4Valid = () => true; // proof optional

  // Next/Prev with guards
  const handleNext = () => {
    if (step === 1 && !isStep1Valid()) {
      alert("Please fill Name and a valid Email to continue.");
      return;
    }
    if (step === 2 && !isStep2Valid()) {
      alert("Please select a payment method.");
      return;
    }
    if (step < 4) setStep(step + 1);
  };
  const handlePrev = () => { if (step > 1) setStep(step - 1); };

  // submit to backend (/api/send)
  async function handleSubmitBackend() {
    if (!isStep1Valid()) return alert("Name & valid Email required.");
    if (!isStep2Valid()) return alert("Select a payment method.");

    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("email", form.email.trim());
      fd.append("phone", form.phone.trim() || "");
      fd.append("paymentMethod", paymentMethod || "");
      if (proofFile) fd.append("proof", proofFile); // field name MUST be 'proof'

      const res = await fetch(
  "https://marketing-backend-jzp7yk4sv-tauseeqs-projects.vercel.app/api/send",
  {
    method: "POST",
    body: fd,
  }
);


      if (!res.ok) {
        // HTTP error from server
        alert("Failed to send. Server error.");
        return;
      }

      let json = {};
      try {
        json = await res.json();
      } catch {
        alert("Failed to parse server response.");
        return;
      }

      // backend returns { success: true } on success
      if (json?.success) {
        alert("✅ Sent! We’ll contact you shortly.");
        setForm({ name: "", email: "", phone: "" });
        setPaymentMethod(null);
        setProofFile(null);
        setStep(1);
      } else {
        alert("⚠️ Failed to send. Try again.");
      }
    } catch (e) {
      console.error(e);
      alert("Network error");
    } finally {
      setSubmitting(false);
    }
  }

  // button disabled state per step (UX)
  const nextDisabled =
    (step === 1 && !isStep1Valid()) ||
    (step === 2 && !isStep2Valid());

  return (
    <section className="w-full" style={{ backgroundColor: COLORS.bg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* ================= LEFT: TEXT ================= */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <LogoMark className="h-10 w-10" />
              <span className="text-2xl font-extrabold tracking-wide" style={{ color: COLORS.accent }}>
                78 MARKETING AGENCY
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl lg:text-start text-center items-center font-black leading-[1.15] text-4xl font-extrabold uppercase bg-gradient-to-r from-orange-600 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              BUY VERIFIED TIKTOK ADS ACCOUNTS +
              <br />
              GROW YOUR BRAND FAST!
            </h1>

            <div className="mt-6 text-center items-center lg:text-start">
              <p className="text-white text-2xl font-semibold">
                PKR 2500 <span className="font-medium text-white/90"></span>{" "}
                <span className="text-white/70">| $9 | INR 750</span>
              </p>
              <p className="text-white/70 text-lg mt-1">(Only One Time Payment)</p>
            </div>

            <div className="flex lg:justify-start justify-center">
              <ul className="mt-8 space-y-4">
                {[
                  "💰 $10 Minimum Self-Deposit",
                  "⚡ Self Top-Up Through Extension",
                  "🚫 No Monthly Fees",
                  "💸 Low Price",
                  "🌍 Worldwide Targeting",
                  "🎯 Best for Leads & Conversion",
                  "🛡️ No Bans or Restrictions",
                  "🧾 0% VAT on Ads",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-white text-lg text-start">
                    <CheckIcon className="mt-1 h-6 w-6 text-yellow-400" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-lg px-4 py-4 text-[15px] font-medium bg-[#fade0e]">
              <span className="text-black/80">
                <strong>Note:</strong> Our payment methods are 100% safe, and we take full responsibility for transactions.
              </span>
            </div>
          </div>

          {/* ================= RIGHT: FORM ================= */}
          <div
            className="rounded-2xl p-6 sm:p-8 shadow-[0_30px_120px_rgba(0,0,0,.45)]"
            style={{ backgroundColor: COLORS.panel, border: `2px solid ${COLORS.accent}` }}
          >
            {/* Stepper */}
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 justify-center lg:justify-start mb-8">
              {[1, 2, 3, 4].map((num) => (
                <React.Fragment key={num}>
                  <StepperDot
                    index={num}
                    active={num === step}
                    completed={num < step}
                    label={num === 1 ? "Your Info" : num === 2 ? "Payment Method" : num === 3 ? "Payment Details" : "Upload Proof"}
                  />
                  {num < 4 && <Dash />}
                </React.Fragment>
              ))}
            </div>

            <h3 className="text-3xl sm:text-4xl font-black text-center lg:text-left" style={{ color: COLORS.accent }}>
              {step === 1 ? "Checkout Form" : step === 2 ? "Payment Method" : step === 3 ? "Payment Details" : "Upload Proof"}
            </h3>

            {/* Steps */}
            <div className="mt-6 text-white/90">
              {step === 1 && (
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <Input
                    label="Name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                  <Input
                    label="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="03XX-XXXXXXX"
                  />
                </form>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <label className="block text-white/80 font-medium">Choose your payment method</label>
                  <div className="space-y-3">
                    {["Bank Transfer", "JazzCash", "Easypaisa"].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`w-full flex items-center justify-between gap-3 p-3 rounded-md border transition ${
                          paymentMethod === method
                            ? "border-[color:var(--accent)] bg-black/40"
                            : "border-white/10 bg-black/30 hover:border-[color:var(--accent)]"
                        }`}
                        style={{ ["--accent"]: COLORS.accent }}
                      >
                        <span>{method}</span>
                        <span
                          className={`h-4 w-4 rounded-full border-2 ${
                            paymentMethod === method
                              ? "border-[color:var(--accent)] bg-[color:var(--accent)]"
                              : "border-white/30"
                          }`}
                          style={{ ["--accent"]: COLORS.accent }}
                        />
                      </button>
                    ))}
                  </div>
                  {paymentMethod === null && (
                    <p className="text-sm text-red-400">Please select a payment method to continue.</p>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  {paymentMethod === "Bank Transfer" && (
                    <div className="space-y-3 text-white/90">
                      <h4 className="text-2xl font-extrabold text-[#F5B400] mb-2">Bank Transfer:</h4>
                      <p><span className="font-semibold text-[#F5B400]">Account Title:</span> Tauseeq Khalid</p>
                      <p><span className="font-semibold text-[#F5B400]">Bank Name:</span> Meezan Bank</p>
                      <p className="break-all"><span className="font-semibold text-[#F5B400]">IBAN Number:</span> PK76MEZN0000300109640266</p>
                      <p><span className="font-semibold text-[#F5B400]">Account Number:</span> 00300109640266</p>
                      <p className="text-[#F5B400] font-medium mt-2">Note: Please attach payment proof in next step.</p>
                    </div>
                  )}

                  {paymentMethod === "JazzCash" && (
                    <div className="space-y-3 text-white/90">
                      <h4 className="text-2xl font-extrabold text-[#F5B400] mb-2">JazzCash:</h4>
                      <p><span className="font-semibold text-[#F5B400]">Account Title:</span> Tauseeq Khalid</p>
                      <p><span className="font-semibold text-[#F5B400]">Account Number:</span> 03296249267</p>
                      <p className="text-[#F5B400] font-medium mt-2">Note: Please attach payment proof in next step.</p>
                    </div>
                  )}

                  {paymentMethod === "Easypaisa" && (
                    <div className="space-y-3 text-white/90">
                      <h4 className="text-2xl font-extrabold text-[#F5B400] mb-2">Easypaisa:</h4>
                      <p><span className="font-semibold text-[#F5B400]">Account Title:</span> Tauseeq Khalid</p>
                      <p><span className="font-semibold text-[#F5B400]">Account Number:</span> 03144264269</p>
                      <p className="text-[#F5B400] font-medium mt-2">Note: Please attach payment proof in next step.</p>
                    </div>
                  )}

                  {!paymentMethod && <p className="text-white/80">Please go back and select a payment method first.</p>}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <label className="block text-white/80 font-medium">Upload your payment proof +923144264269</label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
                    className="w-full bg-black/40 text-white border border-white/10 rounded-md p-3"
                  />
                  {proofFile && (
                    <p className="text-sm text-white/70">
                      Selected: <span className="text-white">{proofFile.name}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Nav */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  onClick={handlePrev}
                  className="rounded-full px-6 py-2.5 text-black font-semibold"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  Previous
                </button>
              ) : (
                <span />
              )}

              {step < 4 ? (
                <button
                  onClick={handleNext}
                  disabled={nextDisabled}
                  className={`rounded-full px-6 py-2.5 font-semibold ${
                    nextDisabled ? "opacity-60 cursor-not-allowed" : "text-black"
                  }`}
                  style={{ backgroundColor: COLORS.accent }}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmitBackend}
                  disabled={submitting}
                  className="rounded-full px-6 py-2.5 text-black font-semibold disabled:opacity-60"
                  style={{ backgroundColor: COLORS.accent }}
                >
                  {submitting ? "Sending..." : "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================
   Helpers & Icons
================================= */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm text-white/70 mb-1">{label}</label>
      <input
        {...props}
        className="w-full rounded-md bg-black/40 text-white placeholder-white/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] px-4 py-3"
        style={{ ["--accent"]: COLORS.accent }}
      />
    </div>
  );
}

function StepperDot({ index, active, completed, label }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        className={`grid place-items-center rounded-full h-12 sm:h-14 w-12 sm:w-14 border-2 text-base sm:text-lg font-bold ${
          active ? "text-black" : completed ? "text-black bg-[color:var(--accent)]" : "text-white/80"
        }`}
        style={{
          borderColor: COLORS.accent,
          backgroundColor: active || completed ? COLORS.accent : "transparent",
          ["--accent"]: COLORS.accent,
        }}
      >
        {index}
      </div>
      <span className="text-[12px] text-white/70 leading-none max-w-[86px] hidden sm:block">{label}</span>
    </div>
  );
}

function Dash() {
  return <span className="w-6 sm:w-8 h-[2px] hidden sm:block" style={{ background: COLORS.accent }} />;
}

function CheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: COLORS.accent }}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="currentColor" style={{ color: COLORS.accent }}>
      <path d="M32 6l10 10-6 6 8 8-10 10-10-10 8-8-6-6 10-10z" />
    </svg>
  );
}
