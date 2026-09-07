"use client";
import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

const SEGMENTS = [
  { label: "LUXE10", color: "#e879f9", text: "10% OFF" },
  { label: "SAVE20", color: "#f43f8f", text: "20% OFF" },
  { label: "LUXE10", color: "#a855f7", text: "10% OFF" },
  { label: "VIP15", color: "#ec4899", text: "15% OFF" },
  { label: "LUXE10", color: "#e879f9", text: "10% OFF" },
  { label: "SAVE20", color: "#f43f8f", text: "20% OFF" },
  { label: "LUXE10", color: "#a855f7", text: "10% OFF" },
  { label: "VIP15", color: "#ec4899", text: "15% OFF" },
];

const TOTAL = SEGMENTS.length;
const ARC = (2 * Math.PI) / TOTAL;
const SIZE = 280;
const R = SIZE / 2;

export default function SpinWheel() {
  const [show, setShow] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [won, setWon] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef(0);

  useEffect(() => {
    if (sessionStorage.getItem("spin_shown")) return;
    const t = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem("spin_shown", "true");
    }, 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    drawWheel(rotation);
  }, [rotation]);

  function drawWheel(rot: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, SIZE, SIZE);

    SEGMENTS.forEach((seg, i) => {
      const start = rot + i * ARC;
      const end = start + ARC;
      ctx.beginPath();
      ctx.moveTo(R, R);
      ctx.arc(R, R, R - 2, start, end);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.strokeStyle = "rgba(10,0,16,0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(R, R);
      ctx.rotate(start + ARC / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 13px Inter, sans-serif";
      ctx.fillText(seg.text, R - 12, 5);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(R, R, 22, 0, 2 * Math.PI);
    ctx.fillStyle = "#0a0010";
    ctx.fill();
    ctx.strokeStyle = "rgba(232,121,249,0.4)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#e879f9";
    ctx.font = "bold 10px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SPIN", R, R + 4);
  }

  function spin() {
    if (spinning || won) return;
    setSpinning(true);
    const extra = 5 * 2 * Math.PI + Math.random() * 2 * Math.PI;
    const target = rotRef.current + extra;
    const duration = 4000;
    const start = performance.now();
    const startRot = rotRef.current;

    function animate(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = startRot + (target - startRot) * ease;
      rotRef.current = current;
      setRotation(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        // Determine winner — pointer is at top (−π/2)
        const normalized = (((-current - Math.PI / 2) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const idx = Math.floor(normalized / ARC) % TOTAL;
        setWon(SEGMENTS[idx].label);
      }
    }
    requestAnimationFrame(animate);
  }

  function copyCode() {
    if (!won) return;
    navigator.clipboard.writeText(won);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="card w-full max-w-sm p-6 text-center relative"
        style={{ border: "1px solid rgba(232,121,249,0.3)" }}>
        <button onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors">
          <X size={18} />
        </button>

        {!won ? (
          <>
            <p className="text-xs uppercase tracking-[0.4em] mb-1" style={{ color: "#e879f9" }}>🎰 Lucky Spin</p>
            <h2 className="text-xl font-bold text-white mb-1">Spin to Win a Discount!</h2>
            <p className="text-white/40 text-xs mb-5">One spin per visit. Good luck! 🍀</p>

            {/* Pointer */}
            <div className="relative inline-block mb-2">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10 w-0 h-0"
                style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: "16px solid #e879f9" }} />
              <canvas ref={canvasRef} width={SIZE} height={SIZE} className="rounded-full cursor-pointer"
                style={{ boxShadow: "0 0 40px rgba(232,121,249,0.3)" }}
                onClick={spin} />
            </div>

            <button onClick={spin} disabled={spinning}
              className="btn-primary w-full py-3 text-sm mt-3 disabled:opacity-50">
              {spinning ? "Spinning..." : "🎰 Spin Now!"}
            </button>
          </>
        ) : (
          <>
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-2xl font-bold text-white mb-1">You Won!</h2>
            <p className="text-white/50 text-sm mb-5">Use this code at checkout:</p>
            <div className="rounded-2xl p-4 mb-5 flex items-center justify-between gap-3"
              style={{ background: "rgba(232,121,249,0.08)", border: "1px solid rgba(232,121,249,0.25)" }}>
              <span className="gradient-text font-black text-2xl tracking-widest">{won}</span>
              <button onClick={copyCode}
                className="text-xs font-bold px-4 py-2 rounded-full transition-all"
                style={{ background: copied ? "rgba(52,211,153,0.2)" : "rgba(232,121,249,0.15)", color: copied ? "#34d399" : "#e879f9", border: `1px solid ${copied ? "rgba(52,211,153,0.3)" : "rgba(232,121,249,0.3)"}` }}>
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            </div>
            <button onClick={() => setShow(false)} className="btn-primary w-full py-3 text-sm">
              Shop Now & Use Code
            </button>
          </>
        )}
      </div>
    </div>
  );
}
