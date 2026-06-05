import Link from "next/link";

const giftCards = [
  { amount: 25, popular: false },
  { amount: 50, popular: true },
  { amount: 100, popular: false },
  { amount: 200, popular: false },
];

export default function GiftCards() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6 max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Give the Gift of Pleasure</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="gradient-text">Gift Cards</span></h1>
      <p className="text-white/50 mb-12">Purchase a LuxePlay gift card for someone special. Redeemable on any product.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {giftCards.map(g => (
          <div key={g.amount} className="card p-6 text-center relative" style={{ border: g.popular ? "1px solid rgba(232,121,249,0.4)" : undefined }}>
            {g.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full text-white"
                style={{ background: "linear-gradient(90deg,#e879f9,#f43f8f)" }}>Most Popular</span>
            )}
            <p className="text-4xl mb-2">🎁</p>
            <p className="gradient-text font-bold text-2xl mb-4">${g.amount}</p>
            <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer"
              className="btn-primary w-full py-2.5 text-xs block">Buy Now</a>
          </div>
        ))}
      </div>

      <div className="card p-8" style={{ border: "1px solid rgba(232,121,249,0.15)" }}>
        <h2 className="font-bold text-white text-lg mb-6">How Gift Cards Work</h2>
        <div className="flex flex-col gap-4">
          {[
            { icon: "💳", title: "Purchase a gift card", desc: "Choose an amount and message us on Telegram to complete the purchase." },
            { icon: "📩", title: "Receive your code", desc: "We'll send you a unique promo code via Telegram within minutes." },
            { icon: "🛍️", title: "Share & shop", desc: "The recipient enters the code at checkout to redeem their discount." },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-xl"
                style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)" }}>{s.icon}</div>
              <div>
                <p className="font-bold text-white text-sm mb-0.5">{s.title}</p>
                <p className="text-white/40 text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer"
          className="btn-primary w-full py-3 text-sm text-center block mt-8">
          Purchase via Telegram
        </a>
      </div>
    </div>
  );
}
