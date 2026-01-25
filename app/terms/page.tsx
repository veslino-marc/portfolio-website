import Link from "next/link";

export default function TermsOfService() {
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

        <h1 className="text-4xl font-bold text-black mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: January 25, 2026</p>

        <div className="space-y-8 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using this portfolio website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">2. Use License</h2>
            <p className="leading-relaxed mb-4">
              Permission is granted to temporarily view the materials (information or software) on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">3. Disclaimer</h2>
            <p className="leading-relaxed">
              The materials on this website are provided on an 'as is' basis. Marc Vesliño makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">4. Limitations</h2>
            <p className="leading-relaxed">
              In no event shall Marc Vesliño or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">5. Contact Form</h2>
            <p className="leading-relaxed">
              By submitting information through the contact form, you agree that the information provided may be used to respond to your inquiry. Your information will not be shared with third parties without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">6. Links</h2>
            <p className="leading-relaxed">
              This website may contain links to external sites that are not operated by me. Please be aware that I have no control over the content and practices of these sites and cannot accept responsibility or liability for their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">7. Modifications</h2>
            <p className="leading-relaxed">
              Marc Vesliño may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-black mb-4">8. Contact Information</h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms of Service, please contact me at{" "}
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
