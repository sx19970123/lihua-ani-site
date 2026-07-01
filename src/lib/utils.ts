import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** 合并 Tailwind class（Inspira UI 约定的 cn 工具） */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
