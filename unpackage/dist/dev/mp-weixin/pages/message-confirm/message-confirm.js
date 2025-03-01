"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_log = require("../../utils/log.js");
const _sfc_main = {
  __name: "message-confirm",
  setup(__props) {
    const baseUrl = getApp().globalData.baseUrl;
    const message = common_vendor.ref({
      name: "",
      college: "",
      studentNumber: "",
      phoneNumber: "",
      email: "",
      mainDepartment: "",
      otherDepartment: "",
      skills: "",
      wantToLearn: "",
      schoolArea: "",
      date: "",
      time: "",
      position: "",
      whereKnow: ""
    });
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
      let code2 = "";
      try {
        code = await getCode();
        code2 = await getCode();
        console.log(code);
        console.log(code2);
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
    const submit = () => {
      let cookie = common_vendor.index.getStorageSync("cookie");
      console.log(cookie);
      const combineDateTime = (date, time) => {
        let dateTimeString = `2024-${date}T${time}:00.00+08:00`;
        return dateTimeString;
      };
      let dateTime = combineDateTime(message.value.date, message.value.time);
      console.log(dateTime);
      console.log({
        name: message.value.name,
        mainde: message.value.mainDepartment,
        time: dateTime,
        netid: message.value.studentNumber,
        secondary: message.value.otherDepartment,
        Phone: message.value.phoneNumber,
        mail: message.value.email,
        already: message.value.skills,
        want: message.value.wantToLearn,
        whereknow: message.value.whereKnow,
        clazz: message.value.college
        // schoolArea: message.value.schoolArea,
        // position: message.value.position
      });
      const sendRequest = (url, data) => {
        return new Promise((resolve, reject) => {
          common_vendor.index.request({
            url,
            method: "PUT",
            header: {
              "Content-Type": "application/json",
              "Cookie": cookie
            },
            data,
            success: (res) => {
              utils_log.log.info({
                requestData: {
                  data
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
                console.log(res.data.message);
                reject(res.data.message);
              } else {
                resolve(res);
              }
            },
            fail: (err) => {
              console.log(err);
              reject(err);
            }
          });
        });
      };
      let request1 = sendRequest(`${baseUrl}/api/student/info`, {
        name: message.value.name,
        time: dateTime,
        netid: message.value.studentNumber,
        Phone: message.value.phoneNumber,
        mail: message.value.email,
        already: message.value.skills,
        want: message.value.wantToLearn,
        whereknow: message.value.whereKnow,
        clazz: message.value.college
      });
      request1.then((res1) => {
        if (res1.data.success) {
          let request2 = sendRequest(`${baseUrl}/api/student/itv`, {
            time: dateTime,
            department: message.value.mainDepartment,
            secondary: message.value.otherDepartment
          });
          return request2;
        } else {
          throw new Error(res1.data.message);
        }
      }).then((res2) => {
        if (res2.data.success) {
          common_vendor.index.showToast({
            title: "提交成功",
            icon: "success",
            duration: 2e3
          });
          subscribeMsg();
        } else {
          throw new Error(res2.data.message);
        }
      }).catch(async (error) => {
        await checkIfFirstLogin();
        console.log(error);
      });
    };
    const subscribeMsg = async () => {
      const register = "nQrZdlf6tFtAyiHjvjtFHsKMAWICDvvmYVpP2448-0M";
      const itvTime = "EkFzf-rthPh8QVXvTaH-dhnWkeSg1wWodVhn044cJWA";
      const itvRes = "SjIczANpmNHE8I8AKisDK3zWqQauGfm9F5X7PTFk4PY";
      common_vendor.wx$1.requestSubscribeMessage({
        tmplIds: [register, itvTime, itvRes],
        success: (res) => {
          console.log(res);
          let state = {
            register: res[register] === "accept" ? 1 : 0,
            itvTime: res[itvTime] === "accept" ? 1 : 0,
            itvRes: res[itvRes] === "accept" ? 1 : 0
          };
          let cookie = common_vendor.index.getStorageSync("cookie");
          common_vendor.index.request({
            url: `${baseUrl}/api/student/submsg`,
            method: "PUT",
            header: {
              "Content-Type": "application/json",
              "Cookie": cookie
            },
            data: state,
            success: (res2) => {
              utils_log.log.info({
                requestData: {
                  state
                },
                responseData: res2
              });
              console.log(res2);
              common_vendor.index.reLaunch({
                url: "/pages/color-egg/color-egg"
              });
            },
            fail: (err) => {
              console.log(err);
              common_vendor.index.showToast({
                title: JSON.stringify(err),
                icon: "none"
              });
            }
          });
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
    const isFormal = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      message.value.name = common_vendor.index.getStorageSync("name");
      message.value.college = common_vendor.index.getStorageSync("college");
      message.value.studentNumber = common_vendor.index.getStorageSync("studentNumber");
      message.value.phoneNumber = common_vendor.index.getStorageSync("phoneNumber");
      message.value.email = common_vendor.index.getStorageSync("email");
      message.value.mainDepartment = common_vendor.index.getStorageSync("mainDepartment");
      message.value.otherDepartment = common_vendor.index.getStorageSync("otherDepartment");
      message.value.skills = common_vendor.index.getStorageSync("skills");
      message.value.wantToLearn = common_vendor.index.getStorageSync("wantToLearn");
      message.value.schoolArea = common_vendor.index.getStorageSync("schoolArea");
      message.value.date = common_vendor.index.getStorageSync("date");
      message.value.time = common_vendor.index.getStorageSync("time");
      message.value.position = common_vendor.index.getStorageSync("position");
      message.value.whereKnow = common_vendor.index.getStorageSync("whereKnow");
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
            if (res.data.data.formal === true) {
              isFormal.value = true;
            } else {
              isFormal.value = false;
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
    const pushBack = (backDepth) => {
      common_vendor.index.navigateBack({
        delta: backDepth
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !isFormal.value
      }, !isFormal.value ? {
        b: common_vendor.t(message.value.name),
        c: common_vendor.o(($event) => pushBack(5))
      } : {}, {
        d: common_vendor.t(message.value.college),
        e: common_vendor.o(($event) => pushBack(5)),
        f: !isFormal.value
      }, !isFormal.value ? {
        g: common_vendor.t(message.value.phoneNumber),
        h: common_vendor.o(($event) => pushBack(5))
      } : {}, {
        i: !isFormal.value
      }, !isFormal.value ? {
        j: common_vendor.t(message.value.email),
        k: common_vendor.o(($event) => pushBack(5))
      } : {}, {
        l: common_vendor.t(message.value.whereKnow),
        m: common_vendor.o(($event) => pushBack(5)),
        n: common_vendor.t(message.value.mainDepartment),
        o: common_vendor.o(($event) => pushBack(4)),
        p: common_vendor.t(message.value.otherDepartment),
        q: common_vendor.o(($event) => pushBack(3)),
        r: common_vendor.t(message.value.skills),
        s: common_vendor.o(($event) => pushBack(2)),
        t: common_vendor.t(message.value.wantToLearn),
        v: common_vendor.o(($event) => pushBack(2)),
        w: common_vendor.t(message.value.schoolArea),
        x: common_vendor.o(($event) => pushBack(1)),
        y: common_vendor.t(message.value.position),
        z: common_vendor.o(($event) => pushBack(1)),
        A: common_vendor.t(message.value.date),
        B: common_vendor.o(($event) => pushBack(1)),
        C: common_vendor.t(message.value.time),
        D: common_vendor.o(($event) => pushBack(1)),
        E: common_vendor.o(submit)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6da366e8"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/pages/message-confirm/message-confirm.vue"]]);
wx.createPage(MiniProgramPage);
