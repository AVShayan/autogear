import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "../backend.d";
import { useCart } from "../context/CartContext";

interface Props {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (id: bigint) => void;
  showAdmin?: boolean;
}

const FALLBACK_IMAGES: Record<string, string> = {
  Interior: "/assets/generated/product-seat-covers.dim_400x300.jpg",
  Exterior: "/assets/generated/product-car-cover.dim_400x300.jpg",
  Maintenance: "/assets/generated/product-oil-kit.dim_400x300.jpg",
  Electronics: "/assets/generated/product-dashcam.dim_400x300.jpg",
  "Tyres & Wheels": "/assets/generated/product-alloy-wheel.dim_400x300.jpg",
};

export default function ProductCard({
  product,
  onEdit,
  onDelete,
  showAdmin,
}: Props) {
  const { addToCart } = useCart();

  const imgSrc =
    product.imageUrl && product.imageUrl.trim() !== ""
      ? product.imageUrl
      : (FALLBACK_IMAGES[product.category] ??
        "/assets/generated/product-floor-mats.dim_400x300.jpg");

  return (
    <div className="bg-card border border-border rounded overflow-hidden flex flex-col group hover:border-primary/50 transition-colors">
      <div className="relative overflow-hidden h-48 bg-secondary">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/generated/product-floor-mats.dim_400x300.jpg";
          }}
        />
        <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wide">
          {product.category}
        </span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-bold text-foreground text-base leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-xs mb-3 flex-1 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-3 h-3 fill-primary text-primary" />
          ))}
          <span className="text-muted-foreground text-xs ml-1">(4.8)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-display font-extrabold text-primary text-xl">
            ₹{Number(product.price).toLocaleString("en-IN")}
          </span>
          <span className="text-muted-foreground text-xs">
            Stock: {Number(product.stock)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-3 w-full bg-primary text-primary-foreground font-bold text-sm py-2 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          data-ocid="product.add_to_cart.button"
        >
          <ShoppingCart className="w-4 h-4" />
          ADD TO CART
        </button>
        {showAdmin && (
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => onEdit?.(product)}
              className="flex-1 bg-secondary text-foreground text-xs font-semibold py-1.5 rounded border border-border hover:border-primary hover:text-primary transition-colors"
              data-ocid="product.edit.button"
            >
              EDIT
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(product.id)}
              className="flex-1 bg-destructive/10 text-destructive text-xs font-semibold py-1.5 rounded border border-destructive/30 hover:bg-destructive/20 transition-colors"
              data-ocid="product.delete.button"
            >
              DELETE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
