<p align="center">
  <img width="400" src="./public/images/logo.svg" />
</p>

<p align="center">
  <a href="https://github.com/ikxin/f5-bench/releases"><img src="https://badgen.net/github/release/ikxin/f5-bench" /></a>
  <a href="https://github.com/ikxin/f5-bench/stargazers"><img src="https://badgen.net/github/stars/ikxin/f5-bench" /></a>
  <a href="https://github.com/ikxin/f5-bench/network/members"><img src="https://badgen.net/github/forks/ikxin/f5-bench" /></a>
  <a href="https://github.com/ikxin/f5-bench/commits"><img src="https://badgen.net/github/commits/ikxin/f5-bench" /></a>
  <a href="https://github.com/ikxin/f5-bench/issues"><img src="https://badgen.net/github/issues/ikxin/f5-bench" /></a>
  <a href="https://github.com/ikxin/f5-bench/watchers"><img src="https://badgen.net/github/watchers/ikxin/f5-bench" /></a>
  <a href="https://github.com/ikxin/f5-bench/blob/main/LICENSE"><img src="https://badgen.net/github/license/ikxin/f5-bench" /></a>
</p>

## 📖 项目介绍

本项目早期灵感来源于 HostLoc 论坛上的[一篇帖子](https://hostloc.com/thread-1312882-1-1.html)，当时测试了一下自己的网站，因为该网站没有配置任何访问频率限制，结果很轻松的就将服务器资源给占满了，觉得这个小工具挺有意思的，就想着自己也搭建一个用来给网站进行请求基准测试。

经过对原作者 `@主机玩家` 询问是否开放源代码，最终没有收到答复，于是决定自己动手写一个。[原网站](https://f5.serverplayer.com/)核心代码经过了混淆无法阅读，所以本项目仅参考了原网站的思路，并以此为基础进行了重新开发。

本项目命名为 [F5 Bench](https://github.com/ikxin/f5-bench)，即网站请求基准测试 (Fetch Benchmark) 的意思，F5 既可以用来表示键盘上的[刷新键](https://www.toptal.com/developers/keycode/f5)，也可以表示 Fetch 的缩写。

本项目的原理也很简单，就是通过 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 来频繁的请求目标网站，从而对目标网站进行请求基准测试，也就是 HostLoc 论坛里常常提到的玩笑梗，通过 F5 刷新对目标网站发起请求基准测试，从而使目标网站服务器资源占满导致崩溃。

得益于 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 拥有 [`no-cors` 模式](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch#mode)，因此本项目可以绕过 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS) 限制，直接对目标网站发起跨域请求，从而实现请求基准测试。

## ✨ 功能特性

- 🚀 基于 [Next.js](https://nextjs.org/) 构建，静态导出，可部署到任意静态托管平台
- 🎨 使用 [Semi Design](https://semi.design/) 组件库 + [Tailwind CSS](https://tailwindcss.com/) 构建 UI
- 🌍 支持 11 种语言的国际化（简体中文、繁体中文、English、日本語、한국어、Français、Deutsch、Español、Português、Русский、العربية）
- 🌙 支持亮色/暗色主题切换
- 🔧 可配置并发线程数
- 📊 实时显示请求统计（总请求数、请求速度、总耗时）

## 🛠️ 技术栈

| 技术                                          | 说明                         |
| --------------------------------------------- | ---------------------------- |
| [Next.js](https://nextjs.org/)                | React 全栈框架               |
| [React](https://react.dev/)                   | UI 构建库                    |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全的 JavaScript        |
| [Tailwind CSS](https://tailwindcss.com/)      | 原子化 CSS 框架              |
| [Semi Design](https://semi.design/)           | 企业级 UI 组件库             |
| [next-intl](https://next-intl.dev/)           | Next.js 国际化方案           |
| [pnpm](https://pnpm.io/)                      | 快速、节省磁盘空间的包管理器 |

## 📝 免责声明

基于 Fetch API 发起的网络请求，会携带本机设备的 IP 信息，因此请勿将本工具用于任何非法用途，本项目仅限于开发者用于对自己的网站发起请求基准测试，除此之外的一切使用场景，使用者本人需承担所有责任，本项目不对任何使用场景负责。

## 👀 在线演示

本项目使用 Cloudflare Pages 进行部署在线演示，禁止使用其进行非法请求基准测试，托管平台会对使用者以及使用记录进行日志文件留存（仅用于规避责任风险）。

https://f5-bench.ikxin.com

## 📦 部署方式

### 静态文件部署

在本项目 [Release](https://github.com/ikxin/f5-bench/releases) 页面下载最新版本的压缩包，将其上传到任意静态网站主机中，然后解压到网站根目录即可。

### 本地开发

```bash
# 克隆项目
git clone https://github.com/ikxin/f5-bench.git
cd f5-bench

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

## 🤝 参与贡献

欢迎参与项目贡献！请阅读 [贡献指南](./CONTRIBUTING.md) 了解详情。

## ⭐ 星星

![](https://starchart.cc/ikxin/f5-bench.svg?variant=light)

## 🧑‍💻 作者

Code with ❤️ by [一纸忘忧](https://www.ikxin.com "一纸忘忧")

## 📜 开源协议

[MIT License](./LICENSE "MIT License")

Copyright (c) 2024 ~ Present
