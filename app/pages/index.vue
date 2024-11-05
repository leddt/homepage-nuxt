<script setup lang="ts">
import { formatDistance, formatDistanceStrict } from 'date-fns'

const hn = useFetchQuery('/api/feed/hn')
const sd = useFetchQuery('/api/feed/sd')

const feeds = computed(() => [
  {
    title: 'Hacker News',
    icon: 'mdi:fire',
    color: 'text-orange-500',
    items: hn.data.value,
    refetch: hn.refetch,
    updatedAt: hn.dataUpdatedAt.value,
  },
  {
    title: 'Slashdot',
    icon: 'mdi:slash-forward',
    color: 'text-green-500',
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
  <div class="container mx-auto p-4 max-w-7xl">
    <div class="grid md:grid-cols-2 gap-4 lg:gap-8">
      <Card v-for="(feed, index) in feeds" :key="index" class="transition-all hover:shadow-lg">
        <CardHeader :class="feed.color" class="sticky top-0 bg-white z-10 rounded-lg">
          <div class="flex flex-row items-center justify-between">
            <CardTitle class="flex items-center gap-2">
              <Icon :name="feed.icon" class="w-6 h-6" />
              {{ feed.title }}
            </CardTitle>
            <Button variant="ghost" size="icon" @click="feed.refetch">
              <Icon name="mdi:refresh" class="w-5 h-5" />
            </Button>
          </div>
          <ClientOnly>
            <span class="text-sm text-muted-foreground">
              Last updated {{ formatDate(now, feed.updatedAt) }}
            </span>
          </ClientOnly>
        </CardHeader>
        <CardContent class="overflow-y-auto">
          <ul v-if="feed.items" class="-mx-2">
            <li
              v-for="item in feed.items"
              :key="item.link"
              class="transition-all hover:bg-muted/50 px-2 py-1 rounded-lg"
            >
              <NuxtLink :href="item.link" target="_blank" class="font-medium hover:underline block">
                {{ item.title }}
              </NuxtLink>
              <div class="flex items-center justify-between mt-1 text-sm text-muted-foreground">
                <span class="flex items-center">
                  <Icon name="mdi:calendar" class="w-4 h-4 mr-1" />
                  <span :title="item.date">{{ formatDate(now, item.date, true) }}</span>
                </span>
                <NuxtLink
                  v-if="item.comments"
                  :href="item.comments"
                  target="_blank"
                  class="flex items-center hover:underline hover:text-primary"
                >
                  <Icon name="mdi:message" class="w-4 h-4 mr-1" />
                  <span>Comments</span>
                </NuxtLink>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
