export const locales = [
  "zh-CN",
  "zh-TW",
  "en",
  "ja",
  "ko",
  "fr",
  "de",
  "es",
  "pt-BR",
  "ru",
  "ar",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "zh-CN";
