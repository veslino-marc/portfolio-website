import { assets } from "@/public/assets/assets";
import Image from "next/image";

const Header = () => {
  return (
    <div className="w-full px-5 lg:px-8 xl:px-[8%] min-h-screen flex items-center justify-center pt-20">
      <div className="w-full max-w-4xl text-center">
        <Image
          src={assets.profile_image}
          className="rounded-full w-32 mx-auto mb-6"
          alt="Profile Image"
          width={128}
          height={128}
        />

        <h3
          className="flex items-center justify-center gap-2 text-xl md:text-2xl mb-6 font-medium"
          style={{ color: "#000000" }}
        >
          Hi! I'm Marc Vesliño
          <Image
            src={assets.hand_icon}
            alt="Hand Wave Icon"
            className="w-6"
            width={24}
            height={24}
          />
        </h3>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          style={{ color: "#000000" }}
        >
          Frontend Web Developer
          <br />
          Based in Taguig
        </h1>

        <p
          className="text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{ color: "#747474ff" }}
        >
          I turn coffee into code and designs into reality. Specializing in
          modern web development with a focus on clean code, smooth animations,
          and pixel-perfect interfaces.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <a
            href="#projects"
            className="px-10 py-3 border-2 border-black rounded-full bg-black text-white flex items-center gap-2 hover:bg-gray-900 transition-all duration-300 font-medium shadow-lg"
          >
            My Works
            <Image
              src={assets.right_arrow_white}
              className="w-4"
              alt="Right Arrow"
              width={16}
              height={16}
            />
          </a>
          <a
            href="/sample-resume.pdf"
            download
            className="px-10 py-3 border-2 rounded-full border-gray-800 bg-white text-black flex items-center gap-2 hover:bg-gray-50 transition-all duration-300 font-medium shadow-md"
          >
            My Resume
            <Image
              src={assets.download_icon}
              className="w-4"
              alt="Download Icon"
              width={16}
              height={16}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
