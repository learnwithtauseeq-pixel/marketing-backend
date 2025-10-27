import { Link } from "react-router-dom";

export default function ProductHeader() {
  return (
    <header className="w-full bg-[#0b0a0f] text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">

        {/* Home Button */}
        <Link
          to="/"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2 rounded-full transition-all"
        >
          Home
        </Link>
      </div>
    </header>
  );
}
