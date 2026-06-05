"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) setShow(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "true");
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-6 md:right-auto md:max-w-sm z-40 card p-5"
      style={{ border: "1px solid rgba(232,121,249,0.2)" }}>
      <p className="text-white/70 text-sm mb-4 leading-relaxed">
        🍪 We use cookies to improve your experience. By continuing, you agree to our cookie policy.
      </p>
      <div className="flex gap-2">
        <button onClick={accept} className="btn-primary px-5 py-2 text-xs flex-1">Accept</button>
        <button onClick={() => setShow(false)}
          className="px-5 py-2 text-xs rounded-full text-white/40 hover:text-white transition-colors flex-1"
          style={{ background: "rgba(255,255,255,0.05)" }}>
          Decline
        </button>
      </div>
    </div>
  );
}
