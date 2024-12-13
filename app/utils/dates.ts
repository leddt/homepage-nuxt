import { formatDistance, formatDistanceStrict } from 'date-fns'

export function formatTimeAgo(now: Date, date: string | number, strict = false) {
  const d = new Date(date)
  if (d > now) now = d

  if (strict) {
    return formatDistanceStrict(d, now, { addSuffix: true })
  }

  return formatDistance(d, now, { addSuffix: true })
}

export function formatDaysAgo(now: Date, date: string | number) {
  const d = new Date(date)
  if (d > now) now = d

  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  return `${diffDays} days ago`
}
