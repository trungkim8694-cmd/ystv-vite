import { resources } from "./resources";

export function getTranslations(lang: "vi" | "zh") {
  const dictionary = resources[lang]?.translation;
  return (key: string) => {
    const value = key.split(".").reduce((obj, prop) => obj?.[prop], dictionary as any);
    return typeof value === "string" ? value : key;
  };
}
