"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Bell, X } from "lucide-react";

export default function PushNotificationPrompt() {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") { setGranted(true); return; }
    if (Notification.permission === "denied") return;
    const dismissed = localStorage.getItem("luxeplay_push_dismissed");
    if (dismissed) return;
    // Show prompt 3 seconds after login
    const t = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(t);
  }, [user]);

  async function handleAllow() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      setGranted(true);
      new Notification("LuxePlay 🎉", {
        body: "You'll now get notified about exclusive deals and new arrivals!",
        icon: "/favicon.ico",
      });
    }
    setShow(false);
  }

  function handleDismiss() {
    localStorage.setItem("luxeplay_push_dismissed", "1");
    setShow(false);
  }

  if (!show || granted) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 w-72 rounded-2xl p-5 shadow-2xl"
      style={{ background: "rgba(10,0,16,0.97)", border: "1px solid rgba(232,121,249,0.25)", backdropFilter: "blur(16px)" }}>
      <button onClick={handleDismiss} className="absolute top-3 right-3 text-white/20 hover:text-white/50 transition-colors">
        <X size={14} />
      </button>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(232,121,249,0.15)", border: "1px solid rgba(232,121,249,0.2)" }}>
          <Bell size={18} style={{ color: "#e879f9" }} />
        </div>
        <div>
          <p className="text-white font-bold text-sm">Stay in the loop</p>
          <p className="text-white/40 text-xs">Get notified about deals & drops</p>
        </div>
      </div>
      <p className="text-white/50 text-xs leading-relaxed mb-4">
        Enable notifications to be the first to know about exclusive discounts, new arrivals, and flash sales.
      </p>
      <div className="flex gap-2">
        <button onClick={handleAllow} className="btn-primary flex-1 py-2 text-xs">Allow</button>
        <button onClick={handleDismiss} className="flex-1 py-2 text-xs rounded-full font-semibold transition-colors text-white/40 hover:text-white"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          Not now
        </button>
      </div>
    </div>
  );
}
