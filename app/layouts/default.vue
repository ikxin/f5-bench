<script lang="ts" setup>
const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <ALayoutHeader class="h-64 flex justify-center items-center">
    <img src="/images/logo.svg" class="h-48"></img>
  </ALayoutHeader>
  <ALayoutContent>
    <slot></slot>
  </ALayoutContent>
  <ALayoutFooter class="h-48 flex justify-center items-center">
    <div class="flex gap-2 items-center text-xl">
      <ClientOnly>
        <div @click="toggleColorMode()" class="cursor-pointer">
          <Icon
            :name="$colorMode.value === 'dark' ? 'tabler:moon' : 'tabler:sun'"
          />
        </div>
      </ClientOnly>
      <div class="cursor-pointer">
        <NuxtLink to="https://github.com/ikxin/f5-bench" target="_blank">
          <Icon name="tabler:brand-github" />
        </NuxtLink>
      </div>
      <div class="cursor-pointer">
        <NuxtLink to="https://x.com/wyikxin" target="_blank">
          <Icon name="tabler:brand-twitter" />
        </NuxtLink>
      </div>
      <div class="cursor-pointer">
        <ATooltip>
          <Icon name="tabler:brand-wechat" />
          <template #content>
            <img src="/images/wechat.png" width="150"></img>
          </template>
        </ATooltip>
      </div>
    </div>
  </ALayoutFooter>
</template>
