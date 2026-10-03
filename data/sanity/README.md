# Sanity 测试与种子数据

该目录用于统一存放 Sanity CMS 的测试数据、初始化数据和批量导入数据。

## 目录结构

- `products/`
  - 产品测试数据和种子数据
- `inquiries/`
  - 询盘测试数据和种子数据

## 文件约定

- `.json`
  - 用于单条测试数据
  - 适合快速验证某个 Schema 是否正常
- `.ndjson`
  - 用于批量数据导入
  - 每一行表示一条独立的 JSON 文档

## 使用原则

1. 测试数据字段必须和当前 Sanity Schema 保持一致。
2. 不允许在该目录保存 API Key、Token、密码等敏感信息。
3. 单条测试优先使用 `.json`。
4. 批量初始化或造数据优先使用 `.ndjson`。
5. Schema 发生字段调整后，应同步检查这里的测试数据。
6. 已经用于历史测试的数据，如无必要不要随意删除，可根据实际情况更新或归档。

## Sanity CLI 执行位置

建议先进入：

```powershell
cd sanity
```

然后通过相对路径访问：
例如产品数据：
npx sanity@latest datasets import ..\data\sanity\products\products.ndjson production

例如单条询盘：
npx sanity@latest documents create ..\data\sanity\inquiries\test-inquiry.json --dataset production

批量导入产品：

```powershell
npx sanity@latest datasets import ..\data\sanity\products\products.ndjson production
```
