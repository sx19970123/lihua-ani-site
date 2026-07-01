把 Android APK 文件放进这个目录。

然后在 src/config/site.config.ts 的 download.apkFileName 填入文件名（如 lihua-fanyanbu.apk），
首页"下载 Android 版"按钮就会指向该文件并触发下载。

留空 apkFileName 则按钮显示"Android 版 · 即将上线"。
