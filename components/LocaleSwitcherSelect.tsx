"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { useParams } from "next/navigation";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  defaultValue: string;
  label: string;
  locales: { code: Locale; name: string }[];
};

export default function LocaleSwitcherSelect({
  defaultValue,
  label,
  locales,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const pathname = usePathname();
  const params = useParams();

  const handleLocaleChange = (nextLocale: Locale) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  };

  return (
    <div className="relative inline-block">
      <Select
        defaultValue={defaultValue}
        onValueChange={handleLocaleChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-[180px] bg-background">
          <Globe className="mr-2 h-4 w-4" />
          <SelectValue placeholder={label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {locales.map((locale) => (
              <SelectItem key={locale.code} value={locale.code}>
                {locale.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
