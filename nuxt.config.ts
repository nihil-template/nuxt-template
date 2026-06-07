import tailwindcss from '@tailwindcss/vite';

const env = (globalThis as {
  process?: {
    env?: Record<string, string | undefined>;
  };
}).process?.env;

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    aiModel: env?.AI_MODEL ?? 'gpt-4o-mini',
    databaseUrl: env?.DATABASE_URL ?? '',
    openaiApiKey: env?.OPENAI_API_KEY ?? '',
  },

  alias: {
    '@vue/devtools-api': '@vue/devtools-api',
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxt/image',
  ],

  css: ['~/assets/styles/tailwind.css'],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      preserveSymlinks: true,
    },
    optimizeDeps: {
      esbuildOptions: {
        preserveSymlinks: true,
      },
      exclude: [
        '@tanstack/vue-query',
        '@tanstack/query-core',
        '@tanstack/vue-query-devtools',
      ],
      include: [
        '@iconify/vue',
        '@lukemorales/query-key-factory',
        '@vue/devtools-api',
        'class-variance-authority',
        'clsx',
        'luxon',
        'tailwind-merge',
      ],
    },
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
    dirs: ['~/composables/**', '~/utils/**'],
  },
});
