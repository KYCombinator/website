"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function EventBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed in localStorage
    const dismissed = localStorage.getItem("event-banner-dismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("event-banner-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 relative z-50">
      <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap">
        <div className="text-center md:text-left">
          <span className="font-semibold">December 4th:</span>{" "}
          <Link
            href="/events/velocityfinale"
            className="underline hover:no-underline font-medium"
          >
            Velocity
          </Link>{" "}
          and{" "}
          <Link
            href="/events/louies/2025"
            className="underline hover:no-underline font-medium"
          >
            The LOUIES
          </Link>
        </div>
        <button
          onClick={handleDismiss}
          className="ml-auto p-1 hover:bg-white/20 rounded transition-colors"
          aria-label="Dismiss banner"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

