import { getTranslations } from "@/src/i18n/helper";
import { ContactClient } from "@/src/components/ContactClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslations(lang as "vi" | "zh");
  return {
    title: `${t("contact.title")} | Yến Sào Thịnh Vượng`,
    description: t("contact.subtitle"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return <ContactClient params={params} />;
}
export const dynamicParams = false;
export const dynamic = "error";
