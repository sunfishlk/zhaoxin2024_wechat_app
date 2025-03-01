<script setup>
import { ref,onMounted } from 'vue'
import CollegeCard from '../../component/CollegeCard.vue';
import log from '../../utils/log';

const studentNumber = ref('')
const name= ref('')
const college= ref('')
const phoneNumber= ref('')
const email= ref('')
const whereKnow= ref('')

const last=()=>{
  // 跳转到上一页
  // uni.navigateTo({
  //   url: '/pages/home/home'
  // });
  uni.navigateBack();
}
const next=()=>{
  if(name.value.trim()===''){
    uni.showToast({
      title: '姓名不能为空',
      icon: 'none'
    });
    return;
  }
  if(college.value.trim()===''){
    uni.showToast({
      title: '书院不能为空',
      icon: 'none'
    });
    return;
  }
  if(phoneNumber.value.trim()===''){
    uni.showToast({
      title: '手机不能为空',
      icon: 'none'
    });
    return;
  }
  // 手机号码的正则表达式
  const phoneNumberPattern = /^1[3-9]\d{9}$/;
  if (!phoneNumberPattern.test(phoneNumber.value)) {
    uni.showToast({
      title: '手机号码格式不正确',
      icon: 'none'
    });
    return;
  }
  if(email.value.trim()===''){
    uni.showToast({
      title: '邮箱不能为空',
      icon: 'none'
    });
    return;
  }
  // 增加邮箱格式校验
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email.value)) {
    uni.showToast({
      title: '邮箱格式不正确',
      icon: 'none'
    });
    return;
  }
  if(whereKnow.value.trim()===''){
    uni.showToast({
      title: '从哪里知道我们不能为空',
      icon: 'none'
    });
    return;
  }
  uni.setStorageSync('studentNumber', studentNumber.value);
  uni.setStorageSync('name', name.value);
  uni.setStorageSync('college', college.value);
  uni.setStorageSync('phoneNumber', phoneNumber.value);
  uni.setStorageSync('email', email.value);
  uni.setStorageSync('whereKnow', whereKnow.value);
  // 跳转到下一页
  uni.navigateTo({
    url: '/pages/main-department/main-department'
  });
}

const nameList=ref(['rule','hide']);
const collegeList=ref(['rule','hide']);
const phoneNumberList=ref(['rule','hide']);
const emailList=ref(['rule','hide']);
const whereKnowList=ref(['rule','hide']);

const checkName=()=>{
  if(name.value.trim()===''){
    nameList.value=['rule'];
  }
  else{
    nameList.value=['rule','hide'];
  }
}
const checkCollege=()=>{
  if(college.value.trim()===''){
    collegeList.value=['rule'];
  }
  else{
    collegeList.value=['rule','hide'];
  }
}
const checkPhoneNumber=()=>{
  if(phoneNumber.value.trim()===''){
    phoneNumberList.value=['rule'];
  }
  else{
    phoneNumberList.value=['rule','hide'];
  }
}
const checkEmail=()=>{
  if(email.value.trim()===''){
    emailList.value=['rule'];
  }
  else{
    emailList.value=['rule','hide'];
  }
}
const checkWhereKnow=()=>{
  if(whereKnow.value.trim()===''){
    whereKnowList.value=['rule'];
  }
  else{
    whereKnowList.value=['rule','hide'];
  }
}

const collegeCardShow=ref(false);
const chooseCollege=(chosenCollege)=>{
  college.value=chosenCollege;
  hideCollegeCard();
}
const hideCollegeCard=()=>{
  collegeCardShow.value=false;
}
const showCollegeCard=()=>{
  collegeCardShow.value=true;
}

const isFormal=ref(false);
const baseUrl = getApp().globalData.baseUrl;
onMounted(()=>{
  if(uni.getStorageSync('studentNumber')!==''){
    studentNumber.value=uni.getStorageSync('studentNumber');
  }
  if(uni.getStorageSync('name')!==''){
    name.value=uni.getStorageSync('name');
  }
  if(uni.getStorageSync('college')!==''){
    college.value=uni.getStorageSync('college');
  }
  if(uni.getStorageSync('phoneNumber')!==''){
    phoneNumber.value=uni.getStorageSync('phoneNumber');
  }
  if(uni.getStorageSync('email')!==''){
    email.value=uni.getStorageSync('email');
  }
  if(uni.getStorageSync('whereKnow')!==''){
    whereKnow.value=uni.getStorageSync('whereKnow');
  }
  uni.request({
    url: `${baseUrl}/api/version?version=1`,
    method: 'GET',
    success:(res)=>{
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
        if(res.data.data.formal===true){
          isFormal.value=true;
          name.value='test1';
          phoneNumber.value='13800138000';
          email.value='1@1.com';
          console.log(name.value)
        }
        else{
          isFormal.value=false;
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
</script>

<template>
  <view class="total-container">
    <view class="container">
      <view class="card">
        <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/basic-info/1722763545479328043.svg" alt="" class="bottom-img">
        <view :class="['overlay',{'show':collegeCardShow}]" @click="hideCollegeCard"></view>
        <CollegeCard :collegeProps="college" @exit="chooseCollege" @hide="hideCollegeCard" :class="['college-card',{'college-card-show':collegeCardShow}]" />
        <!-- <TimeCard :dateProps="date" @hide="hideTimeCard()" :timeProps="time" @exit="(time)=>changeTime(time)" :class="['date-card',{'date-card-show':timeCardShow}]" /> -->
        <view class="icon-container">
          <view class="circle"></view>
          <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/basic-info/1722763544878580624.svg" alt="" class="icon">
        </view>
        <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/basic-info/1722763545247217346.svg" alt="" class="top-img">
        <view class="info-title">
          <span>基本信息</span>
        </view>
        <p class="label" v-if="!isFormal">姓名</p>
        <input class="uni-input" v-if="!isFormal" v-model="name" @blur="checkName" adjust-position="{{false}}" :cursor-spacing="10"/>
        <span :class="nameList">姓名不能为空</span>
        <p class="label">书院</p>
        <p class="uni-input" @click="showCollegeCard">{{ college }}</p>
        <!-- <input class="uni-input"  v-model="college" @blur="checkCollege"/> -->
        <span :class="collegeList">书院不能为空</span>
        <p class="label" v-if="!isFormal">手机</p>
        <input class="uni-input" v-if="!isFormal" v-model="phoneNumber" @blur="checkPhoneNumber" adjust-position="{{false}}" :cursor-spacing="10"/>
        <span :class="phoneNumberList">手机不能为空</span>
        <p class="label" v-if="!isFormal">邮箱</p>
        <input class="uni-input" v-if="!isFormal" v-model="email" @blur="checkEmail" adjust-position="{{false}}" :cursor-spacing="10"/>
        <span :class="emailList">邮箱不能为空</span>
        <p class="label">从哪里知道我们</p>
        <input class="uni-input"  v-model="whereKnow" @blur="checkWhereKnow" :cursor-spacing="10"/>
        <span :class="whereKnowList">从哪里知道我们不能为空</span>
        <view class="button-container">
          <!-- <button @click="last" class="last-button">上一步</button> -->
          <button @click="next" class="next-button">下一步</button>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
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
.college-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: #f6f8fb;
  display: none;
}
.college-card-show {
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
.rule{
  font-size: 25rpx;
  color: red;
  /* margin-top: 10rpx; */
}
.hide{
  visibility: hidden;
}
.total-container{
  background-color: #e9d0d3;
  /* font-family: '华文楷体'; */
}
.container{
  /* background-color: white; */
  transform: translate(0,140rpx);
}
@keyframes showDown
{
  0% {
    opacity:0;
    transform: translate(-30rpx,-75rpx);
  }
  100% {
    opacity:1;
    transform: translate(-30rpx,0);
  }
}
.top-img{
  animation: showDown 1s;
  width: 200rpx;
  height: 200rpx;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(-30rpx,0);
}
.info-title{
  margin-top: 60rpx;
  margin-bottom: 30rpx;
  font-size: 50rpx;
  font-family: 'HarmonyOS';
}
.card{
  padding: 0 60.386rpx;
  border-radius: 30.193rpx;
  background-color: white;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: calc(100vh - 140rpx);
  /* position: relative;
  top:60.386rpx; */
}
.uni-input{
  height: 70rpx;
  line-height: 70rpx;
  padding: 0rpx 20rpx;
  border-radius: 3.019rpx;
  background-color: #f6f8fc;
  font-size: 30rpx;
}
.label{
  margin: 20rpx 0;
  font-size: 30rpx;
  font-family: 'HarmonyOS';
}
.button-container{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 280rpx; */
  position: relative;
  top:30rpx;
}
.last-button{
  width: 251.739rpx;
  height: 80.58rpx;
  line-height: 80.58rpx;
  border: 1.208rpx solid salmon;
  font-size: 30rpx;
}
.next-button{
  width: 251.739rpx;
  height: 80.58rpx;
  line-height: 80.58rpx;
  background-color: #f6c2cb;
  font-size: 30rpx;
  font-family: 'HarmonyOS';
}
@keyframes showLeft{
  0% {
    opacity:0;
    transform: translate(-75rpx,0);
  }
  100% {
    opacity:1;
    transform: translate(0,0);
  }
}
.bottom-img-container{
  /* width: 750rpx; */
  text-align: left;
  position: absolute;
  bottom: 0;
  left: 0;
}
.bottom-img{
  width: 644rpx;
  height: 280rpx;
  position: absolute;
  bottom: 0;
  left:-86rpx;
  animation: showLeft 1s;
}

/* 适配 iPhone 5 (320px x 568px) */
@media screen and (max-width: 320px) {
  .label{
    margin: 10rpx 0;
    font-size: 28rpx;
  }
  .info-title{
    margin-top: 40rpx;
    margin-bottom: 20rpx;
  }
  .rule{
    font-size: 23rpx;
  }
  .button-container{
    position: relative;
    top:0rpx;
  }
}

/* 适配 iPhone 6/7/8 (375px x 667px) */
@media screen and (min-width: 321px) and (max-width: 375px) and (max-height: 667px) {
  .label{
    margin: 10rpx 0;
    font-size: 28rpx;
  }
  .info-title{
    margin-top: 40rpx;
    margin-bottom: 20rpx;
  }
  .rule{
    font-size: 23rpx;
  }
  .button-container{
    position: relative;
    top:0rpx;
  }
}

/* 适配 iPhone 6/7/8 Plus (414px x 736px) */
@media screen and (min-width: 376px) and (max-width: 414px) and (max-height: 736px) {
  .label{
    margin: 10rpx 0;
    font-size: 28rpx;
  }
  .info-title{
    margin-top: 40rpx;
    margin-bottom: 20rpx;
  }
  .rule{
    font-size: 23rpx;
  }
  .button-container{
    position: relative;
    top:0rpx;
  }
}

/* 适配 iPhone X (375px x 812px) */
@media screen and (min-width: 376px) and (max-width: 375px) and (min-height: 667px) and (max-height: 812px) {
  .label{
    margin: 20rpx 0;
  }
  .button-container{
    position: relative;
    top:30rpx;
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
  .label{
    margin: 10rpx 0;
    font-size: 24rpx;
  }
  .info-title{
    margin-top: 40rpx;
    margin-bottom: 10rpx;
    font-size: 40rpx;
  }
  .rule{
    font-size: 20rpx;
  }
  .button-container{
    position: relative;
    top:30rpx;
  }
  .last-button,.next-button{
    width: 200rpx;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 24rpx;
  }
  .uni-input{
    height: 50rpx;
    line-height: 50rpx;
    font-size: 21rpx;
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
    font-size: 24rpx;
  }
  .info-title{
    margin-top: 40rpx;
    margin-bottom: 10rpx;
    font-size: 40rpx;
  }
  .rule{
    font-size: 20rpx;
  }
  .button-container{
    position: relative;
    top:30rpx;
  }
  .last-button,.next-button{
    width: 200rpx;
    height: 60rpx;
    line-height: 60rpx;
    font-size: 24rpx;
  }
  .uni-input{
    height: 50rpx;
    line-height: 50rpx;
    font-size: 21rpx;
  }
  .bottom-img{
    width: 536rpx;
    height: 214rpx;
  }
  .top-img{
    width: 160rpx;
    height: 160rpx;
  }
}

</style>