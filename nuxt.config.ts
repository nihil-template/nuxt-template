import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true, },

  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],

  css: [ '~/assets/styles/tailwind.css', ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  experimental: {
    normalizeComponentNames: true,
  },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  imports: {
    dirs: [
      '~/composables/**',
      '~/utils/**',
    ],
  },
});
