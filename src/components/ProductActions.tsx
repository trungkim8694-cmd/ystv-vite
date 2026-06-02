"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ShoppingCart, MessageCircle, Phone } from "lucide-react";
import { Product } from "@/src/data/products";

interface ProductActionsProps {
  product: Product;
  lang: "vi" | "zh";
}

export function ProductActions({ product, lang }: ProductActionsProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const currentLang = lang;

  const handleBuyNow = () => {
    router.push(`/${currentLang}/checkout?product=${product.slug[currentLang] || product.id}`);
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
    <div className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={handleBuyNow}
          className="bg-gold hover:bg-slate-900 hover:text-white text-slate-900 px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-gold/20 sm:col-span-2 cursor-pointer"
        >
          <ShoppingCart className="w-5 h-5" />
          {currentLang === "vi"
            ? "Mua ngay - Giao tận nơi"
            : "立即购买 - 送货上门"}
        </button>
        <button
          onClick={handleOrderZalo}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-200 cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" />
          {currentLang === "vi" ? "Tư vấn qua Zalo" : "通过 Zalo 咨询"}
        </button>
        <button
          onClick={handleOrderWhatsApp}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-200 cursor-pointer"
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
              {currentLang === "vi" ? "Hotline hỗ trợ 24/7" : "24/7 热线支持"}
            </div>
            <div className="text-xl font-bold text-slate-900">0973 080 694</div>
          </div>
        </div>
      </div>
    </div>
  );
}
