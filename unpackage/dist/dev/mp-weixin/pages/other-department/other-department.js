"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "other-department",
  setup(__props) {
    const otherDepartment = common_vendor.ref("");
    const chooseDepartment = (depart) => {
      otherDepartment.value = depart;
      console.log(otherDepartment.value);
    };
    const last = () => {
      common_vendor.index.setStorageSync("otherDepartment", otherDepartment.value);
      common_vendor.index.navigateBack();
    };
    const next = () => {
      if (otherDepartment.value.trim() === "") {
        common_vendor.index.showToast({
          title: "请选择意向部门",
          icon: "none"
        });
        return;
      }
      common_vendor.index.setStorageSync("otherDepartment", otherDepartment.value);
      common_vendor.index.navigateTo({
        url: "/pages/skills/skills"
      });
    };
    common_vendor.onMounted(() => {
      if (common_vendor.index.getStorageSync("otherDepartment") !== "") {
        otherDepartment.value = common_vendor.index.getStorageSync("otherDepartment");
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n({
          active: otherDepartment.value === "技术部"
        }),
        b: common_vendor.o(($event) => chooseDepartment("技术部")),
        c: common_vendor.n({
          active: otherDepartment.value === "美工部"
        }),
        d: common_vendor.o(($event) => chooseDepartment("美工部")),
        e: common_vendor.n({
          active: otherDepartment.value === "视频部"
        }),
        f: common_vendor.o(($event) => chooseDepartment("视频部")),
        g: common_vendor.o(last),
        h: common_vendor.o(next)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4d356895"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/pages/other-department/other-department.vue"]]);
wx.createPage(MiniProgramPage);
