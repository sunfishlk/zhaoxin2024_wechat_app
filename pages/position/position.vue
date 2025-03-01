<script setup>
import Map from '../../component/Map.vue';

const pushBack=()=>{
  uni.navigateBack();
}

</script>

<template>
  <view class="total-container">    
    <view class="container">
      <view class="icon-container">
        <view class="circle"></view>
        <view class="round">
          <img src="https://static.tiaozhan.com/tenzor/1722829641462839901.svg" alt="" class="icon">
        </view>
      </view>
      <view class="card">
        <view class="bottom">
          <img src="https://static.tiaozhan.com/tenzor/1722827696034667662.svg">
        </view>
        <!-- <view class="map"></view> -->
        <Map class="map"/>
        <span class="text">图中所示位置即为阁楼位置</span>
        <view class="button" @click="pushBack">返回</view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.circle{
  width: 102rpx;
  height: 102rpx;
  border-radius: 110rpx;
  background-color: #e5d1d3;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  z-index: 100;
}
.round{
  z-index: 200;
  width: 90rpx;
  height: 90rpx;
  border-radius: 110rpx;
  background-color: white;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon-container{
  width: 90rpx;
  height: 90rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 60rpx;
  top: -70rpx;
  background-color: white;
  border-radius: 90rpx;
  z-index: 200;
}
.icon{
  width: 50rpx;
  height: 50rpx;
  z-index: 200;
}
.map{
  width: 600rpx;
  height: 900rpx;
  position: relative;
  top: 110rpx;
  /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
}
.text{
  font-size: 32rpx;
  margin:30rpx 0;
  position: relative;
  top: 110rpx;
}
.button{
  width: 200rpx;
  height: 40rpx;
  line-height: 40rpx;
  padding: 20rpx;
  background-color: #eecfd3;
  border-radius: 40rpx;
  text-align: center;
  /* margin: 30rpx 50rpx; */
  margin: 10rpx 0;
  font-size: 30rpx;
  z-index: 100;
  position: relative;
  top: 110rpx;
}
.total-container{
  background-color: #e9d0d3;
  font-family: 'HarmonyOS';
}
.container{
  /* background-color: white; */
  transform: translate(0,140rpx);  
}
.card{
  border-radius: 30.193rpx;
  background-color: white;
  height: calc(100vh - 140rpx);
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  /* position: relative;
  top:60.386rpx; */
}
.bottom{
  position: absolute;
  bottom: -145rpx;
  left: 0;
}

/* 适配 Windows 设备 (480px x 800px) */
@media screen and (min-width: 415px) and (max-width: 480px) and (min-height: 737px) and (max-height: 800px) {
  .container {
    transform: translate(0,100rpx);
  }
  .card{
    height: calc(100vh - 100rpx);
  }
  .map{
    height: 600rpx;
    position: relative;
    top: 75rpx;
  }
}
/* iPad 媒体查询 */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {
  .container {
    transform: translate(0,100rpx);
  }
  .card{
    height: calc(100vh - 100rpx);
  }
  .map{
    height: 600rpx;
    position: relative;
    top: 60rpx;
  }
  .text{
    margin: 0rpx;
  }
}
</style>