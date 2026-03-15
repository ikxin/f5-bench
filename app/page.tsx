"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultLocale } from "../i18n/config";

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    const browserLang = navigator.language;
    const supportedLocales = [
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
    ];
    const matched =
      supportedLocales.find((l) => browserLang.startsWith(l)) ??
      supportedLocales.find((l) => browserLang.startsWith(l.split("-")[0])) ??
      defaultLocale;
    router.replace(`/${matched}`);
  }, [router]);
  return null;
}
