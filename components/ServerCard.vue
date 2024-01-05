<template>
  <div class="card text-xs rounded">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 border-b">
      <div class="text-sm font-bold">{{ server.Name }}</div>
      <div class="text-blue-500 cursor-pointer py-1" @click="onQuickConnect">{{ connect }}</div>
    </div>

    <div class="px-4 py-2">
      <div class="py-1" v-show="details">描述：{{ details?.Description }}</div>

      <div class="flex flex-wrap">
        <div class="w-1/2 md:w-1/4 my-1">模式：{{ server.Mode + '/' + server.Intent }}</div>
        <div class="w-1/2 md:w-1/4 my-1">版本： {{ currentVersion }}</div>
        <div class="w-1/2 md:w-1/4 my-1">
          连接：{{ server.Connected + '/' + server.MaxConnections }}
        </div>
        <div class="w-1/2 md:w-1/4 my-1">{{ days }}</div>
      </div>
    </div>

    <div class="box" :style="{ height: show.mods ? modsHeight + 'px' : '0' }">
      <div class="px-4 py-2" ref="mods" v-if="details">
        <div class="mb-2">-- Mods({{ details?.ModsInfo?.length }}) --</div>
        <div class="flex flex-wrap gap-2">
          <div class="mod" v-for="m in details?.ModsInfo" :key="m.Name" @click="toModPage(m.Id)">
            {{ m.Name }}
          </div>
        </div>
      </div>
    </div>

    <div class="box" :style="{ height: show.players ? playersHeight + 'px' : '0' }">
      <div class="px-4 py-2" ref="players" v-if="details">
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
    </div>

    <div class="controller flex justify-between mt-2 border-t px-8 md:px-16 py-4">
      <div
        class="w-4 h-4"
        :class="[details ? 'server-icon' : 'server-icon', loading ? 'loading' : '']"
        @click="getDetail('all', true)"
      ></div>
      <div class="mods-icon w-4 h-4" @click="getDetail('mods')"></div>
      <div class="players-icon w-4 h-4" @click="getDetail('players')"></div>
      <div class="move-icon w-4 h-4"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  server: Server
}>()

const { version } = useServers()
const currentVersion = computed(() => {
  const current = props.server.Version
  const latest = version.value

  if ((current ?? 0) < latest) return `${current}(需要更新)`

  return current
})

const connect = computed(() => {
  return `c_connect("${props.server?.Address?.IP}",${props.server?.Port})`
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

const loading = ref(false)
const details = ref<ServerDetails>()
const show = ref({
  mods: false,
  players: false
})

const getDetail = (key: 'mods' | 'players' | 'all', refresh?: boolean) => {
  if (loading.value) return

  if (details.value) {
    if (refresh) {
      getSeverDetail()
    }
  } else {
    getSeverDetail()
  }

  if (key == 'all') {
    show.value.mods = true
    show.value.players = true
  } else {
    show.value[key] = !show.value[key]
  }
}

const getSeverDetail = async () => {
  loading.value = true
  const id = props.server.RowId
  const { data } = await useHttp.post(API.SERVER_DETAILs + `/${id}`)
  details.value = data.value.Server
  loading.value = false
}

const mods = ref()
const players = ref()
const { height: modsHeight } = useElementBounding(mods)
const { height: playersHeight } = useElementBounding(players)

// copy
const { copy } = useClipboard({ legacy: true })
const toast = useToast()
const onQuickConnect = () => {
  copy(connect.value)
  toast.add({ title: 'Copied!' })
}
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
}

.box {
  height: 0;
  transition: all 0.4s;
  overflow: hidden;
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
  cursor: pointer;

  &.loading {
    background: url('@/assets/svgs/loader.svg') center / contain no-repeat;
    animation: rotate 1s linear infinite;
  }
}

.refresh-icon {
  background: url('@/assets/svgs/refresh.svg') center / contain no-repeat;
  cursor: pointer;

  &.loading {
    background: url('@/assets/svgs/loader.svg') center / contain no-repeat;
    animation: rotate 1s linear infinite;
  }
}

.mods-icon {
  background: url('@/assets/svgs/mods.svg') center / contain no-repeat;
  cursor: pointer;
}

.players-icon {
  background: url('@/assets/svgs/players.svg') center / contain no-repeat;
  cursor: pointer;
}

.move-icon {
  background: url('@/assets/svgs/move.svg') center / contain no-repeat;
  cursor: grab;
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
