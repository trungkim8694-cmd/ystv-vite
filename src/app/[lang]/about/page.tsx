import { getTranslations } from "@/src/i18n/helper";
import { AboutClient } from "@/src/components/AboutClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslations(lang as "vi" | "zh");
  return {
    title: `${t("about.hero.title")} | Yến Sào Thịnh Vượng`,
    description: t("about.hero.subtitle"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return <AboutClient params={params} />;
}
export const dynamicParams = false;
export const dynamic = "error";
