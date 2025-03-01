<script setup>
import { ref,onMounted } from 'vue';

const last=()=>{
  // 跳转到上一页
  // uni.navigateTo({
  //   url: '/pages/other-department/other-department'
  // });
  uni.setStorageSync('skills', skills.value);
  uni.setStorageSync('wantToLearn', wantToLearn.value);
  uni.navigateBack();
}
const next=()=>{
  // if(skills.value.trim()===''||wantToLearn.value.trim()===''){
  //   uni.showToast({
  //     title: '请填写完整信息',
  //     icon: 'none'
  //   });
  if(skills.value.trim()===''){
    uni.showToast({
      title: '已会不能为空',
      icon: 'none'
    });
    return;
  }
  if(wantToLearn.value.trim()===''){
    uni.showToast({
      title: '想学不能为空',
      icon: 'none'
    });
    return;
  }
  uni.setStorageSync('skills', skills.value);
  uni.setStorageSync('wantToLearn', wantToLearn.value);
  // 跳转到下一页
  uni.navigateTo({
    url: '/pages/interview/interview'
  });
}

const skills=ref('');
const wantToLearn=ref('');

onMounted(()=>{
  if(uni.getStorageSync('skills')!==''){
    skills.value=uni.getStorageSync('skills');
  }
  if(uni.getStorageSync('wantToLearn')!==''){
    wantToLearn.value=uni.getStorageSync('wantToLearn');
  }
})

const skillsList=ref(['rule','hide']);
const wantToLearnList=ref(['rule','hide']);

const checkSkills=()=>{
  if(skills.value.trim()===''){
    skillsList.value=['rule'];
  }
  else{
    skillsList.value=['rule','hide'];
  }
}
const checkWantToLearn=()=>{
  if(wantToLearn.value.trim()===''){
    wantToLearnList.value=['rule'];
  }
  else{
    wantToLearnList.value=['rule','hide'];
  }
}

</script>

<template>
  <view class="total-container">    
    <view class="container">
      <view class="card">
        <view class="icon-container">
          <view class="circle"></view>
          <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/skills/1722763780395854928.svg" alt="" class="icon">
        </view>
        <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/skills/1722763780629387424.svg" alt="" class="aside-img">
        <view class="card-head">
          <view class="info">
            <text class="info-title">知识与技能</text>
          </view>
        </view>
        <view class="card-main">
          <view class="content">            
            <p class="label">已会</p>
            <input class="uni-input" v-model="skills" @blur="checkSkills" adjust-position="{{false}}" cursor-spacing="10"/>
            <span :class="skillsList">已会不能为空</span>
            <p class="label">想学</p>
            <input class="uni-input" v-model="wantToLearn" @blur="checkWantToLearn" adjust-position="{{false}}" cursor-spacing="10"/>
            <span :class="wantToLearnList">想学不能为空</span>
          </view>
          <view class="button-container">
            <button class="last-button" @click="last">上一步</button>
            <button class="next-button" @click="next">下一步</button>
          </view>
          <view class="img-bottom-container">
            <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/skills/1722763780274405969.svg" class="img-bottom">
          </view>
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
.content{
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.rule{
  font-size: 25rpx;
  color: red;
  margin-top: 10rpx;    
}
.hide{
  visibility: hidden;
}
.total-container{
  background-color: #e9d0d3;
}
.label{
  font-size: 30rpx;
  margin-top: 10.193rpx;
  font-family: 'HarmonyOS';
}
.uni-input{
  width: 95%;
  height: 70rpx;
  padding: 0 20rpx;
  font-size: 30rpx;
  margin-top: 10.193rpx;
  background-color: #f6f8fc;
} 
.card-head{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 60rpx;
  margin-bottom: 30rpx;
}
.info{
  display: flex;
  flex-direction: column;
}
.info-title{
  font-size: 50rpx;
  font-family: 'HarmonyOS';
}
.info-detail{
  font-size: 25rpx;
  color: gray;
  margin-top: 6.039rpx;
}
.card-main{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  flex: 1;
  /* margin-top: -30rpx; */
}
.card-list{
  display: flex;
  justify-content:space-between;
  align-items: center;
  margin: 30.193rpx 0;
}
.card-list-box{
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
  margin-right: 80.193rpx;
}
.button-container{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100.193rpx 0;
  position: relative;
  z-index: 999;
  font-family: 'HarmonyOS';
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
.bottom{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
}
@keyframes showUp{
  0% {
    opacity:0;
    transform: translate(0,75rpx);
  }
  100% {
    opacity:1;
    transform: translate(0,0);
  }
}
.img-bottom{
  /* width: 400rpx; */
  /* width: 100vw; */
  height: 300rpx;
  animation: showUp 1s;
}
.img-bottom-container{
  width: 100%;
  height: 300rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -140rpx;
}
.container{
  /* background-color: white; */
  transform: translate(0,140rpx);  
}
@keyframes showRight{
  0% {
    opacity:0;
    transform: translate(75rpx,0);
  }
  100% {
    opacity:1;
    transform: translate(0,0);
  }
}
.aside-img{
  width: 400rpx;
  height: 700rpx;
  position: absolute;
  top: 20rpx;
  right: -200rpx;
  animation: showRight 1s;
  z-index: 100;
}
.card{
  padding: 0 60.386rpx;
  border-radius: 30.193rpx;
  background-color: white;
  height: calc(100vh - 140rpx);
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* position: relative;
  top:60.386rpx; */
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
  .img-bottom{
    width: 500rpx;
  }
}

</style>