// Shopify Storefront API Types for Noori

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        id: string;
        url: string;
        altText: string;
        width: number;
        height: number;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  reviews?: {
    rating: number;
    count: number;
  };
  variantImages?: Record<string, Array<{
    id: string;
    url: string;
    altText: string;
  }>>;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
  price: {
    amount: string;
    currencyCode: string;
  };
  cadPrice?: {
    amount: string;
    currencyCode: string;
  };
  compareAtPrice?: {
    amount: string;
    currencyCode: string;
  };
  image?: {
    id: string;
    url: string;
    altText: string;
  };
  quantityAvailable: number;
  sku?: string;
  model3d?: string; // GLB file URL for 3D viewer
  iframeUrl?: string; // External iframe URL for 3D viewer (alternative to model3d)
  iframeUrlAlt?: string; // Alternate iframe URL (e.g. zoomed-out view)
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      title: string;
      handle: string;
    };
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
    image?: {
      url: string;
      altText: string;
    };
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount?: {
      amount: string;
      currencyCode: string;
    };
    totalDutyAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
  discountCodes: Array<{
    code: string;
    applicable: boolean;
  }>;
}

export interface ShopifyError {
  message: string;
  extensions?: {
    code: string;
  };
}