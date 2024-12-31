import "server-only";

const dictionaries = {
  "en-US": () => import("@/lib/en.json").then((module) => module.default),
  "zh-TW": () => import("@/lib/zh.json").then((module) => module.default),
};

export const getDictionary = async (locale: "en-US" | "zh-TW") =>
  dictionaries[locale]();
