<script setup lang="ts">
const props = defineProps<{
  item: FeedItem
}>()

const domain = computed(() => getDomain(props.item.link, true))
const faviconUrl = computed(() => `https://external-content.duckduckgo.com/ip3/${getDomain(props.item.link)}.ico`)
const showFallbackIcon = ref(false)
const onFaviconError = () => {
  showFallbackIcon.value = true
}
</script>

<template>
  <div class="flex items-center gap-1.5">
    <template v-if="!showFallbackIcon">
      <img
        :src="faviconUrl"
        :alt="`${domain} favicon`"
        class="w-3.5 h-3.5"
        @error="onFaviconError"
      >
    </template>
    <Icon
      v-else
      name="mdi:globe"
      class="w-4 h-4"
    />
    <span>{{ domain }}</span>
  </div>
</template>
