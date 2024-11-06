<script setup lang="ts">
const feeds = [
  useFeed('hn', 'Hacker News', 'mdi:fire', 'text-orange-500'),
  useFeed('sd', 'Slashdot', 'mdi:slash-forward', 'text-green-500'),
]
</script>

<template>
  <div class="container mx-auto p-4 max-w-7xl">
    <div class="grid md:grid-cols-2 gap-4 lg:gap-8">
      <Feed v-for="(feed, index) in feeds" :key="index" :feed />
    </div>
  </div>
</template>
