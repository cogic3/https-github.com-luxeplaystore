export default function Terms() {
  return (
    <div className="min-h-screen pt-24 md:pt-28 pb-24 px-4 md:px-6 max-w-3xl mx-auto">
      <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: "#e879f9" }}>Legal</p>
      <h1 className="text-4xl font-bold mb-10"><span className="gradient-text">Terms of Service</span></h1>
      <div className="flex flex-col gap-8 text-white/60 text-sm leading-relaxed">
        {[
          { title: "Age Requirement", body: "You must be 18 years of age or older to use this website or purchase any products. By accessing this site, you confirm that you meet this requirement." },
          { title: "Product Use", body: "All products sold are intended for adult use only. LuxePlay is not responsible for any misuse of products. All items are for personal use." },
          { title: "Payments", body: "We accept Bitcoin and gift cards. All sales are final once payment is confirmed. By completing a purchase, you agree that you have reviewed your order and are satisfied with the details." },
          { title: "Shipping & Delivery", body: "Delivery times vary by location. We are not responsible for delays caused by customs, postal services, or other factors outside our control. We will do our best to keep you updated via Telegram." },
          { title: "Returns & Refunds", body: "Due to the nature of our products, we do not accept returns. If a product arrives damaged or incorrect, contact us within 7 days of delivery and we will resolve the issue." },
          { title: "Limitation of Liability", body: "LuxePlay is not liable for any indirect, incidental, or consequential damages arising from the use of our products or services." },
          { title: "Changes to Terms", body: "We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of any changes." },
          { title: "Contact", body: "For any questions about these terms, contact us on Telegram at @luxeplayadmin." },
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
