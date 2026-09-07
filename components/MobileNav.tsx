"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useStore } from "@/context/StoreContext";

const links = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/shop", icon: ShoppingBag, label: "Shop" },
  { href: "/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/cart", icon: ShoppingCart, label: "Cart" },
  { href: "/profile", icon: User, label: "Account" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { count } = useCart();
  const { wishlist } = useStore();

  const badges: Record<string, number> = {
    "/cart": count,
    "/wishlist": wishlist.length,
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t"
      style={{ background: "var(--nav-bg)", backdropFilter: "blur(16px)", borderColor: "var(--color-border-soft)" }}>
      <div className="flex items-center justify-around h-16 px-2">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href === "/shop" && pathname.startsWith("/shop"));
          const badge = badges[href];
          return (
            <Link key={href} href={href}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full relative transition-all">
              <div className="relative">
                <Icon size={20} style={{ color: active ? "#e879f9" : "var(--color-text-40)" }} />
                {badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                    style={{ background: "linear-gradient(90deg,#e879f9,#f43f8f)" }}>
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium"
                style={{ color: active ? "#e879f9" : "var(--color-text-35)" }}>
                {label}
              </span>
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg,#e879f9,#f43f8f)" }} />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
