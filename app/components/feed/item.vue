<script setup lang="ts">
const props = defineProps<{
  item: FeedItem
}>()

defineEmits<{
  open: [target: ItemElement]
}>()

const {
  isHighlighted,
  setHighlightedItem,
  clearHighlightedItem,
  isVisited,
  markVisited,
} = useStore()

const isItemHighlighted = computed(() => isHighlighted(props.item))
const isLegendary = computed(() => isLegendaryItem(props.item))
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
    :class="{ dark: isLegendary }"
    @keydown.self.enter="openLink(item)"
    @keydown.self.space="openLink(item)"
  >
    <div
      class="relative pl-6 pr-2 py-1 rounded-lg"
      :class="{ 'bg-background': isLegendary }"
      :style="{ transition: 'outline-color 0.1s', outline: isHighlighted(item) ? `1px solid rgba(59, 130, 246, ${highlightOpacity})` : '0px solid rgba(59, 130, 246, 1)' }"
    >
      <span v-if="isLegendary" class="legendary-aura" aria-hidden="true" />
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
            'underline': isHighlighted(item, 'link'),
            'legendary-title': isLegendary,
          }"
          @mouseup="setHighlightedItem(item, 'link')"
          @click="markVisited(item, 'link')"
        >
          {{ item.title }}
        </NuxtLink>
      </div>
      <div class="flex items-center justify-between gap-2 mt-1 text-sm text-muted-foreground">
        <span class="flex items-center flex-wrap gap-2">
          <FeedItemAge :item="item" />
          <template v-if="item.score != null">
            <Separator class="h-4" orientation="vertical" />
            <FeedItemScore :item="item" />
          </template>
          <Separator class="h-4" orientation="vertical" />
          <FeedItemDomain class="opacity-50 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" :item="item" />
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
          <span>{{ item.commentCount != null ? item.commentCount : 'Comments' }}</span>
        </NuxtLink>
      </div>
    </div>
  </li>
</template>

<style scoped>
.legendary-aura {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background:
    radial-gradient(ellipse 70% 140% at 12% 40%, rgba(251, 191, 36, 0.2), transparent 62%),
    radial-gradient(ellipse 45% 100% at 80% 80%, rgba(245, 158, 11, 0.14), transparent 70%);
  box-shadow:
    inset 2px 0 0 rgba(251, 191, 36, 0.95),
    inset 0 0 0 1px rgba(251, 191, 36, 0.35);
  animation: legendary-aura 4.5s ease-in-out infinite;
}

.legendary-title {
  background-image: linear-gradient(
    105deg,
    #f59e0b 0%,
    #fde68a 22%,
    #fffbeb 40%,
    #fcd34d 52%,
    #fffbeb 64%,
    #fbbf24 82%,
    #fde68a 100%
  );
  background-size: 220% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: #fde68a;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 10px rgba(253, 224, 71, 0.7));
  text-decoration-color: #fde68a;
  animation: legendary-shimmer 5.5s linear infinite;
}

@keyframes legendary-shimmer {
  from { background-position: 100% 0; }
  to { background-position: -120% 0; }
}

@keyframes legendary-aura {
  0%, 100% { opacity: 0.94; }
  50% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .legendary-aura,
  .legendary-title {
    animation: none;
  }
}
</style>
