<template>
  <header>
    <div class="placeholder" :class="[style.height]"></div>

    <div class="w-full bg-white fixed z-50 left-0 top-0 shadow" :class="[style.height]">
      <div class="max-w-5xl h-full mx-auto px-5 flex justify-end items-center space-x-3">
        <NuxtLink to="/servers">
          <UButton>Servers</UButton>
        </NuxtLink>

        <NuxtLink to="/icons">
          <UButton>Icons</UButton>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({})
const style = {
  height: 'h-14'
}
</script>
