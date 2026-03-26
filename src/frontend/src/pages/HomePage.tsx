import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  RotateCcw,
  Search,
  Shield,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useGetProducts, useInitializeStore } from "../hooks/useQueries";

const CATEGORIES = [
  "All",
  "Interior",
  "Exterior",
  "Maintenance",
  "Electronics",
  "Tyres & Wheels",
];

export default function HomePage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useInitializeStore();
  const { data: products = [], isLoading } = useGetProducts();

  const filtered = products.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main>
      {/* Hero */}
      <section
        className="relative h-[500px] flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-auto.dim_1400x500.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        data-ocid="hero.section"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.07_0_0/0.92)] via-[oklch(0.07_0_0/0.7)] to-transparent" />
        <div className="relative z-10 px-6 md:px-16 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary text-xs font-bold tracking-[0.3em] uppercase mb-3"
          >
            Premium Automobile Accessories
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-4xl md:text-6xl uppercase leading-tight text-foreground mb-4"
          >
            GEAR UP YOUR <span className="text-primary">RIDE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base mb-8"
          >
            Top-quality car accessories for every vehicle. Trusted by 50,000+
            drivers across India.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3"
          >
            <Link
              to="/products"
              className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded flex items-center gap-2 hover:opacity-90 transition-opacity"
              data-ocid="hero.shop_now.button"
            >
              SHOP NOW <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/admin"
              className="border border-primary/40 text-foreground font-semibold px-6 py-3 rounded flex items-center gap-2 hover:border-primary transition-colors"
              data-ocid="hero.manage.button"
            >
              MANAGE STORE
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust badges */}
      <div className="bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          {[
            { icon: Shield, text: "100% Genuine Products" },
            { icon: Truck, text: "Free Shipping above ₹999" },
            { icon: RotateCcw, text: "Easy 30-day Returns" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <section id="products" className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h2 className="font-display font-extrabold text-2xl uppercase tracking-widest">
            FEATURED <span className="text-primary">ACCESSORIES</span>
          </h2>
          <div className="flex gap-2">
            <label htmlFor="home-search" className="sr-only">
              Search accessories
            </label>
            <input
              id="home-search"
              type="text"
              placeholder="Search accessories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-secondary border border-border text-sm px-4 py-2 rounded-l focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground w-48"
              data-ocid="products.search_input"
            />
            <button
              type="button"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-r hover:opacity-90 transition-opacity"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          className="flex flex-wrap gap-2 mb-8"
          data-ocid="products.category.tab"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded border transition-colors ${
                category === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="products.loading_state"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              <Skeleton key={i} className="h-80 rounded" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="products.empty_state"
          >
            <p className="text-4xl mb-4">🔧</p>
            <p className="font-display font-bold text-xl uppercase tracking-widest">
              No products found
            </p>
            <p className="text-sm mt-2">
              Try a different category or search term
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {filtered.map((product, i) => (
              <motion.div
                key={String(product.id)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                data-ocid={`products.item.${i + 1}`}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* CTA banner */}
      <section className="bg-primary py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-extrabold text-3xl uppercase tracking-widest text-primary-foreground mb-2">
            READY TO UPGRADE YOUR RIDE?
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Browse our full catalog and find the perfect accessories for your
            vehicle.
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/products" })}
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary font-extrabold px-8 py-3 rounded hover:opacity-90 transition-opacity"
            data-ocid="cta.browse.button"
          >
            BROWSE ALL <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </main>
  );
}
