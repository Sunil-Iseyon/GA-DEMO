// app/products/page.tsx
"use client";

import Link from "next/link";
import { event } from "@/lib/gtag";
import styles from "./products.module.css";

const PRODUCTS = [
  { id: 1, name: "Analytics Pro", price: 29, emoji: "📈" },
  { id: 2, name: "Insights Dashboard", price: 49, emoji: "🎯" },
  { id: 3, name: "Event Tracker", price: 19, emoji: "🔔" },
];

export default function ProductsPage() {
  const handleAddToCart = (name: string, price: number) => {
    // Track an "add_to_cart" ecommerce-style event
    event({
      action: "add_to_cart",
      category: "Ecommerce",
      label: name,
      value: price,
    });
    alert(`✅ Tracked: add_to_cart for "${name}" ($${price})`);
  };

  const handleViewProduct = (name: string) => {
    event({
      action: "view_item",
      category: "Ecommerce",
      label: name,
    });
  };

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.back}>← Back to Home</Link>
      </nav>

      <h1 className={styles.title}>Products</h1>
      <p className={styles.lead}>Click "Add to Cart" to fire an <code>add_to_cart</code> ecommerce event in GA4.</p>

      <div className={styles.grid}>
        {PRODUCTS.map((p) => (
          <div
            key={p.id}
            className={styles.card}
            onMouseEnter={() => handleViewProduct(p.name)}
          >
            <div className={styles.emoji}>{p.emoji}</div>
            <h3 className={styles.name}>{p.name}</h3>
            <p className={styles.price}>${p.price}/mo</p>
            <button
              className={styles.btn}
              onClick={() => handleAddToCart(p.name, p.price)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
