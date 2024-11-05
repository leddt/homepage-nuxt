import { useQuery } from '@tanstack/vue-query'
import type { FetchError } from 'ofetch'

export function useFetchQuery<
  TUrl extends Parameters<typeof $fetch>[0],
  TFetch = Awaited<ReturnType<typeof $fetch<unknown, TUrl>>>,
>(
  url: TUrl,
  options?: {
    fetch: Parameters<typeof $fetch<unknown, TUrl>>[1]
    query: Exclude<Parameters<typeof useQuery>[0], 'queryKey' | 'queryFn'>
  },
): ReturnType<typeof useQuery<TFetch, FetchError>> {
  const result = useQuery({
    queryKey: [url as string],
    queryFn: () => useRequestFetch()(url, options?.fetch),
    ...options?.query,
  } as Parameters<typeof useQuery>[0])

  onServerPrefetch(async () => {
    await result.suspense()
  })

  return result as ReturnType<typeof useQuery<TFetch>>
}
