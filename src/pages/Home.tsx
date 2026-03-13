import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { ArrowRight, Star, ShieldCheck, Award, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SEO } from "@/src/components/SEO";
import { supabase } from "@/src/lib/supabase";
import { products as mockProducts } from "../data/products";

interface Product {
  id: string;
  name_vi: string;
  name_zh: string;
  slug_vi: string;
  slug_zh: string;
  price: string;
  image_url: string;
}

interface Post {
  id: string;
  title_vi: string;
  title_zh: string;
  excerpt_vi: string;
  excerpt_zh: string;
  image_url: string;
  created_at: string;
  slug_vi: string;
  slug_zh: string;
}

export function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const currentLang = i18n.language.startsWith("zh") ? "zh" : "vi";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .limit(9); // Fetch more for carousel

        if (error) throw error;
        if (data) setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        // Fallback to mock data
        setProducts(
          mockProducts.map((p) => ({
            id: p.id,
            name_vi: p.name.vi,
            name_zh: p.name.zh,
            slug_vi: p.id + "-vi",
            slug_zh: p.id + "-zh",
            price: p.price,
            image_url: p.image,
          })),
        );
      } finally {
        setLoading(false);
      }
    }

    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        if (data) setPosts(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        // Fallback to mock data
        setPosts([
          {
            id: "1",
            title_vi: "Cách chưng yến đường phèn đúng cách",
            title_zh: "如何正确炖燕窝",
            excerpt_vi:
              "Hướng dẫn chi tiết cách chưng yến giữ trọn dưỡng chất...",
            excerpt_zh: "详细指导如何炖燕窝以保留全部营养...",
            image_url:
              "https://images.unsplash.com/photo-1626120033076-2f44f77019be?auto=format&fit=crop&q=80&w=800",
            created_at: new Date().toISOString(),
            slug_vi: "cach-chung-yen",
            slug_zh: "如何正确炖燕窝",
          },
          {
            id: "2",
            title_vi: "Phân biệt yến thật và yến giả",
            title_zh: "辨别真假燕窝",
            excerpt_vi:
              "Những mẹo đơn giản để nhận biết yến sào nguyên chất...",
            excerpt_zh: "辨别纯正燕窝的简单技巧...",
            image_url:
              "https://images.unsplash.com/photo-1590005354167-6da97870c91d?auto=format&fit=crop&q=80&w=800",
            created_at: new Date().toISOString(),
            slug_vi: "phan-biet-yen-that-gia",
            slug_zh: "辨别真假燕窝",
          },
          {
            id: "3",
            title_vi: "Lợi ích của yến sào với trẻ em",
            title_zh: "燕窝对儿童的好处",
            excerpt_vi: "Tại sao nên bổ sung yến sào vào thực đơn của bé?",
            excerpt_zh: "为什么要在宝宝的菜单中加入燕窝？",
            image_url:
              "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
            created_at: new Date().toISOString(),
            slug_vi: "loi-ich-yen-sao-tre-em",
            slug_zh: "燕窝对儿童的好处",
          },
        ]);
      } finally {
        setPostsLoading(false);
      }
    }

    fetchProducts();
    fetchPosts();
  }, []);

  // Carousel timer
  useEffect(() => {
    if (products.length <= 3) return;

    const timer = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % (products.length - 2));
    }, 5000);

    return () => clearInterval(timer);
  }, [products.length]);

  const visibleProducts =
    products.length > 3
      ? products.slice(currentProductIndex, currentProductIndex + 3)
      : products;

  return (
    <div className="pt-20">
      <SEO
        title={t("hero.title")}
        description={t("hero.subtitle")}
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Yến Sào Thịnh Vượng (YSTV)",
          url: window.location.origin,
          logo: "https://picsum.photos/seed/logo/200/200",
        }}
      />

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/banner-bat-yen-chung-ystv.webp"
            className="w-full h-full object-cover brightness-50"
            alt="Yến Sào Thịnh Vượng - Premium Bird's Nest"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1 border border-gold text-gold text-xs uppercase tracking-[0.3em] mb-6">
              Premium Quality
            </span>
            <h1 className="text-6xl md:text-8xl text-white font-serif leading-tight mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-white/80 font-light mb-10 max-w-lg">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to={`/${currentLang}/products`}
                className="px-8 py-4 bg-maroon text-white font-bold rounded-sm flex items-center gap-2 hover:bg-maroon-light transition-all shadow-xl"
              >
                {t("hero.cta")} <ArrowRight size={18} />
              </Link>
              <Link
                to={`/${currentLang}/contact`}
                className="px-8 py-4 border border-white text-white font-bold rounded-sm hover:bg-white/10 transition-all"
              >
                {t("hero.b2b")}
              </Link>
            </div>
          </motion.div>
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
                Chất Lượng Thượng Hạng
              </h3>
              <p className="text-slate-500 font-light">
                Tuyển chọn từ những tổ yến già nhất, hàm lượng dinh dưỡng cao
                nhất.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">
                Kiểm Định Nghiêm Ngặt
              </h3>
              <p className="text-slate-500 font-light">
                Đạt tiêu chuẩn ISO và HACCP, đảm bảo an toàn vệ sinh thực phẩm.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                <Award size={32} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">
                Thương Hiệu Uy Tín
              </h3>
              <p className="text-slate-500 font-light">
                Hơn 10 năm kinh nghiệm xuất khẩu sang thị trường Trung Quốc và
                quốc tế.
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
              <h2 className="text-4xl md:text-5xl font-serif mt-2">
                {t("products.title")}
              </h2>
            </div>
            <Link
              to={`/${currentLang}/products`}
              className="hidden md:flex items-center gap-2 text-maroon font-bold border-b-2 border-maroon pb-1"
            >
              {t("products.viewDetail")} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-3 flex justify-center py-12">
                <Loader2 className="animate-spin text-gold" size={48} />
              </div>
            ) : (
              visibleProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/${currentLang}/products/${currentLang === "vi" ? product.slug_vi || product.id : product.slug_zh || product.id}`,
                    )
                  }
                >
                  <div className="relative aspect-square overflow-hidden mb-6">
                    <img
                      src={product.image_url}
                      alt={
                        currentLang === "vi" ? product.name_vi : product.name_zh
                      }
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-6 py-2 bg-white text-maroon font-bold text-sm uppercase tracking-widest">
                        Quick View
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-maroon transition-colors">
                    {currentLang === "vi" ? product.name_vi : product.name_zh}
                  </h3>
                  <p className="text-gold font-bold">{product.price}</p>
                </motion.div>
              ))
            )}
          </div>
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
              <h2 className="text-4xl md:text-5xl font-serif mt-2">
                {t("posts.title")}
              </h2>
            </div>
            <Link
              to={`/${currentLang}/blog`}
              className="hidden md:flex items-center gap-2 text-maroon font-bold border-b-2 border-maroon pb-1"
            >
              {t("posts.readMore")} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {postsLoading ? (
              <div className="col-span-3 flex justify-center py-12">
                <Loader2 className="animate-spin text-gold" size={48} />
              </div>
            ) : (
              posts.map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ y: -5 }}
                  className="bg-white group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
                  onClick={() =>
                    navigate(
                      `/${currentLang}/blog/${currentLang === "vi" ? post.slug_vi || post.id : post.slug_zh || post.id}`,
                    )
                  }
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={currentLang === "vi" ? post.title_vi : post.title_zh}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 block">
                      {new Date(post.created_at).toLocaleDateString(
                        currentLang === "vi" ? "vi-VN" : "zh-CN",
                      )}
                    </span>
                    <h3 className="text-lg font-serif font-bold mb-3 group-hover:text-maroon transition-colors line-clamp-2">
                      {currentLang === "vi" ? post.title_vi : post.title_zh}
                    </h3>
                    <p className="text-slate-500 text-sm font-light line-clamp-3 mb-4">
                      {currentLang === "vi" ? post.excerpt_vi : post.excerpt_zh}
                    </p>
                    <span className="text-xs font-bold text-maroon flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t("posts.readMore")} <ArrowRight size={12} />
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* B2B Section */}
      <section className="py-24 luxury-gradient text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-8">
            Hợp Tác Kinh Doanh B2B
          </h2>
          <p className="text-xl text-white/70 font-light mb-12 max-w-2xl mx-auto">
            Chúng tôi cung cấp giải pháp cung ứng yến sào số lượng lớn cho các
            đối tác nhà hàng, khách sạn và đại lý tại Việt Nam & Trung Quốc.
          </p>
          <Link
            to={`/${currentLang}/contact`}
            className="px-12 py-5 bg-gold text-maroon font-black rounded-sm hover:bg-gold-light transition-all uppercase tracking-widest shadow-2xl inline-block"
          >
            Nhận Báo Giá Đại Lý
          </Link>
        </div>
      </section>
    </div>
  );
}
