"use client";
import { useEffect, useState } from "react";
import { products } from "@/lib/products";
import Image from "next/image";

const NAMES = ["Alex", "Jordan", "Sam", "Riley", "Morgan", "Casey", "Taylor", "Jamie", "Drew", "Avery"];
const LOCATIONS = ["New York", "London", "Toronto", "Sydney", "Berlin", "Paris", "LA", "Miami", "Tokyo", "Amsterdam"];

function randomItem() {
  const p = products[Math.floor(Math.random() * products.length)];
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const loc = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  const mins = Math.floor(Math.random() * 8) + 1;
  return { p, name, loc, mins };
}

export default function RecentPurchasePopup() {
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState(randomItem);

  useEffect(() => {
    const first = setTimeout(() => {
      setItem(randomItem());
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    }, 8000);

    const interval = setInterval(() => {
      setItem(randomItem());
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
    }, 25000);

    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-4 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl"
      style={{ background: "rgba(10,0,16,0.95)", border: "1px solid rgba(232,121,249,0.25)", maxWidth: "280px", backdropFilter: "blur(16px)" }}>
      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0" style={{ background: "rgba(232,121,249,0.08)" }}>
        <Image src={item.p.image} alt={item.p.name} fill className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-xs leading-tight">{item.name} from {item.loc}</p>
        <p className="text-white/50 text-[11px] truncate">just bought <span style={{ color: "#e879f9" }}>{item.p.name}</span></p>
        <p className="text-white/30 text-[10px] mt-0.5">{item.mins} min ago</p>
      </div>
      <button onClick={() => setVisible(false)} className="text-white/20 hover:text-white/50 transition-colors text-lg leading-none shrink-0">×</button>
    </div>
  );
}
