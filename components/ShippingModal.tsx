"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

type Product = { id: number; name: string; price: number; image: string; variants?: { label: string; price?: number }[] };
type ShippingInfo = { fullName: string; email: string; phone: string; address: string; city: string; country: string };

type Props = {
  product: Product;
  selectedVariant: string;
  onVariantChange: (v: string) => void;
  onConfirm: (info: ShippingInfo) => void;
  onClose: () => void;
};

export default function ShippingModal({ product, selectedVariant, onVariantChange, onConfirm, onClose }: Props) {
  const { format } = useCurrency();
  const [info, setInfo] = useState<ShippingInfo>({ fullName: "", email: "", phone: "", address: "", city: "", country: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onConfirm(info);
  }

  const variantPrice = product.variants?.find(v => v.label === selectedVariant)?.price;
  const displayPrice = variantPrice ?? product.price;
  const isValid = Object.values(info).every(v => v.trim() !== "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={onClose}>
      <div className="card w-full max-w-md p-7 relative max-h-[90vh] overflow-y-auto"
        style={{ border: "1px solid rgba(232,121,249,0.2)" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-5 text-white/30 hover:text-white transition-colors">
          <X size={18} />
        </button>

        <p className="text-xs uppercase tracking-[0.4em] mb-1" style={{ color: "#e879f9" }}>Shipping Details</p>
        <h2 className="text-xl font-bold text-white mb-1">{product.name}</h2>
        <p className="gradient-text font-bold text-lg mb-5">{format(displayPrice)}</p>

        {/* Variant selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-5">
            <p className="text-xs text-white/40 mb-2 uppercase tracking-wider">Select Option</p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map(v => (
                <button key={v.label} onClick={() => onVariantChange(v.label)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedVariant === v.label ? "btn-primary" : "text-white/50 hover:text-white"}`}
                  style={selectedVariant !== v.label ? { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" } : {}}>
                  {v.label}{v.price ? ` (+${format(v.price - product.price)})` : ""}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {[
            { name: "fullName", placeholder: "Full Name" },
            { name: "email", placeholder: "Email Address" },
            { name: "phone", placeholder: "Phone Number" },
            { name: "address", placeholder: "Street Address" },
            { name: "city", placeholder: "City" },
            { name: "country", placeholder: "Country" },
          ].map(field => (
            <input key={field.name} name={field.name} placeholder={field.placeholder}
              value={info[field.name as keyof ShippingInfo]}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,121,249,0.15)" }} />
          ))}

          <button type="submit" disabled={!isValid}
            className="btn-primary w-full py-3 text-sm mt-2 disabled:opacity-40 disabled:cursor-not-allowed">
            Continue to Payment
          </button>
        </form>
        <p className="text-white/25 text-xs text-center mt-4">Your details are only used for shipping purposes.</p>
      </div>
    </div>
  );
}
