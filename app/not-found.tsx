import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="card p-12 max-w-md w-full" style={{ border: "1px solid rgba(232,121,249,0.2)" }}>
        <p className="text-7xl font-bold gradient-text mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-white/40 text-sm mb-8 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/" className="btn-primary py-3 text-sm text-center block">Go Home</Link>
          <Link href="/shop" className="py-3 text-sm rounded-full text-white/50 hover:text-white transition-colors text-center"
            style={{ background: "rgba(255,255,255,0.05)" }}>Browse Shop</Link>
        </div>
      </div>
    </div>
  );
}
