<script setup>
import { ref } from 'vue';
import DateCard from '../../component/DateCard.vue';
import TimeCard from '../../component/TimeCard.vue';
import { onShow } from '@dcloudio/uni-app';

// 获取初始值
const schoolArea = ref(uni.getStorageSync('schoolArea') || '兴庆校区');
const date = ref(uni.getStorageSync('date') || '');
const time = ref(uni.getStorageSync('time') || '');
const position = ref(uni.getStorageSync('position') || '挑战阁楼');

onShow(()=>{
  schoolArea.value = uni.getStorageSync('schoolArea') || '兴庆校区';
  date.value = uni.getStorageSync('date') || '';
  time.value = uni.getStorageSync('time') || '';
  position.value = uni.getStorageSync('position') || '挑战阁楼';
})

// 控制日期选择卡片的显示与隐藏
const dateCardShow=ref(false);
const showDateCard=()=>{
  dateCardShow.value=true;
}
const hideDateCard=()=>{
  dateCardShow.value=false;
}

// 控制时间选择卡片的显示与隐藏
const timeCardShow=ref(false);
const showTimeCard=()=>{
  //如果没有选日期则不能选时间
  if(date.value===''){
    uni.showToast({
      title: '请先选择日期',
      icon: 'none'
    });
    return;
  }
  timeCardShow.value=true;
}
const hideTimeCard=()=>{
  timeCardShow.value=false;
}

// 页面导航逻辑
const last = () => {
  uni.setStorageSync('schoolArea', schoolArea.value);
  uni.setStorageSync('date', date.value);
  uni.setStorageSync('time', time.value);
  uni.setStorageSync('position', position.value);
  uni.navigateBack();
};

const next = () => {
  if(date.value.trim()===''){
    uni.showToast({
      title: '请选择日期',
      icon: 'none'
    });
    return;
  }
  if(time.value.trim()===''){
    uni.showToast({
      title: '请选择时间',
      icon: 'none'
    });
    return;
  }
  uni.setStorageSync('schoolArea', schoolArea.value);
  uni.setStorageSync('date', date.value);
  uni.setStorageSync('time', time.value);
  uni.setStorageSync('position', position.value);
  uni.navigateTo({
    url: '/pages/message-confirm/message-confirm'
  });
};

// 日期和时间处理逻辑
const combineDate = (month, day) => {
  if (month === '' || day === '') return '';
  return `${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};

const changeDate = (month, day) => {
  date.value = combineDate(month, day);
  hideDateCard();
};

const manageTimeFormat = (time) => {
  return time.split('~')[0].trim();
};

const changeTime = (chosenTime) => {
  hideTimeCard();
  //如果为空则不修改
  if(chosenTime===''){
    return;
  }
  time.value = manageTimeFormat(chosenTime);
};
const test=()=>{
  console.log('test');
}
</script>

<template>
  <view class="total-container">
    <view class="container">
      <view class="card">
        <view v-if="dateCardShow" :class="['overlay',{'show':dateCardShow}]" @click="hideDateCard"></view>
        <view v-if="timeCardShow" :class="['overlay',{'show':timeCardShow}]" @click="hideTimeCard"></view>
        <DateCard v-if="dateCardShow" :dateProps="date" @hide="hideDateCard()" @exit="(month,day)=>{changeDate(month,day);hideDateCard();showTimeCard();}" :class="['date-card',{'date-card-show':dateCardShow}]" />
        <TimeCard v-if="timeCardShow" :dateProps="date" @hide="hideTimeCard()" :timeProps="time" @exit="(time)=>changeTime(time)" :class="['date-card',{'date-card-show':timeCardShow}]" />
        <view class="icon-container">
          <view class="circle"></view>
          <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/interview/1722763717147494297.svg" alt="" class="icon">
        </view>
        <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/interview/1722763717295738332.svg" alt="" class="aside-img">
        <view class="card-margin">
          <view class="card-head">
            <view class="info">
              <text class="info-title">选择面试时间段</text>
            </view>
          </view>
          <p class="label">校区</p>
          <input class="uni-input" v-model="schoolArea" disabled />
          <p class="label">地点</p>
          <input class="uni-input" v-model="position" disabled />
          <p class="label">日期</p>
          <p class="uni-input" @click="showDateCard">{{ date }}</p>
          <p class="label">时间</p>
          <p class="uni-input" @click="showTimeCard">{{ time }}</p>
          <view class="card-main">
            <view class="button-container">
              <button class="last-button" @click="last">上一步</button>
              <button class="next-button" @click="next">下一步</button>
            </view>
          </view>
        </view>
        <view class="bottom">
          <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/interview/1722763717433351908.svg" class="img-bottom">
        </view>
      </view>
    </view>
  </view>
</template>


<style scoped>
.hide {
  display: none;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background: rgba(255, 255, 255, 0.4);
  z-index: 100;
  display: none;
}
.overlay.show {
  display: block;
}
.date-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: #f6f8fb;
  display: none;
}
.date-card-show {
  display: block !important;
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
.date-picker, .time-picker {
  position: relative;
}
.uni-input {
  width: 100%;
  height: 70rpx;
  line-height: 70rpx;
  font-size: 30rpx;
  margin-top: 10.193rpx;
  background-color: #f6f8fc;
  padding: 0 20rpx;
}
.card-margin {
  margin: 0 60.386rpx;
}
.total-container {
  background-color: #e9d0d3;
}
.label {
  font-size: 30rpx;
  margin-top: 30.193rpx;
  font-family: 'HarmonyOS';
}
.card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60rpx;
  margin-bottom: 30rpx;
}
.info {
  display: flex;
  flex-direction: column;
}
.info-title {
  font-size: 50rpx;
  font-family: 'HarmonyOS';
}
.card-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 80.386rpx;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30.193rpx 0;
  font-family: 'HarmonyOS';
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
.bottom {
  display: flex;
  justify-content: center;
  overflow: hidden;
  flex: 1;
}
@keyframes showUp {
  0% {
    opacity: 0;
    transform: translate(0, 75rpx);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
.img-bottom {
  width: 850rpx;
  height: 190rpx;
  position: absolute;
  bottom: -3rpx;
  animation: showUp 1s;
}
.container {
  transform: translate(0, 140rpx);
}
@keyframes showDown {
  0% {
    opacity: 0;
    transform: translate(0, -75rpx);
  }
  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}
.aside-img {
  width: 250rpx;
  height: 250rpx;
  position: absolute;
  top: 0;
  right: 0;
  animation: showDown 1s;
}
.card {
  border-radius: 30.193rpx;
  background-color: white;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 140rpx);
}

/* 适配 Windows 设备 (480px x 800px) */
@media screen and (min-width: 415px) and (max-width: 480px) and (min-height: 737px) and (max-height: 800px) {
  .container {
    transform: translate(0,100rpx);
  }
  .card{
    height: calc(100vh - 100rpx);
  }
  .label{
    margin: 10rpx 0;
    font-size: 25rpx;
  }
  .info-title{
    font-size: 40rpx;
  }
  .rule{
    font-size: 20rpx;
  }
  .button-container{
    position: relative;
    margin: 10rpx 0;
  }
  .last-button,.next-button{
    width: 200rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 24rpx;
  }
  .uni-input{
    height: 60rpx;
    line-height: 60rpx;
    font-size: 23rpx;
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
  .label{
    margin: 10rpx 0;
    font-size: 25rpx;
  }
  .info-title{
    font-size: 40rpx;
  }
  .rule{
    font-size: 20rpx;
  }
  .button-container{
    position: relative;
    margin: 10rpx 0;
  }
  .last-button,.next-button{
    width: 200rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 24rpx;
  }
  .uni-input{
    height: 60rpx;
    line-height: 60rpx;
    font-size: 23rpx;
  }
  .button-container{
    z-index: 100;
  }
}

</style>
