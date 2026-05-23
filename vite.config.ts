import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import rsc from "@vitejs/plugin-rsc";
import { nitro } from "nitro/vite";
import vinext from "vinext";
import { defineConfig } from "vite";

const target =
  process.env.VINEXT_TARGET ??
  (process.argv.includes("deploy") ? "cloudflare" : undefined) ??
  (process.env.VERCEL ? "vercel" : undefined);

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 2500,
    rolldownOptions: {
      checks: {
        eval: false,
      },
    },
  },
  optimizeDeps: {
    exclude: ["next-intl", "use-intl"],
  },
  plugins: [
    tailwindcss(),
    vinext(target === "cloudflare" ? { rsc: false } : undefined),
    ...(target === "cloudflare"
      ? [
          rsc({
            entries: {
              rsc: "virtual:vinext-rsc-entry",
              ssr: "virtual:vinext-app-ssr-entry",
              client: "virtual:vinext-app-browser-entry",
            },
          }),
          cloudflare({
            viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
          }),
        ]
      : []),
    ...(target === "vercel" ? [nitro()] : []),
  ],
  resolve: {
    dedupe: ["next-intl", "use-intl"],
  },
});
