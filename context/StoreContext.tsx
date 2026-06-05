"use client";
import { createContext, useContext, useState } from "react";
import { Product } from "@/lib/products";

type StoreCtx = {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  recentlyViewed: Product[];
  addRecentlyViewed: (p: Product) => void;
};

const Ctx = createContext<StoreCtx>({} as StoreCtx);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  function toggleWishlist(id: number) {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }

  function addRecentlyViewed(p: Product) {
    setRecentlyViewed(prev => [p, ...prev.filter(x => x.id !== p.id)].slice(0, 6));
  }

  return <Ctx.Provider value={{ wishlist, toggleWishlist, recentlyViewed, addRecentlyViewed }}>{children}</Ctx.Provider>;
}

export const useStore = () => useContext(Ctx);
