"use client";

import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { useRef, useState } from "react";

const Navigationbar = () => {
  const sideMenuRef = useRef<HTMLUListElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleOpenSideMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.transform = "translateX(-16rem)";
      document.body.style.overflow = "hidden";
    }
  };

  const toggleCloseSideMenu = () => {
    if (sideMenuRef.current) {
      sideMenuRef.current.style.transform = "translateX(16rem)";
      document.body.style.overflow = "auto";
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <div className="fixed top-0 right-0 w-11/12 -z-10 overflow-hidden">
        <Image
          src={assets.header_bg_color}
          alt="Header Background"
          className="w-full -translate-y-1/2"
          width={1920}
          height={400}
        />
      </div>
      <nav className="w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50">
        <a href="#top">
          <Image
            src={assets.logo}
            alt="Logo"
            className="w-28 cursor-pointer"
            width={112}
            height={40}
          />
        </a>

        <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 text-sm bg-white shadow-sm bg-opacity-50">
          <li>
            <a href="#top" className="hover:text-gray-600">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-gray-600">
              About Me
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-gray-600">
              Projects
            </a>
          </li>
          <li>
            <a href="#skills" className="hover:text-gray-600">
              Skills
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-gray-600">
              Contact Me
            </a>
          </li>
          
          <li className="h-6 w-px bg-gray-300"></li>
          
          <li>
            <a 
              href="https://github.com/veslino-marc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300 block"
            >
              <Image
                src={isDarkMode ? assets.github_invertocat_white : assets.github_invertocat_black}
                alt="GitHub"
                className="w-5"
                width={20}
                height={20}
              />
            </a>
          </li>
          
          <li>
            <a 
              href="https://www.linkedin.com/in/marcvesli%C3%B1o/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300 block"
            >
              <Image
                src={isDarkMode ? assets.linkedin_logo_white : assets.linkedin_logo_black}
                alt="LinkedIn"
                className="w-5"
                width={20}
                height={20}
              />
            </a>
          </li>
          
          <li>
            <button 
              onClick={toggleDarkMode}
              className="cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300"
            >
              <Image
                src={isDarkMode ? assets.sun_icon : assets.moon_icon}
                alt={isDarkMode ? "Light mode" : "Dark mode"}
                className="w-5"
                width={20}
                height={20}
              />
            </button>
          </li>
        </ul>
        
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 px-6 py-2.5 border border-gray-500 rounded-full text-sm hover:bg-gray-100"
          >
            Contact
            <Image
              src={assets.arrow_icon}
              alt="Arrow icon"
              className="w-3"
              width={12}
              height={12}
            />
          </a>
          
          <button className="block md:hidden ml-3 cursor-pointer" onClick={toggleOpenSideMenu}>
            <Image
              src={assets.menu_black}
              alt="Menu Black"
              className="w-6"
              width={24}
              height={24}
            />
          </button>
        </div>

        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500"
        >
          <div className="absolute right-6 top-6" onClick={toggleCloseSideMenu}>
            <Image
              src={assets.close_black}
              alt="Close Black"
              className="w-5 cursor-pointer"
              width={20}
              height={20}
            />
          </div>
          <li>
            <a href="#top" onClick={toggleCloseSideMenu} className="hover:text-gray-600">
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={toggleCloseSideMenu} className="hover:text-gray-600">
              About Me
            </a>
          </li>
          <li>
            <a href="#projects" onClick={toggleCloseSideMenu} className="hover:text-gray-600">
              Projects
            </a>
          </li>
          <li>
            <a href="#skills" onClick={toggleCloseSideMenu} className="hover:text-gray-600">
              Skills
            </a>
          </li>
          <li>
            <a href="#contact" onClick={toggleCloseSideMenu} className="hover:text-gray-600">
              Contact Me
            </a>
          </li>
          
          <li className="h-px w-full bg-gray-300 my-2"></li>
          
          <li className="flex items-center gap-4">
            <a 
              href="https://github.com/veslino-marc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300"
            >
              <Image
                src={isDarkMode ? assets.github_invertocat_white : assets.github_invertocat_black}
                alt="GitHub"
                className="w-6"
                width={24}
                height={24}
              />
            </a>
            
            <a 
              href="https://www.linkedin.com/in/marcvesli%C3%B1o/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform duration-300"
            >
              <Image
                src={isDarkMode ? assets.linkedin_logo_white : assets.linkedin_logo_black}
                alt="LinkedIn"
                className="w-6"
                width={24}
                height={24}
              />
            </a>
            
            <button 
              onClick={toggleDarkMode}
              className="cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300"
            >
              <Image
                src={isDarkMode ? assets.sun_icon : assets.moon_icon}
                alt={isDarkMode ? "Light mode" : "Dark mode"}
                className="w-6"
                width={24}
                height={24}
              />
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigationbar;
