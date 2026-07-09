import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TelegramFloat from "@/components/TelegramFloat";
import AgeGate from "@/components/AgeGate";
import CookieBanner from "@/components/CookieBanner";
import CountdownBanner from "@/components/CountdownBanner";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoader from "@/components/PageLoader";
import RecentPurchasePopup from "@/components/RecentPurchasePopup";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { StoreProvider } from "@/context/StoreContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "LuxePlay — Premium Adult Boutique",
  description: "Discreet, premium adult toys delivered to your door.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ThemeProvider>
        <CurrencyProvider>
          <CartProvider>
            <StoreProvider>
              <AuthProvider>
              <AgeGate>
                <PageLoader />
                <CountdownBanner />
                <Navbar />
                <main>{children}</main>
                <Footer />
                <TelegramFloat />
                <ScrollToTop />
                <CookieBanner />
                <RecentPurchasePopup />
              </AgeGate>
              </AuthProvider>
            </StoreProvider>
          </CartProvider>
        </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
