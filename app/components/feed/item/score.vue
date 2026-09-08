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

const scoreColorStyle = computed(() => {
  if (props.item.score == null) return undefined

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
    :title="`${item.score} points`"
    :style="scoreColorStyle"
  >
    {{ item.score }}&nbsp;pts.
  </span>
</template>
