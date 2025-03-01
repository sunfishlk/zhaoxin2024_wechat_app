"use strict";
const common_vendor = require("../common/vendor.js");
const utils_log = require("../utils/log.js");
const _sfc_main = {
  __name: "DateCard",
  props: {
    dateProps: String
  },
  emits: ["exit", "hide"],
  setup(__props, { emit }) {
    const props = __props;
    const baseUrl = getApp().globalData.baseUrl;
    const chosenDate = common_vendor.ref({
      month: "",
      day: ""
    });
    const month = common_vendor.ref("八月");
    const hideEight = common_vendor.ref(false);
    const hideNine = common_vendor.ref(true);
    const clickableEight = common_vendor.ref(false);
    const clickableNine = common_vendor.ref(true);
    const AugustDayList1 = [1, 2, 3];
    const AugustDayList2 = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    const SeptemberDayList1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
    const SeptemberDayList2 = [29, 30];
    const nextPage = () => {
      console.log("nextPage");
      month.value = "九月";
      hideEight.value = true;
      hideNine.value = false;
      clickableEight.value = true;
      clickableNine.value = false;
    };
    const lastPage = () => {
      console.log("lastPage");
      month.value = "八月";
      hideEight.value = false;
      hideNine.value = true;
      clickableEight.value = false;
      clickableNine.value = true;
    };
    const combineDate = (month2, day) => {
      if (month2 === "" || day === "")
        return "";
      return `${month2 < 10 ? "0" + month2 : month2}-${day < 10 ? "0" + day : day}`;
    };
    const checkIfOutDate = (month2, day) => {
      const today = /* @__PURE__ */ new Date();
      const todayMonth = today.getMonth() + 1;
      const todayDate = today.getDate();
      if (todayMonth > month2) {
        return true;
      } else if (todayMonth === month2) {
        if (todayDate > day) {
          return true;
        }
      }
      return false;
    };
    const checkDateIfCanChoose = (month2, day) => {
      if (availableDates.value.includes(combineDate(month2, day))) {
        return "black";
      }
      if (unavailableDates.value.includes(combineDate(month2, day))) {
        return "red";
      }
      return "";
    };
    const parseAndSelectDate = (dateString) => {
      const date = new Date(dateString);
      const monthNum = date.getMonth() + 1;
      const dayNum = date.getDate();
      chosenDate.value.month = monthNum;
      chosenDate.value.day = dayNum;
      if (monthNum === 8) {
        month.value = "八月";
        clickableEight.value = false;
        clickableNine.value = true;
        hideEight.value = false;
        hideNine.value = true;
      } else if (monthNum === 9) {
        month.value = "九月";
        clickableNine.value = false;
        clickableEight.value = true;
        hideEight.value = true;
        hideNine.value = false;
      }
    };
    const chooseDate = (month2, day) => {
      if (checkDateIfCanChoose(month2, day) === "black") {
        chosenDate.value.month = month2;
        chosenDate.value.day = day;
        console.log("chooseDate");
        console.log(month2);
        console.log(day);
        emit("exit", month2, day);
      } else if (checkDateIfCanChoose(month2, day) === "red") {
        if (checkIfOutDate(month2, day)) {
          common_vendor.index.showToast({
            title: "该日期已过期，请选择其他日期",
            icon: "none",
            duration: 1e3
          });
        } else {
          common_vendor.index.showToast({
            title: "该日期已被预约满，请选择其他日期",
            icon: "none",
            duration: 1e3
          });
        }
        console.log("cannot choose");
      } else {
        console.log("cannot choose");
      }
    };
    const isChosen = (month2, day) => {
      return chosenDate.value.month === month2 && chosenDate.value.day === day;
    };
    common_vendor.watch(() => props.dateProps, (newDate) => {
      if (newDate) {
        parseAndSelectDate(newDate);
      }
    });
    let cookie = common_vendor.index.getStorageSync("cookie");
    const availableDates = common_vendor.ref([]);
    const unavailableDates = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      console.log("onShow");
      if (props.dateProps) {
        parseAndSelectDate(props.dateProps);
      }
      common_vendor.index.request({
        url: `${baseUrl}/api/student/date`,
        method: "GET",
        header: {
          "Content-Type": "application/json",
          "Cookie": cookie
        },
        success: (res) => {
          utils_log.log.info({
            responseData: res
          });
          console.log(res);
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].available !== 0) {
              availableDates.value.push(res.data.data[i].date.substring(5));
            } else {
              unavailableDates.value.push(res.data.data[i].date.substring(5));
            }
          }
          console.log(availableDates.value);
          console.log(unavailableDates.value);
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
      return {
        a: common_vendor.o(($event) => _ctx.$emit("hide")),
        b: common_vendor.f(AugustDayList1, (day, index, i0) => {
          return {
            a: common_vendor.t(day),
            b: index,
            c: common_vendor.s({
              "color": checkDateIfCanChoose(8, day)
            }),
            d: common_vendor.s({
              "background-color": isChosen(8, day) ? "#eecfd3" : "white"
            }),
            e: common_vendor.o(($event) => chooseDate(8, day), index)
          };
        }),
        c: common_vendor.f(AugustDayList2, (day, index, i0) => {
          return {
            a: common_vendor.t(day),
            b: index,
            c: common_vendor.s({
              "color": checkDateIfCanChoose(8, day)
            }),
            d: common_vendor.s({
              "background-color": isChosen(8, day) ? "#eecfd3" : "white"
            }),
            e: common_vendor.o(($event) => chooseDate(8, day), index)
          };
        }),
        d: common_vendor.n({
          "hide-center": hideEight.value
        }),
        e: common_vendor.f(SeptemberDayList1, (day, index, i0) => {
          return {
            a: common_vendor.t(day),
            b: index,
            c: common_vendor.s({
              "color": checkDateIfCanChoose(9, day)
            }),
            d: common_vendor.s({
              "background-color": isChosen(9, day) ? "#eecfd3" : "white"
            }),
            e: common_vendor.o(($event) => chooseDate(9, day), index)
          };
        }),
        f: common_vendor.f(SeptemberDayList2, (day, index, i0) => {
          return {
            a: common_vendor.t(day),
            b: index,
            c: common_vendor.s({
              "color": checkDateIfCanChoose(9, day)
            }),
            d: common_vendor.s({
              "background-color": isChosen(9, day) ? "#eecfd3" : "white"
            }),
            e: common_vendor.o(($event) => chooseDate(9, day), index)
          };
        }),
        g: common_vendor.n({
          "hide-center": hideNine.value
        }),
        h: common_vendor.t("<"),
        i: common_vendor.n({
          "un-clickable": !clickableEight.value
        }),
        j: common_vendor.o(lastPage),
        k: common_vendor.t(month.value),
        l: common_vendor.t(">"),
        m: common_vendor.n({
          "un-clickable": !clickableNine.value
        }),
        n: common_vendor.o(nextPage)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4a170ef6"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/component/DateCard.vue"]]);
wx.createComponent(Component);
