<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'

interface Props {
  radius?: number
  border?: number
  lightness?: number
  displace?: number
  blend?: string
  xChannel?: 'R' | 'G' | 'B'
  yChannel?: 'R' | 'G' | 'B'
  alpha?: number
  blur?: number
  rOffset?: number
  gOffset?: number
  bOffset?: number
  scale?: number
  frost?: number
  class?: HTMLAttributes['class']
  containerClass?: HTMLAttributes['class']
}

// Props definition
const props = withDefaults(defineProps<Props>(), {
  radius: 16,
  border: 0.07,
  lightness: 50,
  blend: 'difference',
  xChannel: 'R',
  yChannel: 'B',
  alpha: 0.93,
  blur: 11,
  rOffset: 0,
  gOffset: 10,
  bOffset: 20,
  scale: -180,
  frost: 0.05,
})

// Refs
const liquidGlassRoot = ref<HTMLElement | null>(null)
const dimensions = reactive({
  width: 0,
  height: 0,
})

// Chromium 内核才用 SVG 折射（backdrop-filter: url()），其余（Safari/Firefox/移动端）降级为高斯模糊
const isChromium = ref(false)

let observer: ResizeObserver | null = null

const baseStyle = computed(() => {
  return {
    '--frost': props.frost,
    'border-radius': `${props.radius}px`,
  }
})

// Computed displacement image
const displacementImage = computed(() => {
  const border = Math.min(dimensions.width, dimensions.height) * (props.border * 0.5)
  const yBorder = Math.min(dimensions.width, dimensions.height) * (props.border * 0.5)

  return `
    <svg viewBox="0 0 ${dimensions.width} ${dimensions.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="red"/>
        </linearGradient>
        <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0000"/>
          <stop offset="100%" stop-color="blue"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${dimensions.width}" height="${dimensions.height}" fill="black"></rect>
      <rect x="0" y="0" width="${dimensions.width}" height="${dimensions.height}" rx="${props.radius}" fill="url(#red)" />
      <rect x="0" y="0" width="${dimensions.width}" height="${dimensions.height}" rx="${props.radius}" fill="url(#blue)" style="mix-blend-mode: ${props.blend}" />
      <rect
        x="${border}"
        y="${yBorder}"
        width="${dimensions.width - border * 2}"
        height="${dimensions.height - yBorder * 2}"
        rx="${props.radius}"
        fill="hsl(0 0% ${props.lightness}% / ${props.alpha})"
        style="filter:blur(${props.blur}px)"
      />
    </svg>
  `
})

// Data URI for SVG filter
const displacementDataUri = computed(() => {
  const encoded = encodeURIComponent(displacementImage.value)
  return `data:image/svg+xml,${encoded}`
})

// Lifecycle hooks
onMounted(() => {
  if (!liquidGlassRoot.value) return

  // UA 检测：仅 Chromium 系（Chrome/Edge/Brave/Opera 等）用 SVG 折射。
  // 关键：纯 Safari/Firefox 的 UA 不含 "Chrome/"，而所有 Chromium 系都含。
  isChromium.value = /Chrome\//.test(navigator.userAgent)

  observer = new ResizeObserver((entries) => {
    const entry = entries[0]
    if (!entry) return

    let width = 0
    let height = 0

    if (entry.borderBoxSize && entry.borderBoxSize?.length) {
      width = entry.borderBoxSize[0]!.inlineSize
      height = entry.borderBoxSize[0]!.blockSize
    } else if (entry.contentRect) {
      width = entry.contentRect.width
      height = entry.contentRect.height
    }

    dimensions.width = width
    dimensions.height = height
  })

  observer.observe(liquidGlassRoot.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="liquidGlassRoot"
    :style="baseStyle"
    :class="cn(`effect`, isChromium ? 'effect-glass' : 'effect-fallback', props.containerClass)"
  >
    <div :class="cn(`slot-container`, props.class)">
      <slot />
    </div>

    <!-- 仅 Chromium 系渲染 SVG 折射 filter；其余内核不渲染，降级为高斯模糊 -->
    <svg v-if="isChromium" class="filter" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="displacementFilter" color-interpolation-filters="sRGB">
          <feImage
            x="0"
            y="0"
            width="100%"
            height="100%"
            :href="displacementDataUri"
            result="map"
          />
          <feDisplacementMap
            id="redchannel"
            in="SourceGraphic"
            in2="map"
            :xChannelSelector="xChannel"
            :yChannelSelector="yChannel"
            :scale="scale + rOffset"
            result="dispRed"
          />
          <feColorMatrix
            in="dispRed"
            type="matrix"
            values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
            result="red"
          />
          <feDisplacementMap
            id="greenchannel"
            in="SourceGraphic"
            in2="map"
            :xChannelSelector="xChannel"
            :yChannelSelector="yChannel"
            :scale="scale + gOffset"
            result="dispGreen"
          />
          <feColorMatrix
            in="dispGreen"
            type="matrix"
            values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"
            result="green"
          />
          <feDisplacementMap
            id="bluechannel"
            in="SourceGraphic"
            in2="map"
            :xChannelSelector="xChannel"
            :yChannelSelector="yChannel"
            :scale="scale + bOffset"
            result="dispBlue"
          />
          <feColorMatrix
            in="dispBlue"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"
            result="blue"
          />
          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" result="output" />
          <feGaussianBlur :stdDeviation="displace" />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<style scoped>
.effect {
  position: relative;
  display: block;
  opacity: 1;
  border-radius: inherit;
  /* 用项目主题色变量（main.css 已按 .dark 切换），不依赖 light-dark()/color-scheme，兼容性更好 */
  background: color-mix(in oklab, var(--bg) calc(var(--frost, 0) * 100%), transparent);
}

/* Chromium 系：液态玻璃折射（SVG displacement filter） */
.effect-glass {
  backdrop-filter: url(#displacementFilter);
}

/* 非 Chromium（Safari/Firefox/移动端）：降级为高斯模糊 + 饱和 */
.effect-fallback {
  backdrop-filter: saturate(180%) blur(12px);
  -webkit-backdrop-filter: saturate(180%) blur(12px);
}

.slot-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
}

.filter {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
