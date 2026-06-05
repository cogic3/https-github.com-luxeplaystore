import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <div className="card p-12 max-w-md w-full" style={{ border: "1px solid rgba(232,121,249,0.2)" }}>
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold gradient-text mb-3">Thank You!</h1>
        <p className="text-white/60 mb-2 leading-relaxed">Your order has been received. We&apos;ll be in touch via Telegram to confirm and arrange delivery.</p>
        <p className="text-white/30 text-sm mb-8">All orders are shipped in plain, discreet packaging.</p>

        <div className="flex flex-col gap-3">
          <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer"
            className="btn-primary py-3 text-sm text-center block">
            Message Us on Telegram
          </a>
          <Link href="/tracking"
            className="py-3 text-sm rounded-full text-white/50 hover:text-white transition-colors text-center"
            style={{ background: "rgba(255,255,255,0.05)" }}>
            Track My Order
          </Link>
          <Link href="/shop" className="text-white/30 text-sm hover:text-white transition-colors mt-1">
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
}
