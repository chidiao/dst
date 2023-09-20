<template>
  <div class="dst-icon-btn">{{ icon }}</div>
</template>

<script lang="ts" setup>
defineProps<{
  icon: string
}>()
</script>

<style lang="scss" scoped>
.dst-icon-btn {
  width: 40px;
  height: 40px;
  font-size: 16px;
  background: url('~/assets/imgs/icon_button.png') center / cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s;

  &:active {
    transform: translate(1px, 2px);
    opacity: 0.9;
  }
}
</style>
