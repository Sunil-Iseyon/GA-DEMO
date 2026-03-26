// components/GoogleAnalytics.tsx
"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { GA_MEASUREMENT_ID, pageview } from "@/lib/gtag";

// Inner component that uses useSearchParams (must be inside Suspense)
function GATracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Fires on every route change — tracks page views in GA
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    pageview(url);
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    // Don't load GA if ID is not set (dev / demo)
    return null;
  }

  const handleScriptLoad = () => {
    // Initialize gtag after Google's script loads
    if (window.dataLayer === undefined) {
      window.dataLayer = [];
    }
    if (typeof window.gtag === "undefined") {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
    // Send initial config
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
      send_page_view: false,
    });
  };

  return (
    <>
      {/* Load the GA script from Google */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        onLoad={handleScriptLoad}
      />

      {/* Initialize GA as fallback */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
          `,
        }}
      />

      {/* Track route changes */}
      <Suspense fallback={null}>
        <GATracker />
      </Suspense>
    </>
  );
}
