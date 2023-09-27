export default defineNuxtConfig({
  ssr: false,
  css: ['@unocss/reset/tailwind.css', '~/assets/style/main.scss'],
  modules: ['@unocss/nuxt', '@vueuse/nuxt', '@ant-design-vue/nuxt'],
  router: {
    options: {
      hashMode: true
    }
  },
  devtools: { enabled: false }
})
