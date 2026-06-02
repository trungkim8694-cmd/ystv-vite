import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = "https://yensaothinhvuong.com";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/*/checkout"], // Disallow checkout pages to prevent crawler indexing
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
export const dynamic = "force-static";
