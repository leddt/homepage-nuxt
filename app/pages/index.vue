<script setup lang="ts">
import { formatDistance, formatDistanceStrict } from 'date-fns'

const hn = useFetchQuery('/api/feed/hn')
const sd = useFetchQuery('/api/feed/sd')

const feeds = computed(() => [
  {
    title: 'Hacker News',
    items: hn.data.value,
    refetch: hn.refetch,
    updatedAt: hn.dataUpdatedAt.value,
  },
  {
    title: 'Slashdot',
    items: sd.data.value,
    refetch: sd.refetch,
    updatedAt: sd.dataUpdatedAt.value,
  },
])

const now = ref(new Date())

onMounted(() => {
  const timer = setInterval(() => {
    now.value = new Date()
  }, 5000)

  onUnmounted(() => clearInterval(timer))
})

/** format date string to relative date */
function formatDate(now: Date, date: string | number, strict = false) {
  const d = new Date(date)
  if (d > now) return 'just now'

  if (strict) {
    return formatDistanceStrict(d, now, { addSuffix: true })
  }

  return formatDistance(d, now, { addSuffix: true })
}
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="grid md:grid-cols-2 gap-8">
      <UiCard v-for="(feed, index) in feeds" :key="index">
        <UiCardHeader>
          <div class="flex flex-row items-center justify-between">
            <UiCardTitle>{{ feed.title }}</UiCardTitle>
            <UiButton variant="ghost" size="icon" @click="feed.refetch">
              <Icon name="mdi:refresh" class="w-5 h-5" />
            </UiButton>
          </div>
          <ClientOnly>
            <span class="text-sm text-muted-foreground">{{ formatDate(now, feed.updatedAt) }}</span>
          </ClientOnly>
        </UiCardHeader>
        <UiCardContent>
          <ul v-if="feed.items">
            <li v-for="(item, itemIndex) in feed.items" :key="item.link">
              <NuxtLink :href="item.link" target="_blank" class="font-medium hover:underline">
                {{ item.title }}
              </NuxtLink>
              <div class="flex items-center mt-1 text-sm text-muted-foreground">
                <Icon name="mdi:calendar" class="w-4 h-4 mr-1" />
                <span :title="item.date">{{ formatDate(now, item.date, true) }}</span>
                <UiSeparator v-if="item.comments" class="mx-2 h-4" orientation="vertical" />
                <NuxtLink
                  v-if="item.comments"
                  :href="item.comments"
                  target="_blank"
                  class="flex items-center hover:underline"
                >
                  <Icon name="mdi:message" class="w-4 h-4 mr-1" />
                  <span>Comments</span>
                </NuxtLink>
              </div>
              <UiSeparator v-if="itemIndex < feed.items.length - 1" class="my-2" />
            </li>
          </ul>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>
