import tailwindcss from '@tailwindcss/vite';

const env = (globalThis as {
  process?: {
    env?: Record<string, string | undefined>;
  };
}).process?.env;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true, },

  runtimeConfig: {
    aiModel: env?.AI_MODEL ?? 'gpt-4o-mini',
    databaseUrl: env?.DATABASE_URL ?? '',
    openaiApiKey: env?.OPENAI_API_KEY ?? '',
  },

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
