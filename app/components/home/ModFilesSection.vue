<script setup lang="ts">
const modFiles = ref<string[]>([])
const modLoading = ref(true)

onMounted(async () => {
  try {
    const res = await $fetch<{ list: { name: string }[] }>('/api/mods')
    modFiles.value = res.list?.map((item) => item.name) || []
  } catch {
    modFiles.value = []
  } finally {
    modLoading.value = false
  }
})
</script>

<template>
  <section id="mods" class="mt-12 space-y-6">
    <div class="mb-4">
      <h2 class="flex items-center gap-2 text-lg font-bold text-stone-100">
        <span class="i-lucide-file-code" />
        mod 配置文件
      </h2>
      <p class="mt-1 text-sm text-stone-400">点击查看并可复制 mod 配置文件代码块</p>
    </div>

    <div v-if="modLoading" class="space-y-2">
      <div v-for="i in 4" :key="i" class="card h-12 animate-pulse" />
    </div>

    <div v-else class="space-y-2">
      <NuxtLink
        v-for="mod in modFiles"
        :key="mod"
        :to="`/mods/${encodeURIComponent(mod)}`"
        class="card group flex items-center justify-between gap-3 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/30 hover:shadow-lg hover:shadow-orange-900/20"
      >
        <div class="flex min-w-0 items-center gap-2.5">
          <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-white/5 text-sm text-amber-400 ring-1 ring-white/10">
            <span class="i-lucide-file-code" />
          </span>
          <span class="truncate font-mono text-sm text-stone-200 transition-colors group-hover:text-amber-400">{{ mod }}</span>
        </div>
        <span class="shrink-0 text-lg text-stone-500 transition-all group-hover:translate-x-0.5 group-hover:text-amber-400">
          <span class="i-lucide-chevron-right" />
        </span>
      </NuxtLink>
    </div>
  </section>
</template>