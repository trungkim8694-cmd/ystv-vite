"use client";

import React, { use } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";

interface ContactClientProps {
  params: Promise<{ lang: string }>;
}

export function ContactClient({ params: paramsPromise }: ContactClientProps) {
  const params = use(paramsPromise);
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/banner-nha-xuong-ystv.webp"
            alt="Contact Hero"
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-50/80 to-slate-50"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-maroon mb-4"
          >
            {t("contact.title")}
          </motion.h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 mt-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100 text-center"
        >
          <h2 className="text-3xl font-serif font-bold text-maroon border-b border-gold/30 pb-4 mb-10 inline-block">
            {t("contact.info.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full bg-maroon/5 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-white transition-all duration-300 shrink-0">
                <MapPin size={32} />
              </div>
              <div>
                <p className="text-lg font-medium text-slate-800">
                  {t("contact.info.address")}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full bg-maroon/5 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-white transition-all duration-300 shrink-0">
                <Phone size={32} />
              </div>
              <div>
                <p className="text-lg font-medium text-slate-800">
                  {t("contact.info.phone")}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-full bg-maroon/5 flex items-center justify-center text-maroon group-hover:bg-maroon group-hover:text-white transition-all duration-300 shrink-0">
                <Mail size={32} />
              </div>
              <div>
                <p className="text-lg font-medium text-slate-800">
                  {t("contact.info.email")}
                </p>
              </div>
            </div>
          </div>

          {/* Social Contact Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <a
              href="https://zalo.me/0973080694"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-100"
            >
              <MessageCircle size={32} />
              <div className="text-center">
                <span className="block font-bold text-lg">Zalo</span>
                <span className="text-xs opacity-80">0973 080 694</span>
              </div>
            </a>
            <a
              href="https://wa.me/84973080694"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-green-700 transition-all hover:scale-105 shadow-lg shadow-green-100"
            >
              <MessageCircle size={32} />
              <div className="text-center">
                <span className="block font-bold text-lg">WhatsApp</span>
                <span className="text-xs opacity-80">+84 973 080 694</span>
              </div>
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText("0973080694");
                alert(
                  "WeChat ID: 0973080694 đã được sao chép vào bộ nhớ tạm. Vui lòng dán vào WeChat để kết bạn.",
                );
              }}
              className="bg-[#07C160] text-white p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-[#06ae56] transition-all hover:scale-105 shadow-lg shadow-green-100"
            >
              <MessageCircle size={32} />
              <div className="text-center">
                <span className="block font-bold text-lg">WeChat</span>
                <span className="text-xs opacity-80">0973080694</span>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
