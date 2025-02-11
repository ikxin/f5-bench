<script setup lang="ts">
useHead({
  title: "F5 Bench - 网站 Fetch 基准测试工具",
  htmlAttrs: {
    lang: "zh-CN",
  },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content:
        "F5 Bench 是一个专门用于网站 Fetch 性能基准测试的工具，帮助开发者评估和优化网站的加载性能，助力提升网站的用户体验和速度，适用于需要精准了解网站性能的开发人员和测试人员。",
    },
    {
      name: "keywords",
      content: "F5-Bench, Fetch, Bench, Benchmark, 基准测试, 网站测试",
    },
  ],
  script: [
    {
      defer: "",
      src: "https://analytics.ikxin.com/script.js",
      "data-website-id": "d44b9f30-2706-4e02-b971-0187a72b093f",
    },
    {
      async: "",
      src: "https://www.googletagmanager.com/gtag/js?id=G-ZYNHJ13WVL",
    },
    {
      key: "google",
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-ZYNHJ13WVL');
      `,
    },
  ],
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
