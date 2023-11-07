<template>
  <div class="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
    <ServerCard v-for="server in servers" :server="server"></ServerCard>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['keyword'])
const { servers, getServers } = useServers(props.keyword)

onMounted(() => {
  getServers()
})
</script>
