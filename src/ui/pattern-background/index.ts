/**
 * PatternBackground —— 复刻 Inspira UI / Magic UI PatternBackground
 * 用 CSS 渐变绘制可无缝滚动的网格 / 圆点图案，叠加径向蒙版做边缘渐隐。
 * https://inspira-ui.com/docs/components/pattern-background
 */
import PatternBackground from './PatternBackground.vue'

/** 动画方向：图案滚动方向 */
export const PATTERN_BACKGROUND_DIRECTION = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
  TopLeft: 'top-left',
  TopRight: 'top-right',
  BottomLeft: 'bottom-left',
  BottomRight: 'bottom-right',
} as const

export type PatternBackgroundDirection =
  (typeof PATTERN_BACKGROUND_DIRECTION)[keyof typeof PATTERN_BACKGROUND_DIRECTION]

/** 图案样式 */
export const PATTERN_BACKGROUND_VARIANT = {
  Grid: 'grid',
  Dot: 'dot',
  BigDot: 'big-dot',
} as const

export type PatternBackgroundVariant =
  (typeof PATTERN_BACKGROUND_VARIANT)[keyof typeof PATTERN_BACKGROUND_VARIANT]

/** 滚动速度（ms，一个完整周期时长） */
export const PATTERN_BACKGROUND_SPEED = {
  Fast: 5000,
  Default: 10000,
  Slow: 25000,
} as const

export type PatternBackgroundSpeed = (typeof PATTERN_BACKGROUND_SPEED)[keyof typeof PATTERN_BACKGROUND_SPEED]

/** 边缘渐隐蒙版 */
export const PATTERN_BACKGROUND_MASK = {
  Ellipse: 'ellipse',
  EllipseTop: 'ellipse-top',
} as const

export type PatternBackgroundMask = (typeof PATTERN_BACKGROUND_MASK)[keyof typeof PATTERN_BACKGROUND_MASK]

/** 图案单元格尺寸 */
export const PATTERN_BACKGROUND_SIZE = {
  xs: '8px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '40px',
} as const

export type PatternBackgroundSize = keyof typeof PATTERN_BACKGROUND_SIZE

export { PatternBackground }
export default PatternBackground
