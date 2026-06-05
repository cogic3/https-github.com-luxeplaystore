import Link from "next/link";

export default function Contact() {
  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-24 px-4 md:px-6 max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Get In Touch</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="gradient-text">Contact Us</span></h1>
      <p className="text-white/50 mb-12 text-lg">We&apos;re available 24/7. Reach out anytime and we&apos;ll get back to you quickly.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="card p-7">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
            style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)" }}>
            💬
          </div>
          <h3 className="font-bold text-white mb-2">Telegram</h3>
          <p className="text-white/40 text-sm mb-5 leading-relaxed">Fastest way to reach us. Message us for orders, questions, or support.</p>
          <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer" className="btn-primary px-6 py-2.5 text-sm inline-block">
            Message on Telegram
          </a>
        </div>

        <div className="card p-7">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
            style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)" }}>
            ❓
          </div>
          <h3 className="font-bold text-white mb-2">FAQ</h3>
          <p className="text-white/40 text-sm mb-5 leading-relaxed">Check our FAQ for quick answers about shipping, payment, and privacy.</p>
          <Link href="/faq" className="btn-primary px-6 py-2.5 text-sm inline-block">View FAQ</Link>
        </div>
      </div>

      <div className="card p-7" style={{ border: "1px solid rgba(232,121,249,0.15)" }}>
        <h3 className="font-bold text-white mb-6">Before you message us, here&apos;s what to include:</h3>
        <div className="flex flex-col gap-3">
          {[
            "Your full name and shipping address",
            "The product(s) you want to order",
            "Your preferred payment method (Bitcoin or Gift Card)",
            "Any special requests or questions",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-white/60">
              <span className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                style={{ background: "linear-gradient(90deg,#e879f9,#f43f8f)" }}>
                {i + 1}
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
