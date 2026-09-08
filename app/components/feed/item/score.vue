<script setup lang="ts">
const props = defineProps<{
  item: FeedItem
}>()

const colorMode = useColorMode()
const isDark = ref(true)

function syncDark() {
  isDark.value = document.documentElement.classList.contains('dark')
}

onMounted(() => {
  syncDark()
  watch(() => colorMode.value, syncDark)
})

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

  // Assume dark until mounted; low scores should stay low-contrast against the page background
  const mutedGray: [number, number, number] = isDark.value ? [70, 70, 70] : [180, 180, 180]
  const yellowOrange: [number, number, number] = [245, 158, 11]
  const brightRed: [number, number, number] = [255, 0, 0]

  const score = props.item.score
  const color = score <= 250
    ? lerpRgb(mutedGray, yellowOrange, score / 250)
    : lerpRgb(yellowOrange, brightRed, Math.min((score - 250) / 250, 1))

  return { color }
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
