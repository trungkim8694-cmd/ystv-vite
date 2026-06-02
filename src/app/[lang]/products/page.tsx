import { getTranslations } from "@/src/i18n/helper";
import { products } from "@/src/data/products";
import { ProductsClient } from "@/src/components/ProductsClient";
import { generateItemListSchema } from "@/src/utils/schemaHelper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslations(lang as "vi" | "zh");
  return {
    title: `${t("nav.products")} | Yến Sào Thịnh Vượng`,
    description: lang === "vi"
      ? "Khám phá danh mục sản phẩm yến sào thượng hạng, tuyển chọn khắt khe."
      : "探索顶级燕窝系列，严格挑选。",
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = lang === "zh" ? "zh" : "vi";

  // Form schema for SEO
  const mappedProductsForSchema = products.map((p) => ({
    id: p.id,
    name: p.name[currentLang],
    description: p.description[currentLang],
    image: p.image,
    price: p.rawPrice,
  }));

  const schema = generateItemListSchema(mappedProductsForSchema, currentLang);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ProductsClient products={products} lang={currentLang} />
    </>
  );
}
