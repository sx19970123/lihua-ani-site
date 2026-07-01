<script setup lang="ts">
/**
 * 闪光按钮 —— 复刻 Inspira UI Shimmer Button（基于 Magic UI）
 * 背景有高光从左向右流过的发光按钮，克制但吸睛的 CTA。
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    shimmerColor?: string
    shimmerSize?: string
    borderRadius?: string
    shimmerDuration?: string
    background?: string
    class?: string
  }>(),
  {
    shimmerColor: '#ffffff',
    shimmerSize: '0.06em',
    borderRadius: '100px',
    shimmerDuration: '3s',
    background: 'linear-gradient(135deg,#f2b35f,#c9954c)',
    class: '',
  },
)

const style = computed(() => ({
  '--spread': '90deg',
  '--shimmer-color': props.shimmerColor,
  '--radius': props.borderRadius,
  '--speed': props.shimmerDuration,
  '--cut': props.shimmerSize,
  '--bg': props.background,
}))
</script>

<template>
  <button
    :style="style"
    :class="[
      'group relative z-0 inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] transform-gpu transition-transform active:translate-y-px',
      'shadow-[0_4px_20px_-2px_rgba(242,179,95,0.5)]',
      props.class,
    ]"
  >
    <div
      class="absolute -z-30 blur-[1px] [background:var(--shimmer-color)] [background-position:var(--shimmer-distance)_0] [background-size:var(--size)_100%] [mask:var(--mask)] [--size:300%]"
    />
    <slot />
  </button>
</template>
