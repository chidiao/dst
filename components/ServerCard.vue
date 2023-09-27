<template>
  <a-card size="small" :bordered="true">
    <div class="card">{{ server.Name }}</div>
  </a-card>
</template>

<script setup lang="ts">
import { Server, ServerDetails, getServer } from '@/composables/useServers'

const props = defineProps<{
  server: Server
}>()

onMounted(() => {
  getData()
})

const details = ref<ServerDetails>()
const connect = computed(() => {
  if (!details.value) return ''
  return `c_connect("${details.value?.Address}",${details.value?.Port})`
})
const getData = async () => {
  const { data } = await getServer(props.server.RowId)
  details.value = data.value
}
</script>

<style lang="scss" scoped>
.card {
  font-family: dst;
}
</style>
