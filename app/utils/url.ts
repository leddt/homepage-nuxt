export function getDomain(url: string, trimWww = false): string {
  try {
    const domain = new URL(url).hostname
    if (trimWww) {
      // Remove 'www.' prefix if present
      return domain.replace(/^www\./, '')
    }

    return domain
  }
  catch {
    return url
  }
}
