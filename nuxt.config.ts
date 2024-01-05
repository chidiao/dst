export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  router: {
    options: {
      hashMode: true
    }
  },
  modules: ['@nuxt/ui', '@vueuse/nuxt'],
  css: ['@/assets/style/main.scss'],
  colorMode: {
    preference: 'light'
  }
})
