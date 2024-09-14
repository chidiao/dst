<template>
  <div class="container max-w-screen-lg mx-auto p-5">
    <div class="space-y-4" v-auto-animate>
      <div class="border rounded py-2 px-4 cursor-pointer" v-for="server in servers" @click="toList(server)">
        <div>{{ server }}</div>
      </div>

      <div class="border rounded py-2 px-4" v-show="!servers.length">添加一个记录吧</div>
    </div>

    <div class="w-full md:max-w-96 flex space-x-2 my-5">
      <UInput class="grow" size="md" v-model="server" placeholder="Server Name" />
      <UButton color="blue" @click="addServer">Add</UButton>
      <UButton color="red" @click="clearServers">Clear</UButton>
    </div>

    <div class="py-5">
      <div class="text-sm font-bold">多层世界配置(同服)</div>

      <div class="flex gap-5 mt-5">
        <div class="text-xs space-y-1 p-5 border rounded">
          <p>主世界 (aa.aa.aa.aa)</p>
          <p>bind_ip = 127.0.0.1</p>
          <p>master_ip = 127.0.0.1</p>
          <p>master_port = 10888</p>
        </div>

        <div class="text-xs space-y-1 p-5 border rounded">
          <p>从世界 (aa.aa.aa.aa)</p>
          <p>bind_ip = 127.0.0.1</p>
          <p>master_ip = 127.0.0.1</p>
          <p>master_port = 10888</p>
        </div>
      </div>
    </div>

    <div class="py-5">
      <div class="text-sm font-bold">多层世界配置(跨服)</div>

      <div class="flex gap-5 mt-5">
        <div class="text-xs space-y-1 p-5 border rounded">
          <p>主世界 (aa.aa.aa.aa)</p>
          <p>bind_ip = 0.0.0.0</p>
          <p>master_ip = 127.0.0.1</p>
          <p>master_port = 10888</p>
        </div>

        <div class="text-xs space-y-1 p-5 border rounded">
          <p>从世界 (bb.bb.bb.bb)</p>
          <p>bind_ip = 127.0.0.1</p>
          <p>master_ip = aa.aa.aa.aa</p>
          <p>master_port = 10888</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core'
const servers = useStorage('SERVERS', [])

const server = ref('')
const addServer = () => {
  if (server.value) {
    servers.value.push(server.value)
    server.value = ''
  }
}
const clearServers = () => {
  servers.value = []
}

const router = useRouter()
const toList = (server) => {
  router.push(`/servers/${server}`)
}
</script>
