"use strict";
const common_vendor = require("../common/vendor.js");
const utils_log = require("../utils/log.js");
const _sfc_main = {
  __name: "TimeCard",
  props: {
    dateProps: String,
    timeProps: String
  },
  emits: ["exit", "hide"],
  setup(__props, { emit }) {
    const props = __props;
    const baseUrl = getApp().globalData.baseUrl;
    const allTimes = common_vendor.ref([]);
    const chosenTime = common_vendor.ref("");
    const currentPage = common_vendor.ref(1);
    const timesPerPage = 6;
    const totalPages = common_vendor.ref(1);
    const chooseTime = (time) => {
      time = time.split(" ~ ")[0];
      if (!checkTimeIfCanChoose(time)) {
        return;
      }
      chosenTime.value = time;
      emit("exit", time);
    };
    const isTimeChosen = (time) => chosenTime.value === time;
    const convertTimeToTimeSlot = (timeString) => {
      const [hours, minutes] = timeString.split(":").map(Number);
      const endMinutes = minutes + 20;
      const endHours = endMinutes >= 60 ? hours + 1 : hours;
      const endMinutesAdjusted = endMinutes % 60;
      const formattedStart = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
      const formattedEnd = `${endHours.toString().padStart(2, "0")}:${endMinutesAdjusted.toString().padStart(2, "0")}`;
      return `${formattedStart} ~ ${formattedEnd}`;
    };
    let availableTimes = common_vendor.ref([]);
    let unavailableTimes = common_vendor.ref([]);
    let cookie = common_vendor.index.getStorageSync("cookie");
    common_vendor.onMounted(() => {
      if (props.timeProps) {
        chooseTime(convertTimeToTimeSlot(props.timeProps));
      }
      queryAvailableTimes(props.dateProps);
    });
    common_vendor.watch(() => props.dateProps, (newDate) => {
      if (newDate) {
        availableTimes.value = [];
        unavailableTimes.value = [];
        allTimes.value = [];
        queryAvailableTimes(newDate);
      }
    });
    const queryAvailableTimes = (date) => {
      common_vendor.index.request({
        url: `${baseUrl}/api/student/dateitv?date=2024-${date}T00:00:00`,
        method: "GET",
        header: {
          "Content-Type": "application/json",
          "Cookie": cookie
        },
        success: (res) => {
          utils_log.log.info({
            responseData: res
          });
          if (res.data.success === false) {
            console.log(res.data.message);
          } else {
            if (res.data.data.available === null) {
              console.log(`${date}无可用时间`);
            } else {
              res.data.data.available.forEach((item) => {
                const time = item.substring(11, 16);
                availableTimes.value.push(time);
                allTimes.value.push({ time, isAvailable: true });
              });
            }
            if (res.data.data.unavailable !== null) {
              res.data.data.unavailable.forEach((item) => {
                const time = item.substring(11, 16);
                unavailableTimes.value.push(time);
                allTimes.value.push({ time, isAvailable: false });
              });
            }
            totalPages.value = Math.ceil(allTimes.value.length / timesPerPage);
            currentPage.value = 1;
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
    const checkTimeIfCanChoose = (time) => availableTimes.value.includes(time);
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };
    const lastPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };
    const paginatedTimes = common_vendor.computed(() => {
      const start = (currentPage.value - 1) * timesPerPage;
      const end = start + timesPerPage;
      return allTimes.value.slice(start, end);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("hide")),
        b: common_vendor.f(common_vendor.unref(paginatedTimes), (timeObj, index, i0) => {
          return {
            a: common_vendor.t(timeObj.time),
            b: index,
            c: isTimeChosen(timeObj.time) ? "#eecfd3" : "white",
            d: timeObj.isAvailable ? "black" : "#c7d2d4",
            e: common_vendor.o(($event) => chooseTime(timeObj.time), index)
          };
        }),
        c: common_vendor.t("<"),
        d: common_vendor.n({
          "un-clickable": currentPage.value === 1
        }),
        e: common_vendor.o(lastPage),
        f: common_vendor.t(currentPage.value),
        g: common_vendor.t(totalPages.value),
        h: common_vendor.t(">"),
        i: common_vendor.n({
          "un-clickable": currentPage.value === totalPages.value
        }),
        j: common_vendor.o(nextPage)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-180070af"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/component/TimeCard.vue"]]);
wx.createComponent(Component);
