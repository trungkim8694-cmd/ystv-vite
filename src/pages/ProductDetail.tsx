import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { products as mockProducts } from "../data/products";
import {
  ChevronLeft,
  MessageCircle,
  Phone,
  CheckCircle2,
  ShoppingCart,
  Loader2,
  Filter,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { generateSlug } from "../lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Product {
  id: string;
  slug: { vi: string; zh: string };
  name: { vi: string; zh: string };
  description: { vi: string; zh: string };
  price: string;
  image: string;
  category: { vi: string; zh: string };
  weight?: { vi: string; zh: string };
  ingredients?: { vi: string; zh: string };
}

export function ProductDetail() {
  const { id: slugOrId } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const currentLang = (i18n.language || "vi").startsWith("zh") ? "zh" : "vi";

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);

        // Try fetching by slug (either VI or ZH based on current language)
        const slugColumn = currentLang === "vi" ? "slug_vi" : "slug_zh";
        let { data, error } = await supabase
          .from("products")
          .select("*")
          .eq(slugColumn, slugOrId)
          .maybeSingle();

        // If not found by current language slug, try the other language slug
        if (!data && !error) {
          const otherSlugColumn = currentLang === "vi" ? "slug_zh" : "slug_vi";
          const { data: otherData, error: otherError } = await supabase
            .from("products")
            .select("*")
            .eq(otherSlugColumn, slugOrId)
            .maybeSingle();
          data = otherData;
          error = otherError;
        }

        // If still not found, try by ID
        if (!data && !error) {
          const { data: idData, error: idError } = await supabase
            .from("products")
            .select("*")
            .eq("id", slugOrId)
            .maybeSingle();
          data = idData;
          error = idError;
        }

        if (error) throw error;

        if (data) {
          setProduct({
            id: data.id,
            slug: {
              vi: data.slug_vi || generateSlug(data.name_vi, "vi"),
              zh: data.slug_zh || generateSlug(data.name_zh, "zh"),
            },
            name: { vi: data.name_vi || "", zh: data.name_zh || "" },
            description: {
              vi: data.description_vi || "",
              zh: data.description_zh || "",
            },
            price: (data.price || 0).toLocaleString("vi-VN") + "đ",
            image: data.image_url || "",
            category: { vi: data.category || "", zh: data.category || "" },
            weight: { vi: data.weight_vi || "", zh: data.weight_zh || "" },
            ingredients: {
              vi: data.ingredients_vi || "",
              zh: data.ingredients_zh || "",
            },
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        // Fallback to mock data
        const mockProduct = mockProducts.find(
          (p) =>
            p.id === slugOrId ||
            generateSlug(p.name.vi, "vi") === slugOrId ||
            generateSlug(p.name.zh, "zh") === slugOrId,
        );
        if (mockProduct) {
          setProduct({
            ...mockProduct,
            slug: {
              vi: generateSlug(mockProduct.name.vi, "vi"),
              zh: generateSlug(mockProduct.name.zh, "zh"),
            },
          });
        }
      } finally {
        setLoading(false);
      }
    }

    if (slugOrId) fetchProduct();
  }, [slugOrId, currentLang]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-gold animate-spin mb-4" />
        <p className="text-slate-500 italic">
          {currentLang === "vi"
            ? "Đang tải thông tin sản phẩm..."
            : "正在加载产品信息..."}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4">
          {currentLang === "vi" ? "Không tìm thấy sản phẩm" : "找不到产品"}
        </h2>
        <Link
          to={`/${currentLang}/products`}
          className="text-gold hover:underline"
        >
          {currentLang === "vi" ? "Quay lại danh sách" : "返回列表"}
        </Link>
      </div>
    );
  }

  const handleBuyNow = () => {
    navigate(`/${currentLang}/checkout`, { state: { product } });
  };

  const handleOrderZalo = () => {
    const message = encodeURIComponent(
      `Chào YSTV, tôi muốn tư vấn sản phẩm: ${product.name[currentLang]} (${product.price})`,
    );
    window.open(`https://zalo.me/0973080694?text=${message}`, "_blank");
  };

  const handleOrderWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello YSTV, I'm interested in: ${product.name[currentLang]} (${product.price})`,
    );
    window.open(`https://wa.me/84973080694?text=${message}`, "_blank");
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Link
          to={`/${currentLang}/products`}
          className="inline-flex items-center gap-2 text-slate-500 hover:text-gold transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          {currentLang === "vi" ? "Quay lại danh sách" : "返回列表"}
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
              <img
                src={product.image}
                alt={product.name[currentLang]}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute top-6 left-6">
              <span className="bg-gold text-slate-900 text-xs uppercase tracking-widest font-bold px-4 py-2 rounded-full shadow-lg">
                {product.category[currentLang]}
              </span>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              {product.name[currentLang]}
            </h1>

            <div className="text-3xl font-bold text-gold mb-8">
              {product.price}
            </div>

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

              <div className="mt-8 space-y-4">
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
                  currentLang === "vi"
                    ? "Giao hàng nhanh toàn quốc"
                    : "全国快速送货",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-slate-700"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={handleBuyNow}
                className="bg-gold hover:bg-slate-900 hover:text-white text-slate-900 px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-gold/20 sm:col-span-2"
              >
                <ShoppingCart className="w-5 h-5" />
                {currentLang === "vi"
                  ? "Mua ngay - Giao tận nơi"
                  : "立即购买 - 送货上门"}
              </button>
              <button
                onClick={handleOrderZalo}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-200"
              >
                <MessageCircle className="w-5 h-5" />
                {currentLang === "vi" ? "Tư vấn qua Zalo" : "通过 Zalo 咨询"}
              </button>
              <button
                onClick={handleOrderWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-200"
              >
                <MessageCircle className="w-5 h-5" />
                {currentLang === "vi" ? "WhatsApp / WeChat" : "WhatsApp / 微信"}
              </button>
            </div>

            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">
                    {currentLang === "vi"
                      ? "Hotline hỗ trợ 24/7"
                      : "24/7 热线支持"}
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    0973 080 694
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
