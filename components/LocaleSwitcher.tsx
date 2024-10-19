import { useLocale, useTranslations } from "next-intl";
import { routing, Locale } from "@/i18n/routing";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

const locales: { code: Locale; name: string }[] = [
  { code: "en", name: "English" },
  { code: "zh", name: "繁體中文" },
  // ... other locales
];

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as Locale;

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      label={t("label")}
      locales={locales.map((l) => ({
        ...l,
        name: l.name,
      }))}
    />
  );
}
