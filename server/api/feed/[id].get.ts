import Parser from 'rss-parser'

type FeedItem = {
  title: string
  link: string
  date: string
  comments?: string
}

const feeds = {
  hn: 'https://news.ycombinator.com/rss',
  sd: 'https://slashdot.org/index.rss',
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id || !(id in feeds)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid feed id',
    })
  }

  const feedUrl = feeds[id as keyof typeof feeds]

  const parser = new Parser()
  const feed = await parser.parseURL(feedUrl)

  return feed.items
    .filter(item => item.title && item.link)
    .map<FeedItem>(item => ({
      title: item.title || '',
      link: item.link || '',
      date: item.isoDate || '',
      comments: item.comments,
    // raw: item,
    }))
})
