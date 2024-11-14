<script setup lang="ts">
const props = defineProps<{
  item: FeedItem
}>()

const now = useNow({ interval: 5000 })

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
    ? 36 + ((0.5 - hoursAgo) * 50)
    : 36

  const alpha = 0.8

  return {
    color: `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`,
  }
})
</script>

<template>
  <span class="flex items-center gap-1">
    <Icon
      name="mdi:calendar"
      class="w-4 h-4"
      :style="timeColorStyle"
    />
    <span :title="item.date">{{ formatDate(now, item.date, true) }}</span>
  </span>
</template>
