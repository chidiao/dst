<script setup lang="ts">
import type { Server } from '@/types/servers'
import { toast } from 'vue-sonner'

const props = defineProps<{
  server: Server
}>()

const emit = defineEmits<{
  update: [server: Server]
}>()

const day = computed(() => {
  const info = props.server.DaysInfo
  if (!info) return undefined
  return `第 ${info.Day ?? 0} 天 · ${props.server.Season || '未知季节'}（${info.DaysElapsedInSeason ?? 0}/${info.TotalDaysSeason ?? 0}）`
})

const connect = computed(() => {
  return `c_connect("${props.server.Address?.IP || ''}",${props.server.Port || 0})`
})

const { serverApi } = useApis()
const loading = ref(false)

const getDetails = async () => {
  loading.value = true
  try {
    const res = await serverApi.details(props.server?.RowId || 0)
    if (res?.Server) {
      emit('update', res.Server)
    }
  } catch (e: any) {
    toast.error('刷新失败', {
      description: e?.data?.message || '请稍后重试'
    })
  } finally {
    loading.value = false
  }
}

const communityLink = (id: number | string) => `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`
const playerLink = (id: number | string) => `https://steamcommunity.com/profiles/${id}`

const { copy } = useClipboard({ legacy: true })

const onCopyConnect = () => {
  copy(connect.value)
  toast.success('已复制连接命令', {
    description: connect.value
  })
}
</script>

<template>
  <article class="card group overflow-hidden transition-all duration-200 hover:border-amber-500/20 hover:shadow-xl hover:shadow-orange-900/10">
    <div class="flex flex-col gap-4 p-5 sm:p-6">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div class="flex items-center gap-3">
          <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-stone-950 shadow">
            <span class="i-lucide-server" />
          </span>

          <div>
            <button
              class="group/title flex items-center gap-2 text-left text-base font-bold text-stone-100 transition-colors hover:text-amber-400 sm:text-lg"
              title="点击刷新详情"
              :disabled="loading"
              @click="getDetails"
            >
              {{ server?.Name || '未知服务器' }}
              <span
                v-if="loading"
                class="i-lucide-loader animate-spin text-amber-400"
              />
              <span v-else class="i-lucide-refresh-cw text-stone-500 opacity-0 transition-all group-hover/title:opacity-100" title="刷新" />
            </button>
            <div class="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-stone-500">
              <span v-if="day">{{ day }}</span>
              <span v-else>暂无状态信息</span>
              <span
                v-if="server?.IsPvp"
                class="inline-flex items-center gap-1 rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] text-red-400"
              >
                <span class="i-lucide-swords" />PVP
              </span>
              <span
                v-if="server?.IsPassword"
                class="inline-flex items-center gap-1 rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] text-amber-400"
              >
                <span class="i-lucide-lock" />密码
              </span>
            </div>
          </div>
        </div>

        <button
          class="group/copy inline-flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-2 font-mono text-xs text-amber-300 transition-all hover:bg-amber-500/20 active:scale-95"
          title="复制连接命令"
          @click="onCopyConnect"
        >
          <span class="i-lucide-copy opacity-60 transition-opacity group-hover/copy:opacity-100" />
          <span class="max-w-[16rem] truncate">{{ connect }}</span>
        </button>
      </div>

      <template v-if="server?.Description">
        <div class="border-t border-white/5 pt-4">
          <h4 class="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400">
            <span class="i-lucide-info" />信息
          </h4>
          <div class="space-y-1.5 text-sm text-stone-400">
            <p class="whitespace-pre-wrap">{{ server.Description }}</p>
            <p v-if="day" class="text-xs text-stone-500">{{ day }}</p>
          </div>
        </div>
      </template>

      <template v-if="server?.ModsInfo?.length">
        <div class="border-t border-white/5 pt-4">
          <h4 class="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400">
            <span class="i-lucide-puzzle" />模组（{{ server.ModsInfo.length }}）
          </h4>
          <div class="flex flex-wrap gap-2">
            <a
              v-for="mod in server.ModsInfo"
              :key="mod.Id"
              :href="communityLink(mod.Id || 0)"
              target="_blank"
              rel="noopener noreferrer"
              :title="`模组 ID：${mod.Id}`"
              class="chip border border-white/10 bg-white/5 text-stone-300 transition-all hover:-translate-y-0.5 hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-300"
            >
              {{ mod.Name }}
            </a>
          </div>
        </div>
      </template>

      <template v-if="server?.Players?.length">
        <div class="border-t border-white/5 pt-4">
          <h4 class="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-400">
            <span class="i-lucide-users" />玩家（{{ server.Players.length }}）
          </h4>
          <div class="flex flex-wrap gap-2">
            <a
              v-for="player in server.Players"
              :key="player.NetId"
              :href="playerLink(player.NetId || 0)"
              target="_blank"
              rel="noopener noreferrer"
              :style="{ background: `#${player.Color || '6366f1'}22`, color: `#${player.Color || '6366f1'}`, borderColor: `#${player.Color || '6366f1'}44` }"
              class="chip border transition-transform hover:-translate-y-0.5"
              :title="`Steam ID：${player.NetId}`"
            >
              <span class="i-lucide-user" />
              {{ player.Name }}
              <span class="opacity-70">{{ player.Prefab }}</span>
            </a>
          </div>
        </div>
      </template>
    </div>
  </article>
</template>