"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/src/data/products";

interface ProductCarouselProps {
  products: Product[];
  lang: "vi" | "zh";
  viewDetailText: string;
}

export function ProductCarousel({ products, lang, viewDetailText }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (products.length <= 3) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (products.length - 2));
    }, 5000);

    return () => clearInterval(timer);
  }, [products.length]);

  const visibleProducts =
    products.length > 3
      ? products.slice(currentIndex, currentIndex + 3)
      : products;

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <AnimatePresence mode="popLayout">
        {visibleProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden"
          >
            <Link href={`/${lang}/products/${lang === "vi" ? product.slug.vi : product.slug.zh}`}>
              <div className="relative aspect-square overflow-hidden mb-6">
                <Image
                  src={product.image}
                  alt={lang === "vi" ? product.name.vi : product.name.zh}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-6 py-2 bg-white text-maroon font-bold text-sm uppercase tracking-widest">
                    {viewDetailText}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-maroon transition-colors text-slate-900">
                {lang === "vi" ? product.name.vi : product.name.zh}
              </h3>
              <p className="text-gold font-bold">{product.price}</p>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
