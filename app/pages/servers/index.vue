<script setup lang="ts">
import { useStorage } from '@vueuse/core'

const servers = useStorage<string[]>('SERVERS', [])
const hydrated = ref(false)
onMounted(() => {
  hydrated.value = true
})

const server = ref('')
const error = ref('')

const addServer = () => {
  const name = server.value.trim()
  if (!name) return

  if (servers.value.includes(name)) {
    error.value = '该服务器已在列表中'
    return
  }

  servers.value.push(name)
  server.value = ''
  error.value = ''
}

const removeServer = (name: string) => {
  servers.value = servers.value.filter((item) => item !== name)
}

const clearServers = () => {
  servers.value = []
}

const toList = (name: string) => {
  navigateTo(`/servers/${encodeURIComponent(name)}`)
}

const worldConfigs = [
  {
    title: '多层世界配置（同服）',
    desc: '所有世界运行在同一台服务器上',
    worlds: [
      { label: '主世界 (aa.aa.aa.aa)', lines: ['bind_ip = 127.0.0.1', 'master_ip = 127.0.0.1', 'master_port = 10888'] },
      { label: '从世界 (aa.aa.aa.aa)', lines: ['bind_ip = 127.0.0.1', 'master_ip = 127.0.0.1', 'master_port = 10888'] }
    ]
  },
  {
    title: '多层世界配置（跨服）',
    desc: '每台服务器运行各自的世界，主从互联',
    worlds: [
      { label: '主世界 (aa.aa.aa.aa)', lines: ['bind_ip = 0.0.0.0', 'master_ip = 127.0.0.1', 'master_port = 10888'] },
      { label: '从世界 (bb.bb.bb.bb)', lines: ['bind_ip = 127.0.0.1', 'master_ip = aa.aa.aa.aa', 'master_port = 10888'] }
    ]
  }
]
</script>

<template>
  <div class="wrap py-8 sm:py-12">
    <section class="mb-8">
      <div class="flex items-center gap-3">
        <span class="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-xl text-stone-950 shadow-lg shadow-orange-900/40">
          <span class="i-lucide-server" />
        </span>
        <div>
          <h1 class="text-2xl font-bold text-stone-100 sm:text-3xl">服务器列表</h1>
          <p class="mt-0.5 text-sm text-stone-400">保存常用集群名称，点击快速查看状态</p>
        </div>
      </div>
    </section>

    <form class="mb-8" @submit.prevent="addServer">
      <div class="flex gap-2">
        <div class="relative flex-1">
          <span class="pointer-events-none absolute left-3.5 top-1/2 flex -translate-y-1/2 text-base text-stone-400">
            <span class="i-lucide-search" />
          </span>
          <input
            v-model="server"
            type="text"
            placeholder="输入服务器集群名称，如 wilson"
            class="input pl-9"
            @input="error = ''"
          >
        </div>
        <button type="submit" class="btn-primary">
          <span class="i-lucide-plus" />
          <span class="hidden sm:inline">添加</span>
        </button>
        <button v-if="hydrated && servers.length" type="button" class="btn-danger" @click="clearServers">
          <span class="i-lucide-trash" />
          <span class="hidden sm:inline">清空</span>
        </button>
      </div>
      <p v-if="error" class="mt-2 text-sm text-red-400">{{ error }}</p>
    </form>

    <section>
      <div v-if="hydrated && !servers.length" class="card flex flex-col items-center gap-3 py-14 text-center">
        <span class="grid size-14 place-items-center rounded-2xl bg-white/5 text-3xl text-stone-500"><span class="i-lucide-radar" /></span>
        <p class="text-sm text-stone-400">还没有保存任何服务器</p>
        <p class="max-w-sm text-xs text-stone-500">在上方输入集群名称即可添加，例如：3443037767</p>
      </div>

      <div v-else-if="hydrated" class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(item, index) in servers"
          :key="item"
          class="card group cursor-pointer p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/30 hover:shadow-xl hover:shadow-orange-900/20"
          @click="toList(item)"
        >
          <div class="flex items-center justify-between gap-2">
            <div class="flex min-w-0 items-center gap-2.5">
              <span class="grid size-9 shrink-0 place-items-center rounded-lg bg-white/5 text-sm text-stone-400 ring-1 ring-white/10">
                {{ index + 1 }}
              </span>
              <div class="min-w-0">
                <p class="truncate text-sm font-semibold text-stone-100 transition-colors group-hover:text-amber-400">
                  {{ item }}
                </p>
                <p class="text-xs text-stone-500">点击查看详情</p>
              </div>
            </div>

            <button
              class="grid size-7 shrink-0 place-items-center rounded-lg text-stone-500 opacity-0 transition-all hover:bg-red-500/20 hover:text-red-400 group-hover:opacity-100"
              title="删除"
              @click.stop="removeServer(item)"
            >
              <span class="i-lucide-x" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-12 space-y-6">
      <div class="mb-4">
        <h2 class="flex items-center gap-2 text-lg font-bold text-stone-100">
          <span class="i-lucide-map" />
          多层世界配置参考
        </h2>
        <p class="mt-1 text-sm text-stone-400">Don't Starve Together 多世界集群连接配置示例</p>
      </div>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div v-for="config in worldConfigs" :key="config.title" class="card overflow-hidden">
          <div class="border-b border-white/5 bg-white/[0.03] px-4 py-3">
            <h3 class="text-sm font-bold text-stone-100">{{ config.title }}</h3>
            <p class="mt-0.5 text-xs text-stone-500">{{ config.desc }}</p>
          </div>

          <div class="space-y-3 p-4">
            <div v-for="world in config.worlds" :key="world.label" class="overflow-hidden rounded-xl bg-stone-950/80 ring-1 ring-white/10">
              <div class="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-amber-400">
                <span class="i-lucide-tent" />
                {{ world.label }}
              </div>
              <pre class="overflow-x-auto px-3 py-2.5 font-mono text-xs leading-6 text-stone-300">{{ world.lines.join('\n') }}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>