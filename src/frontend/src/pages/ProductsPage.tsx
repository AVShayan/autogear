import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useGetProducts } from "../hooks/useQueries";

const CATEGORIES = [
  "All",
  "Interior",
  "Exterior",
  "Maintenance",
  "Electronics",
  "Tyres & Wheels",
];

export default function ProductsPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { data: products = [], isLoading } = useGetProducts();

  const filtered = products.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="font-display font-extrabold text-3xl uppercase tracking-widest">
          ALL <span className="text-primary">PRODUCTS</span>
        </h1>
        <div className="flex gap-2">
          <label htmlFor="products-search" className="sr-only">
            Search accessories
          </label>
          <input
            id="products-search"
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
    </main>
  );
}
