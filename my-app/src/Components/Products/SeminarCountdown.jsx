import React, { useState, useEffect } from "react";

export default function PromoCountdown() {
  // 🕒 Target date (update this)
  const targetDate = new Date("2025-11-01T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // ⏳ Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="bg-[#0b0713] text-white py-16 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        {/* 🟡 Heading */}
        <h2 className="text-[#F5B400] text-2xl sm:text-3xl font-extrabold uppercase mb-4 leading-tight">
          Hurry Up! Buy Your TikTok Ads Account Today
        </h2>

        {/* 💬 Subheading */}
        <p className="text-gray-300 text-lg mb-2">
          Empower Your Business, Build Your Brand 🇵🇰
        </p>

        {/* 📢 Description */}
        <p className="text-gray-400 mb-8 text-base sm:text-lg">
          Unlock your marketing potential with our verified TikTok Ads accounts.
          Boost your sales, grow your audience, and scale faster!
        </p>

        {/* ⏰ Offer Label */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-[#FF4B4B] text-lg font-bold">
            ⏰ Limited Time Offer Ends In:
          </span>
        </div>

        {/* 🕒 Timer Boxes */}
        <div className="flex justify-center gap-4 flex-wrap">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F5B400]/10 border border-[#F5B400] rounded-md px-6 py-4 text-center min-w-[90px]"
            >
              <div className="text-[#F5B400] text-3xl font-extrabold">
                {item.value}
              </div>
              <div className="text-sm text-gray-300 font-medium uppercase mt-1">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
