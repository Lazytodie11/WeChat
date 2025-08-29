# 甜品店点单微信小程序（无支付）

一个可运行的微信小程序示例：浏览商品 → 加入购物车 → 结算填写联系方式 → 云函数写入 `orders` → 企业微信群机器人通知店主。

## 功能概览
- 左侧竖向分类 + 右侧商品卡片 + 底部购物车浮条
- 底部 4 个 Tab：首页/点单/订单/我的
- 云函数：`cloudfunctions/createOrder` 写入订单并通过企业微信机器人 Webhook 通知
- 无支付，演示下单流程

## 目录结构
- `miniprogram/`：小程序前端
  - `pages/{home,menu,orders,profile,checkout,success}/`
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
- 在模拟器中切换到“点单”，添加商品，点击底部“去结算”，填写姓名和手机后提交。提交成功后：
  - `orders` 集合新增一条记录；
  - 若云函数环境变量 `WEWORK_WEBHOOK` 已设置，企业微信群机器人会收到新订单通知。

## UI 截图（占位）
- 在 `miniprogram/assets/` 自行替换 `logo.png`、`p1.jpg~p8.jpg` 为真实图片。
- 截图建议：
  - 首页（home）
  - 点单页（menu，含左侧分类、右侧商品卡片、购物车浮条）
  - 订单页（orders，空态与列表态）

## 在 menu 页新增分类和商品
当前 Demo 将分类与商品硬编码在 `miniprogram/pages/menu/index.js` 顶部：

1) 新增一个分类
   - 编辑 `categories` 数组，新增形如 `{ id: 'newcat', name: '新品' }` 的项；
2) 给该分类新增商品
   - 编辑 `goods` 数组，新增形如 `{ id: 'p9', cat: 'newcat', name: '新品拿铁', price: 22, image: 'assets/p9.jpg', desc: '限时上新' }`；
3) 资源
   - 将对应图片放入 `miniprogram/assets/` 并在 `image` 字段填入相对路径，如 `assets/p9.jpg`；
4) 页面行为
   - 右侧商品列表按分类分区展示，并支持锚点滚动；
   - 点击左侧分类时，右侧滚动至对应分区；
   - 商品卡片右下角“+ 加入”按钮用于加购，`-` 按钮用于减少数量。

## 代码说明
- 前端 `menu` 页加入购物车，数据存储于 `wx.setStorageSync('cart')`，在 `checkout` 页聚合下单。
- `checkout` 调用 `wx.cloud.callFunction({ name: 'createOrder', data: {...} })`。
- 云函数使用 `wx-server-sdk` 写入 `orders` 集合，并从 `process.env.WEWORK_WEBHOOK` 读取机器人 Webhook，调用机器人接口推送 Markdown 消息。
- `orders` 页默认按 `createTime` 倒序展示当前用户可读的订单（依赖集合权限“仅创建者可读写”）。

## 注意事项
- 本示例不包含支付能力。
- 若需要在 `orders` 页看到自己的订单，请确保数据库集合 `orders` 权限设置为「仅创建者可读写」或合适的读规则。
- 机器人 Webhook 的安全由企业微信侧控制，切勿将 Webhook 明文写入代码仓库。

## 常见问题
- 报错“基础库版本过低”：请升级微信开发者工具基础库 ≥ 2.2.3。
- 云函数没有推送：检查函数环境变量 `WEWORK_WEBHOOK` 是否正确配置；或查看云函数日志。
- 读取订单为空：检查集合权限；确认已成功下单并写入 `orders`。

## 版本与协议
- 版本：1.0.0
- 许可证：MIT
