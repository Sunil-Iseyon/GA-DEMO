// lib/gtag.ts
// Google Analytics utility functions

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string;

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

// ─── Utility: Check if gtag is available ─────────────────────────────────────
const isGTagAvailable = (): boolean => {
  return typeof window !== "undefined" && typeof window.gtag === "function";
};

// ─── Page View ────────────────────────────────────────────────────────────────
// Called automatically on route change via usePathname()
export const pageview = (url: string) => {
  if (!isGTagAvailable()) {
    console.warn("gtag is not available yet");
    return;
  }
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// ─── Custom Events ────────────────────────────────────────────────────────────
// Call this anywhere in your app to track user actions
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;       // e.g. "click", "submit", "view"
  category: string;     // e.g. "Button", "Form", "Video"
  label?: string;       // e.g. "Hero CTA", "Newsletter"
  value?: number;       // Optional numeric value (e.g. order amount)
}) => {
  if (!isGTagAvailable()) {
    console.warn("gtag is not available yet");
    return;
  }
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
