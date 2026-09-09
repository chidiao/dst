<script setup>
import { Toaster } from 'vue-sonner'

useHead({
  titleTemplate: (chunk) => (chunk ? `${chunk} · DST 服务器` : 'DST 服务器')
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster
      theme="dark"
      rich-colors
      position="bottom-right"
      :toast-options="{
        class: 'font-sans text-sm'
      }"
    />
  </div>
</template>