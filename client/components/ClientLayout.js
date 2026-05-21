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
            borderRadius: "12px",
            padding: "16px",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            border: "1px solid #e5e7eb",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
            style: {
              background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
              color: "#fff",
              borderRadius: "12px",
              padding: "16px",
              boxShadow:
                "0 10px 15px -3px rgba(34, 197, 94, 0.3), 0 4px 6px -2px rgba(34, 197, 94, 0.2)",
              border: "none",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
            style: {
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "#fff",
              borderRadius: "12px",
              padding: "16px",
              boxShadow:
                "0 10px 15px -3px rgba(239, 68, 68, 0.3), 0 4px 6px -2px rgba(239, 68, 68, 0.2)",
              border: "none",
            },
          },
          loading: {
            style: {
              background: "#ffffff",
              color: "#1f2937",
              borderRadius: "12px",
              padding: "16px",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              border: "1px solid #e5e7eb",
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
