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
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="card w-full max-w-md p-8 text-center relative"
        style={{ border: "1px solid rgba(232,121,249,0.3)" }}>
        <button onClick={() => setShow(false)}
          className="absolute top-4 right-4 transition-colors hover:opacity-70"
          style={{ color: "var(--color-text-30)" }}>
          <X size={18} />
        </button>

        <div className="text-5xl mb-4">🎁</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
          Wait! Don&apos;t leave yet.
        </h2>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--color-text-50)" }}>
          Here&apos;s an exclusive discount just for you. Use this code at checkout for{" "}
          <span className="font-bold" style={{ color: "var(--color-text)" }}>20% off</span> your entire order.
        </p>

        <div className="rounded-2xl p-4 mb-6 flex items-center justify-between gap-3"
          style={{ background: "rgba(232,121,249,0.08)", border: "1px solid rgba(232,121,249,0.25)" }}>
          <span className="gradient-text font-black text-2xl tracking-widest">SAVE20</span>
          <button onClick={copyCode}
            className="text-xs font-bold px-4 py-2 rounded-full transition-all"
            style={{
              background: copied ? "rgba(52,211,153,0.15)" : "rgba(232,121,249,0.15)",
              color: copied ? "#34d399" : "#e879f9",
              border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(232,121,249,0.3)"}`,
            }}>
            {copied ? "✓ Copied!" : "Copy"}
          </button>
        </div>

        <Link href="/shop" onClick={() => setShow(false)} className="btn-primary w-full py-3 text-sm block mb-3">
          Shop Now & Save 20%
        </Link>
        <button onClick={() => setShow(false)}
          className="text-xs transition-colors hover:opacity-70"
          style={{ color: "var(--color-text-25)" }}>
          No thanks, I&apos;ll pay full price
        </button>
      </div>
    </div>
  );
}
