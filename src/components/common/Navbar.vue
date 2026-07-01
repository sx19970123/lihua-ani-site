<script setup lang="ts">
/**
 * 顶部导航栏 —— 液态玻璃全宽顶部导航条
 * 用 LiquidGlass（Inspira UI）替代旧的 .glass，保留全部原有交互与内容。
 */
import { useRouter } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'
import LiquidGlass from '@/ui/liquid-glass'

const router = useRouter()

function goHome() {
  router.push('/')
}

function scrollToFeatures() {
  // 在首页才滚动，否则先回首页
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }), 100)
    })
  } else {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
  }
}

function scrollToDownload() {
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' }), 100)
    })
  } else {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50">
    <!-- 液态玻璃容器：承担 backdrop-filter 折射 + 边缘高光 + 深度阴影 -->
    <LiquidGlass
      container-class="relative block w-full border-b border-[var(--border)]/60"
      :radius="0"
      :frost="0.4"
    >
      <div class="container-page flex h-16 items-center justify-between gap-4">
        <!-- Logo + 品牌名 -->
        <button class="flex shrink-0 items-center gap-2" @click="goHome">
          <img src="/images/logo.png" alt="狸花番研部" class="size-9 rounded-xl" />
          <div class="hidden flex-col items-start leading-none sm:flex">
            <span class="text-base font-bold tracking-tight">狸花番研部</span>
            <span class="text-[10px] text-[var(--fg-muted)]">Lihua Ani</span>
          </div>
        </button>

        <!-- 导航：功能介绍 / 下载 锚点 -->
        <div class="flex items-center gap-2">
          <button
            class="rounded-full px-4 py-2 text-sm font-medium text-[var(--fg-muted)] transition-colors hover:text-brand-500"
            @click="scrollToFeatures"
          >
            功能介绍
          </button>
          <button
            class="rounded-full px-4 py-2 text-sm font-medium text-[var(--fg-muted)] transition-colors hover:text-brand-500"
            @click="scrollToDownload"
          >
            下载
          </button>
          <ThemeToggle />
        </div>
      </div>
    </LiquidGlass>
  </header>
</template>
