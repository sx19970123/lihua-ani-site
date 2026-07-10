<script setup lang="ts">
import { ref, computed } from 'vue'
import { Heart, Coffee } from 'lucide-vue-next'
import Modal from './Modal.vue'
import { siteConfig } from '@/config/site.config'

defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

type Channel = 'wechat' | 'alipay'
const channel = ref<Channel>('wechat')
const channels: { key: Channel; label: string; color: string }[] = [
  { key: 'wechat', label: '微信', color: '#07c160' },
  { key: 'alipay', label: '支付宝', color: '#1677ff' },
]

// 当前渠道的二维码文件名
const currentQr = computed(() =>
  channel.value === 'wechat' ? siteConfig.donate.wechatQr : siteConfig.donate.alipayQr,
)
const qrUrl = computed(() =>
  currentQr.value ? `${import.meta.env.BASE_URL}images/donate/${currentQr.value}` : '',
)
</script>

<template>
  <Modal :model-value="modelValue" title="请开发者喝杯咖啡" max-width="max-w-md" @update:model-value="emit('update:modelValue', $event)">
    <div class="text-center">
      <div class="mb-6 flex justify-center">
        <div class="flex size-14 items-center justify-center rounded-2xl bg-brand-400/15 text-brand-500">
          <Coffee :size="28" />
        </div>
      </div>

      <p class="mx-auto mb-8 max-w-sm text-sm leading-relaxed text-[var(--fg-muted)]">
        狸花番研部独立、免费、无广告。如果对你有帮助，欢迎请开发者喝杯咖啡 ☕
      </p>

      <!-- 切换渠道 -->
      <div class="mb-8 flex justify-center">
        <div class="flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--bg-soft)] p-1">
          <button
            v-for="c in channels"
            :key="c.key"
            :class="[
              'rounded-full px-5 py-1.5 text-sm font-semibold transition-all',
              channel === c.key ? 'text-white shadow-sm' : 'text-[var(--fg-muted)]',
            ]"
            :style="channel === c.key ? { background: c.color } : {}"
            @click="channel = c.key"
          >
            {{ c.label }}
          </button>
        </div>
      </div>

      <!-- 二维码：有图直接显示图，无图占位 -->
      <img
        v-if="qrUrl"
        :src="qrUrl"
        :alt="channels.find((c) => c.key === channel)?.label + '二维码'"
        class="mx-auto mb-5 size-64 rounded-2xl object-contain"
      />
      <div v-else class="mx-auto mb-5 flex size-64 flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-soft)] text-[var(--fg-muted)]">
        <Heart :size="32" />
        <span class="text-xs">{{ channels.find((c) => c.key === channel)?.label }} 二维码 · 待替换</span>
      </div>

      <p class="mb-2 text-xs text-[var(--fg-muted)]">扫码打赏，支持持续开发</p>
    </div>
  </Modal>
</template>
