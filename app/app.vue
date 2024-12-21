<script setup lang="ts">
useHead({
  title: 'Homepage',
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />

  <div class="z-0 fixed top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-slate-200 via-sky-100 to-purple-100" />
  <div class="z-10 relative">
    <NuxtPage />
  </div>
</template>
