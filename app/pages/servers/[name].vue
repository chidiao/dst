<script setup lang="ts">
import type { Server } from '@/types/servers'

const route = useRoute()
const name = computed(() => (route.params.name as string) || '')

useHead({
  title: computed(() => name.value || '服务器')
})

const { serverApi } = useApis()
const list = ref<Server[]>([])
const loading = ref(false)
const error = ref('')

const getList = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await serverApi.list(name.value)
    list.value = res.List || []
  } catch (e: any) {
    error.value = e?.data?.message || '加载失败，请重试'
    list.value = []
  } finally {
    loading.value = false
  }
}

const onUpdate = (val: Server) => {
  const idx = list.value.findIndex((item) => item.RowId === val.RowId)
  if (idx > -1) {
    list.value[idx] = val
  }
}

onMounted(getList)
</script>

<template>
  <div class="wrap py-6 sm:py-8">
    <div class="mb-6 flex items-center justify-between gap-3">
      <NuxtLink to="/servers" class="group inline-flex items-center gap-1.5 text-sm text-stone-400 transition-colors hover:text-amber-400">
        <span class="i-lucide-arrow-left transition-transform group-hover:-translate-x-0.5" />
        返回列表
      </NuxtLink>

      <div class="flex items-center gap-2">
        <span class="text-lg font-semibold text-stone-200">#{{ name }}</span>
        <button class="btn-ghost !px-2.5 !py-1.5 text-xs" title="刷新" :disabled="loading" @click="getList">
          <span class="i-lucide-refresh-cw" :class="loading ? 'animate-spin' : ''" />
        </button>
      </div>
    </div>

    <div v-if="loading" class="space-y-4">
      <div v-for="i in 2" :key="i" class="card animate-pulse space-y-3 p-5">
        <div class="flex items-center justify-between">
          <div class="h-5 w-32 rounded bg-white/10" />
          <div class="h-4 w-48 rounded bg-white/5" />
        </div>
        <div class="h-3 w-2/3 rounded bg-white/5" />
        <div class="h-3 w-1/2 rounded bg-white/5" />
        <div class="flex gap-2">
          <div v-for="j in 4" :key="j" class="h-6 w-16 rounded bg-white/5" />
        </div>
      </div>
    </div>

    <div v-else-if="error" class="card flex flex-col items-center gap-3 py-14 text-center">
      <span class="grid size-14 place-items-center rounded-2xl bg-red-500/10 text-2xl text-red-400">
        <span class="i-lucide-circle-x" />
      </span>
      <p class="text-sm text-stone-400">{{ error }}</p>
      <button class="btn-primary mt-2" @click="getList">
        <span class="i-lucide-refresh-cw" />
        重新加载
      </button>
    </div>

    <div v-else-if="!list.length" class="card flex flex-col items-center gap-3 py-14 text-center">
      <span class="grid size-14 place-items-center rounded-2xl bg-white/5 text-2xl text-stone-500">
        <span class="i-lucide-search" />
      </span>
      <p class="text-sm text-stone-400">没有找到「{{ name }}」对应的服务器</p>
      <p class="max-w-sm text-xs text-stone-500">请确认集群名称是否正确，或稍后重试</p>
    </div>

    <div v-else class="space-y-4">
      <div class="mb-2 flex items-center gap-2 text-xs text-stone-500">
        <span class="i-lucide-shield" />
        共找到 {{ list.length }} 个服务器
      </div>
      <ServerCard v-for="server in list" :key="server.RowId" :server="server" @update="onUpdate" />
    </div>
  </div>
</template>