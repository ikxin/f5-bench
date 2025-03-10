// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2025-02-11",
  css: ["~/assets/css/style.css"],
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "arco-design-nuxt-module",
  ],
});
