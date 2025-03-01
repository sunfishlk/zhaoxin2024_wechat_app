<script setup>
import {ref} from 'vue';
import CancelConfirmCard from '../../component/CancelConfirmCard.vue';
import log from '../../utils/log.js';
import {onMounted} from 'vue';

const baseUrl= getApp().globalData.baseUrl;

const push=(route)=>{
  uni.navigateTo({
    url: `/pages/${route}/${route}`
  });
}

const pushBack=()=>{
  //清空页面所有栈，防止栈溢出
  // uni.reLaunch({
  //   url: '/pages/basic-info/basic-info'
  // });
  uni.navigateTo({
    url:'/pages/basic-info/basic-info'
  })
  // uni.navigateBack();
}

const getCode = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: (res) => {
        if (res.code) {
          console.log('登录 code:', res.code);
          resolve(res.code);
        } else {
          console.log('登录失败！' + res.errMsg);
          reject(new Error('登录失败！' + res.errMsg)); 
        }
      },
      fail: (err) => {
        console.log(err);
        reject(err);
      }
    });
  });
};

const checkIfFirstLogin = async() => {
  let code='';
  // let code2='';
  try{
    code = await getCode();
    // code2=await getCode();
    console.log(code);
    // console.log(code2);
  }catch(err){
    console.log(err);
  }
  if (code) {
    uni.request({
      url: `${baseUrl}/api/student`,
      method: 'POST',
      data: {
        code: code
      },
      success: async(res) => {
        //添加日志
        log.info({
          requestData: {
            code: code
          },
          responseData: res
        });
        console.log(res);
        console.log(code);
        uni.setStorageSync("cookie", res.cookies[0]);
        if(res.data.success===false){
          console.log(res.data.message);
          uni.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          });
          return;
        }
        if (res.data.data.is_first) {
          // 处理首次提交的逻辑
          // 第一次登录，清空
          // uni.clearStorageSync();
          // console.log('首次登录,清空localStorage');
          //第一次登录，显示登录页面
          // hideLogin.value=false;
        } else {
          // 处理非首次提交的逻辑,将后端返回的信息储存到localStorage中
          // 非首次登录，隐藏登录页面
          // hideLogin.value=true;
          console.log(res);
          uni.setStorageSync('studentNumber', res.data.data.stuinfo.netid);
          uni.setStorageSync('name', res.data.data.stuinfo.name);
          uni.setStorageSync('phoneNumber', res.data.data.stuinfo.phone);
          uni.setStorageSync('email', res.data.data.stuinfo.mail);
          uni.setStorageSync('mainDepartment', res.data.data.stuinfo.mainde);
          uni.setStorageSync('otherDepartment', res.data.data.stuinfo.secondary);
          uni.setStorageSync('skills', res.data.data.stuinfo.already);
          uni.setStorageSync('wantToLearn', res.data.data.stuinfo.want);
          uni.setStorageSync('whereKnow', res.data.data.stuinfo.whereknow);
          uni.setStorageSync('college', res.data.data.stuinfo.clazz);
          let dateTime=res.data.data.stuinfo.time;
          if(dateTime===null){
            uni.setStorageSync('date', '');
            uni.setStorageSync('time', '');
          }
          else{
            // 拆分日期和时间
            const splitDateTime = (dateTime) => {
              let [date, time] = dateTime.split('T');
              let [hour, minute] = time.split(':');
              let [year, month, day] = date.split('-');
              return { date: `${month}-${day}`, time: `${hour}:${minute}` };
            };
            uni.setStorageSync('date', splitDateTime(dateTime).date);
            uni.setStorageSync('time', splitDateTime(dateTime).time);
            console.log(dateTime);
            console.log(splitDateTime(dateTime).date);
            console.log(splitDateTime(dateTime).time);
          }
        }
      },
      fail: (err) => {
        console.log(err);
        uni.showToast({
          title: JSON.stringify(err),
          icon: 'none'
        });
      }
    });
  } else {
    console.log('登录 code 不存在');
  }
};

let cookie = uni.getStorageSync('cookie');

const showCancelButton=ref(true);
// const showCancelButton=ref(false);

const cancel=()=>{
  uni.request({
    url:`${baseUrl}/api/student/itv`,
    method:'DELETE',
    header: {
      'Content-Type': 'application/json',
      "Cookie": cookie
    },
    success: (res) => {
      //添加日志
      log.info({
        responseData: res
      });
      console.log(res);
      if(res.data.success===false){
        uni.showToast({
          title: res.data.message,
          icon: 'none'
        });
      }else{
        checkIfFirstLogin();
        uni.reLaunch({
          url: '/pages/home/home'
        });
      }
    },
    fail: (err) => {
      console.log(err);
      uni.showToast({
        title: JSON.stringify(err),
        icon: 'none'
      });
    }
  })
}

const cancelInterview=()=>{
  cancel();
  hideCancelConfirmCard();
}
const keepInterview=()=>{
  uni.showToast({
    title: '已保留报名',
    icon: 'none'
  });
  hideCancelConfirmCard();
}

const showCancelConfirm=ref(false);

const showCancelConfirmCard=()=>{
  showCancelConfirm.value=true;
}
const hideCancelConfirmCard=()=>{
  showCancelConfirm.value=false;
}

onMounted(()=>{
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
        if(res.data.data.check_interv===true){
          showCancelButton.value=false;
        }
        else{
          showCancelButton.value=true;
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
  <CancelConfirmCard v-if="showCancelConfirm" @yes="cancelInterview" @no="keepInterview" class="cancel-confirm-card"/>
  <view class="center">
    <!-- <img src="https://static.tiaozhan.com/tenzor/1722818295429930233.svg" alt="" class="round"> -->
    <view class="round">
      <img src="https://static.tiaozhan.com/tenzor/1723126533006271473.svg" alt="" class="person">
    </view>
    <view class="filter">
      <span class="title">报名成功!</span>
    </view>
  </view>
  <view class="bottom">
    <view class="button" @click="pushBack">修改信息</view>
    <view class="button" @click="push('QRCode')">条形码</view>
    <view class="button" @click="push('position')">阁楼导航</view>
    <view :class="['button',showCancelButton?'hide':'']" @click="push('interview-result')">面试结果查询</view>
    <view :class="['button',showCancelButton?'':'hide']" @click="showCancelConfirmCard">取消报名</view>
  </view>
</template>

<style scoped>
.cancel-confirm-card{
  position: absolute;
  z-index: 1000;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
}
.hide{
  display: none;
}
.filter{
  width: 100vw;
  backdrop-filter: blur(10rpx);
  text-align: center;
  z-index: 150;
  padding: 20rpx 0;
}
.title{
  font-size: 100rpx;
  color: black;
  z-index: 200;
  font-weight: 900;
  /* font-family: '华文楷体'; */
  /* font-family: 'HarmonyOS Sans'; */
  font-family: 'Alimama ShuHeiTi';
}
.center{
  margin-top: 200rpx;
  width: 100%;
  height: 800rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: 'HarmonyOS';
}
.bottom{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-family: 'HarmonyOS';
}
.button{
  width: 200rpx;
  height: 40rpx;
  line-height: 40rpx;
  padding: 20rpx;
  background-color: #eecfd3;
  border-radius: 40rpx;
  text-align: center;
  margin: 30rpx 50rpx;
  font-size: 30rpx;
}
.round{
  position: absolute;
  width: 600rpx;
  height: 600rpx;
  border: 20rpx solid #eecfd3;
  border-radius: 1000rpx;
  overflow: hidden;
  box-shadow: 6rpx 12rpx 12rpx 0rpx #d9d8d9;
  /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
  display: flex;
  justify-content: center;
}
@keyframes swag{
  0%{
    transform: rotate(0deg);
    translate: -60rpx 0;
  }
  50%{
    transform: rotate(5deg);
    translate: -10rpx -15rpx;
  }
  100%{
    transform: rotate(10deg);
    translate: 40rpx -10rpx;
  }
}
.person{
  position: absolute;
  /* width: 720rpx; */
  height: 720rpx;
  z-index: 100;
  animation: swag 1s infinite alternate cubic-bezier(0.410, 0.185, 0.535, 0.875);
  opacity: 0.58;
  /* top:90rpx; */
}

/* 适配 Windows 设备 (480px x 800px) */
@media screen and (min-width: 415px) and (max-width: 480px) and (min-height: 737px) and (max-height: 800px) {
  .center{
    margin-top: 0rpx;
  }
}
/* iPad 媒体查询 */
@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) {
  .center{
    height: 700rpx;
    margin-top: 0rpx;
  }
  .round{
    width: 500rpx;
    height: 500rpx;
  }
  .person{
    height: 500rpx;
  }
}

</style>