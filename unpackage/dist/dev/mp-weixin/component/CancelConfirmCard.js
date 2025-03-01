"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "CancelConfirmCard",
  emits: ["yes", "no"],
  setup(__props, { emit }) {
    const emitYes = () => {
      emit("yes");
      console.log("yes");
    };
    const emitNo = () => {
      emit("no");
      console.log("no");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(emitYes),
        b: common_vendor.o(emitNo)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2ea0300e"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/component/CancelConfirmCard.vue"]]);
wx.createComponent(Component);
