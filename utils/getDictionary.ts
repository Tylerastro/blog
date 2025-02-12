import "server-only";

const dictionaries = {
  "en-US": () => import("@/messages/en.json").then((module) => module.default),
  "zh-TW": () => import("@/messages/zh.json").then((module) => module.default),
};

interface Blog {
  title: string;
}

export interface Dictionary {
  Blog: Blog;
}

export const getDictionary = async (
  locale: "en-US" | "zh-TW"
): Promise<Dictionary> => (await dictionaries[locale]()) as Dictionary;
