import { ArrowRight, Star, ShieldCheck, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "@/src/i18n/helper";
import { products } from "@/src/data/products";
import { blogPosts } from "@/src/data/blog";
import { ProductCarousel } from "@/src/components/ProductCarousel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslations(lang as "vi" | "zh");
  return {
    title: `${t("hero.title")} | Yến Sào Thịnh Vượng`,
    description: t("hero.subtitle"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = lang === "zh" ? "zh" : "vi";
  const t = getTranslations(currentLang);

  // Slice featured items
  const featuredProducts = products.slice(0, 9);
  const featuredPosts = blogPosts.slice(0, 3);

  // Schema LD+JSON data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": currentLang === "zh" ? "盛旺燕窝 (YSTV)" : "Yến Sào Thịnh Vượng (YSTV)",
    "url": `https://yensaothinhvuong.com/${currentLang}`,
    "logo": `https://yensaothinhvuong.com/logo-yen-sao-thinh-vuong.png`,
    "description": t("hero.subtitle"),
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84-973-080-694",
      "contactType": "sales",
      "areaServed": ["VN", "CN"],
      "availableLanguage": ["Vietnamese", "Chinese"]
    }
  };

  return (
    <div className="pt-20">
      {/* Structured SEO Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner-bat-yen-chung-ystv.webp"
            fill
            sizes="100vw"
            priority
            className="object-cover brightness-50"
            alt="Yến Sào Thịnh Vượng - Premium Bird's Nest"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 border border-gold text-gold text-xs uppercase tracking-[0.3em] mb-6">
              Premium Quality
            </span>
            <h1 className="text-4xl md:text-6xl text-white font-serif leading-tight mb-6 font-bold">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-white/80 font-light mb-10 max-w-lg">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${currentLang}/products`}
                className="px-8 py-4 bg-maroon text-white font-bold rounded-sm flex items-center gap-2 hover:bg-maroon-light transition-all shadow-xl"
              >
                {t("hero.cta")} <ArrowRight size={18} />
              </Link>
              <Link
                href={`/${currentLang}/contact`}
                className="px-8 py-4 border border-white text-white font-bold rounded-sm hover:bg-white/10 transition-all"
              >
                {t("hero.b2b")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">
                {t("posts.features.qualityTitle")}
              </h3>
              <p className="text-slate-500 font-light">
                {t("posts.features.qualityDesc")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">
                {t("posts.features.inspectionTitle")}
              </h3>
              <p className="text-slate-500 font-light">
                {t("posts.features.inspectionDesc")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">
                {t("posts.features.brandTitle")}
              </h3>
              <p className="text-slate-500 font-light">
                {t("posts.features.brandDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-gold uppercase tracking-widest text-xs font-bold">
                {t("nav.products")}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-2 font-bold">
                {t("products.title")}
              </h2>
            </div>
            <Link
              href={`/${currentLang}/products`}
              className="hidden md:flex items-center gap-2 text-maroon font-bold border-b-2 border-maroon pb-1"
            >
              {t("products.viewDetail")} <ArrowRight size={16} />
            </Link>
          </div>

          <ProductCarousel
            products={featuredProducts}
            lang={currentLang}
            viewDetailText={t("products.viewDetail")}
          />
        </div>
      </section>

      {/* Featured Posts Preview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-gold uppercase tracking-widest text-xs font-bold">
                Blog & News
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-2 font-bold">
                {t("posts.title")}
              </h2>
            </div>
            <Link
              href={`/${currentLang}/blog`}
              className="hidden md:flex items-center gap-2 text-maroon font-bold border-b-2 border-maroon pb-1"
            >
              {t("posts.readMore")} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden"
              >
                <Link href={`/${currentLang}/blog/${currentLang === "vi" ? post.slug.vi : post.slug.zh}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.image}
                      alt={currentLang === "vi" ? post.title.vi : post.title.zh}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 block">
                      {post.date}
                    </span>
                    <h3 className="text-lg font-serif font-bold mb-3 group-hover:text-maroon transition-colors line-clamp-2 text-slate-900">
                      {currentLang === "vi" ? post.title.vi : post.title.zh}
                    </h3>
                    <p className="text-slate-500 text-sm font-light line-clamp-3 mb-4">
                      {currentLang === "vi" ? post.excerpt.vi : post.excerpt.zh}
                    </p>
                    <span className="text-xs font-bold text-maroon flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t("posts.readMore")} <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B Section */}
      <section className="py-24 luxury-gradient text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 font-bold">
            {t("posts.b2bHome.title")}
          </h2>
          <p className="text-xl text-white/70 font-light mb-12 max-w-2xl mx-auto">
            {t("posts.b2bHome.subtitle")}
          </p>
          <Link
            href={`/${currentLang}/contact`}
            className="px-12 py-5 bg-gold text-maroon font-black rounded-sm hover:bg-gold-light transition-all uppercase tracking-widest shadow-2xl inline-block"
          >
            {t("posts.b2bHome.cta")}
          </Link>
        </div>
      </section>
    </div>
  );
}
