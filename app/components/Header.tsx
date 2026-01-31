"use client";

import { assets } from "@/public/assets/assets";
import Image from "next/image";
import ParticlesBackground from "./ParticlesBackground";
import { useEffect, useState } from "react";

const Header = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start animations after loading screen (1 second)
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full px-5 lg:px-8 xl:px-[8%] min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Particles Background - Only in Header */}
      <ParticlesBackground />

      <div className="w-full max-w-4xl text-center relative z-10">
        <Image
          src={assets.profile_image}
          className={`rounded-full w-32 mx-auto mb-6 ${showContent ? "animate-fadeInScale" : "opacity-0"}`}
          alt="Profile Image"
          width={128}
          height={128}
        />

        <h3
          className={`flex items-center justify-center gap-2 text-xl md:text-2xl mb-6 font-medium ${showContent ? "animate-fadeInUp animate-delay-100" : "opacity-0"}`}
          style={{ color: "#000000" }}
        >
          Hi! I'm Marc Vesliño
          <Image
            src={assets.hand_icon}
            alt="Hand Wave Icon"
            width={24}
            height={24}
            style={{ width: '1.5rem', height: 'auto' }}
          />
        </h3>

        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${showContent ? "animate-fadeInUp animate-delay-200" : "opacity-0"}`}
          style={{ color: "#000000" }}
        >
          Frontend Web Developer
          <br />
          Based in Taguig
        </h1>

        <p
          className={`text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed ${showContent ? "animate-fadeInUp animate-delay-300" : "opacity-0"}`}
          style={{ color: "#747474ff" }}
        >
          I turn coffee into code and designs into reality. Specializing in
          modern web development with a focus on clean code, smooth animations,
          and pixel-perfect interfaces.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 ${showContent ? "animate-fadeInUp animate-delay-400" : "opacity-0"}`}
        >
          <a
            href="#projects"
            className="px-10 py-3 border-2 border-black rounded-full bg-black text-white flex items-center gap-2 hover:bg-gray-900 transition-all duration-300 font-medium shadow-lg"
          >
            My Works
            <Image
              src={assets.right_arrow_white}
              alt="Right Arrow"
              width={16}
              height={16}
              style={{ width: '1rem', height: 'auto' }}
            />
          </a>
          <a
            href="/cv-veslino.pdf"
            download
            className="px-10 py-3 border-2 rounded-full border-gray-800 bg-white text-black flex items-center gap-2 hover:bg-gray-50 transition-all duration-300 font-medium shadow-md"
          >
            Download CV
            <Image
              src={assets.download_icon}
              alt="Download Icon"
              width={16}
              height={16}
              style={{ width: '1rem', height: 'auto' }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
