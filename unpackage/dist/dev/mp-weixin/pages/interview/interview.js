"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  (DateCard + TimeCard)();
}
const DateCard = () => "../../component/DateCard.js";
const TimeCard = () => "../../component/TimeCard.js";
const _sfc_main = {
  __name: "interview",
  setup(__props) {
    const schoolArea = common_vendor.ref(common_vendor.index.getStorageSync("schoolArea") || "兴庆校区");
    const date = common_vendor.ref(common_vendor.index.getStorageSync("date") || "");
    const time = common_vendor.ref(common_vendor.index.getStorageSync("time") || "");
    const position = common_vendor.ref(common_vendor.index.getStorageSync("position") || "挑战阁楼");
    common_vendor.onShow(() => {
      schoolArea.value = common_vendor.index.getStorageSync("schoolArea") || "兴庆校区";
      date.value = common_vendor.index.getStorageSync("date") || "";
      time.value = common_vendor.index.getStorageSync("time") || "";
      position.value = common_vendor.index.getStorageSync("position") || "挑战阁楼";
    });
    const dateCardShow = common_vendor.ref(false);
    const showDateCard = () => {
      dateCardShow.value = true;
    };
    const hideDateCard = () => {
      dateCardShow.value = false;
    };
    const timeCardShow = common_vendor.ref(false);
    const showTimeCard = () => {
      if (date.value === "") {
        common_vendor.index.showToast({
          title: "请先选择日期",
          icon: "none"
        });
        return;
      }
      timeCardShow.value = true;
    };
    const hideTimeCard = () => {
      timeCardShow.value = false;
    };
    const last = () => {
      common_vendor.index.setStorageSync("schoolArea", schoolArea.value);
      common_vendor.index.setStorageSync("date", date.value);
      common_vendor.index.setStorageSync("time", time.value);
      common_vendor.index.setStorageSync("position", position.value);
      common_vendor.index.navigateBack();
    };
    const next = () => {
      if (date.value.trim() === "") {
        common_vendor.index.showToast({
          title: "请选择日期",
          icon: "none"
        });
        return;
      }
      if (time.value.trim() === "") {
        common_vendor.index.showToast({
          title: "请选择时间",
          icon: "none"
        });
        return;
      }
      common_vendor.index.setStorageSync("schoolArea", schoolArea.value);
      common_vendor.index.setStorageSync("date", date.value);
      common_vendor.index.setStorageSync("time", time.value);
      common_vendor.index.setStorageSync("position", position.value);
      common_vendor.index.navigateTo({
        url: "/pages/message-confirm/message-confirm"
      });
    };
    const combineDate = (month, day) => {
      if (month === "" || day === "")
        return "";
      return `${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
    };
    const changeDate = (month, day) => {
      date.value = combineDate(month, day);
      hideDateCard();
    };
    const manageTimeFormat = (time2) => {
      return time2.split("~")[0].trim();
    };
    const changeTime = (chosenTime) => {
      hideTimeCard();
      if (chosenTime === "") {
        return;
      }
      time.value = manageTimeFormat(chosenTime);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: dateCardShow.value
      }, dateCardShow.value ? {
        b: common_vendor.n({
          "show": dateCardShow.value
        }),
        c: common_vendor.o(hideDateCard)
      } : {}, {
        d: timeCardShow.value
      }, timeCardShow.value ? {
        e: common_vendor.n({
          "show": timeCardShow.value
        }),
        f: common_vendor.o(hideTimeCard)
      } : {}, {
        g: dateCardShow.value
      }, dateCardShow.value ? {
        h: common_vendor.o(($event) => hideDateCard()),
        i: common_vendor.o((month, day) => {
          changeDate(month, day);
          hideDateCard();
          showTimeCard();
        }),
        j: common_vendor.n({
          "date-card-show": dateCardShow.value
        }),
        k: common_vendor.p({
          dateProps: date.value
        })
      } : {}, {
        l: timeCardShow.value
      }, timeCardShow.value ? {
        m: common_vendor.o(($event) => hideTimeCard()),
        n: common_vendor.o((time2) => changeTime(time2)),
        o: common_vendor.n({
          "date-card-show": timeCardShow.value
        }),
        p: common_vendor.p({
          dateProps: date.value,
          timeProps: time.value
        })
      } : {}, {
        q: schoolArea.value,
        r: common_vendor.o(($event) => schoolArea.value = $event.detail.value),
        s: position.value,
        t: common_vendor.o(($event) => position.value = $event.detail.value),
        v: common_vendor.t(date.value),
        w: common_vendor.o(showDateCard),
        x: common_vendor.t(time.value),
        y: common_vendor.o(showTimeCard),
        z: common_vendor.o(last),
        A: common_vendor.o(next)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-99492b0e"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/pages/interview/interview.vue"]]);
wx.createPage(MiniProgramPage);
