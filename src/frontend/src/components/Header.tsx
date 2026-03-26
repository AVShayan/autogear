import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingCart, X, Zap } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { totalItems } = useCart();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/products", label: "PRODUCTS" },
    { to: "/admin", label: "ADMIN" },
    { to: "/cart", label: "CART" },
  ];

  const isActive = (to: string) => pathname === to;

  return (
    <header className="sticky top-0 z-50 bg-[oklch(0.07_0_0)] border-b border-border">
      <div className="flex items-center justify-between px-4 md:px-8 h-16">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="header.link"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded bg-primary">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-extrabold text-xl tracking-widest text-foreground">
            AUTO<span className="text-primary">GEAR</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-xs font-semibold tracking-widest transition-colors hover:text-primary ${
                isActive(link.to)
                  ? "text-primary border-b-2 border-primary pb-0.5"
                  : "text-muted-foreground"
              }`}
              data-ocid={`nav.${link.label.toLowerCase()}.link`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
            data-ocid="header.cart.button"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="bg-primary-foreground text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-black">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-secondary border-t border-border px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-semibold tracking-widest ${
                isActive(link.to) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
