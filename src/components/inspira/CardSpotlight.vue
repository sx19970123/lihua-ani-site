<script setup lang="ts">
/**
 * 聚光卡片 —— Inspira UI CardSpotlight
 * 鼠标在卡片上移动时，跟随一个柔和的径向聚光，并伴随轻微 3D 倾斜。
 * https://inspira-ui.com/docs/components/card-spotlight
 */
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    slotClass?: HTMLAttributes['class']
    gradientSize?: number
    gradientColor?: string
    gradientOpacity?: number
    /** 3D 倾斜最大角度（度） */
    tiltMax?: number
  }>(),
  {
    class: '',
    slotClass: '',
    gradientSize: 200,
    gradientColor: '#262626',
    gradientOpacity: 0.8,
    tiltMax: 8,
  },
)

const mouseX = ref(-props.gradientSize * 10)
const mouseY = ref(-props.gradientSize * 10)
const rotateX = ref(0)
const rotateY = ref(0)

function handleMouseMove(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  mouseX.value = x
  mouseY.value = y
  // 鼠标相对中心的归一化位置 (-0.5 ~ 0.5)，映射到倾斜角度
  const px = x / rect.width - 0.5
  const py = y / rect.height - 0.5
  rotateY.value = px * props.tiltMax * 2
  rotateX.value = -py * props.tiltMax * 2
}

function handleMouseLeave() {
  mouseX.value = -props.gradientSize * 10
  mouseY.value = -props.gradientSize * 10
  rotateX.value = 0
  rotateY.value = 0
}

onMounted(() => {
  mouseX.value = -props.gradientSize * 10
  mouseY.value = -props.gradientSize * 10
})

const backgroundStyle = computed(() => {
  return `radial-gradient(
    ${props.gradientSize}px circle at ${mouseX.value}px ${mouseY.value}px,
    ${props.gradientColor} 0%,
    rgba(0, 0, 0, 0) 70%
  )`
})

/** 3D 倾斜的内联 transform，回正时平滑过渡 */
const tiltStyle = computed(() => ({
  transform: `perspective(900px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`,
}))
</script>

<template>
  <div
    :class="
      cn(
        `group relative flex size-full overflow-hidden rounded-xl border border-[var(--border)] [transform-style:preserve-3d] transition-transform duration-200 ease-out`,
        props.class,
      )
    "
    :style="tiltStyle"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div :class="cn(`relative z-10 [transform:translateZ(40px)]`, props.slotClass)">
      <slot />
    </div>
    <div
      class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="{
        background: backgroundStyle,
        opacity: gradientOpacity,
      }"
    />
  </div>
</template>
