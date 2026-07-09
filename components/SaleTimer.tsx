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

export default function SaleTimer() {
  const [time, setTime] = useState({ h: "00", m: "00", s: "00" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-1 mt-1">
      <span className="text-[9px] font-semibold" style={{ color: "#f43f8f" }}>⏱ Sale ends:</span>
      {[time.h, time.m, time.s].map((v, i) => (
        <span key={i} className="text-[9px] font-bold px-1 py-0.5 rounded"
          style={{ background: "rgba(244,63,143,0.15)", color: "#f43f8f", fontVariantNumeric: "tabular-nums" }}>
          {v}{i === 0 ? "h" : i === 1 ? "m" : "s"}
        </span>
      ))}
    </div>
  );
}
