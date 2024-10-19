"use client";
import { useEffect, useState } from "react";

export default function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Function to check if the 'dark' class is applied
    const checkTheme = () => {
      setIsDark(document.body.classList.contains("dark"));
    };

    // Run check once on mount
    checkTheme();

    // Optionally, add a MutationObserver to track changes to the body's classList
    const observer = new MutationObserver(() => checkTheme());

    observer.observe(document.body, {
      attributes: true, // Watch for attribute changes (e.g., class changes)
      attributeFilter: ["class"], // Only watch the "class" attribute
    });

    // Cleanup observer when component unmounts
    return () => {
      observer.disconnect();
    };
  }, []); // No need to add dependencies since the MutationObserver will track changes

  return isDark;
}