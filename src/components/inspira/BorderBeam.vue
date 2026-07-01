<script setup lang="ts">
/**
 * 光束描边 —— 复刻 Inspira UI BorderBeam
 * 沿元素边框循环移动的光点，给卡片/容器加克制的科技感。
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    duration?: number
    delay?: number
    size?: string | number
    /** 光束颜色 */
    colorFrom?: string
    colorTo?: string
    class?: string
  }>(),
  {
    duration: 6,
    delay: 0,
    size: '200px',
    colorFrom: '#f2b35f',
    colorTo: '#c9954c',
    class: '',
  },
)

const style = computed(() => ({
  '--size': typeof props.size === 'number' ? `${props.size}px` : props.size,
  '--duration': `${props.duration}s`,
  '--delay': `-${props.delay}s`,
  '--color-from': props.colorFrom,
  '--color-to': props.colorTo,
}))
</script>

<template>
  <div
    :style="style"
    :class="[
      'pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--size)*0.2)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]',
      'after:absolute after:aspect-square after:w-[calc(var(--size)*0.5)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--size)*-1)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size))))]',
      props.class,
    ]"
  />
</template>
