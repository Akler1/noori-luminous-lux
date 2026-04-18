// Klaviyo onsite event tracking.
// The Klaviyo JS (loaded in index.html) exposes window._learnq — a push-style
// queue that Klaviyo processes asynchronously once its SDK boots. It's safe to
// push to it immediately on page load; events will fire when ready.
//
// Event schema follows Klaviyo's standard ecommerce spec so out-of-the-box
// flow templates (Abandoned Cart, Browse Abandonment, etc.) work without
// any per-flow customization.

type Learnq = { push: (args: unknown[]) => void };

declare global {
  interface Window {
    _learnq?: Learnq;
  }
}

const SITE_ORIGIN = "https://noori.design";

function q(): Learnq {
  if (typeof window === "undefined") {
    return { push: () => {} };
  }
  if (!window._learnq) window._learnq = [] as unknown as Learnq;
  return window._learnq;
}

// ── Category derivation from product handle ──

export function categoryFromHandle(handle?: string): string {
  if (!handle) return "Jewelry";
  if (handle.includes("studs")) return "Earrings";
  if (handle.includes("pendant")) return "Pendants";
  if (handle.includes("bracelet")) return "Bracelets";
  return "Jewelry";
}

// ── Event helpers ──

interface ViewedProductInput {
  id: string;
  handle: string;
  title: string;
  price: string; // numeric string from Shopify
  sku?: string;
  image?: string;
  compareAtPrice?: string;
}

export function klaviyoViewedProduct(p: ViewedProductInput): void {
  const url = `${SITE_ORIGIN}/product/${p.handle}`;
  const categories = [categoryFromHandle(p.handle)];
  const payload: Record<string, unknown> = {
    ProductID: p.id,
    ProductName: p.title,
    Categories: categories,
    ImageURL: p.image,
    URL: url,
    Brand: "Noori",
    Price: parseFloat(p.price),
  };
  if (p.sku) payload.SKU = p.sku;
  if (p.compareAtPrice) payload.CompareAtPrice = parseFloat(p.compareAtPrice);

  q().push(["track", "Viewed Product", payload]);

  // Also push to trackViewedItem so it shows up in Klaviyo's "Recently Viewed"
  // feed + Browse Abandonment flow can personalize emails with this item
  q().push([
    "trackViewedItem",
    {
      Title: p.title,
      ItemId: p.id,
      Categories: categories,
      ImageUrl: p.image,
      Url: url,
      Metadata: { Brand: "Noori", Price: parseFloat(p.price) },
    },
  ]);
}

interface AddedToCartInput {
  productId: string;
  productHandle: string;
  productTitle: string;
  variantId: string;
  variantSku?: string;
  variantPrice: string;
  variantImage?: string;
  quantity: number;
  cartTotalValue: number;
  cartItemNames: string[];
  checkoutUrl?: string;
}

export function klaviyoAddedToCart(a: AddedToCartInput): void {
  const productURL = `${SITE_ORIGIN}/product/${a.productHandle}`;
  const categories = [categoryFromHandle(a.productHandle)];
  const price = parseFloat(a.variantPrice);

  q().push([
    "track",
    "Added to Cart",
    {
      $value: a.cartTotalValue,
      AddedItemProductName: a.productTitle,
      AddedItemProductID: a.productId,
      AddedItemSKU: a.variantSku,
      AddedItemCategories: categories,
      AddedItemImageURL: a.variantImage,
      AddedItemURL: productURL,
      AddedItemPrice: price,
      AddedItemQuantity: a.quantity,
      ItemNames: a.cartItemNames,
      CheckoutURL: a.checkoutUrl,
      Items: [
        {
          ProductID: a.productId,
          SKU: a.variantSku,
          ProductName: a.productTitle,
          Quantity: a.quantity,
          ItemPrice: price,
          RowTotal: price * a.quantity,
          ProductURL: productURL,
          ImageURL: a.variantImage,
          ProductCategories: categories,
        },
      ],
    },
  ]);
}

export function klaviyoViewedCategory(category: string): void {
  q().push(["track", "Viewed Category", { Category: category }]);
}

interface StartedCheckoutInput {
  cartTotalValue: number;
  itemNames: string[];
  checkoutUrl: string;
  items: Array<{
    productId: string;
    title: string;
    sku?: string;
    price: string;
    quantity: number;
    image?: string;
    handle?: string;
  }>;
}

export function klaviyoStartedCheckout(s: StartedCheckoutInput): void {
  q().push([
    "track",
    "Started Checkout",
    {
      $value: s.cartTotalValue,
      ItemNames: s.itemNames,
      CheckoutURL: s.checkoutUrl,
      Categories: Array.from(
        new Set(s.items.map((i) => categoryFromHandle(i.handle)))
      ),
      Items: s.items.map((i) => ({
        ProductID: i.productId,
        SKU: i.sku,
        ProductName: i.title,
        Quantity: i.quantity,
        ItemPrice: parseFloat(i.price),
        RowTotal: parseFloat(i.price) * i.quantity,
        ProductURL: i.handle ? `${SITE_ORIGIN}/product/${i.handle}` : undefined,
        ImageURL: i.image,
      })),
    },
  ]);
}

export function klaviyoIdentify(
  email: string,
  additionalProps: Record<string, unknown> = {}
): void {
  q().push(["identify", { $email: email, ...additionalProps }]);
}
