# 📊 Next.js + Google Analytics 4 Demo

A clean demo showing how to integrate Google Analytics 4 (GA4) into a **Next.js 14 App Router** project with:

- ✅ Automatic **page view** tracking on every route change
- ✅ **Custom event** tracking (clicks, form submits, ecommerce)
- ✅ TypeScript support
- ✅ `next/script` for optimal script loading

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Add your GA Measurement ID
Open `.env.local` and replace the placeholder:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
> Get your ID from: **Google Analytics → Admin → Data Streams → your stream → Measurement ID**

### 3. Run the dev server
```bash
npm run dev
```
Visit `http://localhost:3000`

---

## 📁 Project Structure

```
ga-demo/
├── app/
│   ├── layout.tsx          # Root layout — mounts <GoogleAnalytics /> globally
│   ├── page.tsx            # Home page with click + form event demos
│   ├── about/page.tsx      # About page (demos page view tracking)
│   └── products/page.tsx   # Products page (demos ecommerce events)
├── components/
│   └── GoogleAnalytics.tsx # Loads GA script, tracks route changes
├── lib/
│   └── gtag.ts             # pageview() and event() helpers
└── .env.local              # Your GA Measurement ID goes here
```

---

## 🔬 Key Files Explained

### `lib/gtag.ts`
Two exported functions:

```ts
// Track a page view (called automatically on route change)
pageview(url: string)

// Track a custom event
event({ action, category, label?, value? })
```

### `components/GoogleAnalytics.tsx`
- Injects `gtag.js` via `<Script strategy="afterInteractive">`
- Uses `usePathname()` + `useEffect` to fire `pageview()` on every navigation
- Wrapped in `<Suspense>` as required by Next.js App Router

### `app/layout.tsx`
```tsx
<GoogleAnalytics />   // ← add once here, works on all pages
```

---

## 📡 Tracking Examples

### Page Views (automatic)
```tsx
// In GoogleAnalytics.tsx — fires on every route change
useEffect(() => {
  pageview(pathname);
}, [pathname]);
```

### Button Click
```tsx
import { event } from "@/lib/gtag";

event({ action: "click", category: "Button", label: "Hero CTA" });
```

### Form Submit
```tsx
event({ action: "submit", category: "Form", label: "Newsletter", value: 1 });
```

### Ecommerce (add to cart)
```tsx
event({ action: "add_to_cart", category: "Ecommerce", label: "Product Name", value: 29 });
```

---

## 🔍 Verify in Google Analytics

1. Open your GA4 property
2. Go to **Reports → Realtime**
3. Interact with the demo (click buttons, navigate pages, submit form)
4. Watch events appear live!

---

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Google Analytics 4** (gtag.js)
- **CSS Modules**
