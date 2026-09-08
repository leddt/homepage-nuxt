const HN_API = 'https://hacker-news.firebaseio.com/v0'
const TOP_COUNT = 30

interface HnItem {
  id: number
  title?: string
  url?: string
  score?: number
  time?: number
  descendants?: number
  deleted?: boolean
  dead?: boolean
}

export default defineEventHandler(async () => {
  const ids = await $fetch<number[]>(`${HN_API}/topstories.json`)

  const items = await Promise.all(
    ids.slice(0, TOP_COUNT).map(id => $fetch<HnItem>(`${HN_API}/item/${id}.json`)),
  )

  return items
    .filter((item): item is HnItem & { title: string, time: number } =>
      !!item && !item.deleted && !item.dead && !!item.title && !!item.time,
    )
    .map<FeedItem>(item => ({
      title: item.title,
      link: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
      date: new Date(item.time * 1000).toISOString(),
      comments: `https://news.ycombinator.com/item?id=${item.id}`,
      score: item.score,
      commentCount: item.descendants,
    }))
})
