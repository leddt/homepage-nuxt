export function usePageReturnFadeout(active: Ref<boolean>, duration: number = 15000, interval: number = 100) {
  const fadeStartTime = ref<number | null>(null)
  const visibility = useDocumentVisibility()
  const now = useNow({ interval })

  // Reset when active state changes
  watch(active, () => {
    fadeStartTime.value = null
  })

  // Start fade when page becomes visible while active
  watch(visibility, (newVisibility) => {
    if (newVisibility === 'visible' && active.value) {
      fadeStartTime.value = Date.now()
    }
  })

  const opacity = computed(() => {
    if (!active.value) return 1
    if (!fadeStartTime.value) return 1

    const fadeAge = now.value.getTime() - fadeStartTime.value
    return Math.max(0, 1 - (fadeAge / duration))
  })

  const isDone = computed(() => fadeStartTime.value && opacity.value === 0)

  return {
    opacity,
    isDone,
  }
}
