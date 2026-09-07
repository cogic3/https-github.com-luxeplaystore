"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";

export default function AbandonedCart() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const { items } = useCart();

  useEffect(() => {
    if (pathname !== "/cart" || items.length === 0) return;
    if (sessionStorage.getItem("cart_reminder_shown")) return;
    const t = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem("cart_reminder_shown", "true");
    }, 30000);
    return () => clearTimeout(t);
  }, [pathname, items.length]);

  if (!show) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50 card p-5"
      style={{ border: "1px solid rgba(232,121,249,0.3)", boxShadow: "0 0 30px rgba(232,121,249,0.12)" }}>
      <button onClick={() => setShow(false)}
        className="absolute top-3 right-3 transition-colors hover:opacity-70"
        style={{ color: "var(--color-text-30)" }}>
        <X size={14} />
      </button>
      <p className="text-lg mb-1">🛒</p>
      <p className="font-bold text-sm mb-1" style={{ color: "var(--color-text)" }}>Still thinking it over?</p>
      <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--color-text-50)" }}>
        Message us on Telegram — we&apos;ll hold your cart and answer any questions you have.
      </p>
      <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer"
        className="btn-primary w-full py-2.5 text-xs text-center block">
        Chat with Us on Telegram
      </a>
    </div>
  );
}
