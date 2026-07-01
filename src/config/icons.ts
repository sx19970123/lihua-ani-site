/**
 * 图标映射表
 *
 * 配置文件（site.config.ts）里用字符串名引用图标，这里负责把字符串名映射成 lucide 组件。
 * 需要新图标时：在 import 里加上，再登记到 iconMap 即可。
 */
import type { Component } from 'vue'
import {
  Sparkles,
  CalendarDays,
  Heart,
  MessageSquareQuote,
  Info,
  Download,
  Smartphone,
  Apple,
  History,
} from 'lucide-vue-next'

export type IconName = keyof typeof iconMap

export const iconMap = {
  Sparkles,
  CalendarDays,
  Heart,
  MessageSquareQuote,
  Info,
  Download,
  Smartphone,
  Apple,
  History,
} as Record<string, Component>
