"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "main-department",
  setup(__props) {
    const mainDepartment = common_vendor.ref("");
    const chooseDepartment = (depart) => {
      mainDepartment.value = depart;
      console.log(mainDepartment.value);
    };
    const last = () => {
      common_vendor.index.navigateBack();
      common_vendor.index.setStorageSync("mainDepartment", mainDepartment.value);
    };
    const next = () => {
      if (mainDepartment.value.trim() === "") {
        common_vendor.index.showToast({
          title: "请选择主选部门",
          icon: "none"
        });
        return;
      }
      common_vendor.index.setStorageSync("mainDepartment", mainDepartment.value);
      common_vendor.index.navigateTo({
        url: "/pages/other-department/other-department"
      });
    };
    common_vendor.onMounted(() => {
      if (common_vendor.index.getStorageSync("mainDepartment") !== "") {
        mainDepartment.value = common_vendor.index.getStorageSync("mainDepartment");
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n({
          active: mainDepartment.value === "技术部"
        }),
        b: common_vendor.o(($event) => chooseDepartment("技术部")),
        c: common_vendor.n({
          active: mainDepartment.value === "美工部"
        }),
        d: common_vendor.o(($event) => chooseDepartment("美工部")),
        e: common_vendor.n({
          active: mainDepartment.value === "视频部"
        }),
        f: common_vendor.o(($event) => chooseDepartment("视频部")),
        g: common_vendor.o(last),
        h: common_vendor.o(next)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2abdf7b5"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/pages/main-department/main-department.vue"]]);
wx.createPage(MiniProgramPage);
