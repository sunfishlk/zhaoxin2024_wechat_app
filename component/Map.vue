<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'

const latitude = ref(34.24208) // 纬度
const longitude = ref(108.98087) // 经度

const XJTULatitude = 34.246033 // XJTU纬度
const XJTULongitude = 108.984598 // XJTU经度

const markers = ref([
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
  title: '挑战阁楼',
  label:{
    content:'挑战阁楼',
    color:'#000000',
    // fontSize:14,
    // borderRadius:5,
    // bgColor:'#ffffff',
    // padding:5
  },
  iconPath: '/static/tenzor.png',
  width: 33,
  height: 44
},
]);

const localPosition=ref()

// onMounted(()=>{
//   uni.getLocation({
//     getcode:true,
//     type: 'gcj02',
//     success: (res) => {
//       console.log(res,'获取当前位置')
//       localPosition.value.latitude=res.latitude;
//       localPosition.value.longitude=res.longitude;
//       // markers.value = [
//       //   {
//       //     id: 0,
//       //     latitude: res.latitude,
//       //     longitude: res.longitude,
//       //     title: '当前位置',
//       //     // iconPath: '../../../static/location.png',
//       //     width: 30,
//       //     height: 50
//       //   },
//       //   {
//       //     id: 1,
//       //     latitude: 39.90,
//       //     longitude: 116.39,
//       //     title: '北京中心',
//       //     // iconPath: '../../../static/location.png',
//       //     width: 30,
//       //     height: 50
//       //   },
//       // ]
//     },
//     fail: (err) => {
//       console.log(err)
//     }
//   })
// })

onMounted(()=>{
  localPosition.value = uni.createMapContext("localPosition", localPosition.value)
})

const locate=()=>{
  console.log(localPosition.value)
  uni.getLocation({
    type: 'gcj02',
    success: function (data) {
        console.log(data)
        latitude.value=data.latitude;
        longitude.value=data.longitude;
        localPosition.value.moveToLocation({   //moveToLocation将地图中心移动到当前定位点，需要配合map组件的show-location使用
            latitude: data.latitude,
            longitude: data.longitude
        });
    },
    fail: function (mes) {
      console.log(mes)
      uni.showToast({
        title: JSON.stringify(mes),
        icon: 'none'
      });
    }
})
}

</script>

<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<!-- 在地图组件中，使用 :markers 绑定 markers 数据 -->
				<map 
          class="map"
					:latitude="latitude" 
					:longitude="longitude" 
					:markers="markers" 
          :show-location="true"
          scale="18"
          ref="localPosition"
          enable-3D="true"
				>
        <view class="map-locate" @tap="locate">
          <img src="/static/clickToLocate.svg" alt="location" class="image"/>
        </view>
				</map>
			</view>
		</view>
	</view>
</template>

<style scoped>
/* 可以根据需要添加样式 */
.map-locate {
  width: 75rpx;
  height: 75rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10rpx;
  position: absolute;
  right: 10rpx;
  bottom: 30rpx;
  box-shadow: rgba(61, 90, 125, 0.4) 0px 0px 20px 0px;
}
.map-locate .image{
  width: 60rpx;
  height: 60rpx;
  z-index: 999;
}
.map{
  width: 600rpx;
  height: 900rpx;
}
/* 适配 Windows 设备 (480px x 800px) */
@media screen and (min-width: 415px) and (max-width: 480px) and (min-height: 737px) and (max-height: 800px) {
  .map{
    height: 600rpx;
  }
}
/* iPad 媒体查询 */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {
  .map{
    height: 600rpx;
  }
}
</style>
