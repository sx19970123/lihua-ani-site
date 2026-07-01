import { ref } from 'vue'

export type ModalName = 'privacy' | 'donate' | 'changelog' | null

const active = ref<ModalName>(null)

/** 全局弹窗状态：Footer 触发 open，App.vue 监听渲染对应 Modal */
export function useModal() {
  function open(name: Exclude<ModalName, null>) {
    active.value = name
  }
  function close() {
    active.value = null
  }
  return { active, open, close }
}
