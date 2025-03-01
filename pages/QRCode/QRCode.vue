<script setup>
import { reactive } from 'vue';
import { onMounted } from 'vue';

const pushBack=()=>{
  uni.navigateBack();
}

const options = reactive({
		width: 400, // 宽度 单位rpx
		height: 150, // 高度 单位rpx
		color: ['#000'],
		code: null // 生成条形码的值
	})

onMounted(() => {
  options.code = uni.getStorageSync('studentNumber');
})

</script>

<template>
  <view class="total-container">    
    <view class="container">
      <view class="icon-container">
        <view class="circle"></view>
        <view class="round">
          <img src="https://static.tiaozhan.com/tenzor/1722827696199141954.svg" alt="" class="icon">
        </view>
      </view>
      <view class="card">
        <view class="bottom">
          <img src="https://static.tiaozhan.com/tenzor/1722827696034667662.svg" class="img-bottom">
        </view>
        <!-- <view class="code"></view> -->
        <!-- <Code class="code"/> -->
        <view class="code-container">
          <w-barcode :options="options" :key="options.code" class="barcode"></w-barcode>
        </view>
        <!-- <tkiQrcode class="code"/> -->
        <span class="text">面试时请出示此条形码</span>
        <view class="button" @click="pushBack">返回</view>
      </view>
    </view>
  </view>
</template>

<style scoped>
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
.icon{
  width: 50rpx;
  height: 50rpx;
  z-index: 200;
  background-color: white;
}
.code{
  width: 100vw;
  height: 200rpx;
  background-color: aqua;
  margin: 50rpx 0;
  z-index: 100;
}
.text{
  font-size: 32rpx;
  margin:30rpx 0;
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
  justify-content: center;
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
}
/* iPad 媒体查询 */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {
  .container {
    transform: translate(0,100rpx);
  }
  .card{
    height: calc(100vh - 100rpx);
  }
  .img-bottom{
    width: 600rpx;
    height: 400rpx;
  }
}
</style>