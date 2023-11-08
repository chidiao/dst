<template>
  <div class="topnav shadow">
    <div class="container max-w-5xl h-full mx-auto p-2 md:p-4">
      <div class="links px-4 gap-8">
        <div
          class="link"
          :class="{ active: route.path == `/servers/${l.keyword}` }"
          v-for="l in links"
          @click="toServerList(l.keyword)"
        >
          {{ l.word }}
        </div>
        <div class="link ml-auto" :class="{ active: route.path == `/icons` }" @click="toIcons">
          Icons
        </div>
      </div>
    </div>
  </div>

  <div class="topnav-placeholder"></div>
</template>

<script setup lang="ts">
const links = ref([
  {
    word: '原来',
    keyword: '原来你也在这里'
  },
  {
    word: '画心',
    keyword: '画心'
  },
  {
    word: '蛋挞',
    keyword: '蛋挞'
  }
])

const route = useRoute()
const router = useRouter()
const toServerList = (keyword: string) => {
  router.push(`/servers/${keyword}`)
}
const toIcons = () => router.push('/icons')
</script>

<style lang="scss" scoped>
.topnav,
.topnav-placeholder {
  width: 100%;
  height: 50px;
}

.topnav {
  position: fixed;
  background: #fff;
  font-size: 14px;
}

.links {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  .link {
    cursor: pointer;
    position: relative;
  }
}
</style>
