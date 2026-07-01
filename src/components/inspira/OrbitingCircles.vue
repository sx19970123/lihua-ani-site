<script setup lang="ts">
/**
 * 环绕轨道 —— 复刻 Inspira UI Orbiting Circles
 * 多个元素绕中心做圆周运动，可作为 Hero 区背景装饰，呼应"AI 推荐"的运转感。
 */
const props = withDefaults(
  defineProps<{
    class?: string
    reverse?: boolean
  }>(),
  {
    class: '',
    reverse: false,
  },
)

interface OrbitItem {
  radius: number
  duration: number
  delay?: number
}

const orbits: OrbitItem[] = [
  { radius: 110, duration: 20, delay: -5 },
  { radius: 170, duration: 30, delay: -15 },
  { radius: 230, duration: 40, delay: -25 },
]
</script>

<template>
  <div :class="['relative flex size-full items-center justify-center', props.class]">
    <div
      v-for="(o, i) in orbits"
      :key="i"
      class="absolute rounded-full border border-dashed border-brand-300/20"
      :style="{ width: o.radius * 2 + 'px', height: o.radius * 2 + 'px' }"
    >
      <div
        class="size-3 rounded-full bg-brand-400 shadow-[0_0_12px_2px_rgba(242,179,95,0.6)] animate-orbit"
        :style="{
          '--duration': o.duration,
          '--radius': o.radius,
          animationDelay: (o.delay ?? 0) + 's',
          animationDirection: reverse ? 'reverse' : 'normal',
        }"
      />
    </div>
    <slot />
  </div>
</template>
