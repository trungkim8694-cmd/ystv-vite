import { getTranslations } from "@/src/i18n/helper";
import { blogPosts } from "@/src/data/blog";
import { BlogClient } from "@/src/components/BlogClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslations(lang as "vi" | "zh");
  return {
    title: lang === "vi" ? "Cẩm Nang Yến Sào | YSTV" : "燕窝手册 | YSTV",
    description: lang === "vi"
      ? "Kiến thức, kinh nghiệm và bí quyết sử dụng yến sào tốt nhất cho sức khỏe."
      : "关于燕窝的最佳健康知识、经验和使用秘诀。",
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = lang === "zh" ? "zh" : "vi";

  return <BlogClient blogPosts={blogPosts} lang={currentLang} />;
}
export const dynamicParams = false;
