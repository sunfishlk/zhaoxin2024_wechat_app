<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import {computed } from 'vue';
import log from '../../utils/log';

const studentNumber = ref('');

const baseUrl= getApp().globalData.baseUrl;

// const hideLogin=ref(false);

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

const login = async () => {
  if(checkRight.value){
    try {
      let code=await getCode(); // 等待 getCode 完成
      console.log('login');
      uni.setStorageSync('studentNumber', studentNumber.value);
      console.log(studentNumber.value);
      uni.request({
        url: `${baseUrl}/api/student`,
        method: 'POST',
        data: {
          // studentNumber: studentNumber.value,
          code: code,
          netid: studentNumber.value
        },
        success: (res) => {
          //添加日志
          log.info({
            requestData: {
              code: code,
              netid: studentNumber.value
            },
            responseData: res
          });
          console.log(res);
          if(res.data.success===false){
            uni.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            });
          }
          else{
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
              //
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
            if(dateTime===null||dateTime==='0001-01-01T00:00:00Z'){
              uni.redirectTo({
                url:'/pages/home/home'
              })
            }
            else{
              uni.redirectTo({
                url: '/pages/color-egg/color-egg'
              });
            }
            // uni.showToast({
            //   title: '登录成功',
            //   icon: 'success',
            //   duration: 2000
            // });
            uni.setStorageSync('studentNumber', studentNumber.value);
            uni.setStorageSync("cookie", res.cookies[0]);
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
    } catch (error) {
      console.error('获取 code 或登录失败', error);
      uni.showToast({
        title: JSON.stringify(error),
        icon: 'none',
        duration: 2000
      });
    }
  }
  else{
    uni.showToast({
      title: '学号格式或长度错误',
      icon: 'none',
      duration: 2000
    });
  }
};

const showAnimation=ref(false)

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

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
        uni.clearStorageSync();
        console.log(res);
        console.log(code);
        uni.setStorageSync("cookie", res.cookies[0]);
        showAnimation.value=true;
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
          await sleep(1000);
          hideLogo();
          console.log('首次登录,清空localStorage');
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
            //
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
          await sleep(1000);
          if(dateTime===null||dateTime==='0001-01-01T00:00:00Z'){
            uni.redirectTo({
              url:'/pages/home/home'
            })
          }
          else{
            uni.redirectTo({
              url: '/pages/color-egg/color-egg'
            });
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

// onMounted(() => {
//   checkIfFirstLogin();
// })

onShow(async()=>{
  await checkIfFirstLogin();
})

// onShow(async () => {
//   const fadeOutDuration = 2000; // 动画淡出时间为 2000ms

//   // 并行执行两个操作：动画淡出 和 checkIfFirstLogin
//   const fadeOutPromise = new Promise((resolve) => {
//     setTimeout(() => {
//       hideLogo(); // 隐藏 Logo
//       resolve(); // 动画结束
//     }, fadeOutDuration);
//   });

//   // 并行执行 checkIfFirstLogin
//   const loginPromise = checkIfFirstLogin();

//   // 等待两个操作完成
//   await Promise.all([fadeOutPromise, loginPromise]);
// });

const classList=ref(['input-rule','un-show']);

function validateTenDigits(input) {
  // 定义正则表达式
  const regex = /^\d{10}$/;
  // 测试输入是否匹配正则表达式
  return regex.test(input);
}

const checkRight=computed(()=>{
  return validateTenDigits(studentNumber.value);
})

const showRule = () => {
  //去除学号空格,10位全数字
  // studentNumber.value=studentNumber.value.replace(/\s+/g, "");
  // studentNumber.value=studentNumber.value.replace(/\D/g,'');
  // studentNumber.value=studentNumber.value.trim();
  //检验学号长度等于10
  console.log(studentNumber.value);
  console.log(checkRight.value);
  if(!checkRight.value){
    classList.value=['input-rule'];
  }
  else{
    classList.value=['input-rule','un-show'];
  }
}

// const logoShow=ref(false);
const logoShow=ref(true);

const showLogo=()=>{
  console.log('showLogo');
  logoShow.value=true;
}
const hideLogo=()=>{
  console.log('hideLogo');
  logoShow.value=false;
}

</script>

<template>
  <img src="https://static.tiaozhan.com/tenzor/1723376021133419622.svg" alt="" :class="['logo',{ 'animation' : showAnimation}]" :style="{display:logoShow?'':'none'}">
  <view class="container" :style="{display:logoShow?'none':''}">
    <view class="login-container">
      <view class="input-box">
        <view class="text">请输入学号</view>
        <view class="input-container">
          <input class="input" v-model="studentNumber" @blur="showRule" :cursor-spacing="10"/>
          <span :class="classList">学号长度或格式不对</span>
        </view>
      </view>   
      <button @click="login">挑战网，启动！</button>
    </view>
    <view class="home-container">
      <view class="img-container"> 
        <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/home/1722763683939496796.svg" class="bird"/>
        <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/home/1722763684070168775.svg" class="round">
      </view>
      <button @click="next">C O N T I N U E</button>
    </view>
  </view>
</template>

<style scoped>
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.logo {
  width: 570rpx;
  height: 400rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.animation {
  animation: fadeOut 1s linear forwards;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fffeff;
}

.hide-login{
  /* display: none !important; */
  visibility: hidden;
}
.login-container{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #fffeff;
  z-index: 100;
}
.un-show{
  visibility: hidden;
}
.input-box{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input-container{
  margin: 20rpx 0;
  text-align: center;
}
.input{
  /* width: 100%; */
  width: 500rpx;
  height: 80rpx;
  background-color: #f7f8fc;
  font-size: 30rpx;
  padding: 0 20rpx;
}
button {
  font-size: 40rpx;
  width: 600rpx;
  height: 100rpx;
  line-height: 100rpx;
  background-color: pink;
  border-radius: 50rpx;
  color: red;
  margin-top: 20rpx;
  z-index: 100;
}
.input-rule{
  font-size: 25rpx;
  color: red;
  margin-top: 10rpx;
}


.home-container{
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  display: none;
  z-index: 100;
}

.img-container {
  position: relative;
  width: 800rpx;
  height: 900rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bird {
  position: absolute;
  width: 700rpx;
  height: 900rpx;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-52%, -45.4%);
}

.round {
  position: absolute;
  width: 700rpx;
  height: 700rpx;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1; 
}

button {
  font-size: 40rpx;
  width: 600rpx;
  height: 100rpx;
  line-height: 100rpx;
  background-color: pink;
  border-radius: 50rpx;
  color: red;
  margin-top: 20rpx;
  z-index: 100;
}


</style>
