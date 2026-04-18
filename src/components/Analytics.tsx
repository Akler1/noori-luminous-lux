import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

const GA_ID = "G-WRT4F0QL8X";

/**
 * Fires a GA4 page_view on every React Router navigation.
 * GA4 Enhanced Measurement also picks up history changes, but this
 * guarantees the event fires with the correct page_title after React
 * has re-rendered (including whatever <Helmet> set on the new page).
 */
export const Analytics = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("config", GA_ID, {
      page_path: pathname + search,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
};
