export type ItemElement = 'link' | 'comments'

interface VisitedLink {
  link: string
  element: ItemElement
  timestamp: number
}

const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000 // 1 week in milliseconds

export const useStore = defineStore('feed', () => {
  const highlightedItem = ref<FeedItem | null>(null)
  const highlightedElement = ref<ItemElement | null>(null)
  const visitedLinks = useLocalStorage<VisitedLink[]>('visitedLinks', () => [])

  // Clean up expired links on initialization
  if (import.meta.client) {
    const now = Date.now()
    visitedLinks.value = visitedLinks.value.filter(
      link => now - link.timestamp < WEEK_IN_MS,
    )
  }

  async function setHighlightedItem(item: FeedItem, element: ItemElement) {
    clearHighlightedItem()
    await nextTick()

    highlightedItem.value = item
    highlightedElement.value = element
  }

  function clearHighlightedItem() {
    highlightedItem.value = null
    highlightedElement.value = null
  }

  function markVisited(item: FeedItem, element: ItemElement) {
    // Remove if exists (to update timestamp)
    visitedLinks.value = visitedLinks.value.filter(link => link.link !== item.link || link.element !== element)
    // Add with current timestamp
    visitedLinks.value.push({
      link: item.link,
      element,
      timestamp: Date.now(),
    })
  }

  function isVisited(item: FeedItem, element?: ItemElement) {
    const link = visitedLinks.value.find(link => link.link === item.link && (element === undefined || link.element === element))
    if (!link) return false

    // Check if link has expired
    return Date.now() - link.timestamp < WEEK_IN_MS
  }

  function isHighlighted(item: FeedItem, element?: ItemElement) {
    return highlightedItem.value?.link === item.link && (element === undefined || highlightedElement.value === element)
  }

  return {
    setHighlightedItem,
    clearHighlightedItem,
    markVisited,
    isVisited,
    isHighlighted,
  }
})
