// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    (_options, nuxt) => {
      // shadcn-nuxt 0.11 scans `components/ui` with no extension filter, so
      // `index.ts` and `Component.vue` both register as the same component.
      // The module already registers each export; skip the scan.
      // https://github.com/unovue/shadcn-vue/issues/1413
      nuxt.hook('components:dirs', (dirs) => {
        for (const dir of dirs) {
          if (typeof dir === 'string' || !dir.path?.replaceAll('\\', '/').endsWith('/components/ui'))
            continue
          dir.ignore = ['**/*']
        }
      })
    },
  ],

  devtools: { enabled: true },

  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },

  css: [
    './assets/css/fonts.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  runtimeConfig: {
    public: {
      helloText: 'Hello from the Edge 👋',
    },
  },

  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-09-19',

  nitro: {
    preset: 'cloudflare',
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },

  shadcn: {
    componentDir: 'app/components/ui',
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
})
