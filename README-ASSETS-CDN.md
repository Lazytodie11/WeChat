# 图片上云与包体瘦身

本分支提供了将本地图片上云并在导入时写入 CDN 前缀的改造。

## 1) 配置前缀

scripts/config.cjs 导出 `ASSET_BASE_URL`，默认空字符串。也可以通过环境变量覆盖：

```
export ASSET_BASE_URL=https://cdn.example.com
```

当设置了该变量后，导入脚本会将图片地址写为：

```
${ASSET_BASE_URL}/prod-images/<分类>/<文件名>
```

若留空，则仍然写回 `/assets/<分类>/<文件名>`（可随时重新导入以切换到 CDN）。

## 2) 打包瘦身

`project.config.json` 已将 `miniprogram/assets/**` 与 `**/*.psd` 加入 ignore，预览/真机时不会打进包体（目标 < 2MB）。

## 3) 上传本地图片（可选）

提供占位脚本：

```
npm run upload:assets     # 打印将要上传的文件与目标 URL（DRY-RUN）
ASSET_BASE_URL=https://cdn.example.com npm run upload:assets
```

脚本默认仅输出映射。如需真实上传，可在 `scripts/upload-assets.mjs` 中替换为 COS/OSS SDK 或外部 CLI。

## 4) 重新导入

```
ASSET_BASE_URL=https://cdn.example.com npm run import:all
```

完成后，`miniprogram/data/catalog.js` 中的 `images/cover` 均使用上述前缀，页面仍从 `product.images / product.cover` 读取，无需业务改动。

