import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * Inject <link rel="preload"> for the hero LCP image at build time so the
 * browser starts fetching it during HTML parsing — long before React runs.
 * Uses media queries to only preload the size that matches the viewport
 * (mobile gets the 960w, desktop gets the 1920w). Cuts seconds off LCP.
 */
function preloadHeroImage(): Plugin {
  return {
    name: "preload-hero-image",
    apply: "build",
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html;

      const findAsset = (match: string) =>
        Object.values(ctx.bundle!).find(
          (chunk) => chunk.type === "asset" && chunk.fileName.includes(match)
        );

      const desktop = findAsset("hero-real-1920");
      const mobile = findAsset("hero-real-mobile-960");

      const tags: string[] = [];
      if (mobile) {
        tags.push(
          `<link rel="preload" as="image" type="image/webp" href="/${mobile.fileName}" fetchpriority="high" media="(max-width: 767px)">`
        );
      }
      if (desktop) {
        tags.push(
          `<link rel="preload" as="image" type="image/webp" href="/${desktop.fileName}" fetchpriority="high" media="(min-width: 768px)">`
        );
      }

      if (tags.length === 0) return html;
      return html.replace("</head>", `${tags.join("\n    ")}\n  </head>`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), preloadHeroImage(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Raise the warning threshold now that we've manually split large vendors
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Pull heavy vendors into their own cacheable chunks so the initial
        // page-load JS only contains what's needed for the hero.
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion", "gsap"],
          "vendor-radix": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
          ],
          "vendor-query": ["@tanstack/react-query"],
        },
      },
    },
  },
}));
