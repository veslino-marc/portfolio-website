"use client";

import { useState } from "react";
import { assets } from "@/public/assets/assets";
import Image from "next/image";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { ref, isVisible } = useScrollAnimation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="contact" 
      className={`w-full px-5 lg:px-8 xl:px-[8%] pt-20 pb-20 bg-gray-50 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-600 text-sm mb-2">Connect with me</p>
          <h2 className="text-4xl font-bold mb-4 text-black">Get in touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            I'd love to hear from you! If you have any questions, comments or feedback, please use the form below.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mb-16">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition-colors"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition-colors"
            />
          </div>
          
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            required
            rows={6}
            className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition-colors mb-6 resize-none"
          />

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Submit now"}
              <Image
                src={assets.right_arrow_white}
                alt="Arrow"
                width={16}
                height={16}
                style={{ width: '1rem', height: 'auto' }}
              />
            </button>
            
            {submitStatus === "success" && (
              <p className="text-green-600 mt-4">Message sent successfully!</p>
            )}
            {submitStatus === "error" && (
              <p className="text-red-600 mt-4">Failed to send message. Please try again.</p>
            )}
          </div>
        </form>

        {/* Contact Info */}
        <div className="text-center border-t border-gray-300 pt-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h3 className="text-3xl font-bold text-black flex items-center">
              <span className="text-gray-400 text-2xl">&lt;</span>
              <span>Marc Vesliño</span>
              <span className="text-gray-400 text-2xl">/&gt;</span>
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-4">Frontend Web Developer</p>
          <a
            href="mailto:marcveslino000@gmail.com"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors mb-6"
          >
            <Image
              src={assets.mail_icon}
              alt="Email"
              width={20}
              height={20}
              style={{ width: '1.25rem', height: 'auto' }}
            />
            marcveslino000@gmail.com
          </a>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mb-8">
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
              href="https://www.linkedin.com/in/marcvesliño/"
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
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 pt-8 border-t border-gray-300">
            <p>© 2026 Marc Vesliño. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="/terms" className="hover:text-black transition-colors">
                Terms of Services
              </a>
              <a href="/privacy" className="hover:text-black transition-colors">
                Privacy Policy
              </a>
              <a 
                href="#top" 
                className="hover:text-black transition-colors flex items-center gap-1"
              >
                Back to Top
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
