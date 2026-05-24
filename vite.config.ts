import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import rsc from "@vitejs/plugin-rsc";
import vinext from "vinext";
import { defineConfig } from "vite";

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
    vinext({ rsc: false }),
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
  ],
  resolve: {
    dedupe: ["next-intl", "use-intl"],
  },
});
