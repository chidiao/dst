<template>
  <div class="container max-w-screen-lg mx-auto p-5">
    <div class="space-y-4">
      <ServerCard v-for="server in list" :server="server" @update="onUpdate" />
    </div>
  </div>
</template>

<script setup>
const { name } = useRoute().params
const router = useRouter()
if (!name) {
  router.replace('/servers')
}

onMounted(() => {
  getList()
})

const { serverApi } = useApis()
const list = ref([])
const getList = async () => {
  const res = await serverApi.list(name)

  if (res) {
    list.value = res.List
  }
}

const onUpdate = (val) => {
  const idx = list.value.findIndex((item) => item.RowId == val.RowId)
  list.value.splice(idx, 1, val)
}
</script>
