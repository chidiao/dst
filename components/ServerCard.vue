<template>
  <div class="border rounded p-4" v-auto-animate>
    <div class="flex flex-col items-start md:flex-row md:justify-between md:items-center">
      <div class="text-sm font-bold cursor-pointer" @click="getDetails">{{ server?.Name }}</div>
      <div class="text-xs text-blue-500 my-1 md:my-0">{{ connect }}</div>
    </div>

    <div v-if="server?.ModsInfo" class="py-2 space-y-4">
      <UDivider class="my-2" label="Mods" type="dashed" :ui="{ label: 'text-xs' }" />

      <div class="text-xs flex flex-wrap gap-2">
        <UTooltip class="dark" v-for="mod in server.ModsInfo" :text="mod.Id">
          <a :href="`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.Id}`" target="_blank" class="mod">
            {{ mod.Name }}
          </a>
        </UTooltip>
      </div>
    </div>

    <div v-if="server?.Players" class="py-2 space-y-4">
      <UDivider class="my-2" label="Players" type="dashed" :ui="{ label: 'text-xs' }" />

      <div class="text-xs flex flex-wrap gap-2">
        <UTooltip class="dark" v-for="player in server.Players" :text="player.NetId">
          <a
            :href="`https://steamcommunity.com/profiles/${player.NetId}`"
            :style="{ '--bg': `#${player.Color}` }"
            target="_blank"
            class="mod"
          >
            {{ player.Name }}
          </a></UTooltip
        >
      </div>
    </div>
  </div>
</template>

<script setup>
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
const getDetails = async () => {
  const res = await serverApi.details(props.server?.RowId)

  emit('update', res.Server)
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
