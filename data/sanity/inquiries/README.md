单条询盘数据：

```powershell
npx sanity@latest documents create ..\data\sanity\inquiries\test-inquiry.json --dataset production
```

批量导入询盘数据：

```powershell
npx sanity@latest datasets import ..\data\sanity\inquiries\inquiries.ndjson production
```
