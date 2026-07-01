<script setup lang="ts">
/**
 * 透视网格背景 —— 复刻 Inspira UI Retro Grid
 * 远近透视的网格地平线，给 Hero 区纵深空间感。
 */
withDefaults(defineProps<{ class?: string }>(), { class: '' })
</script>

<template>
  <div
    :class="[
      'pointer-events-none absolute inset-0 overflow-hidden [perspective:500px]',
      $props.class,
    ]"
    style="--grid-color: color-mix(in oklab, var(--color-brand-400) 25%, transparent)"
  >
    <div
      class="absolute inset-0 [transform:rotateX(60deg)]"
      style="
        background-image: linear-gradient(var(--grid-color) 1px, transparent 1px),
          linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
        background-size: 40px 40px;
        mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
      "
    />
  </div>
</template>
