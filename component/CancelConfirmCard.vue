<script setup>
import { ref } from 'vue';

const emit=defineEmits(['yes','no']);

const emitYes=()=>{
  emit('yes');
  console.log('yes');
}
const emitNo=()=>{
  emit('no');
  console.log('no');
}

</script>

<template>
  <view class="card">
    <view class="title">取消报名</view>
    <view class="button-container">
      <view class="button" @click="emitYes">Yes</view>
      <view class="button" @click="emitNo">No</view>
    </view>
  </view>
</template>

<style scoped>
.title{
  font-size: 40rpx;
  font-family: 'HarmonyOS';
  /* margin-bottom: 120rpx; */
}
.card{
  width: 500rpx;
  height: 320rpx;
  display: flex;
  justify-content: space-around;
  background-color: white;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border: 6rpx solid #eecfd3;
  box-shadow: 6rpx 6rpx 20rpx 2rpx #eecfd3;
  z-index: 1000;
}
.button-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
.button{
  width: 200rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #f6c2cb;
  font-size: 30rpx;
  margin: 0 10rpx;
}
</style>