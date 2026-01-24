import Header from "./components/Header";
import Navigationbar from "./components/Navigationbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Loading from "./components/Loading";

export default function Home() {
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
