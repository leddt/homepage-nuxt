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
  <div class="container mx-auto p-4 max-w-[1600px]">
    <div class="grid xl:grid-cols-[1fr,300px] 2xl:grid-cols-[1fr,400px] gap-4">
      <div class="grid md:grid-cols-2 gap-4">
        <Feed v-for="(feed, index) in feeds" :key="index" :feed />
      </div>
      <div>
        <XkcdComic class="xl:sticky top-4" />
      </div>
    </div>
  </div>
</template>
