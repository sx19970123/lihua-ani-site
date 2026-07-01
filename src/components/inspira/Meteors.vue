<script setup lang="ts">
/**
 * 流星 —— 复刻 Inspira UI Meteors（基于 Magic UI）
 * 背景斜向落下的流星线，给暗色 Hero 区氛围感。
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    number?: number
    class?: string
  }>(),
  {
    number: 20,
    class: '',
  },
)

const meteors = computed(() => Array.from({ length: props.number }))
</script>

<template>
  <div :class="['pointer-events-none absolute inset-0 overflow-hidden', props.class]">
    <span
      v-for="(_, i) in meteors"
      :key="i"
      class="absolute left-1/2 top-1/2 size-0.5 animate-meteor rounded-full bg-brand-300 shadow-[0_0_0_1px_#ffffff10] [transform:rotate(215deg)]"
      :style="{
        '--angle': '215deg',
        top: Math.floor(Math.random() * 100) + '%',
        left: Math.floor(Math.random() * 100) + '%',
        animationDelay: Math.random() * 5 + 's',
        animationDuration: Math.floor(Math.random() * 5 + 5) + 's',
      }"
    >
      <span class="absolute top-1/2 -z-10 h-px w-12 -translate-y-1/2 bg-gradient-to-r from-brand-300 to-transparent" />
    </span>
  </div>
</template>
