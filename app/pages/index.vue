<script setup lang="ts">
const feeds = [
  useFeed('hn', 'Hacker News', 'ion:logo-hackernews', 'text-orange-500'),
  useFeed('sd', 'Slashdot', 'simple-icons:slashdot', 'text-emerald-500'),
]

const { clearHighlightedItem } = useStore()

function onEscape() {
  (document.activeElement as HTMLElement)?.blur()
  clearHighlightedItem()
}

const { escape } = useMagicKeys()
whenever(escape!, onEscape)
</script>

<template>
  <div class="container mx-auto p-4 max-w-7xl">
    <div class="grid md:grid-cols-2 gap-4 lg:gap-8">
      <Feed v-for="(feed, index) in feeds" :key="index" :feed />
    </div>
  </div>
</template>
