<script setup lang="ts">
const mode = useColorMode()
</script>

<template>
  <div class="fixed bottom-0 right-0 pr-4 z-10 bg-secondary text-secondary-foreground rounded-tl-lg flex flex-row gap-1 leading-none opacity-50 hover:opacity-100">
    <button
      class="p-1"
      :class="{ 'text-green-500': mode.preference === 'light' }"
      title="Use light theme"
      @click="mode.preference = 'light'"
    >
      <Icon name="mdi:weather-sunny" />
    </button>
    <button
      class="p-1"
      :class="{ 'text-green-500': mode.preference === 'dark' }"
      title="Use dark theme"
      @click="mode.preference = 'dark'"
    >
      <Icon name="mdi:weather-night" />
    </button>
    <button
      class="p-1"
      :class="{ 'text-green-500': mode.preference === 'system' }"
      title="Follow system settings"
      @click="mode.preference = 'system'"
    >
      <Icon name="mdi:monitor" />
    </button>
  </div>
</template>
