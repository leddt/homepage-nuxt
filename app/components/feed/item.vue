<script setup lang="ts">
import { useStore } from '~/composables/store'

defineProps<{
  item: FeedItem
}>()

defineEmits<{
  open: [target: ItemElement]
}>()

const now = useNow({ interval: 5000 })
const {
  isHighlighted,
  setHighlightedItem,
  isVisited,
  markVisited,
} = useStore()

const openLink = (item: FeedItem) => {
  setHighlightedItem(item, 'link')
  markVisited(item, 'link')
  window.open(item.link, '_blank')
}
</script>

<template>
  <li
    tabindex="0"
    class="group transition-colors sm:hover:bg-muted/50 sm:hover:shadow-inner pl-6 pr-2 py-1 rounded-lg"
    :class="{ 'outline outline-1 focus-visible:outline-2 outline-blue-500': isHighlighted(item) }"
    @keydown.self.enter="openLink(item)"
    @keydown.self.space="openLink(item)"
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
  </li>
</template>
