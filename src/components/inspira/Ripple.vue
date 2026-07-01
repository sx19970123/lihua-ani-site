<script setup lang="ts">
/**
 * 涟漪 —— 复刻 Inspira UI Ripple
 * 从中心扩散的同心圆，给 Hero 区柔和的呼吸感。
 */
withDefaults(defineProps<{ class?: string; numCircles?: number }>(), {
  class: '',
  numCircles: 4,
})
</script>

<template>
  <div :class="['pointer-events-none absolute inset-0 flex items-center justify-center', $props.class]">
    <div
      v-for="i in numCircles"
      :key="i"
      class="absolute aspect-circle animate-ripple rounded-full border border-brand-400/20"
      :style="{
        '--i': i,
        width: `${30 + i * 18}%`,
        height: `${30 + i * 18}%`,
        animationDelay: `${(i - 1) * 0.4}s`,
      }"
    />
  </div>
</template>
