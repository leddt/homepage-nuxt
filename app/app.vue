<script setup lang="ts">
useHead({
  title: 'Homepage',
})

const colorMode = useColorMode()
colorMode.preference = 'system'
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />

  <div :class="{ dark: colorMode.value === 'dark' }">
    <div class="z-0 fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-slate-200 via-sky-100 to-purple-100 dark:from-slate-950 dark:via-sky-950 dark:to-purple-950" />
    <div class="z-10 relative">
      <NuxtPage />
    </div>
  </div>
</template>
