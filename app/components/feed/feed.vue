<script setup lang="ts">
const props = defineProps<{
  feed: Feed
}>()

const { title, icon, color, items, updatedAt, refetch } = props.feed
const now = useNow({ interval: 5000 })

const sortByDate = ref(false)
const sortedItems = computed(() => {
  if (!items.value) return []
  if (!sortByDate.value) return items.value
  return [...items.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})
</script>

<template>
  <Card class="transition-shadow hover:shadow-lg">
    <CardHeader :class="color" class="sticky -top-5 bg-white/60 dark:bg-gray-950/60 backdrop-blur z-10 rounded-t-lg border-b border-current pb-2 mb-4">
      <div class="flex flex-row items-center justify-between">
        <CardTitle class="flex items-center gap-2">
          <Icon :name="icon" class="w-6 h-6" />
          {{ title }}
        </CardTitle>
        <Button
          variant="ghost"
          size="icon"
          class="group"
          @click="refetch"
        >
          <Icon name="mdi:refresh" class="w-5 h-5 transition-transform group-active:rotate-180 group-hover:rotate-45" />
        </Button>
      </div>
      <div class="flex gap-2 items-end justify-between text-sm">
        <span class="text-xs opacity-75">
          Last updated {{ formatTimeAgo(now, updatedAt) }}
        </span>
        <div v-if="feed.sortable" class="flex gap-1 mr-2 items-center text-xs whitespace-nowrap">
          <span>sort by</span>
          <button
            class="transition-opacity"
            :class="sortByDate ? 'opacity-50 cursor-pointer hover:underline' : ''"
            :disabled="!sortByDate"
            @click="sortByDate = false"
          >
            feed order
          </button>
          <span class="opacity-50">|</span>
          <button
            class="transition-opacity"
            :class="!sortByDate ? 'opacity-50 cursor-pointer hover:underline' : ''"
            :disabled="sortByDate"
            @click="sortByDate = true"
          >
            date
          </button>
        </div>
      </div>
    </CardHeader>
    <CardContent class="overflow-y-auto">
      <TransitionGroup
        v-if="items"
        tag="ul"
        class="-mx-4 mt-px"
        name="list"
      >
        <FeedItem v-for="item in sortedItems" :key="item.link" :item />
      </TransitionGroup>
    </CardContent>
  </Card>
</template>

<style scoped lang="postcss">
.list-move,
.list-enter-active,
.list-leave-active {
  transition-property: transform, opacity;
  transition-duration: 0.5s;
}

.list-enter-from,
.list-leave-to {
  @apply opacity-0 scale-0;
}

.list-leave-active {
  @apply absolute;
}
</style>
