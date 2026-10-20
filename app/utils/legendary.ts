/** Score that triggers the legendary treatment. */
export const LEGENDARY_SCORE = 2000

export function isLegendaryItem(item: FeedItem) {
  return item.score != null && item.score >= LEGENDARY_SCORE
}
