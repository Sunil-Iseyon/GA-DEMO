// app/about/page.tsx
"use client";

import Link from "next/link";
import { event } from "@/lib/gtag";
import styles from "./about.module.css";

export default function AboutPage() {
  const handleDocsClick = () => {
    event({
      action: "click",
      category: "External Link",
      label: "GA4 Docs",
    });
  };

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.back}>← Back to Home</Link>
      </nav>

      <h1 className={styles.title}>About This Demo</h1>
      <p className={styles.lead}>
        Navigating to this page automatically fired a <strong>page_view</strong> event in Google Analytics.
        You can verify this in <em>GA › Reports › Realtime</em>.
      </p>

      <div className={styles.box}>
        <h2>Files That Matter</h2>
        <ul>
          <li><code>.env.local</code> — Put your <code>G-XXXXXXXX</code> Measurement ID here</li>
          <li><code>lib/gtag.ts</code> — <code>pageview()</code> and <code>event()</code> helpers</li>
          <li><code>components/GoogleAnalytics.tsx</code> — Loads the script, tracks route changes</li>
          <li><code>app/layout.tsx</code> — Mounts <code>&lt;GoogleAnalytics /&gt;</code> globally</li>
        </ul>
      </div>

      <a
        href="https://developers.google.com/analytics/devguides/collection/ga4"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
        onClick={handleDocsClick}
      >
        Read the GA4 Docs →
      </a>
    </div>
  );
}
