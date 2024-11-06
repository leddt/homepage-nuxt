<script setup lang="ts">
import { useStore } from '~/composables/store'

const props = defineProps<{
  item: FeedItem
}>()

defineEmits<{
  open: [target: ItemElement]
}>()

const now = useNow({ interval: 5000 })
const store = useStore()

const isHighlighted = computed(() => store.highlightedItem?.link === props.item.link)
const highlightedElement = computed(() => isHighlighted.value ? store.highlightedElement : null)

const openLink = (item: FeedItem) => {
  store.setHighlightedItem(item, 'link')
  window.open(item.link, '_blank')
}
</script>

<template>
  <li
    tabindex="0"
    class="group transition-colors sm:hover:bg-muted/50 sm:hover:shadow-inner px-2 py-1 rounded-lg"
    :class="{ 'outline outline-1 focus:outline-2 outline-blue-500': isHighlighted }"
    @keydown.self.enter="openLink(item)"
    @keydown.self.space="openLink(item)"
  >
    <NuxtLink
      tabindex="-1"
      :href="item.link"
      target="_blank"
      class="text-lg hover:underline block"
      :class="{ underline: highlightedElement === 'link' }"
      @mouseup="store.setHighlightedItem(item, 'link')"
    >
      {{ item.title }}
    </NuxtLink>
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
        :class="{ 'underline sm:opacity-100': highlightedElement === 'comments' }"
        @mouseup="store.setHighlightedItem(item, 'comments')"
      >
        <Icon name="mdi:message" class="w-4 h-4 mr-1" />
        <span>Comments</span>
      </NuxtLink>
    </div>
  </li>
</template>
