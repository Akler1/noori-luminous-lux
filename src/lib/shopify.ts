// Shopify Storefront API Client for Noori

import { ShopifyProduct, ShopifyCart, ShopifyVariant } from '@/types/shopify';

// Mock Shopify client - replace with real Storefront API in production
class ShopifyClient {
  private mockProducts: ShopifyProduct[] = [
    {
      id: 'gid://shopify/Product/1',
      handle: 'diamond-stud-earrings',
      title: 'Diamond Stud Earrings',
      description: 'Timeless elegance meets modern ethics. Our lab-grown diamond studs offer the same brilliance and fire as mined diamonds.',
      priceRange: {
        minVariantPrice: { amount: '890.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '1490.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '1200.00', currencyCode: 'CAD' }
      },
      images: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductImage/1',
              url: '/src/assets/earrings-hero.jpg',
              altText: 'Diamond Stud Earrings - Round Brilliant',
              width: 800,
              height: 600
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductImage/2',
              url: '/src/assets/earrings-princess.jpg',
              altText: 'Diamond Stud Earrings - Princess Cut',
              width: 800,
              height: 600
            }
          }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductVariant/1',
              title: 'Sterling Silver / Round Brilliant',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: 'Sterling Silver' },
                { name: 'Cut', value: 'Round Brilliant' }
              ],
              price: { amount: '890.00', currencyCode: 'CAD' },
              compareAtPrice: { amount: '1200.00', currencyCode: 'CAD' },
              quantityAvailable: 10,
              sku: 'NOORI-STUD-SS-RB',
              model3d: '/models/earrings-silver-round.glb',
              image: {
                id: 'gid://shopify/ProductImage/1',
                url: '/src/assets/earrings-hero.jpg',
                altText: 'Sterling Silver Round Brilliant Diamond Studs'
              }
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/2',
              title: '14K Gold / Round Brilliant',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: '14K Gold' },
                { name: 'Cut', value: 'Round Brilliant' }
              ],
              price: { amount: '1490.00', currencyCode: 'CAD' },
              quantityAvailable: 5,
              sku: 'NOORI-STUD-14K-RB',
              model3d: '/models/earrings-gold-round.glb',
              image: {
                id: 'gid://shopify/ProductImage/1',
                url: '/src/assets/earrings-hero.jpg',
                altText: '14K Gold Round Brilliant Diamond Studs'
              }
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/3',
              title: 'Sterling Silver / Princess',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: 'Sterling Silver' },
                { name: 'Cut', value: 'Princess' }
              ],
              price: { amount: '920.00', currencyCode: 'CAD' },
              compareAtPrice: { amount: '1250.00', currencyCode: 'CAD' },
              quantityAvailable: 8,
              sku: 'NOORI-STUD-SS-PR',
              model3d: '/models/earrings-silver-princess.glb',
              image: {
                id: 'gid://shopify/ProductImage/2',
                url: '/src/assets/earrings-princess.jpg',
                altText: 'Sterling Silver Princess Cut Diamond Studs'
              }
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/4',
              title: '14K Gold / Princess',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: '14K Gold' },
                { name: 'Cut', value: 'Princess' }
              ],
              price: { amount: '1520.00', currencyCode: 'CAD' },
              quantityAvailable: 3,
              sku: 'NOORI-STUD-14K-PR',
              model3d: '/models/earrings-gold-princess.glb',
              image: {
                id: 'gid://shopify/ProductImage/2',
                url: '/src/assets/earrings-princess.jpg',
                altText: '14K Gold Princess Cut Diamond Studs'
              }
            }
          }
        ]
      },
      options: [
        {
          id: 'gid://shopify/ProductOption/1',
          name: 'Metal',
          values: ['Sterling Silver', '9K Gold', '14K Gold']
        },
        {
          id: 'gid://shopify/ProductOption/2',
          name: 'Cut',
          values: ['Round Brilliant', 'Princess']
        }
      ],
      reviews: { rating: 5, count: 124 }
    },
    {
      id: 'gid://shopify/Product/2',
      handle: 'bezel-necklace',
      title: 'Bezel-less Necklace',
      description: 'Refined minimalism showcasing a single lab-grown diamond in perfect suspension.',
      priceRange: {
        minVariantPrice: { amount: '1200.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '2450.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '1600.00', currencyCode: 'CAD' }
      },
      images: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductImage/2',
              url: '/src/assets/necklace-hero.jpg',
              altText: 'Bezel-less Necklace',
              width: 800,
              height: 600
            }
          }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductVariant/3',
              title: 'Sterling Silver / 1 ct',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: 'Sterling Silver' },
                { name: 'Size', value: '1 ct' }
              ],
              price: { amount: '1200.00', currencyCode: 'CAD' },
              quantityAvailable: 8,
              sku: 'NOORI-NECK-SS-1CT',
              model3d: '/models/necklace-silver-1ct.glb'
            }
          }
        ]
      },
      options: [
        {
          id: 'gid://shopify/ProductOption/3',
          name: 'Metal',
          values: ['Sterling Silver', '9K Gold']
        },
        {
          id: 'gid://shopify/ProductOption/4',
          name: 'Size',
          values: ['1 ct', '2 ct']
        }
      ],
      reviews: { rating: 5, count: 89 }
    },
    {
      id: 'gid://shopify/Product/3',
      handle: 'solitaire-bracelet',
      title: 'Solitaire Bracelet',
      description: 'Modern heirloom design featuring single or five solitaire lab-grown diamonds.',
      priceRange: {
        minVariantPrice: { amount: '1190.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '2890.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '1590.00', currencyCode: 'CAD' }
      },
      images: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductImage/3',
              url: '/src/assets/bracelet-hero.jpg',
              altText: 'Solitaire Bracelet',
              width: 800,
              height: 600
            }
          }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductVariant/4',
              title: 'Sterling Silver / Single Solitaire',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: 'Sterling Silver' },
                { name: 'Style', value: 'Single Solitaire' }
              ],
              price: { amount: '1190.00', currencyCode: 'CAD' },
              quantityAvailable: 12,
              sku: 'NOORI-BRAC-SS-SINGLE',
              model3d: '/models/bracelet-silver-single.glb'
            }
          }
        ]
      },
      options: [
        {
          id: 'gid://shopify/ProductOption/5',
          name: 'Metal',
          values: ['Sterling Silver', '9K Gold']
        },
        {
          id: 'gid://shopify/ProductOption/6',
          name: 'Style',
          values: ['Single Solitaire', 'Five-Solitaire']
        }
      ],
      reviews: { rating: 5, count: 67 }
    },
    {
      id: 'gid://shopify/Product/4',
      handle: 'stud-round-14k',
      title: 'Round Brilliant Stud',
      description: 'Classic elegance in lab-grown diamonds. Available in gold, white gold, and rose gold with your choice of 1ct or 2ct stones.',
      priceRange: {
        minVariantPrice: { amount: '1490.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '2990.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '1990.00', currencyCode: 'CAD' }
      },
      images: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductImage/4',
              url: '/src/assets/earrings-hero.jpg',
              altText: 'Round Brilliant Stud Earrings',
              width: 800,
              height: 600
            }
          }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductVariant/5',
              title: 'Gold / 1ct',
              availableForSale: true,
              selectedOptions: [
                { name: 'Material', value: 'Gold' },
                { name: 'Size', value: '1ct' }
              ],
              price: { amount: '1490.00', currencyCode: 'CAD' },
              compareAtPrice: { amount: '1990.00', currencyCode: 'CAD' },
              quantityAvailable: 15,
              sku: 'NOORI-STUD-GOLD-1CT',
              iframeUrl: 'https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html',
              image: {
                id: 'gid://shopify/ProductImage/4',
                url: '/src/assets/earrings-hero.jpg',
                altText: 'Gold Round Brilliant Stud - 1ct'
              }
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/6',
              title: 'Gold / 2ct',
              availableForSale: true,
              selectedOptions: [
                { name: 'Material', value: 'Gold' },
                { name: 'Size', value: '2ct' }
              ],
              price: { amount: '2490.00', currencyCode: 'CAD' },
              compareAtPrice: { amount: '3290.00', currencyCode: 'CAD' },
              quantityAvailable: 8,
              sku: 'NOORI-STUD-GOLD-2CT',
              iframeUrl: 'https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html',
              image: {
                id: 'gid://shopify/ProductImage/4',
                url: '/src/assets/earrings-hero.jpg',
                altText: 'Gold Round Brilliant Stud - 2ct'
              }
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/7',
              title: 'White Gold / 1ct',
              availableForSale: true,
              selectedOptions: [
                { name: 'Material', value: 'White Gold' },
                { name: 'Size', value: '1ct' }
              ],
              price: { amount: '1590.00', currencyCode: 'CAD' },
              compareAtPrice: { amount: '2090.00', currencyCode: 'CAD' },
              quantityAvailable: 12,
              sku: 'NOORI-STUD-WGOLD-1CT',
              iframeUrl: 'https://akler1.github.io/XR-Round-White.1/XR%20Rounds%20White.1.html',
              image: {
                id: 'gid://shopify/ProductImage/4',
                url: '/src/assets/earrings-hero.jpg',
                altText: 'White Gold Round Brilliant Stud - 1ct'
              }
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/8',
              title: 'White Gold / 2ct',
              availableForSale: true,
              selectedOptions: [
                { name: 'Material', value: 'White Gold' },
                { name: 'Size', value: '2ct' }
              ],
              price: { amount: '2590.00', currencyCode: 'CAD' },
              compareAtPrice: { amount: '3390.00', currencyCode: 'CAD' },
              quantityAvailable: 6,
              sku: 'NOORI-STUD-WGOLD-2CT',
              iframeUrl: 'https://akler1.github.io/XR-Round-White.1/XR%20Rounds%20White.1.html',
              image: {
                id: 'gid://shopify/ProductImage/4',
                url: '/src/assets/earrings-hero.jpg',
                altText: 'White Gold Round Brilliant Stud - 2ct'
              }
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/9',
              title: 'Rose Gold / 1ct',
              availableForSale: true,
              selectedOptions: [
                { name: 'Material', value: 'Rose Gold' },
                { name: 'Size', value: '1ct' }
              ],
              price: { amount: '1690.00', currencyCode: 'CAD' },
              compareAtPrice: { amount: '2190.00', currencyCode: 'CAD' },
              quantityAvailable: 10,
              sku: 'NOORI-STUD-RGOLD-1CT',
              iframeUrl: 'https://akler1.github.io/XR-Round-Rose.1/XR%20Rounds%20Rose.1.html',
              image: {
                id: 'gid://shopify/ProductImage/4',
                url: '/src/assets/earrings-hero.jpg',
                altText: 'Rose Gold Round Brilliant Stud - 1ct'
              }
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductVariant/10',
              title: 'Rose Gold / 2ct',
              availableForSale: true,
              selectedOptions: [
                { name: 'Material', value: 'Rose Gold' },
                { name: 'Size', value: '2ct' }
              ],
              price: { amount: '2990.00', currencyCode: 'CAD' },
              compareAtPrice: { amount: '3890.00', currencyCode: 'CAD' },
              quantityAvailable: 5,
              sku: 'NOORI-STUD-RGOLD-2CT',
              iframeUrl: 'https://akler1.github.io/XR-Round-Rose.1/XR%20Rounds%20Rose.1.html',
              image: {
                id: 'gid://shopify/ProductImage/4',
                url: '/src/assets/earrings-hero.jpg',
                altText: 'Rose Gold Round Brilliant Stud - 2ct'
              }
            }
          }
        ]
      },
      options: [
        {
          id: 'gid://shopify/ProductOption/7',
          name: 'Material',
          values: ['Gold', 'White Gold', 'Rose Gold']
        },
        {
          id: 'gid://shopify/ProductOption/8',
          name: 'Size',
          values: ['1ct', '2ct']
        }
      ],
      reviews: { rating: 5, count: 156 }
    }
  ];

  async getProducts(): Promise<ShopifyProduct[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockProducts;
  }

  async getProduct(handle: string): Promise<ShopifyProduct | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.mockProducts.find(p => p.handle === handle) || null;
  }

  async createCart(): Promise<ShopifyCart> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      id: 'gid://shopify/Cart/' + Math.random().toString(36).substr(2, 9),
      checkoutUrl: 'https://checkout.shopify.com/mock',
      totalQuantity: 0,
      lines: { edges: [] },
      cost: {
        totalAmount: { amount: '0.00', currencyCode: 'CAD' },
        subtotalAmount: { amount: '0.00', currencyCode: 'CAD' }
      },
      discountCodes: []
    };
  }

  async addToCart(cartId: string, variantId: string, quantity: number): Promise<ShopifyCart> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock cart with added item
    const variant = this.findVariantById(variantId);
    if (!variant) throw new Error('Variant not found');

    return {
      id: cartId,
      checkoutUrl: 'https://checkout.shopify.com/mock',
      totalQuantity: quantity,
      lines: {
        edges: [
          {
            node: {
              id: 'gid://shopify/CartLine/1',
              quantity,
              merchandise: {
                id: variantId,
                title: variant.title,
                product: {
                  id: 'gid://shopify/Product/1',
                  title: 'Diamond Stud Earrings',
                  handle: 'diamond-stud-earrings'
                },
                selectedOptions: variant.selectedOptions,
                image: variant.image
              },
              cost: {
                totalAmount: {
                  amount: (parseFloat(variant.price.amount) * quantity).toFixed(2),
                  currencyCode: 'CAD'
                },
                subtotalAmount: {
                  amount: (parseFloat(variant.price.amount) * quantity).toFixed(2),
                  currencyCode: 'CAD'
                }
              }
            }
          }
        ]
      },
      cost: {
        totalAmount: {
          amount: (parseFloat(variant.price.amount) * quantity).toFixed(2),
          currencyCode: 'CAD'
        },
        subtotalAmount: {
          amount: (parseFloat(variant.price.amount) * quantity).toFixed(2),
          currencyCode: 'CAD'
        }
      },
      discountCodes: []
    };
  }

  private findVariantById(variantId: string): ShopifyVariant | null {
    for (const product of this.mockProducts) {
      const variant = product.variants.edges.find(v => v.node.id === variantId);
      if (variant) return variant.node;
    }
    return null;
  }
}

export const shopify = new ShopifyClient();