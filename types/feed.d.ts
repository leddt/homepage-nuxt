interface FeedItem {
  title: string
  link: string
  date: string
  comments?: string
}

interface Feed {
  title: string
  icon: string
  color: string
  sortable: boolean
  items: Ref<FeedItem[]>
  updatedAt: Ref<string | number>
  refetch: () => void
}
