<script setup lang="ts">
import { toast } from 'vue-sonner'
import bgImg from '~/assets/img/bg-btn.png'

useHead({
  title: '图标'
})

const el = ref<HTMLElement>()
const { width } = useElementBounding(el)
const cols = computed(() => Math.max(4, Math.floor(width.value / 64)))

const { copy } = useClipboard({ legacy: true })

const onCopy = (icon: (typeof DST_ICONS)[number]) => {
  copy(icon.icon)
  toast.success(`已复制「${icon.text}」图标`, {
    description: icon.icon,
    classes: { description: 'font-dst' }
  })
}
</script>

<template>
  <div class="wrap py-8 sm:py-12">
    <section class="mb-8">
      <div class="flex items-center gap-3">
        <span class="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 text-xl text-stone-950 shadow-lg shadow-orange-900/40">
          <span class="i-lucide-grid-3x3" />
        </span>
        <div>
          <h1 class="text-2xl font-bold text-stone-100 sm:text-3xl">DST 图标</h1>
          <p class="mt-0.5 text-sm text-stone-400">点击任意图标即可复制，可用于聊天、签名框等</p>
        </div>
      </div>
    </section>

    <div
      ref="el"
      class="grid gap-2.5 sm:gap-3"
      :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }"
    >
      <button
        v-for="icon in DST_ICONS"
        :key="icon.text"
        class="group relative flex aspect-square flex-col items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-900/30 active:scale-95"
        :style="{ backgroundImage: `url(${bgImg})` }"
        :title="icon.text"
        @click="onCopy(icon)"
      >
        <span class="dst-font text-2xl leading-none text-stone-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-transform group-hover:scale-110">
          {{ icon.icon }}
        </span>
      </button>
    </div>
  </div>
</template>