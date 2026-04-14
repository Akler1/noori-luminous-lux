import { Helmet } from "react-helmet-async";

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export const JsonLd = ({ data }: JsonLdProps) => (
  <Helmet>
    <script type="application/ld+json">{JSON.stringify(data)}</script>
  </Helmet>
);

// ── Reusable schema builders ──

const SITE = "https://noori.design";
const LOGO = `${SITE}/favicon.ico`;
const OG_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/823f9473-112c-4d32-9a92-be5a53d1f811/id-preview-141b0c37--11eaedaa-af7f-4c5f-b6f4-d9f0c80de3a9.lovable.app-1773436025890.png";

export const NOORI_ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Noori",
  url: SITE,
  logo: LOGO,
  image: OG_IMAGE,
  description:
    "Noori creates heirloom-quality lab-grown diamond jewelry — pendants, earrings, and bracelets — in 14K and 18K gold. IGI-certified, ethically sourced, and built to be worn for life.",
  founder: { "@type": "Person", name: "Amaan Kler" },
  foundingDate: "2024",
  sameAs: [
    "https://www.instagram.com/noori.design",
    "https://twitter.com/noori_diamonds",
    "https://www.tiktok.com/@noori.design",
  ],
  brand: { "@type": "Brand", name: "Noori" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@noori.design",
  },
};

export const NOORI_WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Noori",
  url: SITE,
  description:
    "Luxury lab-grown diamond jewelry. IGI-certified pendants, earrings, and bracelets in 14K and 18K gold.",
  publisher: { "@type": "Organization", name: "Noori", url: SITE },
};

export function breadcrumbs(
  items: Array<{ name: string; url: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.url}`,
    })),
  };
}

export function productSchema(opts: {
  name: string;
  description: string;
  handle: string;
  price: string;
  currency: string;
  sku?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  available?: boolean;
}): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    url: `${SITE}/product/${opts.handle}`,
    brand: { "@type": "Brand", name: "Noori" },
    material: "Lab-Grown Diamond, 14K/18K Gold",
    manufacturer: { "@type": "Organization", name: "Noori" },
    offers: {
      "@type": "Offer",
      url: `${SITE}/product/${opts.handle}`,
      priceCurrency: opts.currency,
      price: opts.price,
      availability: opts.available !== false
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Noori" },
    },
  };
  if (opts.sku) schema.sku = opts.sku;
  if (opts.image) schema.image = opts.image;
  if (opts.rating && opts.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: opts.rating,
      reviewCount: opts.reviewCount,
      bestRating: 5,
    };
  }
  return schema;
}

export function faqSchema(
  pairs: Array<{ q: string; a: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.a },
    })),
  };
}
