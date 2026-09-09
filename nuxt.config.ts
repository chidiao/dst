// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  ssr: true,

  modules: ['@unocss/nuxt', '@vueuse/nuxt'],

  css: ['~/assets/css/main.css', 'vue-sonner/style.css'],

  runtimeConfig: {
    apiBase: process.env.NUXT_API_BASE || 'https://api.dstserverlist.top'
  },

  // SSG: 静态页面构建时预渲染，动态服务器路由走纯客户端渲染，仅保留 API 代理
  routeRules: {
    '/': { prerender: true },
    '/servers': { prerender: true },
    '/icons': { prerender: true },
    '/servers/**': { ssr: false },
    '/mods/**': { ssr: false }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      title: 'DST 服务器查询',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: "Don't Starve Together 服务器查询与图标工具" },
        { name: 'theme-color', content: '#0c0a09' }
      ]
    }
  }
})
