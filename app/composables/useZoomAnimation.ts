export const useZoomAnimation = (initialZoom = 1) => {
  const isZoomed = ref(false)
  const currentZoom = ref(initialZoom)

  // Smooth zoom animation
  const animateZoom = (targetZoom: number) => {
    const startZoom = currentZoom.value
    const duration = 300 // 300ms
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      currentZoom.value = startZoom + (targetZoom - startZoom) * easeOutQuart

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  // Handle zoom toggle
  const toggleZoom = () => {
    const targetZoom = isZoomed.value ? 1 : 2
    isZoomed.value = !isZoomed.value
    animateZoom(targetZoom)
  }

  // Reset zoom
  const resetZoom = () => {
    isZoomed.value = false
    currentZoom.value = initialZoom
  }

  return {
    isZoomed: readonly(isZoomed),
    currentZoom: readonly(currentZoom),
    toggleZoom,
    resetZoom,
  }
}
