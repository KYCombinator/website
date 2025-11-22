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
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 z-[60]">
      <div className="container mx-auto flex items-center justify-center">
        <div className="text-center">
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
      </div>
      <button
        onClick={handleDismiss}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
        aria-label="Dismiss banner"
      >
        <X size={20} />
      </button>
    </div>
  );
}

