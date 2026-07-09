"use client";
import { useState } from "react";
import { X, ShoppingBag, Heart, Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Product, products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = { product: Product; onClose: () => void; onBuy: () => void };

export default function QuickView({ product: p, onClose, onBuy }: Props) {
  const { format } = useCurrency();
  const { wishlist, toggleWishlist } = useStore();
  const [imgIdx, setImgIdx] = useState(0);
  const [variant, setVariant] = useState(p.variants?.[0]?.label ?? "");
  const isWished = wishlist.includes(p.id);
  const related = products.filter(r => r.category === p.category && r.id !== p.id).slice(0, 3);

  const stockColor = p.stock <= 3 ? "#f43f8f" : p.stock <= 8 ? "#fb923c" : "#34d399";
  const stockText = p.stock <= 3 ? `Only ${p.stock} left!` : p.stock <= 8 ? `${p.stock} in stock` : "In Stock";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md" onClick={onClose}>
      <div className="card w-full max-w-2xl p-0 overflow-hidden relative flex flex-col md:flex-row"
        style={{ border: "1px solid rgba(232,121,249,0.2)" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white/40 hover:text-white transition-colors">
          <X size={18} />
        </button>

        {/* Image gallery */}
        <div className="md:w-56 shrink-0 flex flex-col gap-2 p-4" style={{ background: "rgba(232,121,249,0.04)" }}>
          <div className="w-full aspect-square rounded-xl overflow-hidden relative"
            style={{ background: "rgba(232,121,249,0.08)" }}>
            <Image src={p.images[imgIdx] ?? p.image} alt={p.name} fill className="object-cover" />
          </div>
          <div className="flex gap-2">
            {p.images.slice(0, 3).map((img, i) => (
              <button key={i} onClick={() => setImgIdx(i)}
                className="flex-1 aspect-square rounded-lg overflow-hidden relative transition-all"
                style={{ border: imgIdx === i ? "1px solid rgba(232,121,249,0.4)" : "1px solid rgba(255,255,255,0.06)" }}>
                <Image src={img} alt={p.name} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 p-6 flex flex-col">
          {p.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white w-fit mb-3"
              style={{ background: "linear-gradient(90deg,#e879f9,#f43f8f)" }}>{p.badge}</span>
          )}
          <h2 className="text-xl font-bold text-white mb-1">{p.name}</h2>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} size={12} fill={i <= Math.round(p.rating) ? "#facc15" : "none"} className={i <= Math.round(p.rating) ? "text-yellow-400" : "text-white/20"} />)}
            </div>
            <span className="text-xs text-white/40">{p.rating} ({p.reviews} reviews)</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <p className="gradient-text font-bold text-xl">{format(p.salePrice ?? p.price)}</p>
            {p.salePrice && <p className="text-white/30 text-sm line-through">{format(p.price)}</p>}
          </div>

          <p className="text-xs font-semibold mb-4" style={{ color: stockColor }}>● {stockText}</p>

          <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>

          {p.variants && (
            <div className="mb-4">
              <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Option</p>
              <div className="flex flex-wrap gap-2">
                {p.variants.map(v => (
                  <button key={v.label} onClick={() => setVariant(v.label)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${variant === v.label ? "btn-primary" : "text-white/50"}`}
                    style={variant !== v.label ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" } : {}}>
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 mt-auto">
            <button onClick={onBuy} className="btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-2">
              <ShoppingBag size={14} /> Buy Now
            </button>
            <button onClick={() => toggleWishlist(p.id)}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
              style={{ background: isWished ? "rgba(244,63,143,0.2)" : "rgba(255,255,255,0.06)", border: isWished ? "1px solid rgba(244,63,143,0.4)" : "1px solid rgba(255,255,255,0.1)" }}>
              <Heart size={14} fill={isWished ? "#f43f8f" : "none"} className={isWished ? "text-pink-500" : "text-white/50"} />
            </button>
          </div>

          <Link href={`/shop/${p.id}`} onClick={onClose}
            className="mt-3 flex items-center justify-center gap-1 text-xs font-semibold transition-colors hover:text-white"
            style={{ color: "#e879f9" }}>
            View Full Details <ArrowRight size={12} />
          </Link>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "rgba(232,121,249,0.1)" }}>
              <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3">You May Also Like</p>
              <div className="flex gap-2">
                {related.map(r => (
                  <Link key={r.id} href={`/shop/${r.id}`} onClick={onClose} className="flex-1 group">
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-1"
                      style={{ background: "rgba(232,121,249,0.05)" }}>
                      <Image src={r.image} alt={r.name} fill className="object-cover" />
                    </div>
                    <p className="text-[10px] text-white/60 font-semibold leading-tight line-clamp-1">{r.name}</p>
                    <p className="text-[10px] gradient-text font-bold">{format(r.salePrice ?? r.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
