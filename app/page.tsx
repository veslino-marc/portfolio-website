"use client";

import { useEffect } from "react";
import Header from "./components/Header";
import Navigationbar from "./components/Navigationbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";

export default function Home() {
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);
    
    // Disable browser's scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      <Loading />
      <Navigationbar />
      <Header/>
      <About />
      <Projects />
      <Skills />
      <Contact />
      <ScrollToTop />
    </>
  );
}
