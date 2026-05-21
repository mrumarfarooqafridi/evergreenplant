"use client";

import { useEffect, useRef } from "react";
import { Toaster } from "react-hot-toast";

export default function ClientLayout({ children }) {
  const clickSoundRef = useRef(null);

  useEffect(() => {
    clickSoundRef.current = new Audio("/sounds/click1.wav");
    clickSoundRef.current.volume = 0.4;
    clickSoundRef.current.preload = "auto";

    const handleDocumentClick = (event) => {
      const interactiveElement = event.target.closest(
        "button, a, input, textarea, select, label, [role='button']",
      );

      if (!interactiveElement) return;

      const audio = clickSoundRef.current;
      if (!audio) return;

      audio.currentTime = 0;
      audio.play().catch((error) => {
        // Ignore play errors caused by browser autoplay restrictions
        console.debug("Click sound playback blocked:", error);
      });
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#ffffff",
            color: "#1f2937",
            fontFamily: "var(--font-inter)",
            borderRadius: "8px",
            padding: "6px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            border: "1px solid #e5e7eb",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
            style: {
              background: "#ffffff",
              color: "#065f46",
              borderRadius: "8px",
              padding: "6px",
              boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)",
              border: "1px solid #10b981",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
            style: {
              background: "#ffffff",
              color: "#991b1b",
              borderRadius: "8px",
              padding: "6px",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)",
              border: "1px solid #ef4444",
            },
          },
          loading: {
            iconTheme: {
              primary: "#3b82f6",
              secondary: "#ffffff",
            },
            style: {
              background: "#ffffff",
              color: "#1e40af",
              borderRadius: "8px",
              padding: "6px",
              boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
              border: "1px solid #3b82f6",
            },
          },
        }}
        containerStyle={{
          fontSize: "inherit",
        }}
        className="text-xs sm:text-sm"
      />
    </>
  );
}
