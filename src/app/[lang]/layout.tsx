import { Header } from "@/src/components/layout/Header";
import { ContactButtons } from "@/src/components/layout/ContactButtons";
import { getTranslations } from "@/src/i18n/helper";

export async function generateStaticParams() {
  return [{ lang: "vi" }, { lang: "zh" }];
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslations(lang as "vi" | "zh");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="grow">{children}</main>
      <ContactButtons />
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <h2 className="text-2xl font-serif font-bold text-gold mb-6">
              {t("footer.aboutTitle")}
            </h2>
            <p className="text-slate-400 font-light max-w-md">
              {t("footer.aboutDesc")}
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-6">{t("footer.linksTitle")}</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>
                <a href={`/${lang}`} className="hover:text-gold transition-colors">
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a href={`/${lang}/products`} className="hover:text-gold transition-colors">
                  {t("nav.products")}
                </a>
              </li>
              <li>
                <a href={`/${lang}/about`} className="hover:text-gold transition-colors">
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a href={`/${lang}/blog`} className="hover:text-gold transition-colors">
                  {t("nav.blog")}
                </a>
              </li>
              <li>
                <a href={`/${lang}/contact`} className="hover:text-gold transition-colors">
                  {t("nav.b2b")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6">{t("footer.contactTitle")}</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>Hotline: 0973 080 694</li>
              <li>Email: info@yensaothinhvuong.com</li>
              <li>{t("contact.info.address")}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-xs">
          {t("footer.rights")}
        </div>
      </footer>
    </div>
  );
}
export const dynamicParams = false;
