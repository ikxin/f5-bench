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
  <a href="https://github.com/ikxin/f5-bench/blob/master/LICENSE"><img src="https://badgen.net/github/license/ikxin/f5-bench" /></a>
</p>

## 📖 项目介绍

本项目早期灵感来源于 HostLoc 论坛上的[一篇帖子](https://hostloc.com/thread-1312882-1-1.html)，当时测试了一下自己的网站，因为该网站没有配置任何访问频率限制，结果很轻松的就将服务器资源给占满了，觉得这个小工具挺有意思的，就想着自己也搭建一个用来给网站进行请求基准测试。

经过对原作者 `@主机玩家` 询问是否开放源代码，最终没有收到答复，于是决定自己动手写一个。[原网站](https://f5.serverplayer.com/)核心代码经过了混淆无法阅读，所以本项目仅参考了原网站的思路，并以此为基础进行了重新开发。

本项目命名为 [F5 Bench](https://github.com/ikxin/f5-bench)，即网站请求基准测试 (Fetch Benchmark) 的意思，F5 既可以用来表示键盘上的[刷新键](https://www.toptal.com/developers/keycode/f5)，也可以表示 Fetch 的缩写。

本项目的原理也很简单，就是通过 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 来频繁的请求目标网站，从而对目标网站进行请求基准测试，也就是 HostLoc 论坛里常常提到的玩笑梗，通过 F5 刷新对目标网站发起请求基准测试，从而使目标网站服务器资源占满导致崩溃。

得益于 [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 拥有 [`no-cors` 模式](https://developer.mozilla.org/zh-CN/docs/Web/API/fetch#mode)，因此本项目可以绕过 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS) 限制，直接对目标网站发起跨域请求，从而实现请求基准测试。

## 📝 免责声明

基于 Fetch API 发起的网络请求，会携带本机设备的 IP 信息，因此请勿将本工具用于任何非法用途，本项目仅限于开发者用于对自己的网站发起请求基准测试，除此之外的一切使用场景，使用者本人需承担所有责任，本项目不对任何使用场景负责。

## 👀 在线演示

本项目使用 Cloudflare Pages 进行部署在线演示，禁止使用其进行非法请求基准测试，托管平台会对使用者以及使用记录进行日志文件留存（仅用于规避责任风险）。

https://f5-bench.ikxin.com

## 📦 自行部署

在本项目 [Release](https://github.com/ikxin/f5-bench/releases) 页面下载最新版本的压缩包，将其上传到任意静态网站主机中，然后解压到网站根目录即可。

## ⭐ 星星

![](https://starchart.cc/ikxin/f5-bench.svg?variant=light)

## 🧑‍💻 作者

Code with ❤️ by [一纸忘忧](https://www.ikxin.com "一纸忘忧")

## 📜 开源协议

[MIT License](./LICENSE "MIT License")

Copyright (c) 2024 ~ Present
