/**
 * App 版本接口封装 —— 本站首个网络层。
 *
 * 接口：GET https://ani-api.lihua.xyz/app/system/app-version/latest
 * 返回结构（直接取 data 即可）：
 *   {
 *     code: 200, msg: '成功',
 *     data: {
 *       ios?:     { downloadUrl, enableWgt, publishTime, updateContent, versionCode, versionName },
 *       android?: { ...同上 }
 *     }
 *   }
 *
 * 说明：
 * - 跨域（anime.lihua.xyz → ani-api.lihua.xyz）需后端放开 CORS。
 *   若未放开，浏览器会静默拦截，fetchAppVersion 返回 null，调用方应回退到 siteConfig。
 * - 任意异常（网络 / CORS / 超时 / 解析失败）统一返回 null，不抛错，保证站点可用。
 */

/** 单个平台的版本信息 */
export interface AppVersionPayload {
  /** 下载地址：有值则启用对应平台下载按钮并作为链接 */
  downloadUrl?: string
  /** 是否启用 wgt 热更新（'0'/'1'）——站点不使用 */
  enableWgt?: string
  /** 发布时间，如 '2026-07-07T20:46:51' */
  publishTime?: string
  /** 更新内容（多行纯文本），按换行拆分后作为更新日志条目 */
  updateContent?: string
  /** 版本号数字，如 104 */
  versionCode?: number
  /** 版本名，如 '1.0.4' */
  versionName?: string
}

/** 接口 data 字段：各平台可能缺失（缺失则该平台显示「即将上线」） */
export interface AppVersionData {
  ios?: AppVersionPayload
  android?: AppVersionPayload
}

interface AppVersionResponse {
  code?: number
  msg?: string
  data?: AppVersionData
}

const API_URL = 'https://ani-api.lihua.xyz/app/system/app-version/latest'

/** 请求超时（毫秒） */
const TIMEOUT_MS = 6000

/**
 * 拉取最新 App 版本信息。
 * @returns data 或 null（任意失败均返回 null）
 */
export async function fetchAppVersion(): Promise<AppVersionData | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(API_URL, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return null
    const json = (await res.json()) as AppVersionResponse
    return json?.data ?? null
  } catch {
    // 网络/CORS/超时/解析失败：静默回退
    return null
  } finally {
    clearTimeout(timer)
  }
}
