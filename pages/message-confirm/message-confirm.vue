<script setup>
import { ref } from 'vue';
import { onMounted }  from 'vue';
import log from '../../utils/log';

const baseUrl= getApp().globalData.baseUrl;

const message=ref({
  name: '',
  college: '',
  studentNumber: '',
  phoneNumber: '',
  email: '',
  mainDepartment: '',
  otherDepartment: '',
  skills: '',
  wantToLearn: '',
  schoolArea: '',
  date: '',
  time: '',
  position: '',
  whereKnow: ''
});

// const push=()=>{
//   uni.navigateTo({
//     url: '/pages/color-egg/color-egg'
//   });
// }

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
  let code2='';
  try{
    code = await getCode();
    code2=await getCode();
    console.log(code);
    console.log(code2);
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
          requestData:{
            code:code
          },
          responseData:res
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
        }
      },
      fail: (err) => {
        console.log(err);
        uni.showToast({
          title: JSON.stringify(err),
          icon: 'none',
        })
      }
    });
  } else {
    console.log('登录 code 不存在');
  }
};

const submit = () => {
  let cookie = uni.getStorageSync('cookie');
  console.log(cookie);

  const combineDateTime = (date, time) => {
    let dateTimeString = `2024-${date}T${time}:00.00+08:00`;
    return dateTimeString;
  };

  let dateTime = combineDateTime(message.value.date, message.value.time);
  console.log(dateTime);

  console.log({
    name: message.value.name,
    mainde: message.value.mainDepartment,
    time: dateTime,
    netid: message.value.studentNumber,
    secondary: message.value.otherDepartment,
    Phone: message.value.phoneNumber,
    mail: message.value.email,
    already: message.value.skills,
    want: message.value.wantToLearn,
    whereknow: message.value.whereKnow,
    clazz: message.value.college,
    // schoolArea: message.value.schoolArea,
    // position: message.value.position
  });

  const sendRequest = (url, data) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: url,
        method: 'PUT',
        header: {
          'Content-Type': 'application/json',
          "Cookie": cookie
        },
        data: data,
        success: (res) => {
          //添加日志
          log.info({
            requestData:{
              data:data
            },
            responseData:res
          });
          console.log(res);
          if (res.data.success === false) {
            uni.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            });
            console.log(res.data.message);
            reject(res.data.message);
          } else {
            resolve(res);
          }
        },
        fail: (err) => {
          console.log(err);
          reject(err);
        }
      });
    });
  };

  let request1 = sendRequest(`${baseUrl}/api/student/info`, {
    name: message.value.name,
    time: dateTime,
    netid: message.value.studentNumber,
    Phone: message.value.phoneNumber,
    mail: message.value.email,
    already: message.value.skills,
    want: message.value.wantToLearn,
    whereknow: message.value.whereKnow,
    clazz: message.value.college
  });

  request1
    .then((res1) => {
      if (res1.data.success) {
        let request2 = sendRequest(`${baseUrl}/api/student/itv`, {
          time: dateTime,
          department: message.value.mainDepartment,
          secondary: message.value.otherDepartment
        });
        return request2;
      } else {
        throw new Error(res1.data.message);
      }
    })
    .then((res2) => {
      if (res2.data.success) {
        uni.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        });
        // 选择时间日期成功后，弹出微信订阅消息通知
        subscribeMsg();
        // return request3;
      } else {
        throw new Error(res2.data.message);
      }
    })
    .catch(async(error) => {
      //提交失败请求api恢复原始数据
      await checkIfFirstLogin();
      console.log(error);
    });
};
//发送微信订阅号消息
const subscribeMsg=async()=>{
  const register="nQrZdlf6tFtAyiHjvjtFHsKMAWICDvvmYVpP2448-0M";
  const itvTime="EkFzf-rthPh8QVXvTaH-dhnWkeSg1wWodVhn044cJWA";
  const itvRes="SjIczANpmNHE8I8AKisDK3zWqQauGfm9F5X7PTFk4PY";
  wx.requestSubscribeMessage({
    tmplIds: [register,itvTime,itvRes],
    success: (res) => {
      console.log(res);
      let state={
        register:res[register]==='accept'?1:0,
        itvTime:res[itvTime]==='accept'?1:0,
        itvRes:res[itvRes]==='accept'?1:0
      }
      let cookie = uni.getStorageSync('cookie');
      uni.request({
        url:`${baseUrl}/api/student/submsg`,
        method:'PUT',
        header: {
          'Content-Type': 'application/json',
          "Cookie": cookie
        },
        data:state,
        success:(res)=>{
          //添加日志
          log.info({
            requestData:{
              state:state
            },
            responseData:res
          });
          console.log(res);
          uni.reLaunch({
            url: '/pages/color-egg/color-egg'
          });
        },
        fail:(err)=>{
          console.log(err);
          uni.showToast({
            title: JSON.stringify(err),
            icon: 'none'
          });
        }
      });
    },
    fail: (err) => {
      console.log(err);
      uni.showToast({
        title: JSON.stringify(err),
        icon: 'none'
      });
    }
  });
}

const isFormal=ref(false);
onMounted(() => {
  message.value.name = uni.getStorageSync('name');
  message.value.college = uni.getStorageSync('college');
  message.value.studentNumber = uni.getStorageSync('studentNumber');
  message.value.phoneNumber = uni.getStorageSync('phoneNumber');
  message.value.email = uni.getStorageSync('email');
  message.value.mainDepartment = uni.getStorageSync('mainDepartment');
  message.value.otherDepartment = uni.getStorageSync('otherDepartment');
  message.value.skills = uni.getStorageSync('skills');
  message.value.wantToLearn = uni.getStorageSync('wantToLearn');
  message.value.schoolArea = uni.getStorageSync('schoolArea');
  message.value.date = uni.getStorageSync('date');
  message.value.time = uni.getStorageSync('time');
  message.value.position = uni.getStorageSync('position');
  message.value.whereKnow = uni.getStorageSync('whereKnow');
  // 查询版本信息
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
});

const pushBack=(backDepth)=>{
  uni.navigateBack({
     delta: backDepth
  });
}

</script>

<template>
  <view class="total-container">    
    <view class="container">
      <view class="icon-container">
        <view class="circle"></view>
        <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/message-confirm/1722763749420828395.svg" alt="" class="icon">
      </view>
      <view class="card">
        <view class="card-head">
          <view class="info">
            <text class="info-title">信息确认</text>
            <text class="info-detail">点击对应输入框即可修改信息</text>
          </view>
        </view>
        <view class="card-main">
          <view class="short">
            <view class="short-content" v-if="!isFormal">
              <span class="short-content-text">姓名</span>
              <view class="short-content-input" @click="pushBack(5)">{{ message.name }}</view>
            </view>
            <view class="short-content">
              <span class="short-content-text">书院</span>
              <view class="short-content-input" @click="pushBack(5)">{{ message.college }}</view>
            </view>
          </view>
          <!-- <view class="long">
            <span class="long-content-text">学号</span>
            <view class="long-content-input" @click="pushBack(5)">{{ message.studentNumber }}</view>
          </view> -->
          <view class="long" v-if="!isFormal">
            <span class="long-content-text">手机</span>
            <view class="long-content-input" @click="pushBack(5)">{{ message.phoneNumber }}</view>
          </view>
          <view class="long" v-if="!isFormal">
            <span class="long-content-text">邮箱</span>
            <view class="long-content-input" @click="pushBack(5)">{{ message.email }}</view>
          </view>
          <view class="full">
            <p class="full-content-text">从哪里知道我们</p>
            <view class="full-content-input" @click="pushBack(5)">{{ message.whereKnow }}</view>
          </view>
          <view class="full">
            <p class="full-content-text">主选部门</p>
            <view class="full-content-input" @click="pushBack(4)">{{ message.mainDepartment }}</view>
          </view>
          <view class="full">
            <p class="full-content-text">意向部门</p>
            <view class="full-content-input" @click="pushBack(3)">{{ message.otherDepartment }}</view>
          </view>
          <view class="full">
            <p class="full-content-text">已会</p>
            <view class="full-content-input" @click="pushBack(2)">{{ message.skills }}</view>
          </view>
          <view class="full">
            <p class="full-content-text">想学</p>
            <view class="full-content-input" @click="pushBack(2)">{{ message.wantToLearn }}</view>
          </view>
          <view class="short">
            <view class="short-content">
              <span class="short-content-text">校区</span>
              <view class="short-content-input" @click="pushBack(1)">{{ message.schoolArea }}</view>
            </view>
            <view class="short-content">
              <span class="short-content-text">地点</span>
              <view class="short-content-input" @click="pushBack(1)">{{ message.position }}</view>
            </view>
          </view>
          <view class="short">
            <view class="short-content">
              <span class="short-content-text">日期</span>
              <view class="short-content-input" @click="pushBack(1)">{{ message.date }}</view>
            </view>
            <view class="short-content">
              <span class="short-content-text">时间</span>
              <view class="short-content-input" @click="pushBack(1)">{{ message.time }}</view>
            </view>
          </view>
          <view class="button-container">
            <button class="confirm-button" @click="submit">确认</button>
          </view>
        </view>
      </view>
    </view>
    <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/message-confirm/1722763749261527232.svg" alt="" class="aside-img">
    <view class="bottom">
      <view class="background"></view>
      <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/message-confirm/1722763748954040667.svg" alt="" class="bottom-left-img">
      <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/message-confirm/1722763749087940965.svg" alt="" class="bottom-right-img">
    </view>
  </view>
</template>

<style scoped>
.background {
  width: 100vw;
  height: 200rpx;
  position: absolute;
  background-image: linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
  z-index:-1;
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
.short{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 600rpx;
  margin: 20rpx 0;
}
.short-content{
  width: 350rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}
.short-content-text,.long-content-text{
  font-size: 32rpx;
  /* margin: 0 30.193rpx; */
  font-family: 'HarmonyOS';
}
.full-content-text{
  font-size: 32rpx;
  margin: 20rpx 0rpx;
  font-family: 'HarmonyOS';
}
.short-content-input{
  flex: 1;
  height: 80.386rpx;
  line-height: 80.386rpx;
  background-color: #f6f8fc;
  margin: 0 20rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  overflow: hidden;
}
.long{
  width: 600rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20rpx 0;
}
.long-content-input{
  background-color: #f6f8fc;
  flex: 1;
  height: 80.386rpx;
  line-height: 80.386rpx;
  margin: 0 20rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
}
.full{
  width: 600rpx;
}
.full-content-input{
  background-color: #f6f8fc;
  height: 80.386rpx;
  line-height: 80.386rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  overflow: hidden;
}
.total-container{
  background-color: #e9d0d3;
}
.label{
  font-size: 30rpx;
  margin-top: 30.193rpx;
}
.uni-input{
  width: 100%;
  height: 70rpx;
  border: 1.208rpx solid #e9d0d3;
  font-size: 30rpx;
  margin-top: 10.193rpx;
}
.uni-input-half{
  width: 30%;
  height: 70rpx;
  border: 1.208rpx solid #e9d0d3;
  font-size: 30rpx;
  margin-top: 10.193rpx;
}
.card-head{
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-family: 'HarmonyOS';
}
.card-main{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50.386rpx;
  margin-bottom: 100rpx;
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
  margin: 30.193rpx 0;
}
.confirm-button{
  width: 251.739rpx;
  height: 80.58rpx;
  line-height: 80.58rpx;
  border: 1.208rpx solid salmon;
  font-size: 30rpx;
  margin-right: 20rpx;
  cursor: pointer;
  font-family: 'HarmonyOS';
}
.bottom{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  /* height: 70rpx; */
  position: fixed;
  bottom: 0;
  z-index: 100;
  transform: translate(0,30%);
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
.bottom-left-img{
  width: 400rpx;
  height: 200rpx;
  animation: showLeft 1s;
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
.bottom-right-img{
  width: 400rpx;
  height: 200rpx;
  animation: showRight 1s;
}
.container{
  /* background-color: white; */
  transform: translate(0,140rpx);  
}
.aside-img{
  width: 500rpx;
  height: 180rpx;
  position: fixed;
  top:180rpx;
  right: -120rpx;
  animation: showRight 1s;
}
.card{
  /* height: 100vh; */
  padding: 60.386rpx;
  border-radius: 30.193rpx;
  background-color: white;
  /* position: relative;
  top:60.386rpx; */
}

/* 适配 Windows 设备 (480px x 800px) */
@media screen and (min-width: 415px) and (max-width: 480px) and (min-height: 737px) and (max-height: 800px) {
  .container {
    transform: translate(0,100rpx);
  }
  .info-title{
    font-size: 40rpx;
  }
  .rule{
    font-size: 20rpx;
  }
  .short-content-text,.long-content-text,.full-content-text{
    font-size: 26rpx;
  }
  .short-content-input,.long-content-input,.full-content-input{
    font-size: 21rpx;
    height: 60rpx;
    line-height: 60rpx;
  }
  .confirm-button{
    width: 200rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 24rpx;
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
  .info-title{
    font-size: 40rpx;
  }
  .rule{
    font-size: 20rpx;
  }
  .short-content-text,.long-content-text,.full-content-text{
    font-size: 26rpx;
  }
  .short-content-input,.long-content-input,.full-content-input{
    font-size: 21rpx;
    height: 60rpx;
    line-height: 60rpx;
  }
  .confirm-button{
    width: 200rpx;
    height: 70rpx;
    line-height: 70rpx;
    font-size: 24rpx;
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

</style>
