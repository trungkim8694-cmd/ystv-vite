"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/src/data/products";

interface ProductsClientProps {
  products: Product[];
  lang: "vi" | "zh";
}

export function ProductsClient({ products, lang }: ProductsClientProps) {
  const { t } = useTranslation();
  const currentLang = lang;
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    { id: "All", vi: "Tất cả", zh: "全部" },
    { id: "Yến Tinh Chế", vi: "Yến Tinh Chế", zh: "精制燕窝" },
    { id: "Yến Thô", vi: "Yến Thô", zh: "毛燕" },
    { id: "Yến Chưng Sẵn", vi: "Yến Chưng Sẵn", zh: "即食燕窝" },
    { id: "Set Quà Tặng", vi: "Set Quà Tặng", zh: "礼盒套装" },
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category.vi === selectedCategory);

  return (
    <div className="pt-24 pb-20">
      {/* Header Section */}
      <section
        className="bg-slate-900 py-20 px-6 text-center relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: "url('/baner-set-qua-thinh-vuong.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-6 uppercase tracking-wider">
            {t("nav.products")}
          </h1>

          <div className="w-24 h-1 bg-gold mx-auto mb-8 relative z-10"></div>

          <p className="text-white text-lg font-light leading-relaxed relative z-10">
            {currentLang === "vi"
              ? "Khám phá danh mục sản phẩm yến sào thượng hạng, được tuyển chọn khắt khe từ hệ thống nhà yến trải dài khắp Việt Nam."
              : "探索顶级燕窝系列，从遍布越南的燕屋系统中严格挑选。"}
          </p>
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-slate-900">
            <Filter className="w-5 h-5 text-gold" />
            <span className="font-serif font-bold text-lg uppercase tracking-wider">
              {currentLang === "vi" ? "Lọc theo danh mục" : "按类别筛选"}
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? "bg-gold text-slate-900 shadow-lg shadow-gold/20"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {currentLang === "vi" ? cat.vi : cat.zh}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 min-h-100">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100"
              >
                <Link
                  href={`/${currentLang}/products/${product.slug?.[currentLang] || product.id}`}
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name[currentLang]}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gold/90 text-slate-900 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                        {product.category[currentLang]}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 group-hover:text-gold transition-colors">
                      {product.name[currentLang]}
                    </h3>
                    <div className="flex items-center flex-wrap gap-2 mb-4">
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase font-bold tracking-tighter">
                        {product.weight?.[currentLang] || "100g"}
                      </span>
                      {product.ingredients?.[currentLang] && (
                        <>
                          <span className="text-slate-300 text-[10px]">|</span>
                          <span className="text-[10px] text-slate-400 italic line-clamp-1">
                            {product.ingredients[currentLang]}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm font-light leading-relaxed mb-6 line-clamp-2">
                      {product.description[currentLang]}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <span className="text-gold font-bold text-lg">
                        {product.price}
                      </span>
                      <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-widest hover:text-gold transition-colors group/btn">
                        {t("products.viewDetail")}
                        <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 italic">
              {currentLang === "vi"
                ? "Không tìm thấy sản phẩm nào trong danh mục này."
                : "该类别下未找到产品。"}
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-slate-900 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold rounded-full blur-[120px]"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              {currentLang === "vi" ? "Bạn cần tư vấn thêm?" : "需要更多咨询？"}
            </h2>
            <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
              {currentLang === "vi"
                ? "Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn lựa chọn sản phẩm phù hợp nhất với nhu cầu sức khỏe."
                : "我们的专家团队随时准备为您提供支持，根据您的健康需求选择最合适的产品。"}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://zalo.me/0973080694"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold hover:bg-white text-slate-900 px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center gap-2"
              >
                <ChevronRight className="w-5 h-5 rotate-90" />
                {t("hero.cta")}
              </a>
              <Link
                href={`/${currentLang}/contact`}
                className="border border-white/20 hover:border-gold text-white px-8 py-4 rounded-full font-bold transition-all duration-300"
              >
                {t("contact.quote")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
