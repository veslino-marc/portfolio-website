"use client";

import { useEffect, useState } from "react";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Hide loading screen after page loads
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animation */}
        <div className="text-4xl font-bold text-black flex items-center justify-center mb-4 animate-pulse">
          <span className="text-gray-400">&lt;</span>
          <span>MV</span>
          <span className="text-gray-400">/&gt;</span>
        </div>
        
        {/* Loading Spinner */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
