"use client";

import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { useRef } from "react";

const Navigationbar = () => {
  const sideMenuRef = useRef<HTMLUListElement>(null);

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

  return (
    <>
      <div className="fixed top-0 right-0 w-11/12 -z-10 overflow-hidden">
        <Image
          src={assets.header_bg_color}
          alt="Header Background"
          className="w-full -translate-y-1/2"
          width={1920}
          height={400}
          priority
        />
      </div>
      <nav className="w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="text-2xl font-bold text-black flex items-center">
            <span className="text-gray-400">&lt;</span>
            <span className="group-hover:text-blue-600 transition-colors">MV</span>
            <span className="text-gray-400">/&gt;</span>
          </div>
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
                src={assets.github_invertocat_black}
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
                src={assets.linkedin_logo_black}
                alt="LinkedIn"
                className="w-5"
                width={20}
                height={20}
              />
            </a>
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
              width={12}
              height={12}
              style={{ width: '0.75rem', height: 'auto' }}
            />
          </a>
          
          <button className="block md:hidden ml-3 cursor-pointer" onClick={toggleOpenSideMenu}>
            <Image
              src={assets.menu_black}
              alt="Menu Black"
              width={24}
              height={24}
              style={{ width: '1.5rem', height: 'auto' }}
            />
          </button>
        </div>

        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500"
        >
          <div className="absolute right-6 top-6 cursor-pointer" onClick={toggleCloseSideMenu}>
            <Image
              src={assets.close_black}
              alt="Close Black"
              width={20}
              height={20}
              style={{ width: '1.25rem', height: 'auto' }}
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
                src={assets.github_invertocat_black}
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
                src={assets.linkedin_logo_black}
                alt="LinkedIn"
                className="w-6"
                width={24}
                height={24}
              />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigationbar;
