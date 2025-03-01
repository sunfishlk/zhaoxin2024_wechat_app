<script setup>
import { ref,onMounted } from 'vue';

const otherDepartment=ref('');

const chooseDepartment=(depart)=>{
  otherDepartment.value=depart;
  console.log(otherDepartment.value);
}

const last=()=>{
  // 跳转到上一页
  // uni.navigateTo({
  //   url: '/pages/main-department/main-department'
  // });
  uni.setStorageSync('otherDepartment', otherDepartment.value);
  uni.navigateBack();
}
const next=()=>{
  if(otherDepartment.value.trim()===''){
    uni.showToast({
      title: '请选择意向部门',
      icon: 'none'
    });
    return;
  }
  uni.setStorageSync('otherDepartment', otherDepartment.value);
  // 跳转到下一页
  uni.navigateTo({
    url: '/pages/skills/skills'
  });
}

onMounted(()=>{
  if(uni.getStorageSync('otherDepartment')!==''){
    otherDepartment.value=uni.getStorageSync('otherDepartment');
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
        <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/other-department/1722763765587668032.svg" alt="" class="top-img">
        <view class="card-head">
          <view class="info">
            <text class="info-title">意向部门</text>
            <text class="info-detail">意向部门也只可以选择一个哦</text>
          </view>
        </view>
        <view class="card-main">
          <view class="card-list">
            <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/main-department/1722763733513724790.svg" alt="" class="card-list-img">
            <view :class="['card-list-box', { active: otherDepartment === '技术部' }]" id="tech" @click="chooseDepartment('技术部')">技术部</view>
          </view>
          <view class="card-list">
            <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/main-department/1722763732405850483.svg" alt="" class="card-list-img">
            <view :class="['card-list-box', { active: otherDepartment === '美工部' }]" id="beauty" @click="chooseDepartment('美工部')">美工部</view>
          </view>
          <view class="card-list">
            <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/main-department/1722763733810761063.svg" alt="" class="card-list-img">
            <view :class="['card-list-box', { active: otherDepartment === '视频部' }]" id="video" @click="chooseDepartment('视频部')">视频部</view>
          </view>
          <view class="button-container">
            <button class="last-button" @click="last">上一步</button>
            <button class="next-button" @click="next">下一步</button>
          </view>
        </view>
        <view class="card-bottom">
          <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/other-department/1722763765418997573.svg" class="img-bottom">
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
.active{
  background-color: #f6c2cb;
}
.total-container{
  background-color: #e9d0d3;
  font-family: 'HarmonyOS';
}
.card-head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60rpx;
  /* margin-bottom: 30rpx; */
}
.info{
  display: flex;
  flex-direction: column;
}
.info-title{
  font-size: 50rpx;
}
.info-detail{
  font-size: 25rpx;
  color: gray;
  margin-top: 6.039rpx;
}
.card-main{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 700rpx;
  /* margin-top: 60.386rpx; */
}
.card-list{
  display: flex;
  justify-content:space-between;
  align-items: center;
  margin: 30.193rpx 0;
}
.card-list-box{
  transition: all .3s;
  cursor: pointer;
  text-align: center;
  width: 300rpx;
  height: 80rpx;
  line-height: 80rpx;
  border: 5rpx solid #e9d0d3;
  font-size: 30rpx;
}
.card-list-img{
  width: 120.773rpx;
  height: 120.773rpx;
  margin-right: 80.193rpx;
}
.button-container{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30.193rpx 0;
}
.last-button{
  width: 251.739rpx;
  height: 80.58rpx;
  line-height: 80.58rpx;
  border: 1.208rpx solid salmon;
  font-size: 30rpx;
  margin-right: 20rpx;
}
.next-button{
  width: 251.739rpx;
  height: 80.58rpx;
  line-height: 80.58rpx;
  border: 1.208rpx solid salmon;
  background-color: #f6c2cb;
  font-size: 30rpx;
  margin-left: 20rpx;
}
.card-bottom{
  display: flex;
  justify-content: center;
  align-items: center; 
  margin: 60.039rpx 0rpx;
}
@keyframes showUp{
  0% {
    opacity:0;
    transform: translate(0,125rpx);
  }
  100% {
    opacity:1;
    transform: translate(0,0);
  }
}
.img-bottom{
  width: 400rpx;
  height: 300rpx;
  /* margin-top: 10rpx; */
  animation: showUp 1s;
}
.container{
  transform: translate(0,140rpx);
}
@keyframes showRight{
  0% {
    opacity:0;
    transform: translate(125rpx,0);
  }
  100% {
    opacity:1;
    transform: translate(0,0);
  }
}
.top-img{
  width: 280rpx;
  height: 130rpx;
  position: absolute;
  right: -50rpx;
  top: 108rpx;
  animation: showRight 1s;
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
  .top-img{
    position: absolute;
    right: -50rpx;
    top: 26rpx;
  }
}

/* 适配 iPhone 6/7/8 (375px x 667px) */
@media screen and (min-width: 321px) and (max-width: 375px) and (max-height: 667px) {
  .top-img{
    position: absolute;
    right: -50rpx;
    top: 26rpx;
  }
}

/* 适配 iPhone 6/7/8 Plus (414px x 736px) */
@media screen and (min-width: 376px) and (max-width: 414px) and (max-height: 736px) {
  .top-img{
    position: absolute;
    right: -50rpx;
    top: 26rpx;
  }
}

/* 适配 iPhone X (375px x 812px) */
@media screen and (min-width: 376px) and (max-width: 375px) and (min-height: 667px) and (max-height: 812px) {
  .top-img{
    position: absolute;
    right: -50rpx;
    top: 108rpx;
  }
}

/* 适配 Windows 设备 (480px x 800px) */
@media screen and (min-width: 415px) and (max-width: 480px) and (min-height: 737px) and (max-height: 800px) {
  .top-img{
    position: absolute;
    right: -50rpx;
    top: 26rpx;
  }
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
    position: absolute;
    top: 0rpx;
    right: -50rpx;
  }
  .img-bottom{
    width: 330rpx;
    height: 300rpx;
  }
}

</style>