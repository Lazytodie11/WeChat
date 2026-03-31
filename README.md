# Dessert Showcase WeChat Mini Program (No Payments)

A production-ready WeChat Mini Program template for dessert browsing and lead capture: **showcase → local selection → submit order form** (no payments).

## 🎬 Demo
- Demo Video: (add Loom/YouTube link)
- Screenshots: (add 3–6 screenshots under `docs/screenshots/`)

## ⭐ Highlights
- Category browsing UI: left categories + right product cards + bottom “Selected” bar
- Local cart persistence via `wx.setStorageSync('cart')`
- Cloud Function `createOrder`: writes to `orders` collection + sends **WeCom robot** notification
- Review-friendly: all prices labeled **“for display only”**, no payment flow

## 🧱 Tech Stack
- WeChat Mini Program (WXML/WXSS/JS)
- WeChat Cloud Development (TCB): Database + Cloud Functions
- WeCom robot webhook notification

## 🚀 Quick Start (1-minute)
1. Import this repo into **WeChat Developer Tools**
2. Enable Cloud Development (TCB) and copy your **Environment ID**
3. Create DB collection: `orders`
4. Deploy Cloud Function: `cloudfunctions/createOrder`
5. Set env var `WEWORK_WEBHOOK` in the cloud function (never hard-code)
6. Update `miniprogram/app.js`:
   ```js
   wx.cloud.init({ env: 'your-env-id', traceUser: true });

<details> <summary>📚 Full documentation (setup, data model, scripts, FAQ)</summary>

  
# Dessert Showcase WeChat Mini Program (No Payments)

This repository contains a production-ready WeChat Mini Program template. Shoppers can browse desserts, add them to a local “Selected” list, review the list on the checkout page, and submit an order form that is persisted through the `orders` collection plus an Enterprise WeChat robot notification. All prices are labeled “for display only” so the project can pass review before real payments are enabled.

## Feature Highlights
- Left-hand vertical categories, right-hand product cards, and a bottom “Selected” bar.
- Three tabs only: Home / Works / Profile.
- Cloud Functions: `cloudfunctions/createOrder` writes orders and pings a WeCom robot webhook.
- No payment capability. The flow demonstrates “showcase → capture lead info” but can be reverted to a real checkout if needed.

## Project Layout
- `miniprogram/`: Mini Program front end
  - `pages/{home,menu,profile,checkout,success}/`
  - `components/cart-bar/`
  - `utils/cart.js`
  - `assets/` placeholder images (`logo.png`, `p1.jpg` … `p8.jpg`)
- `cloudfunctions/createOrder/`: Cloud Function implementation
- Tooling: `.github/workflows/ci.yml`, `.editorconfig`, `.gitignore`, `CODEOWNERS`

## Quick Start
1. Open the WeChat Developer Tools, choose **Import Project**, and point the root to this repository.

2. Enable Cloud Development (TCB)
   - Activate Cloud Development in the top “云开发” panel and note the Environment ID (e.g., `prod-abc123`).
   - Recommended DB permission: set the `orders` collection to “Only creator can read/write”.

3. Create the `orders` collection
   - In the “Database” tab, add a new collection named `orders`.

4. Deploy the `createOrder` Cloud Function
   - In “云开发” → “云函数”, create a function called `createOrder` and upload the code from `cloudfunctions/createOrder`.
   - Under the function’s environment variables, add:
     - `WEWORK_WEBHOOK`: Enterprise WeChat robot webhook (never hard-code it into source files).

5. Configure the client environment
   - Open `miniprogram/app.js` and replace:
     ```js
     wx.cloud.init({ env: 'your-env-id', traceUser: true });
     ```
     with your actual environment ID.

6. Preview locally
   - Confirm the `orders` collection exists and the `createOrder` function deploys successfully.
   - In the simulator, switch to “Works”, add items, tap the bottom “View” bar, confirm the list, and submit “Complete Showcase”. On success:
     - A new document is inserted into `orders`.
     - If `WEWORK_WEBHOOK` is configured, the robot receives a markdown notification.

## UI Screenshots (Placeholders)
- Replace `logo.png` and `p1.jpg` ~ `p8.jpg` in `miniprogram/assets/` with your real assets.
- Suggested screenshots:
  - Home page (`home`)
  - Works page (`menu`) showing categories, product cards, and the Selected bar
  - Checkout page (`checkout`) showing the Selected list and contact info

## Adding Categories and Products
The Works page is completely data-driven via `miniprogram/data/catalog.js`.

- Add categories by pushing `{ id, name }` into `categories` (use slug-style IDs, e.g., `cheese-cake`).
- Add products by pushing `{ id, categoryId, name, brief, cover, images, variants }` into `products`.
  - `categoryId` must match an existing category.
  - `variants` only describe display sizes/flavors (no pricing logic).
- Images can live under `miniprogram/assets/` (e.g., `/assets/p1.jpg`) or any public URL that your WeChat account allows.

Page behavior:
- The left pane renders `categories`, selecting the first entry by default.
- The right pane renders `products.filter(p => p.categoryId === activeCategoryId)`.
- When a category has no products, the right pane shows a “No items yet” placeholder.
- Add/remove buttons sync with the bottom “Selected” bar and persist to `wx.setStorageSync('cart')`.

## Code Notes
- `menu` handles local selections and stores them in `wx.setStorageSync('cart')`; `checkout` aggregates them for submission.
- `checkout` calls `wx.cloud.callFunction({ name: 'createOrder', data: { ... } })`.
- The cloud function uses `wx-server-sdk` to write `orders` and pulls the robot webhook from `process.env.WEWORK_WEBHOOK`.
- If you still need an orders list page, reuse the template from an earlier commit or build a new admin page.

## Things to Keep in Mind
- Payments are intentionally omitted.
- To inspect orders in the cloud, keep the `orders` collection permissions at “Only creator can read/write” (or a suitable rule).
- Robot webhook security is managed on the WeCom side; never hard-code the webhook URL in the repo.

## FAQ
- **“Base library version too low”**: upgrade the WeChat Developer Tools base library to ≥ 2.2.3.
- **Robot didn’t receive the notification**: verify `WEWORK_WEBHOOK` and review the Cloud Function logs.
- **`orders` appears empty**: double-check collection permissions and confirm the checkout succeeded.

## Version & License
- Version: 1.0.0
- License: MIT

## Maintenance Script: Fix `cover` to FileID

This script rewrites any `products.cover` that still uses `http(s)` URLs and replaces them with cloud storage fileIDs.

Dependencies:
- `@cloudbase/node-sdk`, `dotenv`
- Environment variables: `TCB_ENV_ID`, `TCB_SECRET_ID`, `TCB_SECRET_KEY`, `TCB_BUCKET`

Usage:

```
TCB_ENV_ID=xxx \
TCB_SECRET_ID=xxx \
TCB_SECRET_KEY=xxx \
TCB_BUCKET=636c-cloud1-... \
node scripts/fix-cover-to-fileid.js
```

How it works:
- Connects to the `products` collection.
- Queries documents whose `cover` starts with `http` or `https`.
- If `images[0]` already contains a `cloud://` fileID, it reuses that value for `cover`.
- Otherwise, it derives the file name from the URL, maps `categoryId` to the Chinese directory, and calls `buildFileID(dir, filename)`.
- When the mapping is missing, it extracts the directory portion from `/prod-images/<dir>/...`.
- Prints processing stats and a failure list.

## Import/Update Products from Excel → DB

Import products from two Excel spreadsheets into the `products` collection, processing only the specified row ranges.

Column definitions:
- **A**: Category name in Chinese (mapped to `categoryId` via `CATEGORY_MAP`).
- **B**: Product name.
- **C**: Supported sizes (split by `/`, `、`, `，`, `；` as delimiters).
- **D**: Image filenames (multiple values separated by `/` or `，`).
- **E**: Price (base price for every variant in that row).

Document rules:
- `_id`: ``${categoryId}-${slugify(name)}``
- `variants`: derived from column C and normalized to `{ id, name, price }`, using column E for price.
- `images`: map column D filenames through `buildFileID(中文目录, 文件名)`.
- `cover`: first entry in `images`, if any.
- `sort`: descending order (higher value for earlier rows).
- `status`: `1`
- `options`:
  - `ins-roll`: single-choice flavor options (built-in list).
  - `four-inch` / `eight-inch`: multi-choice fillings (`min=1`, `max=2`).

Run example:

```
node scripts/import-products-from-excel.js \
  --excel "/Users/yipengli/Desktop/Products_name.xlsx:2-17,19-96" \
  --excel "/Users/yipengli/Desktop/cake_name3.xlsx:2-9,11-28,30-39,41-63,65-73,75-80,82-98,100-107,109-134,136-156,158-162"
```

Required environment variables (never hard-code them):
- `TCB_ENV_ID`, `TCB_SECRET_ID`, `TCB_SECRET_KEY`, `TCB_BUCKET`

## Audit & Reporting

`scripts/audit-products.js` inspects the `products` collection, prints statistics, and optionally fixes obvious issues.

Checks performed:
- `images` / `cover` must start with `cloud://`.
- Every fileID can be converted to a valid temporary URL.
- `categoryId` exists in the `categories` collection.
- `variants` and `options` follow the expected schema.

Usage:

```
node scripts/audit-products.js         # report only
node scripts/audit-products.js --fix   # also auto-fix cover when images[0] already has a fileID
```

Output:
- Summary counts: total products, missing images, cover not fileID, invalid fileIDs, missing category, malformed variants/options.
- Detailed lists: `_id` arrays per issue type (with extra notes when helpful).

</details>
