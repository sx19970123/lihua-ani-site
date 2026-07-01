<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import { X } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    /** 是否显示 */
    modelValue: boolean
    /** 标题 */
    title?: string
    /** 卡片最大宽度 */
    maxWidth?: string
  }>(),
  {
    modelValue: false,
    title: '',
    maxWidth: 'max-w-lg',
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function close() {
  emit('update:modelValue', false)
}

// 锁定背景滚动 + ESC 关闭
watch(
  () => props.modelValue,
  (open) => {
    if (typeof document === 'undefined') return
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) {
      window.addEventListener('keydown', onKey)
    } else {
      window.removeEventListener('keydown', onKey)
    }
  },
)

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  if (typeof document !== 'undefined') document.documentElement.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        @click.self="close"
      >
        <Transition name="modal-pop" appear>
          <div
            v-if="modelValue"
            :class="[
              'relative flex max-h-[88vh] w-full flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl',
              maxWidth,
            ]"
          >
            <!-- 头部 -->
            <div v-if="title" class="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-6 py-4">
              <h2 class="text-lg font-bold">{{ title }}</h2>
              <button
                class="flex size-8 items-center justify-center rounded-full text-[var(--fg-muted)] transition-colors hover:bg-[var(--bg-soft)] hover:text-[var(--fg)]"
                aria-label="关闭"
                @click="close"
              >
                <X :size="18" />
              </button>
            </div>
            <!-- 关闭按钮（无标题时） -->
            <button
              v-else
              class="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-[var(--bg-soft)] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
              aria-label="关闭"
              @click="close"
            >
              <X :size="18" />
            </button>
            <!-- 内容（可滚动） -->
            <div class="overflow-y-auto px-6 py-5">
              <slot />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-pop-enter-active,
.modal-pop-leave-active {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}
.modal-pop-enter-from,
.modal-pop-leave-to {
  transform: scale(0.92) translateY(16px);
  opacity: 0;
}
</style>
