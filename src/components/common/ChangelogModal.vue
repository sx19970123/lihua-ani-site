<script setup lang="ts">
import Modal from './Modal.vue'
import { siteConfig } from '@/config/site.config'

defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const changelog = siteConfig.changelog
</script>

<template>
  <Modal :model-value="modelValue" title="更新日志" max-width="max-w-lg" @update:model-value="emit('update:modelValue', $event)">
    <div class="space-y-5">
      <div
        v-for="(log, i) in changelog"
        :key="i"
        class="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-5"
      >
        <div class="mb-3 flex items-center gap-3">
          <span class="rounded-full bg-brand-400/15 px-2.5 py-0.5 text-xs font-semibold text-brand-600 dark:text-brand-300">{{ log.version }}</span>
          <span class="text-xs text-[var(--fg-muted)]">{{ log.date }}</span>
        </div>
        <ul class="space-y-1.5">
          <li v-for="(note, ni) in log.notes" :key="ni" class="flex gap-2 text-sm text-[var(--fg-muted)]">
            <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-400" />
            {{ note }}
          </li>
        </ul>
      </div>
    </div>
  </Modal>
</template>
