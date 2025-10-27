import React from "react";

export default function AgencyAccountComparison() {
  return (
    <section className="w-full bg-neutral-950 text-neutral-100 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center tracking-[0.2em] text-violet-400 font-semibold text-xs md:text-sm">
          WHAT'S SO SPECIAL ABOUT 78 MARKETING AGENCY?
        </p>

        <h2 className="mt-2 text-center text-2xl md:text-4xl font-extrabold leading-tight">
          Why You Should Get Agency Account From Us?
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          <Card
            title="Ecomdy Media"
            items={[
              "$50-200 Minimum Deposit",
              "7% Top-up Fees",
              "$9 Monthly Fees",
              "Self Top-up by Portal (Minimum of $50)",
              "Product Approval Required",
            ]}
            bad
          />

          <Card
            title="78 Marketing"
            highlight
            good
            items={[
              "$10 Minimum Deposit",
              "0% Top-up Fees",
              "No Monthly Fee",
              "Self Top-up by Card & Paypal (Minimum $10)",
              "No Approval Required (Just Follow Our Policies)",
              "No Bans or Restrictions",
            ]}
          />

          <Card
            title="Mega Digital"
            items={[
              "$50 Minimum Deposit",
              "6% Top-up Fees",
              "No Monthly Fees",
              "No Self Top-up (Minimum of $50)",
              "Product Approval Required",
              "Top-up Time of 24–48 Hours",
            ]}
            bad
          />
        </div>
      </div>
    </section>
  );
}

function Card({ title, items, good, bad, highlight }) {
  return (
    <div
      className={`rounded-2xl p-6 md:p-8 border ${
        highlight
          ? "bg-neutral-900 border-violet-600/60 shadow-[0_10px_40px_-10px_rgba(167,139,250,0.4)]"
          : "bg-neutral-900/60 border-neutral-800"
      }`}
    >
      <h3 className="text-center text-xl md:text-2xl font-extrabold">{title}</h3>
      <ul className="mt-6 space-y-4 text-sm md:text-base">
        {items.map((text, idx) => (
          <Feature key={idx} type={good ? "good" : bad ? "bad" : "neutral"} text={text} />
        ))}
      </ul>
      {highlight && (
  <a
    href="https://wa.me/923144264269"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-8 w-full rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 transition-colors font-bold py-3 md:py-3.5 tracking-wide text-center block"
  >
    GET THIS NOW
  </a>
)}

    </div>
  );
}

function Feature({ type, text }) {
  const isGood = type === "good";
  const isBad = type === "bad";
  return (
    <li className="flex items-start gap-3">
      <span
        className={`mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border ${
          isGood
            ? "bg-emerald-500/15 border-emerald-500/40"
            : isBad
            ? "bg-rose-500/15 border-rose-500/40"
            : "border-neutral-600"
        }`}
      >
        {isGood ? <CheckIcon /> : isBad ? <CrossIcon /> : null}
      </span>
      <span className={isGood ? "text-neutral-200" : "text-neutral-300"}>{text}</span>
    </li>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-emerald-400">
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-7.25 7.25a1 1 0 01-1.414 0l-4-4A1 1 0 015.293 8.293L8.5 11.5l6.543-6.543a1 1 0 011.664.336z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-rose-400">
      <path
        fillRule="evenodd"
        d="M10 8.586L5.293 3.879A1 1 0 103.879 5.293L8.586 10l-4.707 4.707a1 1 0 101.414 1.414L10 11.414l4.707 4.707a1 1 0 001.414-1.414L11.414 10l4.707-4.707a1 1 0 10-1.414-1.414L10 8.586z"
        clipRule="evenodd"
      />
    </svg>
  );
}