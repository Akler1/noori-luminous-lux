import { Helmet } from "react-helmet-async";

const SITE = "https://noori.design";
const DEFAULT_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/823f9473-112c-4d32-9a92-be5a53d1f811/id-preview-141b0c37--11eaedaa-af7f-4c5f-b6f4-d9f0c80de3a9.lovable.app-1773436025890.png";

interface PageMetaProps {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export const PageMeta = ({ title, description, path, image }: PageMetaProps) => {
  const url = `${SITE}${path}`;
  const img = image ?? DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@noori_diamonds" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  );
};
