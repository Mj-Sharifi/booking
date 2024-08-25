"use client";
import React, { useEffect } from "react";

export default function Config() {
  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      localStorage.setItem("theme","dark")
      document.body.classList.add("dark");
    } else {
      localStorage.setItem("theme","light")
      document.body.classList.remove("dark");
    }
  }, [localStorage.getItem("theme")]);

  return <></>;
}
