"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  Map();
}
const Map = () => "../../component/Map.js";
const _sfc_main = {
  __name: "position",
  setup(__props) {
    const pushBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(pushBack)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7a211605"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/pages/position/position.vue"]]);
wx.createPage(MiniProgramPage);
