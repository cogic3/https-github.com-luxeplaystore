"use client";
import { useEffect, useState } from "react";

export default function AgeGate({ children }: { children: React.ReactNode }) {
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    setVerified(sessionStorage.getItem("age_verified") === "true");
  }, []);

  function confirm() {
    sessionStorage.setItem("age_verified", "true");
    setVerified(true);
  }

  if (verified) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      style={{ background: "rgba(10,0,16,0.98)", backdropFilter: "blur(20px)" }}>
      <div className="card p-10 max-w-md w-full text-center" style={{ border: "1px solid rgba(232,121,249,0.2)" }}>
        <p className="text-5xl mb-4">🔞</p>
        <h2 className="text-2xl font-bold text-white mb-2">Adults Only</h2>
        <p className="text-white/50 text-sm mb-8 leading-relaxed">
          This website contains adult content and is intended for individuals 18 years of age or older.
          By entering, you confirm you are at least 18 years old.
        </p>
        <div className="flex flex-col gap-3">
          <button onClick={confirm} className="btn-primary w-full py-3 text-sm">
            I am 18 or older — Enter
          </button>
          <a href="https://www.google.com" className="text-white/30 text-sm hover:text-white/50 transition-colors py-2">
            I am under 18 — Exit
          </a>
        </div>
      </div>
    </div>
  );
}
