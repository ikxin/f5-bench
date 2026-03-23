<!-- BEGIN:nextjs-agent-rules -->

# Next.js：编码前必须阅读文档

进行任何 Next.js 相关工作前，请在 `node_modules/next/dist/docs/` 中查找并阅读相关文档。你的训练数据已过时 — 文档是唯一的真实来源。

<!-- END:nextjs-agent-rules -->

## 项目特定的 AI 指南

该项目使用以下技术栈：

- **框架**：Next.js 16.2+ 与 Server Components
- **国际化**：next-intl 支持多语言（中文、英文、西班牙文等）
- **UI 组件库**：Semi Design
- **样式**：Tailwind CSS 4.2 with PostCSS
- **静态导出**：配置 `output: 'export'`（静态网站生成）

### 核心模式

1. **路由**：通过 `[locale]` 动态段实现 i18n - 所有路由必须遵循支持区域的结构
2. **组件**：Client Components（如主题切换器）必须使用 `'use client'` 指令
3. **翻译**：在 `messages/*.json` 文件中存储翻译信息，按语言代码组织
4. **Server Functions**：默认使用 Server Components，仅在必要时添加 `'use client'`
5. **图片**：始终使用 `next/image`，并配置正确的 `sizes` 和 priority

### 修改时需要注意的事项

- **路由**：确保在 `app/` 和 `app/[locale]/` 中保持区域路由的一致性
- **组件**：混合使用 Server 和 Client 组件时检查 hydration 兼容性
- **样式**：在 Semi Design 组件属性之外维护 Tailwind 类
- **i18n**：添加新字符串时更新所有语言 JSON 文件
