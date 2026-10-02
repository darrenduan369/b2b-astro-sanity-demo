# Astro + Sanity + TypeScript 课程学习记录

> 用于追溯本 Demo 的课程式开发过程。记录依据为 Git 提交、实际源码和构建结果。
>
> 当前进度：Astro L5 ｜ 更新日期：2026-10-03

项目实时架构、功能状态和运行方式见 [README](../README.md)。

## 学习目标与进度

| 方向 | 已实践 | 待学习或接入 |
| --- | --- | --- |
| Astro | 页面、组件、布局、Props、slot、文件路由、动态路由、SSG、响应式 UI、表单状态、SEO、按需 API Route | 404、部署 adapter、测试与 CI |
| TypeScript | 领域类型、组件 Props、`Result`、联合类型、Mapper、Service、运行时 Type Guard、AI 错误分类 | 自动化测试与更完整的边界校验 |
| Sanity | Studio、Product Schema、GROQ、图片与 Alt Text、SEO 字段、Astro 数据读取与运行时校验 | Portable Text、Preview、自动生成类型 |
| AI | Provider 抽象、DeepSeek 接入、Sanity Context、结构化推荐、候选预筛选、前端状态处理 | 多意图解析与批量推荐 |
| 工程化 | Git 课程提交、构建脚本、配置分层 | Lint、Formatter、测试、CI、Astro 服务端 adapter |

该段最初记录的是 L1 时点状态；后续实现已升级到 Astro L5，Sanity 与 AI 已接入。各阶段的历史事实和当前差异见下方课程记录。

## 历史索引

| 阶段 | 日期 | 提交 | 主题 |
| --- | --- | --- | --- |
| 项目初始化 | 2026-09-29 | `199ec1e` | Astro Basics 模板与基础结构 |
| B2B 前置骨架 | 2026-09-29 | `95339c2` | 首页业务化与公共组件占位 |
| Astro L1 | 2026-09-30 | `2d81049` | 产品页、动态路由、类型与 SEO |
| Astro L2 | 2026-09-30 | `3cd6eb7` | 响应式 B2B UI 与询盘工作流 |
| Astro L3 | 2026-10-02 | `e161f0d` | Sanity CMS 产品数据、Mapper、Service 与 Validator |
| Astro L4 | 2026-10-02 | `a390cfc` | SEO metadata、sitemap、robots.txt 与结构化数据 |
| Astro L5 | 2026-10-03 | `e3d2264` | AI Product Advisor、Provider 抽象与结构化推荐 |

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

## Astro L2：响应式 B2B UI 与询盘工作流

### 提交信息

- 日期：2026-09-30
- 提交：`3cd6eb7` — `feat: Astro L2 build responsive B2B UI and inquiry workflow`

### 课程目标

- 把 L1 的页面骨架升级为可在桌面端和移动端使用的 B2B 产品站 UI。
- 补齐 About、Contact、产品列表和产品详情的页面体验。
- 用 TypeScript 分层实现询盘表单的数据映射、校验、提交和 UI 状态。

### 实现过程与核心概念

1. **组件化与响应式 UI**：完善 `Header.astro`、`Footer.astro` 和 `ProductCard.astro`，在首页、产品列表及详情页使用网格、断点和共享设计变量。
2. **页面完整性**：新增 `about.astro` 与 `contact.astro`，修复 L1 中导航目标不存在的问题；详情页增加图片区域、报价入口和移动端单列布局。
3. **询盘领域类型**：`types/inquiry.ts` 定义输入、成功响应和错误类型；`types/result.ts` 用可辨识联合表达成功/失败；`types/requestState.ts` 表达 `idle/loading/success/error`。
4. **Mapper / Validator / Service 分层**：`inquiryMapper.ts` 将 `FormData` 转成领域输入，`inquiryValidator.ts` 校验必填项、邮箱和数量，`inquiryService.ts` 隔离提交行为。
5. **前端状态管理**：提交期间禁用按钮，失败时显示错误并聚焦对应字段，成功后展示询盘编号并重置表单。

### 关键文件

- `src/styles/global.css`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/ProductCard.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/mappers/inquiryMapper.ts`
- `src/validators/inquiryValidator.ts`
- `src/services/inquiryService.ts`
- `src/types/inquiry.ts`
- `src/types/requestState.ts`
- `src/types/result.ts`

### 问题、方案与当前状态

- **已完成**：响应式 B2B 页面、About / Contact 路由和类型化询盘流程已进入课程提交。
- **临时测试方案**：询盘 Service 仍用延时和固定 `INQ-001` 模拟成功响应，不代表真实后端、邮件或 CRM 已接入。
- **后续意义**：本课建立的 Mapper、Validator、Service 和请求状态模式，随后被 Sanity 数据层与 AI Advisor 继续复用。

### L2 验收

- [x] Commit 与源码均包含响应式页面和公共组件升级。
- [x] About、Contact、产品列表和产品详情路由均有实际页面文件。
- [x] 询盘输入经过 Mapper 和 Validator，再进入 Service。
- [x] loading、success、error 与防重复提交 UI 已实现。
- [ ] 询盘尚未连接真实后端；当前仅为模拟提交。

## Astro L3：Sanity CMS 产品数据与运行时校验

### 提交信息

- 日期：2026-10-02
- 提交：`e161f0d` — `feat: Astro L3 integrate Sanity CMS product data and validation`

### 课程目标

- 建立独立 Sanity Studio 与 Product Schema。
- 用 Sanity 数据替换本地 TypeScript 产品数组。
- 建立 GROQ → 原始类型 → Validator → Mapper → 领域类型 → Astro 页面链路。

### 实现过程与核心概念

1. **Sanity Studio 与 Schema**：`sanity/` 包含独立 Studio；`product.ts` 使用 `defineType` / `defineField` 定义 name、slug、category、price、featured、description、image、image.alt、seoTitle、seoDescription，并为核心字段设置 required / positive 等规则。
2. **图片与可访问文本**：Product 图片开启 hotspot，并将 Alt Text 作为图片子字段且设为必填；前端 Mapper 在 Alt 缺失时回退到产品名。
3. **GROQ 查询**：分别建立全部产品、精选产品和按 slug 查询，投影 `slug.current` 与图片资源 URL，替代原来的 `src/data/products.ts`。
4. **边界类型与运行时校验**：Sanity 返回值先按 `unknown` 接收，由 `isSanityProduct` Type Guard 校验核心字段，再映射成页面使用的 `Product`。
5. **Service 与 Mapper**：`productService.ts` 统一数据读取及错误边界；`productMapper.ts` 负责 `_id → id`、描述回退和图片 Alt 回退，避免页面直接依赖 CMS 响应形状。
6. **动态产品详情**：`getStaticPaths()` 从 Sanity 获取 slug；详情页再用 slug 查询产品，实现 CMS 驱动的静态动态路由。

### 关键文件

- `sanity/schemaTypes/product.ts`
- `sanity/schemaTypes/index.ts`
- `sanity/seed-products.ndjson`
- `src/lib/sanity/client.ts`
- `src/lib/sanity/queries.ts`
- `src/types/sanityProduct.ts`
- `src/validators/sanityProductValidator.ts`
- `src/mappers/productMapper.ts`
- `src/services/productService.ts`
- `src/pages/products/[slug].astro`

### 问题、方案与当前状态

- **已完成**：Sanity Studio、Product Schema、三类 GROQ 查询、数据校验/映射/服务分层和 CMS 驱动页面均有 commit 与源码证据。
- **后续已重构为**：L1 的本地 `Product[]` 数据源已删除；当前页面通过 `productService` 消费 Sanity。
- **当前实现差异**：Schema 与 TypeScript 类型已包含 `seoTitle`、`seoDescription`，但当前 GROQ 投影未读取这两个字段，因此详情页虽有回退逻辑，CMS 中的 SEO 覆盖值目前不会进入页面。
- **当前实现差异**：Mapper 生成了 `imageAlt`，但详情页 `<img>` 当前仍使用 `product.name`；Alt Text 已建模和查询，但尚未在该模板中消费。
- **验证限制**：2026-10-03 本地执行 Sanity Studio build 时出现 `uv_os_get_passwd returned ENOMEM`，因此本次只确认提交和源码完整，未把 Studio 构建记为通过。
- **后续意义**：建立了 Astro + Sanity + TypeScript 的可信数据边界，并为 L4 SEO 与 L5 AI Context 提供统一产品服务。

### L3 验收

- [x] 本地产品数组已由 Sanity 查询替换。
- [x] Product Schema 包含图片、Alt Text 与 SEO 字段。
- [x] 数据经过 unknown、Type Guard、Mapper 和 Service 后进入页面。
- [x] 产品列表、精选产品和详情页均调用产品 Service。
- [ ] 当前 GROQ 尚未投影 SEO 字段，详情页尚未使用 `imageAlt`。
- [ ] 本次 Sanity Studio build 因本机系统错误未通过，未形成新的构建通过证据。

## Astro L4：SEO metadata、sitemap 与结构化数据

### 提交信息

- 日期：2026-10-02
- 提交：`a390cfc` — `feat: Astro L4 add SEO metadata, sitemap, and structured data`

### 课程目标

- 从基础 title / description 扩展到 canonical、社交分享 metadata 和站点级抓取入口。
- 为组织、网站和产品输出 JSON-LD structured data。
- 让动态产品详情根据产品数据生成 SEO 内容并保留回退值。

### 实现过程与核心概念

1. **站点 URL 与 sitemap**：`astro.config.mjs` 配置生产 `site`，接入 `@astrojs/sitemap`，构建时可生成 sitemap。
2. **页面 metadata**：`Layout.astro` 统一 title、description、canonical、Open Graph 和 Twitter Card；各页面依据 `Astro.url.pathname` 与 `Astro.site` 生成 canonical。
3. **robots.txt**：`public/robots.txt` 允许抓取并指向 `sitemap-index.xml`。
4. **JSON-LD**：Layout 输出 Organization 与 WebSite；产品详情页输出 Product、Brand 和 Offer structured data。
5. **产品 SEO 回退**：详情页优先使用产品 `seoTitle` / `seoDescription`，否则回退到产品名与描述。

### 关键文件

- `astro.config.mjs`
- `public/robots.txt`
- `src/layouts/Layout.astro`
- `src/pages/index.astro`
- `src/pages/about.astro`
- `src/pages/contact.astro`
- `src/pages/products.astro`
- `src/pages/products/[slug].astro`

### 问题、方案与当前状态

- **已完成**：代码与 L4 commit 可确认 title、description、canonical、Open Graph、Twitter metadata、sitemap、robots.txt 和 JSON-LD 已实现。
- **Lighthouse 检查**：课程事实表明已进行 SEO / Performance 检查，但仓库没有保存 Lighthouse 报告或分数；因此不记录具体分数，也不把它当作本次可复现的通过证据。
- **当前实现限制**：由于 L3 的 GROQ 尚未投影 SEO 字段，产品级 CMS SEO 覆盖值目前不会生效；页面仍会使用现有回退值。
- **验证限制**：2026-10-03 当前分支执行 Astro build 时，因 L5 新增按需 API Route 但尚未配置 adapter 而失败；这属于 L5 引入后的部署配置缺口，不改写 L4 当时的提交事实。
- **后续意义**：把 B2B 页面从“可访问”推进到具备搜索引擎和社交分享语义的可部署结构，并为产品发现与 AI 导流建立入口。

### L4 验收

- [x] 全站 title、description、canonical、Open Graph 与 Twitter metadata 已集中到 Layout。
- [x] sitemap 集成与 robots.txt 已存在。
- [x] Organization、WebSite 与 Product JSON-LD 已实现。
- [x] 产品详情定义 SEO 回退策略。
- [ ] 仓库中没有 Lighthouse 报告，无法从 Git 复核分数。
- [ ] 当前分支 Astro build 需先配置服务端 adapter 才能重新通过。

## Astro L5：AI Product Advisor 与 Provider 配置化

### 提交信息

- 日期：2026-10-03
- 提交：`e3d2264` — `feat: Astro L5 integrate AI product advisor with provider configuration`

### 课程目标

- 在 Astro 中建立仅服务端执行的 AI API Route。
- 抽象 AI Provider，并把模型、最大输出 Token 与超时参数配置化。
- 使用 Sanity 产品数据作为受控 AI Context，返回可校验的结构化产品推荐。
- 在产品页提供安全、可恢复、一次处理一个需求的 AI Advisor 交互。

### 实现过程与核心概念

1. **Astro API Route**：`/api/ai-assistant` 使用 `POST` 与 `export const prerender = false`，解析并校验 JSON 请求，把 Provider 错误映射为 HTTP 状态和稳定错误码。
2. **Provider 抽象**：`AiProvider` 统一 `generate()` 契约，Provider factory 支持 Gemini、SiliconFlow 与 DeepSeek；当前课程最终方案为 DeepSeek，密钥只在服务端环境变量中读取。
3. **配置化**：`aiConfig.ts` 从环境变量读取 Provider、Model、max tokens、timeout，并校验正整数；文档不记录任何 Key、Token 或 Secret 值。
4. **Sanity 作为 AI Context**：复用 `fetchProducts()`，把真实产品 slug、名称、分类、价格和截断后的描述构造成 Prompt，禁止模型虚构目录外产品。
5. **Token 优化与候选预筛选**：按用户关键词为产品评分，只发送最多 5 个候选；描述截断到 160 字符，推荐理由限制在 30 个英文单词以内，输出 Token 默认值为 150。
6. **结构化响应**：定义 `AiProductRecommendation`；先 `JSON.parse` 为 `unknown`，再由 Type Guard 校验 `productSlug`、`productName` 和 `reason`。
7. **后端真实性校验**：AI 返回非空推荐后，服务端同时按 slug 与 name 在完整 Sanity 产品集合中匹配；不存在时返回空推荐，避免伪造商品进入前端。
8. **错误分类**：`AiServiceError` 与 `toAiServiceError()` 区分 timeout、auth、quota、rate limit、provider、invalid response 和 unknown error。
9. **前端 Advisor**：`AiProductAdvisor.astro` 覆盖 loading、空推荐、通用 error、timeout、rate limit、quota 状态；提交期间禁用按钮以避免重复请求。
10. **输入与输出安全**：textarea 使用 required 与 300 字符上限；结果通过 `textContent` 写入，slug 经 `encodeURIComponent` 后组成链接，不使用直接 `innerHTML` 注入。

### 关键文件

- `src/pages/api/ai-assistant.ts`
- `src/config/aiConfig.ts`
- `src/types/aiProvider.ts`
- `src/types/aiAssistant.ts`
- `src/types/aiError.ts`
- `src/services/aiAssistantService.ts`
- `src/services/ai/toAiServiceError.ts`
- `src/services/ai/providers/deepSeekProvider.ts`
- `src/services/ai/providers/geminiProvider.ts`
- `src/services/ai/providers/siliconFlowProvider.ts`
- `src/components/AiProductAdvisor.astro`
- `src/pages/products.astro`

### 排错与技术决策

- **临时失败尝试**：Gemini 因区域限制不可用；SiliconFlow 曾用于额度、模型和 Token 相关测试。这些是课程排错经过，不是当前最终 Provider。
- **最终方案**：课程最终确认 DeepSeek API 接入成功；源码中的 DeepSeek Provider 使用 OpenAI-compatible client、DeepSeek base URL，以及统一的 model、timeout、max tokens 配置。
- **证据边界**：具体外部 API 成功响应不在仓库中；本条成功结论来自已确认的课程事实，Git 可直接验证的是 Provider 实现、选择逻辑与配置结构。
- **当前构建缺口**：API Route 使用 `prerender = false`，但项目尚未配置 Astro 服务端 adapter。2026-10-03 执行 `npm.cmd run build` 得到 `NoAdapterInstalled`，所以不能把当前生产构建记为通过。
- **当前输入边界**：浏览器 textarea 有 300 字符限制，但 API Route 尚未在服务端重复检查最大长度；客户端限制不是完整的服务端安全边界。

### L5 验收

- [x] `/api/ai-assistant`、`POST` 与 `prerender = false` 已实现。
- [x] Provider 抽象及 Gemini / SiliconFlow / DeepSeek 实现已提交。
- [x] Provider、Model、max tokens 与 timeout 已进入配置层。
- [x] Sanity 产品数据、候选预筛选和 Token 控制已进入 Prompt 链路。
- [x] 结构化推荐、JSON.parse、Type Guard 与 Sanity 商品真实性校验已实现。
- [x] 前端覆盖 loading、empty、error、timeout、rate limit、quota 和防重复提交状态。
- [x] 推荐文本使用 `textContent`，未直接注入 `innerHTML`。
- [ ] 当前生产构建因缺少 Astro adapter 未通过。
- [ ] 300 字符上限目前只有客户端约束，服务端尚未同步限制。

### 当前产品边界与未来 Enhancement

- **当前已完成**：一次输入一个产品需求，最多返回一个推荐产品；Prompt 明确 `Select at most one product`，前端也明确提示一次描述一个需求。
- **未来计划，尚未实现**：支持 multi-intent parsing、batch recommendation，并把响应扩展为 `AiProductRecommendation[]`。
- 该增强不属于 L5 已完成功能，本次仅保留为后续 Astro + Sanity + AI Builder 路线项。

## 后续课程建议（L1 时点的历史规划）

> 以下内容保留 L1 完成时的原始规划。后续实际课程仍沿用 L2～L5 编号，但主题拆分与当时建议不完全一致；实际完成情况以上述 L2～L5 课程记录为准。

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
