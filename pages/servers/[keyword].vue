<template>
  <ServerList :keyword="keyword"></ServerList>
</template>

<script setup lang="ts">
const route = useRoute()
const { keyword } = route.params
const { getVersion } = useServers()

onMounted(() => {
  getVersion()
})
</script>
