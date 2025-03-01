"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_log = require("../../utils/log.js");
if (!Math) {
  CollegeCard();
}
const CollegeCard = () => "../../component/CollegeCard.js";
const _sfc_main = {
  __name: "basic-info",
  setup(__props) {
    const studentNumber = common_vendor.ref("");
    const name = common_vendor.ref("");
    const college = common_vendor.ref("");
    const phoneNumber = common_vendor.ref("");
    const email = common_vendor.ref("");
    const whereKnow = common_vendor.ref("");
    const next = () => {
      if (name.value.trim() === "") {
        common_vendor.index.showToast({
          title: "姓名不能为空",
          icon: "none"
        });
        return;
      }
      if (college.value.trim() === "") {
        common_vendor.index.showToast({
          title: "书院不能为空",
          icon: "none"
        });
        return;
      }
      if (phoneNumber.value.trim() === "") {
        common_vendor.index.showToast({
          title: "手机不能为空",
          icon: "none"
        });
        return;
      }
      const phoneNumberPattern = /^1[3-9]\d{9}$/;
      if (!phoneNumberPattern.test(phoneNumber.value)) {
        common_vendor.index.showToast({
          title: "手机号码格式不正确",
          icon: "none"
        });
        return;
      }
      if (email.value.trim() === "") {
        common_vendor.index.showToast({
          title: "邮箱不能为空",
          icon: "none"
        });
        return;
      }
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailPattern.test(email.value)) {
        common_vendor.index.showToast({
          title: "邮箱格式不正确",
          icon: "none"
        });
        return;
      }
      if (whereKnow.value.trim() === "") {
        common_vendor.index.showToast({
          title: "从哪里知道我们不能为空",
          icon: "none"
        });
        return;
      }
      common_vendor.index.setStorageSync("studentNumber", studentNumber.value);
      common_vendor.index.setStorageSync("name", name.value);
      common_vendor.index.setStorageSync("college", college.value);
      common_vendor.index.setStorageSync("phoneNumber", phoneNumber.value);
      common_vendor.index.setStorageSync("email", email.value);
      common_vendor.index.setStorageSync("whereKnow", whereKnow.value);
      common_vendor.index.navigateTo({
        url: "/pages/main-department/main-department"
      });
    };
    const nameList = common_vendor.ref(["rule", "hide"]);
    const collegeList = common_vendor.ref(["rule", "hide"]);
    const phoneNumberList = common_vendor.ref(["rule", "hide"]);
    const emailList = common_vendor.ref(["rule", "hide"]);
    const whereKnowList = common_vendor.ref(["rule", "hide"]);
    const checkName = () => {
      if (name.value.trim() === "") {
        nameList.value = ["rule"];
      } else {
        nameList.value = ["rule", "hide"];
      }
    };
    const checkPhoneNumber = () => {
      if (phoneNumber.value.trim() === "") {
        phoneNumberList.value = ["rule"];
      } else {
        phoneNumberList.value = ["rule", "hide"];
      }
    };
    const checkEmail = () => {
      if (email.value.trim() === "") {
        emailList.value = ["rule"];
      } else {
        emailList.value = ["rule", "hide"];
      }
    };
    const checkWhereKnow = () => {
      if (whereKnow.value.trim() === "") {
        whereKnowList.value = ["rule"];
      } else {
        whereKnowList.value = ["rule", "hide"];
      }
    };
    const collegeCardShow = common_vendor.ref(false);
    const chooseCollege = (chosenCollege) => {
      college.value = chosenCollege;
      hideCollegeCard();
    };
    const hideCollegeCard = () => {
      collegeCardShow.value = false;
    };
    const showCollegeCard = () => {
      collegeCardShow.value = true;
    };
    const isFormal = common_vendor.ref(false);
    const baseUrl = getApp().globalData.baseUrl;
    common_vendor.onMounted(() => {
      if (common_vendor.index.getStorageSync("studentNumber") !== "") {
        studentNumber.value = common_vendor.index.getStorageSync("studentNumber");
      }
      if (common_vendor.index.getStorageSync("name") !== "") {
        name.value = common_vendor.index.getStorageSync("name");
      }
      if (common_vendor.index.getStorageSync("college") !== "") {
        college.value = common_vendor.index.getStorageSync("college");
      }
      if (common_vendor.index.getStorageSync("phoneNumber") !== "") {
        phoneNumber.value = common_vendor.index.getStorageSync("phoneNumber");
      }
      if (common_vendor.index.getStorageSync("email") !== "") {
        email.value = common_vendor.index.getStorageSync("email");
      }
      if (common_vendor.index.getStorageSync("whereKnow") !== "") {
        whereKnow.value = common_vendor.index.getStorageSync("whereKnow");
      }
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
              name.value = "test1";
              phoneNumber.value = "13800138000";
              email.value = "1@1.com";
              console.log(name.value);
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
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.n({
          "show": collegeCardShow.value
        }),
        b: common_vendor.o(hideCollegeCard),
        c: common_vendor.o(chooseCollege),
        d: common_vendor.o(hideCollegeCard),
        e: common_vendor.n({
          "college-card-show": collegeCardShow.value
        }),
        f: common_vendor.p({
          collegeProps: college.value
        }),
        g: !isFormal.value
      }, !isFormal.value ? {} : {}, {
        h: !isFormal.value
      }, !isFormal.value ? {
        i: common_vendor.o(checkName),
        j: name.value,
        k: common_vendor.o(($event) => name.value = $event.detail.value)
      } : {}, {
        l: common_vendor.n(nameList.value),
        m: common_vendor.t(college.value),
        n: common_vendor.o(showCollegeCard),
        o: common_vendor.n(collegeList.value),
        p: !isFormal.value
      }, !isFormal.value ? {} : {}, {
        q: !isFormal.value
      }, !isFormal.value ? {
        r: common_vendor.o(checkPhoneNumber),
        s: phoneNumber.value,
        t: common_vendor.o(($event) => phoneNumber.value = $event.detail.value)
      } : {}, {
        v: common_vendor.n(phoneNumberList.value),
        w: !isFormal.value
      }, !isFormal.value ? {} : {}, {
        x: !isFormal.value
      }, !isFormal.value ? {
        y: common_vendor.o(checkEmail),
        z: email.value,
        A: common_vendor.o(($event) => email.value = $event.detail.value)
      } : {}, {
        B: common_vendor.n(emailList.value),
        C: common_vendor.o(checkWhereKnow),
        D: whereKnow.value,
        E: common_vendor.o(($event) => whereKnow.value = $event.detail.value),
        F: common_vendor.n(whereKnowList.value),
        G: common_vendor.o(next)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c3c0f360"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/pages/basic-info/basic-info.vue"]]);
wx.createPage(MiniProgramPage);
