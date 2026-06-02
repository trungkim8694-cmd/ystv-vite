"use client";

import { useState } from "react";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/src/data/blog";

interface BlogClientProps {
  blogPosts: BlogPost[];
  lang: "vi" | "zh";
}

export function BlogClient({ blogPosts, lang }: BlogClientProps) {
  const language = lang;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const title = language === "vi" ? post.title.vi : post.title.zh;
    const excerpt = language === "vi" ? post.excerpt.vi : post.excerpt.zh;
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const t = {
    vi: {
      title: "Cẩm Nang Yến Sào",
      subtitle: "Kiến thức, kinh nghiệm và bí quyết sử dụng yến sào tốt nhất cho sức khỏe.",
      searchPlaceholder: "Tìm kiếm bài viết...",
      readMore: "Đọc thêm",
      noResults: "Không tìm thấy bài viết nào.",
      categories: "Danh mục",
      recentPosts: "Bài viết mới nhất",
      subscribeTitle: "Đăng ký nhận bản tin để cập nhật những kiến thức mới nhất về sức khỏe và yến sào.",
      subscribeButton: "Đăng ký",
    },
    zh: {
      title: "燕窝手册",
      subtitle: "关于燕窝的最佳健康知识、经验和使用秘诀。",
      searchPlaceholder: "搜索文章...",
      readMore: "阅读更多",
      noResults: "未找到文章。",
      categories: "分类",
      recentPosts: "最新文章",
      subscribeTitle: "订阅我们的时事通讯，获取有关健康和燕窝的最新知识。",
      subscribeButton: "订阅",
    },
  }[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/banner-set-qua-tang-ystv.webp"
            alt="Background"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-6 font-bold">{t.title}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Search Mobile */}
              <div className="mb-8 lg:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-slate-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-12">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <article key={post.id} className="group">
                      <Link
                        href={`/${language}/blog/${language === "vi" ? post.slug.vi : post.slug.zh}`}
                        className="relative h-75 md:h-100 block overflow-hidden rounded-2xl mb-6"
                      >
                        <Image
                          src={post.image}
                          alt={language === "vi" ? post.title.vi : post.title.zh}
                          fill
                          sizes="(max-width: 768px) 100vw, 66vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
                          {post.category[language]}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          Kim Bird&apos;s Nest
                        </div>
                      </div>
                      <Link href={`/${language}/blog/${language === "vi" ? post.slug.vi : post.slug.zh}`}>
                        <h2 className="text-2xl md:text-3xl font-serif mb-4 group-hover:text-amber-600 transition-colors font-bold text-slate-950">
                          {language === "vi" ? post.title.vi : post.title.zh}
                        </h2>
                      </Link>
                      <p className="text-slate-600 mb-6 line-clamp-3">
                        {language === "vi" ? post.excerpt.vi : post.excerpt.zh}
                      </p>
                      <Link
                        href={`/${language}/blog/${language === "vi" ? post.slug.vi : post.slug.zh}`}
                        className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:gap-3 transition-all"
                      >
                        {t.readMore} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-20 bg-slate-50 rounded-2xl">
                    <p className="text-slate-500">{t.noResults}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-1/3 space-y-12">
              {/* Search Desktop */}
              <div className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-slate-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Recent Posts */}
              <div>
                <h3 className="text-xl font-serif mb-6 pb-2 border-b-2 border-amber-500 inline-block font-bold text-slate-900">
                  {t.recentPosts}
                </h3>
                <div className="space-y-6">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link
                      key={post.id}
                      href={`/${language}/blog/${language === "vi" ? post.slug.vi : post.slug.zh}`}
                      className="flex gap-4 group"
                    >
                      <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden relative">
                        <Image
                          src={post.image}
                          alt={language === "vi" ? post.title.vi : post.title.zh}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors mb-1 leading-snug">
                          {language === "vi" ? post.title.vi : post.title.zh}
                        </h4>
                        <span className="text-xs text-slate-500">{post.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter or CTA */}
              <div className="bg-slate-900 text-white p-8 rounded-2xl">
                <h3 className="text-xl font-serif mb-4 font-bold">Kim Bird&apos;s Nest</h3>
                <p className="text-slate-400 text-sm mb-6">{t.subscribeTitle}</p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email..."
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  <button className="w-full py-2 bg-amber-600 hover:bg-amber-700 rounded-lg font-semibold transition-colors">
                    {t.subscribeButton}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
