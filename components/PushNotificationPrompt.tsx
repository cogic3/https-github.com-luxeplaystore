"use client";
import { useEffect, useState } from "react";
import { X, Bell } from "lucide-react";

export default function PushNotificationPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("Notification" in window)) return;
    if (Notification.permission !== "default") return;
    if (localStorage.getItem("push_prompt_shown")) return;
    const t = setTimeout(() => {
      setShow(true);
      localStorage.setItem("push_prompt_shown", "true");
    }, 20000);
    return () => clearTimeout(t);
  }, []);

  async function allow() {
    await Notification.requestPermission();
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-24 right-4 md:right-6 z-40 w-72 card p-5"
      style={{ border: "1px solid rgba(232,121,249,0.25)", boxShadow: "0 0 30px rgba(232,121,249,0.1)" }}>
      <button onClick={() => setShow(false)}
        className="absolute top-3 right-3 transition-colors hover:opacity-70"
        style={{ color: "var(--color-text-30)" }}>
        <X size={14} />
      </button>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(232,121,249,0.12)", border: "1px solid rgba(232,121,249,0.2)" }}>
          <Bell size={16} style={{ color: "#e879f9" }} />
        </div>
        <p className="font-bold text-sm" style={{ color: "var(--color-text)" }}>Get notified on deals</p>
      </div>
      <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--color-text-50)" }}>
        Be the first to know about flash sales, new arrivals, and exclusive discounts.
      </p>
      <div className="flex gap-2">
        <button onClick={allow} className="btn-primary flex-1 py-2 text-xs">Allow</button>
        <button onClick={() => setShow(false)}
          className="flex-1 py-2 text-xs rounded-full font-semibold transition-all hover:opacity-80"
          style={{ background: "var(--color-surface)", border: "1px solid var(--border)", color: "var(--color-text-40)" }}>
          Not now
        </button>
      </div>
    </div>
  );
}
