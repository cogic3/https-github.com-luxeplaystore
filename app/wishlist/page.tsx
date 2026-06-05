"use client";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { useCurrency } from "@/context/CurrencyContext";
import { products } from "@/lib/products";
import { Heart, ShoppingBag, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import ShippingModal from "@/components/ShippingModal";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";

type Product = typeof products[0];

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useStore();
  const { format } = useCurrency();
  const { add, setShipping } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [selected, setSelected] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);

  const wishedProducts = products.filter(p => wishlist.includes(p.id));

  function handleBuyNow(p: Product) {
    if (!user) {
      setPendingProduct(p);
      setShowAuth(true);
      return;
    }
    setSelected(p);
    setSelectedVariant(p.variants?.[0]?.label ?? "");
  }

  function handleAuthClose() {
    setShowAuth(false);
    if (user && pendingProduct) {
      setSelected(pendingProduct);
      setSelectedVariant(pendingProduct.variants?.[0]?.label ?? "");
      setPendingProduct(null);
    }
  }

  function handleConfirm(info: Parameters<typeof setShipping>[0]) {
    const variant = selected!.variants?.find(v => v.label === selectedVariant);
    const price = variant?.price ?? selected!.salePrice ?? selected!.price;
    add({ id: selected!.id, name: selected!.name + (selectedVariant ? ` (${selectedVariant})` : ""), price, image: selected!.image });
    setShipping(info);
    setSelected(null);
    router.push("/cart");
  }

  if (wishedProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <Heart size={56} className="text-white/10" />
        <h2 className="text-2xl font-bold text-white/70">Your wishlist is empty</h2>
        <p className="text-white/40 text-sm">Like a product on the shop page to save it here.</p>
        <Link href="/shop" className="btn-primary px-8 py-3 text-sm mt-2">Browse Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-24 px-6 max-w-6xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Saved Items</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-2">
        <span className="gradient-text">Wishlist</span>
      </h1>
      <p className="text-white/40 text-sm mb-10">{wishedProducts.length} item{wishedProducts.length !== 1 ? "s" : ""} saved</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishedProducts.map(p => (
          <div key={p.id} className="card p-4 flex flex-col">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3"
              style={{ background: "rgba(232,121,249,0.05)" }}>
              {p.badge && (
                <span className="absolute top-2 left-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: "linear-gradient(90deg,#e879f9,#f43f8f)" }}>{p.badge}</span>
              )}
              <Image src={p.image} alt={p.name} fill className="object-cover" />
            </div>

            <h3 className="font-bold text-sm mb-1 text-white">{p.name}</h3>
            <p className="text-white/40 text-xs leading-relaxed mb-2 flex-1 line-clamp-2">{p.desc}</p>

            <div className="flex items-center gap-1 mb-2">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={10} fill={i <= Math.round(p.rating) ? "#facc15" : "none"}
                  className={i <= Math.round(p.rating) ? "text-yellow-400" : "text-white/20"} />
              ))}
              <span className="text-[10px] text-white/40">({p.reviews})</span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <p className="gradient-text font-bold">{format(p.salePrice ?? p.price)}</p>
              {p.salePrice && <p className="text-white/30 text-xs line-through">{format(p.price)}</p>}
            </div>

            <div className="flex gap-2">
              <button onClick={() => handleBuyNow(p)}
                className="btn-primary flex-1 py-2 text-xs flex items-center justify-center gap-1.5">
                <ShoppingBag size={12} /> Buy Now
              </button>
              <button onClick={() => toggleWishlist(p.id)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: "rgba(244,63,143,0.15)", border: "1px solid rgba(244,63,143,0.3)" }}
                title="Remove from wishlist">
                <Trash2 size={12} className="text-pink-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAuth && <AuthModal onClose={handleAuthClose} />}

      {selected && (
        <ShippingModal
          product={{ ...selected, price: selected.salePrice ?? selected.price }}
          selectedVariant={selectedVariant}
          onVariantChange={setSelectedVariant}
          onConfirm={handleConfirm}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
