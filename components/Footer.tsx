import Link from "next/link";

const reviews = [
  { name: "Ashley R.",  rating: 5, text: "Absolutely love this store. Discreet, fast, and the quality is unreal. Already recommended to a friend.", date: "2 days ago" },
  { name: "Jordan M.",  rating: 4, text: "Good experience overall. Delivery took a little longer than expected but the packaging was perfectly discreet.", date: "1 week ago" },
  { name: "Taylor S.",  rating: 5, text: "Customer support on Telegram is super responsive. Had a question about my order and it was sorted in minutes.", date: "2 weeks ago" },
  { name: "Morgan K.",  rating: 3, text: "Product was fine but communication could be faster. Took 2 days to get a reply on Telegram. Would still order again though.", date: "3 weeks ago" },
  { name: "Riley B.",   rating: 5, text: "Finally a store that takes privacy seriously. Plain box, no weird labels. Exactly what I needed.", date: "1 month ago" },
  { name: "Cameron D.", rating: 4, text: "Smooth process and the gift card payment option is really convenient. Knocked one star off because shipping took 3 weeks.", date: "1 month ago" },
  { name: "Sage W.",    rating: 2, text: "Had some trouble getting a response at first but eventually got sorted. Product quality was good once it arrived.", date: "6 weeks ago" },
  { name: "Alex P.",    rating: 5, text: "Third time ordering. Never had an issue. Discreet, quality products, and the Bitcoin payment is seamless.", date: "2 months ago" },
  { name: "Jamie L.",   rating: 4, text: "Very happy with my order. Would love more product options but what&apos;s available is top quality.", date: "2 months ago" },
];

export default function Footer() {
  return (
    <>
      {/* Trustpilot-style review section */}
      <section className="border-t py-10 md:py-14 px-4 md:px-6" style={{ borderColor: "rgba(232,121,249,0.1)", background: "rgba(232,121,249,0.02)" }}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {/* Trustpilot logo style */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: "#00b67a" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <span className="text-white text-xs font-bold tracking-wide">Trustpilot</span>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-6 h-6 flex items-center justify-center" style={{ background: i <= 4 ? "#00b67a" : "rgba(255,255,255,0.15)", borderRadius: "2px" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-white font-bold text-2xl">Great</p>
              <p className="text-white/40 text-sm">4.1 out of 5 · Based on <span className="text-white/60 font-semibold">248 reviews</span></p>
            </div>
            <a href="https://www.trustpilot.com" target="_blank" rel="noopener noreferrer"
              className="text-xs font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105"
              style={{ background: "rgba(0,182,122,0.15)", border: "1px solid rgba(0,182,122,0.3)", color: "#00b67a" }}>
              See all reviews on Trustpilot ↗
            </a>
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <div key={i} className="card p-5" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(s => (
                    <div key={s} className="w-5 h-5 flex items-center justify-center" style={{ background: s <= r.rating ? "#00b67a" : "rgba(255,255,255,0.1)", borderRadius: "2px" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: "linear-gradient(135deg,#e879f9,#f43f8f)" }}>
                      {r.name[0]}
                    </div>
                    <p className="text-white font-semibold text-xs">{r.name}</p>
                  </div>
                  <p className="text-white/25 text-xs">{r.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t" style={{ borderColor: "rgba(232,121,249,0.1)", background: "rgba(232,121,249,0.02)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <p className="gradient-text font-bold text-xl mb-3">LuxePlay</p>
          <p className="text-white/35 text-sm leading-relaxed mb-4">Premium adult boutique. Discreet, curated, and delivered to your door.</p>
          <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full transition-all hover:scale-105"
            style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)", color: "#e879f9" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" /></svg>
            Chat on Telegram
          </a>
        </div>

        {/* Shop */}
        <div>
          <p className="text-white font-semibold text-sm mb-4">Shop</p>
          <div className="flex flex-col gap-2.5 text-sm text-white/40">
            <Link href="/shop" className="hover:text-white transition-colors">All Products</Link>
            <Link href="/wishlist" className="hover:text-white transition-colors">Wishlist</Link>
            <Link href="/shop" className="hover:text-white transition-colors">Vibrators</Link>
            <Link href="/shop" className="hover:text-white transition-colors">Dildos</Link>
            <Link href="/shop" className="hover:text-white transition-colors">Machines</Link>
            <Link href="/shop" className="hover:text-white transition-colors">Accessories</Link>
          </div>
        </div>

        {/* Help */}
        <div>
          <p className="text-white font-semibold text-sm mb-4">Help</p>
          <div className="flex flex-col gap-2.5 text-sm text-white/40">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link>
            <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            <Link href="/tracking" className="hover:text-white transition-colors">Track Order</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Payment */}
        <div>
          <p className="text-white font-semibold text-sm mb-4">We Accept</p>
          <div className="flex flex-col gap-2.5 text-sm text-white/40">
            <span className="flex items-center gap-2">₿ Bitcoin</span>
            <span className="flex items-center gap-2">🎁 Gift Cards (Any)</span>
          </div>
          <p className="text-white font-semibold text-sm mt-6 mb-3">Shipping</p>
          <p className="text-white/35 text-xs leading-relaxed">Worldwide discreet delivery. Plain packaging guaranteed.</p>
        </div>
      </div>

      <div className="border-t px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/25"
        style={{ borderColor: "rgba(232,121,249,0.08)" }}>
        <p>© {new Date().getFullYear()} LuxePlay. All rights reserved. Adults 18+ only.</p>
        <div className="flex gap-5">
          <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white/50 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
    </>
  );
}
