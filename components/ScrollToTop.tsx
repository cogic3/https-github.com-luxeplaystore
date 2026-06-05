"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!show) return null;

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-40 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
      style={{ background: "rgba(232,121,249,0.15)", border: "1px solid rgba(232,121,249,0.3)", color: "#e879f9" }}>
      <ArrowUp size={16} />
    </button>
  );
}
