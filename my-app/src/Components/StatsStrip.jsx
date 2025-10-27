// src/components/StatsStrip.jsx
export default function StatsStrip() {
  const stats = [
    { value: "10+",  top: "Years of",  bottom: "Experience" },
    { value: "150+", top: "Project",   bottom: "Completed" },
    { value: "130+", top: "Satisfied", bottom: "Clients" },
  ];

  return (
    <section className="bg-[#0b0713] text-white">
      <div className="mx-auto max-w-[1220px] px-6 py-6 md:py-10">
        {/* ===== Desktop card (unchanged) ===== */}
        <div className="relative hidden md:block">
          <div className="pointer-events-none absolute -inset-6 rounded-[28px] bg-[#7c4dff25] blur-2xl" />
          <div className="relative rounded-[28px] bg-[#0f0a1a] border border-white/5 px-12 py-8">
            <div className="grid grid-cols-3 divide-x divide-white/5">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center justify-center">
                  <div className="flex items-end gap-4">
                    <span className="text-[56px] font-bold leading-none text-white">
                      {s.value}
                    </span>
                    <div className="leading-6">
                      <p className="text-[15px] text-white/75">{s.top}</p>
                      <p className="text-[15px] text-white/75">{s.bottom}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

       {/* ===== Mobile row (single-line labels) ===== */}
<div className="-mx-4  mt-[19px] md:mx-0">{/* sides ko tighter kiya */}
  <div className="md:hidden flex items-center justify-between gap-2 w-full px-0">
    {stats.map((s, i) => (
      <div key={i} className="flex flex-col items-center text-center flex-1 min-w-0">
        <span className="text-[28px] font-semibold leading-none text-white">
          {s.value}
        </span>
        {/* single-line label, no wrap */}
        <span className="mt-1 text-[12px] text-white/75 leading-none whitespace-nowrap truncate">
          {s.top} {s.bottom}
        </span>
      </div>
    ))}
  </div>
</div>


</div>
    </section>
  );
}
