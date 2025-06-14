<script setup lang="ts">
const { data: comic, refetch } = useFetchQuery<string, XkcdComic>('/api/xkcd')
const now = useNow({ interval: 5000 })

const comicDate = computed(() => {
  if (!comic.value) return null
  const { year, month, day } = comic.value
  return new Date(Number(year), Number(month) - 1, Number(day)).toISOString()
})

const comicUrl = computed(() => {
  if (!comic.value) return null
  return `https://xkcd.com/${comic.value.num}/`
})

const explainXkcdUrl = computed(() => {
  if (!comic.value) return null
  return `https://explainxkcd.com/${comic.value.num}`
})
</script>

<template>
  <Card class="transition-shadow hover:shadow-lg font-comic">
    <CardHeader class="border-b border-current pb-2 mb-4">
      <div class="flex flex-row items-center justify-between">
        <CardTitle class="flex items-center gap-2">
          <Icon name="mdi:chat" class="w-6 h-6" />
          xkcd
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

      <span v-if="comicDate" class="text-xs opacity-75">
        Posted <ClientOnly fallback="...">{{ formatDaysAgo(now, comicDate) }}</ClientOnly>
      </span>
    </CardHeader>
    <CardContent v-if="comic" class="space-y-4 text-center">
      <div class="flex items-center justify-center gap-2">
        <h4 class="text-3xl">
          {{ comic.title }}
        </h4>
        <a
          v-if="explainXkcdUrl"
          :href="explainXkcdUrl"
          target="_blank"
          title="Explain"
          class="text-muted-foreground hover:text-primary transition-colors"
        >
          <Icon name="mdi:help-circle" class="w-5 h-5" />
        </a>
      </div>
      <a
        v-if="comicUrl"
        :href="comicUrl"
        target="_blank"
        class="inline-block hover:opacity-90 transition-opacity"
      >
        <img :src="comic.img" :alt="comic.title" class="mx-auto dark:invert dark:hue-rotate-180 dark:opacity-80">
      </a>
      <p class="text-muted-foreground max-w-2xl mx-auto">
        {{ comic.alt }}
      </p>
    </CardContent>
  </Card>
</template>
