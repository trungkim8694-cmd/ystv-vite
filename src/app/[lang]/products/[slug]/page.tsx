import React from "react";
import Link from "next/link";
import { ChevronLeft, Filter, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { products } from "@/src/data/products";
import { getTranslations } from "@/src/i18n/helper";
import { generateProductSchema } from "@/src/utils/schemaHelper";
import { ProductActions } from "@/src/components/ProductActions";

export async function generateStaticParams() {
  const paths: Array<{ lang: string; slug: string }> = [];
  products.forEach((product) => {
    // VI
    paths.push({ lang: "vi", slug: product.slug.vi });
    paths.push({ lang: "zh", slug: product.slug.vi });
    // ZH
    paths.push({ lang: "vi", slug: product.slug.zh });
    paths.push({ lang: "zh", slug: product.slug.zh });
    // ID
    paths.push({ lang: "vi", slug: product.id });
    paths.push({ lang: "zh", slug: product.id });
  });
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const currentLang = lang === "zh" ? "zh" : "vi";

  const product = products.find(
    (p) =>
      p.id === slug ||
      p.slug.vi === slug ||
      p.slug.zh === slug
  );

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm | YSTV",
    };
  }

  return {
    title: `${product.name[currentLang]} | Yến Sào Thịnh Vượng`,
    description: product.description[currentLang].substring(0, 160),
    openGraph: {
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const currentLang = lang === "zh" ? "zh" : "vi";
  const t = getTranslations(currentLang);

  const product = products.find(
    (p) =>
      p.id === slug ||
      p.slug.vi === slug ||
      p.slug.zh === slug
  );

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">
          {currentLang === "vi" ? "Không tìm thấy sản phẩm" : "找不到产品"}
        </h2>
        <Link href={`/${currentLang}/products`} className="text-gold hover:underline">
          {currentLang === "vi" ? "Quay lại danh sách" : "返回列表"}
        </Link>
      </div>
    );
  }

  // Generate schema structured data for Google
  const schema = generateProductSchema(
    {
      id: product.id,
      name: product.name[currentLang],
      description: product.description[currentLang],
      image: product.image,
      price: product.rawPrice,
    },
    currentLang
  );

  return (
    <div className="pt-24 pb-20">
      {/* Structured SEO data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <Link
          href={`/${currentLang}/products`}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-gold transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {currentLang === "vi" ? "Quay lại danh sách" : "返回列表"}
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-2xl border border-slate-100">
            <Image
              src={product.image}
              alt={product.name[currentLang]}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-gold text-slate-900 text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-full shadow-lg">
                {product.category[currentLang]}
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              {product.name[currentLang]}
            </h1>

            <div className="text-3xl font-bold text-gold mb-8">{product.price}</div>

            <div className="prose prose-slate max-w-none mb-10">
              <div className="markdown-body text-slate-600 text-lg leading-relaxed mb-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {product.description[currentLang]}
                </ReactMarkdown>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                    <Filter className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">
                      {t("products.weight")}
                    </div>
                    <div className="text-slate-900 font-bold">
                      {product.weight?.[currentLang] ||
                        (currentLang === "vi" ? "Đang cập nhật" : "正在更新")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">
                      {t("products.ingredients")}
                    </div>
                    <div className="text-slate-900 font-bold">
                      {product.ingredients?.[currentLang] ||
                        (currentLang === "vi" ? "Đang cập nhật" : "正在更新")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4 mb-8">
                {[
                  currentLang === "vi"
                    ? "Cam kết yến sào nguyên chất 100%"
                    : "承诺100%纯天然燕窝",
                  currentLang === "vi"
                    ? "Không chất bảo quản, không tẩy trắng"
                    : "无防腐剂，无漂白剂",
                  currentLang === "vi"
                    ? "Đảm bảo an toàn thực phẩm"
                    : "齐全的食品安全证书",
                  currentLang === "vi" ? "Giao hàng nhanh toàn quốc" : "全国快速送货",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Buy/Contact buttons */}
            <ProductActions product={product} lang={currentLang} />
          </div>
        </div>
      </div>
    </div>
  );
}
export const dynamicParams = false;
export const dynamic = "error";
