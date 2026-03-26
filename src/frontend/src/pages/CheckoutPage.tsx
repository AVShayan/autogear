import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  CreditCard,
  Loader2,
  Package,
  Smartphone,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { OrderItem } from "../backend.d";
import { useCart } from "../context/CartContext";
import { usePlaceOrder } from "../hooks/useQueries";

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "cod", label: "Cash on Delivery", icon: Package },
];

const DELIVERY_FIELDS = [
  {
    field: "fullName",
    label: "Full Name",
    placeholder: "Rahul Sharma",
    type: "text",
  },
  {
    field: "email",
    label: "Email Address",
    placeholder: "rahul@email.com",
    type: "email",
  },
  {
    field: "phone",
    label: "Phone Number",
    placeholder: "+91 98765 43210",
    type: "tel",
  },
  { field: "city", label: "City", placeholder: "Mumbai", type: "text" },
  { field: "pincode", label: "Pincode", placeholder: "400001", type: "text" },
] as const;

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const placeOrderMutation = usePlaceOrder();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      quantity: BigInt(item.quantity),
      price: item.product.price,
    }));
    try {
      await placeOrderMutation.mutateAsync({
        items: orderItems,
        total: BigInt(total),
      });
      clearCart();
      toast.success("Order placed! Thank you! 🎉");
      navigate({ to: "/" });
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground text-lg mb-4">
          Your cart is empty.
        </p>
        <button
          type="button"
          onClick={() => navigate({ to: "/products" })}
          className="bg-primary text-primary-foreground px-6 py-2 rounded font-bold hover:opacity-90"
        >
          Browse Products
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <h1 className="font-display font-extrabold text-3xl uppercase tracking-widest mb-8">
        SECURE <span className="text-primary">CHECKOUT</span>
      </h1>

      <form onSubmit={handleOrder} className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="bg-card border border-border rounded p-6">
            <h2 className="font-display font-bold uppercase tracking-widest text-sm mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-black">
                1
              </span>
              DELIVERY INFORMATION
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DELIVERY_FIELDS.map(({ field, label, placeholder, type }) => (
                <div key={field}>
                  <label
                    htmlFor={`checkout-${field}`}
                    className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5"
                  >
                    {label}
                  </label>
                  <input
                    id={`checkout-${field}`}
                    type={type}
                    value={form[field]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [field]: e.target.value }))
                    }
                    placeholder={placeholder}
                    required
                    className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                    data-ocid={`checkout.${field}.input`}
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5"
                >
                  Full Address
                </label>
                <textarea
                  id="checkout-address"
                  value={form.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address: e.target.value }))
                  }
                  placeholder="House/Flat no., Street, Area..."
                  required
                  rows={2}
                  className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground resize-none"
                  data-ocid="checkout.address.textarea"
                />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded p-6">
            <h2 className="font-display font-bold uppercase tracking-widest text-sm mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-black">
                2
              </span>
              PAYMENT METHOD
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPaymentMethod(id)}
                  className={`flex items-center gap-3 p-4 rounded border transition-all text-left ${
                    paymentMethod === id
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-primary/50"
                  }`}
                  data-ocid={`checkout.payment.${id}.toggle`}
                >
                  <Icon
                    className={`w-5 h-5 flex-shrink-0 ${paymentMethod === id ? "text-primary" : ""}`}
                  />
                  <span className="text-sm font-semibold">{label}</span>
                  {paymentMethod === id && (
                    <CheckCircle2 className="w-4 h-4 text-primary ml-auto" />
                  )}
                </button>
              ))}
            </div>

            {paymentMethod === "card" && (
              <div className="mt-4 space-y-3">
                <div>
                  <label
                    htmlFor="card-number"
                    className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5"
                  >
                    Card Number
                  </label>
                  <input
                    id="card-number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                    data-ocid="checkout.card_number.input"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="card-expiry"
                      className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5"
                    >
                      Expiry
                    </label>
                    <input
                      id="card-expiry"
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                      data-ocid="checkout.card_expiry.input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="card-cvv"
                      className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5"
                    >
                      CVV
                    </label>
                    <input
                      id="card-cvv"
                      type="text"
                      placeholder="•••"
                      maxLength={3}
                      className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                      data-ocid="checkout.card_cvv.input"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="mt-4">
                <label
                  htmlFor="upi-id"
                  className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5"
                >
                  UPI ID
                </label>
                <input
                  id="upi-id"
                  type="text"
                  placeholder="yourname@upi"
                  className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                  data-ocid="checkout.upi_id.input"
                />
              </div>
            )}

            {paymentMethod === "cod" && (
              <div className="mt-4 bg-secondary/50 rounded p-4 text-sm text-muted-foreground">
                💰 Pay ₹{total.toLocaleString("en-IN")} in cash when your order
                is delivered.
              </div>
            )}
          </div>
        </div>

        <div className="lg:w-80 flex-shrink-0">
          <div className="bg-card border border-border rounded p-6 sticky top-24">
            <h2 className="font-display font-bold uppercase tracking-widest text-sm mb-4">
              ORDER SUMMARY
            </h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div
                  key={String(item.product.id)}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground flex-1 truncate mr-2">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-semibold flex-shrink-0">
                    ₹
                    {(
                      Number(item.product.price) * item.quantity
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span
                  className={shipping === 0 ? "text-primary font-bold" : ""}
                >
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between font-extrabold border-t border-border pt-2">
                <span>TOTAL</span>
                <span className="text-primary text-xl">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={placeOrderMutation.isPending}
              className="mt-6 w-full bg-primary text-primary-foreground font-extrabold py-4 rounded text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 uppercase tracking-widest"
              data-ocid="checkout.place_order.button"
            >
              {placeOrderMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> PLACING ORDER...
                </>
              ) : (
                "PLACE ORDER"
              )}
            </button>
            <p className="text-center text-xs text-muted-foreground mt-3">
              🔒 Secure & encrypted checkout
            </p>
          </div>
        </div>
      </form>
    </main>
  );
}
