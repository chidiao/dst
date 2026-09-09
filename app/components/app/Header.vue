<script setup lang="ts">
const route = useRoute()

const links = [
  { to: '/servers', label: '服务器', en: 'Servers', icon: 'i-lucide-server' },
  { to: '/icons', label: '图标', en: 'Icons', icon: 'i-lucide-grid-3x3' }
]

const isActive = (to: string) => {
  if (to === '/servers') return route.path.startsWith('/servers')
  return route.path.startsWith(to)
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-white/5 bg-stone-950/70 backdrop-blur-xl">
    <div class="wrap flex h-16 items-center justify-between">
      <NuxtLink to="/servers" class="group flex items-center gap-2.5">
        <span
          class="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-lg text-stone-950 shadow-lg shadow-orange-900/50 transition-transform group-hover:scale-105"
        >
          <span class="i-lucide-flame" />
        </span>
        <span class="text-lg font-bold tracking-wide">
          <span class="text-stone-100">DST</span>
          <span class="text-amber-500"> 服务器</span>
        </span>
      </NuxtLink>

      <nav class="flex items-center gap-1 rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200"
          :class="
            isActive(link.to)
              ? 'bg-gradient-to-b from-amber-400 to-amber-600 text-stone-950 shadow'
              : 'text-stone-300 hover:bg-white/10 hover:text-stone-50'
          "
        >
          <span :class="link.icon" />
          <span class="hidden sm:inline">{{ link.label }}</span>
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>