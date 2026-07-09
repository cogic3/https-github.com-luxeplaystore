export type Variant = { label: string; price?: number };

export type Product = {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  images: string[];
  desc: string;
  category: "vibrators" | "dildos" | "machines" | "accessories" | "costumes" | "bundles";
  badge?: string;
  rating: number;
  reviews: number;
  viewers: number;
  variants?: Variant[];
  isNew?: boolean;
  stock: number;
};

export const products: Product[] = [
  {
    id: 1, name: "Velvo", price: 200, salePrice: 160,
    image: "/products/velvo.png", images: ["/products/velvo.png", "/products/velvo.png", "/products/velvo.png"],
    category: "vibrators", badge: "Best Seller",
    desc: "World's first patented rolling bead G-spot and clit rabbit vibrator. 10 vibration modes, whisper-quiet motor, 100% waterproof, and USB rechargeable. Made from body-safe silicone.",
    rating: 4.9, reviews: 124, viewers: 8, isNew: false, stock: 5,
    variants: [{ label: "Purple" }, { label: "Pink" }, { label: "Black" }],
  },
  {
    id: 2, name: "Gravity", price: 120,
    image: "/products/gravity.png", images: ["/products/gravity.png", "/products/gravity.png"],
    category: "dildos",
    desc: "Bluetooth automatic thrusting and vibrating dildo. App-controlled from anywhere in the world. 7 thrust speeds, 10 vibe patterns, flexible shaft, and hands-free suction base.",
    rating: 4.7, reviews: 89, viewers: 5, stock: 12,
    variants: [{ label: "Small" }, { label: "Medium" }, { label: "Large", price: 140 }],
  },
  {
    id: 3, name: "Lapis", price: 150,
    image: "/products/lapis.png", images: ["/products/lapis.png", "/products/lapis.png"],
    category: "accessories", badge: "New",
    desc: "App-controlled dual-ended vibrating strapless strap-on. Share pleasure simultaneously — no harness needed. Curved design for perfect fit, 10 vibe modes each end.",
    rating: 4.8, reviews: 62, viewers: 11, isNew: true, stock: 3,
    variants: [{ label: "Rose Gold" }, { label: "Midnight Blue" }],
  },
  {
    id: 4, name: "ThrustPro Machine", price: 800, salePrice: 699,
    image: "/products/sex-machine.png", images: ["/products/sex-machine.png", "/products/sex-machine.png"],
    category: "machines", badge: "Premium",
    desc: "App-controlled thrusting sex machine with adjustable speed, depth, and angle. Compatible with most attachments. Whisper-quiet, powerful motor — the ultimate hands-free experience.",
    rating: 5.0, reviews: 41, viewers: 3, stock: 2,
  },
  {
    id: 5, name: "Sissy Costume 1", price: 75,
    image: "/products/1.webp", images: ["/products/1.webp", "/products/1.webp"],
    category: "costumes",
    desc: "Sexy sissy costume perfect for transformation and play. Soft, stretchy fabric with lace trim. Designed to flatter and feminize. Available in multiple sizes.",
    rating: 4.6, reviews: 38, viewers: 7, isNew: true, stock: 10,
    variants: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }],
  },
  {
    id: 6, name: "Long Sissy Costume", price: 125,
    image: "/products/2.webp", images: ["/products/2.webp", "/products/2.webp"],
    category: "costumes",
    desc: "Elegant full-length sissy costume for deep feminine transformation. Floor-length silhouette with ruffled hem and ribbon details. Feel completely and beautifully feminine.",
    rating: 4.7, reviews: 29, viewers: 6, isNew: true, stock: 8,
    variants: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }],
  },
  {
    id: 7, name: "Sissy Costume 2", price: 75,
    image: "/products/3.webp", images: ["/products/3.webp", "/products/3.webp"],
    category: "costumes",
    desc: "Cute and playful sissy costume for control and feminization sessions. Puffed skirt, bow details, and soft pastel colours. Pairs perfectly with matching accessories.",
    rating: 4.5, reviews: 44, viewers: 9, stock: 10,
    variants: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }],
  },
  {
    id: 8, name: "Sissy Maid Costume", price: 90,
    image: "/products/4.webp", images: ["/products/4.webp", "/products/4.webp"],
    category: "costumes", badge: "Best Seller",
    desc: "Classic sissy maid costume with apron — ideal for service, submission, and domestic play. Comes with apron, headpiece, and cuffs. Beloved by the community.",
    rating: 4.8, reviews: 57, viewers: 12, stock: 7,
    variants: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }],
  },
  {
    id: 9, name: "Loyalty Costume", price: 165,
    image: "/products/5.webp", images: ["/products/5.webp", "/products/5.webp"],
    category: "costumes", badge: "Premium",
    desc: "Premium loyalty costume for devoted and obedient play. High-quality fabric, intricate lace, and an ultra-feminine silhouette. For those who take their role seriously.",
    rating: 4.9, reviews: 21, viewers: 5, isNew: true, stock: 4,
    variants: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }],
  },
  {
    id: 10, name: "Sissy Starter Bundle", price: 240, salePrice: 185,
    image: "/products/1.webp", images: ["/products/1.webp", "/products/2.webp", "/products/3.webp"],
    category: "bundles", badge: "Best Value",
    desc: "Everything you need to begin your transformation journey. Includes Sissy Costume 1, Sissy Costume 2, and a set of accessories. Save $55 vs buying separately.",
    rating: 4.9, reviews: 33, viewers: 14, isNew: true, stock: 6,
    variants: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }],
  },
  {
    id: 11, name: "Pleasure Bundle", price: 350, salePrice: 270,
    image: "/products/velvo.png", images: ["/products/velvo.png", "/products/gravity.png", "/products/lapis.png"],
    category: "bundles", badge: "Best Value",
    desc: "The ultimate toy bundle — Velvo vibrator + Gravity dildo at a massive discount. Two of our best-selling toys together. Save $80 vs buying separately.",
    rating: 5.0, reviews: 18, viewers: 9, isNew: true, stock: 4,
  },
  {
    id: 12, name: "Chastity Cage", price: 65,
    image: "/products/velvo.png", images: ["/products/velvo.png", "/products/velvo.png"],
    category: "accessories", badge: "New",
    desc: "Premium body-safe chastity cage for total control and submission. Lightweight, comfortable for extended wear, with two lock keys. Available in three sizes.",
    rating: 4.7, reviews: 52, viewers: 10, isNew: true, stock: 9,
    variants: [{ label: "Small" }, { label: "Medium" }, { label: "Large" }],
  },
  {
    id: 13, name: "Bondage Starter Kit", price: 95, salePrice: 75,
    image: "/products/velvo.png", images: ["/products/velvo.png", "/products/velvo.png"],
    category: "accessories",
    desc: "Complete beginner bondage set — includes soft padded wrist cuffs, ankle cuffs, blindfold, and feather tickler. Everything you need to explore restraint and sensation play safely.",
    rating: 4.6, reviews: 71, viewers: 13, stock: 15,
  },
  {
    id: 14, name: "Butt Plug Set", price: 55,
    image: "/products/velvo.png", images: ["/products/velvo.png", "/products/velvo.png"],
    category: "accessories", badge: "New",
    desc: "3-piece graduated butt plug training set. Body-safe silicone, flared base for safety, smooth tapered tips. Perfect for beginners building up gradually. 100% waterproof.",
    rating: 4.8, reviews: 96, viewers: 11, isNew: true, stock: 20,
  },
  {
    id: 15, name: "Collar & Leash Set", price: 45,
    image: "/products/velvo.png", images: ["/products/velvo.png", "/products/velvo.png"],
    category: "accessories",
    desc: "Faux leather submissive collar with O-ring and matching leash. Adjustable fit, soft inner lining, and a detachable leash. A power-play essential for Dominant/submissive dynamics.",
    rating: 4.5, reviews: 48, viewers: 7, stock: 18,
  },
  {
    id: 16, name: "Wand Massager", price: 85, salePrice: 65,
    image: "/products/velvo.png", images: ["/products/velvo.png", "/products/velvo.png"],
    category: "vibrators", badge: "Sale",
    desc: "Powerful full-body wand massager with 20 vibration modes. The iconic shape delivers deep, rumbly vibrations. USB rechargeable, flexible neck, whisper-quiet motor.",
    rating: 4.8, reviews: 113, viewers: 16, stock: 8,
  },
  {
    id: 17, name: "Suction Cup Dildo", price: 70,
    image: "/products/gravity.png", images: ["/products/gravity.png", "/products/gravity.png"],
    category: "dildos",
    desc: "Realistic textured dildo with strong hands-free suction cup base. Sticks to any flat surface for total freedom. Body-safe silicone, harness-compatible, multiple sizes.",
    rating: 4.6, reviews: 67, viewers: 8, stock: 14,
    variants: [{ label: "6 inch" }, { label: "7 inch" }, { label: "8 inch", price: 85 }],
  },
  {
    id: 18, name: "Remote Vibrating Egg", price: 50,
    image: "/products/velvo.png", images: ["/products/velvo.png", "/products/velvo.png"],
    category: "vibrators", badge: "New",
    desc: "Discreet wearable vibrating egg with 10-metre wireless remote control. Perfect for teasing in public or at home. Whisper-quiet, body-safe silicone, 10 vibration patterns.",
    rating: 4.7, reviews: 84, viewers: 19, isNew: true, stock: 11,
  },
  {
    id: 19, name: "Full Control Bundle", price: 225, salePrice: 165,
    image: "/products/velvo.png", images: ["/products/velvo.png", "/products/velvo.png"],
    category: "bundles", badge: "Best Value",
    desc: "The ultimate Dominant's toolkit — Collar & Leash Set + Bondage Starter Kit + Chastity Cage bundled together. Complete control from head to toe. Save $60 vs buying separately.",
    rating: 4.9, reviews: 27, viewers: 8, isNew: true, stock: 5,
  },
  {
    id: 20, name: "Prostate Massager", price: 80,
    image: "/products/velvo.png", images: ["/products/velvo.png", "/products/velvo.png"],
    category: "accessories", badge: "New",
    desc: "Curved prostate massager with 10 vibration modes and a perineum stimulator. Ergonomically designed for hands-free targeted pleasure. Body-safe, rechargeable, waterproof.",
    rating: 4.8, reviews: 59, viewers: 12, isNew: true, stock: 7,
  },
];
