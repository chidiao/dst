<template>
  <div class="card text-3 border-rounded">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border-b">
      <div class="text-sm font-bold">{{ server.Name }}</div>
      <div class="text-blue cursor-pointer py-1" @click="onQuickConnect">{{ connect }}</div>
    </div>

    <div class="px-4 py-2">
      <div class="py-1" v-show="details">描述：{{ details?.Desc }}</div>

      <div class="flex flex-wrap">
        <div class="w-1/2 md:w-1/4 my-1">模式：{{ server.Mode + '/' + server.Intent }}</div>
        <div class="w-1/2 md:w-1/4 my-1">版本：{{ server.Version }}</div>
        <div class="w-1/2 md:w-1/4 my-1">
          连接：{{ server.Connected + '/' + server.MaxConnections }}
        </div>
        <div class="w-1/2 md:w-1/4 my-1">{{ days }}</div>
      </div>
    </div>

    <div class="px-4 py-2" v-show="details && show.mods">
      <div class="mb-2">-- Mods({{ details?.ModsInfo?.length }}) --</div>
      <div class="flex flex-wrap gap-2">
        <div
          class="mod"
          :class="{ old: m.CurrentVersion != m.NewVersion }"
          v-for="m in details?.ModsInfo"
          :key="m.Name"
          @click="toModPage(m.Id)"
        >
          {{ m.Name }}
        </div>
      </div>
    </div>

    <div class="px-4 py-2" v-show="details && show.players">
      <div class="mb-2">-- Players({{ details?.Players?.length }}) --</div>
      <div class="flex flex-wrap gap-2">
        <div
          class="player"
          :style="{ '--bg': `#${p.Color}` }"
          v-for="p in details?.Players"
          :key="p.NetId"
          @click="toPlayerPage(p.NetId)"
        >
          {{ p.Name }}({{ p.Prefab }})
        </div>
      </div>
    </div>

    <div class="controller flex justify-between mt-2 border-t px-8 md:px-16 py-4">
      <div
        class="w-4 h-4"
        :class="[details ? 'server-icon' : 'server-icon', loading ? 'loading' : '']"
        @click="getDetail('all', true)"
      ></div>
      <div class="mods-icon w-4 h-4" @click="getDetail('mods')"></div>
      <div class="players-icon w-4 h-4" @click="getDetail('players')"></div>
      <div class="connect-icon w-4 h-4"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Server, ServerDetails, getServer } from '@/composables/useServers'

const props = defineProps<{
  server: Server
}>()
const connect = computed(() => {
  return `c_connect("${props.server?.Address}",${props.server?.Port})`
})

const loading = ref(false)
const details = ref<ServerDetails>()
const show = ref({
  mods: false,
  players: false
})
const days = computed(() => {
  if (!details.value) return `季节：${props.server.Season}`

  return `天数：第${details.value.DaysInfo?.Day}天 ${details.value.Season}(${
    details.value.DaysInfo?.DaysElapsedInSeason
  }/${
    (details.value.DaysInfo?.DaysElapsedInSeason ?? 0) +
    (details.value.DaysInfo?.DaysLeftInSeason ?? 0)
  })`
})

const getDetail = (key: 'mods' | 'players' | 'all', refresh?: boolean) => {
  if (loading.value) return

  if (details.value) {
    if (refresh) {
      getData()
    }
  } else {
    getData()
  }

  if (key == 'all') {
    show.value.mods = true
    show.value.players = true
  } else {
    show.value[key] = !show.value[key]
  }
}

const getData = async () => {
  loading.value = true
  const { data } = await getServer(props.server.RowId)
  details.value = data.value
  loading.value = false
}

const toModPage = (id?: number) => {
  if (!id) return
  window.open(`https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`)
}
const toPlayerPage = (id?: number) => {
  if (!id) return
  window.open(`https://steamcommunity.com/profiles/${id}`)
}

// copy
const { copy } = useClipboard({ legacy: true })
const onQuickConnect = () => {
  copy(connect.value)
  message.success('Copied!')
}
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
}

.mods {
  position: relative;
  height: 0;
  overflow: hidden;

  &.show {
    transition: height 0.3s;
    height: auto;
  }
}

.mod,
.player {
  --bg: #165dff;

  background: var(--bg);
  color: #fff;
  letter-spacing: 1px;
  padding: 6px 12px;
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px #0003, 0 2px 2px #00000024, 0 1px 5px #0000001f;
  cursor: pointer;
}

.mod.old {
  --bg: #f5222d;

  &::after {
    content: '(需要更新)';
  }
}

.server-icon {
  background: url('@/assets/svgs/server.svg') center / contain no-repeat;

  &.loading {
    background: url('@/assets/svgs/loader.svg') center / contain no-repeat;
    animation: rotate 1s linear infinite;
  }
}

.refresh-icon {
  background: url('@/assets/svgs/refresh.svg') center / contain no-repeat;

  &.loading {
    background: url('@/assets/svgs/loader.svg') center / contain no-repeat;
    animation: rotate 1s linear infinite;
  }
}

.controller div {
  cursor: pointer;
}

.mods-icon {
  background: url('@/assets/svgs/mods.svg') center / contain no-repeat;
}

.players-icon {
  background: url('@/assets/svgs/players.svg') center / contain no-repeat;
}

.connect-icon {
  background: url('@/assets/svgs/connect.svg') center / contain no-repeat;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
