"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useAuth } from "@/context/AuthContext";
import ShippingModal from "@/components/ShippingModal";
import AuthModal from "@/components/AuthModal";
import SaleTimer from "@/components/SaleTimer";
import { Star, Heart, ShoppingBag, Users, ArrowLeft, Share2, Check } from "lucide-react";

const fakeReviews = [
  { name: "J.M.", text: "Absolutely incredible. Delivery was discreet and exactly as described. Already ordered again.", rating: 5 },
  { name: "A.R.", text: "Top quality. Packaging was plain with no hints of what's inside. Highly recommend.", rating: 5 },
  { name: "T.K.", text: "Exceeded expectations. The quality is premium and it feels amazing. Worth every penny.", rating: 5 },
  { name: "S.D.", text: "Super fast response on Telegram and smooth transaction. Product is perfect.", rating: 4 },
  { name: "M.L.", text: "Been ordering from here for months. Consistent quality and great support.", rating: 5 },
];

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const product = products.find(p => p.id === id);

  const { add, setShipping } = useCart();
  const { wishlist, toggleWishlist, addRecentlyViewed } = useStore();
  const { format } = useCurrency();
  const { user } = useAuth();

  const [imgIdx, setImgIdx] = useState(0);
  const [variant, setVariant] = useState("");
  const [qty, setQty] = useState(1);
  const [showShipping, setShowShipping] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [shared, setShared] = useState(false);
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    if (product) {
      setVariant(product.variants?.[0]?.label ?? "");
      addRecentlyViewed(product);
      setViewers(product.viewers + Math.floor(Math.random() * 5));
    }
  }, [product]);

  useEffect(() => {
    const t = setInterval(() => {
      setViewers(v => Math.max(1, v + (Math.random() > 0.5 ? 1 : -1)));
    }, 4000);
    return () => clearInterval(t);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-5xl">🔍</p>
        <h2 className="text-2xl font-bold text-white/70">Product not found</h2>
        <Link href="/shop" className="btn-primary px-8 py-3 text-sm">Back to Shop</Link>
      </div>
    );
  }

  const isWished = wishlist.includes(product.id);
  const variantData = product.variants?.find(v => v.label === variant);
  const unitPrice = variantData?.price ?? product.salePrice ?? product.price;
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const stockColor = product.stock <= 3 ? "#f43f8f" : product.stock <= 8 ? "#fb923c" : "#34d399";
  const stockText = product.stock <= 3 ? `Only ${product.stock} left!` : product.stock <= 8 ? `${product.stock} in stock` : "In Stock";

  function handleBuy() {
    if (!user) { setShowAuth(true); return; }
    setShowShipping(true);
  }

  function handleAuthClose() {
    setShowAuth(false);
    if (user) setShowShipping(true);
  }

  function handleConfirm(info: Parameters<typeof setShipping>[0]) {
    add({ id: product!.id, name: product!.name + (variant ? ` (${variant})` : ""), price: unitPrice, image: product!.image, qty });
    setShipping(info);
    setShowShipping(false);
    router.push("/cart");
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }

  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 px-4 md:px-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm text-white/40">
        <Link href="/shop" className="flex items-center gap-1 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Shop
        </Link>
        <span>/</span>
        <span className="text-white/60 capitalize">{product.category}</span>
        <span>/</span>
        <span className="text-white">{product.name}</span>
      </div>

      {/* Main product section */}
      <div className="grid md:grid-cols-2 gap-10 mb-20">
        {/* Images */}
        <div className="flex flex-col gap-3">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden"
            style={{ background: "rgba(232,121,249,0.06)", border: "1px solid rgba(232,121,249,0.15)" }}>
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ background: "linear-gradient(90deg,#e879f9,#f43f8f)" }}>{product.badge}</span>
            )}
            {product.isNew && (
              <span className="absolute top-4 right-4 z-10 text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ background: "linear-gradient(90deg,#34d399,#059669)" }}>NEW</span>
            )}
            <Image src={product.images[imgIdx] ?? product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div className="flex gap-3">
            {product.images.slice(0, 4).map((img, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                className="flex-1 aspect-square rounded-xl overflow-hidden relative transition-all"
                style={{ border: imgIdx === i ? "2px solid rgba(232,121,249,0.6)" : "1px solid rgba(255,255,255,0.08)" }}>
                <Image src={img} alt={product.name} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-[0.4em] mb-2 capitalize" style={{ color: "#e879f9" }}>{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} fill={i <= Math.round(product.rating) ? "#facc15" : "none"}
                  className={i <= Math.round(product.rating) ? "text-yellow-400" : "text-white/20"} />
              ))}
            </div>
            <span className="text-sm text-white/60">{product.rating} out of 5</span>
            <span className="text-white/30 text-sm">({product.reviews} reviews)</span>
          </div>

          {/* Live viewers */}
          <div className="flex items-center gap-2 mb-4">
            <Users size={13} className="text-green-400" />
            <span className="text-sm text-green-400 font-medium">{viewers} people viewing this right now</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-2">
            <p className="gradient-text font-black text-4xl">{format(unitPrice)}</p>
            {product.salePrice && (
              <p className="text-white/30 text-xl line-through">{format(product.price)}</p>
            )}
            {product.salePrice && (
              <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: "rgba(244,63,143,0.15)", color: "#f43f8f" }}>
                Save {format(product.price - product.salePrice)}
              </span>
            )}
          </div>

          {/* Sale timer */}
          {product.salePrice && <SaleTimer />}

          {/* Stock */}
          <p className="text-sm font-semibold mt-3 mb-5" style={{ color: stockColor }}>● {stockText}</p>

          {/* Description */}
          <p className="text-white/60 text-sm leading-relaxed mb-6">{product.desc}</p>

          {/* Variants */}
          {product.variants && (
            <div className="mb-6">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3">
                {product.category === "costumes" ? "Size" : "Option"}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map(v => (
                  <button key={v.label} onClick={() => setVariant(v.label)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${variant === v.label ? "btn-primary" : "text-white/50"}`}
                    style={variant !== v.label ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" } : {}}>
                    {v.label}{v.price ? ` — ${format(v.price)}` : ""}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-white/50">Quantity</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>−</button>
              <span className="text-white font-bold w-8 text-center">{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>+</button>
            </div>
            <span className="text-white/30 text-sm ml-auto">Total: <span className="gradient-text font-bold">{format(unitPrice * qty)}</span></span>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 mb-4">
            <button onClick={handleBuy} className="btn-primary flex-1 py-4 text-base flex items-center justify-center gap-2">
              <ShoppingBag size={18} /> Buy Now
            </button>
            <button onClick={() => toggleWishlist(product.id)}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
              style={{ background: isWished ? "rgba(244,63,143,0.2)" : "rgba(255,255,255,0.06)", border: isWished ? "1px solid rgba(244,63,143,0.4)" : "1px solid rgba(255,255,255,0.1)" }}>
              <Heart size={20} fill={isWished ? "#f43f8f" : "none"} className={isWished ? "text-pink-500" : "text-white/50"} />
            </button>
            <button onClick={handleShare}
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
              style={{ background: "rgba(232,121,249,0.08)", border: "1px solid rgba(232,121,249,0.2)" }}>
              {shared ? <Check size={18} style={{ color: "#e879f9" }} /> : <Share2 size={18} style={{ color: "#e879f9" }} />}
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[{ icon: "📦", text: "Discreet shipping" }, { icon: "🔒", text: "100% private" }, { icon: "✅", text: "Body-safe" }].map(b => (
              <div key={b.text} className="card p-3 text-center">
                <p className="text-lg mb-1">{b.icon}</p>
                <p className="text-[10px] text-white/50 font-medium">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-20">
        <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Verified Buyers</p>
        <h2 className="text-2xl font-bold text-white mb-8">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {fakeReviews.map((r, i) => (
            <div key={i} className="card p-5">
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={12} fill={s <= r.rating ? "#facc15" : "none"}
                    className={s <= r.rating ? "text-yellow-400" : "text-white/20"} />
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-4 italic">&ldquo;{r.text}&rdquo;</p>
              <p className="text-white/30 text-xs font-semibold uppercase tracking-widest">{r.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>You Might Also Like</p>
          <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map(p => (
              <Link key={p.id} href={`/shop/${p.id}`} className="card p-4 flex flex-col group">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3"
                  style={{ background: "rgba(232,121,249,0.05)" }}>
                  {p.badge && (
                    <span className="absolute top-2 left-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: "linear-gradient(90deg,#e879f9,#f43f8f)" }}>{p.badge}</span>
                  )}
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1">{p.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={9} fill={i <= Math.round(p.rating) ? "#facc15" : "none"}
                      className={i <= Math.round(p.rating) ? "text-yellow-400" : "text-white/20"} />
                  ))}
                  <span className="text-[10px] text-white/40">({p.reviews})</span>
                </div>
                <div className="flex items-center gap-2 mt-auto">
                  <p className="gradient-text font-bold text-sm">{format(p.salePrice ?? p.price)}</p>
                  {p.salePrice && <p className="text-white/30 text-xs line-through">{format(p.price)}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {showAuth && <AuthModal onClose={handleAuthClose} />}
      {showShipping && (
        <ShippingModal
          product={{ ...product, price: unitPrice }}
          selectedVariant={variant}
          onVariantChange={setVariant}
          onConfirm={handleConfirm}
          onClose={() => setShowShipping(false)}
        />
      )}
    </div>
  );
}
