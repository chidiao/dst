<template>
  <div class="flex flex-col gap-4 p-4 md:gap-6 md:p-6" ref="el">
    <ServerCard v-for="server in servers" :server="server" :key="server.RowId"></ServerCard>
  </div>
</template>

<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
const props = defineProps(['keyword'])
const { servers, getServers } = useServers(props.keyword)

const el = ref()
useSortable(el, servers, {
  handle: '.move-icon'
})

onMounted(() => {
  getServers()
})
</script>
