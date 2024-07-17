export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  router: {
    options: {
      hashMode: true
    }
  },
  css: ['@/assets/style/index.scss'],
  modules: ['@nuxt/ui', '@vueuse/nuxt', '@formkit/auto-animate/nuxt', 'nuxt-svgo'],
  colorMode: {
    preference: 'light'
  },
  svgo: {
    autoImportPath: false,
    defaultImport: 'component'
  }
})
