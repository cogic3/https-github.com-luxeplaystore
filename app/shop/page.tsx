"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { useCurrency } from "@/context/CurrencyContext";
import ShippingModal from "@/components/ShippingModal";
import QuickView from "@/components/QuickView";
import AuthModal from "@/components/AuthModal";
import { ShoppingBag, Search, Star, Users, Share2, Check, Heart, Eye, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const CATEGORIES = ["all", "vibrators", "dildos", "machines", "accessories", "costumes"] as const;
type Product = typeof products[0];

export default function Shop() {
  const { add, setShipping } = useCart();
  const { wishlist, toggleWishlist, addRecentlyViewed } = useStore();
  const { format } = useCurrency();
  const { user } = useAuth();
  const router = useRouter();
  const [active, setActive] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [pendingProduct, setPendingProduct] = useState<Product | null>(null);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [shared, setShared] = useState<number | null>(null);
  const [viewers, setViewers] = useState<Record<number, number>>({});
  const [qtys, setQtys] = useState<Record<number, number>>({});

  function getQty(id: number) { return qtys[id] !== undefined ? qtys[id] : 1; }
  function setQty(id: number, q: number) { setQtys(prev => ({ ...prev, [id]: Math.max(1, q) })); }

  useEffect(() => {
    const v: Record<number, number> = {};
    products.forEach(p => { v[p.id] = p.viewers + Math.floor(Math.random() * 4); });
    setViewers(v);
    const interval = setInterval(() => {
      setViewers(prev => {
        const next = { ...prev };
        const id = products[Math.floor(Math.random() * products.length)].id;
        next[id] = Math.max(1, next[id] + (Math.random() > 0.5 ? 1 : -1));
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const filtered = products.filter(p => {
    const matchCat = active === "all" || p.category === active;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  function handleSelect(p: Product) {
    if (!user) {
      setPendingProduct(p);
      setShowAuth(true);
      return;
    }
    setSelected(p);
    setSelectedVariant(p.variants?.[0]?.label ?? "");
    addRecentlyViewed(p);
  }

  function handleAuthClose() {
    setShowAuth(false);
    if (user && pendingProduct) {
      setSelected(pendingProduct);
      setSelectedVariant(pendingProduct.variants?.[0]?.label ?? "");
      addRecentlyViewed(pendingProduct);
      setPendingProduct(null);
    }
  }

  function handleConfirm(info: Parameters<typeof setShipping>[0]) {
    const variant = selected!.variants?.find(v => v.label === selectedVariant);
    const unitPrice = variant?.price ?? selected!.salePrice ?? selected!.price;
    const quantity = getQty(selected!.id);
    add({ id: selected!.id, name: selected!.name + (selectedVariant ? ` (${selectedVariant})` : ""), price: unitPrice, image: selected!.image, qty: quantity });
    setShipping(info);
    setSelected(null);
    router.push("/cart");
  }

  function handleShare(p: Product) {
    navigator.clipboard.writeText(window.location.href + "#" + p.id);
    setShared(p.id);
    setTimeout(() => setShared(null), 2000);
  }

  function stockBadge(stock: number) {
    if (stock <= 3) return <span className="text-[10px] font-semibold" style={{ color: "#f43f8f" }}>🔴 Only {stock} left!</span>;
    if (stock <= 8) return <span className="text-[10px] font-semibold" style={{ color: "#fb923c" }}>🟠 {stock} in stock</span>;
    return <span className="text-[10px] font-semibold" style={{ color: "#34d399" }}>🟢 In Stock</span>;
  }

  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-24 px-4 md:px-6 max-w-6xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-2">Our Collection</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-8"><span className="gradient-text">Shop</span></h1>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
          className="w-full pl-10 pr-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none"
          style={{ background: "rgba(232,121,249,0.05)", border: "1px solid rgba(232,121,249,0.15)" }} />
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setActive(c)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all capitalize ${active === c ? "btn-primary" : "card text-white/50 hover:text-white"}`}>
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/30">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg">No products found for &ldquo;{search}&rdquo;</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map(p => {
          const isWished = wishlist.includes(p.id);
          return (
            <div key={p.id} id={String(p.id)} className="card p-4 flex flex-col group">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3 cursor-pointer"
                style={{ background: "rgba(232,121,249,0.05)" }} onClick={() => { setQuickView(p); addRecentlyViewed(p); }}>
                {p.badge && (
                  <span className="absolute top-2 left-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ background: p.badge === "Sale" ? "linear-gradient(90deg,#f43f8f,#fb923c)" : "linear-gradient(90deg,#e879f9,#f43f8f)" }}>
                    {p.badge}
                  </span>
                )}
                {p.isNew && (
                  <span className="absolute top-2 right-2 z-10 text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ background: "linear-gradient(90deg,#34d399,#059669)" }}>NEW</span>
                )}
                <Image src={p.image} alt={p.name} fill className="object-cover" />
                {/* Quick view overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "rgba(10,0,16,0.5)" }}>
                  <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                    style={{ background: "rgba(232,121,249,0.3)" }}>
                    <Eye size={12} /> Quick View
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1">
                  <Users size={10} className="text-green-400" />
                  <span className="text-[10px] text-green-400 font-medium">{viewers[p.id] ?? p.viewers} viewing</span>
                </div>
                {stockBadge(p.stock)}
              </div>

              <h3 className="font-bold text-sm mb-1 text-white">{p.name}</h3>
              <p className="text-white/40 text-xs leading-relaxed mb-2 flex-1 line-clamp-2">{p.desc}</p>

              <div className="flex items-center gap-1.5 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} size={10} fill={i <= Math.round(p.rating) ? "#facc15" : "none"} className={i <= Math.round(p.rating) ? "text-yellow-400" : "text-white/20"} />)}
                <span className="text-[10px] text-white/40">{p.rating} ({p.reviews})</span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <p className="gradient-text font-bold text-base">{format(p.salePrice ?? p.price)}</p>
                {p.salePrice && <p className="text-white/30 text-xs line-through">{format(p.price)}</p>}
              </div>

              {/* Qty selector */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-white/40">Qty:</span>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => setQty(p.id, getQty(p.id) - 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)" }}><Minus size={10} /></button>
                  <span className="text-xs font-semibold text-white w-4 text-center">{String(getQty(p.id))}</span>
                  <button onClick={() => setQty(p.id, getQty(p.id) + 1)}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)" }}><Plus size={10} /></button>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleSelect(p)}
                  className="btn-primary flex-1 py-2 text-xs flex items-center justify-center gap-1.5">
                  <ShoppingBag size={12} /> Buy Now
                </button>
                <button onClick={() => toggleWishlist(p.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: isWished ? "rgba(244,63,143,0.2)" : "rgba(255,255,255,0.06)", border: isWished ? "1px solid rgba(244,63,143,0.4)" : "1px solid rgba(255,255,255,0.1)" }}>
                  <Heart size={12} fill={isWished ? "#f43f8f" : "none"} className={isWished ? "text-pink-500" : "text-white/40"} />
                </button>
                <button onClick={() => handleShare(p)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "rgba(232,121,249,0.08)", border: "1px solid rgba(232,121,249,0.15)" }}>
                  {shared === p.id ? <Check size={12} style={{ color: "#e879f9" }} /> : <Share2 size={12} style={{ color: "#e879f9" }} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showAuth && <AuthModal onClose={handleAuthClose} />}

      {quickView && (
        <QuickView product={quickView} onClose={() => setQuickView(null)} onBuy={() => { handleSelect(quickView); setQuickView(null); }} />
      )}

      {selected && (
        <ShippingModal product={{ ...selected, price: selected.salePrice ?? selected.price }} selectedVariant={selectedVariant}
          onVariantChange={setSelectedVariant} onConfirm={handleConfirm} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
