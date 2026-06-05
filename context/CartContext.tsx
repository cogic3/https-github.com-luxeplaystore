"use client";
import { createContext, useContext, useState } from "react";

export type CartItem = { id: number; name: string; price: number; image: string; qty: number };
export type ShippingInfo = { fullName: string; email: string; phone: string; address: string; city: string; country: string };

const PROMO_CODES: Record<string, number> = { "LUXE10": 10, "SAVE20": 20, "VIP15": 15 };

type CartCtx = {
  items: CartItem[];
  shipping: ShippingInfo | null;
  promoCode: string;
  discount: number;
  promoError: string;
  applyPromo: (code: string) => void;
  add: (p: Omit<CartItem, "qty"> & { qty?: number }) => void;
  remove: (id: number) => void;
  update: (id: number, qty: number) => void;
  setShipping: (info: ShippingInfo) => void;
  total: number;
  discountedTotal: number;
  count: number;
};

const Ctx = createContext<CartCtx>({} as CartCtx);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [shipping, setShipping] = useState<ShippingInfo | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  function add(p: Omit<CartItem, "qty"> & { qty?: number }) {
    const incoming = p.qty ?? 1;
    setItems(prev => {
      const existing = prev.find(i => i.id === p.id);
      if (existing) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + incoming } : i);
      return [...prev, { ...p, qty: incoming }];
    });
  }

  function remove(id: number) { setItems(prev => prev.filter(i => i.id !== id)); }

  function update(id: number, qty: number) {
    if (qty < 1) return remove(id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }

  function applyPromo(code: string) {
    const upper = code.trim().toUpperCase();
    if (PROMO_CODES[upper]) {
      setPromoCode(upper);
      setDiscount(PROMO_CODES[upper]);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoCode("");
      setDiscount(0);
    }
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discountedTotal = total - (total * discount) / 100;
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <Ctx.Provider value={{ items, shipping, promoCode, discount, promoError, applyPromo, add, remove, update, setShipping, total, discountedTotal, count }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => useContext(Ctx);
