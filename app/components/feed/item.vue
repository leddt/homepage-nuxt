<script setup lang="ts">
const props = defineProps<{
  item: FeedItem
}>()

defineEmits<{
  open: [target: ItemElement]
}>()

const now = useNow({ interval: 5000 })
const {
  isHighlighted,
  setHighlightedItem,
  clearHighlightedItem,
  isVisited,
  markVisited,
} = useStore()

const isItemHighlighted = computed(() => isHighlighted(props.item))
const { opacity: highlightOpacity, isDone: isHighlightDone } = usePageReturnFadeout(isItemHighlighted)
whenever(isHighlightDone, clearHighlightedItem)

const openLink = (item: FeedItem) => {
  setHighlightedItem(item, 'link')
  markVisited(item, 'link')
  window.open(item.link, '_blank')
}

const timeColorStyle = computed(() => {
  const itemDate = new Date(props.item.date)
  const hoursAgo = (now.value.getTime() - itemDate.getTime()) / (1000 * 60 * 60)

  // HSL interpolation with multiple stages over 24 hours
  // green -> blue -> gray

  const progress = Math.min(hoursAgo / 24, 1)

  // green to blue in the first half
  const hue = progress < 0.5
    ? 142 + (progress * 150) // 142 to 217
    : 217

  // Saturation transitions in the second half
  const saturation = progress > 0.5
    ? 76 - ((progress - 0.5) * 2 * 56) // Fade from 76% to 20% in second half
    : 76

  // Brighter when very recent
  const lightness = hoursAgo < 0.5
    ? 36 + (hoursAgo * 50)
    : 36

  const alpha = 0.8

  return {
    color: `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`,
  }
})
</script>

<template>
  <li
    tabindex="0"
    class="group transition-colors sm:hover:bg-muted/50 sm:hover:shadow-inner rounded-lg"
    @keydown.self.enter="openLink(item)"
    @keydown.self.space="openLink(item)"
  >
    <div
      class="pl-6 pr-2 py-1 rounded-lg"
      :style="{ transition: 'outline-color 0.1s', outline: isHighlighted(item) ? `1px solid rgba(59, 130, 246, ${highlightOpacity})` : '0px solid rgba(59, 130, 246, 1)' }"
    >
      <div class="relative">
        <ClientOnly>
          <Icon
            v-if="isVisited(item, 'link')"
            name="mdi:check"
            class="absolute w-4 h-4 -left-5 top-2 text-slate-400"
          />
        </ClientOnly>
        <NuxtLink
          tabindex="-1"
          :href="item.link"
          target="_blank"
          class="text-lg hover:underline block"
          :class="{
            underline: isHighlighted(item, 'link'),
          }"
          @mouseup="setHighlightedItem(item, 'link')"
          @click="markVisited(item, 'link')"
        >
          {{ item.title }}
        </NuxtLink>
      </div>
      <div class="flex items-center justify-between gap-2 mt-1 text-sm text-muted-foreground">
        <span class="flex items-center">
          <Icon
            name="mdi:calendar"
            class="w-4 h-4 mr-1"
            :style="timeColorStyle"
          />
          <span :title="item.date">{{ formatDate(now, item.date, true) }}</span>
        </span>
        <NuxtLink
          v-if="item.comments"
          :href="item.comments"
          target="_blank"
          class="flex items-center hover:underline hover:text-primary sm:opacity-0 group-hover:opacity-100 group-focus:opacity-100 focus:opacity-100 transition-opacity"
          :class="{ 'underline sm:opacity-100': isHighlighted(item, 'comments') }"
          @mouseup="setHighlightedItem(item, 'comments')"
          @click="markVisited(item, 'comments')"
        >
          <ClientOnly>
            <Icon
              v-if="isVisited(item, 'comments')"
              name="mdi:check"
              class="w-4 h-4 text-slate-400"
            />
          </ClientOnly>
          <Icon name="mdi:message" class="w-4 h-4 mr-1" />
          <span>Comments</span>
        </NuxtLink>
      </div>
    </div>
  </li>
</template>
