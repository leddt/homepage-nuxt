import { extract } from '@extractus/feed-extractor'

const feeds = {
  hn: 'https://news.ycombinator.com/rss',
  sd: 'https://slashdot.org/index.rss',
}

function assertSupportedFeed(id: string | undefined): asserts id is keyof typeof feeds {
  if (!id || !(id in feeds)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid feed id',
    })
  }
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  assertSupportedFeed(id)
  const feedUrl = feeds[id]

  const feed = await extract(feedUrl, {
    getExtraEntryFields: (entry) => {
      // console.log(entry)
      return {
        comments: 'comments' in entry ? entry.comments as string : undefined,
      }
    },
  })

  if (!feed.entries) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No entries found',
    })
  }

  return feed.entries
    .filter(item => item.title && item.link)
    .map<FeedItem>(item => ({
      title: item.title || '',
      link: item.link || '',
      date: item.published || '',
      comments: item.comments,
      // raw: item,
    }))
})

declare module '@extractus/feed-extractor' {
  interface FeedEntry {
    comments?: string
  }
}
