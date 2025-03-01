"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/home/home.js";
  "./pages/basic-info/basic-info.js";
  "./pages/main-department/main-department.js";
  "./pages/other-department/other-department.js";
  "./pages/skills/skills.js";
  "./pages/interview/interview.js";
  "./pages/message-confirm/message-confirm.js";
  "./pages/color-egg/color-egg.js";
  "./pages/QRCode/QRCode.js";
  "./pages/position/position.js";
  "./pages/interview-result/interview-result.js";
}
const _sfc_main = {
  globalData: {
    // name:'',
    // college:'',
    // studentNumber:'',
    // phoneNumber:'',
    // email:'',
    // mainDepartment:'',
    // otherDepartment:'',
    // skills:'',
    // wantToLearn:'',
    // date:'',
    // time:'',
    // whereKnow:'',
    baseUrl: "https://zhaoxin.dev.tiaozhan.com"
  },
  onLaunch() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
    let updateManager = common_vendor.index.getUpdateManager();
    if (!updateManager) {
      return;
    } else {
      if (common_vendor.index.canIUse("getUpdateManager")) {
        updateManager.onCheckForUpdate(function(res) {
          if (res.hasUpdate) {
            updateManager.onUpdateReady(function() {
              common_vendor.index.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否重启应用？",
                success: function(res2) {
                  if (res2.confirm) {
                    updateManager.applyUpdate();
                  }
                }
              });
            });
            updateManager.onUpdateFailed(function() {
              common_vendor.index.showModal({
                // 新的版本下载失败
                title: "已经有新版本了哟~",
                content: "新版本已经上线啦~，请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~"
              });
            });
          }
        });
      } else {
        common_vendor.index.showModal({
          // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
          title: "溫馨提示",
          content: "当前微信版本过低，部分功能无法使用，请升级到最新微信版本后重试。"
        });
      }
    }
  },
  onHide() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
