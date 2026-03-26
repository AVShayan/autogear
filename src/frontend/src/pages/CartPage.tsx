import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <main
        className="max-w-4xl mx-auto px-4 py-20 text-center"
        data-ocid="cart.empty_state"
      >
        <ShoppingBag className="w-16 h-16 text-primary/40 mx-auto mb-4" />
        <h1 className="font-display font-extrabold text-3xl uppercase tracking-widest mb-2">
          YOUR CART IS EMPTY
        </h1>
        <p className="text-muted-foreground mb-8">
          Add some accessories to get started
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3 rounded hover:opacity-90 transition-opacity"
          data-ocid="cart.continue_shopping.button"
        >
          BROWSE PRODUCTS <ArrowRight className="w-4 h-4" />
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <h1 className="font-display font-extrabold text-3xl uppercase tracking-widest mb-8">
        SHOPPING <span className="text-primary">CART</span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <AnimatePresence>
            {items.map((item, i) => (
              <motion.div
                key={String(item.product.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card border border-border rounded flex gap-4 p-4"
                data-ocid={`cart.item.${i + 1}`}
              >
                <div className="w-20 h-20 rounded overflow-hidden bg-secondary flex-shrink-0">
                  <img
                    src={
                      item.product.imageUrl ||
                      "/assets/generated/product-floor-mats.dim_400x300.jpg"
                    }
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/generated/product-floor-mats.dim_400x300.jpg";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-sm">
                    {item.product.name}
                  </h3>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {item.product.category}
                  </p>
                  <p className="text-primary font-extrabold mt-1">
                    ₹{Number(item.product.price).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    data-ocid="cart.item.delete.button"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                      data-ocid="cart.item.qty_minus.button"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-bold text-sm w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="w-7 h-7 rounded border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                      data-ocid="cart.item.qty_plus.button"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-extrabold text-foreground text-sm">
                    ₹
                    {(
                      Number(item.product.price) * item.quantity
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:w-80 flex-shrink-0">
          <div
            className="bg-card border border-border rounded p-6 sticky top-24"
            data-ocid="cart.summary.panel"
          >
            <h2 className="font-display font-extrabold text-lg uppercase tracking-widest mb-5">
              ORDER SUMMARY
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span
                  className={
                    shipping === 0 ? "text-primary font-bold" : "font-semibold"
                  }
                >
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-muted-foreground text-xs">
                  Add ₹{(999 - subtotal).toLocaleString("en-IN")} more for free
                  shipping
                </p>
              )}
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-bold uppercase tracking-widest text-xs">
                  Total
                </span>
                <span className="font-extrabold text-primary text-xl">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate({ to: "/checkout" })}
              className="mt-6 w-full bg-primary text-primary-foreground font-bold py-3 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              data-ocid="cart.checkout.button"
            >
              PROCEED TO PAYMENT <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/products"
              className="block text-center mt-3 text-xs text-muted-foreground hover:text-primary transition-colors"
              data-ocid="cart.continue_shopping.link"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
