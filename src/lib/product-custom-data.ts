// Local custom data that enriches Shopify API products
// This data stays local because Shopify can't natively store 3D viewer URLs or local image paths

export interface VariantCustomData {
  iframeUrl?: string;
  iframeUrlAlt?: string;
  cadPrice?: { amount: string; currencyCode: string };
}

export interface MetalViewerData {
  iframeUrl: string;
  iframeUrlAlt?: string;
}

export interface ProductCustomData {
  reviews?: { rating: number; count: number };
  variantImages?: Record<string, Array<{ id: string; url: string; altText: string }>>;
  // 3D viewer URLs keyed by Metal option value (Yellow Gold, White Gold, Rose Gold)
  metalViewers?: Record<string, MetalViewerData>;
  variantOverrides?: Record<string, VariantCustomData>; // keyed by SKU (legacy, optional)
}

export const PRODUCT_CUSTOM_DATA: Record<string, ProductCustomData> = {
  'round-vela-pendant': {
    reviews: { rating: 5, count: 47 },
    metalViewers: {
      'Yellow Gold': { iframeUrl: 'https://akler1.github.io/round-y_zoomed/', iframeUrlAlt: 'https://akler1.github.io/round-y/' },
      'White Gold': { iframeUrl: 'https://akler1.github.io/round-w_zoomed/', iframeUrlAlt: 'https://akler1.github.io/round-w/' },
      'Rose Gold': { iframeUrl: 'https://akler1.github.io/round-r_zoomed/', iframeUrlAlt: 'https://akler1.github.io/round-r/' },
    },
    variantImages: {
      'Yellow Gold': [
        { id: 'rnd-y-0', url: '/product-images/pendants/round/yellow/0.jpg', altText: 'Round Vela Pendant - Yellow Gold front' },
        { id: 'rnd-y-45', url: '/product-images/pendants/round/yellow/45.jpg', altText: 'Round Vela Pendant - Yellow Gold 45\u00b0' },
        { id: 'rnd-y-90', url: '/product-images/pendants/round/yellow/90.jpg', altText: 'Round Vela Pendant - Yellow Gold side' },
        { id: 'rnd-y-135', url: '/product-images/pendants/round/yellow/135.jpg', altText: 'Round Vela Pendant - Yellow Gold 135\u00b0' },
        { id: 'rnd-yz-0', url: '/product-images/pendants/round/yellow_zoomed/0.jpg', altText: 'Round Vela Pendant - Yellow Gold detail' },
        { id: 'rnd-yz-45', url: '/product-images/pendants/round/yellow_zoomed/45.jpg', altText: 'Round Vela Pendant - Yellow Gold detail 45\u00b0' },
        { id: 'rnd-yz-90', url: '/product-images/pendants/round/yellow_zoomed/90.jpg', altText: 'Round Vela Pendant - Yellow Gold detail side' },
        { id: 'rnd-yz-135', url: '/product-images/pendants/round/yellow_zoomed/135.jpg', altText: 'Round Vela Pendant - Yellow Gold detail 135\u00b0' },
      ],
      'White Gold': [
        { id: 'rnd-w-0', url: '/product-images/pendants/round/white/0.jpg', altText: 'Round Vela Pendant - White Gold front' },
        { id: 'rnd-w-45', url: '/product-images/pendants/round/white/45.jpg', altText: 'Round Vela Pendant - White Gold 45\u00b0' },
        { id: 'rnd-w-90', url: '/product-images/pendants/round/white/90.jpg', altText: 'Round Vela Pendant - White Gold side' },
        { id: 'rnd-w-135', url: '/product-images/pendants/round/white/135.jpg', altText: 'Round Vela Pendant - White Gold 135\u00b0' },
        { id: 'rnd-wz-0', url: '/product-images/pendants/round/white_zoomed/0.jpg', altText: 'Round Vela Pendant - White Gold detail' },
        { id: 'rnd-wz-45', url: '/product-images/pendants/round/white_zoomed/45.jpg', altText: 'Round Vela Pendant - White Gold detail 45\u00b0' },
        { id: 'rnd-wz-90', url: '/product-images/pendants/round/white_zoomed/90.jpg', altText: 'Round Vela Pendant - White Gold detail side' },
        { id: 'rnd-wz-135', url: '/product-images/pendants/round/white_zoomed/135.jpg', altText: 'Round Vela Pendant - White Gold detail 135\u00b0' },
      ],
      'Rose Gold': [
        { id: 'rnd-r-0', url: '/product-images/pendants/round/rose/0.jpg', altText: 'Round Vela Pendant - Rose Gold front' },
        { id: 'rnd-r-45', url: '/product-images/pendants/round/rose/45.jpg', altText: 'Round Vela Pendant - Rose Gold 45\u00b0' },
        { id: 'rnd-r-90', url: '/product-images/pendants/round/rose/90.jpg', altText: 'Round Vela Pendant - Rose Gold side' },
        { id: 'rnd-r-135', url: '/product-images/pendants/round/rose/135.jpg', altText: 'Round Vela Pendant - Rose Gold 135\u00b0' },
        { id: 'rnd-rz-0', url: '/product-images/pendants/round/rose_zoomed/0.jpg', altText: 'Round Vela Pendant - Rose Gold detail' },
        { id: 'rnd-rz-45', url: '/product-images/pendants/round/rose_zoomed/45.jpg', altText: 'Round Vela Pendant - Rose Gold detail 45\u00b0' },
        { id: 'rnd-rz-90', url: '/product-images/pendants/round/rose_zoomed/90.jpg', altText: 'Round Vela Pendant - Rose Gold detail side' },
        { id: 'rnd-rz-135', url: '/product-images/pendants/round/rose_zoomed/135.jpg', altText: 'Round Vela Pendant - Rose Gold detail 135\u00b0' },
      ],
    },
    variantOverrides: {
      'NOORI-PEND-RND-Y-14K-1CT': {
        iframeUrl: 'https://akler1.github.io/round-y_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/round-y/',
        cadPrice: { amount: '2175.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-RND-Y-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/round-y_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/round-y/',
        cadPrice: { amount: '2900.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-RND-Y-18K-1CT': {
        iframeUrl: 'https://akler1.github.io/round-y_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/round-y/',
        cadPrice: { amount: '2300.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-RND-Y-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/round-y_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/round-y/',
        cadPrice: { amount: '3025.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-RND-W-14K-1CT': {
        iframeUrl: 'https://akler1.github.io/round-w_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/round-w/',
        cadPrice: { amount: '2175.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-RND-W-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/round-w_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/round-w/',
        cadPrice: { amount: '2900.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-RND-W-18K-1CT': {
        iframeUrl: 'https://akler1.github.io/round-w_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/round-w/',
        cadPrice: { amount: '2300.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-RND-W-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/round-w_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/round-w/',
        cadPrice: { amount: '3025.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-RND-R-14K-1CT': {
        iframeUrl: 'https://akler1.github.io/round-r_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/round-r/',
        cadPrice: { amount: '2175.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-RND-R-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/round-r_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/round-r/',
        cadPrice: { amount: '2900.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-RND-R-18K-1CT': {
        iframeUrl: 'https://akler1.github.io/round-r_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/round-r/',
        cadPrice: { amount: '2300.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-RND-R-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/round-r_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/round-r/',
        cadPrice: { amount: '3025.00', currencyCode: 'USD' },
      },
    },
  },

  'princess-vela-pendant': {
    reviews: { rating: 5, count: 42 },
    metalViewers: {
      'Yellow Gold': { iframeUrl: 'https://akler1.github.io/princess-y_zoomed/', iframeUrlAlt: 'https://akler1.github.io/princess-y/' },
      'White Gold': { iframeUrl: 'https://akler1.github.io/princess-w_zoomed/', iframeUrlAlt: 'https://akler1.github.io/princess-w/' },
      'Rose Gold': { iframeUrl: 'https://akler1.github.io/princess-r_zoomed/', iframeUrlAlt: 'https://akler1.github.io/princess-r/' },
    },
    variantImages: {
      'Yellow Gold': [
        { id: 'pr-y-0', url: '/product-images/pendants/princess/yellow/0.jpg', altText: 'Princess Vela Pendant - Yellow Gold front' },
        { id: 'pr-y-45', url: '/product-images/pendants/princess/yellow/45.jpg', altText: 'Princess Vela Pendant - Yellow Gold 45\u00b0' },
        { id: 'pr-y-90', url: '/product-images/pendants/princess/yellow/90.jpg', altText: 'Princess Vela Pendant - Yellow Gold side' },
        { id: 'pr-y-135', url: '/product-images/pendants/princess/yellow/135.jpg', altText: 'Princess Vela Pendant - Yellow Gold 135\u00b0' },
        { id: 'pr-yz-0', url: '/product-images/pendants/princess/yellow_zoomed/0.jpg', altText: 'Princess Vela Pendant - Yellow Gold detail' },
        { id: 'pr-yz-45', url: '/product-images/pendants/princess/yellow_zoomed/45.jpg', altText: 'Princess Vela Pendant - Yellow Gold detail 45\u00b0' },
        { id: 'pr-yz-90', url: '/product-images/pendants/princess/yellow_zoomed/90.jpg', altText: 'Princess Vela Pendant - Yellow Gold detail side' },
        { id: 'pr-yz-135', url: '/product-images/pendants/princess/yellow_zoomed/135.jpg', altText: 'Princess Vela Pendant - Yellow Gold detail 135\u00b0' },
      ],
      'White Gold': [
        { id: 'pr-w-0', url: '/product-images/pendants/princess/white/0.jpg', altText: 'Princess Vela Pendant - White Gold front' },
        { id: 'pr-w-45', url: '/product-images/pendants/princess/white/45.jpg', altText: 'Princess Vela Pendant - White Gold 45\u00b0' },
        { id: 'pr-w-90', url: '/product-images/pendants/princess/white/90.jpg', altText: 'Princess Vela Pendant - White Gold side' },
        { id: 'pr-w-135', url: '/product-images/pendants/princess/white/135.jpg', altText: 'Princess Vela Pendant - White Gold 135\u00b0' },
        { id: 'pr-wz-0', url: '/product-images/pendants/princess/white_zoomed/0.jpg', altText: 'Princess Vela Pendant - White Gold detail' },
        { id: 'pr-wz-45', url: '/product-images/pendants/princess/white_zoomed/45.jpg', altText: 'Princess Vela Pendant - White Gold detail 45\u00b0' },
        { id: 'pr-wz-90', url: '/product-images/pendants/princess/white_zoomed/90.jpg', altText: 'Princess Vela Pendant - White Gold detail side' },
        { id: 'pr-wz-135', url: '/product-images/pendants/princess/white_zoomed/135.jpg', altText: 'Princess Vela Pendant - White Gold detail 135\u00b0' },
      ],
      'Rose Gold': [
        { id: 'pr-r-0', url: '/product-images/pendants/princess/rose/0.jpg', altText: 'Princess Vela Pendant - Rose Gold front' },
        { id: 'pr-r-45', url: '/product-images/pendants/princess/rose/45.jpg', altText: 'Princess Vela Pendant - Rose Gold 45\u00b0' },
        { id: 'pr-r-90', url: '/product-images/pendants/princess/rose/90.jpg', altText: 'Princess Vela Pendant - Rose Gold side' },
        { id: 'pr-r-135', url: '/product-images/pendants/princess/rose/135.jpg', altText: 'Princess Vela Pendant - Rose Gold 135\u00b0' },
        { id: 'pr-rz-0', url: '/product-images/pendants/princess/rose_zoomed/0.jpg', altText: 'Princess Vela Pendant - Rose Gold detail' },
        { id: 'pr-rz-45', url: '/product-images/pendants/princess/rose_zoomed/45.jpg', altText: 'Princess Vela Pendant - Rose Gold detail 45\u00b0' },
        { id: 'pr-rz-90', url: '/product-images/pendants/princess/rose_zoomed/90.jpg', altText: 'Princess Vela Pendant - Rose Gold detail side' },
        { id: 'pr-rz-135', url: '/product-images/pendants/princess/rose_zoomed/135.jpg', altText: 'Princess Vela Pendant - Rose Gold detail 135\u00b0' },
      ],
    },
    variantOverrides: {
      'NOORI-PEND-PR-Y-14K-1CT': {
        iframeUrl: 'https://akler1.github.io/princess-y_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/princess-y/',
        cadPrice: { amount: '2175.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-PR-Y-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/princess-y_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/princess-y/',
        cadPrice: { amount: '2900.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-PR-Y-18K-1CT': {
        iframeUrl: 'https://akler1.github.io/princess-y_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/princess-y/',
        cadPrice: { amount: '2300.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-PR-Y-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/princess-y_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/princess-y/',
        cadPrice: { amount: '3025.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-PR-W-14K-1CT': {
        iframeUrl: 'https://akler1.github.io/princess-w_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/princess-w/',
        cadPrice: { amount: '2175.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-PR-W-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/princess-w_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/princess-w/',
        cadPrice: { amount: '2900.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-PR-W-18K-1CT': {
        iframeUrl: 'https://akler1.github.io/princess-w_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/princess-w/',
        cadPrice: { amount: '2300.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-PR-W-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/princess-w_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/princess-w/',
        cadPrice: { amount: '3025.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-PR-R-14K-1CT': {
        iframeUrl: 'https://akler1.github.io/princess-r_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/princess-r/',
        cadPrice: { amount: '2175.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-PR-R-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/princess-r_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/princess-r/',
        cadPrice: { amount: '2900.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-PR-R-18K-1CT': {
        iframeUrl: 'https://akler1.github.io/princess-r_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/princess-r/',
        cadPrice: { amount: '2300.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-PR-R-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/princess-r_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/princess-r/',
        cadPrice: { amount: '3025.00', currencyCode: 'USD' },
      },
    },
  },

  'emerald-vela-pendant': {
    reviews: { rating: 5, count: 38 },
    metalViewers: {
      'Yellow Gold': { iframeUrl: 'https://akler1.github.io/emerald-y_zoomed/', iframeUrlAlt: 'https://akler1.github.io/emerald-y/' },
      'White Gold': { iframeUrl: 'https://akler1.github.io/emerald-w_zoomed/', iframeUrlAlt: 'https://akler1.github.io/emerald-w/' },
      'Rose Gold': { iframeUrl: 'https://akler1.github.io/emerald-r_zoomed/', iframeUrlAlt: 'https://akler1.github.io/emerald-r/' },
    },
    variantImages: {
      'Yellow Gold': [
        { id: 'em-y-0', url: '/product-images/pendants/emerald/yellow/0.jpg', altText: 'Emerald Vela Pendant - Yellow Gold front' },
        { id: 'em-y-45', url: '/product-images/pendants/emerald/yellow/45.jpg', altText: 'Emerald Vela Pendant - Yellow Gold 45\u00b0' },
        { id: 'em-y-90', url: '/product-images/pendants/emerald/yellow/90.jpg', altText: 'Emerald Vela Pendant - Yellow Gold side' },
        { id: 'em-y-135', url: '/product-images/pendants/emerald/yellow/135.jpg', altText: 'Emerald Vela Pendant - Yellow Gold 135\u00b0' },
        { id: 'em-yz-0', url: '/product-images/pendants/emerald/yellow_zoomed/0.jpg', altText: 'Emerald Vela Pendant - Yellow Gold detail' },
        { id: 'em-yz-45', url: '/product-images/pendants/emerald/yellow_zoomed/45.jpg', altText: 'Emerald Vela Pendant - Yellow Gold detail 45\u00b0' },
        { id: 'em-yz-90', url: '/product-images/pendants/emerald/yellow_zoomed/90.jpg', altText: 'Emerald Vela Pendant - Yellow Gold detail side' },
        { id: 'em-yz-135', url: '/product-images/pendants/emerald/yellow_zoomed/135.jpg', altText: 'Emerald Vela Pendant - Yellow Gold detail 135\u00b0' },
      ],
      'White Gold': [
        { id: 'em-w-0', url: '/product-images/pendants/emerald/white/0.jpg', altText: 'Emerald Vela Pendant - White Gold front' },
        { id: 'em-w-45', url: '/product-images/pendants/emerald/white/45.jpg', altText: 'Emerald Vela Pendant - White Gold 45\u00b0' },
        { id: 'em-w-90', url: '/product-images/pendants/emerald/white/90.jpg', altText: 'Emerald Vela Pendant - White Gold side' },
        { id: 'em-w-135', url: '/product-images/pendants/emerald/white/135.jpg', altText: 'Emerald Vela Pendant - White Gold 135\u00b0' },
        { id: 'em-wz-0', url: '/product-images/pendants/emerald/white_zoomed/0.jpg', altText: 'Emerald Vela Pendant - White Gold detail' },
        { id: 'em-wz-45', url: '/product-images/pendants/emerald/white_zoomed/45.jpg', altText: 'Emerald Vela Pendant - White Gold detail 45\u00b0' },
        { id: 'em-wz-90', url: '/product-images/pendants/emerald/white_zoomed/90.jpg', altText: 'Emerald Vela Pendant - White Gold detail side' },
        { id: 'em-wz-135', url: '/product-images/pendants/emerald/white_zoomed/135.jpg', altText: 'Emerald Vela Pendant - White Gold detail 135\u00b0' },
      ],
      'Rose Gold': [
        { id: 'em-r-0', url: '/product-images/pendants/emerald/rose/0.jpg', altText: 'Emerald Vela Pendant - Rose Gold front' },
        { id: 'em-r-45', url: '/product-images/pendants/emerald/rose/45.jpg', altText: 'Emerald Vela Pendant - Rose Gold 45\u00b0' },
        { id: 'em-r-90', url: '/product-images/pendants/emerald/rose/90.jpg', altText: 'Emerald Vela Pendant - Rose Gold side' },
        { id: 'em-r-135', url: '/product-images/pendants/emerald/rose/135.jpg', altText: 'Emerald Vela Pendant - Rose Gold 135\u00b0' },
        { id: 'em-rz-0', url: '/product-images/pendants/emerald/rose_zoomed/0.jpg', altText: 'Emerald Vela Pendant - Rose Gold detail' },
        { id: 'em-rz-45', url: '/product-images/pendants/emerald/rose_zoomed/45.jpg', altText: 'Emerald Vela Pendant - Rose Gold detail 45\u00b0' },
        { id: 'em-rz-90', url: '/product-images/pendants/emerald/rose_zoomed/90.jpg', altText: 'Emerald Vela Pendant - Rose Gold detail side' },
        { id: 'em-rz-135', url: '/product-images/pendants/emerald/rose_zoomed/135.jpg', altText: 'Emerald Vela Pendant - Rose Gold detail 135\u00b0' },
      ],
    },
    variantOverrides: {
      'NOORI-PEND-EM-Y-14K-1CT': {
        iframeUrl: 'https://akler1.github.io/emerald-y_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/emerald-y/',
        cadPrice: { amount: '2175.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-EM-Y-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/emerald-y_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/emerald-y/',
        cadPrice: { amount: '2900.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-EM-Y-18K-1CT': {
        iframeUrl: 'https://akler1.github.io/emerald-y_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/emerald-y/',
        cadPrice: { amount: '2300.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-EM-Y-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/emerald-y_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/emerald-y/',
        cadPrice: { amount: '3025.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-EM-W-14K-1CT': {
        iframeUrl: 'https://akler1.github.io/emerald-w_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/emerald-w/',
        cadPrice: { amount: '2175.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-EM-W-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/emerald-w_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/emerald-w/',
        cadPrice: { amount: '2900.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-EM-W-18K-1CT': {
        iframeUrl: 'https://akler1.github.io/emerald-w_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/emerald-w/',
        cadPrice: { amount: '2300.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-EM-W-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/emerald-w_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/emerald-w/',
        cadPrice: { amount: '3025.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-EM-R-14K-1CT': {
        iframeUrl: 'https://akler1.github.io/emerald-r_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/emerald-r/',
        cadPrice: { amount: '2175.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-EM-R-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/emerald-r_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/emerald-r/',
        cadPrice: { amount: '2900.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-EM-R-18K-1CT': {
        iframeUrl: 'https://akler1.github.io/emerald-r_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/emerald-r/',
        cadPrice: { amount: '2300.00', currencyCode: 'USD' },
      },
      'NOORI-PEND-EM-R-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/emerald-r_zoomed/',
        iframeUrlAlt: 'https://akler1.github.io/emerald-r/',
        cadPrice: { amount: '3025.00', currencyCode: 'USD' },
      },
    },
  },

  'vela-bracelet': {
    reviews: { rating: 5, count: 67 },
    metalViewers: {
      'Yellow Gold': { iframeUrl: 'https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html' },
      'White Gold': { iframeUrl: 'https://akler1.github.io/bracelet1White/Bracelet1%20White.3.html' },
      'Rose Gold': { iframeUrl: 'https://akler1.github.io/Bracelet1Rose/Bracelet1%20Rose.1.html' },
    },
    variantImages: {
      'Yellow Gold': [
        { id: 'b-y-0', url: '/product-images/bracelets/yellow/0.jpg', altText: 'Vela Bracelet - Yellow Gold front' },
        { id: 'b-y-45', url: '/product-images/bracelets/yellow/45.jpg', altText: 'Vela Bracelet - Yellow Gold 45\u00b0' },
        { id: 'b-y-90', url: '/product-images/bracelets/yellow/90.jpg', altText: 'Vela Bracelet - Yellow Gold side' },
        { id: 'b-y-135', url: '/product-images/bracelets/yellow/135.jpg', altText: 'Vela Bracelet - Yellow Gold 135\u00b0' },
      ],
      'White Gold': [
        { id: 'b-w-0', url: '/product-images/bracelets/white/0.jpg', altText: 'Vela Bracelet - White Gold front' },
        { id: 'b-w-45', url: '/product-images/bracelets/white/45.jpg', altText: 'Vela Bracelet - White Gold 45\u00b0' },
        { id: 'b-w-90', url: '/product-images/bracelets/white/90.jpg', altText: 'Vela Bracelet - White Gold side' },
        { id: 'b-w-135', url: '/product-images/bracelets/white/135.jpg', altText: 'Vela Bracelet - White Gold 135\u00b0' },
      ],
      'Rose Gold': [
        { id: 'b-r-0', url: '/product-images/bracelets/rose/0.jpg', altText: 'Vela Bracelet - Rose Gold front' },
        { id: 'b-r-45', url: '/product-images/bracelets/rose/45.jpg', altText: 'Vela Bracelet - Rose Gold 45\u00b0' },
        { id: 'b-r-90', url: '/product-images/bracelets/rose/90.jpg', altText: 'Vela Bracelet - Rose Gold side' },
        { id: 'b-r-135', url: '/product-images/bracelets/rose/135.jpg', altText: 'Vela Bracelet - Rose Gold 135\u00b0' },
      ],
    },
    variantOverrides: {
      'NOORI-BRAC1-Y-14K': {
        iframeUrl: 'https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html',
        cadPrice: { amount: '3475.00', currencyCode: 'USD' },
      },
      'NOORI-BRAC1-Y-18K': {
        iframeUrl: 'https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html',
        cadPrice: { amount: '3800.00', currencyCode: 'USD' },
      },
      'NOORI-BRAC1-W-14K': {
        iframeUrl: 'https://akler1.github.io/bracelet1White/Bracelet1%20White.3.html',
        cadPrice: { amount: '3475.00', currencyCode: 'USD' },
      },
      'NOORI-BRAC1-W-18K': {
        iframeUrl: 'https://akler1.github.io/bracelet1White/Bracelet1%20White.3.html',
        cadPrice: { amount: '3800.00', currencyCode: 'USD' },
      },
      'NOORI-BRAC1-R-14K': {
        iframeUrl: 'https://akler1.github.io/Bracelet1Rose/Bracelet1%20Rose.1.html',
        cadPrice: { amount: '3475.00', currencyCode: 'USD' },
      },
      'NOORI-BRAC1-R-18K': {
        iframeUrl: 'https://akler1.github.io/Bracelet1Rose/Bracelet1%20Rose.1.html',
        cadPrice: { amount: '3800.00', currencyCode: 'USD' },
      },
    },
  },

  'vela-bracelet-2ct': {
    reviews: { rating: 5, count: 22 },
    metalViewers: {
      'Yellow Gold': { iframeUrl: 'https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html' },
      'White Gold': { iframeUrl: 'https://akler1.github.io/bracelet1White/Bracelet1%20White.3.html' },
      'Rose Gold': { iframeUrl: 'https://akler1.github.io/Bracelet1Rose/Bracelet1%20Rose.1.html' },
    },
    variantOverrides: {
      'NOORI-BRAC2-Y-14K': {
        iframeUrl: 'https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html',
        cadPrice: { amount: '4800.00', currencyCode: 'USD' },
      },
      'NOORI-BRAC2-Y-18K': {
        iframeUrl: 'https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html',
        cadPrice: { amount: '5100.00', currencyCode: 'USD' },
      },
      'NOORI-BRAC2-W-14K': {
        iframeUrl: 'https://akler1.github.io/bracelet1White/Bracelet1%20White.3.html',
        cadPrice: { amount: '4800.00', currencyCode: 'USD' },
      },
      'NOORI-BRAC2-W-18K': {
        iframeUrl: 'https://akler1.github.io/bracelet1White/Bracelet1%20White.3.html',
        cadPrice: { amount: '5100.00', currencyCode: 'USD' },
      },
      'NOORI-BRAC2-R-14K': {
        iframeUrl: 'https://akler1.github.io/Bracelet1Rose/Bracelet1%20Rose.1.html',
        cadPrice: { amount: '4800.00', currencyCode: 'USD' },
      },
      'NOORI-BRAC2-R-18K': {
        iframeUrl: 'https://akler1.github.io/Bracelet1Rose/Bracelet1%20Rose.1.html',
        cadPrice: { amount: '5100.00', currencyCode: 'USD' },
      },
    },
  },

  'round-vela-studs': {
    reviews: { rating: 5, count: 156 },
    metalViewers: {
      'Yellow Gold': { iframeUrl: 'https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html' },
      'White Gold': { iframeUrl: 'https://akler1.github.io/XR-Rounds-White.1/XR%20Rounds%20White.1.html' },
      'Rose Gold': { iframeUrl: 'https://akler1.github.io/XR-Round-RoseGold.1/XR%20Rounds%20Rose.2.html' },
    },
    variantImages: {
      'Yellow Gold': [
        { id: 'e-rnd-y-0', url: '/product-images/earrings/round/yellow/0.jpg', altText: 'Round Vela Studs - Yellow Gold front' },
        { id: 'e-rnd-y-45', url: '/product-images/earrings/round/yellow/45.jpg', altText: 'Round Vela Studs - Yellow Gold 45\u00b0' },
        { id: 'e-rnd-y-90', url: '/product-images/earrings/round/yellow/90.jpg', altText: 'Round Vela Studs - Yellow Gold side' },
        { id: 'e-rnd-y-135', url: '/product-images/earrings/round/yellow/135.jpg', altText: 'Round Vela Studs - Yellow Gold 135\u00b0' },
      ],
      'Rose Gold': [
        { id: 'e-rnd-r-0', url: '/product-images/earrings/round/rose/0.jpg', altText: 'Round Vela Studs - Rose Gold front' },
        { id: 'e-rnd-r-45', url: '/product-images/earrings/round/rose/45.jpg', altText: 'Round Vela Studs - Rose Gold 45\u00b0' },
        { id: 'e-rnd-r-90', url: '/product-images/earrings/round/rose/90.jpg', altText: 'Round Vela Studs - Rose Gold side' },
        { id: 'e-rnd-r-135', url: '/product-images/earrings/round/rose/135.jpg', altText: 'Round Vela Studs - Rose Gold 135\u00b0' },
      ],
    },
    variantOverrides: {
      'NOORI-STUD-Y-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html',
        cadPrice: { amount: '2425.00', currencyCode: 'USD' },
      },
      'NOORI-STUD-Y-14K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html',
        cadPrice: { amount: '3975.00', currencyCode: 'USD' },
      },
      'NOORI-STUD-Y-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html',
        cadPrice: { amount: '2550.00', currencyCode: 'USD' },
      },
      'NOORI-STUD-Y-18K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Round-Gold.1/XR%20Rounds%20Yellow.1.html',
        cadPrice: { amount: '4100.00', currencyCode: 'USD' },
      },
      'NOORI-STUD-W-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Rounds-White.1/XR%20Rounds%20White.1.html',
        cadPrice: { amount: '2425.00', currencyCode: 'USD' },
      },
      'NOORI-STUD-W-14K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Rounds-White.1/XR%20Rounds%20White.1.html',
        cadPrice: { amount: '3975.00', currencyCode: 'USD' },
      },
      'NOORI-STUD-W-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Rounds-White.1/XR%20Rounds%20White.1.html',
        cadPrice: { amount: '2550.00', currencyCode: 'USD' },
      },
      'NOORI-STUD-W-18K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Rounds-White.1/XR%20Rounds%20White.1.html',
        cadPrice: { amount: '4100.00', currencyCode: 'USD' },
      },
      'NOORI-STUD-R-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Round-RoseGold.1/XR%20Rounds%20Rose.2.html',
        cadPrice: { amount: '2425.00', currencyCode: 'USD' },
      },
      'NOORI-STUD-R-14K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Round-RoseGold.1/XR%20Rounds%20Rose.2.html',
        cadPrice: { amount: '3975.00', currencyCode: 'USD' },
      },
      'NOORI-STUD-R-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Round-RoseGold.1/XR%20Rounds%20Rose.2.html',
        cadPrice: { amount: '2550.00', currencyCode: 'USD' },
      },
      'NOORI-STUD-R-18K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Round-RoseGold.1/XR%20Rounds%20Rose.2.html',
        cadPrice: { amount: '4100.00', currencyCode: 'USD' },
      },
    },
  },

  'emerald-vela-studs': {
    reviews: { rating: 5, count: 142 },
    metalViewers: {
      'Yellow Gold': { iframeUrl: 'https://akler1.github.io/XR-Emerald-gold.1/' },
      'White Gold': { iframeUrl: 'https://akler1.github.io/XR-Emerald-WhiteGold.1/XR%20Emerald%20White.1.html' },
      'Rose Gold': { iframeUrl: 'https://akler1.github.io/XR-Emerald-RoseGold.1/XR%20Emerald%20Rose.1.html' },
    },
    variantImages: {
      'Yellow Gold': [
        { id: 'e-em-y-0', url: '/product-images/earrings/emerald/yellow/0.png', altText: 'Emerald Vela Studs - Yellow Gold front' },
        { id: 'e-em-y-45', url: '/product-images/earrings/emerald/yellow/45.png', altText: 'Emerald Vela Studs - Yellow Gold 45\u00b0' },
        { id: 'e-em-y-90', url: '/product-images/earrings/emerald/yellow/90.png', altText: 'Emerald Vela Studs - Yellow Gold side' },
        { id: 'e-em-y-135', url: '/product-images/earrings/emerald/yellow/135.png', altText: 'Emerald Vela Studs - Yellow Gold 135\u00b0' },
      ],
      'Rose Gold': [
        { id: 'e-em-r-0', url: '/product-images/earrings/emerald/rose/0.jpg', altText: 'Emerald Vela Studs - Rose Gold front' },
        { id: 'e-em-r-45', url: '/product-images/earrings/emerald/rose/45.jpg', altText: 'Emerald Vela Studs - Rose Gold 45\u00b0' },
        { id: 'e-em-r-90', url: '/product-images/earrings/emerald/rose/90.jpg', altText: 'Emerald Vela Studs - Rose Gold side' },
        { id: 'e-em-r-135', url: '/product-images/earrings/emerald/rose/135.jpg', altText: 'Emerald Vela Studs - Rose Gold 135\u00b0' },
      ],
    },
    variantOverrides: {
      'NOORI-EM-Y-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Emerald-gold.1/',
        cadPrice: { amount: '2425.00', currencyCode: 'USD' },
      },
      'NOORI-EM-Y-14K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Emerald-gold.1/',
        cadPrice: { amount: '3975.00', currencyCode: 'USD' },
      },
      'NOORI-EM-Y-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Emerald-gold.1/',
        cadPrice: { amount: '2550.00', currencyCode: 'USD' },
      },
      'NOORI-EM-Y-18K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Emerald-gold.1/',
        cadPrice: { amount: '4100.00', currencyCode: 'USD' },
      },
      'NOORI-EM-W-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Emerald-WhiteGold.1/XR%20Emerald%20White.1.html',
        cadPrice: { amount: '2425.00', currencyCode: 'USD' },
      },
      'NOORI-EM-W-14K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Emerald-WhiteGold.1/XR%20Emerald%20White.1.html',
        cadPrice: { amount: '3975.00', currencyCode: 'USD' },
      },
      'NOORI-EM-W-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Emerald-WhiteGold.1/XR%20Emerald%20White.1.html',
        cadPrice: { amount: '2550.00', currencyCode: 'USD' },
      },
      'NOORI-EM-W-18K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Emerald-WhiteGold.1/XR%20Emerald%20White.1.html',
        cadPrice: { amount: '4100.00', currencyCode: 'USD' },
      },
      'NOORI-EM-R-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Emerald-RoseGold.1/XR%20Emerald%20Rose.1.html',
        cadPrice: { amount: '2425.00', currencyCode: 'USD' },
      },
      'NOORI-EM-R-14K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Emerald-RoseGold.1/XR%20Emerald%20Rose.1.html',
        cadPrice: { amount: '3975.00', currencyCode: 'USD' },
      },
      'NOORI-EM-R-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Emerald-RoseGold.1/XR%20Emerald%20Rose.1.html',
        cadPrice: { amount: '2550.00', currencyCode: 'USD' },
      },
      'NOORI-EM-R-18K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Emerald-RoseGold.1/XR%20Emerald%20Rose.1.html',
        cadPrice: { amount: '4100.00', currencyCode: 'USD' },
      },
    },
  },

  'princess-vela-studs': {
    reviews: { rating: 5, count: 128 },
    metalViewers: {
      'Yellow Gold': { iframeUrl: 'https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html' },
      'White Gold': { iframeUrl: 'https://akler1.github.io/XR-Princess-White.1/XR%20Princess%20White%20.1.html' },
      'Rose Gold': { iframeUrl: 'https://akler1.github.io/XR-Princess-RoseGold.1/XR%20Princess%20Rose.1.html' },
    },
    variantImages: {
      'Yellow Gold': [
        { id: 'e-pr-y-0', url: '/product-images/earrings/princess/yellow/0.jpg', altText: 'Princess Vela Studs - Yellow Gold front' },
        { id: 'e-pr-y-45', url: '/product-images/earrings/princess/yellow/45.jpg', altText: 'Princess Vela Studs - Yellow Gold 45\u00b0' },
        { id: 'e-pr-y-90', url: '/product-images/earrings/princess/yellow/90.jpg', altText: 'Princess Vela Studs - Yellow Gold side' },
        { id: 'e-pr-y-135', url: '/product-images/earrings/princess/yellow/135.jpg', altText: 'Princess Vela Studs - Yellow Gold 135\u00b0' },
      ],
      'White Gold': [
        { id: 'e-pr-w-0', url: '/product-images/earrings/princess/white/0.jpg', altText: 'Princess Vela Studs - White Gold front' },
        { id: 'e-pr-w-45', url: '/product-images/earrings/princess/white/45.jpg', altText: 'Princess Vela Studs - White Gold 45\u00b0' },
        { id: 'e-pr-w-90', url: '/product-images/earrings/princess/white/90.jpg', altText: 'Princess Vela Studs - White Gold side' },
        { id: 'e-pr-w-135', url: '/product-images/earrings/princess/white/135.jpg', altText: 'Princess Vela Studs - White Gold 135\u00b0' },
      ],
      'Rose Gold': [
        { id: 'e-pr-r-0', url: '/product-images/earrings/princess/rose/0.jpg', altText: 'Princess Vela Studs - Rose Gold front' },
        { id: 'e-pr-r-45', url: '/product-images/earrings/princess/rose/45.jpg', altText: 'Princess Vela Studs - Rose Gold 45\u00b0' },
        { id: 'e-pr-r-90', url: '/product-images/earrings/princess/rose/90.jpg', altText: 'Princess Vela Studs - Rose Gold side' },
        { id: 'e-pr-r-135', url: '/product-images/earrings/princess/rose/135.jpg', altText: 'Princess Vela Studs - Rose Gold 135\u00b0' },
      ],
    },
    variantOverrides: {
      'NOORI-PR-Y-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html',
        cadPrice: { amount: '2425.00', currencyCode: 'USD' },
      },
      'NOORI-PR-Y-14K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html',
        cadPrice: { amount: '3975.00', currencyCode: 'USD' },
      },
      'NOORI-PR-Y-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html',
        cadPrice: { amount: '2550.00', currencyCode: 'USD' },
      },
      'NOORI-PR-Y-18K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Princess-Gold.1/XR%20Princess%20Yellow.2.html',
        cadPrice: { amount: '4100.00', currencyCode: 'USD' },
      },
      'NOORI-PR-W-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Princess-White.1/XR%20Princess%20White%20.1.html',
        cadPrice: { amount: '2425.00', currencyCode: 'USD' },
      },
      'NOORI-PR-W-14K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Princess-White.1/XR%20Princess%20White%20.1.html',
        cadPrice: { amount: '3975.00', currencyCode: 'USD' },
      },
      'NOORI-PR-W-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Princess-White.1/XR%20Princess%20White%20.1.html',
        cadPrice: { amount: '2550.00', currencyCode: 'USD' },
      },
      'NOORI-PR-W-18K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Princess-White.1/XR%20Princess%20White%20.1.html',
        cadPrice: { amount: '4100.00', currencyCode: 'USD' },
      },
      'NOORI-PR-R-14K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Princess-RoseGold.1/XR%20Princess%20Rose.1.html',
        cadPrice: { amount: '2425.00', currencyCode: 'USD' },
      },
      'NOORI-PR-R-14K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Princess-RoseGold.1/XR%20Princess%20Rose.1.html',
        cadPrice: { amount: '3975.00', currencyCode: 'USD' },
      },
      'NOORI-PR-R-18K-2CT': {
        iframeUrl: 'https://akler1.github.io/XR-Princess-RoseGold.1/XR%20Princess%20Rose.1.html',
        cadPrice: { amount: '2550.00', currencyCode: 'USD' },
      },
      'NOORI-PR-R-18K-4CT': {
        iframeUrl: 'https://akler1.github.io/XR-Princess-RoseGold.1/XR%20Princess%20Rose.1.html',
        cadPrice: { amount: '4100.00', currencyCode: 'USD' },
      },
    },
  },
};
