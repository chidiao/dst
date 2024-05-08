export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  router: {
    options: {
      hashMode: true
    }
  },
  css: ['@/assets/styles/index.scss'],
  modules: ['@nuxt/ui', '@vueuse/nuxt', 'nuxt-svgo-loader', '@formkit/auto-animate/nuxt'],
  colorMode: {
    preference: 'light'
  }
})
