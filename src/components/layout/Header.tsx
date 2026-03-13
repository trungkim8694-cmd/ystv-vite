import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function Header() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    const path = location.pathname.split("/").slice(2).join("/");
    navigate(`/${lng}/${path}`);
  };

  const navItems = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.products"), path: "/products" },
    { name: t("nav.blog"), path: "/blog" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  const currentLang = (i18n.language || "vi").startsWith("zh") ? "zh" : "vi";

  const isActive = (path: string) => {
    const fullPath = `/${currentLang}${path === "/" ? "" : path}`;
    if (path === "/") {
      return (
        location.pathname === `/${currentLang}` ||
        location.pathname === `/${currentLang}/`
      );
    }
    return location.pathname.startsWith(fullPath);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to={`/${currentLang}`} className="flex items-center gap-2">
          <div className="w-12 h-12 relative flex items-center justify-center">
            <img
              src="/logo-yen-sao-thinh-vuong.png"
              alt="Logo Yến Sào Thịnh Vượng"
              className="w-full h-full object-contain"
            />
          </div>
          <span
            className={cn(
              "font-serif text-xl font-bold tracking-tight",
              isScrolled ? "text-maroon" : "text-maroon",
            )}
          >
            YẾN SÀO <span className="gold-text">THỊNH VƯỢNG</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={`/${currentLang}${item.path === "/" ? "" : item.path}`}
              className={cn(
                "text-sm font-medium uppercase tracking-widest transition-colors hover:text-gold",
                isActive(item.path) ? "text-gold" : "text-slate-600",
              )}
            >
              {item.name}
            </Link>
          ))}

          <div className="flex items-center gap-2 ml-4 border-l pl-4 border-slate-200">
            <button
              onClick={() => changeLanguage("vi")}
              className={cn(
                "text-xs font-bold",
                currentLang === "vi" ? "text-maroon" : "text-slate-400",
              )}
            >
              VN
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => changeLanguage("zh")}
              className={cn(
                "text-xs font-bold",
                currentLang === "zh" ? "text-maroon" : "text-slate-400",
              )}
            >
              ZH
            </button>
          </div>
        </nav>

        {/* Mobile Toggle & Lang */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
            <button
              onClick={() => changeLanguage("vi")}
              className={cn(
                "text-[10px] font-bold transition-colors",
                currentLang === "vi" ? "text-maroon" : "text-slate-400",
              )}
            >
              VN
            </button>
            <span className="text-slate-300 text-[10px]">|</span>
            <button
              onClick={() => changeLanguage("zh")}
              className={cn(
                "text-[10px] font-bold transition-colors",
                currentLang === "zh" ? "text-maroon" : "text-slate-400",
              )}
            >
              ZH
            </button>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="w-6 h-6 text-maroon" />
            ) : (
              <Menu className="w-6 h-6 text-maroon" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300 border-t border-slate-100">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={`/${currentLang}${item.path === "/" ? "" : item.path}`}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "text-lg font-serif border-b border-slate-50 pb-2 transition-colors",
                isActive(item.path)
                  ? "text-gold"
                  : "text-slate-800 hover:text-gold",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
