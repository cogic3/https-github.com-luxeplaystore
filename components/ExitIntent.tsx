"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("exit_intent_shown")) return;

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 10) {
        setShow(true);
        sessionStorage.setItem("exit_intent_shown", "true");
      }
    }

    // Also show after 45s of inactivity as fallback for mobile
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem("exit_intent_shown")) {
        setShow(true);
        sessionStorage.setItem("exit_intent_shown", "true");
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, []);

  function copyCode() {
    navigator.clipboard.writeText("SAVE20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="card w-full max-w-md p-8 text-center relative"
        style={{ border: "1px solid rgba(232,121,249,0.3)" }}>
        <button onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
          <X size={18} />
        </button>

        <div className="text-5xl mb-4">🎁</div>
        <h2 className="text-2xl font-bold text-white mb-2">Wait! Don&apos;t leave yet.</h2>
        <p className="text-white/50 text-sm mb-6 leading-relaxed">
          Here&apos;s an exclusive discount just for you. Use this code at checkout for <span className="text-white font-bold">20% off</span> your entire order.
        </p>

        <div className="rounded-2xl p-4 mb-6 flex items-center justify-between gap-3"
          style={{ background: "rgba(232,121,249,0.08)", border: "1px solid rgba(232,121,249,0.25)" }}>
          <span className="gradient-text font-black text-2xl tracking-widest">SAVE20</span>
          <button onClick={copyCode}
            className="text-xs font-bold px-4 py-2 rounded-full transition-all"
            style={{ background: copied ? "rgba(52,211,153,0.2)" : "rgba(232,121,249,0.15)", color: copied ? "#34d399" : "#e879f9", border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(232,121,249,0.3)"}` }}>
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>

        <Link href="/shop" onClick={() => setShow(false)} className="btn-primary w-full py-3 text-sm block mb-3">
          Shop Now & Save 20%
        </Link>
        <button onClick={() => setShow(false)} className="text-white/25 text-xs hover:text-white/50 transition-colors">
          No thanks, I&apos;ll pay full price
        </button>
      </div>
    </div>
  );
}
