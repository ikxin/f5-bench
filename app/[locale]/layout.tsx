import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { locales } from "../../i18n/config";
import ThemeProvider from "../components/theme";
import { FooterLinks } from "../components/footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ThemeProvider>
        <header className="flex h-64 items-center justify-center">
          <img src="/images/logo.svg" className="h-48" />
        </header>
        <main className="flex items-center justify-center px-4">
          {children}
        </main>
        <footer className="flex h-48 items-center justify-center">
          <FooterLinks />
        </footer>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
