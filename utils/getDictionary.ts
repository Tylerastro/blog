import "server-only";

export interface Dictionary {}

const dictionaries = {
  en: () => import("@/messages/en.json").then((module) => module.default),
  zh: () => import("@/messages/zh.json").then((module) => module.default),
  jp: () => import("@/messages/jp.json").then((module) => module.default),
};

export const getDictionary = async (
  locale: "en" | "zh" | "jp"
): Promise<Dictionary> => {
  // Handle case where locale might not match our dictionary keys
  const selectedLocale = locale in dictionaries ? locale : "en";
  return dictionaries[selectedLocale]();
};
