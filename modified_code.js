import React, { useState, useMemo, useEffect } from "react";
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Menu,
  ArrowRight,
  ArrowLeft,
  Check,
  Mail,
} from "lucide-react";

/* ------------------------------------------------------------------
   EVREN — unisex basics
   Design tokens:
   bone   #EAE6DD  background
   ink    #1C1B18  text / nav
   stone  #B9B2A3  borders / secondary
   moss   #4B5842  primary accent (CTAs, links)
   rust   #A8542E  sparing accent (new/sale tags)
   paper  #FFFFFF  cards
   Type: display = Space Grotesk, body = Inter, utility = IBM Plex Mono
------------------------------------------------------------------- */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
`;

const PRODUCTS = [
  {
    id: "ov-01",
    name: "Fieldwork Overshirt",
    sku: "EV-0138-OVR",
    category: "Outerwear",
    price: 128,
    fabric: "12oz cotton twill",
    fit: "Boxy, dropped shoulder",
    seed: "evren-ov-01",
    isNew: true,
    description:
      "A heavyweight shirt-jacket built for layering in either direction. Two chest pockets sized for hands, not phones. Cut wide enough to move, short enough to sit under a coat.",
  },
  {
    id: "tp-01",
    name: "Second Skin Tee",
    sku: "EV-0021-TEE",
    category: "Tops",
    price: 38,
    fabric: "220gsm combed cotton",
    fit: "Relaxed, straight hem",
    seed: "evren-tp-01",
    isNew: false,
    description:
      "The tee everything else is built around. Dense, combed cotton that holds its shape wash after wash. No side seams, no logo, no distraction.",
  },
  {
    id: "bt-01",
    name: "Wide Leg Utility Pant",
    sku: "EV-0304-PNT",
    category: "Bottoms",
    price: 96,
    fabric: "Cotton-nylon ripstop",
    fit: "Wide leg, elastic + drawcord waist",
    seed: "evren-bt-01",
    isNew: false,
    description:
      "One waistband, every body. Deep cargo pockets sit flat instead of bulging, and the ripstop weave shrugs off daily wear.",
  },
  {
    id: "tp-02",
    name: "Boxy Crew Sweatshirt",
    sku: "EV-0045-CRW",
    category: "Tops",
    price: 78,
    fabric: "400gsm brushed fleece",
    fit: "Boxy, cropped sleeve",
    seed: "evren-tp-02",
    isNew: true,
    description:
      "Brushed on the inside, brushed off on the outside. Cropped sleeves so cuffs stack over a shirt without bunching.",
  },
  {
    id: "ov-02",
    name: "Shell Anorak",
    sku: "EV-0162-ANK",
    category: "Outerwear",
    price: 164,
    fabric: "2.5L recycled nylon",
    fit: "Oversized, half-zip",
    seed: "evren-ov-02",
    isNew: false,
    description:
      "Weatherproof without the crinkle. Packs into its own chest pocket for the days you're not sure you'll need it.",
  },
  {
    id: "bt-02",
    name: "Straight Cut Denim",
    sku: "EV-0289-DNM",
    category: "Bottoms",
    price: 110,
    fabric: "13.5oz rigid selvedge",
    fit: "Straight, mid rise",
    seed: "evren-bt-02",
    isNew: false,
    description:
      "No taper, no distressing, no story. Rigid selvedge denim left to break in around whoever wears it.",
  },
  {
    id: "tp-03",
    name: "Ribbed Tank",
    sku: "EV-0009-TNK",
    category: "Tops",
    price: 32,
    fabric: "2x1 rib cotton",
    fit: "Regular, dropped armhole",
    seed: "evren-tp-03",
    isNew: false,
    description:
      "A base layer that also works alone. Ribbed cotton with enough recovery to keep its shape by the end of the day.",
  },
  {
    id: "ac-01",
    name: "Canvas Tote",
    sku: "EV-0511-TOT",
    category: "Accessories",
    price: 48,
    fabric: "16oz waxed canvas",
    fit: "One size",
    seed: "evren-ac-01",
    isNew: false,
    description:
      "Waxed canvas that ages instead of wearing out. Internal pocket, reinforced base, straps long enough for a shoulder carry.",
  },
  {
    id: "ac-02",
    name: "Wool Beanie",
    sku: "EV-0477-BNE",
    category: "Accessories",
    price: 34,
    fabric: "Merino wool blend",
    fit: "One size",
    seed: "evren-ac-02",
    isNew: true,
    description:
      "Unlined merino, double folded. Enough stretch to fit most heads, not enough to lose its shape.",
  },
  {
    id: "bt-03",
    name: "Track Pant",
    sku: "EV-0356-TRK",
    category: "Bottoms",
    price: 88,
    fabric: "Brushed tricot",
    fit: "Tapered, elastic cuff",
    seed: "evren-bt-03",
    isNew: false,
    description:
      "Side snap detailing at the ankle so it works over boots or bare. Tricot brushed soft on the inside only.",
  },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const money = (n) => `$${n.toFixed(2)}`;

/* ---------------------------- Tag motif ---------------------------- */
function GarmentTag({ sku, className = "", size = "sm" }) {
  const dims = size === "lg" ? { w: 128, h: 52 } : { w: 92, h: 36 };
  return (
    <div
      className={`select-none pointer-events-none ${className}`}
      style={{ transform: "rotate(-6deg)" }}
    >
      <svg width={dims.w} height={dims.h} viewBox="0 0 92 36" fill="none">
        <path
          d="M4 2H70L88 18L70 34H4C2.9 34 2 33.1 2 32V4C2 2.9 2.9 2 4 2Z"
          fill="#EAE6DD"
          stroke="#1C1B18"
          strokeWidth="1"
        />
        <circle cx="12" cy="18" r="3" fill="none" stroke="#1C1B18" strokeWidth="1" />
        <text
          x="20"
          y="21"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="9"
          fill="#1C1B18"
        >
          {sku}
        </text>
      </svg>
    </div>
  );
}

/* ---------------------------- Header ---------------------------- */
function Header({ view, setView, cartCount, onCartClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    { key: "home", label: "Home" },
    { key: "shop", label: "Shop" },
    { key: "about", label: "Story" },
    { key: "contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-30 bg-[#EAE6DD]/95 backdrop-blur border-b border-[#1C1B18]/15">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <button
          onClick={() => setView("home")}
          className="font-[Space_Grotesk] font-bold text-xl tracking-[0.2em] text-[#1C1B18]"
        >
          EVREN
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <button
              key={n.key}
              onClick={() => setView(n.key)}
              className={`text-sm font-medium tracking-wide transition-colors ${
                view === n.key
                  ? "text-[#1C1B18]"
                  : "text-[#1C1B18]/55 hover:text-[#1C1B18]"
              }`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 border border-[#1C1B18] px-3 py-1.5 hover:bg-[#1C1B18] hover:text-[#EAE6DD] transition-colors"
          >
            <ShoppingBag size={16} strokeWidth={1.75} />
            <span className="text-xs font-[IBM_Plex_Mono] hidden sm:inline">
              {cartCount}
            </span>
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-[#1C1B18]/15 px-5 py-3 flex flex-col gap-3 bg-[#EAE6DD]">
          {nav.map((n) => (
            <button
              key={n.key}
              onClick={() => {
                setView(n.key);
                setMenuOpen(false);
              }}
              className="text-left text-sm font-medium py-1"
            >
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ---------------------------- Footer ---------------------------- */
function Footer({ setView }) {
  return (
    <footer className="border-t border-[#1C1B18]/15 mt-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <div className="font-[Space_Grotesk] font-bold text-lg tracking-[0.2em]">
            EVREN
          </div>
          <p className="text-xs text-[#1C1B18]/60 mt-2 max-w-xs">
            Unisex basics, cut once and worn by everyone. No seasons, no
            gender, no filler.
          </p>
        </div>
        <div className="flex gap-12 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-[IBM_Plex_Mono] text-[11px] uppercase tracking-widest text-[#1C1B18]/50">
              Shop
            </span>
            <button onClick={() => setView("shop")} className="text-left hover:underline">
              All products
            </button>
            <button onClick={() => setView("about")} className="text-left hover:underline">
              Our story
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-[IBM_Plex_Mono] text-[11px] uppercase tracking-widest text-[#1C1B18]/50">
              Support
            </span>
            <button onClick={() => setView("contact")} className="text-left hover:underline">
              Contact
            </button>
            <button onClick={() => setView("cart")} className="text-left hover:underline">
              Cart
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-[#1C1B18]/15 py-4 text-center text-[11px] font-[IBM_Plex_Mono] text-[#1C1B18]/45">
        © {new Date().getFullYear()} EVREN. All products shown are placeholders.
      </div>
    </footer>
  );
}

/* ---------------------------- Product Card ---------------------------- */
function ProductCard({ product, onSelect }) {
  return (
    <button
      onClick={() => onSelect(product.id)}
      className="text-left group"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#DFDAD0] border border-[#1C1B18]/10">
        <img
          src={`https://picsum.photos/seed/${product.seed}/600/800`}
          alt={product.name}
          className="w-full h-full object-cover grayscale-[15%] group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-[#A8542E] text-[#EAE6DD] text-[10px] font-[IBM_Plex_Mono] tracking-widest px-2 py-1">
            NEW
          </span>
        )}
        <GarmentTag sku={product.sku} className="absolute -top-2 -right-2" />
      </div>
      <div className="mt-3 flex items-start justify-between">
        <div>
          <div className="text-sm font-medium text-[#1C1B18]">{product.name}</div>
          <div className="text-xs text-[#1C1B18]/50">{product.category}</div>
        </div>
        <div className="font-[IBM_Plex_Mono] text-sm text-[#1C1B18]">
          {money(product.price)}
        </div>
      </div>
    </button>
  );
}

/* ---------------------------- Home ---------------------------- */
function Home({ setView, onSelect }) {
  const featured = useMemo(() => PRODUCTS.slice(0, 4), []);
  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-12 md:pt-20 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="font-[IBM_Plex_Mono] text-xs tracking-widest text-[#4B5842] uppercase">
            EV-0001 — The whole catalog
          </span>
          <h1 className="font-[Space_Grotesk] font-bold text-4xl md:text-6xl leading-[1.02] mt-4 text-[#1C1B18]">
            Clothes for
            <br />
            one body of people.
          </h1>
          <p className="mt-6 text-[#1C1B18]/70 max-w-md leading-relaxed">
            EVREN makes one line, one size range, no men's or women's split.
            Fewer decisions for you, better fabric for the price, nothing cut
            to sell twice.
          </p>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setView("shop")}
              className="bg-[#1C1B18] text-[#EAE6DD] px-6 py-3 text-sm font-medium flex items-center gap-2 hover:bg-[#4B5842] transition-colors"
            >
              Shop the catalog <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setView("about")}
              className="border border-[#1C1B18] px-6 py-3 text-sm font-medium hover:bg-[#1C1B18]/5 transition-colors"
            >
              Our story
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] bg-[#DFDAD0] border border-[#1C1B18]/10 overflow-hidden">
            <img
              src="https://picsum.photos/seed/evren-hero/900/1100"
              alt="EVREN unisex clothing"
              className="w-full h-full object-cover grayscale-[15%]"
            />
          </div>
          <GarmentTag
            sku="EV-0001-HRO"
            size="lg"
            className="absolute -bottom-5 -left-5 hidden sm:block"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-[Space_Grotesk] font-bold text-2xl">
            Recently added
          </h2>
          <button
            onClick={() => setView("shop")}
            className="text-sm text-[#4B5842] font-medium hover:underline"
          >
            View all
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelect} />
          ))}
        </div>
      </section>

      <section className="bg-[#1C1B18] text-[#EAE6DD] mt-16 py-14">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-[IBM_Plex_Mono] text-xs text-[#EAE6DD]/50 mb-2">
              01
            </div>
            <p className="text-[#EAE6DD]/85">
              One size range from XS–XXL, fit-tested on both narrow and broad
              frames.
            </p>
          </div>
          <div>
            <div className="font-[IBM_Plex_Mono] text-xs text-[#EAE6DD]/50 mb-2">
              02
            </div>
            <p className="text-[#EAE6DD]/85">
              Heavier fabrics than most basics brands, priced without a
              markup for the label.
            </p>
          </div>
          <div>
            <div className="font-[IBM_Plex_Mono] text-xs text-[#EAE6DD]/50 mb-2">
              03
            </div>
            <p className="text-[#EAE6DD]/85">
              A short, static catalog. When something sells out, it's
              restocked, not replaced.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------- Shop ---------------------------- */
function Shop({ onSelect }) {
  const [category, setCategory] = useState("All");
  const categories = ["All", "Outerwear", "Tops", "Bottoms", "Accessories"];
  const filtered = useMemo(
    () =>
      category === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === category),
    [category]
  );

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="font-[IBM_Plex_Mono] text-xs tracking-widest text-[#4B5842] uppercase">
            Catalog
          </span>
          <h1 className="font-[Space_Grotesk] font-bold text-3xl mt-1">Shop</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                category === c
                  ? "bg-[#1C1B18] text-[#EAE6DD] border-[#1C1B18]"
                  : "border-[#1C1B18]/25 text-[#1C1B18]/70 hover:border-[#1C1B18]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------- Product Detail ---------------------------- */
function ProductDetail({ product, setView, addToCart, onSelect }) {
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const related = useMemo(() => PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3), [product.category, product.id]);

  const handleAdd = () => {
    addToCart(product, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">
      <button
        onClick={() => setView("shop")}
        className="flex items-center gap-2 text-sm text-[#1C1B18]/60 hover:text-[#1C1B18] mb-6"
      >
        <ArrowLeft size={15} /> Back to shop
      </button>

      <div className="grid md:grid-cols-2 gap-10 md:gap-14">
        <div className="relative">
          <div className="aspect-[3/4] bg-[#DFDAD0] border border-[#1C1B18]/10 overflow-hidden">
            <img
              src={`https://picsum.photos/seed/${product.seed}/700/900`}
              alt={product.name}
              className="w-full h-full object-cover grayscale-[15%]"
            />
          </div>
          <GarmentTag sku={product.sku} size="lg" className="absolute -top-4 -right-4" />
        </div>

        <div>
          <span className="text-xs font-[IBM_Plex_Mono] text-[#4B5842] uppercase tracking-widest">
            {product.category}
          </span>
          <h1 className="font-[Space_Grotesk] font-bold text-3xl mt-2">
            {product.name}
          </h1>
          <div className="font-[IBM_Plex_Mono] text-xl mt-3">
            {money(product.price)}
          </div>
          <p className="mt-5 text-[#1C1B18]/70 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 text-sm text-[#1C1B18]/70 space-y-1">
            <div>
              <span className="text-[#1C1B18]/45">Fabric — </span>
              {product.fabric}
            </div>
            <div>
              <span className="text-[#1C1B18]/45">Fit — </span>
              {product.fit}
            </div>
          </div>

          <div className="mt-8">
            <div className="text-xs font-[IBM_Plex_Mono] uppercase tracking-widest text-[#1C1B18]/50 mb-2">
              Size
            </div>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-11 h-11 text-sm font-medium border transition-colors ${
                    size === s
                      ? "bg-[#1C1B18] text-[#EAE6DD] border-[#1C1B18]"
                      : "border-[#1C1B18]/25 hover:border-[#1C1B18]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-[#1C1B18]/25">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="p-3 hover:bg-[#1C1B18]/5"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-[IBM_Plex_Mono] text-sm">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="p-3 hover:bg-[#1C1B18]/5"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 bg-[#4B5842] text-[#EAE6DD] py-3 text-sm font-medium hover:bg-[#1C1B18] transition-colors flex items-center justify-center gap-2"
            >
              {added ? (
                <>
                  <Check size={16} /> Added to cart
                </>
              ) : (
                "Add to cart"
              )}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-[Space_Grotesk] font-bold text-xl mb-6">
            More in {product.category}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={onSelect} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------- Cart ---------------------------- */
function Cart({ cart, updateQty, removeItem, setView }) {
  const subtotal = useMemo(() => cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  ), [cart]);
  const shipping = cart.length === 0 ? 0 : subtotal >= 150 ? 0 : 8;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-24 text-center">
        <ShoppingBag size={32} className="mx-auto text-[#1C1B18]/30" />
        <h1 className="font-[Space_Grotesk] font-bold text-2xl mt-4">
          Your cart is empty
        </h1>
        <p className="text-[#1C1B18]/60 mt-2">
          Nothing added yet — the catalog is short, this won't take long.
        </p>
        <button
          onClick={() => setView("shop")}
          className="mt-6 bg-[#1C1B18] text-[#EAE6DD] px-6 py-3 text-sm font-medium hover:bg-[#4B5842] transition-colors"
        >
          Shop the catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 md:px-8 py-10">
      <h1 className="font-[Space_Grotesk] font-bold text-3xl mb-8">Cart</h1>
      <div className="divide-y divide-[#1C1B18]/10 border-y border-[#1C1B18]/10">
        {cart.map((item) => (
          <div
            key={`${item.product.id}-${item.size}`}
            className="py-5 flex gap-4"
          >
            <div className="w-20 h-24 bg-[#DFDAD0] border border-[#1C1B18]/10 overflow-hidden flex-shrink-0">
              <img
                src={`https://picsum.photos/seed/${item.product.seed}/200/240`}
                alt={item.product.name}
                className="w-full h-full object-cover grayscale-[15%]"
              />
            </div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="font-medium text-sm">{item.product.name}</div>
                <div className="text-xs text-[#1C1B18]/50 mt-0.5">
                  Size {item.size} · {item.product.sku}
                </div>
                <div className="font-[IBM_Plex_Mono] text-sm mt-1">
                  {money(item.product.price)}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#1C1B18]/25">
                  <button
                    onClick={() =>
                      updateQty(item.product.id, item.size, item.qty - 1)
                    }
                    className="p-2 hover:bg-[#1C1B18]/5"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-7 text-center font-[IBM_Plex_Mono] text-xs">
                    {item.qty}
                  </span>
                  <button
                    onClick={() =>
                      updateQty(item.product.id, item.size, item.qty + 1)
                    }
                    className="p-2 hover:bg-[#1C1B18]/5"
                    aria-label="Increase quantity"
                  >
                    <Plus size={13} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.product.id, item.size)}
                  className="text-[#1C1B18]/40 hover:text-[#A8542E]"
                  aria-label="Remove item"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 max-w-sm ml-auto space-y-2 text-sm">
        <div className="flex justify-between text-[#1C1B18]/70">
          <span>Subtotal</span>
          <span className="font-[IBM_Plex_Mono]">{money(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[#1C1B18]/70">
          <span>Shipping</span>
          <span className="font-[IBM_Plex_Mono]">
            {shipping === 0 ? "Free" : money(shipping)}
          </span>
        </div>
        <div className="flex justify-between font-medium text-base pt-2 border-t border-[#1C1B18]/15">
          <span>Total</span>
          <span className="font-[IBM_Plex_Mono]">{money(total)}</span>
        </div>
        <button
          onClick={() => setView("checkout")}
          className="w-full mt-4 bg-[#4B5842] text-[#EAE6DD] py-3 text-sm font-medium hover:bg-[#1C1B18] transition-colors"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

/* ---------------------------- Checkout ---------------------------- */
function Checkout({ cart, setView, onPlaceOrder }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    card: "",
  });

  const subtotal = useMemo(() => cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  ), [cart]);
  const shipping = subtotal >= 150 ? 0 : 8;
  const total = subtotal + shipping;

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const canSubmit = useMemo(() => 
    form.name && form.email && form.address && form.city && form.zip,
  [form]);

  return (
    <div className="max-w-5xl mx-auto px-5 md:px-8 py-10">
      <h1 className="font-[Space_Grotesk] font-bold text-3xl mb-8">Checkout</h1>
      <div className="grid md:grid-cols-5 gap-10">
        <div className="md:col-span-3 space-y-6">
          <div>
            <div className="text-xs font-[IBM_Plex_Mono] uppercase tracking-widest text-[#1C1B18]/50 mb-3">
              Contact
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input
                placeholder="Full name"
                value={form.name}
                onChange={update("name")}
                className="border border-[#1C1B18]/25 px-3 py-2.5 text-sm bg-transparent focus:outline-none focus:border-[#1C1B18]"
              />
              <input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={update("email")}
                className="border border-[#1C1B18]/25 px-3 py-2.5 text-sm bg-transparent focus:outline-none focus:border-[#1C1B18]"
              />
            </div>
          </div>

          <div>
            <div className="text-xs font-[IBM_Plex_Mono] uppercase tracking-widest text-[#1C1B18]/50 mb-3">
              Shipping address
            </div>
            <div className="space-y-3">
              <input
                placeholder="Street address"
                value={form.address}
                onChange={update("address")}
                className="w-full border border-[#1C1B18]/25 px-3 py-2.5 text-sm bg-transparent focus:outline-none focus:border-[#1C1B18]"
              />
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  placeholder="City"
                  value={form.city}
                  onChange={update("city")}
                  className="border border-[#1C1B18]/25 px-3 py-2.5 text-sm bg-transparent focus:outline-none focus:border-[#1C1B18]"
                />
                <input
                  placeholder="ZIP / postal code"
                  value={form.zip}
                  onChange={update("zip")}
                  className="border border-[#1C1B18]/25 px-3 py-2.5 text-sm bg-transparent focus:outline-none focus:border-[#1C1B18]"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-[IBM_Plex_Mono] uppercase tracking-widest text-[#1C1B18]/50 mb-3">
              Payment (placeholder)
            </div>
            <input
              placeholder="Card number"
              value={form.card}
              onChange={update("card")}
              className="w-full border border-[#1C1B18]/25 px-3 py-2.5 text-sm bg-transparent focus:outline-none focus:border-[#1C1B18]"
            />
            <p className="text-xs text-[#1C1B18]/45 mt-2">
              No real payment is processed — this is a placeholder form for the demo build.
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="border border-[#1C1B18]/15 p-5 sticky top-24">
            <div className="text-xs font-[IBM_Plex_Mono] uppercase tracking-widest text-[#1C1B18]/50 mb-4">
              Order summary
            </div>
            <div className="space-y-3 max-h-64 overflow-auto pr-1">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex justify-between text-sm"
                >
                  <span className="text-[#1C1B18]/75">
                    {item.product.name} · {item.size} × {item.qty}
                  </span>
                  <span className="font-[IBM_Plex_Mono]">
                    {money(item.product.price * item.qty)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-[#1C1B18]/15 space-y-1.5 text-sm">
              <div className="flex justify-between text-[#1C1B18]/70">
                <span>Subtotal</span>
                <span className="font-[IBM_Plex_Mono]">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#1C1B18]/70">
                <span>Shipping</span>
                <span className="font-[IBM_Plex_Mono]">
                  {shipping === 0 ? "Free" : money(shipping)}
                </span>
              </div>
              <div className="flex justify-between font-medium text-base pt-2 border-t border-[#1C1B18]/15">
                <span>Total</span>
                <span className="font-[IBM_Plex_Mono]">{money(total)}</span>
              </div>
            </div>
            <button
              disabled={!canSubmit}
              onClick={() => onPlaceOrder(form)}
              className={`w-full mt-5 py-3 text-sm font-medium transition-colors ${
                canSubmit
                  ? "bg-[#4B5842] text-[#EAE6DD] hover:bg-[#1C1B18]"
                  : "bg-[#1C1B18]/15 text-[#1C1B18]/40 cursor-not-allowed"
              }`}
            >
              Place order
            </button>
            <button
              onClick={() => setView("cart")}
              className="w-full mt-2 text-xs text-[#1C1B18]/50 hover:text-[#1C1B18]"
            >
              Back to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Confirmation ---------------------------- */
function Confirmation({ order, setView }) {
  if (!order) return null;
  return (
    <div className="max-w-lg mx-auto px-5 md:px-8 py-24 text-center">
      <div className="w-14 h-14 rounded-full bg-[#4B5842] text-[#EAE6DD] flex items-center justify-center mx-auto">
        <Check size={26} />
      </div>
      <h1 className="font-[Space_Grotesk] font-bold text-2xl mt-6">
        Order placed
      </h1>
      <p className="text-[#1C1B18]/65 mt-2">
        Thanks, {order.form.name.split(" ")[0]}. A confirmation would be sent
        to {order.form.email}.
      </p>
      <div className="mt-6 border border-[#1C1B18]/15 p-4 text-left text-sm">
        <div className="flex justify-between">
          <span className="text-[#1C1B18]/50">Order number</span>
          <span className="font-[IBM_Plex_Mono]">{order.number}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[#1C1B18]/50">Total</span>
          <span className="font-[IBM_Plex_Mono]">{money(order.total)}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-[#1C1B18]/50">Shipping to</span>
          <span className="text-right">{order.form.city}</span>
        </div>
      </div>
      <button
        onClick={() => setView("shop")}
        className="mt-8 bg-[#1C1B18] text-[#EAE6DD] px-6 py-3 text-sm font-medium hover:bg-[#4B5842] transition-colors"
      >
        Continue shopping
      </button>
    </div>
  );
}

/* ---------------------------- About ---------------------------- */
function About() {
  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-14">
      <span className="font-[IBM_Plex_Mono] text-xs tracking-widest text-[#4B5842] uppercase">
        Our story
      </span>
      <h1 className="font-[Space_Grotesk] font-bold text-3xl md:text-4xl mt-2">
        Evren means universe. We took it to mean everyone.
      </h1>
      <div className="mt-8 space-y-5 text-[#1C1B18]/75 leading-relaxed">
        <p>
          Most clothing gets designed twice — once for one gender, then
          adjusted for the other. EVREN started as an argument against that:
          a fit, a fabric weight, and a size range that get one pass, tested
          on as many different bodies as we could find willing to try on a
          prototype.
        </p>
        <p>
          The catalog stays small on purpose. Every piece is meant to be
          reordered for years, not replaced by next season's version of the
          same idea. When a fabric works, we keep buying it. When a fit is
          right, we don't touch it.
        </p>
        <p>
          We're not against style — we're against having to guess which
          aisle it's supposed to be sold in.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-4 text-center">
        <div className="border border-[#1C1B18]/15 p-4">
          <div className="font-[Space_Grotesk] font-bold text-2xl">1</div>
          <div className="text-xs text-[#1C1B18]/55 mt-1">size range</div>
        </div>
        <div className="border border-[#1C1B18]/15 p-4">
          <div className="font-[Space_Grotesk] font-bold text-2xl">10</div>
          <div className="text-xs text-[#1C1B18]/55 mt-1">core styles</div>
        </div>
        <div className="border border-[#1C1B18]/15 p-4">
          <div className="font-[Space_Grotesk] font-bold text-2xl">0</div>
          <div className="text-xs text-[#1C1B18]/55 mt-1">seasons</div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Contact ---------------------------- */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div className="max-w-xl mx-auto px-5 md:px-8 py-14">
      <span className="font-[IBM_Plex_Mono] text-xs tracking-widest text-[#4B5842] uppercase">
        Support
      </span>
      <h1 className="font-[Space_Grotesk] font-bold text-3xl mt-2">Contact</h1>
      <p className="text-[#1C1B18]/65 mt-2">
        Questions about sizing, an order, or anything else — this form is a
        placeholder, no message is actually sent.
      </p>

      {sent ? (
        <div className="mt-8 border border-[#4B5842]/30 bg-[#4B5842]/5 p-5 flex gap-3">
          <Mail size={18} className="text-[#4B5842] flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-sm">Message received</div>
            <p className="text-sm text-[#1C1B18]/60 mt-1">
              We'd get back to {form.name.split(" ")[0]} at {form.email}{" "}
              within a day or two.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-4">
          <input
            placeholder="Your name"
            value={form.name}
            onChange={update("name")}
            className="w-full border border-[#1C1B18]/25 px-3 py-2.5 text-sm bg-transparent focus:outline-none focus:border-[#1C1B18]"
            required
          />
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={update("email")}
            className="w-full border border-[#1C1B18]/25 px-3 py-2.5 text-sm bg-transparent focus:outline-none focus:border-[#1C1B18]"
            required
          />
          <textarea
            placeholder="Message"
            rows={5}
            value={form.message}
            onChange={update("message")}
            className="w-full border border-[#1C1B18]/25 px-3 py-2.5 text-sm bg-transparent focus:outline-none focus:border-[#1C1B18] resize-none"
            required
          />
          <button
            type="submit"
            className="bg-[#4B5842] text-[#EAE6DD] px-6 py-3 text-sm font-medium hover:bg-[#1C1B18] transition-colors"
          >
            Send message
          </button>
        </form>
      )}
    </div>
  );
}

/* ---------------------------- App ---------------------------- */
export default function App() {
  const [view, setView] = useState("home");
  const [selectedId, setSelectedId] = useState(PRODUCTS[0].id);
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);

  // Initialize cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("evren-cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("evren-cart", JSON.stringify(cart));
  }, [cart]);

  const selectedProduct = useMemo(() => 
    PRODUCTS.find((p) => p.id === selectedId),
  [selectedId]);

  const onSelect = (id) => {
    setSelectedId(id);
    setView("product");
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product, size, qty) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [...prev, { product, size, qty }];
    });
  };

  const updateQty = (productId, size, qty) => {
    if (qty < 1) return removeItem(productId, size);
    setCart((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.size === size ? { ...i, qty } : i
      )
    );
  };

  const removeItem = (productId, size) => {
    setCart((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.size === size))
    );
  };

  const handlePlaceOrder = (form) => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.qty,
      0
    );
    const shipping = subtotal >= 150 ? 0 : 8;
    const number =
      "EV-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrder({ form, total: subtotal + shipping, number });
    setCart([]);
    setView("confirmation");
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  const cartCount = useMemo(() => 
    cart.reduce((sum, i) => sum + i.qty, 0),
  [cart]);

  const goto = (v) => {
    setView(v);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#EAE6DD] text-[#1C1B18] font-[Inter]">
      <style>{FONT_IMPORT}</style>
      <Header
        view={view}
        setView={goto}
        cartCount={cartCount}
        onCartClick={() => goto("cart")}
      />

      <main>
        {view === "home" && <Home setView={goto} onSelect={onSelect} />}
        {view === "shop" && <Shop onSelect={onSelect} />}
        {view === "product" && (
          <ProductDetail
            product={selectedProduct}
            setView={goto}
            addToCart={addToCart}
            onSelect={onSelect}
          />
        )}
        {view === "cart" && (
          <Cart
            cart={cart}
            updateQty={updateQty}
            removeItem={removeItem}
            setView={goto}
          />
        )}
        {view === "checkout" && (
          <Checkout cart={cart} setView={goto} onPlaceOrder={handlePlaceOrder} />
        )}
        {view === "confirmation" && <Confirmation order={order} setView={goto} />}
        {view === "about" && <About />}
        {view === "contact" && <Contact />}
      </main>

      <Footer setView={goto} />
    </div>
  );
}
