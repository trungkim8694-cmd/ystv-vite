import { getTranslations } from "@/src/i18n/helper";
import { CheckoutClient } from "@/src/components/CheckoutClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getTranslations(lang as "vi" | "zh");
  return {
    title: `${t("nav.home")} - ${t("nav.products")} | Yến Sào Thịnh Vượng`,
    description: lang === "vi" ? "Trang xác nhận đơn hàng" : "确认订单页",
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  return <CheckoutClient params={params} />;
}
export const dynamic = "force-dynamic";
export const dynamicParams = false;
