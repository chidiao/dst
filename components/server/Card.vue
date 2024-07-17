<template>
  <div class="border rounded p-4" v-auto-animate>
    <div class="flex flex-col items-start md:flex-row md:justify-between md:items-center">
      <div class="text-sm font-bold flex items-center cursor-pointer" @click="getDetails">
        <div>{{ server?.Name }}</div>
        <SvgLoader v-if="loading" class="size-3 animate-spin mx-1" />
      </div>

      <div class="text-xs text-blue-500 cursor-pointer my-1 md:my-0" @click="onCopy(connect)">{{ connect }}</div>
    </div>

    <div v-if="server?.Description">
      <UDivider class="my-2" label="信息" type="dashed" :ui="{ label: 'text-xs' }" />

      <div class="text-xs">
        <div>描述：{{ server?.Description }}</div>
      </div>
    </div>

    <div v-if="server?.ModsInfo" class="py-2 space-y-4">
      <UDivider class="my-2" label="模组" type="dashed" :ui="{ label: 'text-xs' }" />

      <div class="text-xs flex flex-wrap gap-2">
        <UTooltip class="dark" v-for="mod in server.ModsInfo" :text="mod.Id">
          <a :href="communityLink(mod.Id)" target="_blank" class="mod">
            {{ mod.Name }}
          </a>
        </UTooltip>
      </div>
    </div>

    <div v-if="server?.Players" class="py-2 space-y-4">
      <UDivider class="my-2" label="玩家" type="dashed" :ui="{ label: 'text-xs' }" />

      <div class="text-xs flex flex-wrap gap-2">
        <UTooltip class="dark" v-for="player in server.Players" :text="player.NetId">
          <a :href="playerLink(player.NetId)" :style="{ '--bg': `#${player.Color}` }" target="_blank" class="mod">
            {{ `${player.Name}(${player.Prefab})` }}
          </a></UTooltip
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgLoader from '@/assets/svg/loader.svg'

const props = defineProps({
  server: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(['update'])

const connect = computed(() => {
  return `c_connect("${props.server?.Address?.IP}",${props.server?.Port})`
})

const { serverApi } = useApis()
const loading = ref(false)
const getDetails = async () => {
  loading.value = true
  const res = await serverApi.details(props.server?.RowId)
  loading.value = false

  emit('update', res.Server)
}

const communityLink = (id) => `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`
const playerLink = (id) => `https://steamcommunity.com/profiles/${id}`

const toast = useToast()
const { copy } = useClipboard({
  legacy: true
})
const onCopy = (text) => {
  copy(text)
  toast.add({
    title: 'Copied!'
  })
}
</script>

<style>
.mod {
  --bg: #165dff;

  background: var(--bg);
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px #0003, 0 2px 2px #00000024, 0 1px 5px #0000001f;
  color: #fff;
  cursor: pointer;
  letter-spacing: 1px;
  padding: 6px 12px;
}
</style>
