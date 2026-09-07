"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";

type Message = {
  from: "bot" | "user";
  text: string;
  time: string;
};

const QUICK_REPLIES = [
  "How do I pay?",
  "How long is shipping?",
  "Is packaging discreet?",
  "Track my order",
  "Talk to a human",
];

const AUTO_RESPONSES: Record<string, string> = {
  "how do i pay": "We accept **Bitcoin** and **any gift card** (Amazon, Google Play, iTunes, Steam, etc). At checkout, choose your method and follow the steps. After paying, message us on Telegram with your confirmation. 💳",
  "how long is shipping": "Delivery times vary by region:\n• 🇺🇸 US: 2–3 weeks\n• 🇬🇧 UK: 2–4 weeks\n• 🌍 Africa: 3–5 weeks\n• 🌏 Asia/Middle East: 2–5 weeks\n\nAll orders ship in plain, discreet packaging. 📦",
  "is packaging discreet": "Yes, 100%! Every order ships in a plain, unmarked box with no brand names or labels. The return address uses a generic business name. Nobody will know what's inside. 🔒",
  "track my order": "To track your order, visit our **Track Order** page and enter your Telegram username. Our team will message you with your order status. You can also message us directly on Telegram. 📍",
  "talk to a human": "Of course! Click the button below to chat with us directly on Telegram. We're available 24/7 and usually respond within minutes. 💬",
};

function getTime() {
  return new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function getBotReply(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const key of Object.keys(AUTO_RESPONSES)) {
    if (lower.includes(key)) return AUTO_RESPONSES[key];
  }
  if (lower.includes("pay") || lower.includes("bitcoin") || lower.includes("gift")) return AUTO_RESPONSES["how do i pay"];
  if (lower.includes("ship") || lower.includes("deliver") || lower.includes("long")) return AUTO_RESPONSES["how long is shipping"];
  if (lower.includes("discr") || lower.includes("packag") || lower.includes("box")) return AUTO_RESPONSES["is packaging discreet"];
  if (lower.includes("track") || lower.includes("order") || lower.includes("status")) return AUTO_RESPONSES["track my order"];
  if (lower.includes("human") || lower.includes("agent") || lower.includes("person") || lower.includes("help")) return AUTO_RESPONSES["talk to a human"];
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) return "Hey there! 👋 Welcome to LuxePlay. How can I help you today? You can ask me about payments, shipping, packaging, or anything else!";
  if (lower.includes("thank")) return "You're welcome! 😊 Is there anything else I can help you with?";
  if (lower.includes("return") || lower.includes("refund")) return "Due to the nature of our products, we don't accept returns. However, if your item arrives damaged or incorrect, message us on Telegram within 7 days and we'll make it right. 🛡️";
  if (lower.includes("price") || lower.includes("cost") || lower.includes("cheap")) return "Our prices range from $45 to $800 depending on the product. We also have bundles that save you up to 30%! Check out our shop for the full range. 🛍️";
  return "I'm not sure about that one! For anything specific, our team is available 24/7 on Telegram and will get back to you quickly. 💬";
}

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text: "Hi there! 👋 I'm the LuxePlay assistant. Ask me anything about orders, shipping, payments, or privacy — or pick a quick question below!",
      time: getTime(),
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [open, messages]);

  function sendMessage(text: string) {
    if (!text.trim()) return;
    const userMsg: Message = { from: "user", text: text.trim(), time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages(prev => [...prev, { from: "bot", text: reply, time: getTime() }]);
      setTyping(false);
      if (!open) setUnread(u => u + 1);
    }, 900 + Math.random() * 600);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  // Format bold **text**
  function formatText(text: string) {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
        )}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setMinimized(false); }}
          className="fixed bottom-20 md:bottom-6 left-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full font-semibold text-sm text-white shadow-lg transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg,#e879f9,#f43f8f)", boxShadow: "0 0 24px rgba(232,121,249,0.5)" }}>
          <MessageCircle size={18} />
          <span>Chat with us</span>
          {unread > 0 && (
            <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
              style={{ background: "#f43f8f" }}>
              {unread}
            </span>
          )}
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:w-80 z-50 rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "var(--card-bg)",
            border: "1px solid rgba(232,121,249,0.25)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            maxHeight: minimized ? "56px" : "480px",
            transition: "max-height 0.3s ease",
          }}>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ background: "linear-gradient(90deg,#e879f9,#f43f8f)" }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">💬</div>
              <div>
                <p className="text-white font-bold text-sm leading-tight">LuxePlay Support</p>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
                  <p className="text-white/80 text-[10px]">Online · Usually replies instantly</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setMinimized(!minimized)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                <Minimize2 size={14} />
              </button>
              <button onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                <X size={14} />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3" style={{ minHeight: 0 }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.from === "bot" && (
                      <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs mr-2 mt-1"
                        style={{ background: "linear-gradient(135deg,#e879f9,#f43f8f)" }}>
                        💬
                      </div>
                    )}
                    <div className="max-w-[78%]">
                      <div className="px-3 py-2 rounded-2xl text-xs leading-relaxed"
                        style={{
                          background: msg.from === "user"
                            ? "linear-gradient(135deg,#e879f9,#f43f8f)"
                            : "var(--color-surface)",
                          color: msg.from === "user" ? "#fff" : "var(--color-text)",
                          borderRadius: msg.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                          border: msg.from === "bot" ? "1px solid var(--border)" : "none",
                        }}>
                        {formatText(msg.text)}
                      </div>
                      <p className="text-[9px] mt-1 px-1"
                        style={{ color: "var(--color-text-25)", textAlign: msg.from === "user" ? "right" : "left" }}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="flex justify-start items-center gap-2">
                    <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs"
                      style={{ background: "linear-gradient(135deg,#e879f9,#f43f8f)" }}>💬</div>
                    <div className="px-3 py-2.5 rounded-2xl flex gap-1 items-center"
                      style={{ background: "var(--color-surface)", border: "1px solid var(--border)" }}>
                      {[0, 1, 2].map(i => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full inline-block"
                          style={{
                            background: "#e879f9",
                            animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`,
                          }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick replies */}
              <div className="px-3 pb-2 flex gap-1.5 flex-wrap shrink-0">
                {QUICK_REPLIES.map(q => (
                  <button key={q} onClick={() => sendMessage(q)}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all hover:scale-105"
                    style={{ background: "rgba(232,121,249,0.1)", border: "1px solid rgba(232,121,249,0.2)", color: "#e879f9" }}>
                    {q}
                  </button>
                ))}
              </div>

              {/* Telegram CTA */}
              <div className="px-3 pb-2 shrink-0">
                <a href="https://t.me/luxeplay10" target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                  style={{ background: "rgba(232,121,249,0.08)", border: "1px solid rgba(232,121,249,0.2)", color: "#e879f9" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z" />
                  </svg>
                  Continue on Telegram
                </a>
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit}
                className="flex items-center gap-2 px-3 pb-3 shrink-0">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--border)",
                    color: "var(--color-text)",
                  }}
                />
                <button type="submit"
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-40"
                  style={{ background: "linear-gradient(135deg,#e879f9,#f43f8f)" }}>
                  <Send size={13} className="text-white" />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
}
