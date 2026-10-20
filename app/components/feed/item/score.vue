<script setup lang="ts">
const props = defineProps<{
  item: FeedItem
}>()

function lerpChannel(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t)
}

function lerpRgb(
  from: [number, number, number],
  to: [number, number, number],
  t: number,
) {
  return `rgb(${lerpChannel(from[0], to[0], t)}, ${lerpChannel(from[1], to[1], t)}, ${lerpChannel(from[2], to[2], t)})`
}

const isLegendary = computed(() => isLegendaryItem(props.item))

const scoreColorStyle = computed(() => {
  if (props.item.score == null || isLegendary.value) return undefined

  const yellowOrange: [number, number, number] = [245, 158, 11]
  const brightRed: [number, number, number] = [255, 0, 0]
  const score = props.item.score

  // 0–250: muted (currentColor) → orange
  // 250–1000: orange → bright red
  if (score <= 250) {
    const t = score / 250
    return {
      color: `color-mix(in srgb, currentColor ${Math.round((1 - t) * 100)}%, rgb(${yellowOrange.join(',')}) ${Math.round(t * 100)}%)`,
    }
  }

  return {
    color: lerpRgb(yellowOrange, brightRed, Math.min((score - 250) / 750, 1)),
  }
})
</script>

<template>
  <span
    v-if="item.score != null"
    :class="{ 'score--legendary': isLegendary }"
    :title="`${item.score} points`"
    :style="scoreColorStyle"
  >
    {{ item.score }}&nbsp;pts.
  </span>
</template>

<style scoped>
.score--legendary {
  font-weight: 700;
  color: #fffbeb;
  text-shadow:
    0 0 4px rgba(255, 255, 255, 0.95),
    0 0 10px rgba(253, 224, 71, 1),
    0 0 22px rgba(245, 158, 11, 0.9);
}
</style>
