import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#0f0716] text-center text-white/80 py-8 px-4 sm:px-6 border-t border-violet-500/10 flex items-center justify-center">
      <p className="text-base md:text-lg tracking-wide max-w-[90%] sm:max-w-none">
        © {new Date().getFullYear()} All Rights Reserved by{" "}
        <span className="font-semibold text-violet-400 hover:text-violet-300 transition">
          78 Marketing Agency
        </span>
        .
      </p>
    </footer>
  );
}

