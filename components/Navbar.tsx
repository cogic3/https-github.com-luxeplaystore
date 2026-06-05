"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useCurrency, CURRENCIES } from "@/context/CurrencyContext";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { ShoppingBag, Menu, X, ChevronDown, Heart, User, LogOut, Sun, Moon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import AuthModal from "@/components/AuthModal";

function CurrencyDropdown() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = CURRENCIES.find(c => c.code === currency)!;

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative hidden md:block">
      <button onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg text-white/60 hover:text-white transition-colors"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <span>{active.flag}</span>
        <span className="font-semibold">{active.code}</span>
        <span className="font-medium" style={{ color: "#e879f9" }}>{active.symbol}</span>
        <ChevronDown size={12} style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl overflow-hidden z-50 shadow-2xl"
          style={{ background: "#0a0010", border: "1px solid rgba(232,121,249,0.2)", maxHeight: "320px", overflowY: "auto" }}>
          {CURRENCIES.map(c => (
            <button key={c.code} onClick={() => { setCurrency(c.code); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/5"
              style={{ background: currency === c.code ? "rgba(232,121,249,0.1)" : "transparent" }}>
              <span className="text-lg">{c.flag}</span>
              <span className="text-white/80 text-xs font-semibold flex-1">{c.name}</span>
              <span className="text-xs font-bold" style={{ color: currency === c.code ? "#e879f9" : "rgba(255,255,255,0.3)" }}>
                {c.code} {c.symbol}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { count } = useCart();
  const { currency, setCurrency } = useCurrency();
  const { wishlist } = useStore();
  const { user, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUserMenu(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <header className="fixed top-10 inset-x-0 z-50 border-b border-white/6"
        style={{ background: "rgba(10,0,16,0.9)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">

          {/* Left — logo + nav links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-lg font-bold gradient-text tracking-tight">LuxePlay</Link>
            <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white/60 hover:text-white p-1" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Right — icons */}
          <div className="flex items-center gap-0.5 md:gap-1">
            <CurrencyDropdown />

            {/* Theme toggle */}
            <button onClick={toggle}
              className="p-2 rounded-xl text-white/60 hover:text-white transition-colors hidden md:flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Auth */}
            {user ? (
              <div ref={userRef} className="relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/70 hover:text-white transition-colors"
                  style={{ background: "rgba(232,121,249,0.08)", border: "1px solid rgba(232,121,249,0.15)" }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "linear-gradient(90deg,#e879f9,#f43f8f)" }}>
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="hidden md:block text-xs font-semibold">{user.name.split(" ")[0]}</span>
                  <ChevronDown size={12} />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl overflow-hidden z-50 shadow-2xl"
                    style={{ background: "#0a0010", border: "1px solid rgba(232,121,249,0.2)" }}>
                    <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(232,121,249,0.1)" }}>
                      <p className="text-white font-semibold text-sm">{user.name}</p>
                      <p className="text-white/40 text-xs truncate">{user.email}</p>
                    </div>
                    <Link href="/profile" onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                      <User size={14} /> My Profile
                    </Link>
                    <Link href="/wishlist" onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                      <Heart size={14} /> Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                    </Link>
                    <button onClick={() => { logout(); setShowUserMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors">
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => setShowAuth(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white/70 hover:text-white transition-colors"
                style={{ background: "rgba(232,121,249,0.08)", border: "1px solid rgba(232,121,249,0.15)" }}>
                <User size={14} /> Sign In
              </button>
            )}

            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2">
              <Heart size={20} className="text-white/70 hover:text-white transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ background: "linear-gradient(90deg,#f43f8f,#e879f9)" }}>
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2">
              <ShoppingBag size={20} className="text-white/70 hover:text-white transition-colors" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ background: "linear-gradient(90deg,#e879f9,#f43f8f)" }}>
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/6 px-6 py-4 flex flex-col gap-4 text-sm text-white/60"
            style={{ background: "rgba(10,0,16,0.97)" }}>
            <Link href="/" onClick={() => setOpen(false)} className="hover:text-white transition-colors">Home</Link>
            <Link href="/shop" onClick={() => setOpen(false)} className="hover:text-white transition-colors">Shop</Link>
            <Link href="/wishlist" onClick={() => setOpen(false)} className="hover:text-white transition-colors">Wishlist {wishlist.length > 0 && `(${wishlist.length})`}</Link>
            <Link href="/faq" onClick={() => setOpen(false)} className="hover:text-white transition-colors">FAQ</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-white transition-colors">Contact</Link>
            {user ? (
              <>
                <Link href="/profile" onClick={() => setOpen(false)} className="hover:text-white transition-colors">My Profile</Link>
                <button onClick={() => { logout(); setOpen(false); }} className="text-left text-red-400 hover:text-red-300 transition-colors">Sign Out</button>
              </>
            ) : (
              <button onClick={() => { setShowAuth(true); setOpen(false); }} className="text-left hover:text-white transition-colors" style={{ color: "#e879f9" }}>
                Sign In / Sign Up
              </button>
            )}
            <button onClick={() => { toggle(); setOpen(false); }}
              className="flex items-center gap-2 hover:text-white transition-colors"
              style={{ color: "#e879f9" }}>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <div className="flex flex-wrap gap-2 pt-2">
              {CURRENCIES.map(c => (
                <button key={c.code} onClick={() => { setCurrency(c.code); setOpen(false); }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${currency === c.code ? "btn-primary" : "text-white/40 hover:text-white"}`}
                  style={currency !== c.code ? { background: "rgba(255,255,255,0.05)" } : {}}>
                  {c.flag} {c.code}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
