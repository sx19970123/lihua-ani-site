<script setup lang="ts">
/**
 * 渐变流动文字 —— 复刻 Inspira UI Animated Gradient Text
 * 文字带流动渐变 + 微闪光，用于标签/标题点缀。
 */
withDefaults(defineProps<{ class?: string }>(), { class: '' })
</script>

<template>
  <span
    :class="[
      'inline animate-gradient bg-gradient-to-r from-brand-400 via-brand-600 to-brand-400 bg-[length:var(--bg-size,300%)] bg-clip-text text-transparent',
      $props.class,
    ]"
    style="
      --bg-size: 300%;
      animation: shimmer 5s linear infinite;
    "
  >
    <slot />
  </span>
</template>
