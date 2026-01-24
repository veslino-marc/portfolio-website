"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface Project {
  id: string;
  title: string;
  description: string;
  type: string;
  thumbnail: string;
  images: string[];
  about: string;
  features: string[];
  technologies: string[];
  github?: string;
  liveDemo?: string;
}

const projectsData: Project[] = [
  {
    id: "mindstack",
    title: "MindStack",
    description: "AI-powered learning platform with community features",
    type: "Web App",
    thumbnail: "/assets/projects/mindstack-landing.png",
    images: [
      "/assets/projects/mindstack-landing.png",
      "/assets/projects/mindstack-dashboard.png",
      "/assets/projects/mindstack-features.png",
      "/assets/projects/mindstack-view-quiz-sample.png",
    ],
    about: "MindStack is a web-based learning platform designed to make studying more effective and engaging. It allows students to create custom flashcards and quizzes, track their progress, and collaborate with classmates through community learning features.",
    features: [
      "Create custom flashcards & quizzes from notes",
      "Track quiz scores and improvement over time",
      "Share study sets and collaborate with community",
      "Public & private study sets with full control",
      "Question suggestions from community",
      "Real-time notifications for study activity",
    ],
    technologies: ["Angular", "TypeScript", "Spring Boot", "Java", "MySQL", "VPS Hostinger"],
  },
  {
    id: "spendsense",
    title: "SpendSense",
    description: "Smart budgeting app using the 50/30/20 rule",
    type: "Mobile App",
    thumbnail: "/assets/projects/spendsense-landing-mobile-app.jpg",
    images: [
      "/assets/projects/spendsense-splash-mobile-app.jpg",
      "/assets/projects/spendsense-landing-mobile-app.jpg",
      "/assets/projects/spendsense-dashboard-mobile-app.jpg",
      "/assets/projects/spendsense-setup1-budget-mobile-app.jpg",
    ],
    about: "SpendSense is a personal finance management app that helps you track expenses, manage budgets using the 50/30/20 rule, and monitor your spending habits. Stay on top of your finances with intuitive analytics and category-based tracking.",
    features: [
      "Budget tracking with 50/30/20 rule",
      "Expense and income categorization",
      "Visual spending analytics",
      "Transaction history with search",
      "Category breakdown with percentages",
      "Profile management and PIN security",
    ],
    technologies: ["Android", "Kotlin", "SharedPreferences", "JUnit"],
  },
  {
    id: "blinders-vault",
    title: "Blinders Vault",
    description: "Secure banking system with OTP verification",
    type: "Web App",
    thumbnail: "/assets/projects/blinders-vault-landing.png",
    images: [
      "/assets/projects/blinders-vault-landing.png",
      "/assets/projects/blinders-vault-register.png",
      "/assets/projects/blinders-vault-bank-teller-dashboard.png",
      "/assets/projects/blinders-vault-account-holder-dashboard.png",
    ],
    about: "A secure and user-friendly web application designed to serve both bank tellers and account holders. The platform allows users to easily perform banking transactions like deposits, withdrawals, and transfers while maintaining strong security measures.",
    features: [
      "Dual interface for tellers and account holders",
      "Secure deposits and withdrawals",
      "Internal and external fund transfers",
      "Transaction history tracking",
      "OTP verification for security",
      "Real-time balance updates",
    ],
    technologies: ["HTML5", "CSS", "JavaScript", "PHP", "MySQL"],
  },
  {
    id: "eventure",
    title: "Eventure",
    description: "Complete event management with real-time tracking",
    type: "Web App",
    thumbnail: "/assets/projects/eventure-landing.png",
    images: [
      "/assets/projects/eventure-landing.png",
      "/assets/projects/eventure-login.png",
      "/assets/projects/eventure-organizer-dashboard.png",
      "/assets/projects/eventure-attendee-dashboard.png",
    ],
    about: "Eventure is a modern event management system designed to streamline all aspects of the event lifecycle—from registration and planning to monitoring and notifications. With its dynamic interface and robust database architecture, Eventure ensures effectiveness and secure preservation of participant data.",
    features: [
      "Role-based access (Attendee & Organizer)",
      "Create and manage multiple events",
      "Session management with materials",
      "Real-time attendance tracking",
      "Event notifications and reminders",
      "Post-event feedback system",
    ],
    technologies: ["Java", "SQL Server"],
  },
  {
    id: "youthconnect",
    title: "YouthConnect",
    description: "SK governance platform for youth engagement",
    type: "Web App",
    thumbnail: "/assets/projects/youthconnect-landing.png",
    images: [
      "/assets/projects/youthconnect-landing.png",
      "/assets/projects/youthconnect-login.png",
      "/assets/projects/youthconnect-register.png",
    ],
    about: "YouthConnect is a web-based platform for SK (Sangguniang Kabataan) governance, connecting SK officials with youth members. The system supports user registration, announcements, event management, concern submissions, and project transparency with real-time updates.",
    features: [
      "Role-based access for SK officials and youth",
      "Announcements and event management",
      "Submit and track community concerns",
      "SK project transparency module",
      "Dashboard analytics for administrators",
      "Real-time updates and notifications",
    ],
    technologies: ["Angular", "TypeScript", "Spring Boot", "Java", "MySQL", "GitHub Actions", "VPS Hostinger"],
  },
  {
    id: "smilesync",
    title: "SmileSync",
    description: "Dental appointment management system",
    type: "Desktop App",
    thumbnail: "/assets/projects/smilesync-main-menu-1-landing.png",
    images: [
      "/assets/projects/smilesync-main-menu-1-landing.png",
      "/assets/projects/smilesync-patient-login.png",
      "/assets/projects/smilesync-patient-menu.png",
      "/assets/projects/smilesync-dentist-login.png",
      "/assets/projects/smilesync-dentist-menu.png",
    ],
    about: "SmileSync is a comprehensive dental appointment management system with separate portals for patients and dentists. Patients can manage their information, schedule appointments, and select procedures, while dentists can view patient details, schedules, and chosen procedures.",
    features: [
      "Dual portal for patients and dentists",
      "Patient information management",
      "Appointment scheduling with timetable view",
      "Dental procedure selection and tracking",
      "Dentist dashboard for patient overview",
      "Schedule and procedure management",
    ],
    technologies: ["C++"],
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = (project: Project) => {
    // Save current scroll position
    setScrollPosition(window.scrollY);
    
    setSelectedProject(project);
    setCurrentImageIndex(0);
    
    // Lock body scroll and prevent layout shift
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "0px"; // Prevent scrollbar shift
    
    // Hide navigation and scroll-to-top button
    const nav = document.querySelector('nav');
    const scrollBtn = document.querySelector('[aria-label="Scroll to top"]');
    if (nav) (nav as HTMLElement).style.display = 'none';
    if (scrollBtn) (scrollBtn as HTMLElement).style.display = 'none';
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    
    // Restore body scroll
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0px";
    
    // Show navigation and scroll-to-top button
    const nav = document.querySelector('nav');
    const scrollBtn = document.querySelector('[aria-label="Scroll to top"]');
    if (nav) (nav as HTMLElement).style.display = 'flex';
    if (scrollBtn) (scrollBtn as HTMLElement).style.display = 'block';
    
    // Restore scroll position
    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="projects" 
      className={`w-full px-5 lg:px-8 xl:px-[8%] pt-20 pb-20 bg-gray-50 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-4 text-black">Selected Projects</h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          A collection of projects showcasing my skills in full-stack development, from web applications to mobile apps
        </p>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                    {project.type}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal - Rendered via Portal */}
        {mounted && selectedProject && createPortal(
          <div
            className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
            style={{ 
              backgroundColor: 'rgba(200, 200, 200, 0.5)',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left: Image Carousel */}
              <div className="md:w-3/5 bg-gradient-to-br from-gray-800 to-gray-900 relative flex items-center justify-center">
                <div className="relative w-full h-64 md:h-full flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                      fill
                      className="object-contain transition-opacity duration-300"
                    />
                  </div>
                  
                  {/* Navigation Arrows */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 transition-all shadow-lg z-10 hover:scale-110"
                      >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-2 transition-all shadow-lg z-10 hover:scale-110"
                      >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                  
                  {/* Dots Indicator */}
                  {selectedProject.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`h-2 rounded-full transition-all ${
                            index === currentImageIndex ? "bg-white w-6" : "bg-white bg-opacity-50 w-2"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Project Details */}
              <div className="md:w-2/5 p-8 overflow-y-auto">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-bold text-black">{selectedProject.title}</h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-400 hover:text-gray-600 transition-colors hover:rotate-90 duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-4"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}

                <div className="mb-6">
                  <h4 className="text-sm font-bold text-black mb-2 uppercase tracking-wide">About</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">{selectedProject.about}</p>
                  
                  <h5 className="text-sm font-semibold text-black mb-2">Key Features:</h5>
                  <ul className="space-y-1">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index} className="text-gray-700 text-sm flex items-start gap-2">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-black mb-3 uppercase tracking-wide">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
};

export default Projects;
