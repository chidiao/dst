<template>
  <div class="flex flex-wrap">
    <IconButton
      v-for="i in icons"
      :key="i.text"
      :icon="i.icon"
      @click="onCopy(i.icon)"
    ></IconButton>
  </div>
</template>

<script lang="ts" setup>
const { icons } = useIcons()
const toast = useToast()
const { copy } = useClipboard({ legacy: true })

const onCopy = (text: string) => {
  copy(text)
  toast.add({ title: 'Copied!' })
}
</script>
