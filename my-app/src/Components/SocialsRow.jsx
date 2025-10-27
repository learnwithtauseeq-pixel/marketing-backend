import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok } from "react-icons/fa";

function SocialsRow() {
  const socials = [
    { icon: <FaFacebookF />, link: "https://www.facebook.com/p/78-Marketing-Agency-61553123780506/" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/78marketingagency/" },
   // { icon: <FaLinkedinIn />, link: "#" },
   // { icon: <FaYoutube />, link: "#" },
    { icon: <FaTiktok />, link: "https://www.tiktok.com/@78.marketingagency" },
  ];

  return (
    <div className="mt-[10px] flex items-center pb-0 mb-0 gap-[18px]">
      {socials.map((s, i) => (
        <a
          key={i}
          href={s.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#845AE1] text-white text-[20px] hover:brightness-110 transition"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}

export default SocialsRow;
