"use client";
import { useEffect, useState } from "react";

const PURCHASES = [
  { name: "J.M.", location: "New York, US", product: "Velvo Vibrator", time: "2 min ago" },
  { name: "A.R.", location: "London, UK", product: "Sissy Maid Costume", time: "5 min ago" },
  { name: "T.K.", location: "Toronto, CA", product: "Pleasure Bundle", time: "8 min ago" },
  { name: "S.D.", location: "Sydney, AU", product: "Bondage Starter Kit", time: "11 min ago" },
  { name: "M.L.", location: "Berlin, DE", product: "Lapis Strap-on", time: "14 min ago" },
  { name: "R.B.", location: "Dubai, AE", product: "Chastity Cage", time: "17 min ago" },
  { name: "C.D.", location: "Lagos, NG", product: "Loyalty Costume", time: "20 min ago" },
  { name: "P.W.", location: "Paris, FR", product: "Wand Massager", time: "23 min ago" },
  { name: "K.O.", location: "Nairobi, KE", product: "Sissy Starter Bundle", time: "26 min ago" },
  { name: "D.F.", location: "Amsterdam, NL", product: "ThrustPro Machine", time: "29 min ago" },
];

export default function RecentPurchasePopup() {
  const [current, setCurrent] = useState<typeof PURCHASES[0] | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const initial = setTimeout(() => showNext(0), 6000);
    return () => clearTimeout(initial);
  }, []);

  function showNext(i: number) {
    const item = PURCHASES[i % PURCHASES.length];
    setCurrent(item);
    setVisible(true);
    setTimeout(() => setVisible(false), 4000);
    setTimeout(() => showNext(i + 1), 12000);
  }

  if (!current || !visible) return null;

  return (
    <div className="fixed bottom-20 left-4 z-40 flex items-center gap-3 px-4 py-3 rounded-2xl card"
      style={{ border: "1px solid rgba(232,121,249,0.2)", boxShadow: "0 8px 32px rgba(0,0,0,0.2)", maxWidth: "280px" }}>
      <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white"
        style={{ background: "linear-gradient(135deg,#e879f9,#f43f8f)" }}>
        {current.name[0]}
      </div>
      <div>
        <p className="text-xs font-semibold" style={{ color: "var(--color-text)" }}>
          {current.name} from {current.location}
        </p>
        <p className="text-[10px]" style={{ color: "var(--color-text-50)" }}>
          just bought <span className="font-medium" style={{ color: "var(--color-text-70)" }}>{current.product}</span>
        </p>
        <p className="text-[10px] mt-0.5" style={{ color: "#e879f9" }}>{current.time}</p>
      </div>
    </div>
  );
}
