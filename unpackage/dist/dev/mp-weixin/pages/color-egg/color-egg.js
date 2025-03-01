"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_log = require("../../utils/log.js");
if (!Math) {
  CancelConfirmCard();
}
const CancelConfirmCard = () => "../../component/CancelConfirmCard.js";
const _sfc_main = {
  __name: "color-egg",
  setup(__props) {
    const baseUrl = getApp().globalData.baseUrl;
    const push = (route) => {
      common_vendor.index.navigateTo({
        url: `/pages/${route}/${route}`
      });
    };
    const pushBack = () => {
      common_vendor.index.navigateTo({
        url: "/pages/basic-info/basic-info"
      });
    };
    const getCode = () => {
      return new Promise((resolve, reject) => {
        common_vendor.index.login({
          provider: "weixin",
          success: (res) => {
            if (res.code) {
              console.log("登录 code:", res.code);
              resolve(res.code);
            } else {
              console.log("登录失败！" + res.errMsg);
              reject(new Error("登录失败！" + res.errMsg));
            }
          },
          fail: (err) => {
            console.log(err);
            reject(err);
          }
        });
      });
    };
    const checkIfFirstLogin = async () => {
      let code = "";
      try {
        code = await getCode();
        console.log(code);
      } catch (err) {
        console.log(err);
      }
      if (code) {
        common_vendor.index.request({
          url: `${baseUrl}/api/student`,
          method: "POST",
          data: {
            code
          },
          success: async (res) => {
            utils_log.log.info({
              requestData: {
                code
              },
              responseData: res
            });
            console.log(res);
            console.log(code);
            common_vendor.index.setStorageSync("cookie", res.cookies[0]);
            if (res.data.success === false) {
              console.log(res.data.message);
              common_vendor.index.showToast({
                title: res.data.message,
                icon: "none",
                duration: 2e3
              });
              return;
            }
            if (res.data.data.is_first)
              ;
            else {
              console.log(res);
              common_vendor.index.setStorageSync("studentNumber", res.data.data.stuinfo.netid);
              common_vendor.index.setStorageSync("name", res.data.data.stuinfo.name);
              common_vendor.index.setStorageSync("phoneNumber", res.data.data.stuinfo.phone);
              common_vendor.index.setStorageSync("email", res.data.data.stuinfo.mail);
              common_vendor.index.setStorageSync("mainDepartment", res.data.data.stuinfo.mainde);
              common_vendor.index.setStorageSync("otherDepartment", res.data.data.stuinfo.secondary);
              common_vendor.index.setStorageSync("skills", res.data.data.stuinfo.already);
              common_vendor.index.setStorageSync("wantToLearn", res.data.data.stuinfo.want);
              common_vendor.index.setStorageSync("whereKnow", res.data.data.stuinfo.whereknow);
              common_vendor.index.setStorageSync("college", res.data.data.stuinfo.clazz);
              let dateTime = res.data.data.stuinfo.time;
              if (dateTime === null) {
                common_vendor.index.setStorageSync("date", "");
                common_vendor.index.setStorageSync("time", "");
              } else {
                const splitDateTime = (dateTime2) => {
                  let [date, time] = dateTime2.split("T");
                  let [hour, minute] = time.split(":");
                  let [year, month, day] = date.split("-");
                  return { date: `${month}-${day}`, time: `${hour}:${minute}` };
                };
                common_vendor.index.setStorageSync("date", splitDateTime(dateTime).date);
                common_vendor.index.setStorageSync("time", splitDateTime(dateTime).time);
                console.log(dateTime);
                console.log(splitDateTime(dateTime).date);
                console.log(splitDateTime(dateTime).time);
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
      } else {
        console.log("登录 code 不存在");
      }
    };
    let cookie = common_vendor.index.getStorageSync("cookie");
    const showCancelButton = common_vendor.ref(true);
    const cancel = () => {
      common_vendor.index.request({
        url: `${baseUrl}/api/student/itv`,
        method: "DELETE",
        header: {
          "Content-Type": "application/json",
          "Cookie": cookie
        },
        success: (res) => {
          utils_log.log.info({
            responseData: res
          });
          console.log(res);
          if (res.data.success === false) {
            common_vendor.index.showToast({
              title: res.data.message,
              icon: "none"
            });
          } else {
            checkIfFirstLogin();
            common_vendor.index.reLaunch({
              url: "/pages/home/home"
            });
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
    };
    const cancelInterview = () => {
      cancel();
      hideCancelConfirmCard();
    };
    const keepInterview = () => {
      common_vendor.index.showToast({
        title: "已保留报名",
        icon: "none"
      });
      hideCancelConfirmCard();
    };
    const showCancelConfirm = common_vendor.ref(false);
    const showCancelConfirmCard = () => {
      showCancelConfirm.value = true;
    };
    const hideCancelConfirmCard = () => {
      showCancelConfirm.value = false;
    };
    common_vendor.onMounted(() => {
      common_vendor.index.request({
        url: `${baseUrl}/api/version?version=1`,
        method: "GET",
        success: (res) => {
          utils_log.log.info({
            responseData: res
          });
          if (res.data.success === false) {
            common_vendor.index.showToast({
              title: res.data.message,
              icon: "none"
            });
          } else {
            if (res.data.data.check_interv === true) {
              showCancelButton.value = false;
            } else {
              showCancelButton.value = true;
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: showCancelConfirm.value
      }, showCancelConfirm.value ? {
        b: common_vendor.o(cancelInterview),
        c: common_vendor.o(keepInterview)
      } : {}, {
        d: common_vendor.o(pushBack),
        e: common_vendor.o(($event) => push("QRCode")),
        f: common_vendor.o(($event) => push("position")),
        g: common_vendor.n(showCancelButton.value ? "hide" : ""),
        h: common_vendor.o(($event) => push("interview-result")),
        i: common_vendor.n(showCancelButton.value ? "" : "hide"),
        j: common_vendor.o(showCancelConfirmCard)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b132fa61"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/pages/color-egg/color-egg.vue"]]);
wx.createPage(MiniProgramPage);
