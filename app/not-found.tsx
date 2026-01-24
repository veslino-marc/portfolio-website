import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        {/* Logo */}
        <div className="text-6xl font-bold text-black flex items-center justify-center mb-6">
          <span className="text-gray-400">&lt;</span>
          <span>404</span>
          <span className="text-gray-400">/&gt;</span>
        </div>

        {/* Message */}
        <h1 className="text-4xl font-bold text-black mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105"
          >
            Go Home
          </Link>
          <Link
            href="/#contact"
            className="px-8 py-3 border-2 border-black text-black rounded-full hover:bg-gray-50 transition-all duration-300"
          >
            Contact Me
          </Link>
        </div>

        {/* Decorative Element */}
        <div className="mt-12 text-gray-300 text-9xl font-bold select-none">
          ¯\_(ツ)_/¯
        </div>
      </div>
    </div>
  );
}
