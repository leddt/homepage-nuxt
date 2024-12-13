export default defineEventHandler(async () => {
  const comic = await $fetch<XkcdComic>('https://xkcd.com/info.0.json')
  return comic
})
