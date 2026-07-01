<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Download, ChevronDown, Smartphone, Apple, History, Sparkles } from 'lucide-vue-next'
import Marquee from '@/components/inspira/Marquee.vue'
import OrbitingCircles from '@/components/inspira/OrbitingCircles.vue'
import CardSpotlight from '@/components/inspira/CardSpotlight.vue'
import ShimmerButton from '@/components/inspira/ShimmerButton.vue'
import AnimatedGradientText from '@/components/inspira/AnimatedGradientText.vue'
import { useModal } from '@/composables/useModal'
import { siteConfig } from '@/config/site.config'

const router = useRouter()
const { open } = useModal()

const { version, updateDate, heroImages, features, download } = siteConfig

// Hero 背景两行跑马灯：自动均分，反向滚动
const half = Math.ceil(heroImages.length / 2)
const heroRowTop = heroImages.slice(0, half)
const heroRowBottom = heroImages.slice(half)

// 截图公共路径前缀
const shotPath = (file: string) => `${import.meta.env.BASE_URL}images/screenshots/${file}`

// 安卓 APK 下载链接（指向 public/downloads/）
const apkUrl = computed(() => `${import.meta.env.BASE_URL}downloads/${download.apkFileName}`)
const apkEnabled = computed(() => !!download.apkFileName)

// iOS App Store 跳转链接
const iosUrl = computed(() =>
  download.iosAppStoreId ? `https://apps.apple.com/app/id${download.iosAppStoreId}` : '',
)
const iosEnabled = computed(() => !!download.iosAppStoreId)

function scrollToDownload() {
  document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToFeatures() {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}

// ===== 功能卡片全局等高 =====
// 网格默认只按行拉伸高度，跨行不等高。这里测量所有卡片内容区的最高值，
// 统一设为 min-height，让所有卡片（含跨行）等高。
const cardSlots = ref<HTMLElement[]>([])
const featureGrid = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

function equalizeCardHeights() {
  // 先清除旧的 min-height，才能测出真实内容高度
  cardSlots.value.forEach((el) => (el.style.minHeight = ''))
  void cardSlots.value[0]?.offsetWidth // 强制重排，确保清除已生效
  nextTick(() => {
    const maxH = cardSlots.value.reduce((max, el) => Math.max(max, el.offsetHeight), 0)
    if (maxH > 0) cardSlots.value.forEach((el) => (el.style.minHeight = `${maxH}px`))
  })
}

onMounted(() => {
  nextTick(equalizeCardHeights)
  // 只观察网格容器本身（窗口缩放 / 断点切换触发），不观察单个卡片，避免改 min-height 引发回环
  if (typeof ResizeObserver !== 'undefined' && featureGrid.value) {
    resizeObserver = new ResizeObserver(equalizeCardHeights)
    resizeObserver.observe(featureGrid.value)
  }
  window.addEventListener('resize', equalizeCardHeights)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  window.removeEventListener('resize', equalizeCardHeights)
})
</script>

<template>
  <!-- ============ Hero（跑马灯背景 + 蒙版 + 标题 + 下载） ============ -->
  <section id="top" class="hero-section relative grid place-items-center overflow-hidden">
    <!-- 背景跑马灯：两行手机截图，反向滚动；上下溢出由 section 隐藏 -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <!-- 上行：向左滚；整体下移，顶部被截、底部圆角露出 -->
      <div class="absolute inset-x-0 top-1/2 flex -translate-y-full flex-col pb-4">
        <Marquee :duration="'45s'" :repeat="4" gap="0.5rem" class="w-full p-0 opacity-70 [--gap:0.5rem]">
          <div
            v-for="(file, i) in heroRowTop"
            :key="'t' + i"
            class="hero-shot relative aspect-[9/19.5] shrink-0 overflow-hidden rounded-3xl border-2 border-brand-600/80 bg-[var(--bg-soft)]"
          >
            <img
              :src="shotPath(file)"
              alt=""
              class="size-full object-cover"
              @error="(e: Event) => ((e.target as HTMLImageElement).style.opacity = '0')"
            />
          </div>
        </Marquee>
      </div>
      <!-- 下行：向右滚（reverse）；居中溢出（现状） -->
      <div class="absolute inset-x-0 top-1/2 flex translate-y-4 flex-col">
        <Marquee :duration="'45s'" :repeat="4" reverse gap="0.5rem" class="w-full p-0 opacity-70 [--gap:0.5rem]">
          <div
            v-for="(file, i) in heroRowBottom"
            :key="'b' + i"
            class="hero-shot relative aspect-[9/19.5] shrink-0 overflow-hidden rounded-3xl border-2 border-brand-600/80 bg-[var(--bg-soft)]"
          >
            <img
              :src="shotPath(file)"
              alt=""
              class="size-full object-cover"
              @error="(e: Event) => ((e.target as HTMLImageElement).style.opacity = '0')"
            />
          </div>
        </Marquee>
      </div>
    </div>

    <!-- 蒙版：径向遮罩，中央半透保证文字可读，边缘融入背景。
         用 dark: 变体显式声明亮/暗颜色，不依赖 color-mix()（部分移动端不支持） -->
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_center,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.92)_100%)] dark:bg-[radial-gradient(ellipse_70%_60%_at_center,rgba(36,38,40,0.55)_0%,rgba(36,38,40,0.92)_100%)]"
    />
    <!-- 上下渐隐：显式亮/暗颜色 -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(to_bottom,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(to_bottom,rgba(36,38,40,1)_0%,rgba(36,38,40,0)_100%)] sm:h-28"
    />
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,rgba(255,255,255,1)_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(to_top,rgba(36,38,40,1)_0%,rgba(36,38,40,0)_100%)] sm:h-28"
    />

    <!-- 前景：标题 + 下载 -->
    <div class="container-page relative z-10 flex w-full flex-col items-center text-center">
      <div
        v-motion
        :initial="{ opacity: 0, y: 16 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
        class="mb-6 inline-flex items-center gap-1.5 rounded-full border border-brand-400/40 bg-brand-400/15 px-4 py-1.5 text-xs font-medium text-brand-600 shadow-sm backdrop-blur-sm dark:text-brand-300"
      >
        <Sparkles :size="13" />
        <AnimatedGradientText>AI 驱动的番剧发现 app</AnimatedGradientText>
      </div>

      <h1
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 80 } }"
        class="max-w-3xl text-4xl font-extrabold leading-[1.15] tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl"
      >
        发现下一部<br class="hidden sm:block" />
        想看的<span class="text-gradient">番</span>
      </h1>

      <p
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 160 } }"
        class="mt-6 max-w-xl text-base text-[var(--fg-muted)] sm:text-lg"
      >
        用追番日历追踪每季更新，用 AI 推荐发现下一部想看的番。
      </p>

      <!-- 下载 -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 240 } }"
        class="mt-10 flex justify-center"
      >
        <ShimmerButton class="px-8 py-3.5 text-base font-semibold" @click="scrollToDownload">
          <Download :size="18" class="mr-2" />
          下载 App
        </ShimmerButton>
      </div>
    </div>

    <!-- 向下提示 -->
    <button class="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[var(--fg-muted)]" aria-label="向下" @click="scrollToFeatures">
      <ChevronDown :size="22" class="animate-bounce" />
    </button>
  </section>

  <!-- ============ 功能介绍（静态网格） ============ -->
  <section id="features" class="py-20 md:py-28">
    <div class="container-page">
      <!-- 标题 -->
      <div class="mx-auto mb-14 max-w-2xl text-center">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">功能介绍</h2>
        <p class="mt-4 text-[var(--fg-muted)]">围绕检索、日历、推荐、收藏与排名，覆盖追番全流程</p>
      </div>

      <!-- 功能网格：标题 + 描述 -->
      <div ref="featureGrid" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CardSpotlight
          v-for="(f, i) in features"
          :key="f.name"
          class="flex h-full flex-col items-center rounded-3xl bg-[var(--bg)] p-8 text-center text-[var(--fg)]"
          slot-class="flex h-full flex-col items-center"
          :gradient-color="'#f2b35f'"
          :gradient-opacity="0.15"
          :gradient-size="220"
        >
          <div :ref="(el) => { if (el) cardSlots[i] = el as HTMLElement }" class="flex h-full flex-col items-center">
            <h3 class="mb-1 text-lg font-bold">{{ f.name }}</h3>
            <p class="mb-3 text-xs font-medium text-brand-600 dark:text-brand-300">{{ f.tagline }}</p>
            <p class="flex-1 text-sm leading-relaxed text-[var(--fg-muted)]">{{ f.desc }}</p>
          </div>
        </CardSpotlight>
      </div>
    </div>
  </section>

  <!-- ============ 下载 ============ -->
  <section id="download" class="pt-20 pb-32 md:pt-28 md:pb-40">
    <div class="container-page">
      <!-- 标题 -->
      <div class="mx-auto mb-14 max-w-2xl text-center">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">立即下载</h2>
        <p class="mt-4 text-[var(--fg-muted)]">支持 Android 与 iOS 平台</p>
      </div>

      <!-- CTA 卡片：标题 + 安卓/iOS 双按钮（聚光 + 3D 倾斜） -->
      <CardSpotlight
        class="relative flex-col items-center overflow-hidden rounded-[2rem] border-brand-400/20 bg-gradient-to-br from-brand-50 to-[var(--bg-soft)] px-6 py-14 text-center dark:from-[var(--bg-soft)]"
        slot-class="relative z-10 flex w-full flex-col items-center"
        :gradient-color="'#f2b35f'"
        :gradient-opacity="0.18"
        :gradient-size="320"
        :tilt-max="6"
      >
        <OrbitingCircles class="pointer-events-none absolute inset-0 opacity-20" />
        <h2 class="text-2xl font-bold sm:text-3xl">开始你的追番之旅</h2>
        <button
          class="mt-3 inline-flex items-center gap-1 text-xs text-[var(--fg-muted)] transition-colors hover:text-brand-500"
          @click="open('changelog')"
        >
          <History :size="13" />
          {{ version }} · {{ updateDate }}
        </button>

        <!-- 双下载按钮 -->
        <div class="mt-8 flex w-full flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <!-- 安卓 -->
            <a
              v-if="apkEnabled"
              :href="apkUrl"
              download
              class="flex w-full items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-[0_4px_20px_-2px_rgba(242,179,95,0.5)] [background:linear-gradient(135deg,#f2b35f,#c9954c)] transition-transform active:translate-y-px sm:w-64"
            >
              <Smartphone :size="18" class="mr-2" />
              下载 Android 版
            </a>
            <button
              v-else
              disabled
              class="flex w-full cursor-not-allowed items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-soft)] px-8 py-3.5 text-base font-semibold text-[var(--fg-muted)] opacity-70 sm:w-64"
              title="Android 版即将上线"
            >
              <Smartphone :size="18" class="mr-2" />
              Android 版 · 即将上线
            </button>
            <!-- iOS -->
            <a
              v-if="iosEnabled"
              :href="iosUrl"
              target="_blank"
              rel="noopener"
              class="flex w-full items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)] px-8 py-3.5 text-base font-semibold transition-colors hover:border-brand-400/50 sm:w-64"
            >
              <Apple :size="18" class="mr-2" />
              下载 iOS 版
            </a>
            <button
              v-else
              disabled
              class="flex w-full cursor-not-allowed items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-soft)] px-8 py-3.5 text-base font-semibold text-[var(--fg-muted)] opacity-70 sm:w-64"
              title="iOS 版即将上线"
            >
              <Apple :size="18" class="mr-2" />
              iOS 版 · 即将上线
            </button>
          </div>
      </CardSpotlight>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: calc(100vh - 4rem);
}

.hero-shot {
  height: clamp(18rem, 48vh, 25rem);
  width: clamp(8.31rem, 22.15vh, 11.54rem);
}

@supports (height: 100svh) {
  .hero-section {
    min-height: calc(100svh - 4rem);
  }

  .hero-shot {
    height: clamp(18rem, 48svh, 25rem);
    width: clamp(8.31rem, 22.15svh, 11.54rem);
  }
}

@media (min-width: 640px) {
  .hero-section {
    min-height: calc(100vh - 4rem);
  }

  .hero-shot {
    height: min(60vh, 480px);
    width: min(27.69vh, 221.54px);
  }
}
</style>
