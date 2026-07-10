import { computed, onMounted, ref } from 'vue'
import { fetchAppVersion, type AppVersionPayload } from '@/api/appVersion'
import { siteConfig, type ChangelogItem } from '@/config/site.config'

/**
 * 把 '2026-07-07T20:46:51' 格式化为 'YYYY.MM'（与站点 2026.06 风格一致）。
 * 解析失败则原样返回。
 */
function formatPublishDate(raw?: string): string {
  if (!raw) return ''
  // 取日期部分 YYYY-MM-DD → YYYY.MM
  const m = raw.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/)
  if (!m) return raw
  return m[3] ? `${m[1]}.${m[2]}.${m[3]}` : `${m[1]}.${m[2]}`
}

/** 版本名加 'v' 前缀，与站点风格一致；无值返回空串 */
function versionLabelOf(v?: string): string {
  if (!v) return ''
  return v.startsWith('v') ? v : `v${v}`
}

/** 多行 updateContent 拆分为非空条目数组 */
function splitNotes(content?: string): string[] {
  if (!content) return []
  return content
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

/**
 * 取任一平台的 payload：优先 ios，再 android。
 * 用于版本胶囊、更新日志等不分平台的展示。
 */
function pickPrimary(ios?: AppVersionPayload, android?: AppVersionPayload) {
  return ios ?? android ?? null
}

/**
 * App 版本数据 composable。
 *
 * - 成功：双下载按钮、版本胶囊、更新日志全部以接口为准。
 * - 失败：回退到 siteConfig，体验与改造前一致。
 *
 * 多次调用各自独立（Home / ChangelogModal 各取一次），避免引入全局状态；
 * 接口开销极小且无并发副作用。
 */
export function useAppVersion() {
  const loading = ref(true)
  const ios = ref<AppVersionPayload | null>(null)
  const android = ref<AppVersionPayload | null>(null)

  // 按钮派生：downloadUrl 有值才启用；安卓兼容考虑本地直链
  const androidUrl = computed(() => android.value?.downloadUrl ?? '')
  const androidEnabled = computed(() => !!androidUrl.value)
  const iosUrl = computed(() => ios.value?.downloadUrl ?? '')
  const iosEnabled = computed(() => !!iosUrl.value)

  // 版本胶囊：优先 ios；失败回退 siteConfig
  const versionLabel = computed(() => {
    const p = pickPrimary(ios.value ?? undefined, android.value ?? undefined)
    if (p?.versionName) return versionLabelOf(p.versionName)
    return siteConfig.version
  })
  const updateLabel = computed(() => {
    const p = pickPrimary(ios.value ?? undefined, android.value ?? undefined)
    if (p?.publishTime) return formatPublishDate(p.publishTime)
    return siteConfig.updateDate
  })

  // 更新日志：成功用接口数据组装单条；失败回退 siteConfig.changelog
  const changelog = computed<ChangelogItem[]>(() => {
    const p = pickPrimary(ios.value ?? undefined, android.value ?? undefined)
    if (p && (p.updateContent || p.versionName)) {
      const notes = splitNotes(p.updateContent)
      return [
        {
          version: versionLabelOf(p.versionName) || siteConfig.version,
          date: formatPublishDate(p.publishTime) || siteConfig.updateDate,
          notes: notes.length > 0 ? notes : ['更新内容暂无'],
        },
      ]
    }
    return siteConfig.changelog
  })

  onMounted(async () => {
    const data = await fetchAppVersion()
    if (data) {
      ios.value = data.ios ?? null
      android.value = data.android ?? null
    }
    loading.value = false
  })

  return {
    loading,
    androidUrl,
    androidEnabled,
    iosUrl,
    iosEnabled,
    versionLabel,
    updateLabel,
    changelog,
  }
}
