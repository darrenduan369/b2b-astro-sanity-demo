# Astro + Sanity + TypeScript 课程学习记录

> 用于追溯本 Demo 的课程式开发过程。记录依据为 Git 提交、实际源码和构建结果。
>
> 当前进度：Astro L1 ｜ 更新日期：2026-09-30

项目实时架构、功能状态和运行方式见 [README](../README.md)。

## 学习目标与进度

| 方向 | 已实践 | 待学习或接入 |
| --- | --- | --- |
| Astro | 页面、组件、布局、Props、slot、文件路由、动态路由、SSG、基础 SEO | 样式、错误页、高级 SEO 与部署 |
| TypeScript | `Product` 接口、类型导入、数组约束、组件 Props | 数据校验、查询结果类型与边界处理 |
| Sanity | 尚无 | Studio、Schema、GROQ、图片、Portable Text、Preview |
| 工程化 | Git 课程提交、构建脚本 | Lint、Formatter、测试、CI |

当前只完成 Astro 与 TypeScript 的第一阶段结合；Sanity 尚未接入。

## 历史索引

| 阶段 | 日期 | 提交 | 主题 |
| --- | --- | --- | --- |
| 项目初始化 | 2026-09-29 | `199ec1e` | Astro Basics 模板与基础结构 |
| B2B 前置骨架 | 2026-09-29 | `95339c2` | 首页业务化与公共组件占位 |
| Astro L1 | 2026-09-30 | `2d81049` | 产品页、动态路由、类型与 SEO |

## 前置阶段：项目初始化

- 提交：`199ec1e` — `Initial commit from Astro`
- 日期：2026-09-29

### 完成内容

- 使用 Astro Basics 模板建立项目。
- 建立 pages、layouts、components 和静态资源目录。
- 配置 TypeScript、Astro 脚本和 VS Code。
- 提供初始 Layout、首页和欢迎组件。

### 学习收获

- `src/pages` 建立基于文件的路由。
- `.astro` 文件由脚本区和模板区组成。
- Layout 通过 `<slot />` 接收页面内容。
- 静态资源可放在 `public`，或通过 `src/assets` 参与构建。

## 前置阶段：B2B 站点骨架

- 提交：`95339c2` — `feat: initialize Astro B2B site layout`
- 日期：2026-09-29

### 完成内容

- 将模板首页替换为 BrightTech Industrial 企业内容。
- 增加公司名称、标题和简介变量。
- 创建 Header 与 Footer 占位组件。
- 生成并锁定依赖版本。

### 学习收获

- Astro 脚本区变量可直接在模板表达式中渲染。
- 从模板转向业务项目时，先建立最小信息架构。
- 公共组件可以先确定职责，再逐步实现。

## Astro L1：产品页、动态路由与 SEO

- 提交：`2d81049` — `feat: Astro L1 build B2B product pages with dynamic routes and SEO`
- 日期：2026-09-30

### 课程目标

- 用 TypeScript 建立产品模型。
- 用数据驱动方式渲染产品列表。
- 用 Astro 动态路由生成产品详情页。
- 把公共区域和 SEO 参数收敛到 Layout。

### 实现过程

1. **产品类型**：`src/types/product.ts` 定义 `Product`，统一 id、slug、名称、分类和价格字段。
2. **本地数据**：`src/data/products.ts` 使用 `Product[]` 约束 3 条演示数据。
3. **产品卡片**：`ProductCard.astro` 用 Props 接收产品，并使用 slug 生成详情链接。
4. **列表页面**：`products.astro` 通过 `map()` 把数据转换为组件列表。
5. **动态路由**：`products/[slug].astro` 使用 `getStaticPaths()` 生成 `params + props`。
6. **公共布局**：`Layout.astro` 统一 Header、Footer、slot、title 和 description。

### 核心知识链路

```text
TypeScript Product / Props
          │ 类型约束
          ▼
本地 products 数据
          ├──> ProductCard ──> 产品列表
          └──> getStaticPaths() ──> 静态产品详情
                                 │
                                 ▼
                        Layout 与页面 SEO
```

Sanity 接入后，目标是替换数据来源和查询层，页面组件继续消费类型化数据。

### L1 验收

- [x] 首页通过公共 Layout 渲染。
- [x] `/products` 展示 3 个产品。
- [x] 产品卡片链接到相应详情页。
- [x] 构建阶段枚举 3 个动态路径。
- [x] 页面传入独立 title 与 description。
- [x] Header 和 Footer 进入公共布局。
- [ ] 清理 Layout 中重复的 `<title>`。
- [ ] 补齐 About 和 Contact 页面。

### L1 遗留问题

- 产品模型只有最小字段，尚不能表达完整 B2B 商品。
- 价格未统一格式化。
- 页面无响应式样式、图片、空状态与错误处理。
- Sanity 尚未接入，本地数组仍是唯一数据源。

## 后续课程建议

### Astro L2：页面完整性与样式

- 修复 HTML / SEO 问题，创建 About、Contact 和 404。
- 建立基础样式、布局约束和响应式行为。

### Astro L3：Sanity 内容模型

- 初始化 Sanity Studio，定义 Product 与 Category Schema。
- 学习 GROQ、图片和 CMS 数据到 TypeScript 类型的映射。

### Astro L4：CMS 驱动页面

- 用 Sanity 查询替换本地数据。
- 处理空查询、缺图、无效 slug 和重新构建策略。

### Astro L5：SEO、质量与部署

- 增加 canonical、Open Graph、结构化数据和 sitemap。
- 增加类型检查、测试、CI 与生产部署。

> 以上是建议路线，不代表功能已经完成。

## 提交与自动归档规范

课程提交统一包含 `Astro L<序号>`：

```text
feat: Astro L2 add responsive company pages
fix: Astro L2 remove duplicate page title
feat: Astro L3 define Sanity product schema
refactor: Astro L3 align GROQ result with Product type
```

归档规则：

1. 从 Message 提取 `Astro L<序号>`。
2. 相同课程序号的 feat、fix、refactor、test、docs 合并到同一章节。
3. 无课程序号的初始化提交归入前置阶段。
4. 依赖升级等普通维护归入项目维护，不强行分课。
5. 每课记录日期、提交、目标、实现、知识点、验收和遗留问题。
6. 以源码和构建结果为准，不能只按 Message 判定完成。

```bash
git log --date=short --pretty=format:"%h | %ad | %s" --grep="Astro L"
git show --stat <commit-hash>
git show <commit-hash>
```

### 新课程模板

```markdown
## Astro L<n>：课程主题

### 提交信息
- 日期范围：
- 提交与 Message：

### 课程目标
-

### 实现过程与知识点
1.

### 验收结果
- [ ]

### 遗留问题
-
```

## 维护原则

- 本文档记录学习过程和历史证据，不承担项目实时状态说明。
- 每课结束后，根据该课全部提交更新对应章节。
- 已完成项必须能由源码、构建或测试验证。
- 项目当前能力变化时，同时更新根目录 README。
