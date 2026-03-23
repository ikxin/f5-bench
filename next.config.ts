import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  // AI-friendly browser error logging (Next.js 16.2+)
  logging: {
    browserToTerminal: "error", // Forward browser errors to terminal
  },
};

export default withNextIntl(nextConfig);
