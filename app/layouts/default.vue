<script setup lang="ts">
const currentYear = DateTime.now().year;
const copyrightYears = currentYear === siteConfig.site.startedYear
  ? String(siteConfig.site.startedYear)
  : `${siteConfig.site.startedYear}–${currentYear}`;
</script>

<template>
  <ElContainer class="dvh-100 overflow-hidden">
    <ElHeader class="flex flex-row justify-between h-15! border-b border-b-black-300">
      <h1 class="flex flex-row gap-1 items-center justify-center">
        <NuxtImg :src="siteConfig.images.logo" loading="lazy" width="40" height="40" />
        <span class="text-md font-500">{{siteConfig.site.title}}</span>
      </h1>
    </ElHeader>
    <ElContainer>
      <ElAside>aside</ElAside>
      <ElMain class="overflow-y-auto">
        <slot />
      </ElMain>
    </ElContainer>
    <ElFooter class="flex h-15! items-center justify-between border-t border-t-black-300">
      <nav
        aria-label="외부 링크"
        class="flex items-center gap-1"
      >
        <a
          v-for="siteLink in siteConfig.links"
          :key="siteLink.link"
          :aria-label="siteLink.label"
          :href="siteLink.link"
          class="flex size-12 items-center justify-center rounded-full p-2 text-black-700 transition-colors hover:text-blue-600"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Icon
            :name="siteLink.icon"
            size="24"
          />
        </a>
      </nav>
      <div class="flex items-center gap-1 text-sm text-black-600">
        <Icon name="mdi:copyright" />
        <a
          :href="siteConfig.site.url"
          class="hover:text-black-900"
          rel="noopener noreferrer"
          target="_blank"
        >
          {{ copyrightYears }} {{ siteConfig.site.title }}
        </a>
      </div>
    </ElFooter>
  </ElContainer>
</template>

<style scoped>

</style>
