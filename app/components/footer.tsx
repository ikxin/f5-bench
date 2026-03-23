"use client";

import { Button, Select } from "@douyinfe/semi-ui";
import {
  IconGithubLogo,
  IconTwitter,
  IconMoon,
  IconSun,
  IconLikeHeart,
  IconGlobe,
} from "@douyinfe/semi-icons";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "../../i18n/config";
import { useTheme } from "./theme";

const localeNames: Record<Locale, string> = {
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  en: "English",
  ja: "日本語",
  ko: "한국어",
  fr: "Français",
  de: "Deutsch",
  es: "Español",
  "pt-BR": "Português (BR)",
  ru: "Русский",
  ar: "العربية",
};

export function FooterLinks() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const switchMode = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const switchLocale = (locale: unknown) => {
    const newPath = pathname.replace(/^\/[^/]+/, `/${locale as Locale}`);
    router.replace(newPath);
  };

  return (
    <div className="flex items-center gap-2 text-xl">
      <Button
        type="tertiary"
        theme="borderless"
        icon={isDark ? <IconMoon size="large" /> : <IconSun size="large" />}
        onClick={switchMode}
        aria-label={isDark ? t("switchToLight") : t("switchToDark")}
      />
      <Select
        value={currentLocale}
        onChange={switchLocale}
        position="top"
        dropdownClassName="semi-light-scrollbar"
        triggerRender={() => (
          <Button
            type="tertiary"
            theme="borderless"
            icon={<IconGlobe size="large" />}
            aria-label="Switch language"
          />
        )}
      >
        {locales.map((locale) => (
          <Select.Option key={locale} value={locale}>
            {localeNames[locale]}
          </Select.Option>
        ))}
      </Select>
      <Button
        type="tertiary"
        theme="borderless"
        icon={<IconGithubLogo size="large" />}
        onClick={() =>
          window.open("https://github.com/ikxin/f5-bench", "_blank")
        }
        aria-label="GitHub"
      />
      <Button
        type="tertiary"
        theme="borderless"
        icon={<IconLikeHeart size="large" />}
        onClick={() => window.open("https://blog.ikxin.com", "_blank")}
        aria-label="Blog"
      />
      <Button
        type="tertiary"
        theme="borderless"
        icon={<IconTwitter size="large" />}
        onClick={() => window.open("https://x.com/helloikxin", "_blank")}
        aria-label="Twitter"
      />
    </div>
  );
}
