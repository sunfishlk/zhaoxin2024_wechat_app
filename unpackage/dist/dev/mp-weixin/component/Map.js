"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "Map",
  setup(__props) {
    const latitude = common_vendor.ref(34.24208);
    const longitude = common_vendor.ref(108.98087);
    const markers = common_vendor.ref([
      // { // 配置地图标记
      //   id: 0, // 每个标记都需要唯一的id
      //   latitude: XJTULatitude,
      //   longitude: XJTULongitude,
      //   title: 'XJTU', // 可选：点击标记显示的标题
      //   // iconPath: '../../../static/location.png', // 标记图标的路径
      //   width: 30, // 图标宽度
      //   height: 50 // 图标高度
      // }, 
      {
        id: 1,
        latitude: latitude.value,
        longitude: longitude.value,
        title: "挑战阁楼",
        label: {
          content: "挑战阁楼",
          color: "#000000"
          // fontSize:14,
          // borderRadius:5,
          // bgColor:'#ffffff',
          // padding:5
        },
        iconPath: "/static/tenzor.png",
        width: 33,
        height: 44
      }
    ]);
    const localPosition = common_vendor.ref();
    common_vendor.onMounted(() => {
      localPosition.value = common_vendor.index.createMapContext("localPosition", localPosition.value);
    });
    const locate = () => {
      console.log(localPosition.value);
      common_vendor.index.getLocation({
        type: "gcj02",
        success: function(data) {
          console.log(data);
          latitude.value = data.latitude;
          longitude.value = data.longitude;
          localPosition.value.moveToLocation({
            //moveToLocation将地图中心移动到当前定位点，需要配合map组件的show-location使用
            latitude: data.latitude,
            longitude: data.longitude
          });
        },
        fail: function(mes) {
          console.log(mes);
          common_vendor.index.showToast({
            title: JSON.stringify(mes),
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(locate),
        b: latitude.value,
        c: longitude.value,
        d: markers.value
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-66e10a67"], ["__file", "D:/学习/课外/HBuilderXProject/zhaoxin2024/component/Map.vue"]]);
wx.createComponent(Component);
