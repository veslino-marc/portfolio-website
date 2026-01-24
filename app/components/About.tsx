"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="about" 
      className={`w-full px-5 lg:px-8 xl:px-[8%] pt-20 pb-20 bg-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-4 text-black">
            About Me
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Get to know more about my background, skills, 
          and journey as a developer
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Left: About Text */}
          <div>
            <div className="mb-8">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                I'm a 3rd year Information Technology student at Polytechnic 
                University of the Philippines - Taguig Campus, and a passionate
                frontend developer. With experience in Angular, Spring Boot, 
                React, Next.js, and modern web technologies, I build 
                responsive, user-friendly applications that make an impact.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                I combine academic knowledge with hands-on experience, working 
                on real-world projects and constantly learning new 
                technologies. My focus is on writing clean code and creating 
                seamless user experiences.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                When I'm not coding, you'll find me exploring web development 
                trends, contributing to open-source, or collaborating with 
                fellow developers. I believe in continuous learning and sharing
                 knowledge with the community.
              </p>
            </div>
          </div>

          {/* Right: Journey Timeline */}
          <div>
            <div className="border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <h3 className="text-2xl font-bold mb-6 text-black flex items-center gap-2">
                My Journey
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-black rounded-full transition-all duration-300"></div>
                    <div className="w-px flex-1 bg-gray-300"></div>
                  </div>
                  <div className="pb-6 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-black">
                        Current Focus
                      </h4>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        2026
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      3rd year IT student, polishing development skills and 
                      building projects with modern tech stacks
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-gray-400 group-hover:bg-black rounded-full transition-all duration-300"></div>
                    <div className="w-px flex-1 bg-gray-300"></div>
                  </div>
                  <div className="pb-6 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-black">
                        MindStack Platform
                      </h4>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        2026
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Built a web-based learning platform using TypeScript and 
                      Springboot. And now learning Next.js, React, and Tailwind
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-gray-400 group-hover:bg-black rounded-full transition-all duration-300"></div>
                    <div className="w-px flex-1 bg-gray-300"></div>
                  </div>
                  <div className="pb-6 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-black">
                        Banking Application
                      </h4>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        2025
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Developed a secure web-based banking app project with 
                      deposits, withdrawals, fund transfers, and OTP 
                      verification
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-gray-400 group-hover:bg-black rounded-full transition-all duration-300"></div>
                    <div className="w-px flex-1 bg-gray-300"></div>
                  </div>
                  <div className="pb-6 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-black">
                        Expanded Skills
                      </h4>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        2024
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Learned C++ and Python, expanding programming knowledge
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-gray-400 group-hover:bg-black rounded-full transition-all duration-300"></div>
                    <div className="w-px flex-1 bg-gray-300"></div>
                  </div>
                  <div className="pb-6 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-black">
                        Java Programming
                      </h4>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        2022
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Started learning Java programming
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-gray-400 group-hover:bg-black rounded-full transition-all duration-300"></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-black">
                        Hello World!👋
                      </h4>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        2021
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Wrote my first line of code with HTML, CSS, and 
                      JavaScript
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
