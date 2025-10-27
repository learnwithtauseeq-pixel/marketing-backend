import { Link } from "react-router-dom";
import profilePic from "./Images/tauseeq.png";
import SocialsRow from "../Components/SocialsRow";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  
  return (
    <section className="relative bg-[#0b0713] text-white mb-0 pb-0">
      {/* soft glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(124,77,255,0.18),transparent_60%)]" />

      <div className="mx-auto max-w-[1220px] px-5 pt-5 md:pt-[110px] md:pb-10 pb-2">
        {/* mobile-first: stack with image first; desktop: two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:items-center md:gap-10">
          
          {/* IMAGE BLOCK — mobile first */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[20px] bg-[#7c4dff3a] blur-2xl" />
              <div className="relative rounded-[20px] border border-[#7c4dff66] bg-[#0d0a16] p-2 shadow-[0_0_40px_rgba(124,77,255,0.25)]">
                <img
                  src={profilePic}
                  alt="Portrait"
                  className="w-[260px] h-[340px] object-cover rounded-[16px] md:w-[360px] md:h-[470px]"
                />
              </div>
            </div>
          </div>

          {/* TEXT BLOCK */}
          <div className="order-2 md:order-1 mt-[20px] md:mt-8 md:mt-0 text-center md:text-left">
            {/* small heading */}
            <p className="text-[30px] font-semibold leading-[28px] text-white/90 md:text-[28px] md:leading-[36px]">
              Hello, We&apos;re
            </p>

            {/* big name */}
            <h1 className="mt-[0px] md:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[rgba(115,69,225,1)] to-[rgba(202,167,255,1)] font-extrabold text-[30px] leading-[46px] md:text-[60px] md:leading-[72px]">
              78 Marketing Family.
            </h1>

            {/* subtitle — type animation (mobile size smaller) */}
            <TypeAnimation
              sequence={[
                "Digital Marketers", 1800, "",
                "Shopify Experts", 1800, "",
                "Web Developers", 1800, "",
                "Graphic Designers", 1800, "",
                "Video Editors", 1800, "",
              ]}
              wrapper="p"
              cursor={true}
              repeat={Infinity}
              className=" mt-[0px] md:mt-3 text-[20px] md:text-[20px] font-medium text-white/90"
            />

         {/* CTA */}
<div className="mt-5 flex justify-center md:justify-start">
  <a
    href="https://wa.me/923144264269"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full bg-gradient-to-r from-[rgb(125,84,214)] to-[rgb(70,39,126)] md:px-5 md:py-3 px-[45px] py-[10px] text-[18px] md:text-[14px] font-semibold text-white shadow-[0_10px_28px_rgba(109,76,255,0.35)] hover:brightness-110 transition"
  >
    Let’s Turn Your Vision Into Results
  </a>
</div>

            {/* Socials */}
            <div className="mt-6 flex justify-center md:justify-start">
              <SocialsRow />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
