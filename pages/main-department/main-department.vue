<script setup>
import { ref,onMounted } from 'vue';

const mainDepartment = ref('');

const chooseDepartment = (depart) => {
  mainDepartment.value = depart;
  console.log(mainDepartment.value);
}

const last = () => {
  // 跳转到上一页
  // uni.navigateTo({
  //   url: '/pages/basic-info/basic-info'
  // });
  uni.navigateBack();
  uni.setStorageSync('mainDepartment', mainDepartment.value);
}

const next = () => {
  if(mainDepartment.value.trim()===''){
    uni.showToast({
      title: '请选择主选部门',
      icon: 'none'
    });
    return;
  }
  uni.setStorageSync('mainDepartment', mainDepartment.value);
  // 跳转到下一页
  uni.navigateTo({
    url: '/pages/other-department/other-department'
  });
}

onMounted(() => {
  if (uni.getStorageSync('mainDepartment') !== '') {
    mainDepartment.value = uni.getStorageSync('mainDepartment');
  }
})
</script>

<template>
  <view class="total-container">  
    <view class="container">
      <view class="icon-container">
        <view class="circle"></view>
        <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/main-department/1722763732704833454.svg" alt="" class="icon">
      </view>
      <view class="card">
        <view class="card-head">
          <view class="info">
            <text class="info-title">主选部门</text>
            <text class="info-detail">主选部门只能选一个哦</text>
          </view>
        </view>
        <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/main-department/1722763733651573089.svg" alt="" class="top-img">
        <view class="card-main">
          <view class="card-list" @click="chooseDepartment('技术部')">
            <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/main-department/1722763733513724790.svg" alt="" class="card-list-img">
            <view :class="['card-list-box', { active: mainDepartment === '技术部' }]">技术部</view>
          </view>
          <view class="card-list" @click="chooseDepartment('美工部')">
            <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/main-department/1722763732405850483.svg" alt="" class="card-list-img">
            <view :class="['card-list-box', { active: mainDepartment === '美工部' }]">美工部</view>
          </view>
          <view class="card-list" @click="chooseDepartment('视频部')">
            <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/main-department/1722763733810761063.svg" alt="" class="card-list-img">
            <view :class="['card-list-box', { active: mainDepartment === '视频部' }]">视频部</view>
          </view>
          <view class="button-container">
            <button class="last-button" @click="last">上一步</button>
            <button class="next-button" @click="next">下一步</button>
          </view>
        </view>
        <view class="card-bottom">
          <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/main-department/1722763732558059330.svg" alt="" class="img-bottom-left">
          <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/main-department/1722763733378558116.svg" alt="" class="img-bottom-right">
        </view>
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
.icon-container{
  position: absolute;
  left: 60rpx;
  top: -70rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon{
  width: 90rpx;
  height: 90rpx;
  z-index: 200;
}
.active {
  background-color: #f6c2cb;
}
.total-container {
  background-color: #e9d0d3;
  font-family: 'HarmonyOS';
}
.container {
  transform: translate(0, 140rpx);  
}
.card-head {
  /* margin-top: 10rpx; */
  /* margin-bottom: 30rpx; */
  position: relative;
  top: 30rpx;
}
.info {
  display: flex;
  flex-direction: column;
}
.info-title {
  font-size: 50rpx;
}
.info-detail {
  font-size: 25rpx;
  color: gray;
  margin-top: 6.039rpx;
}
.card-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 700rpx;
}
.card-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30.193rpx 0;
}
.card-list-box {
  transition: all .3s;
  cursor: pointer;
  text-align: center;
  width: 300rpx;
  height: 80rpx;
  line-height: 80rpx;
  border: 5rpx solid #e9d0d3;
  font-size: 30rpx;
}
.card-list-img {
  width: 120.773rpx;
  height: 120.773rpx;
  margin-right: 80.193rpx;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30.193rpx 0;
}
.last-button {
  width: 251.739rpx;
  height: 80.58rpx;
  line-height: 80.58rpx;
  border: 1.208rpx solid salmon;
  font-size: 30rpx;
  margin-right: 20rpx;
}
.next-button {
  width: 251.739rpx;
  height: 80.58rpx;
  line-height: 80.58rpx;
  border: 1.208rpx solid salmon;
  background-color: #f6c2cb;
  font-size: 30rpx;
  margin-left: 20rpx;
}
.card-bottom {
  /* margin-top: 50rpx; */
  /* margin-bottom: 50rpx; */
  position: relative;
  top: 25rpx;
}
@keyframes showDown {
  0% {
    opacity: 0;
    transform: translate(0, -125rpx);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
.img-bottom-left {
  z-index: 100;
  position: relative;
  top: 35rpx;
  width: 340rpx;
  height: 340rpx;
  animation: showDown 1s;
}
.img-bottom-right {
  position: absolute;
  bottom: -187rpx;
  right: -100rpx;
  width: 600rpx;
  height: 500rpx;
}
.top-img {
  width: 320rpx;
  height: 250rpx;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(60rpx, 0);
}
.card {
  padding: 0 60.386rpx;
  border-radius: 30.193rpx;
  background-color: white;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  height: calc(100vh - 140rpx);
}
/* 适配 iPhone 5 (320px x 568px) */
@media screen and (max-width: 320px) {
  .card-bottom{
    position: relative;
    top: -14rpx;
  }
}

/* 适配 iPhone 6/7/8 (375px x 667px) */
@media screen and (min-width: 321px) and (max-width: 375px) and (max-height: 667px) {
  .card-bottom{
    position: relative;
    top: -14rpx;
  }
}

/* 适配 iPhone 6/7/8 Plus (414px x 736px) */
@media screen and (min-width: 376px) and (max-width: 414px) and (max-height: 736px) {
  .card-bottom{
    position: relative;
    top: -14rpx;
  }
}

/* 适配 iPhone X (375px x 812px) */
@media screen and (min-width: 376px) and (max-width: 375px) and (min-height: 667px) and (max-height: 812px) {
  .card-bottom{
    position: relative;
    top: 25rpx;
  }
}

/* 适配 Windows 设备 (480px x 800px) */
@media screen and (min-width: 415px) and (max-width: 480px) and (min-height: 737px) and (max-height: 800px) {
  .container {
    transform: translate(0,100rpx);
  }
  .card{
    height: calc(100vh - 100rpx);
  }
  .info-title{
    margin-top: 40rpx;
    margin-bottom: 10rpx;
    font-size: 40rpx;
  }
  .button-container{
    position: relative;
    top:30rpx;
  }
  .last-button,.next-button{
    width: 200rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 24rpx;
  }
  .card-list{
    margin: 10rpx 0;
  }
  .card-list-box{
    height: 70rpx;
    line-height: 70rpx;
    font-size: 28rpx;
  }
  /* .img-bottom-left{
    width: 300rpx;
    height: 300rpx;
  }
  .img-bottom-right{
    width: 500rpx;
    height: 400rpx;
  } */
  .card-main{
    position: relative;
    top:35rpx;
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
  .info-title{
    margin-top: 40rpx;
    margin-bottom: 10rpx;
    font-size: 40rpx;
  }
  .button-container{
    position: relative;
    top:30rpx;
    z-index: 100;
  }
  .last-button,.next-button{
    width: 200rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 24rpx;
  }
  .card-list{
    margin: 10rpx 0;
  }
  .card-list-box{
    height: 70rpx;
    line-height: 70rpx;
    font-size: 28rpx;
  }
  .card-main{
    position: relative;
    top:70rpx;
  }
  .card-head{
    position: relative;
    top:50rpx;
  }
  .top-img{
    width: 270rpx;
    height: 220rpx;
  }
}

</style>
