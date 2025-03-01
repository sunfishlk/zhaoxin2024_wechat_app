<script setup>
import { ref, watch, onMounted } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import log from '../utils/log';

const baseUrl = getApp().globalData.baseUrl;

const props = defineProps({
  dateProps: String,
});

const chosenDate = ref({
  month: '',
  day: ''
});

const month = ref('八月');
const hideEight = ref(false);
const hideNine = ref(true);

const clickableEight = ref(false);
const clickableNine = ref(true);

const AugustDayList1 = [1, 2, 3];
const AugustDayList2 = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
const SeptemberDayList1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28];
const SeptemberDayList2 = [29, 30];

const nextPage=()=>{
  console.log('nextPage');
  month.value='九月';
  hideEight.value=true;
  hideNine.value=false;
  clickableEight.value=true;
  clickableNine.value=false;
}
const lastPage=()=>{
  console.log('lastPage');
  month.value='八月';
  hideEight.value=false;
  hideNine.value=true;
  clickableEight.value=false;
  clickableNine.value=true;
}

const combineDate = (month, day) => {
  if (month === '' || day === '') return '';
  return `${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
};
//检查日期是否过期
const checkIfOutDate=(month,day)=>{
  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();
  if (todayMonth > month) {
    return true;
  } else if (todayMonth === month) {
    if (todayDate > day) {
      return true;
    }
  }
  return false;
}

// 检查日期是否可选
const checkDateIfCanChoose = (month, day) => {
  //判断是否是可选的日期，不在availableDates中的日期不可选
  if(availableDates.value.includes(combineDate(month, day))){
    return 'black';
  }
  if(unavailableDates.value.includes(combineDate(month, day))){
    return 'red';
  }
  return '';
};

// 解析传入的日期并选中相应的日期块
const parseAndSelectDate = (dateString) => {
  const date = new Date(dateString);
  const monthNum = date.getMonth() + 1;
  const dayNum = date.getDate();

  chosenDate.value.month = monthNum;
  chosenDate.value.day = dayNum;

  // 自动切换到相应的月份视图
  if (monthNum === 8) {
    month.value = '八月';
    clickableEight.value = false;
    clickableNine.value = true;
    hideEight.value = false;
    hideNine.value = true;
  } else if (monthNum === 9) {
    month.value = '九月';
    clickableNine.value = false;
    clickableEight.value = true;
    hideEight.value = true;
    hideNine.value = false;
  }
};

const emit=defineEmits(['exit','hide']);

const chooseDate = (month, day) => {
  if (checkDateIfCanChoose(month, day)==='black') {
    chosenDate.value.month = month;
    chosenDate.value.day = day;
    console.log('chooseDate');
    console.log(month);
    console.log(day);
    //子组件提交emit
    emit('exit', month, day);
  }
  else if(checkDateIfCanChoose(month, day)==='red'){
    if(checkIfOutDate(month,day)){
      uni.showToast({
        title:'该日期已过期，请选择其他日期',
        icon:'none',
        duration:1000
      })
    }
    else{
      uni.showToast({
        title: '该日期已被预约满，请选择其他日期',
        icon: 'none',
        duration: 1000
      })
    }
    console.log('cannot choose');
  }
  else 
  {
    console.log('cannot choose');
  }
};

const isChosen = (month, day) => {
  return chosenDate.value.month === month && chosenDate.value.day === day;
};

// 监听 dateProps 的变化并自动选中日期
watch(() => props.dateProps, (newDate) => {
  if (newDate) {
    parseAndSelectDate(newDate);
  }
});

let cookie = uni.getStorageSync('cookie');
const availableDates = ref([]);
const unavailableDates = ref([]);
onMounted(() => {
  console.log('onShow');
  // 初次加载时解析日期
  if (props.dateProps) {
    parseAndSelectDate(props.dateProps);
  }
  //查询可用的面试日
  uni.request({
    url: `${baseUrl}/api/student/date`,
    method: 'GET',
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
      for(let i = 0; i < res.data.data.length; i++){
        if(res.data.data[i].available!==0){
          availableDates.value.push(res.data.data[i].date.substring(5));//从2024-08-07中提取08-07
        }
        else{
          unavailableDates.value.push(res.data.data[i].date.substring(5));
        }
      }
      console.log(availableDates.value);
      console.log(unavailableDates.value);
    },
    fail: (err) => {
      console.log(err);
      uni.showToast({
        title: JSON.stringify(err),
        icon: 'none'
      });
    }
  })
});
</script>

<template>
  <view class="date-container">
    <view class="top">
      <view class="title">日期</view>
      <!-- <view class="title">{{ props.dateProps }}</view> -->
      <view class="exit" @click="$emit('hide')">X</view>
    </view>
    <view class="head">
      <view class="day">日</view>
      <view class="day">一</view>
      <view class="day">二</view>
      <view class="day">三</view>
      <view class="day">四</view>
      <view class="day">五</view>
      <view class="day">六</view>
    </view>
    <view :class="['center', {'hide-center': hideEight}]">
      <view class="center-head">
        <view class="day-card" v-for="(day, index) in AugustDayList1" :key="index" :style="[{'color': checkDateIfCanChoose(8, day)}, {'background-color': isChosen(8, day) ? '#eecfd3' : 'white'}]" @click="chooseDate(8, day)">{{ day }}</view>
      </view>
      <view class="center-center">
        <view class="day-card" v-for="(day, index) in AugustDayList2" :key="index" :style="[{'color': checkDateIfCanChoose(8, day)}, {'background-color': isChosen(8, day) ? '#eecfd3' : 'white'}]" @click="chooseDate(8, day)">{{ day }}</view>
      </view>
    </view>
    <view :class="['center-nine', {'hide-center': hideNine}]">
      <view class="center-center">
        <view class="day-card" v-for="(day, index) in SeptemberDayList1" :key="index" :style="[{'color': checkDateIfCanChoose(9, day)}, {'background-color': isChosen(9, day) ? '#eecfd3' : 'white'}]" @click="chooseDate(9, day)">{{ day }}</view>
      </view>
      <view class="center-bottom">
        <view class="day-card" v-for="(day, index) in SeptemberDayList2" :key="index" :style="[{'color': checkDateIfCanChoose(9, day)}, {'background-color': isChosen(9, day) ? '#eecfd3' : 'white'}]" @click="chooseDate(9, day)">{{ day }}</view>
      </view>
    </view>
    <view class="bottom">
      <view @click="lastPage">
        <text :class="['button', {'un-clickable': !clickableEight}]">{{ '<' }}</text>
      </view>
      <view class="text">{{ month }}</view>
      <view @click="nextPage">
        <text :class="['button', {'un-clickable': !clickableNine}]">{{ '>' }}</text>
      </view>
    </view>
  </view>
</template>


<style scoped>
.un-clickable{
  cursor: not-allowed;
  color: #9a9a9a;
}
.hide-center{
  display: none !important;
}
.center-nine{
  /* display: none; */
  width: 700rpx;
  height: 500rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.date-container{
  width: 700rpx;
  height: 800rpx;
  border:  6rpx solid #eecfd3;
  box-shadow: 6rpx 6rpx 20rpx 2rpx #eecfd3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* display: block; */
}
.hide{
  display: none;
}
.day-card{
  width: 80rpx;
  height: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
  color: #c7d2d4;
  margin: 10rpx;
  /* transition: all .2s; */
}
.center-head{
  width: 700rpx;
  height: 100rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.center-bottom{
  width: 700rpx;
  height: 100rpx;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.center-center{
  width: 700rpx;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.top{
  width: 640rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80rpx;
}
.title{
  font-size: 40rpx;
}
.exit{
  font-size: 40rpx;
  color: #eecfd3;
  padding: 10rpx;
}
.head{
  width: 676rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80rpx;
}
.day{
  font-size: 32rpx;
  margin: 10rpx 20rpx;
}
.center{
  width: 700rpx;
  height: 500rpx;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bottom{
  width: 700rpx;
  height: 100rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #eecfd3;
}
.button{
  margin: 10rpx 20rpx;
  font-size: 48rpx;
}
.text{
  font-size: 32rpx;
}
</style>