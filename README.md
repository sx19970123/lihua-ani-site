# 狸花番研部 官网

「发现下一部想看的番，AI 越用越懂你的口味」—— 狸花番研部（番剧发现 + AI 推荐 app）的介绍官网。

## 技术栈

- **Vue 3** + **Vite** + **TypeScript**
- **Tailwind CSS v4**（`@tailwindcss/vite` 插件，CSS-first 配置）
- **Inspira UI** 组件风格（copy-paste 模式，组件源码在 `src/components/inspira/`）
- **@vueuse/motion** 入场动效、**lucide-vue-next** 图标
- 响应式 + 三档暗色模式（明 / 暗 / 跟随系统）

## 本地开发

```bash
npm install
npm run dev      # 启动开发服务器
npm run build    # 类型检查 + 生产构建，产物在 dist/
npm run preview  # 预览构建产物
```

## 页面

| 路径 | 说明 |
|------|------|
| `/` | 首页：全屏背景 Hero + 截图墙跑马灯 + 核心卖点 |
| `/features` | 功能特性：功能清单联动跑马灯 |
| `/download` | 下载：居中大卡 + iOS 指引 + 更新日志 |
| `/about` | 关于：产品理念、数据来源、技术栈、IP 形象 |
| `/privacy` | 隐私政策 |
| `/donate` | 捐赠：微信/支付宝切换 |

## 部署到 GitHub Pages

### 首次配置（手动做一次）

1. 在 GitHub 创建仓库 `lihua-ani-site`（或你喜欢的名字）并推送代码。
2. 进入仓库 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。

### 自动部署

已配置 `.github/workflows/deploy.yml`：每次 push 到 `main`/`master` 会自动构建并部署。

### base 路径

`vite.config.ts` 中 `base` 默认为 `/lihua-ani-site/`（项目型仓库）。若使用 `<username>.github.io` 根域名仓库，需改为 `'/'`：

```ts
export default defineConfig({
  base: '/',  // username.github.io
  // ...
})
```

## 自定义配置

所有可定制内容集中在 **`src/config/site.config.ts`**，改这里即可改站，无需动组件代码：

| 配置项 | 说明 | 对应资源位置 |
|--------|------|-------------|
| `heroImages` | Hero 背景跑马灯图片文件名数组（自动均分两行反向滚动） | 图片放 `public/images/screenshots/` |
| `features` | 功能特性卡片（图标名/名称/标语/描述） | 图标名见 `src/config/icons.ts` |
| `download.apkFileName` | 安卓 APK 文件名，有值则按钮指向文件下载 | APK 放 `public/downloads/` |
| `download.iosAppStoreId` | iOS App Store ID（纯数字），有值则跳转商店 | — |
| `changelog` | 更新日志（点击版本号弹窗） | — |
| `donate.wechatQr` / `alipayQr` | 微信/支付宝收款码文件名 | 图片放 `public/images/donate/` |

**下载按钮逻辑**：配置项留空 `''` 时，对应按钮自动变为 disabled 并显示"即将上线"。

**新增图标**：在 `src/config/icons.ts` 的 import 和 `iconMap` 里登记即可，配置中用字符串名引用。


## 目录结构

```
src/
├── components/
│   ├── inspira/      # Inspira UI 风格组件（Marquee/BorderBeam/Meteors 等）
│   └── common/       # Navbar / Footer / ThemeToggle
├── composables/
│   └── useTheme.ts   # 三档主题切换
├── pages/            # 六个页面
├── assets/css/       # Tailwind 入口 + 品牌色/暗色变量
├── lib/utils.ts      # cn() 工具
└── router/
```
