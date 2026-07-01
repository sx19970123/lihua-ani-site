<script lang="ts" setup>
/**
 * 跑马灯 —— Inspira UI Marquee（基于 Magic UI）
 * 横向 / 纵向无限滚动，支持反向、悬停暂停。
 * https://inspira-ui.com/docs/cn/components/miscellaneous/marquee
 *
 * 官方 registry 源码；额外保留 gap / duration 两个可选 prop，
 * 透传为 CSS 变量（--gap / --duration），向后兼容现有调用。
 */
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    reverse?: boolean
    pauseOnHover?: boolean
    vertical?: boolean
    repeat?: number
    /** 卡片间距，透传为 --gap CSS 变量 */
    gap?: string
    /** 滚动周期时长，透传为 --duration CSS 变量 */
    duration?: string
  }>(),
  {
    pauseOnHover: false,
    vertical: false,
    repeat: 4,
    gap: '1rem',
    duration: '40s',
  },
)

const rootStyle = {
  '--gap': props.gap,
  '--duration': props.duration,
}
</script>

<template>
  <div
    :class="
      cn(
        `group flex gap-(--gap) overflow-hidden p-2 [--gap:1rem]`,
        vertical ? 'flex-col' : 'flex-row',
        props.class,
      )
    "
    :style="rootStyle"
  >
    <div
      v-for="index in repeat"
      :key="index"
      :style="{
        animationDirection: reverse ? 'reverse' : 'normal',
      }"
      :class="
        cn(
          `flex shrink-0 justify-around gap-(--gap)`,
          vertical ? 'animate-marquee-vertical flex-col' : 'animate-marquee flex-row',
          pauseOnHover ? 'group-hover:[animation-play-state:paused]' : '',
        )
      "
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* 动画类 animate-marquee / animate-marquee-vertical 与对应 @keyframes
   由全局 main.css 的 @theme(--animate-marquee) 提供，此处不重复定义，
   避免 scoped 改写 keyframes 名导致两套定义并存。 */
</style>
