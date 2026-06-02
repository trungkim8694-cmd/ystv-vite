import { MetadataRoute } from "next";
import { products } from "@/src/data/products";
import { blogPosts } from "@/src/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://yensaothinhvuong.com";
  const languages = ["vi", "zh"];
  const routes = ["", "/products", "/blog", "/about", "/contact"];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Static routes
  languages.forEach((lang) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${siteUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    });
  });

  // Products routes
  products.forEach((product) => {
    languages.forEach((lang) => {
      const slug = product.slug[lang as "vi" | "zh"] || product.id;
      sitemapEntries.push({
        url: `${siteUrl}/${lang}/products/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  });

  // Blog posts routes
  blogPosts.forEach((post) => {
    languages.forEach((lang) => {
      const slug = post.slug[lang as "vi" | "zh"] || post.id;
      sitemapEntries.push({
        url: `${siteUrl}/${lang}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    });
  });

  return sitemapEntries;
}
export const dynamic = "force-static";
