"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "skills",
  setup(__props) {
    const last = () => {
      common_vendor.index.setStorageSync("skills", skills.value);
      common_vendor.index.setStorageSync("wantToLearn", wantToLearn.value);
      common_vendor.index.navigateBack();
    };
    const next = () => {
      if (skills.value.trim() === "") {
        common_vendor.index.showToast({
          title: "已会不能为空",
          icon: "none"
        });
        return;
      }
      if (wantToLearn.value.trim() === "") {
        common_vendor.index.showToast({
          title: "想学不能为空",
          icon: "none"
        });
        return;
      }
      common_vendor.index.setStorageSync("skills", skills.value);
      common_vendor.index.setStorageSync("wantToLearn", wantToLearn.value);
      common_vendor.index.navigateTo({
        url: "/pages/interview/interview"
      });
    };
    const skills = common_vendor.ref("");
    const wantToLearn = common_vendor.ref("");
    common_vendor.onMounted(() => {
      if (common_vendor.index.getStorageSync("skills") !== "") {
        skills.value = common_vendor.index.getStorageSync("skills");
      }
      if (common_vendor.index.getStorageSync("wantToLearn") !== "") {
        wantToLearn.value = common_vendor.index.getStorageSync("wantToLearn");
      }
    });
    const skillsList = common_vendor.ref(["rule", "hide"]);
    const wantToLearnList = common_vendor.ref(["rule", "hide"]);
    const checkSkills = () => {
      if (skills.value.trim() === "") {
        skillsList.value = ["rule"];
      } else {
        skillsList.value = ["rule", "hide"];
      }
    };
    const checkWantToLearn = () => {
      if (wantToLearn.value.trim() === "") {
        wantToLearnList.value = ["rule"];
      } else {
        wantToLearnList.value = ["rule", "hide"];
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(checkSkills),
        b: skills.value,
        c: common_vendor.o(($event) => skills.value = $event.detail.value),
        d: common_vendor.n(skillsList.value),
        e: common_vendor.o(checkWantToLearn),
        f: wantToLearn.value,
        g: common_vendor.o(($event) => wantToLearn.value = $event.detail.value),
        h: common_vendor.n(wantToLearnList.value),
        i: common_vendor.o(last),
        j: common_vendor.o(next)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1c7c41d0"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/pages/skills/skills.vue"]]);
wx.createPage(MiniProgramPage);
