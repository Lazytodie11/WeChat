# 甜品店作品展示微信小程序（无支付）

一个可运行的微信小程序示例：浏览作品 → 加入已选 → “查看”页面展示已选清单 → 云函数写入 `orders` → 企业微信群机器人通知店主。全局价格文案均为“仅供展示使用”，方便通过审核后再行开启真实售价流程。

## 功能概览
- 左侧竖向分类 + 右侧作品卡片 + 底部“已选”浮条
- 底部 3 个 Tab：首页/作品/我的
- 云函数：`cloudfunctions/createOrder` 写入订单并通过企业微信机器人 Webhook 通知
- 无支付，演示“展示 → 留资”流程（可按需改回下单）

## 目录结构
- `miniprogram/`：小程序前端
  - `pages/{home,menu,profile,checkout,success}/`
  - `components/cart-bar/`
  - `utils/cart.js`
  - `assets/` 占位图片（logo.png, p1.jpg~p8.jpg）
- `cloudfunctions/createOrder/`：云函数代码
- 工程化：`.github/workflows/ci.yml`、`.editorconfig`、`.gitignore`、`CODEOWNERS`

## 快速开始
1) 拉起微信开发者工具，选择“导入项目”，将项目根目录指向本仓库根目录。

2) 开通云开发（TCB）
- 在开发者工具顶部“云开发”面板中开通云开发，记下环境 ID（例如 `prod-abc123`）。
- 建议将数据库权限设置为：`orders` 集合「仅创建者可读写」。

3) 创建数据库集合 `orders`
- 在“数据库”中新建集合 `orders`。

4) 部署云函数 `createOrder`
- 在微信开发者工具左侧“云开发”→“云函数”中创建名为 `createOrder` 的云函数，并将 `cloudfunctions/createOrder` 目录代码上传并部署。
- 进入云函数的「环境变量」设置，新增：
  - `WEWORK_WEBHOOK`：企业微信群机器人 Webhook（禁止硬编码，使用环境变量）。

5) 配置前端云环境
- 打开 `miniprogram/app.js`，将：
  ```js
  wx.cloud.init({ env: 'your-env-id', traceUser: true });
  ```
  中的 `your-env-id` 替换为你的真实环境 ID。

6) 本地预览
- 在“云开发”面板中：
  - 数据库 `orders` 已创建。
  - 云函数 `createOrder` 已部署成功。
- 在模拟器中切换到“作品”，添加作品，点击底部“查看”，确认已选列表后点击“完成展示”。提交成功后：
  - `orders` 集合新增一条记录；
  - 若云函数环境变量 `WEWORK_WEBHOOK` 已设置，企业微信群机器人会收到新订单通知。

## UI 截图（占位）
- 在 `miniprogram/assets/` 自行替换 `logo.png`、`p1.jpg~p8.jpg` 为真实图片。
- 截图建议：
  - 首页（home）
  - 作品页（menu，含左侧分类、右侧作品卡片、已选浮条）
  - 查看页（checkout，展示“已选”列表与联系信息）

## 在作品页新增分类和商品
作品页现为完全数据驱动，数据源位于 `miniprogram/data/catalog.js`：

- 新增分类：向 `categories` 追加 `{ id, name }`（id 建议英文短横线写法，例如 `cheese-cake`）。
- 新增作品：向 `products` 追加 `{ id, categoryId, name, brief, cover, images, variants }`，其中 `categoryId` 指向对应分类的 id，`variants` 内的尺寸/口味字段仅作为展示。
- 图片：放入 `miniprogram/assets/`（示例：`/assets/p1.jpg`），或使用公网 URL（若为企业环境请确保已配置白名单）。

页面行为说明：
- 左侧分类列表来自 `categories`；默认选中第一项；
- 右侧商品列表为 `products.filter(p => p.categoryId === activeCategoryId)`；
- 当某一类暂无商品时，右侧显示“ 不含商品，敬请期待 ”；
- 加购/减购按钮与底部“已选”浮条联动，本地持久化于 `wx.setStorageSync('cart')`。

## 代码说明
- 前端 `menu` 页加入“已选”，数据存储于 `wx.setStorageSync('cart')`，在 `checkout` 页聚合展示。
- `checkout` 调用 `wx.cloud.callFunction({ name: 'createOrder', data: {...} })`。
- 云函数使用 `wx-server-sdk` 写入 `orders` 集合，并从 `process.env.WEWORK_WEBHOOK` 读取机器人 Webhook，调用机器人接口推送 Markdown 消息。
- 若仍需订单列表，可自行接入历史版本中的 orders 页面模板。

## 注意事项
- 本示例不包含支付能力。
- 若需要查看云端记录，请确保数据库集合 `orders` 权限设置为「仅创建者可读写」或合适的读规则。
- 机器人 Webhook 的安全由企业微信侧控制，切勿将 Webhook 明文写入代码仓库。

## 常见问题
- 报错“基础库版本过低”：请升级微信开发者工具基础库 ≥ 2.2.3。
- 云函数没有推送：检查函数环境变量 `WEWORK_WEBHOOK` 是否正确配置；或查看云函数日志。
- 读取订单为空：检查集合权限；确认已成功下单并写入 `orders`。

## 版本与协议
- 版本：1.0.0
- 许可证：MIT

## 维护脚本：批量修复 cover 为 fileID

将产品集合中 cover 为 http(s) URL 的记录，批量修正为云存储 fileID。

依赖：
- @cloudbase/node-sdk、dotenv
- 环境变量：`TCB_ENV_ID`、`TCB_SECRET_ID`、`TCB_SECRET_KEY`、`TCB_BUCKET`

运行方式：

```
TCB_ENV_ID=xxx \
TCB_SECRET_ID=xxx \
TCB_SECRET_KEY=xxx \
TCB_BUCKET=636c-cloud1-... \
node scripts/fix-cover-to-fileid.js
```

脚本逻辑：
- 连接云数据库（`products` 集合）。
- 查询 `cover` 以 `http`/`https` 开头的记录。
- 若 `images[0]` 已是 `cloud://` fileID，则用其覆盖 `cover`。
- 否则从 `cover` URL 提取文件名，并依据 `categoryId` 通过映射（`CATEGORY_NAME_FROM_ID`）获取中文类目名，调用 `buildFileID(中文类目名, 文件名)` 生成 fileID。
- 若映射缺失，会尝试从 URL 路径 `/prod-images/<目录>/...` 提取目录作为中文类目名。
- 打印处理统计与失败清单。

## 导入/更新：Excel → DB（products）

从两张 Excel 将产品导入/更新到云数据库 `products` 集合，仅处理指定行区间。

列定义：
- A 列：分类中文名（用 `CATEGORY_MAP` 映射到 `categoryId`）
- B 列：商品名
- C 列：可做尺寸（用分隔符 `/`、`、`、`，`、`；` 拆分）
- D 列：图片文件名（可多个，用 `/` 或 `，` 分隔）
- E 列：价格（基价）

文档生成规则：
- `_id`：`${categoryId}-${slugify(name)}`
- `variants`：C 列 → `[{id,name,price}]`，`price` 统一取 E 列
- `images`：D 列文件名映射为 `buildFileID(中文类目名, 文件名)`
- `cover`：`images[0]` 或空
- `sort`：按读取顺序自减，越上方越大
- `status`：1
- `options`：
  - `ins-roll`：`single` 类型口味选项（内置口味清单）
  - `four-inch`/`eight-inch`：`multi` 类型夹心选项（min=1, max=2，内置清单）

运行示例：

```
node scripts/import-products-from-excel.js \
  --excel "/Users/yipengli/Desktop/Products_name.xlsx:2-17,19-96" \
  --excel "/Users/yipengli/Desktop/cake_name3.xlsx:2-9,11-28,30-39,41-63,65-73,75-80,82-98,100-107,109-134,136-156,158-162"
```

环境变量（不要写死在代码里）：
- `TCB_ENV_ID`、`TCB_SECRET_ID`、`TCB_SECRET_KEY`、`TCB_BUCKET`

## 检查与报表（Audit）

巡检 `products` 数据，并输出统计与问题清单，可选自动修复明显问题。

检查项：
- `images`/`cover` 是否为 `cloud://` 开头
- 批量调用云存储临时链接接口校验 fileID 可用性
- `categoryId` 是否存在于 `categories` 集合
- `variants` 与 `options` 数据结构是否符合预期

运行：

```
node scripts/audit-products.js         # 仅检查
node scripts/audit-products.js --fix   # 检查并自动修复：cover 为空但 images[0] 是 fileID 时设置 cover
```

输出：
- 汇总统计：总数、images 为空、cover 非 fileID、fileID 无法转临时链接、category 丢失、variants/options 异常
- 明细清单：各类问题的 `_id` 列表（必要时附带详情）
