<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useModal } from '@/composables/useModal'

const router = useRouter()
const { open } = useModal()

// 功能/下载为首页锚点；隐私政策/捐赠为弹窗
function scrollToAnchor(id: string) {
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100)
    })
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="border-t border-[var(--border)] bg-[var(--bg-soft)]">
    <div class="container-page flex flex-col items-center gap-8 py-12 md:flex-row md:justify-between">
      <!-- 品牌 -->
      <div class="flex flex-col items-center gap-3 md:items-start">
        <div class="flex items-center gap-2">
          <img src="/images/logo.png" alt="" class="size-8 rounded-lg" />
          <span class="font-bold">狸花番研部</span>
        </div>
        <p class="max-w-xs text-center text-sm text-[var(--fg-muted)] md:text-left">
          AI 驱动的番剧发现工具，发现下一部想看的番。
        </p>
      </div>

      <!-- 链接 -->
      <nav class="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <button
          class="text-sm text-[var(--fg-muted)] transition-colors hover:text-brand-500"
          @click="scrollToAnchor('features')"
        >
          功能介绍
        </button>
        <button
          class="text-sm text-[var(--fg-muted)] transition-colors hover:text-brand-500"
          @click="scrollToAnchor('download')"
        >
          下载
        </button>
        <button
          class="text-sm text-[var(--fg-muted)] transition-colors hover:text-brand-500"
          @click="open('privacy')"
        >
          隐私政策
        </button>
        <button
          class="text-sm text-[var(--fg-muted)] transition-colors hover:text-brand-500"
          @click="open('donate')"
        >
          捐赠
        </button>
      </nav>
    </div>
    <div class="border-t border-[var(--border)]">
      <div class="container-page py-5 text-center text-xs text-[var(--fg-muted)]">
        © {{ new Date().getFullYear() }} 狸花番研部 · 动画数据来自 Bangumi & bangumi-data
      </div>
    </div>
  </footer>
</template>
