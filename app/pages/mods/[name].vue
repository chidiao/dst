<script setup lang="ts">
import hljs from 'highlight.js/lib/core'
import lua from 'highlight.js/lib/languages/lua'
import { toast } from 'vue-sonner'

hljs.registerLanguage('lua', lua)

interface ModFile {
  name: string
}

const route = useRoute()
const name = computed(() => (route.params.name as string) || '')

useHead({
  title: computed(() => name.value || '配置')
})

const code = ref('')
const loading = ref(true)
const error = ref('')
const notFound = ref(false)
const highlighted = ref('')
const copied = ref(false)

const { copy } = useClipboard({ legacy: true })

const load = async () => {
  loading.value = true
  error.value = ''
  notFound.value = false
  if (!name.value) {
    notFound.value = true
    loading.value = false
    return
  }
  try {
    const res = await $fetch<{ list: ModFile[] }>('/api/mods')
    if (!res.list?.some((item) => item.name === name.value)) {
      notFound.value = true
      return
    }
    const raw = await $fetch<string>(`/files/mods/${encodeURIComponent(name.value)}`)
    code.value = raw
    highlighted.value = hljs.highlight(raw, { language: 'lua' }).value
  } catch (e: any) {
    error.value = e?.data?.message || '加载失败，请重试'
  } finally {
    loading.value = false
  }
}

const onCopy = async () => {
  if (!code.value) return
  await copy(code.value)
  copied.value = true
  toast.success(`已复制「${name.value}」`, {
    description: `${code.value.split('\n').length} 行代码`
  })
  window.setTimeout(() => (copied.value = false), 1600)
}

onMounted(load)
</script>

<template>
  <div class="wrap py-6 sm:py-8">
    <div class="mb-6 flex items-center justify-between gap-3">
      <NuxtLink to="/servers#mods" class="group inline-flex items-center gap-1.5 text-sm text-stone-400 transition-colors hover:text-amber-400">
        <span class="i-lucide-arrow-left transition-transform group-hover:-translate-x-0.5" />
        返回首页
      </NuxtLink>

      <button class="btn-ghost !px-3 !py-1.5 text-xs" title="刷新" :disabled="loading" @click="load">
        <span class="i-lucide-refresh-cw" :class="loading ? 'animate-spin' : ''" />
      </button>
    </div>

    <section class="mb-5 flex items-center justify-between gap-3">
      <div class="flex min-w-0 items-center gap-3">
        <span class="grid size-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-xl text-stone-950 shadow-lg shadow-orange-900/40">
          <span class="i-lucide-file-code" />
        </span>
        <div class="min-w-0">
          <h1 class="truncate font-mono text-xl font-bold text-stone-100 sm:text-2xl">{{ name }}</h1>
          <p class="mt-0.5 text-sm text-stone-400">mod 配置文件代码块</p>
        </div>
      </div>

      <button
        class="btn-ghost shrink-0 !px-3 !py-2 text-xs"
        :class="copied ? '!border-emerald-500/40 !bg-emerald-500/15 !text-emerald-300' : ''"
        @click="onCopy"
      >
        <span v-if="copied" class="i-lucide-check" />
        <span v-else class="i-lucide-copy" />
        {{ copied ? '已复制' : '复制' }}
      </button>
    </section>

    <div v-if="loading" class="card animate-pulse space-y-3 p-5">
      <div class="h-5 w-40 rounded bg-white/10" />
      <div class="h-96 rounded bg-white/5" />
    </div>

    <div v-else-if="error" class="card flex flex-col items-center gap-3 py-14 text-center">
      <span class="grid size-14 place-items-center rounded-2xl bg-red-500/10 text-2xl text-red-400">
        <span class="i-lucide-circle-x" />
      </span>
      <p class="text-sm text-stone-400">{{ error }}</p>
      <button class="btn-primary mt-2" @click="load">
        <span class="i-lucide-refresh-cw" />
        重新加载
      </button>
    </div>

    <div v-else-if="!code" class="card flex flex-col items-center gap-3 py-14 text-center">
      <span class="grid size-14 place-items-center rounded-2xl bg-white/5 text-3xl text-stone-500">
        <span class="i-lucide-file" />
      </span>
      <p class="text-sm text-stone-400">未找到配置文件「{{ name }}」</p>
      <NuxtLink to="/servers#mods" class="btn-ghost mt-2">
        <span class="i-lucide-arrow-left" />
        返回首页
      </NuxtLink>
    </div>

    <div v-else class="card overflow-hidden">
      <pre
        class="select-text overflow-x-auto bg-stone-950/70 p-4 font-mono text-xs leading-6"
      ><code class="hljs" v-html="highlighted" /></pre>
    </div>
  </div>
</template>