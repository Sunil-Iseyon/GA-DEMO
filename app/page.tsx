// app/page.tsx
"use client";

import Link from "next/link";
import { event } from "@/lib/gtag";
import styles from "./page.module.css";

export default function Home() {

  // ─── Track a button click ──────────────────────────────────────
  const handleCTAClick = () => {
    event({
      action: "click",
      category: "Button",
      label: "Hero CTA",
    });
    alert("✅ Event tracked! Check GA Realtime > Events for 'click'");
  };

  // ─── Track a form submit ───────────────────────────────────────
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
    event({
      action: "submit",
      category: "Form",
      label: "Newsletter Signup",
      value: 1,
    });
    alert(`✅ Form event tracked for: ${email}`);
  };

  // ─── Track a link click ────────────────────────────────────────
  const handleNavClick = (label: string) => {
    event({
      action: "click",
      category: "Navigation",
      label,
    });
  };

  return (
    <div className={styles.page}>
      {/* ── Nav ── */}
      <nav className={styles.nav}>
        <span className={styles.logo}>📊 GA Demo</span>
        <div className={styles.navLinks}>
          <Link href="/" onClick={() => handleNavClick("Home")}>Home</Link>
          <Link href="/about" onClick={() => handleNavClick("About")}>About</Link>
          <Link href="/products" onClick={() => handleNavClick("Products")}>Products</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.badge}>Google Analytics 4 + Next.js</div>
        <h1 className={styles.title}>
          Track Every<br />
          <span className={styles.accent}>User Action</span>
        </h1>
        <p className={styles.subtitle}>
          This demo shows how GA4 works in a Next.js App Router project —
          page views, custom events, and navigation tracking all wired up.
        </p>
        <button className={styles.cta} onClick={handleCTAClick}>
          🚀 Fire a Click Event
        </button>
      </section>

      {/* ── Event Cards ── */}
      <section className={styles.cards}>
        <h2 className={styles.sectionTitle}>What's Being Tracked</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>📄</div>
            <h3>Page Views</h3>
            <p>Every route change fires a <code>pageview()</code> call via <code>usePathname</code>. Try clicking the nav links above.</p>
            <div className={styles.codeBlock}>
              <code>pageview(url)</code>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>🖱️</div>
            <h3>Click Events</h3>
            <p>Custom events track button presses with category, label, and optional value.</p>
            <div className={styles.codeBlock}>
              <code>event(&#123; action, category, label &#125;)</code>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardIcon}>📋</div>
            <h3>Form Submits</h3>
            <p>Form interactions are tracked as events — useful for conversion funnels.</p>
            <div className={styles.codeBlock}>
              <code>event(&#123; action: "submit", value: 1 &#125;)</code>
            </div>
          </div>
        </div>
      </section>

      {/* ── Form Demo ── */}
      <section className={styles.formSection}>
        <h2 className={styles.sectionTitle}>Form Tracking Demo</h2>
        <p className={styles.formDesc}>Submit this form to fire a <strong>Form › Newsletter Signup</strong> event in GA.</p>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className={styles.input}
          />
          <button type="submit" className={styles.submitBtn}>
            Subscribe & Track →
          </button>
        </form>
      </section>

      {/* ── How it works ── */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <ol className={styles.steps}>
          <li><span className={styles.step}>1</span><div><strong>Script loads</strong> — <code>GoogleAnalytics</code> component injects the GA4 <code>gtag.js</code> script via Next.js <code>Script</code> with <code>strategy="afterInteractive"</code>.</div></li>
          <li><span className={styles.step}>2</span><div><strong>Route changes tracked</strong> — <code>usePathname()</code> fires <code>pageview()</code> on every navigation.</div></li>
          <li><span className={styles.step}>3</span><div><strong>Custom events</strong> — Call <code>event(&#123;&#125;)</code> from <code>lib/gtag.ts</code> anywhere to send custom events to GA.</div></li>
          <li><span className={styles.step}>4</span><div><strong>View in GA</strong> — Open <strong>Google Analytics › Reports › Realtime</strong> to see events live.</div></li>
        </ol>
      </section>

      <footer className={styles.footer}>
        <p>Built with Next.js 14 App Router + Google Analytics 4</p>
        <p className={styles.footerMuted}>Set your <code>NEXT_PUBLIC_GA_MEASUREMENT_ID</code> in <code>.env.local</code></p>
      </footer>
    </div>
  );
}
