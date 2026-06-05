"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
      <div className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
        style={{ borderTopColor: "#e879f9", borderRightColor: "#f43f8f" }} />
    </div>
  );
}
