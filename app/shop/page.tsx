"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";
import { useCurrency } from "@/context/CurrencyContext";
import ShippingModal from "@/components/ShippingModal";
import QuickView from "@/components/QuickView";
import AuthModal from "@/components/AuthModal";
import SaleTimer from "@/components/SaleTimer";
import { ShoppingBag, Search, Star, Users, Share2, Check, Heart, Eye, Minus, Plus, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const CATEGORIES = ["all", "bundles", "vibrators", "dildos", "machines", "accessories", "costumes"] as const;
const SORTS = ["featured", "price-low", "price-high", "rating", "newest"] as const;
type SortKey = typeof SORTS[number];
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
  const [sort, setSort] = useState<SortKey>("featured");
  const [showSort, setShowSort] = useState(false);

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

  const filtered = products
    .filter(p => {
      const matchCat = active === "all" || p.category === active;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sort === "price-low") return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      if (sort === "price-high") return (b.salePrice ?? b.price) - (a.salePrice ?? a.price);
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
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

      <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all capitalize ${active === c ? "btn-primary" : "card text-white/50 hover:text-white"}`}>
              {c === "bundles" ? "🎁 Bundles" : c}
            </button>
          ))}
        </div>
        {/* Sort dropdown */}
        <div className="relative">
          <button onClick={() => setShowSort(!showSort)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold card text-white/60 hover:text-white transition-colors">
            <SlidersHorizontal size={14} />
            <span className="capitalize">{sort.replace("-", " ")}</span>
          </button>
          {showSort && (
            <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl overflow-hidden z-30 shadow-2xl"
              style={{ background: "#0a0010", border: "1px solid rgba(232,121,249,0.2)" }}>
              {SORTS.map(s => (
                <button key={s} onClick={() => { setSort(s); setShowSort(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm capitalize transition-colors hover:bg-white/5"
                  style={{ color: sort === s ? "#e879f9" : "rgba(255,255,255,0.6)", background: sort === s ? "rgba(232,121,249,0.08)" : "transparent" }}>
                  {s.replace("-", " ")}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-white/30">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-lg">No products found for &ldquo;{search}&rdquo;</p>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {filtered.map(p => {
          const isWished = wishlist.includes(p.id);
          return (
            <div key={p.id} id={String(p.id)} className="card p-3 md:p-4 flex flex-col group">
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-2 cursor-pointer"
                style={{ background: "rgba(232,121,249,0.05)" }} onClick={() => { setQuickView(p); addRecentlyViewed(p); }}
                onDoubleClick={() => router.push(`/shop/${p.id}`)}>
                {p.badge && (
                  <span className="absolute top-1.5 left-1.5 z-10 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                    style={{ background: p.badge === "Sale" ? "linear-gradient(90deg,#f43f8f,#fb923c)" : "linear-gradient(90deg,#e879f9,#f43f8f)" }}>
                    {p.badge}
                  </span>
                )}
                {p.isNew && (
                  <span className="absolute top-1.5 right-1.5 z-10 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white"
                    style={{ background: "linear-gradient(90deg,#34d399,#059669)" }}>NEW</span>
                )}
                <Image src={p.image} alt={p.name} fill className="object-cover" />
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
                  <Users size={9} className="text-green-400" />
                  <span className="text-[9px] md:text-[10px] text-green-400 font-medium">{viewers[p.id] ?? p.viewers} viewing</span>
                </div>
                {stockBadge(p.stock)}
              </div>

              <h3 className="font-bold text-xs md:text-sm mb-1 text-white leading-tight">{p.name}</h3>
              <p className="text-white/40 text-[10px] md:text-xs leading-relaxed mb-1 flex-1 line-clamp-2">{p.desc}</p>

              <div className="flex items-center gap-1 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={8} fill={i <= Math.round(p.rating) ? "#facc15" : "none"} className={i <= Math.round(p.rating) ? "text-yellow-400" : "text-white/20"} />)}
                <span className="text-[9px] text-white/40">({p.reviews})</span>
              </div>

              <div className="flex items-center gap-1.5 mb-1">
                <p className="gradient-text font-bold text-sm md:text-base">{format(p.salePrice ?? p.price)}</p>
                {p.salePrice && <p className="text-white/30 text-[10px] line-through">{format(p.price)}</p>}
              </div>
              {p.salePrice && <SaleTimer />}

              {/* Qty selector */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[10px] text-white/40">Qty:</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setQty(p.id, getQty(p.id) - 1)}
                    className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)" }}><Minus size={8} /></button>
                  <span className="text-xs font-semibold text-white w-4 text-center">{String(getQty(p.id))}</span>
                  <button onClick={() => setQty(p.id, getQty(p.id) + 1)}
                    className="w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)" }}><Plus size={8} /></button>
                </div>
              </div>

              {/* Buttons */}
              <button onClick={() => handleSelect(p)}
                className="btn-primary w-full py-2 text-xs flex items-center justify-center gap-1 mb-1.5">
                <ShoppingBag size={11} /> Buy Now
              </button>
              <div className="flex gap-1.5">
                <button onClick={() => toggleWishlist(p.id)}
                  className="flex-1 h-7 rounded-full flex items-center justify-center transition-all"
                  style={{ background: isWished ? "rgba(244,63,143,0.2)" : "rgba(255,255,255,0.06)", border: isWished ? "1px solid rgba(244,63,143,0.4)" : "1px solid rgba(255,255,255,0.1)" }}>
                  <Heart size={11} fill={isWished ? "#f43f8f" : "none"} className={isWished ? "text-pink-500" : "text-white/40"} />
                </button>
                <button onClick={() => handleShare(p)}
                  className="flex-1 h-7 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "rgba(232,121,249,0.08)", border: "1px solid rgba(232,121,249,0.15)" }}>
                  {shared === p.id ? <Check size={11} style={{ color: "#e879f9" }} /> : <Share2 size={11} style={{ color: "#e879f9" }} />}
                </button>
                <Link href={`/shop/${p.id}`}
                  className="flex-1 h-7 rounded-full flex items-center justify-center transition-all text-[10px] font-semibold"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                  Details
                </Link>
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
