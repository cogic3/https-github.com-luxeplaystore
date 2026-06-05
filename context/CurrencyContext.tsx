"use client";
import { createContext, useContext, useState } from "react";

export type Currency = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY" | "CNY" | "INR" | "BRL" | "MXN" | "ZAR" | "NGN" | "GHS" | "KES" | "AED" | "SAR" | "CHF" | "SEK" | "NOK" | "DKK" | "SGD" | "HKD" | "NZD" | "TRY" | "RUB" | "PKR" | "BDT" | "PHP" | "THB" | "IDR" | "MYR" | "EGP" | "COP" | "ARS" | "CLP" | "PEN";

export const CURRENCIES: { code: Currency; flag: string; name: string; symbol: string; rate: number }[] = [
  { code: "USD", flag: "🇺🇸", name: "US Dollar",          symbol: "$",   rate: 1 },
  { code: "EUR", flag: "🇪🇺", name: "Euro",               symbol: "€",   rate: 0.92 },
  { code: "GBP", flag: "🇬🇧", name: "British Pound",      symbol: "£",   rate: 0.79 },
  { code: "CAD", flag: "🇨🇦", name: "Canadian Dollar",    symbol: "C$",  rate: 1.36 },
  { code: "AUD", flag: "🇦🇺", name: "Australian Dollar",  symbol: "A$",  rate: 1.53 },
  { code: "JPY", flag: "🇯🇵", name: "Japanese Yen",       symbol: "¥",   rate: 149.5 },
  { code: "CNY", flag: "🇨🇳", name: "Chinese Yuan",       symbol: "¥",   rate: 7.24 },
  { code: "INR", flag: "🇮🇳", name: "Indian Rupee",       symbol: "₹",   rate: 83.1 },
  { code: "BRL", flag: "🇧🇷", name: "Brazilian Real",     symbol: "R$",  rate: 4.97 },
  { code: "MXN", flag: "🇲🇽", name: "Mexican Peso",       symbol: "MX$", rate: 17.2 },
  { code: "ZAR", flag: "🇿🇦", name: "South African Rand", symbol: "R",   rate: 18.6 },
  { code: "NGN", flag: "🇳🇬", name: "Nigerian Naira",     symbol: "₦",   rate: 1550 },
  { code: "GHS", flag: "🇬🇭", name: "Ghanaian Cedi",      symbol: "₵",   rate: 15.3 },
  { code: "KES", flag: "🇰🇪", name: "Kenyan Shilling",    symbol: "KSh", rate: 129 },
  { code: "AED", flag: "🇦🇪", name: "UAE Dirham",         symbol: "د.إ", rate: 3.67 },
  { code: "SAR", flag: "🇸🇦", name: "Saudi Riyal",        symbol: "﷼",   rate: 3.75 },
  { code: "CHF", flag: "🇨🇭", name: "Swiss Franc",        symbol: "Fr",  rate: 0.9 },
  { code: "SEK", flag: "🇸🇪", name: "Swedish Krona",      symbol: "kr",  rate: 10.4 },
  { code: "NOK", flag: "🇳🇴", name: "Norwegian Krone",    symbol: "kr",  rate: 10.6 },
  { code: "DKK", flag: "🇩🇰", name: "Danish Krone",       symbol: "kr",  rate: 6.88 },
  { code: "SGD", flag: "🇸🇬", name: "Singapore Dollar",   symbol: "S$",  rate: 1.34 },
  { code: "HKD", flag: "🇭🇰", name: "Hong Kong Dollar",   symbol: "HK$", rate: 7.82 },
  { code: "NZD", flag: "🇳🇿", name: "New Zealand Dollar", symbol: "NZ$", rate: 1.63 },
  { code: "TRY", flag: "🇹🇷", name: "Turkish Lira",       symbol: "₺",   rate: 32.1 },
  { code: "RUB", flag: "🇷🇺", name: "Russian Ruble",      symbol: "₽",   rate: 91.5 },
  { code: "PKR", flag: "🇵🇰", name: "Pakistani Rupee",    symbol: "₨",   rate: 278 },
  { code: "BDT", flag: "🇧🇩", name: "Bangladeshi Taka",   symbol: "৳",   rate: 110 },
  { code: "PHP", flag: "🇵🇭", name: "Philippine Peso",    symbol: "₱",   rate: 56.5 },
  { code: "THB", flag: "🇹🇭", name: "Thai Baht",          symbol: "฿",   rate: 35.1 },
  { code: "IDR", flag: "🇮🇩", name: "Indonesian Rupiah",  symbol: "Rp",  rate: 15700 },
  { code: "MYR", flag: "🇲🇾", name: "Malaysian Ringgit",  symbol: "RM",  rate: 4.72 },
  { code: "EGP", flag: "🇪🇬", name: "Egyptian Pound",     symbol: "E£",  rate: 48.5 },
  { code: "COP", flag: "🇨🇴", name: "Colombian Peso",     symbol: "COL$",rate: 3900 },
  { code: "ARS", flag: "🇦🇷", name: "Argentine Peso",     symbol: "AR$", rate: 875 },
  { code: "CLP", flag: "🇨🇱", name: "Chilean Peso",       symbol: "CL$", rate: 945 },
  { code: "PEN", flag: "🇵🇪", name: "Peruvian Sol",       symbol: "S/",  rate: 3.72 },
];

type CurrencyCtx = { currency: Currency; setCurrency: (c: Currency) => void; format: (usd: number) => string };
const Ctx = createContext<CurrencyCtx>({} as CurrencyCtx);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  function format(usd: number) {
    const c = CURRENCIES.find(x => x.code === currency)!;
    const amount = usd * c.rate;
    return `${c.symbol}${amount >= 100 ? Math.round(amount).toLocaleString() : amount.toFixed(2)}`;
  }

  return <Ctx.Provider value={{ currency, setCurrency, format }}>{children}</Ctx.Provider>;
}

export const useCurrency = () => useContext(Ctx);
