const USE_DB = true; // 默认开启，可切换为 false 回退本地数据
const PAGE_SIZE = 20;

// 首页公共图片文件名（位于云存储 prod-images/common/ 目录下）
// 将下列文件名改成你实际上传到“存储/prod-images/common/”的名字
const HOME_COMMON_IMAGES = {
  // 首页横幅
  banner: 'logo.jpg',
  // 中间品牌 logo
  logo: 'WechatIMG173.jpg',
  // 轮播图
  slides: ['WechatIMG166.jpg', 'WechatIMG167.jpg']
};

// 可选：当无法自动探测 ENV/Bucket 时，手动指定（留空则自动探测）
const HOME_COMMON_OVERRIDE = {
  envId: 'cloud1-7gk4rj31c1fce8b0',
  bucket: '636c-cloud1-7gk4rj31c1fce8b0-1380779246'
};

// 全局加载图（切换页面时显示）。优先使用完整 fileID。
const LOADING_SPLASH_FILEID = 'cloud://cloud1-7gk4rj31c1fce8b0.636c-cloud1-7gk4rj31c1fce8b0-1380779246/prod-images/common/WechatIMG165.jpg';
// 全局加载图时长建议（毫秒）
const LOADING_MIN_MS = 600; // 最少展示，避免闪烁
const LOADING_MAX_MS = 10000; // 兜底上限（组件内部也有 10s 兜底）

// 订单空态图（位于 prod-images/common/；留空则不显示图片，只显示文案）
const HOME_EMPTY_IMAGE = '';

module.exports = { USE_DB, PAGE_SIZE, HOME_COMMON_IMAGES, HOME_COMMON_OVERRIDE, LOADING_SPLASH_FILEID, LOADING_MIN_MS, LOADING_MAX_MS, HOME_EMPTY_IMAGE };
