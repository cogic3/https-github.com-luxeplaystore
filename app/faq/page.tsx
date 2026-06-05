"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    section: "Shipping",
    id: "shipping",
    items: [
      { q: "How is my order packaged?", a: "All orders are shipped in plain, unmarked boxes with no indication of the contents. The sender name on the label is generic." },
      { q: "How long does delivery take?", a: "Delivery times vary by location. Most orders arrive within 2–4 weeks internationally. We'll keep you updated via Telegram." },
      { q: "Do you ship worldwide?", a: "Yes, we ship to most countries worldwide. Contact us on Telegram if you're unsure about your location." },
    ],
  },
  {
    section: "Payment",
    id: "payment",
    items: [
      { q: "What payment methods do you accept?", a: "We accept Bitcoin and any gift cards (Amazon, Google Play, iTunes, Steam, and more)." },
      { q: "How do I pay with a gift card?", a: "Upload a clear photo of your gift card on the checkout page. Make sure the card code is visible. We'll verify and confirm your order." },
      { q: "How do I confirm my Bitcoin payment?", a: "After sending Bitcoin to our wallet address, message us on Telegram with your transaction ID and we'll confirm your order." },
    ],
  },
  {
    section: "Privacy",
    id: "privacy",
    items: [
      { q: "Is my personal information safe?", a: "Absolutely. Your details are only used for shipping purposes and are never shared with third parties." },
      { q: "Will my purchase appear on my bank statement?", a: "Since we only accept Bitcoin and gift cards, no purchase will appear on any bank statement." },
    ],
  },
  {
    section: "Returns",
    id: "returns",
    items: [
      { q: "Can I return a product?", a: "Due to the nature of our products, we do not accept returns. However, if your item arrives damaged or incorrect, contact us on Telegram and we'll make it right." },
      { q: "What if my order never arrives?", a: "If your order doesn't arrive within the expected timeframe, reach out to us on Telegram with your order details and we'll investigate." },
    ],
  },
  {
    section: "Terms of Service",
    id: "terms",
    items: [
      { q: "Who can shop on LuxePlay?", a: "LuxePlay is strictly for adults aged 18 and over. By placing an order, you confirm that you are of legal age in your country." },
      { q: "Are all products body-safe?", a: "Yes, we only stock body-safe, non-toxic products made from medical-grade materials." },
    ],
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-24 px-4 md:px-6 max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Got Questions?</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-12"><span className="gradient-text">FAQ</span></h1>

      <div className="flex flex-col gap-10">
        {faqs.map(section => (
          <div key={section.id} id={section.id}>
            <p className="text-xs uppercase tracking-[0.4em] font-semibold mb-4" style={{ color: "#e879f9" }}>{section.section}</p>
            <div className="flex flex-col gap-3">
              {section.items.map(item => (
                <div key={item.q} className="card overflow-hidden">
                  <button className="w-full px-6 py-4 flex items-center justify-between text-left gap-4"
                    onClick={() => setOpen(open === item.q ? null : item.q)}>
                    <span className="font-semibold text-white text-sm">{item.q}</span>
                    <ChevronDown size={16} className="shrink-0 text-white/40 transition-transform"
                      style={{ transform: open === item.q ? "rotate(180deg)" : "rotate(0deg)" }} />
                  </button>
                  {open === item.q && (
                    <div className="px-6 pb-5 text-white/50 text-sm leading-relaxed border-t" style={{ borderColor: "rgba(232,121,249,0.08)" }}>
                      <p className="pt-4">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
