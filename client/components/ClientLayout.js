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
            background: "#363636",
            color: "#fff",
            fontFamily: "var(--font-inter)",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
}
