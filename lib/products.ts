export type Variant = { label: string; price?: number };

export type Product = {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  images: string[];
  desc: string;
  category: "vibrators" | "dildos" | "machines" | "accessories" | "costumes";
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
    desc: "World's first patented rolling bead G-spot and clit rabbit vibrator.",
    rating: 4.9, reviews: 124, viewers: 8, isNew: false, stock: 5,
    variants: [{ label: "Purple" }, { label: "Pink" }, { label: "Black" }],
  },
  {
    id: 2, name: "Gravity", price: 120,
    image: "/products/gravity.png", images: ["/products/gravity.png", "/products/gravity.png"],
    category: "dildos",
    desc: "Bluetooth automatic thrusting and vibrating dildo.",
    rating: 4.7, reviews: 89, viewers: 5, stock: 12,
    variants: [{ label: "Small" }, { label: "Medium" }, { label: "Large", price: 140 }],
  },
  {
    id: 3, name: "Lapis", price: 150,
    image: "/products/lapis.png", images: ["/products/lapis.png", "/products/lapis.png"],
    category: "accessories", badge: "New",
    desc: "App-controlled dual-ended vibrating strapless strap-on.",
    rating: 4.8, reviews: 62, viewers: 11, isNew: true, stock: 3,
    variants: [{ label: "Rose Gold" }, { label: "Midnight Blue" }],
  },
  {
    id: 4, name: "ThrustPro Machine", price: 800, salePrice: 699,
    image: "/products/sex-machine.png", images: ["/products/sex-machine.png", "/products/sex-machine.png"],
    category: "machines", badge: "Premium",
    desc: "App-controlled thrusting sex machine with adjustable speed and depth.",
    rating: 5.0, reviews: 41, viewers: 3, stock: 2,
  },
  {
    id: 5, name: "Sissy Costume 1", price: 75,
    image: "/products/1.webp", images: ["/products/1.webp", "/products/1.webp"],
    category: "costumes",
    desc: "Sexy sissy costume perfect for transformation and play.",
    rating: 4.6, reviews: 38, viewers: 7, isNew: true, stock: 10,
    variants: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }],
  },
  {
    id: 6, name: "Long Sissy Costume", price: 125,
    image: "/products/2.webp", images: ["/products/2.webp", "/products/2.webp"],
    category: "costumes",
    desc: "Elegant long sissy costume for full feminine transformation.",
    rating: 4.7, reviews: 29, viewers: 6, isNew: true, stock: 8,
    variants: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }],
  },
  {
    id: 7, name: "Sissy Costume 2", price: 75,
    image: "/products/3.webp", images: ["/products/3.webp", "/products/3.webp"],
    category: "costumes",
    desc: "Cute and playful sissy costume for control and feminization.",
    rating: 4.5, reviews: 44, viewers: 9, stock: 10,
    variants: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }],
  },
  {
    id: 8, name: "Sissy Maid Costume", price: 90,
    image: "/products/4.webp", images: ["/products/4.webp", "/products/4.webp"],
    category: "costumes", badge: "Best Seller",
    desc: "Classic sissy maid costume with apron — ideal for service and submission.",
    rating: 4.8, reviews: 57, viewers: 12, stock: 7,
    variants: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }],
  },
  {
    id: 9, name: "Loyalty Costume", price: 165,
    image: "/products/5.webp", images: ["/products/5.webp", "/products/5.webp"],
    category: "costumes", badge: "Premium",
    desc: "Premium loyalty costume for devoted and obedient play.",
    rating: 4.9, reviews: 21, viewers: 5, isNew: true, stock: 4,
    variants: [{ label: "S" }, { label: "M" }, { label: "L" }, { label: "XL" }],
  },
];
