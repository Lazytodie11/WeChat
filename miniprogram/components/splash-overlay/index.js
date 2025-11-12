const { HOME_COMMON_IMAGES, HOME_COMMON_OVERRIDE } = require('../../config');

Component({
  properties: {
    // 若为 0，则不自动隐藏，需外部调用 hide()
    duration: { type: Number, value: 0 },
    // 传入 cloud:// 完整 fileID（优先使用）
    fileId: { type: String, value: '' },
    // 或仅传入文件名，位于 prod-images/common 目录（作为次选）
    file: { type: String, value: '' }
  },
  data: { visible: false, url: '' },
  methods: {
    async show(opts={}){
      try{
        const cfg = require('../../config');
        const fileIdFromArg = (opts && opts.fileId) || (cfg && cfg.LOADING_SPLASH_FILEID) || '';
        const fileName = this.data.file || (HOME_COMMON_IMAGES && HOME_COMMON_IMAGES.banner) || '';
        const env = (HOME_COMMON_OVERRIDE && HOME_COMMON_OVERRIDE.envId) || '';
        const bucket = (HOME_COMMON_OVERRIDE && HOME_COMMON_OVERRIDE.bucket) || '';
        let url='';
        if (fileIdFromArg) {
          const { fileList } = await wx.cloud.getTempFileURL({ fileList: [fileIdFromArg] });
          url = (fileList && fileList[0] && fileList[0].tempFileURL) || '';
        } else if (fileName && env && bucket) {
          const fid = `cloud://${env}.${bucket}/prod-images/common/${fileName}`;
          const { fileList } = await wx.cloud.getTempFileURL({ fileList: [fid] });
          url = (fileList && fileList[0] && fileList[0].tempFileURL) || '';
        }
        this.setData({ url, visible: true });
        const d = Number(this.data.duration||0);
        if (d>0) setTimeout(()=> this.setData({ visible: false }), d);
        // 安全兜底：最长 10 秒自动隐藏，防止异常卡住
        setTimeout(()=>{ if(this.data.visible) this.setData({ visible:false }); }, 10000);
      }catch(_){ this.setData({ visible: false }); }
    },
    showWithUrl(url){
      try{ this.setData({ url, visible: true }); } catch(_){ }
    },
    hide(){ this.setData({ visible: false }); }
  }
});
