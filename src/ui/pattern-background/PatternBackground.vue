<script setup lang="ts">
/**
 * PatternBackground —— 动画网格 / 圆点背景
 * - 图案由 CSS 渐变绘制，size 控制单元格
 * - animate + direction 通过 background-position 的 keyframes 无缝滚动
 * - mask 是一层带 radial-gradient mask 的覆盖 div，做边缘渐隐
 * https://inspira-ui.com/docs/components/pattern-background
 */
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import {
  PATTERN_BACKGROUND_DIRECTION,
  PATTERN_BACKGROUND_SIZE,
  type PatternBackgroundDirection,
  type PatternBackgroundMask,
  type PatternBackgroundSize,
  type PatternBackgroundSpeed,
  type PatternBackgroundVariant,
} from './index'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    /** 是否开启滚动动画 */
    animate?: boolean
    /** 滚动方向 */
    direction?: PatternBackgroundDirection
    /** 图案样式：grid / dot / big-dot */
    variant?: PatternBackgroundVariant
    /** 单元格尺寸档位 */
    size?: PatternBackgroundSize
    /** 滚动速度（ms，一个完整周期） */
    speed?: PatternBackgroundSpeed
    /** 边缘渐隐蒙版 */
    mask?: PatternBackgroundMask | null
  }>(),
  {
    class: '',
    animate: false,
    direction: PATTERN_BACKGROUND_DIRECTION.Top,
    variant: 'grid',
    size: 'md',
    speed: 10000,
    mask: null,
  },
)

/** 网格 / 圆点背景渐变（同一图层下，亮 / 暗模式各一组颜色叠加）
 *  grid：横向 + 纵向网格线；dot / big-dot：单层圆点 */
const backgroundImage = computed(() => {
  switch (props.variant) {
    case 'big-dot':
      return 'radial-gradient(#d4d4d4 3px, transparent 3px)'
    case 'dot':
      return 'radial-gradient(#d4d4d4 1px, transparent 1px)'
    case 'grid':
    default:
      return [
        'linear-gradient(to right, #e4e4e7 1px, transparent 1px)',
        'linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)',
      ].join(', ')
  }
})

/** 暗色模式下的同形渐变（由 :global(.dark) 覆盖 background-image） */
const backgroundImageDark = computed(() => {
  switch (props.variant) {
    case 'big-dot':
      return 'radial-gradient(#404040 3px, transparent 3px)'
    case 'dot':
      return 'radial-gradient(#404040 1px, transparent 1px)'
    case 'grid':
    default:
      return [
        'linear-gradient(to right, #262626 1px, transparent 1px)',
        'linear-gradient(to bottom, #262626 1px, transparent 1px)',
      ].join(', ')
  }
})

/** 单元格像素尺寸 */
const sizePx = computed(() => PATTERN_BACKGROUND_SIZE[props.size])

/** 根元素图案样式 */
const patternStyle = computed(() => ({
  backgroundImage: backgroundImage.value,
  backgroundImageDark: backgroundImageDark.value,
  backgroundSize: `${sizePx.value} ${sizePx.value}`,
  animationDuration: `${props.speed}ms`,
}))

/** 蒙版覆盖层的 mask 渐变 */
const maskStyle = computed(() => {
  switch (props.mask) {
    case 'ellipse':
      return 'radial-gradient(ellipse at center, transparent 20%, black)'
    case 'ellipse-top':
      return 'radial-gradient(ellipse at top, transparent 20%, black)'
    default:
      return ''
  }
})

/** 动画方向 class */
const animateClass = computed(
  () => (props.animate && props.direction ? `pattern-background-animate-${props.direction}` : ''),
)
</script>

<template>
  <div
    :class="
      cn(
        'pattern-background pointer-events-none relative flex size-full items-center justify-center',
        animateClass,
        props.class,
      )
    "
    :style="patternStyle"
  >
    <slot />

    <!-- 边缘渐隐蒙版：盖在图案上，中心 / 顶部透明露出图案，边缘用页面背景色覆盖 -->
    <div
      v-if="mask"
      class="pattern-background-mask absolute inset-0"
      :style="{ maskImage: maskStyle, WebkitMaskImage: maskStyle }"
    />
  </div>
</template>

<style scoped>
.pattern-background {
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* 暗色模式切换图层颜色 */
:global(.dark) .pattern-background {
  background-image: var(--background-image-dark);
}

.pattern-background-mask {
  background-color: var(--bg);
}

/* 8 个方向的 background-position 无缝滚动动画 */
.pattern-background-animate-top { animation-name: pattern-move-top; }
.pattern-background-animate-bottom { animation-name: pattern-move-bottom; }
.pattern-background-animate-left { animation-name: pattern-move-left; }
.pattern-background-animate-right { animation-name: pattern-move-right; }
.pattern-background-animate-top-left { animation-name: pattern-move-top-left; }
.pattern-background-animate-top-right { animation-name: pattern-move-top-right; }
.pattern-background-animate-bottom-left { animation-name: pattern-move-bottom-left; }
.pattern-background-animate-bottom-right { animation-name: pattern-move-bottom-right; }

@keyframes pattern-move-top {
  from { background-position: 0 100%; }
  to { background-position: 0 0; }
}
@keyframes pattern-move-bottom {
  from { background-position: 0 0; }
  to { background-position: 0 100%; }
}
@keyframes pattern-move-left {
  from { background-position: 100% 0; }
  to { background-position: 0 0; }
}
@keyframes pattern-move-right {
  from { background-position: 0 0; }
  to { background-position: 100% 0; }
}
@keyframes pattern-move-top-left {
  from { background-position: 100% 100%; }
  to { background-position: 0 0; }
}
@keyframes pattern-move-top-right {
  from { background-position: 0 100%; }
  to { background-position: 100% 0; }
}
@keyframes pattern-move-bottom-left {
  from { background-position: 100% 0; }
  to { background-position: 0 100%; }
}
@keyframes pattern-move-bottom-right {
  from { background-position: 0 0; }
  to { background-position: 100% 100%; }
}
</style>
