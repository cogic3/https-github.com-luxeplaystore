export default function Privacy() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-6 max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Legal</p>
      <h1 className="text-4xl font-bold mb-10"><span className="gradient-text">Privacy Policy</span></h1>
      <div className="flex flex-col gap-8 text-white/60 text-sm leading-relaxed">
        {[
          { title: "Information We Collect", body: "We collect only the information necessary to process and ship your order — including your name, shipping address, email, and phone number. We do not collect payment credentials. Payments are made via Bitcoin or gift cards, which leave no traceable financial records." },
          { title: "How We Use Your Information", body: "Your information is used solely to fulfill your order and communicate with you about its status. We will never sell, share, or distribute your personal information to any third party." },
          { title: "Discreet Shipping", body: "All orders are shipped in plain, unmarked packaging. The return address on the package uses a generic business name with no indication of the contents." },
          { title: "Data Security", body: "All communications between you and LuxePlay are conducted via Telegram, which uses end-to-end encryption. We do not store sensitive data on servers." },
          { title: "Cookies", body: "We use minimal cookies to improve your browsing experience (e.g. remembering your currency preference and age verification). You can decline cookies at any time." },
          { title: "Your Rights", body: "You have the right to request deletion of any personal information we hold about you. Contact us on Telegram to make such a request." },
          { title: "Contact", body: "For any privacy-related concerns, please message us on Telegram at @luxeplayadmin." },
        ].map(s => (
          <div key={s.title}>
            <h2 className="text-white font-bold text-base mb-2">{s.title}</h2>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
