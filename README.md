# BrightTech Industrial

基于 Astro 构建的 B2B 产品展示 Demo，用于验证企业官网的信息架构、产品建模、静态路由和基础 SEO。

> 项目状态：早期原型 ｜ 当前版本：Astro L1 ｜ 更新日期：2026-09-30
>
> 课程开发过程与 Git 历史见 [课程学习记录](docs/LEARNING_HISTORY.md)。

## 项目定位

本项目面向 B2B 企业展示场景，当前围绕 BrightTech Industrial 构建最小可运行产品目录。

### 适用范围

- 学习和验证 Astro 的组件、布局、文件路由与静态生成。
- 演示 B2B 首页、产品列表和产品详情的信息结构。
- 验证 TypeScript 产品模型到 Astro 页面渲染的数据链路。
- 作为后续接入 Sanity CMS、样式系统和 SEO 能力的实验项目。

### 暂不适用

- 生产环境中的完整企业官网。
- 在线交易、购物车、支付、订单或客户管理。
- 多语言、多币种、复杂权限、实时库存和动态定价业务。

## 技术概览

| 类别 | 当前方案 | 状态 |
| --- | --- | --- |
| Web 框架 | Astro `^7.3.5` | 已接入 |
| 开发语言 | Astro Components + TypeScript | 已接入 |
| Node.js | `>=22.12.0` | 已配置 |
| 输出模式 | 静态站点生成（SSG） | 已接入 |
| 产品数据 | 本地 TypeScript 数组 | 临时方案 |
| CMS | Sanity | 尚未接入 |
| 样式系统 | 未建立 | 尚未开始 |
| 自动化测试 | 未建立 | 尚未开始 |

## 架构说明

```text
src/
├── components/              可复用展示组件
│   ├── Header.astro         全站导航
│   ├── Footer.astro         全站页脚
│   └── ProductCard.astro    产品摘要卡片
├── data/products.ts         当前产品数据源
├── layouts/Layout.astro     HTML 骨架、公共区域与 SEO 参数
├── pages/
│   ├── index.astro          首页
│   ├── products.astro       产品列表
│   └── products/[slug].astro 产品详情动态路由
└── types/product.ts         产品领域类型
```

### 页面生成链路

```text
Product 接口 ──约束──> products.ts
                         ├──> /products ──> ProductCard
                         └──> getStaticPaths() ──> /products/[slug]

页面 ──> Layout ──> Header + 页面内容 + Footer
```

产品详情页在构建阶段生成，不依赖运行时服务；产品 `slug` 同时作为 URL 参数和页面标识。

## 功能与完善程度

| 模块 | 能力 | 完善程度 | 说明 |
| --- | --- | --- | --- |
| 首页 | 企业名称、定位与简介 | 基础可用 | 尚无视觉设计和业务区块 |
| 全站布局 | Header、内容插槽、Footer | 基础可用 | 已统一页面骨架 |
| 产品模型 | ID、slug、名称、分类、价格 | 基础可用 | 字段仍较少 |
| 产品列表 | 数据循环与产品卡片 | 基础可用 | 暂无筛选、分页和图片 |
| 产品详情 | 动态路由与静态生成 | 基础可用 | 暂无富文本和相关推荐 |
| SEO | 页面 title 与 description | 部分完成 | 存在重复 title 问题 |
| 内容管理 | Sanity CMS | 未开始 | 仍使用本地数据 |
| About / Contact | 导航入口 | 未完成 | 页面尚未建立 |
| 响应式样式 | 桌面端与移动端布局 | 未开始 | 当前主要验证结构 |
| 工程质量 | 测试、Lint、格式化 | 未开始 | 尚无质量门禁 |

## 当前路由

| URL | 来源 | 状态 |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | 可访问 |
| `/products` | `src/pages/products.astro` | 可访问 |
| `/products/:slug` | `src/pages/products/[slug].astro` | 构建时生成 |
| `/about` | 尚无页面 | 导航存在但不可用 |
| `/contact` | 尚无页面 | 导航存在但不可用 |

## 本地运行

```bash
npm install
npm run dev -- --background
```

默认地址为 `http://localhost:4321`。后台服务管理：

```bash
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

生产构建与预览：

```bash
npm run build
npm run preview
```

## 数据扩展

Sanity 接入前，在 `src/data/products.ts` 中添加符合 `Product` 接口的数据。要求：

- `id` 和 `slug` 保持唯一，slug 使用小写连字符格式。
- 新增数据后重新构建，以生成对应静态详情页。
- 修改字段结构时同步更新 `src/types/product.ts` 及其消费组件。

## 已知问题与限制

- `Layout.astro` 存在两个 `<title>`，应仅保留动态标题。
- `/about` 与 `/contact` 导航当前指向不存在的页面。
- 尚无完整样式、移动端适配和无障碍检查。
- 价格直接拼接美元符号，尚未统一货币格式。
- 产品没有图片、描述、规格或独立 SEO 字段。
- 尚未配置 Sanity、自动化测试、Lint、格式化和 CI。
- 演示内容不代表真实商品与商业信息。

## 近期路线图

1. 修复标题并补齐 About、Contact 页面。
2. 建立设计令牌和响应式样式。
3. 设计 Sanity 产品 Schema，替换本地数据源。
4. 扩展图片、描述、规格、分类与 SEO 字段。
5. 增加错误处理、数据校验、测试与部署配置。

> 路线图仅描述目标；实时状态以功能矩阵和源码为准。

## 文档维护

- README 只维护项目当前状态，不记录逐课过程。
- 功能或架构变化后，同步更新技术概览、架构、功能矩阵和限制。
- 课程知识点、实验过程和提交追溯维护在 [课程学习记录](docs/LEARNING_HISTORY.md)。
- Astro 开发约定见 [AGENTS.md](AGENTS.md)。
