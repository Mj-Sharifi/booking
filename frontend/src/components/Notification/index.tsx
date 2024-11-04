"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function Notification() {
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    if (typeof document !== "undefined") {
      setRendered(true);
    }
  }, []);
  return (
    <>
      {rendered && (
        <ToastContainer
          position={document?.dir == "rtl" ? "bottom-right" : "bottom-left"}
          newestOnTop
        />
      )}
    </>
  );
}
