// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["assets/css/style.css"],
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "arco-design-nuxt-module",
  ],
  routeRules: {
    "/": { prerender: true },
  },
});
