import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white px-5 lg:px-8 xl:px-[8%] py-20">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/#contact" 
          className="inline-flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-black mb-4">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: January 25, 2026</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to Marc Vesliño's portfolio website. This Privacy Policy explains how I collect, use, and protect your personal information when you visit my website and use the contact form.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">2. Information I Collect</h2>
            <p className="leading-relaxed mb-4">
              When you use the contact form on this website, I collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Name:</strong> To address you properly in my response</li>
              <li><strong>Email Address:</strong> To respond to your inquiry</li>
              <li><strong>Message:</strong> The content of your inquiry or feedback</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">3. How I Use Your Information</h2>
            <p className="leading-relaxed mb-4">
              The information you provide through the contact form is used solely for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Responding to your inquiries and messages</li>
              <li>Communicating with you about potential projects or opportunities</li>
              <li>Improving my website and services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">4. Third-Party Services</h2>
            <p className="leading-relaxed mb-4">
              This website uses Web3Forms to process contact form submissions. When you submit the contact form, your information is transmitted through Web3Forms' secure servers. Please review Web3Forms' privacy policy for information on how they handle data.
            </p>
            <p className="leading-relaxed">
              I do not sell, trade, or otherwise transfer your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">5. Data Security</h2>
            <p className="leading-relaxed">
              I implement appropriate security measures to protect your personal information. However, please note that no method of transmission over the internet is 100% secure, and I cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">6. Cookies and Tracking</h2>
            <p className="leading-relaxed">
              This website does not use cookies for tracking purposes. However, hosting providers may use standard server logs that collect basic information such as IP addresses and browser types for security and performance monitoring.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">7. External Links</h2>
            <p className="leading-relaxed">
              This website contains links to external sites (GitHub, LinkedIn). I am not responsible for the privacy practices of these external sites. I encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">8. Your Rights</h2>
            <p className="leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Request access to the personal information I have about you</li>
              <li>Request correction or deletion of your personal information</li>
              <li>Withdraw consent for me to contact you</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">9. Children's Privacy</h2>
            <p className="leading-relaxed">
              This website is not intended for children under 13 years of age. I do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">10. Changes to This Policy</h2>
            <p className="leading-relaxed">
              I may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">11. Contact Me</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy or how your information is handled, please contact me at{" "}
              <a href="mailto:marcveslino000@gmail.com" className="text-blue-600 hover:underline">
                marcveslino000@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
