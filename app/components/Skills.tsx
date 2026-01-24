"use client";

import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();

  const skillsData = {
    "Languages": [
      "JavaScript",
      "TypeScript",
      "Java",
      "Kotlin",
      "PHP",
      "C++",
      "Python",
      "HTML/CSS",
      "SCSS",
    ],
    "Frameworks, Libraries & Databases": [
      "React",
      "Next.js",
      "Angular",
      "Spring Boot",
      "Tailwind CSS",
      "Bootstrap",
      "Android",
      "MySQL",
      "SQL Server",
    ],
    "Tools & Platforms": [
      "Git",
      "GitHub",
      "GitHub Actions",
      "VS Code",
      "Figma",
      "Notion",
      "Hostinger",
    ],
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="skills" 
      className={`w-full px-5 lg:px-8 xl:px-[8%] pt-20 pb-20 bg-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-4 text-black">Skills & Technologies</h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          The technologies and tools I use to bring ideas to life
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div
              key={category}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <h3 className="text-lg font-bold text-black mb-4 pb-2 border-b border-gray-200">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm border border-gray-200 transition-all duration-200 hover:scale-105 hover:border-gray-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
