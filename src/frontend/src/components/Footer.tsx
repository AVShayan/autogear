import { Zap } from "lucide-react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[oklch(0.07_0_0)] border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-primary">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-extrabold text-lg tracking-widest">
              AUTO<span className="text-primary">GEAR</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            India's premium destination for automobile accessories. Quality
            products, unbeatable prices.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <SiFacebook />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <SiX />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <SiInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <SiYoutube />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-xs tracking-widest uppercase text-foreground mb-3">
            Categories
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "Interior",
              "Exterior",
              "Maintenance",
              "Electronics",
              "Tyres & Wheels",
            ].map((c) => (
              <li key={c}>
                <a
                  href="/products"
                  className="hover:text-primary transition-colors"
                >
                  {c}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs tracking-widest uppercase text-foreground mb-3">
            Support
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              "FAQ",
              "Shipping Policy",
              "Returns",
              "Track Order",
              "Contact Us",
            ].map((l) => (
              <li key={l}>
                <a href="/" className="hover:text-primary transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xs tracking-widest uppercase text-foreground mb-3">
            Newsletter
          </h4>
          <p className="text-muted-foreground text-sm mb-3">
            Get the latest deals and offers.
          </p>
          <div className="flex">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email"
              className="flex-1 bg-secondary border border-border text-sm px-3 py-2 rounded-l focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="button"
              className="bg-primary text-primary-foreground text-sm px-3 py-2 rounded-r font-bold hover:opacity-90 transition-opacity"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-muted-foreground text-xs">
          © {year} AutoGear. All rights reserved.
        </p>
        <p className="text-muted-foreground text-xs">
          Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
