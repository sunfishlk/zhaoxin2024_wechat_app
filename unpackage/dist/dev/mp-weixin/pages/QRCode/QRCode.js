"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_w_barcode2 = common_vendor.resolveComponent("w-barcode");
  _easycom_w_barcode2();
}
const _easycom_w_barcode = () => "../../uni_modules/wmf-code/components/w-barcode/w-barcode.js";
if (!Math) {
  _easycom_w_barcode();
}
const _sfc_main = {
  __name: "QRCode",
  setup(__props) {
    const pushBack = () => {
      common_vendor.index.navigateBack();
    };
    const options = common_vendor.reactive({
      width: 400,
      // 宽度 单位rpx
      height: 150,
      // 高度 单位rpx
      color: ["#000"],
      code: null
      // 生成条形码的值
    });
    common_vendor.onMounted(() => {
      options.code = common_vendor.index.getStorageSync("studentNumber");
    });
    return (_ctx, _cache) => {
      return {
        a: options.code,
        b: common_vendor.p({
          options
        }),
        c: common_vendor.o(pushBack)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4f9f0560"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/pages/QRCode/QRCode.vue"]]);
wx.createPage(MiniProgramPage);
