// Shopify Storefront API Client for Noori — Hybrid approach
// Products come from Shopify API, enriched with local custom data (3D viewers, images, reviews)

import { ShopifyProduct, ShopifyCart } from '@/types/shopify';
import { PRODUCT_CUSTOM_DATA } from './product-custom-data';

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = '2024-01';

// ── GraphQL Helper ──

async function storefrontFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// ── GraphQL Fragments & Queries ──

const CART_FIELDS = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product { id title handle }
              selectedOptions { name value }
              image { url altText }
            }
          }
          cost {
            totalAmount { amount currencyCode }
            subtotalAmount { amount currencyCode }
          }
        }
      }
    }
    cost {
      totalAmount { amount currencyCode }
      subtotalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    discountCodes { code applicable }
  }
`;

const PRODUCT_FIELDS = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
    images(first: 20) {
      edges {
        node { id url altText width height }
      }
    }
    variants(first: 100) {
      edges {
        node {
          id
          title
          availableForSale
          sku
          selectedOptions { name value }
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
          image { id url altText }
        }
      }
    }
    options { id name values }
  }
`;

const GET_PRODUCTS_QUERY = `
  ${PRODUCT_FIELDS}
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges { node { ...ProductFields } }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE_QUERY = `
  ${PRODUCT_FIELDS}
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) { ...ProductFields }
  }
`;

const CART_CREATE_MUTATION = `
  ${CART_FIELDS}
  mutation CartCreate {
    cartCreate { cart { ...CartFields } userErrors { field message } }
  }
`;

const CART_LINES_ADD_MUTATION = `
  ${CART_FIELDS}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  ${CART_FIELDS}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  ${CART_FIELDS}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

const GET_CART_QUERY = `
  ${CART_FIELDS}
  query GetCart($cartId: ID!) {
    cart(id: $cartId) { ...CartFields }
  }
`;

// ── Merge API data with local custom data ──

function enrichProduct(apiProduct: ShopifyProduct): ShopifyProduct {
  const custom = PRODUCT_CUSTOM_DATA[apiProduct.handle];
  if (!custom) return apiProduct;

  const enriched = { ...apiProduct };

  if (custom.reviews) enriched.reviews = custom.reviews;
  if (custom.variantImages) enriched.variantImages = custom.variantImages;

  // Enrich variants with 3D viewer URLs based on Metal option value
  enriched.variants = {
    edges: apiProduct.variants.edges.map(({ node }) => {
      const metal = node.selectedOptions.find(o => o.name === 'Metal')?.value;
      const viewer = metal && custom.metalViewers ? custom.metalViewers[metal] : undefined;
      const skuOverride = node.sku && custom.variantOverrides ? custom.variantOverrides[node.sku] : undefined;

      return {
        node: {
          ...node,
          // 3D viewer from metal match (primary) or SKU match (fallback)
          iframeUrl: viewer?.iframeUrl ?? skuOverride?.iframeUrl,
          iframeUrlAlt: viewer?.iframeUrlAlt ?? skuOverride?.iframeUrlAlt,
          cadPrice: skuOverride?.cadPrice,
        },
      };
    }),
  };

  return enriched;
}

// ── Shopify Client ──

class ShopifyClient {
  async getProducts(): Promise<ShopifyProduct[]> {
    const data = await storefrontFetch<{ products: { edges: Array<{ node: ShopifyProduct }> } }>(
      GET_PRODUCTS_QUERY,
      { first: 50 }
    );
    return data.products.edges.map(({ node }) => enrichProduct(node));
  }

  async getProduct(handle: string): Promise<ShopifyProduct | null> {
    const data = await storefrontFetch<{ productByHandle: ShopifyProduct | null }>(
      GET_PRODUCT_BY_HANDLE_QUERY,
      { handle }
    );
    if (!data.productByHandle) return null;
    return enrichProduct(data.productByHandle);
  }

  async createCart(): Promise<ShopifyCart> {
    const data = await storefrontFetch<{ cartCreate: { cart: ShopifyCart; userErrors: Array<{ message: string }> } }>(
      CART_CREATE_MUTATION
    );
    if (data.cartCreate.userErrors.length > 0) {
      throw new Error(data.cartCreate.userErrors[0].message);
    }
    return data.cartCreate.cart;
  }

  async getCart(cartId: string): Promise<ShopifyCart | null> {
    try {
      const data = await storefrontFetch<{ cart: ShopifyCart | null }>(
        GET_CART_QUERY,
        { cartId }
      );
      return data.cart;
    } catch {
      return null;
    }
  }

  async addToCart(cartId: string, variantId: string, quantity: number): Promise<ShopifyCart> {
    const data = await storefrontFetch<{ cartLinesAdd: { cart: ShopifyCart; userErrors: Array<{ message: string }> } }>(
      CART_LINES_ADD_MUTATION,
      { cartId, lines: [{ merchandiseId: variantId, quantity }] }
    );
    if (data.cartLinesAdd.userErrors.length > 0) {
      throw new Error(data.cartLinesAdd.userErrors[0].message);
    }
    return data.cartLinesAdd.cart;
  }

  async removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
    const data = await storefrontFetch<{ cartLinesRemove: { cart: ShopifyCart; userErrors: Array<{ message: string }> } }>(
      CART_LINES_REMOVE_MUTATION,
      { cartId, lineIds }
    );
    if (data.cartLinesRemove.userErrors.length > 0) {
      throw new Error(data.cartLinesRemove.userErrors[0].message);
    }
    return data.cartLinesRemove.cart;
  }

  async updateCartLine(cartId: string, lineId: string, quantity: number): Promise<ShopifyCart> {
    const data = await storefrontFetch<{ cartLinesUpdate: { cart: ShopifyCart; userErrors: Array<{ message: string }> } }>(
      CART_LINES_UPDATE_MUTATION,
      { cartId, lines: [{ id: lineId, quantity }] }
    );
    if (data.cartLinesUpdate.userErrors.length > 0) {
      throw new Error(data.cartLinesUpdate.userErrors[0].message);
    }
    return data.cartLinesUpdate.cart;
  }
}

export const shopify = new ShopifyClient();
