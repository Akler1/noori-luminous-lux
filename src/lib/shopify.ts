// Shopify Storefront API Client for Noori

import { ShopifyProduct, ShopifyCart, ShopifyVariant } from '@/types/shopify';

// Mock Shopify client - replace with real Storefront API in production
class ShopifyClient {
  private mockProducts: ShopifyProduct[] = [
    {
      id: 'gid://shopify/Product/1',
      handle: 'diamond-stud-earrings',
      title: 'Round Vela Studs',
      description: 'Timeless elegance meets modern ethics. Our lab-grown diamond studs offer the same brilliance and fire as mined diamonds.',
      priceRange: {
        minVariantPrice: { amount: '1954.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '2960.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '2500.00', currencyCode: 'CAD' }
      },
      images: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductImage/1',
              url: '/src/assets/earrings-hero.jpg',
              altText: 'Round Solitaire Studs - Round Brilliant',
              width: 800,
              height: 600
            }
          },
          {
            node: {
              id: 'gid://shopify/ProductImage/2',
              url: '/src/assets/earrings-princess.jpg',
              altText: 'Round Solitaire Studs - Princess Cut',
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
              price: { amount: '1954.00', currencyCode: 'CAD' },
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
              price: { amount: '2047.00', currencyCode: 'CAD' },
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
              price: { amount: '1954.00', currencyCode: 'CAD' },
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
              price: { amount: '2047.00', currencyCode: 'CAD' },
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
      title: 'Vela Necklace',
      description: 'Refined minimalism showcasing a single lab-grown diamond in perfect suspension.',
      priceRange: {
        minVariantPrice: { amount: '1748.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '1944.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '2200.00', currencyCode: 'CAD' }
      },
      images: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductImage/2',
              url: '/src/assets/necklace-hero.jpg',
              altText: 'Solitaire Necklace',
              width: 800,
              height: 600
            }
          }
        ]
      },
      variants: {
        edges: [
          // Round — Yellow Gold (default)
          {
            node: {
              id: 'gid://shopify/ProductVariant/3',
              title: '14K Gold / Round',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: '14K Gold' },
                { name: 'Cut', value: 'Round' }
              ],
              price: { amount: '1748.00', currencyCode: 'CAD' },
              quantityAvailable: 8,
              sku: 'NOORI-NECK-14K-RND',
              iframeUrl: 'https://akler1.github.io/round-y_zoomed/',
              iframeUrlAlt: 'https://akler1.github.io/round-y/'
            }
          },
          // Round — White Gold
          {
            node: {
              id: 'gid://shopify/ProductVariant/3b',
              title: 'White Gold / Round',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: 'White Gold' },
                { name: 'Cut', value: 'Round' }
              ],
              price: { amount: '1748.00', currencyCode: 'CAD' },
              quantityAvailable: 6,
              sku: 'NOORI-NECK-WG-RND',
              iframeUrl: 'https://akler1.github.io/round-w_zoomed/',
              iframeUrlAlt: 'https://akler1.github.io/round-w/'
            }
          },
          // Round — Rose Gold
          {
            node: {
              id: 'gid://shopify/ProductVariant/3c',
              title: 'Rose Gold / Round',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: 'Rose Gold' },
                { name: 'Cut', value: 'Round' }
              ],
              price: { amount: '1748.00', currencyCode: 'CAD' },
              quantityAvailable: 5,
              sku: 'NOORI-NECK-RG-RND',
              iframeUrl: 'https://akler1.github.io/round-r_zoomed/',
              iframeUrlAlt: 'https://akler1.github.io/round-r/'
            }
          },
          // Emerald — Yellow Gold
          {
            node: {
              id: 'gid://shopify/ProductVariant/3d',
              title: '14K Gold / Emerald',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: '14K Gold' },
                { name: 'Cut', value: 'Emerald' }
              ],
              price: { amount: '1748.00', currencyCode: 'CAD' },
              quantityAvailable: 4,
              sku: 'NOORI-NECK-14K-EM',
              iframeUrl: 'https://akler1.github.io/emerald-y_zoomed/',
              iframeUrlAlt: 'https://akler1.github.io/emerald-y/'
            }
          },
          // Emerald — White Gold
          {
            node: {
              id: 'gid://shopify/ProductVariant/3e',
              title: 'White Gold / Emerald',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: 'White Gold' },
                { name: 'Cut', value: 'Emerald' }
              ],
              price: { amount: '1748.00', currencyCode: 'CAD' },
              quantityAvailable: 4,
              sku: 'NOORI-NECK-WG-EM',
              iframeUrl: 'https://akler1.github.io/emerald-w_zoomed/',
              iframeUrlAlt: 'https://akler1.github.io/emerald-w/'
            }
          },
          // Emerald — Rose Gold
          {
            node: {
              id: 'gid://shopify/ProductVariant/3f',
              title: 'Rose Gold / Emerald',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: 'Rose Gold' },
                { name: 'Cut', value: 'Emerald' }
              ],
              price: { amount: '1748.00', currencyCode: 'CAD' },
              quantityAvailable: 3,
              sku: 'NOORI-NECK-RG-EM',
              iframeUrl: 'https://akler1.github.io/emerald-r_zoomed/',
              iframeUrlAlt: 'https://akler1.github.io/emerald-r/'
            }
          },
          // Princess — Yellow Gold
          {
            node: {
              id: 'gid://shopify/ProductVariant/3g',
              title: '14K Gold / Princess',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: '14K Gold' },
                { name: 'Cut', value: 'Princess' }
              ],
              price: { amount: '1748.00', currencyCode: 'CAD' },
              quantityAvailable: 5,
              sku: 'NOORI-NECK-14K-PR',
              iframeUrl: 'https://akler1.github.io/princess-y_zoomed/',
              iframeUrlAlt: 'https://akler1.github.io/princess-y/'
            }
          },
          // Princess — White Gold
          {
            node: {
              id: 'gid://shopify/ProductVariant/3h',
              title: 'White Gold / Princess',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: 'White Gold' },
                { name: 'Cut', value: 'Princess' }
              ],
              price: { amount: '1748.00', currencyCode: 'CAD' },
              quantityAvailable: 4,
              sku: 'NOORI-NECK-WG-PR',
              iframeUrl: 'https://akler1.github.io/princess-w_zoomed/',
              iframeUrlAlt: 'https://akler1.github.io/princess-w/'
            }
          },
          // Princess — Rose Gold
          {
            node: {
              id: 'gid://shopify/ProductVariant/3i',
              title: 'Rose Gold / Princess',
              availableForSale: true,
              selectedOptions: [
                { name: 'Metal', value: 'Rose Gold' },
                { name: 'Cut', value: 'Princess' }
              ],
              price: { amount: '1748.00', currencyCode: 'CAD' },
              quantityAvailable: 3,
              sku: 'NOORI-NECK-RG-PR',
              iframeUrl: 'https://akler1.github.io/princess-r_zoomed/',
              iframeUrlAlt: 'https://akler1.github.io/princess-r/'
            }
          }
        ]
      },
      options: [
        {
          id: 'gid://shopify/ProductOption/3',
          name: 'Metal',
          values: ['14K Gold', 'White Gold', 'Rose Gold']
        },
        {
          id: 'gid://shopify/ProductOption/4',
          name: 'Cut',
          values: ['Round', 'Emerald', 'Princess']
        }
      ],
      reviews: { rating: 5, count: 89 }
    },
    // ── Pendant products (individual per cut) ──
    {
      id: 'gid://shopify/Product/pendant-round',
      handle: 'pendant-round',
      title: 'Round Vela Pendant',
      description: 'A single round brilliant diamond suspended on a delicate chain. Pure light, nothing more.',
      priceRange: {
        minVariantPrice: { amount: '1748.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '1944.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '2200.00', currencyCode: 'CAD' }
      },
      images: { edges: [{ node: { id: 'img-pend-rnd', url: '/src/assets/necklace-hero.jpg', altText: 'Round Solitaire Pendant', width: 800, height: 600 } }] },
      variants: {
        edges: [
          // Yellow Gold variants
          { node: { id: 'pend-rnd-y-14k', title: 'Yellow Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '1748.00', currencyCode: 'CAD' }, quantityAvailable: 8, sku: 'NOORI-PEND-RND-Y-14K', iframeUrl: 'https://akler1.github.io/round-y_zoomed/', iframeUrlAlt: 'https://akler1.github.io/round-y/' } },
          { node: { id: 'pend-rnd-y-18k', title: 'Yellow Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '1944.00', currencyCode: 'CAD' }, quantityAvailable: 6, sku: 'NOORI-PEND-RND-Y-18K', iframeUrl: 'https://akler1.github.io/round-y_zoomed/', iframeUrlAlt: 'https://akler1.github.io/round-y/' } },
          // White Gold variants
          { node: { id: 'pend-rnd-w-14k', title: 'White Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '1748.00', currencyCode: 'CAD' }, quantityAvailable: 6, sku: 'NOORI-PEND-RND-W-14K', iframeUrl: 'https://akler1.github.io/round-w_zoomed/', iframeUrlAlt: 'https://akler1.github.io/round-w/' } },
          { node: { id: 'pend-rnd-w-18k', title: 'White Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '1944.00', currencyCode: 'CAD' }, quantityAvailable: 5, sku: 'NOORI-PEND-RND-W-18K', iframeUrl: 'https://akler1.github.io/round-w_zoomed/', iframeUrlAlt: 'https://akler1.github.io/round-w/' } },
          // Rose Gold variants
          { node: { id: 'pend-rnd-r-14k', title: 'Rose Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '1748.00', currencyCode: 'CAD' }, quantityAvailable: 5, sku: 'NOORI-PEND-RND-R-14K', iframeUrl: 'https://akler1.github.io/round-r_zoomed/', iframeUrlAlt: 'https://akler1.github.io/round-r/' } },
          { node: { id: 'pend-rnd-r-18k', title: 'Rose Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '1944.00', currencyCode: 'CAD' }, quantityAvailable: 4, sku: 'NOORI-PEND-RND-R-18K', iframeUrl: 'https://akler1.github.io/round-r_zoomed/', iframeUrlAlt: 'https://akler1.github.io/round-r/' } },
        ]
      },
      options: [
        { id: 'opt-pend-rnd-metal', name: 'Metal', values: ['Yellow Gold', 'White Gold', 'Rose Gold'] },
        { id: 'opt-pend-rnd-karat', name: 'Karat', values: ['14K', '18K'] }
      ],
      reviews: { rating: 5, count: 47 }
    },
    {
      id: 'gid://shopify/Product/pendant-princess',
      handle: 'pendant-princess',
      title: 'Princess Vela Pendant',
      description: 'A princess-cut diamond set in a clean, geometric pendant. Sharp lines, soft glow.',
      priceRange: {
        minVariantPrice: { amount: '1748.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '1944.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '2200.00', currencyCode: 'CAD' }
      },
      images: { edges: [{ node: { id: 'img-pend-pr', url: '/src/assets/necklace-hero.jpg', altText: 'Princess Solitaire Pendant', width: 800, height: 600 } }] },
      variants: {
        edges: [
          // Yellow Gold variants
          { node: { id: 'pend-pr-y-14k', title: 'Yellow Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '1748.00', currencyCode: 'CAD' }, quantityAvailable: 5, sku: 'NOORI-PEND-PR-Y-14K', iframeUrl: 'https://akler1.github.io/princess-y_zoomed/', iframeUrlAlt: 'https://akler1.github.io/princess-y/' } },
          { node: { id: 'pend-pr-y-18k', title: 'Yellow Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '1944.00', currencyCode: 'CAD' }, quantityAvailable: 4, sku: 'NOORI-PEND-PR-Y-18K', iframeUrl: 'https://akler1.github.io/princess-y_zoomed/', iframeUrlAlt: 'https://akler1.github.io/princess-y/' } },
          // White Gold variants
          { node: { id: 'pend-pr-w-14k', title: 'White Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '1748.00', currencyCode: 'CAD' }, quantityAvailable: 4, sku: 'NOORI-PEND-PR-W-14K', iframeUrl: 'https://akler1.github.io/princess-w_zoomed/', iframeUrlAlt: 'https://akler1.github.io/princess-w/' } },
          { node: { id: 'pend-pr-w-18k', title: 'White Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '1944.00', currencyCode: 'CAD' }, quantityAvailable: 3, sku: 'NOORI-PEND-PR-W-18K', iframeUrl: 'https://akler1.github.io/princess-w_zoomed/', iframeUrlAlt: 'https://akler1.github.io/princess-w/' } },
          // Rose Gold variants
          { node: { id: 'pend-pr-r-14k', title: 'Rose Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '1748.00', currencyCode: 'CAD' }, quantityAvailable: 3, sku: 'NOORI-PEND-PR-R-14K', iframeUrl: 'https://akler1.github.io/princess-r_zoomed/', iframeUrlAlt: 'https://akler1.github.io/princess-r/' } },
          { node: { id: 'pend-pr-r-18k', title: 'Rose Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '1944.00', currencyCode: 'CAD' }, quantityAvailable: 2, sku: 'NOORI-PEND-PR-R-18K', iframeUrl: 'https://akler1.github.io/princess-r_zoomed/', iframeUrlAlt: 'https://akler1.github.io/princess-r/' } },
        ]
      },
      options: [
        { id: 'opt-pend-pr-metal', name: 'Metal', values: ['Yellow Gold', 'White Gold', 'Rose Gold'] },
        { id: 'opt-pend-pr-karat', name: 'Karat', values: ['14K', '18K'] }
      ],
      reviews: { rating: 5, count: 42 }
    },
    {
      id: 'gid://shopify/Product/pendant-emerald',
      handle: 'pendant-emerald',
      title: 'Emerald Vela Pendant',
      description: 'An emerald-cut diamond in a modern pendant setting. Architectural clarity on a chain.',
      priceRange: {
        minVariantPrice: { amount: '1748.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '1944.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '2200.00', currencyCode: 'CAD' }
      },
      images: { edges: [{ node: { id: 'img-pend-em', url: '/src/assets/necklace-hero.jpg', altText: 'Emerald Solitaire Pendant', width: 800, height: 600 } }] },
      variants: {
        edges: [
          // Yellow Gold variants
          { node: { id: 'pend-em-y-14k', title: 'Yellow Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '1748.00', currencyCode: 'CAD' }, quantityAvailable: 4, sku: 'NOORI-PEND-EM-Y-14K', iframeUrl: 'https://akler1.github.io/emerald-y_zoomed/', iframeUrlAlt: 'https://akler1.github.io/emerald-y/' } },
          { node: { id: 'pend-em-y-18k', title: 'Yellow Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '1944.00', currencyCode: 'CAD' }, quantityAvailable: 3, sku: 'NOORI-PEND-EM-Y-18K', iframeUrl: 'https://akler1.github.io/emerald-y_zoomed/', iframeUrlAlt: 'https://akler1.github.io/emerald-y/' } },
          // White Gold variants
          { node: { id: 'pend-em-w-14k', title: 'White Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '1748.00', currencyCode: 'CAD' }, quantityAvailable: 4, sku: 'NOORI-PEND-EM-W-14K', iframeUrl: 'https://akler1.github.io/emerald-w_zoomed/', iframeUrlAlt: 'https://akler1.github.io/emerald-w/' } },
          { node: { id: 'pend-em-w-18k', title: 'White Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '1944.00', currencyCode: 'CAD' }, quantityAvailable: 3, sku: 'NOORI-PEND-EM-W-18K', iframeUrl: 'https://akler1.github.io/emerald-w_zoomed/', iframeUrlAlt: 'https://akler1.github.io/emerald-w/' } },
          // Rose Gold variants
          { node: { id: 'pend-em-r-14k', title: 'Rose Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '1748.00', currencyCode: 'CAD' }, quantityAvailable: 3, sku: 'NOORI-PEND-EM-R-14K', iframeUrl: 'https://akler1.github.io/emerald-r_zoomed/', iframeUrlAlt: 'https://akler1.github.io/emerald-r/' } },
          { node: { id: 'pend-em-r-18k', title: 'Rose Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '1944.00', currencyCode: 'CAD' }, quantityAvailable: 2, sku: 'NOORI-PEND-EM-R-18K', iframeUrl: 'https://akler1.github.io/emerald-r_zoomed/', iframeUrlAlt: 'https://akler1.github.io/emerald-r/' } },
        ]
      },
      options: [
        { id: 'opt-pend-em-metal', name: 'Metal', values: ['Yellow Gold', 'White Gold', 'Rose Gold'] },
        { id: 'opt-pend-em-karat', name: 'Karat', values: ['14K', '18K'] }
      ],
      reviews: { rating: 5, count: 38 }
    },
    {
      id: 'gid://shopify/Product/3',
      handle: 'bracelet-solitaire-1ct',
      title: 'Vela Bracelet',
      description: 'A single solitaire lab-grown diamond on a delicate chain bracelet. Modern heirloom design.',
      priceRange: {
        minVariantPrice: { amount: '2528.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '3710.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '3200.00', currencyCode: 'CAD' }
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
          // Yellow Gold variants
          { node: { id: 'brac1-y-14k', title: 'Yellow Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '2528.00', currencyCode: 'CAD' }, quantityAvailable: 8, sku: 'NOORI-BRAC1-Y-14K', iframeUrl: 'https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html' } },
          { node: { id: 'brac1-y-18k', title: 'Yellow Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '2738.00', currencyCode: 'CAD' }, quantityAvailable: 6, sku: 'NOORI-BRAC1-Y-18K', iframeUrl: 'https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html' } },
          // White Gold variants
          { node: { id: 'brac1-w-14k', title: 'White Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '2528.00', currencyCode: 'CAD' }, quantityAvailable: 10, sku: 'NOORI-BRAC1-W-14K', iframeUrl: 'https://akler1.github.io/bracelet1White/Bracelet1%20White.3.html' } },
          { node: { id: 'brac1-w-18k', title: 'White Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '2738.00', currencyCode: 'CAD' }, quantityAvailable: 7, sku: 'NOORI-BRAC1-W-18K', iframeUrl: 'https://akler1.github.io/bracelet1White/Bracelet1%20White.3.html' } },
          // Rose Gold variants
          { node: { id: 'brac1-r-14k', title: 'Rose Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '2528.00', currencyCode: 'CAD' }, quantityAvailable: 6, sku: 'NOORI-BRAC1-R-14K', iframeUrl: 'https://akler1.github.io/Bracelet1Rose/Bracelet1%20Rose.1.html' } },
          { node: { id: 'brac1-r-18k', title: 'Rose Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '2738.00', currencyCode: 'CAD' }, quantityAvailable: 5, sku: 'NOORI-BRAC1-R-18K', iframeUrl: 'https://akler1.github.io/Bracelet1Rose/Bracelet1%20Rose.1.html' } },
        ]
      },
      options: [
        { id: 'opt-brac1-metal', name: 'Metal', values: ['Yellow Gold', 'White Gold', 'Rose Gold'] },
        { id: 'opt-brac1-karat', name: 'Karat', values: ['14K', '18K'] }
      ],
      reviews: { rating: 5, count: 67 }
    },
    {
      id: 'gid://shopify/Product/bracelet-2ct',
      handle: 'bracelet-solitaire-2ct',
      title: 'Vela Bracelet 2ct',
      description: 'The statement version — a larger 2ct solitaire lab-grown diamond on a delicate chain bracelet.',
      priceRange: {
        minVariantPrice: { amount: '3466.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '3710.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '4200.00', currencyCode: 'CAD' }
      },
      images: { edges: [{ node: { id: 'img-brac2', url: '/src/assets/bracelet-hero.jpg', altText: 'Vela Bracelet 2ct', width: 800, height: 600 } }] },
      variants: {
        edges: [
          // Yellow Gold variants
          { node: { id: 'brac2-y-14k', title: 'Yellow Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '3466.00', currencyCode: 'CAD' }, quantityAvailable: 5, sku: 'NOORI-BRAC2-Y-14K', iframeUrl: 'https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html' } },
          { node: { id: 'brac2-y-18k', title: 'Yellow Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '3710.00', currencyCode: 'CAD' }, quantityAvailable: 4, sku: 'NOORI-BRAC2-Y-18K', iframeUrl: 'https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html' } },
          // White Gold variants
          { node: { id: 'brac2-w-14k', title: 'White Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '3466.00', currencyCode: 'CAD' }, quantityAvailable: 4, sku: 'NOORI-BRAC2-W-14K', iframeUrl: 'https://akler1.github.io/bracelet1White/Bracelet1%20White.3.html' } },
          { node: { id: 'brac2-w-18k', title: 'White Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '3710.00', currencyCode: 'CAD' }, quantityAvailable: 3, sku: 'NOORI-BRAC2-W-18K', iframeUrl: 'https://akler1.github.io/bracelet1White/Bracelet1%20White.3.html' } },
          // Rose Gold variants
          { node: { id: 'brac2-r-14k', title: 'Rose Gold / 14K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '14K' }], price: { amount: '3466.00', currencyCode: 'CAD' }, quantityAvailable: 3, sku: 'NOORI-BRAC2-R-14K', iframeUrl: 'https://akler1.github.io/Bracelet1Rose/Bracelet1%20Rose.1.html' } },
          { node: { id: 'brac2-r-18k', title: 'Rose Gold / 18K', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '18K' }], price: { amount: '3710.00', currencyCode: 'CAD' }, quantityAvailable: 2, sku: 'NOORI-BRAC2-R-18K', iframeUrl: 'https://akler1.github.io/Bracelet1Rose/Bracelet1%20Rose.1.html' } },
        ]
      },
      options: [
        { id: 'opt-brac2-metal', name: 'Metal', values: ['Yellow Gold', 'White Gold', 'Rose Gold'] },
        { id: 'opt-brac2-karat', name: 'Karat', values: ['14K', '18K'] }
      ],
      reviews: { rating: 5, count: 22 }
    },
    {
      id: 'gid://shopify/Product/4',
      handle: 'stud-round-14k',
      title: 'Round Vela Studs',
      description: 'Classic elegance in lab-grown diamonds. Available in gold, white gold, and rose gold with your choice of 2 ct. tw. or 4 ct. tw. total weight.',
      priceRange: {
        minVariantPrice: { amount: '1954.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '2960.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '2500.00', currencyCode: 'CAD' }
      },
      images: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductImage/4',
              url: '/src/assets/earrings-hero.jpg',
              altText: 'Round Solitaire Studs Earrings',
              width: 800,
              height: 600
            }
          }
        ]
      },
      variants: {
        edges: [
          // Yellow Gold variants
          { node: { id: 'v-rnd-y-14k-2ct', title: 'Yellow Gold / 14K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '1954.00', currencyCode: 'CAD' }, quantityAvailable: 15, sku: 'NOORI-STUD-Y-14K-2CT', iframeUrl: 'https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html' } },
          { node: { id: 'v-rnd-y-14k-4ct', title: 'Yellow Gold / 14K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2831.00', currencyCode: 'CAD' }, quantityAvailable: 8, sku: 'NOORI-STUD-Y-14K-4CT', iframeUrl: 'https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html' } },
          { node: { id: 'v-rnd-y-18k-2ct', title: 'Yellow Gold / 18K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '2047.00', currencyCode: 'CAD' }, quantityAvailable: 10, sku: 'NOORI-STUD-Y-18K-2CT', iframeUrl: 'https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html' } },
          { node: { id: 'v-rnd-y-18k-4ct', title: 'Yellow Gold / 18K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2960.00', currencyCode: 'CAD' }, quantityAvailable: 6, sku: 'NOORI-STUD-Y-18K-4CT', iframeUrl: 'https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html' } },
          // White Gold variants
          { node: { id: 'v-rnd-w-14k-2ct', title: 'White Gold / 14K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '1954.00', currencyCode: 'CAD' }, quantityAvailable: 12, sku: 'NOORI-STUD-W-14K-2CT', iframeUrl: 'https://akler1.github.io/XR-Rounds-White.1/XR%20Rounds%20White.1.html' } },
          { node: { id: 'v-rnd-w-14k-4ct', title: 'White Gold / 14K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2831.00', currencyCode: 'CAD' }, quantityAvailable: 6, sku: 'NOORI-STUD-W-14K-4CT', iframeUrl: 'https://akler1.github.io/XR-Rounds-White.1/XR%20Rounds%20White.1.html' } },
          { node: { id: 'v-rnd-w-18k-2ct', title: 'White Gold / 18K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '2047.00', currencyCode: 'CAD' }, quantityAvailable: 8, sku: 'NOORI-STUD-W-18K-2CT', iframeUrl: 'https://akler1.github.io/XR-Rounds-White.1/XR%20Rounds%20White.1.html' } },
          { node: { id: 'v-rnd-w-18k-4ct', title: 'White Gold / 18K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2960.00', currencyCode: 'CAD' }, quantityAvailable: 4, sku: 'NOORI-STUD-W-18K-4CT', iframeUrl: 'https://akler1.github.io/XR-Rounds-White.1/XR%20Rounds%20White.1.html' } },
          // Rose Gold variants
          { node: { id: 'v-rnd-r-14k-2ct', title: 'Rose Gold / 14K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '1954.00', currencyCode: 'CAD' }, quantityAvailable: 10, sku: 'NOORI-STUD-R-14K-2CT', iframeUrl: 'https://akler1.github.io/XR-Round-RoseGold.1/XR%20Rounds%20Rose.2.html' } },
          { node: { id: 'v-rnd-r-14k-4ct', title: 'Rose Gold / 14K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2831.00', currencyCode: 'CAD' }, quantityAvailable: 5, sku: 'NOORI-STUD-R-14K-4CT', iframeUrl: 'https://akler1.github.io/XR-Round-RoseGold.1/XR%20Rounds%20Rose.2.html' } },
          { node: { id: 'v-rnd-r-18k-2ct', title: 'Rose Gold / 18K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '2047.00', currencyCode: 'CAD' }, quantityAvailable: 7, sku: 'NOORI-STUD-R-18K-2CT', iframeUrl: 'https://akler1.github.io/XR-Round-RoseGold.1/XR%20Rounds%20Rose.2.html' } },
          { node: { id: 'v-rnd-r-18k-4ct', title: 'Rose Gold / 18K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2960.00', currencyCode: 'CAD' }, quantityAvailable: 3, sku: 'NOORI-STUD-R-18K-4CT', iframeUrl: 'https://akler1.github.io/XR-Round-RoseGold.1/XR%20Rounds%20Rose.2.html' } },
        ]
      },
      options: [
        { id: 'opt-rnd-metal', name: 'Metal', values: ['Yellow Gold', 'White Gold', 'Rose Gold'] },
        { id: 'opt-rnd-karat', name: 'Karat', values: ['14K', '18K'] },
        { id: 'opt-rnd-size', name: 'Size', values: ['2 ct. tw.', '4 ct. tw.'] }
      ],
      reviews: { rating: 5, count: 156 }
    },
    {
      id: 'gid://shopify/Product/5',
      handle: 'earrings-emerald-gold',
      title: 'Emerald Vela Studs',
      description: 'Elegant emerald cut lab-grown diamonds in premium metals. A timeless design that showcases the emerald cut\'s unique step-cut faceting.',
      priceRange: {
        minVariantPrice: { amount: '1954.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '2960.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '2500.00', currencyCode: 'CAD' }
      },
      images: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductImage/5',
              url: '/src/assets/earrings-hero.jpg',
              altText: 'Emerald Cut Earrings',
              width: 800,
              height: 600
            }
          }
        ]
      },
      variants: {
        edges: [
          // Yellow Gold variants
          { node: { id: 'v-em-y-14k-2ct', title: 'Yellow Gold / 14K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '1954.00', currencyCode: 'CAD' }, quantityAvailable: 12, sku: 'NOORI-EM-Y-14K-2CT', iframeUrl: 'https://akler1.github.io/XR-Emerald-gold.1/' } },
          { node: { id: 'v-em-y-14k-4ct', title: 'Yellow Gold / 14K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2831.00', currencyCode: 'CAD' }, quantityAvailable: 7, sku: 'NOORI-EM-Y-14K-4CT', iframeUrl: 'https://akler1.github.io/XR-Emerald-gold.1/' } },
          { node: { id: 'v-em-y-18k-2ct', title: 'Yellow Gold / 18K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '2047.00', currencyCode: 'CAD' }, quantityAvailable: 10, sku: 'NOORI-EM-Y-18K-2CT', iframeUrl: 'https://akler1.github.io/XR-Emerald-gold.1/' } },
          { node: { id: 'v-em-y-18k-4ct', title: 'Yellow Gold / 18K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2960.00', currencyCode: 'CAD' }, quantityAvailable: 6, sku: 'NOORI-EM-Y-18K-4CT', iframeUrl: 'https://akler1.github.io/XR-Emerald-gold.1/' } },
          // White Gold variants
          { node: { id: 'v-em-w-14k-2ct', title: 'White Gold / 14K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '1954.00', currencyCode: 'CAD' }, quantityAvailable: 10, sku: 'NOORI-EM-W-14K-2CT', iframeUrl: 'https://akler1.github.io/XR-Emerald-WhiteGold.1/XR%20Emerald%20White.1.html' } },
          { node: { id: 'v-em-w-14k-4ct', title: 'White Gold / 14K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2831.00', currencyCode: 'CAD' }, quantityAvailable: 5, sku: 'NOORI-EM-W-14K-4CT', iframeUrl: 'https://akler1.github.io/XR-Emerald-WhiteGold.1/XR%20Emerald%20White.1.html' } },
          { node: { id: 'v-em-w-18k-2ct', title: 'White Gold / 18K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '2047.00', currencyCode: 'CAD' }, quantityAvailable: 8, sku: 'NOORI-EM-W-18K-2CT', iframeUrl: 'https://akler1.github.io/XR-Emerald-WhiteGold.1/XR%20Emerald%20White.1.html' } },
          { node: { id: 'v-em-w-18k-4ct', title: 'White Gold / 18K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2960.00', currencyCode: 'CAD' }, quantityAvailable: 4, sku: 'NOORI-EM-W-18K-4CT', iframeUrl: 'https://akler1.github.io/XR-Emerald-WhiteGold.1/XR%20Emerald%20White.1.html' } },
          // Rose Gold variants
          { node: { id: 'v-em-r-14k-2ct', title: 'Rose Gold / 14K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '1954.00', currencyCode: 'CAD' }, quantityAvailable: 9, sku: 'NOORI-EM-R-14K-2CT', iframeUrl: 'https://akler1.github.io/XR-Emerald-RoseGold.1/XR%20Emerald%20Rose.1.html' } },
          { node: { id: 'v-em-r-14k-4ct', title: 'Rose Gold / 14K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2831.00', currencyCode: 'CAD' }, quantityAvailable: 4, sku: 'NOORI-EM-R-14K-4CT', iframeUrl: 'https://akler1.github.io/XR-Emerald-RoseGold.1/XR%20Emerald%20Rose.1.html' } },
          { node: { id: 'v-em-r-18k-2ct', title: 'Rose Gold / 18K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '2047.00', currencyCode: 'CAD' }, quantityAvailable: 7, sku: 'NOORI-EM-R-18K-2CT', iframeUrl: 'https://akler1.github.io/XR-Emerald-RoseGold.1/XR%20Emerald%20Rose.1.html' } },
          { node: { id: 'v-em-r-18k-4ct', title: 'Rose Gold / 18K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2960.00', currencyCode: 'CAD' }, quantityAvailable: 3, sku: 'NOORI-EM-R-18K-4CT', iframeUrl: 'https://akler1.github.io/XR-Emerald-RoseGold.1/XR%20Emerald%20Rose.1.html' } },
        ]
      },
      options: [
        { id: 'opt-em-metal', name: 'Metal', values: ['Yellow Gold', 'White Gold', 'Rose Gold'] },
        { id: 'opt-em-karat', name: 'Karat', values: ['14K', '18K'] },
        { id: 'opt-em-size', name: 'Size', values: ['2 ct. tw.', '4 ct. tw.'] }
      ],
      reviews: { rating: 5, count: 142 }
    },
    {
      id: 'gid://shopify/Product/6',
      handle: 'earrings-princess-18k',
      title: 'Princess Vela Studs',
      description: 'Classic princess cut lab-grown diamonds in premium metals. The square silhouette offers a modern twist on timeless elegance.',
      priceRange: {
        minVariantPrice: { amount: '1954.00', currencyCode: 'CAD' },
        maxVariantPrice: { amount: '2960.00', currencyCode: 'CAD' }
      },
      compareAtPriceRange: {
        minVariantPrice: { amount: '2500.00', currencyCode: 'CAD' }
      },
      images: {
        edges: [
          {
            node: {
              id: 'gid://shopify/ProductImage/6',
              url: '/src/assets/earrings-princess.jpg',
              altText: 'Princess Cut Earrings',
              width: 800,
              height: 600
            }
          }
        ]
      },
      variants: {
        edges: [
          // Yellow Gold variants
          { node: { id: 'v-pr-y-14k-2ct', title: 'Yellow Gold / 14K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '1954.00', currencyCode: 'CAD' }, quantityAvailable: 14, sku: 'NOORI-PR-Y-14K-2CT', iframeUrl: 'https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html' } },
          { node: { id: 'v-pr-y-14k-4ct', title: 'Yellow Gold / 14K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2831.00', currencyCode: 'CAD' }, quantityAvailable: 8, sku: 'NOORI-PR-Y-14K-4CT', iframeUrl: 'https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html' } },
          { node: { id: 'v-pr-y-18k-2ct', title: 'Yellow Gold / 18K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '2047.00', currencyCode: 'CAD' }, quantityAvailable: 10, sku: 'NOORI-PR-Y-18K-2CT', iframeUrl: 'https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html' } },
          { node: { id: 'v-pr-y-18k-4ct', title: 'Yellow Gold / 18K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Yellow Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2960.00', currencyCode: 'CAD' }, quantityAvailable: 6, sku: 'NOORI-PR-Y-18K-4CT', iframeUrl: 'https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html' } },
          // White Gold variants
          { node: { id: 'v-pr-w-14k-2ct', title: 'White Gold / 14K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '1954.00', currencyCode: 'CAD' }, quantityAvailable: 11, sku: 'NOORI-PR-W-14K-2CT', iframeUrl: 'https://akler1.github.io/XR-Princess-White.1/XR%20Princess%20White%20.1.html' } },
          { node: { id: 'v-pr-w-14k-4ct', title: 'White Gold / 14K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2831.00', currencyCode: 'CAD' }, quantityAvailable: 6, sku: 'NOORI-PR-W-14K-4CT', iframeUrl: 'https://akler1.github.io/XR-Princess-White.1/XR%20Princess%20White%20.1.html' } },
          { node: { id: 'v-pr-w-18k-2ct', title: 'White Gold / 18K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '2047.00', currencyCode: 'CAD' }, quantityAvailable: 8, sku: 'NOORI-PR-W-18K-2CT', iframeUrl: 'https://akler1.github.io/XR-Princess-White.1/XR%20Princess%20White%20.1.html' } },
          { node: { id: 'v-pr-w-18k-4ct', title: 'White Gold / 18K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'White Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2960.00', currencyCode: 'CAD' }, quantityAvailable: 4, sku: 'NOORI-PR-W-18K-4CT', iframeUrl: 'https://akler1.github.io/XR-Princess-White.1/XR%20Princess%20White%20.1.html' } },
          // Rose Gold variants
          { node: { id: 'v-pr-r-14k-2ct', title: 'Rose Gold / 14K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '1954.00', currencyCode: 'CAD' }, quantityAvailable: 10, sku: 'NOORI-PR-R-14K-2CT', iframeUrl: 'https://akler1.github.io/XR-Princess-RoseGold.1/XR%20Princess%20Rose.1.html' } },
          { node: { id: 'v-pr-r-14k-4ct', title: 'Rose Gold / 14K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '14K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2831.00', currencyCode: 'CAD' }, quantityAvailable: 5, sku: 'NOORI-PR-R-14K-4CT', iframeUrl: 'https://akler1.github.io/XR-Princess-RoseGold.1/XR%20Princess%20Rose.1.html' } },
          { node: { id: 'v-pr-r-18k-2ct', title: 'Rose Gold / 18K / 2 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '2 ct. tw.' }], price: { amount: '2047.00', currencyCode: 'CAD' }, quantityAvailable: 7, sku: 'NOORI-PR-R-18K-2CT', iframeUrl: 'https://akler1.github.io/XR-Princess-RoseGold.1/XR%20Princess%20Rose.1.html' } },
          { node: { id: 'v-pr-r-18k-4ct', title: 'Rose Gold / 18K / 4 ct. tw.', availableForSale: true, selectedOptions: [{ name: 'Metal', value: 'Rose Gold' }, { name: 'Karat', value: '18K' }, { name: 'Size', value: '4 ct. tw.' }], price: { amount: '2960.00', currencyCode: 'CAD' }, quantityAvailable: 3, sku: 'NOORI-PR-R-18K-4CT', iframeUrl: 'https://akler1.github.io/XR-Princess-RoseGold.1/XR%20Princess%20Rose.1.html' } },
        ]
      },
      options: [
        { id: 'opt-pr-metal', name: 'Metal', values: ['Yellow Gold', 'White Gold', 'Rose Gold'] },
        { id: 'opt-pr-karat', name: 'Karat', values: ['14K', '18K'] },
        { id: 'opt-pr-size', name: 'Size', values: ['2 ct. tw.', '4 ct. tw.'] }
      ],
      reviews: { rating: 5, count: 128 }
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
                  title: 'Round Vela Studs',
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
