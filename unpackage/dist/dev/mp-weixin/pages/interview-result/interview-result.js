"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_log = require("../../utils/log.js");
const _sfc_main = {
  __name: "interview-result",
  setup(__props) {
    const success = common_vendor.ref(true);
    const displayStyle = common_vendor.ref("none");
    const isBlurred = common_vendor.ref(false);
    const showCode = () => {
      displayStyle.value = "flex";
      isBlurred.value = true;
    };
    const hideCode = () => {
      displayStyle.value = "none";
      isBlurred.value = false;
    };
    const groupUrl = common_vendor.ref("");
    const QQCode = common_vendor.ref("");
    const baseUrl = getApp().globalData.baseUrl;
    let cookie = common_vendor.index.getStorageSync("cookie");
    common_vendor.onMounted(() => {
      common_vendor.index.request({
        url: `${baseUrl}/api/student/interv`,
        method: "GET",
        header: {
          "Content-Type": "application/json",
          "Cookie": cookie
        },
        success: (res) => {
          console.log(res.data.data.interv);
          utils_log.log.info({
            responseData: res
          });
          if (res.data.success === false) {
            common_vendor.index.showToast({
              title: res.data.message,
              icon: "none"
            });
          } else {
            if (res.data.data.interv === "已通过") {
              success.value = true;
              groupUrl.value = res.data.data.url;
              QQCode.value = res.data.data.code;
              console.log(groupUrl.value);
              console.log(QQCode.value);
            } else {
              success.value = false;
            }
          }
        },
        fail: (err) => {
          console.log(err);
          common_vendor.index.showToast({
            title: JSON.stringify(err),
            icon: "none"
          });
        }
      });
    });
    const copyQQCode = () => {
      common_vendor.index.setClipboardData({
        data: QQCode.value,
        success: function() {
          common_vendor.index.showToast({
            title: `QQ群号${QQCode.value}已复制到剪贴板`,
            icon: "none"
          });
        }
      });
      console.log(QQCode.value);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n({
          "show": displayStyle.value === "flex"
        }),
        b: common_vendor.o(hideCode),
        c: groupUrl.value,
        d: common_vendor.t(QQCode.value),
        e: common_vendor.o(copyQQCode),
        f: displayStyle.value,
        g: common_vendor.o(showCode),
        h: common_vendor.n({
          "blurred": isBlurred.value
        }),
        i: !success.value ? 1 : "",
        j: common_vendor.n({
          "show": displayStyle.value === "flex"
        }),
        k: common_vendor.o(hideCode),
        l: displayStyle.value,
        m: common_vendor.n({
          "blurred": isBlurred.value
        }),
        n: success.value ? 1 : ""
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-13970578"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/pages/interview-result/interview-result.vue"]]);
wx.createPage(MiniProgramPage);
