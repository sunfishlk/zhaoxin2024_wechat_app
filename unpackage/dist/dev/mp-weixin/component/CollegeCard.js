"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "CollegeCard",
  props: {
    collegeProps: String
  },
  emits: ["exit"],
  setup(__props, { emit }) {
    const props = __props;
    const colleges = ["彭康书院", "文治书院", "南洋书院", "仲英书院", "崇实书院", "宗濂书院", "启德书院", "励志书院", "钱学森书院", "其他"];
    const chooseCollege = (college) => {
      console.log(college);
      emit("exit", college);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("hide")),
        b: common_vendor.f(colleges, (college, index, i0) => {
          return {
            a: common_vendor.t(college),
            b: index,
            c: common_vendor.o(($event) => chooseCollege(college), index),
            d: college === props.collegeProps ? "#eecfd3" : "white"
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fcb22c3f"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/component/CollegeCard.vue"]]);
wx.createComponent(Component);
