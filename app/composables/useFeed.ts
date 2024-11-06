export function useFeed(id: string, title: string, icon: string, color: string): Feed {
  const feed = useFetchQuery(`/api/feed/${id}`)
  return {
    title,
    icon,
    color,
    items: computed(() => feed.data.value || []),
    refetch: feed.refetch,
    updatedAt: feed.dataUpdatedAt,
  }
}
