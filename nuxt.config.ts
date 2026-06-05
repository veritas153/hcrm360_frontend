// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  app: {
    head: {
      script: [
        {
          children: `
            (function() {
              const mode = localStorage.getItem('nuxt-color-mode') || 'system';
              const isDark = mode === 'dark' || 
                (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
              document.documentElement.style.backgroundColor = isDark ? '#1b1718' : '#ffffff';
            })()
          `,
          type: 'text/javascript'
        }
      ]
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@vueuse/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],
  
  compatibilityDate: '2024-07-11',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  routeRules: {
    '/api/v1/**': {
      proxy: 'http://localhost:8080/api/v1/**',
    },
  }

})
