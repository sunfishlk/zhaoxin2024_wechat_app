<script setup>
import { ref } from 'vue';
import { computed } from 'vue';
import { onMounted } from 'vue';
import log from '../../utils/log';

const success = ref(true);
// const success = ref(false);

const displayStyle = ref('none');
const isBlurred = ref(false);

const showCode = () => {
  displayStyle.value = 'flex';
  isBlurred.value = true;
}

const hideCode = () => {
  displayStyle.value = 'none';
  isBlurred.value = false;
}

// const techGroupUrl=ref('');
// const videoGroupUrl=ref('');
// const artGroupUrl=ref('');
const groupUrl=ref('');
const QQCode=ref('');

// const imgSrc=computed(()=>{
//   if(techGroupUrl.value){
//     return techGroupUrl.value;
//   }
//   if(videoGroupUrl.value){
//     return videoGroupUrl.value;
//   }
//   if(artGroupUrl.value){
//     return artGroupUrl.value;
//   }
//   return '';
// })
// const QQCode=computed(()=>{
//   if(techQQCode.value){
//     return techQQCode.value;
//   }
//   if(videoQQCode.value){
//     return videoQQCode.value;
//   }
//   if(artQQCode.value){
//     return artQQCode.value;
//   }
//   return '';
// })
const baseUrl = getApp().globalData.baseUrl;
let cookie = uni.getStorageSync('cookie');
onMounted(() => {
  uni.request({
    url: `${baseUrl}/api/student/interv`,
    method: 'GET',
    header: {
      'Content-Type': 'application/json',
      "Cookie": cookie
    },
    success:(res)=>{
      console.log(res.data.data.interv)
      log.info({
        responseData: res
      });
      if(res.data.success===false){
        uni.showToast({
          title:res.data.message,
          icon:'none'
        })
      }
      else{
        if(res.data.data.interv==='已通过'){
          success.value=true;
          groupUrl.value=res.data.data.url;
          QQCode.value=res.data.data.code;
          console.log(groupUrl.value);
          console.log(QQCode.value);
        }
        else{
          success.value=false;
        }
      }
    },
    fail:(err)=>{
      console.log(err);
      uni.showToast({
        title: JSON.stringify(err),
        icon: 'none'
      });
    }
  })
})

const copyQQCode = () => {
  uni.setClipboardData({
    data: QQCode.value,
    success: function () {
      uni.showToast({
        title: `QQ群号${QQCode.value}已复制到剪贴板`,
        icon: 'none'
      });
    }
  });
  console.log(QQCode.value);
}
</script>

<template>
  <view class="total-container">
    <view :class="{'hide':!success}">  
      <view class="total-container">
        <view :class="['overlay', { 'show': displayStyle === 'flex' }]" @click="hideCode"></view>
        <view class="display-card" :style="{ display: displayStyle }">
          <view class="code">
            <img :src="groupUrl" alt="" class="code-img">
          </view>
          <p class="detail">QQ群 : {{ QQCode }}</p>
          <view class="copy-button" @click="copyQQCode">点此复制QQ群号</view>
          <p class="detail">保存二维码加入群聊</p>
        </view>
        <view :class="['container', { 'blurred': isBlurred }]">
          <span class="title">面试结果查询</span>
          <view class="img-container">
            <img src="https://static.tiaozhan.com/tenzor/1723171307001551913.svg" alt="" class="star-top">
            <img src="https://static.tiaozhan.com/tenzor/1723171306868108618.svg" alt="" class="star-left">
            <img src="https://static.tiaozhan.com/tenzor/1723171307123516996.svg" alt="" class="star-right">
            <img src="https://static.tiaozhan.com/tenzor/1723169094278638250.svg" alt="" class="person" style="width: 640rpx;height:480rpx">
            <img src="https://static.tiaozhan.com/tenzor/1723169094410528239.svg" alt="" class="person" style="opacity: 0.67;width:700rpx;height:520rpx;top:-2rpx;left:-2rpx">
            <!-- <img src="https://static.tiaozhan.com/tenzor/1723169094410528239.svg" alt="" class="person" style="opacity: 0.67;top:12rpx;left:24rpx"> -->
            <img src="https://static.tiaozhan.com/tenzor/1722832632931131127.svg" alt="" class="round">
            <img src="https://static.tiaozhan.com/tenzor/1722832631462490231.svg" alt="" class="bg">
            <img src="https://static.tiaozhan.com/tenzor/1722835304818471862.svg" alt="" class="stone">
          </view>
          <view class="text">
            <p class="big-text">恭喜你！</p>
            <p class="small-text">通过了挑战网面试。</p>
            <p class="small-text">加入我们，一起兴风作浪吧！</p>
          </view>
          <view class="button" @click="showCode">点击加群</view>
        </view>
      </view>
    </view>
    <view :class="{'hide':success}">  
      <view class="total-container">
        <view :class="['overlay', { 'show': displayStyle === 'flex' }]" @click="hideCode"></view>
        <view class="display-card" :style="{ display: displayStyle }">
          <view class="code"></view>
          <p class="detail">保存二维码加入群聊</p>
        </view>
        <view :class="['container', { 'blurred': isBlurred }]">
          <span class="title">面试结果查询</span>
          <view class="img-container">
            <img src="https://static.tiaozhan.com/tenzor/1723171307253607879.svg" alt="" class="star-top">
            <img src="https://static.tiaozhan.com/tenzor/1723171307373420872.svg" alt="" class="star-left">
            <img src="https://static.tiaozhan.com/tenzor/1723171307508446846.svg" alt="" class="star-right">
            <img src="https://static.tiaozhan.com/tenzor/1723169094019683809.svg" alt="" class="person" style="width:640rpx;height:480rpx">
            <img src="https://static.tiaozhan.com/tenzor/1723169094148578976.svg" alt="" class="person" style="width: 700rpx;height:520rpx;top:-2rpx;left:-2rpx;opacity:0.82">
            <img src="https://static.tiaozhan.com/tenzor/1722832633081048745.svg" alt="" class="round">
            <img src="https://static.tiaozhan.com/tenzor/1722832631462490231.svg" alt="" class="bg">
            <img src="https://static.tiaozhan.com/tenzor/1722832632233519440.svg" alt="" class="bg" style="opacity: 0.6">
            <img src="https://static.tiaozhan.com/tenzor/1722835304818471862.svg" alt="" class="stone">
          </view>
          <view class="text">
            <p class="big-text" style="color:#9c9c9c">很遗憾！</p>
            <p class="small-text">你没有通过挑战网的面试。</p>
            <p class="small-text">希望你保持热爱</p>
            <p class="small-text">成为更好的自己！</p>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.star-left{
  width: 78rpx;
  height: 78rpx;
  position: absolute;
  z-index: 100;
  top: -4rpx;
  right: 218rpx;
}
.star-right{
  width: 64rpx;
  height: 64rpx;
  position: absolute;
  z-index: 100;
  top: 20rpx;
  right: 134rpx;
}
.star-top{
  width: 56rpx;
  height: 56rpx;
  position: absolute;
  z-index: 100;
  top: -52rpx;
  right:150rpx;
}
.hide{
  display: none;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  display: none;
  z-index: 10;
}

.overlay.show {
  display: block;
}
.detail{
  margin-top: 40rpx;
}
.total-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  position: relative;
  font-family: 'HarmonyOS';
}
.container{
  transition: all .3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}
.blurred {
  filter: blur(4rpx);
}
.display-card{
  position: absolute;
  width: 600rpx;
  height: 900rpx;
  background-color: #ffffff;
  border: 4rpx solid #ff792d;
  border-radius: 20rpx;
  display: none;
  z-index: 400;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.code{
  width: 500rpx;
  height: 500rpx;
  border: 2rpx solid black;
  border-radius: 10rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.code-img{
  width: 500rpx;
  height: 500rpx;
}
.title{
  font-weight: bold;
  font-size: 60rpx;
  color: black;
  margin: 60rpx 0;
  font-family: 'Alimama ShuHeiTi';
}
.img-container{
  width: 100vw;
  height: 600rpx;
  position: relative;
  margin: 10rpx 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.person{
  position: absolute;
  z-index: 100;
  top: 25rpx;
  opacity: 0.8;
}
.round{
  width: 100vw;
  height: 600rpx;
  position: absolute;
  z-index: 25;
  top: -28rpx;
}
.bg{
  position: absolute;
  z-index: 50;
  width: 100vw;
  height: 400rpx;
  top: 170rpx;
  left:-10rpx;
}
.stone{
  position: absolute;
  z-index: 125;
  bottom: 44rpx;
  width: 300rpx;
  height: 110rpx;
}
.text{
  margin: 20rpx 0;
  text-align: center;
}
.big-text{
  color: #ff792d;
  font-weight: bold;
  font-size: 60rpx;
  margin-top: 50rpx;
  margin-bottom: 10rpx;
  font-family: 'Alimama ShuHeiTi';
}
.small-text{
  margin: 20rpx 0;
}
.button{
  background-color: #ff792d;
  width: 500rpx;
  height: 100rpx;
  text-align: center;
  line-height: 100rpx;
  border-radius: 100rpx;
  color: white;
  font-size: 40rpx;
  margin-top: 20rpx;
  font-family: 'Alimama ShuHeiTi';
}
.copy-button{
  background-color: #ef82a0;
  width: 440rpx;
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  border-radius: 100rpx;
  color: white;
  margin-top: 40rpx;
}

/* 适配 Windows 设备 (480px x 800px) */
@media screen and (min-width: 415px) and (max-width: 480px) and (min-height: 737px) and (max-height: 800px) {
  .title{
    margin-top: 10rpx;
    margin-bottom: 30rpx;
  }
  .big-text{
    margin-top: 10rpx;
  }
  .button{
    margin-top: 0rpx;
    margin-bottom: 20rpx;
  }
}

</style>