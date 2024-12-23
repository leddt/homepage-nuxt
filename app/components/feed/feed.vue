<script setup lang="ts">
const props = defineProps<{
  feed: Feed
}>()

const { title, icon, color, items, updatedAt, refetch } = props.feed
const now = useNow({ interval: 5000 })
</script>

<template>
  <Card class="transition-shadow hover:shadow-lg">
    <CardHeader :class="color" class="sticky -top-5 bg-white/60 backdrop-blur z-10 rounded-t-lg border-b border-current pb-2 mb-4">
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
      <span class="text-xs opacity-75">
        Last updated {{ formatTimeAgo(now, updatedAt) }}
      </span>
    </CardHeader>
    <CardContent class="overflow-y-auto">
      <TransitionGroup
        v-if="items"
        tag="ul"
        class="-mx-4 mt-px"
        name="list"
      >
        <FeedItem v-for="item in items" :key="item.link" :item />
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
