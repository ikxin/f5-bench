<script lang="ts" setup>
defineOptions({
  name: "DefaultLayout",
});

const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <Body>
    <ALayoutHeader class="h-64 flex justify-center items-center">
      <img src="/images/logo.svg" class="h-48" />
    </ALayoutHeader>
    <ALayoutContent>
      <slot />
    </ALayoutContent>
    <ALayoutFooter class="h-48 flex justify-center items-center">
      <div class="flex gap-2 items-center text-xl">
        <ClientOnly>
          <div class="cursor-pointer" @click="toggleColorMode()">
            <Icon
              :name="$colorMode.value === 'dark' ? 'lucide:moon' : 'lucide:sun'"
            />
          </div>
        </ClientOnly>
        <div class="cursor-pointer">
          <NuxtLink to="https://github.com/ikxin/f5-bench" target="_blank">
            <Icon name="lucide:github" />
          </NuxtLink>
        </div>
        <div class="cursor-pointer">
          <NuxtLink to="https://blog.ikxin.com" target="_blank">
            <Icon name="lucide:heart" />
          </NuxtLink>
        </div>
        <div class="cursor-pointer">
          <NuxtLink to="https://x.com/helloikxin" target="_blank">
            <Icon name="lucide:twitter" />
          </NuxtLink>
        </div>
      </div>
    </ALayoutFooter>
  </Body>
</template>
