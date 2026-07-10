/**
 * 站点配置 —— 改这里即可改站，无需动组件代码。
 *
 * 使用说明：
 * - Hero 背景图、功能截图：把图片放进 public/images/screenshots/，在这里填文件名
 * - 安卓 APK：放进 public/downloads/，在 download.apkFileName 填文件名
 * - 捐赠二维码：放进 public/images/donate/，在 donate 里填文件名
 */
/** 功能介绍卡片 */
export interface FeatureItem {
  /** 功能名 */
  name: string
  /** 标语（功能名下方品牌色小字） */
  tagline: string
  /** 描述 */
  desc: string
}

/** 更新日志条目 */
export interface ChangelogItem {
  version: string
  date: string
  notes: string[]
}

export interface SiteConfig {
  /** ===== 基础信息 ===== */
  appName: string
  /** 当前版本号（显示在下载卡片，点击可查看更新日志） */
  version: string
  /** 更新日期 */
  updateDate: string

  /** ===== Hero 背景跑马灯 ===== */
  /** 背景图片文件名（图片放在 public/images/screenshots/）。会自动均分两行、反向滚动 */
  heroImages: string[]

  /** ===== 功能介绍 ===== */
  features: FeatureItem[]

  /** ===== 下载 ===== */
  download: {
    /**
     * 安卓 APK 文件名（文件放 public/downloads/）。
     * 留空 '' 则安卓按钮 disabled 显示"即将上线"。
     */
    apkFileName: string
    /**
     * iOS App Store ID（纯数字，如 '1234567890'）。
     * 有值则点击跳转 App Store；留空 '' 则按钮 disabled 显示"即将上线"。
     */
    iosAppStoreId: string
  }

  /** ===== 更新日志（点击版本号弹窗）===== */
  changelog: ChangelogItem[]

  /** ===== 捐赠 ===== */
  donate: {
    /** 微信收款码文件名（图片放 public/images/donate/）。留空则显示占位 */
    wechatQr: string
    /** 支付宝收款码文件名（图片放 public/images/donate/）。留空则显示占位 */
    alipayQr: string
  }
}

export const siteConfig: SiteConfig = {
  // ===== 基础信息 =====
  appName: '狸花番研部',
  version: 'v1.0.0',
  updateDate: '2026.06',

  // ===== Hero 背景跑马灯 =====
  // 图片放在 public/images/screenshots/，填文件名即可
  heroImages: [
    '7E898C86-50E6-439D-B0EF-4B9DE108516F_4_5005_c.jpeg',
    '8E395CB4-49EE-4E4B-9C44-F8D4FC9F5F0E_4_5005_c.jpeg',
    '252D76D1-9887-467E-815B-080CFC3FDBB2_4_5005_c.jpeg',
    '375AF12F-171A-42B7-BACA-4084B7DF3826_4_5005_c.jpeg',
    '3788A722-BC94-4636-B560-11ABFF6151F6_4_5005_c.jpeg',
    '443493E9-FEF6-40E2-921D-7A201A57ACCE_4_5005_c.jpeg',
    '7976638F-F372-4C44-B65D-218D23E79668_4_5005_c.jpeg',
    'D4E52561-8BC2-4DFB-AE21-09F028902EFD_4_5005_c.jpeg'
  ],

  // ===== 功能介绍 =====
  features: [
    {
      name: '番剧检索',
      tagline: '快速找到想看的',
      desc: '基于 bangumi-data 同步番剧目录，番剧详情对接 Bangumi，资料齐全。',
    },
    {
      name: '追番日历',
      tagline: '不再错过更新',
      desc: '按日期查看每日在更番剧的放送时间表，掌握一季新番的更新节奏。',
    },
    {
      name: 'AI 推荐',
      tagline: '越用越懂你的口味',
      desc: '结合追番画像给出推荐理由与风险提示，越用越精准。',
    },
    {
      name: '收藏',
      tagline: '沉淀你的追番记忆',
      desc: '收藏想看与在追的番剧，可在季度时间轴与观看时间轴间切换查看。',
    },
    {
      name: '番剧排名',
      tagline: '生成你的锐评金字塔',
      desc: '排出从夯到拉的锐评金字塔，一键导出长图分享到社区。',
    },
  ],

  // ===== 下载 =====
  download: {
    // APK 放 public/downloads/lihua-fanyanbu.apk；留空则安卓按钮显示"即将上线"
    apkFileName: '',
    // 填 iOS App Store ID（纯数字）则跳转商店；留空则显示"即将上线"
    iosAppStoreId: '',
  },

  // ===== 更新日志 =====
  changelog: [
    {
      version: 'v1.0.0',
      date: '2026.06',
      notes: ['首次发布', '番剧检索、追番日历、AI 推荐、收藏、番剧排名等核心功能上线'],
    },
  ],

  // ===== 捐赠 =====
  donate: {
    // 二维码放 public/images/donate/；留空则显示占位
    wechatQr: 'wx.jpg',
    alipayQr: 'zfb.jpg',
  },
}
