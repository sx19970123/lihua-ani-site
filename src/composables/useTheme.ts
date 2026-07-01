import { ref, watch, onMounted, onUnmounted } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'theme'
const mode = ref<ThemeMode>('auto')
let media: MediaQueryList | null = null

function apply() {
  const isDark =
    mode.value === 'dark' ||
    (mode.value === 'auto' && media?.matches === true)
  document.documentElement.classList.toggle('dark', isDark)
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
}

/** 三档主题切换：light / dark / auto（跟随系统），与 app 体验一致 */
export function useTheme() {
  onMounted(() => {
    media = window.matchMedia('(prefers-color-scheme: dark)')
    const stored = (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'auto'
    mode.value = ['light', 'dark', 'auto'].includes(stored) ? stored : 'auto'
    apply()
    media.addEventListener('change', apply)
  })

  onUnmounted(() => {
    media?.removeEventListener('change', apply)
  })

  watch(mode, () => {
    localStorage.setItem(STORAGE_KEY, mode.value)
    apply()
  })

  function setTheme(next: ThemeMode) {
    mode.value = next
  }

  function cycleTheme() {
    const order: ThemeMode[] = ['light', 'dark', 'auto']
    mode.value = order[(order.indexOf(mode.value) + 1) % order.length]
  }

  return { mode, setTheme, cycleTheme }
}
