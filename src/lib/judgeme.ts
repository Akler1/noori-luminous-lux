// Judge.me integration via the widget endpoint
// The public token only works with /api/v1/widgets/product_review — not /api/v1/reviews
// That endpoint returns HTML which we parse via DOMParser to get structured data

const SHOP_DOMAIN = import.meta.env.VITE_JUDGEME_SHOP_DOMAIN as string;
const API_TOKEN = import.meta.env.VITE_JUDGEME_PUBLIC_TOKEN as string;

export interface JudgeMeReview {
  id: number;
  title: string;
  body: string;
  rating: number;
  reviewer: {
    name: string;
    verified_buyer: boolean;
  };
  created_at: string;
  pictures: string[];
}

export interface JudgeMeProductData {
  rating: number;
  reviews_count: number;
  reviews: JudgeMeReview[];
}

async function fetchWidgetDoc(handle: string): Promise<{ doc: Document; externalId: number }> {
  const url = new URL('https://judge.me/api/v1/widgets/product_review');
  url.searchParams.set('api_token', API_TOKEN);
  url.searchParams.set('shop_domain', SHOP_DOMAIN);
  url.searchParams.set('handle', handle);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Judge.me widget error: ${res.status}`);
  const json = await res.json() as { widget: string; product_external_id: number };

  const parser = new DOMParser();
  const doc = parser.parseFromString(json.widget, 'text/html');
  return { doc, externalId: json.product_external_id };
}

export async function getProductData(handle: string): Promise<JudgeMeProductData> {
  const { doc } = await fetchWidgetDoc(handle);

  const widgetEl = doc.querySelector('[data-average-rating]');
  const rating = parseFloat(widgetEl?.getAttribute('data-average-rating') ?? '0');
  const reviews_count = parseInt(widgetEl?.getAttribute('data-number-of-reviews') ?? '0', 10);

  const reviews: JudgeMeReview[] = [];
  doc.querySelectorAll('.jdgm-rev').forEach((el) => {
    const pictures: string[] = [];
    el.querySelectorAll('.jdgm-rev__photo').forEach((img) => {
      const src = img.getAttribute('data-src') ?? (img as HTMLImageElement).src;
      if (src) pictures.push(src);
    });

    reviews.push({
      id: parseInt(el.getAttribute('data-id') ?? '0', 10),
      title: el.querySelector('.jdgm-rev__title')?.textContent?.trim() ?? '',
      body: el.querySelector('.jdgm-rev__body p')?.textContent?.trim() ?? '',
      rating: parseInt(el.getAttribute('data-score') ?? '5', 10),
      reviewer: {
        name: el.querySelector('.jdgm-rev__author')?.textContent?.trim() ?? 'Customer',
        verified_buyer: el.querySelector('.jdgm-rev__badges-item--verified-buyer') !== null,
      },
      created_at: el.getAttribute('data-created-at') ?? '',
      pictures,
    });
  });

  return { rating, reviews_count, reviews };
}
