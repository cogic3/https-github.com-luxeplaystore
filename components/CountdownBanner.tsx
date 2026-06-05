"use client";
import { useEffect, useState } from "react";

function getTimeLeft() {
  const end = new Date();
  end.setHours(23, 59, 59, 0);
  const diff = end.getTime() - Date.now();
  if (diff <= 0) return { h: "00", m: "00", s: "00" };
  const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
  return { h, m, s };
}

export default function CountdownBanner() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ h: "00", m: "00", s: "00" });

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-[60] w-full py-2.5 px-4 text-center text-xs font-semibold flex items-center justify-center gap-3 flex-wrap"
      style={{ background: "linear-gradient(90deg, #e879f9, #f43f8f)", color: "#000", fontVariantNumeric: "tabular-nums" }}>
      <span>🔥 LIMITED TIME OFFER — Up to 20% OFF today only!</span>
      {mounted && (
        <span className="flex items-center gap-1 font-bold">
          Ends in:
          <span className="bg-black/20 px-2 py-0.5 rounded-md w-10 text-center inline-block">{time.h}h</span>
          <span className="bg-black/20 px-2 py-0.5 rounded-md w-10 text-center inline-block">{time.m}m</span>
          <span className="bg-black/20 px-2 py-0.5 rounded-md w-10 text-center inline-block">{time.s}s</span>
        </span>
      )}
    </div>
  );
}
