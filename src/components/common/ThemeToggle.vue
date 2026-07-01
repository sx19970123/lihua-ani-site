<script setup lang="ts">
import { Sun, Moon, Monitor } from 'lucide-vue-next'
import { useTheme, type ThemeMode } from '@/composables/useTheme'

const { mode, setTheme } = useTheme()

const options: { value: ThemeMode; icon: typeof Sun; label: string }[] = [
  { value: 'light', icon: Sun, label: '明亮' },
  { value: 'dark', icon: Moon, label: '暗黑' },
  { value: 'auto', icon: Monitor, label: '跟随系统' },
]
</script>

<template>
  <div
    class="flex items-center gap-0.5 rounded-full border border-[var(--border)] bg-[var(--bg-soft)] p-1"
  >
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      :title="opt.label"
      :aria-label="opt.label"
      :class="[
        'flex size-7 items-center justify-center rounded-full transition-all',
        mode === opt.value
          ? 'bg-brand-400 text-white shadow-sm'
          : 'text-[var(--fg-muted)] hover:text-[var(--fg)]',
      ]"
      @click="setTheme(opt.value)"
    >
      <component :is="opt.icon" :size="15" :stroke-width="2.2" />
    </button>
  </div>
</template>
