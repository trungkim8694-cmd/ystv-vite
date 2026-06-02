import React from "react";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { blogPosts } from "@/src/data/blog";
import { getTranslations } from "@/src/i18n/helper";

export async function generateStaticParams() {
  const paths: Array<{ lang: string; slug: string }> = [];
  blogPosts.forEach((post) => {
    // VI
    paths.push({ lang: "vi", slug: post.slug.vi });
    paths.push({ lang: "zh", slug: post.slug.vi });
    // ZH
    paths.push({ lang: "vi", slug: post.slug.zh });
    paths.push({ lang: "zh", slug: post.slug.zh });
    // ID
    paths.push({ lang: "vi", slug: post.id });
    paths.push({ lang: "zh", slug: post.id });
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

  const post = blogPosts.find(
    (p) =>
      p.id === slug ||
      p.slug.vi === slug ||
      p.slug.zh === slug
  );

  if (!post) {
    return {
      title: "Không tìm thấy bài viết | YSTV",
    };
  }

  return {
    title: `${post.title[currentLang]} | Yến Sào Thịnh Vượng`,
    description: post.excerpt[currentLang].substring(0, 160),
    openGraph: {
      images: [post.image],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const currentLang = lang === "zh" ? "zh" : "vi";
  const t = getTranslations(currentLang);

  const post = blogPosts.find(
    (p) =>
      p.id === slug ||
      p.slug.vi === slug ||
      p.slug.zh === slug
  );

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-serif mb-4 text-slate-800">
            {currentLang === "vi" ? "Không tìm thấy bài viết" : "未找到文章"}
          </h2>
          <Link
            href={`/${currentLang}/blog`}
            className="text-amber-600 font-semibold flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            {currentLang === "vi" ? "Quay lại cẩm nang" : "返回手册"}
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts (exclude current, take 3)
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <div className="relative h-100 md:h-[60vh] w-full">
        <Image
          src={post.image}
          alt={currentLang === "vi" ? post.title.vi : post.title.zh}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              <span className="inline-block bg-amber-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                {post.category[currentLang]}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight font-bold">
                {currentLang === "vi" ? post.title.vi : post.title.zh}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Kim Bird&apos;s Nest
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <Link
              href={`/${currentLang}/blog`}
              className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentLang === "vi" ? "Quay lại danh sách" : "返回列表"}
            </Link>

            <article className="prose prose-lg max-w-none prose-slate prose-headings:font-serif prose-amber">
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8 italic border-l-4 border-amber-500 pl-6">
                {currentLang === "vi" ? post.excerpt.vi : post.excerpt.zh}
              </p>

              <div className="markdown-body text-slate-700 leading-loose">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {currentLang === "vi" ? post.content.vi : post.content.zh}
                </ReactMarkdown>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-12">
              {/* Related Posts */}
              <div>
                <h3 className="text-xl font-serif mb-6 pb-2 border-b-2 border-amber-500 inline-block font-bold text-slate-900">
                  {currentLang === "vi" ? "Bài viết liên quan" : "相关文章"}
                </h3>
                <div className="space-y-6">
                  {relatedPosts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/${currentLang}/blog/${currentLang === "vi" ? p.slug.vi : p.slug.zh}`}
                      className="flex gap-4 group"
                    >
                      <div className="w-24 h-20 shrink-0 rounded-lg overflow-hidden relative">
                        <Image
                          src={p.image}
                          alt={currentLang === "vi" ? p.title.vi : p.title.zh}
                          fill
                          sizes="96px"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors mb-1 text-sm leading-snug">
                          {currentLang === "vi" ? p.title.vi : p.title.zh}
                        </h4>
                        <span className="text-xs text-slate-500">{p.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100">
                <h3 className="text-xl font-serif text-amber-900 mb-4 font-bold">
                  {currentLang === "vi" ? "Tư vấn miễn phí" : "免费咨询"}
                </h3>
                <p className="text-amber-800/80 text-sm mb-6 leading-relaxed">
                  {currentLang === "vi"
                    ? "Liên hệ ngay với chuyên gia để được tư vấn về cách sử dụng yến sào hiệu quả nhất."
                    : "立即联系专家，获取有关如何最有效使用燕窝的建议。"}
                </p>
                <a
                  href="https://zalo.me/0973080694"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-amber-600 text-white rounded-xl font-semibold hover:bg-amber-700 transition-colors block text-center shadow-md hover:shadow-lg"
                >
                  {currentLang === "vi" ? "Liên hệ Zalo" : "联系 Zalo"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const dynamicParams = false;
export const dynamic = "error";
