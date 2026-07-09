"use client";
import Link from "next/link";

const team = [
  { name: "Aria", role: "Founder & Curator", emoji: "👑", bio: "Started LuxePlay to bring premium, body-safe products to everyone — discreetly." },
  { name: "Kai", role: "Customer Experience", emoji: "💬", bio: "Handles every Telegram message personally. Your satisfaction is the mission." },
  { name: "Nova", role: "Product Sourcing", emoji: "🔍", bio: "Tests and vets every product before it hits the store. Quality is non-negotiable." },
];

const values = [
  { icon: "🔒", title: "Privacy First", desc: "Plain packaging, no labels, no traces. Your business stays your business." },
  { icon: "✅", title: "Body-Safe Only", desc: "Every product is made from medical-grade, body-safe materials. No compromises." },
  { icon: "💬", title: "Real Support", desc: "We're real people on Telegram — not bots. Fast, human, and non-judgmental." },
  { icon: "🌍", title: "Worldwide Reach", desc: "We ship to 35+ countries. Wherever you are, we'll get it to you discreetly." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 px-4 md:px-6 max-w-4xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Our Story</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-6"><span className="gradient-text">About LuxePlay</span></h1>
      <p className="text-white/60 text-base md:text-lg leading-relaxed mb-16 max-w-2xl">
        LuxePlay was built on one belief: everyone deserves access to premium, body-safe pleasure products — without judgment, without embarrassment, and without anyone knowing.
      </p>

      {/* Mission */}
      <div className="card p-8 mb-16" style={{ border: "1px solid rgba(232,121,249,0.2)" }}>
        <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#e879f9" }}>Our Mission</p>
        <h2 className="text-2xl font-bold text-white mb-4">Pleasure, elevated. Privacy, guaranteed.</h2>
        <p className="text-white/55 leading-relaxed">
          We curate only the best — products that are body-safe, beautifully designed, and actually work. Every order ships in a plain, unmarked box. No brand names, no hints of what&apos;s inside. Just your order, delivered safely to your door.
        </p>
      </div>

      {/* Values */}
      <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#e879f9" }}>What We Stand For</p>
      <h2 className="text-2xl font-bold text-white mb-8">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
        {values.map(v => (
          <div key={v.title} className="card p-6 flex gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0"
              style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)" }}>{v.icon}</div>
            <div>
              <h3 className="font-bold text-white mb-1">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Team */}
      <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: "#e879f9" }}>The People Behind It</p>
      <h2 className="text-2xl font-bold text-white mb-8">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
        {team.map(t => (
          <div key={t.name} className="card p-6 text-center">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
              style={{ background: "linear-gradient(135deg, rgba(232,121,249,0.15), rgba(244,63,143,0.1))", border: "1px solid rgba(232,121,249,0.2)" }}>
              {t.emoji}
            </div>
            <h3 className="font-bold text-white mb-1">{t.name}</h3>
            <p className="text-xs font-semibold mb-3" style={{ color: "#e879f9" }}>{t.role}</p>
            <p className="text-white/50 text-sm leading-relaxed">{t.bio}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, rgba(232,121,249,0.12), rgba(244,63,143,0.08))", border: "1px solid rgba(232,121,249,0.2)" }}>
        <h2 className="text-2xl font-bold text-white mb-3">Ready to explore?</h2>
        <p className="text-white/50 text-sm mb-6">Browse our full collection — curated, body-safe, and shipped discreetly.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop" className="btn-primary px-10 py-3 text-sm">Shop Now</Link>
          <Link href="/contact" className="px-10 py-3 text-sm rounded-full font-semibold transition-all hover:scale-105"
            style={{ background: "rgba(232,121,249,0.08)", border: "1px solid rgba(232,121,249,0.2)", color: "#e879f9" }}>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
