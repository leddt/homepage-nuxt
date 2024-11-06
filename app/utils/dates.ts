import { formatDistance, formatDistanceStrict } from 'date-fns'

export function formatDate(now: Date, date: string | number, strict = false) {
  const d = new Date(date)
  if (d > now) now = d

  if (strict) {
    return formatDistanceStrict(d, now, { addSuffix: true })
  }

  return formatDistance(d, now, { addSuffix: true })
}
