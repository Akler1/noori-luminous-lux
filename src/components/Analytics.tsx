import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type GtagFn = (command: string, targetId: string, config?: Record<string, unknown>) => void;
type FbqFn = ((command: string, event: string, params?: Record<string, unknown>) => void) & {
  callMethod?: unknown;
  queue?: unknown[];
};
type TtqFn = {
  page: () => void;
  track: (event: string, params?: Record<string, unknown>) => void;
  identify: (params: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
    fbq?: FbqFn;
    ttq?: TtqFn;
  }
}

const GA_ID = "G-WRT4F0QL8X";

/**
 * Fires page_view events on every React Router navigation.
 * Runs AFTER the initial in-document pixel fire (so we don't double-count
 * the first page load) — only re-fires on subsequent route changes.
 *
 * - GA4: uses gtag('config', ...) which issues a page_view with the
 *   updated page_path + title set by <Helmet>.
 * - Meta Pixel: uses fbq('track', 'PageView') which is the standard
 *   pattern for SPAs per Meta's docs.
 */
export const Analytics = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    const url = pathname + search;

    // Skip the very first effect run — the pixel snippets in index.html
    // already fired PageView on initial load. We only want to track
    // subsequent client-side navigations here.
    if (skipFirst.value) {
      skipFirst.value = false;
      return;
    }

    if (typeof window.gtag === "function") {
      window.gtag("config", GA_ID, {
        page_path: url,
        page_title: document.title,
      });
    }

    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }

    if (window.ttq && typeof window.ttq.page === "function") {
      window.ttq.page();
    }
  }, [pathname, search]);

  return null;
};

// Module-level flag so we don't double-count the first page load.
const skipFirst = { value: true };
