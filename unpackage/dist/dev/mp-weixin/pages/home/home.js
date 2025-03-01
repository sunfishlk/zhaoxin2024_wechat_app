"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const next = () => {
      common_vendor.index.navigateTo({
        url: "../../pages/basic-info/basic-info"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(next)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
