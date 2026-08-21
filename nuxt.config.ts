import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {
    enabled: true,
  },
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/image',
    '@element-plus/nuxt',
  ],
  css: [
    '~/assets/styles/tailwind.css',
  ],
  imports: {
    dirs: [
      '~/composables/*.ts',
      '~/composables/query/**',
      '~/utils/**',
      '~/data/**',
      '~/config/**',
    ],
    presets: [
      {
        from: 'class-variance-authority',
        imports: [
          'cva',
          'cx',
        ],
      },
      {
        from: 'luxon',
        imports: [
          'DateTime',
          'Duration',
          'FixedOffsetZone',
          'IANAZone',
          'Info',
          'Interval',
          'InvalidZone',
          'Settings',
          'SystemZone',
          'VERSION',
          'Zone',
        ],
      },
    ],
  },
  nitro: {
    imports: {
      presets: [
        {
          from: 'drizzle-orm',
          imports: [
            'and',
            'asc',
            'between',
            'count',
            'desc',
            'eq',
            'exists',
            'gt',
            'gte',
            'ilike',
            'inArray',
            'isNotNull',
            'isNull',
            'like',
            'lt',
            'lte',
            'max',
            'min',
            'ne',
            'not',
            'notBetween',
            'notExists',
            'notIlike',
            'notInArray',
            'notLike',
            'or',
            'sql',
            'sum',
          ],
        },
        {
          from: 'drizzle-orm/pg-core',
          imports: [
            'bigint',
            'bigserial',
            'boolean',
            'date',
            'doublePrecision',
            'index',
            'integer',
            'json',
            'jsonb',
            'numeric',
            'pgEnum',
            'pgSchema',
            'pgTable',
            'primaryKey',
            'real',
            'serial',
            'smallint',
            'smallserial',
            'text',
            'time',
            'timestamp',
            'unique',
            'uuid',
            'varchar',
          ],
        },
      ],
    },
  },
  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
      },
    ],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
