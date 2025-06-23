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

// Fullscreen state
const isFullscreen = ref(false)

// Handle escape key to close fullscreen
const { escape } = useMagicKeys()
whenever(escape!, () => {
  if (isFullscreen.value) {
    isFullscreen.value = false
  }
})

// Prevent body scroll when fullscreen is open
watch(isFullscreen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = ''
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
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
        <div class="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            class="group max-xl:hidden"
            title="Fullscreen"
            @click="isFullscreen = true"
          >
            <Icon name="mdi:fullscreen" class="w-5 h-5 transition-transform group-hover:scale-110" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            class="group"
            @click="refetch"
          >
            <Icon name="mdi:refresh" class="w-5 h-5 transition-transform group-active:rotate-180 group-hover:rotate-45" />
          </Button>
        </div>
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

    <!-- Fullscreen Overlay -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isFullscreen && comic"
          class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 font-comic"
          @click="isFullscreen = false"
        >
          <div
            class="bg-card border rounded-lg shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto"
            @click.stop
          >
            <div class="p-6 border-b border-border">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <Icon name="mdi:chat" class="w-6 h-6" />
                  <h2 class="text-2xl font-semibold">
                    xkcd #{{ comic.num }}
                  </h2>
                </div>
                <div class="flex gap-2">
                  <a
                    v-if="explainXkcdUrl"
                    :href="explainXkcdUrl"
                    target="_blank"
                    title="Explain"
                    class="text-muted-foreground hover:text-primary transition-colors p-2"
                  >
                    <Icon name="mdi:help-circle" class="w-5 h-5" />
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Close fullscreen"
                    @click="isFullscreen = false"
                  >
                    <Icon name="mdi:close" class="w-5 h-5" />
                  </Button>
                </div>
              </div>
              <p v-if="comicDate" class="text-sm text-muted-foreground mt-1">
                Posted {{ formatDaysAgo(now, comicDate) }}
              </p>
            </div>

            <div class="p-6 space-y-6 text-center">
              <h3 class="text-4xl">
                {{ comic.title }}
              </h3>

              <div class="flex justify-center">
                <a
                  v-if="comicUrl"
                  :href="comicUrl"
                  target="_blank"
                  class="inline-block hover:opacity-90 transition-opacity"
                >
                  <img
                    :src="comic.img"
                    :alt="comic.title"
                    class="max-w-full max-h-[60vh] object-contain dark:invert dark:hue-rotate-180 dark:opacity-80"
                  >
                </a>
              </div>

              <p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {{ comic.alt }}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </Card>
</template>
