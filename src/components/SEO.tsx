import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  schema?: object;
  image?: string; // Thêm prop image để tùy biến nếu cần
}

export function SEO({ title, description, schema, image }: SEOProps) {
  const siteUrl = "https://yensaothinhvuong.com"; // Thay bằng domain thực tế của bạn
  const defaultImage = `${siteUrl}/baner-set-qua-thinh-vuong.webp`;
  const seoImage = image ? `${siteUrl}${image}` : defaultImage;

  return (
    <Helmet>
      {/* Meta Tags cơ bản */}
      <title>{title} | Yến Sào Thịnh Vượng</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook / Zalo */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content={`${title} | Yến Sào Thịnh Vượng`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={seoImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | Yến Sào Thịnh Vượng`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seoImage} />

      {/* Structured Data (Schema) */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
