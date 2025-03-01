<script setup>
import {ref} from 'vue';

// 彭康、文治、南洋、仲英、崇实、宗濂、启德、励志、钱学森院、其他
const colleges=['彭康书院','文治书院','南洋书院','仲英书院','崇实书院','宗濂书院','启德书院','励志书院','钱学森书院','其他'];

const emit=defineEmits(['exit']);
const props=defineProps({
  collegeProps:String,
})

const chooseCollege=(college)=>{
  console.log(college);
  emit('exit',college);
}

</script>

<template>
  <view class="college-container">
    <view class="top">
      <view class="title">书院</view>
      <view class="exit" @click="$emit('hide')">X</view>
    </view>

    <view class="center">
      <view 
        v-for="(college, index) in colleges" 
        :key="index" 
        class="college-card" 
        @click="chooseCollege(college)"
        :style="{ 
          backgroundColor: college === props.collegeProps ? '#eecfd3' : 'white',
        }"
      >
        {{ college }}
      </view>
    </view>
  </view>
</template>





<style scoped>
.un-clickable {
  cursor: not-allowed;
  color: #9a9a9a;
}
.hide-center {
  display: none !important;
}
.center {
  width: 700rpx;
  height: 500rpx;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 30rpx;
}
.college-container {
  width: 700rpx;
  height: 800rpx;
  border: 6rpx solid #eecfd3;
  box-shadow: 6rpx 6rpx 20rpx 2rpx #eecfd3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.college-card {
  width: 300rpx;
  height: 100rpx;
  line-height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
  margin: 0rpx 10rpx;
}
.bottom {
  width: 700rpx;
  height: 100rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #eecfd3;
}
.button {
  margin: 10rpx 20rpx;
  font-size: 48rpx;
}
.text {
  font-size: 32rpx;
}
.top {
  width: 640rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80rpx;
}
.title {
  font-size: 40rpx;
}
.exit {
  font-size: 40rpx;
  color: #eecfd3;
  padding: 10rpx;
}
</style>
