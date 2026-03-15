# Changelog

All notable changes to this project will be documented in this file.

## [0.2.0] - 2026-03-15

### ⚠️ Breaking Changes

- 项目从 Nuxt 完全迁移至 Next.js，技术栈全面重构

### ✨ New Features

- 基于 Next.js 16 构建，使用静态导出 (Static Export) 部署
- 使用 Semi Design 组件库构建全新 UI
- 使用 Tailwind CSS 进行样式管理
- 基于 next-intl 实现国际化，支持 11 种语言（简体中文、繁体中文、English、日本語、한국어、Français、Deutsch、Español、Português、Русский、العربية）
- 支持亮色/暗色主题切换
- 自动检测浏览器语言并跳转至对应语言版本
- 可配置并发线程数
- 实时显示请求统计（总请求数、请求速度、总耗时）

### 🔧 Infrastructure

- 从 Bun 迁移至 pnpm 包管理器
- 新增 CI 工作流（push/PR 自动构建检查）
- 更新 Release 工作流适配 Next.js 构建产物

## [0.1.2] - Previous Nuxt Version

- 基于 Nuxt 的旧版本实现
