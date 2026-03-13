import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, User, ArrowRight, Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/src/components/SEO";
import { blogPosts as mockPosts } from "../data/blog";
import { useTranslation } from "react-i18next";
import { supabase } from "@/src/lib/supabase";
import { generateSlug } from "@/src/lib/utils";

interface Post {
  id: string;
  title_vi: string;
  title_zh: string;
  excerpt_vi: string;
  excerpt_zh: string;
  content_vi: string;
  content_zh: string;
  image_url: string;
  created_at: string;
  slug_vi: string;
  slug_zh: string;
  category?: string; // Optional if not in DB yet
}

export default function Blog() {
  const { i18n } = useTranslation();
  const language = (i18n.language === "zh" ? "zh" : "vi") as "vi" | "zh";
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          // Fallback to mock data if DB is empty
          setPosts(
            mockPosts.map((p) => ({
              id: p.id,
              title_vi: p.title.vi,
              title_zh: p.title.zh,
              excerpt_vi: p.excerpt.vi,
              excerpt_zh: p.excerpt.zh,
              content_vi: p.content.vi,
              content_zh: p.content.zh,
              image_url: p.image,
              created_at: new Date().toISOString(),
              slug_vi: generateSlug(p.title.vi, "vi"),
              slug_zh: generateSlug(p.title.zh, "zh"),
              category: p.category[language],
            })),
          );
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        // Fallback to mock data
        setPosts(
          mockPosts.map((p) => ({
            id: p.id,
            title_vi: p.title.vi,
            title_zh: p.title.zh,
            excerpt_vi: p.excerpt.vi,
            excerpt_zh: p.excerpt.zh,
            content_vi: p.content.vi,
            content_zh: p.content.zh,
            image_url: p.image,
            created_at: new Date().toISOString(),
            slug_vi: generateSlug(p.title.vi, "vi"),
            slug_zh: generateSlug(p.title.zh, "zh"),
            category: p.category[language],
          })),
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [language]);

  const filteredPosts = posts.filter((post) => {
    const title = language === "vi" ? post.title_vi : post.title_zh;
    const excerpt = language === "vi" ? post.excerpt_vi : post.excerpt_zh;
    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const t = {
    vi: {
      title: "Cẩm Nang Yến Sào",
      subtitle:
        "Kiến thức, kinh nghiệm và bí quyết sử dụng yến sào tốt nhất cho sức khỏe.",
      searchPlaceholder: "Tìm kiếm bài viết...",
      readMore: "Đọc thêm",
      noResults: "Không tìm thấy bài viết nào.",
      categories: "Danh mục",
      recentPosts: "Bài viết mới nhất",
    },
    zh: {
      title: "燕窝手册",
      subtitle: "关于燕窝的最佳健康知识、经验和使用秘诀。",
      searchPlaceholder: "搜索文章...",
      readMore: "阅读更多",
      noResults: "未找到文章。",
      categories: "分类",
      recentPosts: "最新文章",
    },
  }[language];

  return (
    <div className="min-h-screen bg-white">
      <SEO title={t.title} description={t.subtitle} />

      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/banner-set-qua-tang-ystv.webp"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif mb-6"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            {t.subtitle}
          </motion.p>
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
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-12">
                {loading ? (
                  <div className="flex justify-center py-20">
                    <Loader2
                      className="animate-spin text-amber-600"
                      size={48}
                    />
                  </div>
                ) : filteredPosts.length > 0 ? (
                  filteredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group"
                    >
                      <Link
                        to={`/${language}/blog/${language === "vi" ? post.slug_vi || generateSlug(post.title_vi, "vi") : post.slug_zh || generateSlug(post.title_zh, "zh")}`}
                        className="block overflow-hidden rounded-2xl mb-6"
                      >
                        <img
                          src={post.image_url}
                          alt={
                            language === "vi" ? post.title_vi : post.title_zh
                          }
                          className="w-full h-75 md:h-100 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </Link>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-medium">
                          {post.category ||
                            (language === "vi" ? "Kiến thức" : "知识")}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.created_at).toLocaleDateString(
                            language === "vi" ? "vi-VN" : "zh-CN",
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          Kim Bird's Nest
                        </div>
                      </div>
                      <Link
                        to={`/${language}/blog/${language === "vi" ? post.slug_vi || generateSlug(post.title_vi, "vi") : post.slug_zh || generateSlug(post.title_zh, "zh")}`}
                      >
                        <h2 className="text-2xl md:text-3xl font-serif mb-4 group-hover:text-amber-600 transition-colors">
                          {language === "vi" ? post.title_vi : post.title_zh}
                        </h2>
                      </Link>
                      <p className="text-slate-600 mb-6 line-clamp-3">
                        {language === "vi" ? post.excerpt_vi : post.excerpt_zh}
                      </p>
                      <Link
                        to={`/${language}/blog/${language === "vi" ? post.slug_vi || generateSlug(post.title_vi, "vi") : post.slug_zh || generateSlug(post.title_zh, "zh")}`}
                        className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:gap-3 transition-all"
                      >
                        {t.readMore} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.article>
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
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Recent Posts */}
              <div>
                <h3 className="text-xl font-serif mb-6 pb-2 border-b-2 border-amber-500 inline-block">
                  {t.recentPosts}
                </h3>
                <div className="space-y-6">
                  {posts.slice(0, 3).map((post) => (
                    <Link
                      key={post.id}
                      to={`/${language}/blog/${language === "vi" ? post.slug_vi || generateSlug(post.title_vi, "vi") : post.slug_zh || generateSlug(post.title_zh, "zh")}`}
                      className="flex gap-4 group"
                    >
                      <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={post.image_url}
                          alt={
                            language === "vi" ? post.title_vi : post.title_zh
                          }
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 line-clamp-2 group-hover:text-amber-600 transition-colors mb-1">
                          {language === "vi" ? post.title_vi : post.title_zh}
                        </h4>
                        <span className="text-xs text-slate-500">
                          {new Date(post.created_at).toLocaleDateString(
                            language === "vi" ? "vi-VN" : "zh-CN",
                          )}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter or CTA */}
              <div className="bg-slate-900 text-white p-8 rounded-2xl">
                <h3 className="text-xl font-serif mb-4">Kim Bird's Nest</h3>
                <p className="text-slate-400 text-sm mb-6">
                  {language === "vi"
                    ? "Đăng ký nhận bản tin để cập nhật những kiến thức mới nhất về sức khỏe và yến sào."
                    : "订阅我们的时事通讯，获取有关健康和燕窝的最新知识。"}
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email..."
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  <button className="w-full py-2 bg-amber-600 hover:bg-amber-700 rounded-lg font-semibold transition-colors">
                    {language === "vi" ? "Đăng ký" : "订阅"}
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
