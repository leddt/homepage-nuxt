<script setup lang="ts">
useHead({
  title: 'Homepage',
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator />

  <div class="bg-slate-200 min-h-screen">
    <NuxtPage />
  </div>
</template>
