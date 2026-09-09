<template>
  <div class="flex min-h-dvh flex-col">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <footer class="border-t border-white/5 py-6">
      <div class="wrap flex flex-col items-center justify-between gap-2 text-xs text-stone-500 sm:flex-row">
        <span>DST 服务器查询 · 非官方工具</span>
        <a
          v-for="url in DST_URLS"
          :key="url"
          :href="url"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors hover:text-amber-400"
        >
          {{ url }}
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup>
useSeoMeta({
  description: 'Don\'t Starve Together 服务器查询与图标工具'
})
</script>