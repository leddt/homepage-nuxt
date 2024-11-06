<script setup lang="ts">
defineProps<{
  item: FeedItem
}>()

const now = useNow({ interval: 5000 })
</script>

<template>
  <li class="group transition-all sm:hover:bg-muted/50 px-2 py-1 rounded-lg">
    <NuxtLink :href="item.link" target="_blank" class="text-lg hover:underline block">
      {{ item.title }}
    </NuxtLink>
    <div class="flex items-center justify-between gap-2 mt-1 text-sm text-muted-foreground">
      <span class="flex items-center">
        <Icon name="mdi:calendar" class="w-4 h-4 mr-1" />
        <span :title="item.date">{{ formatDate(now, item.date, true) }}</span>
      </span>
      <NuxtLink
        v-if="item.comments"
        :href="item.comments"
        target="_blank"
        class="flex items-center hover:underline hover:text-primary sm:opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Icon name="mdi:message" class="w-4 h-4 mr-1" />
        <span>Comments</span>
      </NuxtLink>
    </div>
  </li>
</template>
