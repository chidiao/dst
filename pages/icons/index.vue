<template>
  <div class="container max-w-screen-lg mx-auto p-5">
    <div ref="el" class="grid" :style="{ 'grid-template-columns': `repeat(${cols}, minmax(0, 1fr))` }">
      <div
        v-for="icon in DST_ICONS"
        class="aspect-[1/1] cursor-pointer flex justify-center items-center bg-contain bg-[url('@/assets/img/bg-btn.png')] transition active:translate-y-1"
        @click="onCopy(icon.icon)"
      >
        <div>{{ icon.icon }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const el = ref()
const { width } = useElementBounding(el)
const cols = computed(() => Math.floor(width.value / 48))

const toast = useToast()
const { copy } = useClipboard({
  legacy: true
})
const onCopy = (text) => {
  copy(text)
  toast.add({
    title: `${text} Copied! ${text}`
  })
}
</script>
