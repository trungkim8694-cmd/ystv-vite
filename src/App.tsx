import React, { useEffect, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
  Link,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import "@/src/i18n/config";

import { Header } from "./components/layout/Header";
import { ContactButtons } from "./components/layout/ContactButtons";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Checkout } from "./pages/Checkout";
import { About } from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

// Language Wrapper to handle /vi and /zh
function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const { lang } = useParams();
  const { i18n, t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (lang && (lang === "vi" || lang === "zh")) {
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    }
  }, [lang, i18n]);

  if (!lang || (lang !== "vi" && lang !== "zh")) {
    return <Navigate to="/vi" replace />;
  }

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
                <Link
                  to={`/${lang}`}
                  className="hover:text-gold transition-colors"
                >
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link
                  to={`/${lang}/products`}
                  className="hover:text-gold transition-colors"
                >
                  {t("nav.products")}
                </Link>
              </li>
              <li>
                <Link
                  to={`/${lang}/about`}
                  className="hover:text-gold transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to={`/${lang}/blog`}
                  className="hover:text-gold transition-colors"
                >
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link
                  to={`/${lang}/contact`}
                  className="hover:text-gold transition-colors"
                >
                  {t("nav.b2b")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-6">{t("footer.contactTitle")}</h3>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>Hotline: 0973 080 694</li>
              <li>Email: info@yensaothinhvuong.com</li>
              <li>{t("contact.info.address")}</li>{" "}
              {/* Sử dụng key address đã có sẵn trong contact */}
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

export default function App() {
  // Detect browser language for initial redirect
  const getInitialLang = () => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("zh")) {
      return "zh";
    }
    return "vi";
  };

  const initialLang = getInitialLang();

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-gold animate-spin" />
            </div>
          }
        >
          <Routes>
            <Route
              path="/:lang/*"
              element={
                <LanguageWrapper>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                  </Routes>
                </LanguageWrapper>
              }
            />
            <Route
              path="*"
              element={<Navigate to={`/${initialLang}`} replace />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
