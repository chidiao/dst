<template>
  <div class="flex flex-wrap p-4 md:p-6">
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
const { copy } = useClipboard({ legacy: true })

const onCopy = (text: string) => {
  copy(text)
  message.success(`Copied!`)
}
</script>
