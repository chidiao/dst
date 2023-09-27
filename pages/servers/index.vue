<template>
  <div class="flex flex-col gap-2 p-2">
    <ServerCard v-for="server in servers" :server="server"></ServerCard>
  </div>
</template>

<script setup lang="ts">
const { servers, getServers } = useServers('原来你也在这里')

onMounted(() => {
  getServers()
})
</script>
