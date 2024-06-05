// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/i18n",
    "arco-design-nuxt-module",
  ],
  routeRules: {
    "/": { prerender: true },
  },
});
