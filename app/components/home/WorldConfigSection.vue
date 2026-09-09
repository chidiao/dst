<script setup lang="ts">
import hljs from 'highlight.js/lib/core'
import lua from 'highlight.js/lib/languages/lua'

hljs.registerLanguage('lua', lua)

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
].map((config) => ({
  ...config,
  worlds: config.worlds.map((world) => ({
    ...world,
    html: hljs.highlight(world.lines.join('\n'), { language: 'lua' }).value
  }))
}))
</script>

<template>
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
            <pre class="overflow-x-auto px-3 py-2.5 font-mono text-xs leading-6"><code class="hljs" v-html="world.html" /></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>