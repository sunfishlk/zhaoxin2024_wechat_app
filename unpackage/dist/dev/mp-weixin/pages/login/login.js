"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_log = require("../../utils/log.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const studentNumber = common_vendor.ref("");
    const baseUrl = getApp().globalData.baseUrl;
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
    const login = async () => {
      if (checkRight.value) {
        try {
          let code = await getCode();
          console.log("login");
          common_vendor.index.setStorageSync("studentNumber", studentNumber.value);
          console.log(studentNumber.value);
          common_vendor.index.request({
            url: `${baseUrl}/api/student`,
            method: "POST",
            data: {
              // studentNumber: studentNumber.value,
              code,
              netid: studentNumber.value
            },
            success: (res) => {
              utils_log.log.info({
                requestData: {
                  code,
                  netid: studentNumber.value
                },
                responseData: res
              });
              console.log(res);
              if (res.data.success === false) {
                common_vendor.index.showToast({
                  title: res.data.message,
                  icon: "none",
                  duration: 2e3
                });
              } else {
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
                if (dateTime === null || dateTime === "0001-01-01T00:00:00Z") {
                  common_vendor.index.redirectTo({
                    url: "/pages/home/home"
                  });
                } else {
                  common_vendor.index.redirectTo({
                    url: "/pages/color-egg/color-egg"
                  });
                }
                common_vendor.index.setStorageSync("studentNumber", studentNumber.value);
                common_vendor.index.setStorageSync("cookie", res.cookies[0]);
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
        } catch (error) {
          console.error("获取 code 或登录失败", error);
          common_vendor.index.showToast({
            title: JSON.stringify(error),
            icon: "none",
            duration: 2e3
          });
        }
      } else {
        common_vendor.index.showToast({
          title: "学号格式或长度错误",
          icon: "none",
          duration: 2e3
        });
      }
    };
    const showAnimation = common_vendor.ref(false);
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
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
            common_vendor.index.clearStorageSync();
            console.log(res);
            console.log(code);
            common_vendor.index.setStorageSync("cookie", res.cookies[0]);
            showAnimation.value = true;
            if (res.data.success === false) {
              console.log(res.data.message);
              common_vendor.index.showToast({
                title: res.data.message,
                icon: "none",
                duration: 2e3
              });
              return;
            }
            if (res.data.data.is_first) {
              await sleep(1e3);
              hideLogo();
              console.log("首次登录,清空localStorage");
            } else {
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
              if (dateTime === null)
                ;
              else {
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
              await sleep(1e3);
              if (dateTime === null || dateTime === "0001-01-01T00:00:00Z") {
                common_vendor.index.redirectTo({
                  url: "/pages/home/home"
                });
              } else {
                common_vendor.index.redirectTo({
                  url: "/pages/color-egg/color-egg"
                });
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
    common_vendor.onShow(async () => {
      await checkIfFirstLogin();
    });
    const classList = common_vendor.ref(["input-rule", "un-show"]);
    function validateTenDigits(input) {
      const regex = /^\d{10}$/;
      return regex.test(input);
    }
    const checkRight = common_vendor.computed(() => {
      return validateTenDigits(studentNumber.value);
    });
    const showRule = () => {
      console.log(studentNumber.value);
      console.log(checkRight.value);
      if (!checkRight.value) {
        classList.value = ["input-rule"];
      } else {
        classList.value = ["input-rule", "un-show"];
      }
    };
    const logoShow = common_vendor.ref(true);
    const hideLogo = () => {
      console.log("hideLogo");
      logoShow.value = false;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.n({
          "animation": showAnimation.value
        }),
        b: logoShow.value ? "" : "none",
        c: common_vendor.o(showRule),
        d: studentNumber.value,
        e: common_vendor.o(($event) => studentNumber.value = $event.detail.value),
        f: common_vendor.n(classList.value),
        g: common_vendor.o(login),
        h: common_vendor.o((...args) => _ctx.next && _ctx.next(...args)),
        i: logoShow.value ? "none" : ""
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
