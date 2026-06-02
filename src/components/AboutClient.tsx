"use client";

import React, { use } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { Leaf, Heart, Award } from "lucide-react";
import Image from "next/image";

interface AboutClientProps {
  params: Promise<{ lang: string }>;
}

export function AboutClient({ params: paramsPromise }: AboutClientProps) {
  const params = use(paramsPromise);
  const { t } = useTranslation();

  const values = [
    {
      icon: <Award className="w-8 h-8 text-gold" />,
      title: t("about.values.quality.title"),
      desc: t("about.values.quality.desc"),
    },
    {
      icon: <Leaf className="w-8 h-8 text-gold" />,
      title: t("about.values.tradition.title"),
      desc: t("about.values.tradition.desc"),
    },
    {
      icon: <Heart className="w-8 h-8 text-gold" />,
      title: t("about.values.trust.title"),
      desc: t("about.values.trust.desc"),
    },
  ];

  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner-nha-xuong-ystv.webp"
            alt="About Hero"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-stone-900/40" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
          >
            {t("about.hero.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-stone-100 font-light"
          >
            {t("about.hero.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-8">
              {t("about.story.title")}
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed font-light">
              {t("about.story.content")}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-2xl"
          >
            <Image
              src="/yen-sao-thinh-vuong-nha-yen.webp"
              alt="Our Story"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-gold p-8 rounded-2xl hidden md:block">
              <p className="text-white font-serif text-2xl italic">
                &quot;Thịnh Vượng & Sức Khỏe&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-stone-900 py-24 px-6 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">
              {t("about.mission.title")}
            </h2>
            <p className="text-xl text-stone-300 leading-relaxed font-light italic">
              &quot;{t("about.mission.content")}&quot;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900">
              {t("about.values.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-10 rounded-3xl shadow-sm border border-stone-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-stone-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-stone-600 font-light">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Badge */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto bg-gold/10 rounded-[40px] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-serif font-bold text-stone-900 mb-6">
              Cam Kết Chất Lượng 100% Nguyên Chất
            </h2>
            <p className="text-stone-700 text-lg font-light">
              Mỗi tổ yến từ Yến Sào Thịnh Vượng đều trải qua quy trình kiểm soát
              nghiêm ngặt, đảm bảo không pha trộn, không tẩy trắng, giữ trọn vẹn
              tinh túy từ thiên nhiên.
            </p>
          </div>
          <div className="shrink-0">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-gold flex items-center justify-center p-4 text-center">
              <span className="text-gold font-serif font-bold text-sm md:text-lg uppercase tracking-widest">
                Premium Quality
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
