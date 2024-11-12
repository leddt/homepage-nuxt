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
          <Icon name="mdi:calendar" class="w-4 h-4 mr-1" />
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
