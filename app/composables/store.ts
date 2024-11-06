export type ItemElement = 'link' | 'comments'

export const useStore = defineStore('feed', () => {
  const highlightedItem = ref<FeedItem | null>(null)
  const highlightedElement = ref<ItemElement | null>(null)

  function setHighlightedItem(item: FeedItem, element: ItemElement) {
    highlightedItem.value = item
    highlightedElement.value = element
  }

  function clearHighlightedItem() {
    highlightedItem.value = null
    highlightedElement.value = null
  }

  return {
    highlightedItem: readonly(highlightedItem),
    highlightedElement: readonly(highlightedElement),
    setHighlightedItem,
    clearHighlightedItem,
  }
})
