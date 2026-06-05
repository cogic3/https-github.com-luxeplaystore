"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { products } from "@/lib/products";
import { Trash2, Minus, Plus, Copy, Check, Upload, Tag } from "lucide-react";

const BITCOIN_ADDRESS = "bc1qqhfn3ynvmwvua6cm6nca5emd4ptup82upc70kr";

export default function Cart() {
  const { items, remove, update, total, discountedTotal, discount, promoCode, promoError, applyPromo, shipping } = useCart();
  const { format } = useCurrency();
  const [copied, setCopied] = useState(false);
  const [payMethod, setPayMethod] = useState<"bitcoin" | "giftcard">("bitcoin");
  const [giftFile, setGiftFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [promoInput, setPromoInput] = useState("");

  const cartIds = items.map(i => i.id);
  const suggestions = products.filter(p => !cartIds.includes(p.id)).slice(0, 4);

  function copyAddress() {
    navigator.clipboard.writeText(BITCOIN_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleGiftUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setGiftFile(file);
    setUploading(true);
    const formData = new FormData();
    formData.append("UPLOADCARE_PUB_KEY", "49dcad9248214e3c0483");
    formData.append("UPLOADCARE_STORE", "1");
    formData.append("file", file);
    await fetch("https://upload.uploadcare.com/base/", { method: "POST", body: formData });
    setUploading(false);
    setUploadDone(true);
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <p className="text-5xl">🛍️</p>
        <h2 className="text-2xl font-bold text-white/80">Your cart is empty</h2>
        <Link href="/shop" className="btn-primary px-8 py-3 text-sm mt-2">Browse Shop</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-24 px-4 md:px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-10"><span className="gradient-text">Order Receipt</span></h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left */}
        <div className="flex flex-col gap-6">
          {/* Items */}
          <div className="card p-6">
            <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#e879f9" }}>Your Items</p>
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0"
                    style={{ background: "rgba(232,121,249,0.05)" }}>
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-sm">{item.name}</p>
                    <p className="gradient-text font-bold text-sm">{format(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => update(item.id, item.qty - 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white"
                      style={{ background: "rgba(255,255,255,0.06)" }}><Minus size={12} /></button>
                    <span className="w-5 text-center text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => update(item.id, item.qty + 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white/50 hover:text-white"
                      style={{ background: "rgba(255,255,255,0.06)" }}><Plus size={12} /></button>
                  </div>
                  <p className="text-white/50 text-sm w-16 text-right">{format(item.price * item.qty)}</p>
                  <button onClick={() => remove(item.id)} className="text-white/20 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          {shipping && (
            <div className="card p-6">
              <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#e879f9" }}>Shipping To</p>
              <div className="flex flex-col gap-2 text-sm">
                {[["Name", shipping.fullName], ["Email", shipping.email], ["Phone", shipping.phone], ["Address", shipping.address], ["City", shipping.city], ["Country", shipping.country]].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-white/40">{k}</span>
                    <span className="text-white text-right max-w-[60%]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right */}
        <div className="flex flex-col gap-6">
          {/* Order total */}
          <div className="card p-6">
            <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#e879f9" }}>Order Total</p>
            <div className="flex justify-between text-white/50 text-sm mb-2">
              <span>Subtotal</span><span>{format(total)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm mb-2" style={{ color: "#34d399" }}>
                <span>Discount ({promoCode})</span><span>-{discount}%</span>
              </div>
            )}
            <div className="flex justify-between text-white/50 text-sm mb-4">
              <span>Shipping</span><span>Varies by location</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg mb-5"
              style={{ borderColor: "rgba(232,121,249,0.15)" }}>
              <span className="text-white">Total</span>
              <span className="gradient-text">{format(discountedTotal)}</span>
            </div>

            {/* Promo code */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input value={promoInput} onChange={e => setPromoInput(e.target.value)}
                  placeholder="Promo code"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm text-white placeholder-white/30 outline-none"
                  style={{ background: "rgba(232,121,249,0.05)", border: `1px solid ${promoError ? "rgba(244,63,143,0.4)" : "rgba(232,121,249,0.15)"}` }} />
              </div>
              <button onClick={() => applyPromo(promoInput)}
                className="btn-primary px-4 py-2.5 text-xs shrink-0">Apply</button>
            </div>
            {promoError && <p className="text-xs mt-1.5" style={{ color: "#f43f8f" }}>{promoError}</p>}
            {discount > 0 && <p className="text-xs mt-1.5" style={{ color: "#34d399" }}>✅ Promo applied! {discount}% off</p>}
          </div>

          {/* Payment */}
          <div className="card p-6">
            <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "#e879f9" }}>Payment Method</p>
            <div className="flex gap-2 mb-6">
              <button onClick={() => setPayMethod("bitcoin")}
                className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${payMethod === "bitcoin" ? "btn-primary" : "card text-white/50 hover:text-white"}`}>
                ₿ Bitcoin
              </button>
              <button onClick={() => setPayMethod("giftcard")}
                className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${payMethod === "giftcard" ? "btn-primary" : "card text-white/50 hover:text-white"}`}>
                🎁 Gift Card
              </button>
            </div>

            {payMethod === "bitcoin" && (
              <>
                <div className="flex justify-center mb-4">
                  <img src="/qr.jpg" alt="Bitcoin QR" className="w-44 h-44 rounded-xl" style={{ border: "1px solid rgba(232,121,249,0.2)" }} />
                </div>
                <p className="text-white/40 text-xs mb-3 text-center">Scan QR or copy address below</p>
                <div className="rounded-xl p-3 mb-4 flex items-center justify-between gap-2"
                  style={{ background: "rgba(232,121,249,0.06)", border: "1px solid rgba(232,121,249,0.15)" }}>
                  <p className="text-xs font-mono break-all" style={{ color: "#e879f9" }}>{BITCOIN_ADDRESS}</p>
                  <button onClick={copyAddress}
                    className="shrink-0 flex items-center gap-1 text-xs px-3 py-1.5 rounded-full"
                    style={{ background: copied ? "rgba(232,121,249,0.3)" : "rgba(232,121,249,0.15)", color: "#e879f9" }}>
                    {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                  </button>
                </div>
                <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer"
                  className="btn-primary w-full py-3 text-sm text-center block">Confirm Order via Telegram</a>
                <p className="text-white/25 text-xs text-center mt-3 leading-relaxed">After paying, send us your transaction ID on Telegram.</p>
              </>
            )}

            {payMethod === "giftcard" && (
              <>
                <p className="text-white/50 text-sm mb-1">Any gift card accepted.</p>
                <p className="text-white/30 text-xs mb-5">Upload a clear photo of your gift card showing the card code.</p>
                {!uploadDone ? (
                  <label className="block w-full cursor-pointer rounded-xl p-8 text-center mb-4 transition-all"
                    style={{ border: "2px dashed rgba(232,121,249,0.2)", background: "rgba(232,121,249,0.03)" }}>
                    <input type="file" accept="image/*" className="hidden" onChange={handleGiftUpload} />
                    <Upload size={28} className="mx-auto mb-3" style={{ color: "#e879f9" }} />
                    {uploading ? <p className="text-white/40 text-sm">Uploading...</p> : (
                      <>
                        <p className="text-white/60 text-sm font-semibold">{giftFile ? giftFile.name : "Click to upload gift card photo"}</p>
                        <p className="text-white/25 text-xs mt-1">JPG, PNG, WEBP supported</p>
                      </>
                    )}
                  </label>
                ) : (
                  <div className="rounded-xl p-5 text-center mb-4" style={{ background: "rgba(232,121,249,0.08)", border: "1px solid rgba(232,121,249,0.2)" }}>
                    <p className="text-2xl mb-2">✅</p>
                    <p className="text-white font-semibold text-sm">Gift card uploaded!</p>
                    <p className="text-white/40 text-xs mt-1">{giftFile?.name}</p>
                  </div>
                )}
                <a href="https://t.me/luxeplayadmin" target="_blank" rel="noopener noreferrer"
                  className="btn-primary w-full py-3 text-sm text-center block">Confirm Order via Telegram</a>
                <p className="text-white/25 text-xs text-center mt-3 leading-relaxed">After uploading, message us on Telegram to confirm.</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* You may also like */}
      {suggestions.length > 0 && (
        <div className="mt-16">
          <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Don&apos;t Miss Out</p>
          <h2 className="text-2xl font-bold text-white mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {suggestions.map(p => (
              <Link href="/shop" key={p.id} className="card p-4 flex flex-col">
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-3"
                  style={{ background: "rgba(232,121,249,0.05)" }}>
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-sm text-white mb-1">{p.name}</h3>
                <p className="gradient-text font-bold text-sm mt-auto">{format(p.salePrice ?? p.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
