<template>
  <view class="container">
    <view class="img-container"> 
      <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/home/1722763683939496796.svg" class="bird"/>
      <img src="https://static.tiaozhan.com/tenzor/2024zhaoxin/weapp/images/home/1722763684070168775.svg" class="round">
    </view>
    <button @click="next">C O N T I N U E</button>
  </view>
</template>

<script setup>
const next = () => {
  uni.navigateTo({
    url: '../../pages/basic-info/basic-info'
  });
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
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
